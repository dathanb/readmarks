angular.module("readmarksModule")
.service('storageService', [
    function(){

        var UNIQUE_PREFIX = "per-domain-bookmarks"
        this.getReadmarkFor = getReadmarkFor
        this.saveReadmark = saveReadmark

        function getBookmarkKey(domain) {
            return UNIQUE_PREFIX + ":" + domain + ":bookmark"
        }

        /**
         * Gets the host part of the given url
         * @param url
         * @returns {*|string}
         */
        function getHost(url){
            var tmp = document.createElement('a');
            tmp.href=url;
            console.debug ("Hostname is " + tmp.hostname)
            return tmp.hostname;
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
            return getBookmarkForHost(getHost(url))
        }

        function saveReadmark(url) {
            saveReadmarkFor(getHost(url), url)
        }
    }]
)