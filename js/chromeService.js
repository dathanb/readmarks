angular.module("chromeModule", [])
.service("chromeService", ["$q",
    function($q) {

        this.getCurrentTab = getCurrentTab;
        this.getCurrentTabUrl = getCurrentTabUrl;
        this.setCurrentTabUrl = setCurrentTabUrl;
        this.getBookmarkTree = getBookmarkTree;
        this.createBookmark = createBookmark;
        this.updateBookmark = updateBookmark;

        function getCurrentTab() {
            function callback(tabs) {
                deferred.resolve(tabs[0])
            }
            var deferred = $q.defer()

            var queryInfo = {
                active: true,
                currentWindow: true
            };
            chrome.tabs.query(queryInfo, callback)
            return deferred.promise
        }

        function getCurrentTabUrl() {
            return this.getCurrentTab().then(function(tab){
                return tab.url
            })
        }

        function setCurrentTabUrl(url) {
            return getCurrentTab().then(
                function(tab){
                    chrome.tabs.update(tab.id, {url : url})
                }
            )
        }

        function getBookmarkTree() {
            function callback(tree){
                deferred.resolve(tree)
            }

            var deferred = $q.defer()
            chrome.bookmarks.getTree(callback)
            return deferred.promise
        }

        function createBookmark(parent, index, title, url) {
            function callback(tree) {
                deferred.resolve(tree)
            }
            var deferred = $q.defer()
            var bookmark = {}
            if (!(parent === null)) {
                bookmark['parentId'] = parent
            }
            if (!(index === null)) {
                bookmark['index'] = index
            }
            if (!(title === null)) {
                bookmark['title'] = title
            }
            if (!(url === null)) {
                bookmark['url'] = url
            }
            chrome.bookmarks.create(bookmark, callback)
            return deferred.promise
        }


        function updateBookmark(id, title, url) {
            function callback(bookmarkTree) {
                deferred.resolve(bookmarkTree)
            }
            var deferred = $q.defer()
            var changes = {}
            if (!(title === null)) {
                changes['title'] = title
            }
            if (!(url === null)) {
                changes['url'] = url
            }
            chrome.bookmarks.update(id, changes, callback)
            return deferred.promise
        }

    }
])