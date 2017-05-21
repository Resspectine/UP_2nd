var serverCommands = (function () {
    function getArticles() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", '/news');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let articles = JSON.parse(xhr.responseText);
                    articles.forEach(function (article) {
                        article.CreatedAt = new Date(article.CreatedAt);
                    });
                    resolve(articles);
                } else {
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    });
                }
            };
            xhr.send();
        });
    }

    function getDeletedArticles() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", '/deletedNews');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let articles = JSON.parse(xhr.responseText);
                    articles.forEach(function (article) {
                        article.CreatedAt = new Date(article.CreatedAt);
                    });
                    resolve(articles);
                } else {
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    });
                }
            };
            xhr.send();
        });
    }

    function globalPost(articles) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(articles));
    }

    function updateArticle(article) {
        return new Promise(() => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", '/newsEdit');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(article));
        });
    }

    function getFullArticle(id) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/news/' + id);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let article = JSON.parse(xhr.responseText);
                    article.CreatedAt = new Date(article.CreatedAt);
                    resolve(article);
                } else {
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    });
                }
            };
            xhr.send();
        });
    }

    function getUsers() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/users');
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let users = JSON.parse(xhr.responseText);
                    resolve(users);
                } else {
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    });
                }
            };
            xhr.send();
        });
    }

    function deleteArticle(id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/news/delete/' + id);
        xhr.send();
    }

    function sendArticle(article) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(article));
    }

    return {
        getArticles: getArticles,
        getDeletedArticles: getDeletedArticles,
        globalPost: globalPost,
        updateArticle: updateArticle,
        getFullArticle: getFullArticle,
        deleteArticle: deleteArticle,
        sendArticle: sendArticle,
        getUsers: getUsers
    };

}());
