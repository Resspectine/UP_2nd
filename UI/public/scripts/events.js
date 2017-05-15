var events = (function () {
    function handleClickOnNews(event) {
        var parent = event.target.parentNode;
        if (parent.id === 'edit') {
            newsService.editNews(event.currentTarget.id);
        } else {
            if (parent.id === 'delete') {
                newsService.deleteNewsFromNewsFeed(event.currentTarget.id);
            } else {
                if (event.currentTarget.className === 'short-news') {
                    newsService.openNews(event.currentTarget.id);
                }
            }
        }
    }

    function handleClickToClose(event) {
        var button = event.target;
        if (button.className === 'close-window') {
            newsService.closeWindow(event.currentTarget);
        }
        if (button.className === 'login-button') {
            newsService.closeWindow(event.currentTarget);
        }
    }

    function handleClickOnEditing(event) {
        var button = event.target;
        if (button.id === 'send-news') {
            newsService.completeEditing(event.target.classList, event.currentTarget);
        }
    }

    function handleClickOnCreating(event) {
        var button = event.target;
        if (button.className === 'send-news') {
            newsService.createNews(event.currentTarget);
        }
    }

    function handleClickOnNavigationBar(event) {
        var key = event.target.id;
        switch (key) {
            case 'add-news':
                if (user) {
                    newsService.createWindowNews();
                }
                break;
        }
    }

    function handleClickOnLogining(event) {
        if (event.target.className === 'login-button') {
            newsService.getUser(event.currentTarget);
        }
    }

    function handleClickOnControlButtons(event) {
        switch (event.target.className) {
            case 'sign-in':
                newsService.loginWindow();
                break;
            case 'sign-up':
                console.log('sign-up');
                break;
            case 'log-out':
                newsService.user = "";
                newsService.checkingUser();
                break;
            case 'load-more':
                newsService.loadMoreNews();
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
            newsService.addNewsInNewsFeed(item.Id, feed);
        });
        document.getElementsByClassName('sort-delete')[0].style.display = 'flex';
        document.getElementsByClassName('load-more')[0].style.display = 'none';
        document.getElementsByClassName('sort-tools')[0].style.top = '0';
        document.getElementsByClassName('fa fa-arrow-up')[0].className = 'fa fa-arrow-down';
    }

    function handleClickOnDeleteSort(event) {
        newsService.show();
        event.target.style.display = 'none';
    }

    return {
        handleClickOnNews: handleClickOnNews,
        handleClickToClose: handleClickToClose,
        handleClickOnEditing: handleClickOnEditing,
        handleClickOnCreating: handleClickOnCreating,
        handleClickOnNavigationBar: handleClickOnNavigationBar,
        handleClickOnLogining: handleClickOnLogining,
        handleClickOnControlButtons: handleClickOnControlButtons,
        handleClickOnSort: handleClickOnSort,
        handleClickOnSortButton: handleClickOnSortButton,
        handleClickOnDeleteSort: handleClickOnDeleteSort
    };
}());