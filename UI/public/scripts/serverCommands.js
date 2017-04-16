var serverCommands = (function () {
    function getArticles() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/news', false);
        xhr.send();
        var articles = JSON.parse(xhr.responseText);
        articles.forEach(function (article) {
            article.CreatedAt = new Date(article.CreatedAt);
        });
        return articles;
    }

    function getDeletedArticles() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/deletedNews', false);
        xhr.send();
        var articles = JSON.parse(xhr.responseText);
        articles.forEach(function (article) {
            article.CreatedAt = new Date(article.CreatedAt);
        });
        return articles;
    }

    function globalPost(articles) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(articles));
    }

    function updateArticle(article) {
        var xhr = new XMLHttpRequest();
        xhr.open("PATH", '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(article));
    }
    function getFullArticle(id) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/news/'+id);
        xhr.send();
        console.log(xhr.responseText);
        return JSON.parse(xhr.responseText);
    }
    function deleteArticle(id) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE','/news/'+id);
        xhr.send();
    }
    function sendArticle(article) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", '/news');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(article));
    }
    return{
        getArticles:getArticles,
        getDeletedArticles:getDeletedArticles,
        globalPost:globalPost,
        updateArticle:updateArticle,
        getFullArticle:getFullArticle,
        deleteArticle:deleteArticle,
        sendArticle:sendArticle
    };
}());
