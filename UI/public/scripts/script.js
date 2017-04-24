var user = "";
var articlesService = (function () {
    var length;
    function setLength() {
            length = serverCommands.getArticles().length;
    }

    var validatedArticle =
        {
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
        skip = skip || 0;
        top = top || 10;
        var sortedArticles = serverCommands.getArticles().slice(skip, top);
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
            setLength();
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, article) {
        var mainArticle = serverCommands.getFullArticle(id);
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
            return true;
        }
        else {
            console.log("false");
            return false;
        }
    }

    function removeArticle(id) {
        serverCommands.deleteArticle(id);
        setLength();
    }

    function uniqueAuthors() {
        var authors = {};
        serverCommands.getArticles().forEach(function (item) {
            var str = item.Author;
            authors[str] = true;
        });
        return authors;
    }

    setLength();

    return {
        getArticles: getArticles,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        length: length,
        uniqueAuthors: uniqueAuthors
    }
}());
var newsService = ((function () {
    var amountOfNews = 0;

    function createNewsForNewsFeed(id) {
        var article = serverCommands.getFullArticle(id);
        var news;
        if (user) {
            news = document.querySelector('#logined-user-news').content.querySelector('.short-news').cloneNode(true);
        } else {
            news = document.querySelector('#unlogined-user-news').content.querySelector('.short-news').cloneNode(true);
        }
        news.id = id;
        news.getElementsByTagName('h2')[0].innerHTML = article.Title;
        news.getElementsByTagName('p')[0].innerHTML = article.Summary;
        news.getElementsByTagName('footer')[0].innerHTML = article.CreatedAt.getDate() + '.' + article.CreatedAt.getMonth() + '.' +
            article.CreatedAt.getFullYear() + ' by ' + article.Author;
        news.addEventListener('click', handleClickOnNews);
        return news;
    }

    function addNewsInNewsFeed(id, direction) {
        var news = createNewsForNewsFeed(id);
        direction.appendChild(news);
        return news;
    }

    function handleClickOnNews(event) {
        var parent = event.target.parentNode;
        if (parent.id === 'edit') {
            editNews(event.currentTarget.id);
        } else {
            if (parent.id === 'delete') {
                deleteNewsFromNewsFeed(event.currentTarget.id);
            } else {
                if (event.currentTarget.className === 'short-news') {
                    openNews(event.currentTarget.id);
                }
            }
        }
    }

    function handleClickToClose(event) {
        var button = event.target;
        if (button.className === 'close-window') {
            closeWindow(event.currentTarget);
        }
        if (button.className === 'login-button') {
            closeWindow(event.currentTarget);
        }
    }

    function handleClickOnEditing(event) {
        var button = event.target;
        if (button.id === 'send-news') {
            completeEditing(event.target.classList, event.currentTarget);
        }
    }

    function handleClickOnCreating(event) {
        var button = event.target;
        if (button.className === 'send-news') {
            createNews(event.currentTarget);
        }
    }

    function handleClickOnNavigationBar(event) {
        var key = event.target.id;
        switch (key) {
            case 'add-news':
                if (user) {
                    createWindowNews();
                }
                break;
        }
    }

    function handleClickOnLogining(event) {
        if (event.target.className === 'login-button') {
            getUser(event.currentTarget);
        }
    }

    function handleClickOnControlButtons(event) {
        switch (event.target.className) {
            case 'sign-in':
                loginWindow();
                break;
            case 'sign-up':
                console.log('sign-up');
                break;
            case 'log-out':
                user = "";
                checkingUser();
                break;
            case 'load-more':
                loadMoreNews();
                break;
        }
    }

    function handleClickOnSort(event) {
        var button = event.currentTarget.childNodes[0];
        var temp = document.getElementsByClassName('sort-tools')[0];
        if (button.className === 'fa fa-arrow-down') {
            temp.style.top = document.getElementsByClassName('header')[0].offsetHeight + 'px';
            button.className = 'fa fa-arrow-up';
        }
        else {
            temp.style.top = '0';
            button.className = 'fa fa-arrow-down';
        }
    }

    function handleClickOnSortButton(event) {
        var body = event.currentTarget.parentNode.parentNode;
        var name = body.getElementsByClassName('authors')[0].value;
        var startDate = body.getElementsByClassName('start-date')[0].value;
        var finishDate = body.getElementsByClassName('finish-date')[0].value;
        var articles = articlesService.getArticles(0, articlesService.length, {
            Author: name,
            CreatedAtStart: startDate,
            CreatedAtFinish: finishDate
        });
        var feed = document.getElementsByClassName('news-feed')[0];
        feed.innerHTML = '';
        articles.forEach(function (item) {
            addNewsInNewsFeed(item.Id, feed);
        });
        document.getElementsByClassName('sort-delete')[0].style.display = 'flex';
        document.getElementsByClassName('load-more')[0].style.display = 'none';
        document.getElementsByClassName('sort-tools')[0].style.top = '0';
        document.getElementsByClassName('fa fa-arrow-up')[0].className = 'fa fa-arrow-down';
    }

    function handleClickOnDeleteSort(event) {
        show();
        event.target.style.display = 'none';
    }

    function loginWindow() {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#login-window').content.querySelector('.login-window').cloneNode(true);
        news.id = 'login-window';
        news.addEventListener('click', handleClickToClose);
        news.addEventListener('click', handleClickOnLogining);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function getUser(element) {
        var nickName = element.getElementsByClassName('login')[0].value;
        var password = element.getElementsByClassName('password')[0].value;
        if (nickName) {
            user = nickName;
            checkingUser();
        }
        else {
            alert('Invalid user');
        }
    }

    function createWindowNews() {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#creating-news').content.querySelector('.create-news').cloneNode(true);
        news.id = 'creating';
        news.addEventListener('click', handleClickToClose);
        news.addEventListener('click', handleClickOnCreating);
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
            addNewsInNewsFeed(article.Id, temp);
            closeWindow(element);
            fillingSelect();
        }
        else {
            alert("Invalid news");
        }
    }

    function openNews(id) {
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        var news = document.querySelector('#show-news').content.querySelector('.show-news').cloneNode(true);
        var article = serverCommands.getFullArticle(id);
        news.id = 'show-news';
        news.getElementsByTagName('h1')[0].innerHTML = article.Title;
        news.getElementsByTagName('h2')[0].innerHTML = article.Summary;
        news.getElementsByTagName('p')[0].innerHTML = article.Content;
        news.getElementsByTagName('footer')[0].innerHTML = article.CreatedAt.getDate() + '.' + article.CreatedAt.getMonth() + '.' +
            article.CreatedAt.getFullYear() + ' by ' + article.Author;
        news.addEventListener('click', handleClickToClose);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
    }

    function editNews(id) {
        var article = serverCommands.getFullArticle(id);
        var news = document.querySelector('#edit-news').content.querySelector('.edit-news').cloneNode(true);
        var blackBackground = document.createElement('div');
        blackBackground.className = 'half-black';
        news.id = 'editing';
        news.getElementsByClassName('text-title')[0].value = article.Title;
        news.getElementsByClassName('text-summary')[0].value = article.Summary;
        news.getElementsByClassName('text-content')[0].innerHTML = article.Content;
        news.getElementsByClassName('send-news')[0].id = 'send-news';
        news.getElementsByClassName('send-news')[0].className += ' ' + id;
        news.addEventListener('click', handleClickToClose);
        news.addEventListener('click', handleClickOnEditing);
        document.getElementsByClassName('overlay')[0].appendChild(news);
        document.getElementsByClassName('overlay')[0].appendChild(blackBackground);
        setTimeout(function () {
            news.style.opacity = '1';
        }, 0);
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
        if (articlesService.editArticle(id[1], article)) {
            var news = createNewsForNewsFeed(id[1]);
            var oldChild = document.getElementById(id[1]);
            document.getElementsByClassName('news-feed')[0].replaceChild(news, oldChild);
            closeWindow(element);
        } else {
            alert("Invalid news");
        }
    }

    function show() {
        document.getElementsByClassName('news-feed')[0].innerHTML = '';
        var temp = document.getElementsByClassName('news-feed')[0];
        var articles = articlesService.getArticles(0, 4);
        articles.forEach(function (item) {
            addNewsInNewsFeed(item.Id, temp);
        });
        amountOfNews = 4;
        document.getElementsByClassName('load-more')[0].style.display = '';
    }

    function deleteNewsFromNewsFeed(id) {
        var temp = document.getElementById(id);
        articlesService.removeArticle(id);
        temp.parentNode.removeChild(temp);
        fillingSelect();
    }

    function loadMoreNews() {
        if (articlesService.length - amountOfNews > 0) {
            var temp = document.getElementsByClassName('news-feed')[0];
            var articles = articlesService.getArticles(amountOfNews, amountOfNews + 4);
            articles.forEach(function (item) {
                addNewsInNewsFeed(item.Id, temp);
            });
            amountOfNews += 4;
        } else {
            alert("Nothing to load");
        }
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
        var authors = articlesService.uniqueAuthors();
        var select = document.getElementsByClassName('authors')[0];
        select.innerHTML = '';
        select.innerHTML += '<option> </option>'
        Object.keys(authors).forEach(function (item) {
            select.innerHTML += '<option>' + item + '</option>';
        });
    }

    document.getElementsByClassName('sort-delete')[0].addEventListener('click', handleClickOnDeleteSort);

    document.getElementsByClassName('navigation-bar')[0].addEventListener('click', handleClickOnNavigationBar);

    document.getElementsByClassName('sort-triggering')[0].addEventListener('click', handleClickOnSort);

    document.getElementsByClassName('all-buttons')[0].addEventListener('click', handleClickOnControlButtons);

    document.getElementsByClassName('load-more')[0].addEventListener('click', handleClickOnControlButtons);

    document.getElementsByClassName('sort-button')[0].addEventListener('click', handleClickOnSortButton);

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
    newsService.show();
    newsService.fillingSelect();
};