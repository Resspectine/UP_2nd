var articlesService = (function () {
    var validatedArticle = {
        Id: function (id) {
            if (id) {
                return typeof id === 'string';
            }
            return false;
        },
        Title: function (title) {
            if (title) {
                return title.length < 100;
            }
            return false;
        },
        Summary: function (summary) {
            if (summary) {
                return summary.length < 200;
            }
            return false;
        },
        CreatedAt: function (createdAt) {
            return createdAt;
        },
        Author: function (author) {
            return author;
        },
        Content: function (content) {
            return content;
        }
    };

    function getArticles(skip, top, fileConfig) {
        return serverCommands.getArticles().then(article => {
            skip = skip || 0;
            top = top || 10;
            var sortedArticles = article.slice(skip, top);
            if (fileConfig) {
                if (fileConfig.Author) {
                    sortedArticles = sortedArticles.filter(function (number) {
                        return fileConfig.Author === number.Author;
                    });
                }
                if (fileConfig.CreatedAtFinish) {
                    sortedArticles = sortedArticles.filter(function (number) {
                        return new Date(fileConfig.CreatedAtFinish) >= number.CreatedAt
                    });
                }
                if (fileConfig.CreatedAtStart) {
                    sortedArticles = sortedArticles.filter(function (number) {
                        return new Date(fileConfig.CreatedAtStart) <= number.CreatedAt;
                    });
                }
            }
            sortedArticles.sort(function (a, b) {
                return a.CreatedAt - b.CreatedAt;
            });
            return sortedArticles;
        });
    }

    function validateArticle(article) {
        if (article) {
            return Object.keys(validatedArticle).every(function (item) {
                    return validatedArticle[item](article[item]);
                }
            );
        }
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            serverCommands.sendArticle(article);
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, article) {
        return serverCommands.getFullArticle(id).then(
            mainArticle => {
                let answer;
                var bufferArticle = {
                    Id: mainArticle.Id,
                    Title: article.Title,
                    Summary: article.Summary,
                    CreatedAt: mainArticle.CreatedAt,
                    Author: mainArticle.Author,
                    Content: article.Content
                };
                if (validateArticle(bufferArticle)) {
                    serverCommands.updateArticle(bufferArticle);
                    return bufferArticle;
                } else {
                    console.log("false");
                    answer = false;
                    return answer;
                }
            });
    }

    function removeArticle(id) {
        serverCommands.deleteArticle(id);
    }

    function getUniqueAuthors() {
        return serverCommands.getArticles().then(articles => {
            var authors = {};
            articles.forEach(function (item) {
                var str = item.Author;
                authors[str] = true;
            });

            return authors;
        });
    }

    return {
        getArticles: getArticles,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        getUniqueAuthors: getUniqueAuthors
    }
}());
var newsService = ((function () {
    var amountOfNews = 0;
    var user = "";

    function createNewsForNewsFeed(item, direction) {
        addNewsInNewsFeed(creatingNews(item), direction);
    }

    function creatingNews(article) {
        var news;
        if (user) {
            news = document.querySelector('#logined-user-news').content.querySelector('.short-news').cloneNode(true);
        } else {
            news = document.querySelector('#unlogined-user-news').content.querySelector('.short-news').cloneNode(true);
        }
        news.id = article.Id;
        news.getElementsByTagName('h2')[0].innerHTML = article.Title;
        news.getElementsByTagName('p')[0].innerHTML = article.Summary;
        news.getElementsByTagName('footer')[0].innerHTML = article.CreatedAt.getDate() + '.' + article.CreatedAt.getMonth() + '.' +
            article.CreatedAt.getFullYear() + ' by ' + article.Author;
        news.addEventListener('click', events.handleClickOnNews);
        return news;
    }

    function addNewsInNewsFeed(news, direction) {
        direction.appendChild(news);
    }

    function loginWindow() {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#login-window').content.querySelector('.login-window').cloneNode(true);
        news.id = 'login-window';
        news.addEventListener('click', events.handleClickToClose);
        news.addEventListener('click', events.handleClickOnLogining);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function getUser(element) {
        serverCommands.getUsers().then(users => {
            let flag = true;
            var nickName = element.getElementsByClassName('login')[0].value;
            var password = element.getElementsByClassName('password')[0].value;
            users.forEach(function (us) {
                    if (us["nickname"] === nickName) {
                        if (us["password"] === password) {
                            user = nickName;
                            checkingUser();
                            flag = false;
                        } else {
                            alert('Invalid password');
                            flag = false;
                        }
                    }
                }
            );
            if (flag) {
                alert('Invalid user');
            }
        }).catch(() => {
            console.log("False");
        });
    }

    function createWindowNews() {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#creating-news').content.querySelector('.create-news').cloneNode(true);
        news.id = 'creating';
        news.addEventListener('click', events.handleClickToClose);
        news.addEventListener('click', events.handleClickOnCreating);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function createNews(element) {
        var title = element.getElementsByClassName('create-news-title')[0].value;
        var summary = element.getElementsByClassName('create-news-summary')[0].value;
        var content = element.getElementsByClassName('create-news-content')[0].value;
        var date = new Date();
        var article = {
            Id: date.toString(),
            Title: title,
            Summary: summary,
            CreatedAt: date,
            Author: user,
            Content: content
        };
        var temp = document.getElementsByClassName('news-feed')[0];
        if (articlesService.validateArticle(article)) {
            articlesService.addArticle(article);
            createNewsForNewsFeed(article, temp);
            closeWindow(element);
            fillingSelect();
        } else {
            alert("Invalid news");
        }
    }

    function openNews(id) {
        serverCommands.getFullArticle(id).then(
            article => {
                var blackBackground = document.createElement('div');
                blackBackground.className = 'half-black';
                var news = document.querySelector('#show-news').content.querySelector('.show-news').cloneNode(true);
                news.id = 'show-news';
                news.getElementsByTagName('h1')[0].innerHTML = article.Title;
                news.getElementsByTagName('h2')[0].innerHTML = article.Summary;
                news.getElementsByTagName('p')[0].innerHTML = article.Content;
                news.getElementsByTagName('footer')[0].innerHTML = article.CreatedAt.getDate() + '.' + article.CreatedAt.getMonth() + '.' +
                    article.CreatedAt.getFullYear() + ' by ' + article.Author;
                news.addEventListener('click', events.handleClickToClose);
                document.getElementsByClassName('overlay')[0].appendChild(news);
                document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
                setTimeout(function () {
                    news.style.opacity = '1';
                }, 0);
            });
    }

    function editNews(id) {
        serverCommands.getFullArticle(id).then(
            article => {
                var news = document.querySelector('#edit-news').content.querySelector('.edit-news').cloneNode(true);
                var blackBackground = document.createElement('div');
                blackBackground.className = 'half-black';
                news.id = 'editing';
                news.getElementsByClassName('text-title')[0].value = article.Title;
                news.getElementsByClassName('text-summary')[0].value = article.Summary;
                news.getElementsByClassName('text-content')[0].innerHTML = article.Content;
                news.getElementsByClassName('send-news')[0].id = 'send-news';
                news.getElementsByClassName('send-news')[0].className += ' ' + id;
                news.addEventListener('click', events.handleClickToClose);
                news.addEventListener('click', events.handleClickOnEditing);
                document.getElementsByClassName('overlay')[0].appendChild(news);
                document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
                setTimeout(function () {
                    news.style.opacity = '1';
                }, 0);
            });
    }

    function completeEditing(id, element) {
        var title = element.getElementsByClassName('text-title')[0].value;
        var summary = element.getElementsByClassName('text-summary')[0].value;
        var content = element.getElementsByClassName('text-content')[0].value;
        var article = {
            Title: title,
            Summary: summary,
            Content: content
        };
        articlesService.editArticle(id[1], article).then(articleNew => {
            if (articleNew) {
                var news = creatingNews(articleNew);
                var oldChild = document.getElementById(id[1]);
                document.getElementsByClassName('news-feed')[0].replaceChild(news, oldChild);
                closeWindow(element);
            } else {
                alert("Invalid news");
            }
        });
    }

    function show() {
        articlesService.getArticles(0, 4).then(articles => {
            document.getElementsByClassName('news-feed')[0].innerHTML = '';
            console.log("ky");
            var temp = document.getElementsByClassName('news-feed')[0];
            articles.forEach(function (item) {
                createNewsForNewsFeed(item, temp);
            });
            amountOfNews = 4;
            document.getElementsByClassName('load-more')[0].style.display = '';
        });

    }

    function deleteNewsFromNewsFeed(id) {
        var temp = document.getElementById(id);
        articlesService.removeArticle(id);
        temp.parentNode.removeChild(temp);
        fillingSelect();
    }

    function loadMoreNews() {
        articlesService.getArticles(amountOfNews, amountOfNews + 4).then(
            articles => {
                if (articles) {
                    var temp = document.getElementsByClassName('news-feed')[0];
                    articles.forEach(function (item) {
                        createNewsForNewsFeed(item, temp);
                    });
                    amountOfNews += 4;
                } else {
                    console.log("Nothing to load");
                }
            });
    }

    function closeWindow(element) {
        element.style.opacity = '0';
        setTimeout(function () {
            document.getElementsByClassName('overlay')[0].removeChild(element);
            var temp = document.getElementsByClassName('half-black')[0];
            document.getElementsByClassName('overlay')[0].removeChild(temp);
        }, 500);
    }

    function fillingSelect() {
        articlesService.getUniqueAuthors().then(authors => {
            var select = document.getElementsByClassName('authors')[0];
            select.innerHTML = '';
            select.innerHTML += '<option></option>';
            Object.keys(authors).forEach(function (item) {
                select.innerHTML += '<option>' + item + '</option>';
            });
        });

    }

    document.getElementsByClassName('sort-delete')[0].addEventListener('click', events.handleClickOnDeleteSort);

    document.getElementsByClassName('navigation-bar')[0].addEventListener('click', events.handleClickOnNavigationBar);

    document.getElementsByClassName('sort-triggering')[0].addEventListener('click', events.handleClickOnSort);

    document.getElementsByClassName('all-buttons')[0].addEventListener('click', events.handleClickOnControlButtons);

    document.getElementsByClassName('load-more')[0].addEventListener('click', events.handleClickOnControlButtons);

    document.getElementsByClassName('sort-button')[0].addEventListener('click', events.handleClickOnSortButton);

    function checkingUser() {
        var signIn = document.getElementsByClassName('sign-in')[0];
        var signUp = document.getElementsByClassName('sign-up')[0];
        var nickname = document.getElementsByClassName('nickname')[0];
        var logOut = document.getElementsByClassName('log-out')[0];
        var linkWhite = document.getElementsByClassName('link-white')[0];
        if (user) {
            signIn.style.display = 'none';
            signUp.style.display = 'none';
            nickname.textContent = user;
            nickname.style.display = '';
            logOut.style.display = '';
            linkWhite.style.display = '';
            show();
        } else {
            signIn.style.display = '';
            signUp.style.display = '';
            nickname.textContent = '';
            nickname.style.display = 'none';
            logOut.style.display = 'none';
            linkWhite.style.display = 'none';
            show();
        }
    }

    checkingUser();

    return {
        user: user,
        checkingUser: checkingUser,
        loginWindow: loginWindow,
        getUser: getUser,
        createWindowNews: createWindowNews,
        createNews: createNews,
        openNews: openNews,
        loadMoreNews: loadMoreNews,
        addNews: addNewsInNewsFeed,
        deleteNews: deleteNewsFromNewsFeed,
        show: show,
        changeNews: editNews,
        closeWindow: closeWindow,
        completeChanging: completeEditing,
        fillingSelect: fillingSelect
    }
})());
window.onload = function () {
    newsService.checkingUser();
    newsService.fillingSelect();
};