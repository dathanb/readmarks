angular.module("readmarksModule")
.service('storageService', [
        'urlService',
    function(urlService){

        var UNIQUE_PREFIX = "per-domain-bookmarks"
        this.getReadmarkFor = getReadmarkFor;
        this.saveReadmark = saveReadmark;

        function getBookmarkKey(domain) {
            return UNIQUE_PREFIX + ":" + domain + ":bookmark"
        }

        function getBookmarkForHost(host) {
            var key = getBookmarkKey(host)
            var link = localStorage.getItem(key)
            console.debug("Got bookmark: " + link)
            return link
        }

        function saveReadmarkFor(domain, url) {
            localStorage[getBookmarkKey(domain)] = url
        }

        function getReadmarkFor(url) {
            return getBookmarkForHost(urlService.getHost(url))
        }

        function saveReadmark(url) {
            saveReadmarkFor(urlService.getHost(url), url)
        }
    }]
)