var serverCommands = (function () {
    function globalGet() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", '/news', false);
        xhr.send();
        var articles = JSON.parse(xhr.responseText);
        articles.forEach(function (article) {
            article.CreatedAt = new Date(article.CreatedAt);
        });
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
        globalGet:globalGet,
        globalPost:globalPost,
        updateArticle:updateArticle,
        getFullArticle:getFullArticle,
        deleteArticle:deleteArticle,
        sendArticle:sendArticle
    };
}());
