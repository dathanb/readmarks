angular.module("readmarksModule")
.service("storageService",
    [ '$q', 'chromeService', 'urlService',
        function($q, chromeService, urlService) {

            this.getReadmarkFor = getReadmarkFor;
            this.saveReadmark = saveReadmark;

            function getReadmarkFor(url) {
                return getExistingBookmark(url).then(function(bookmark){
                    return bookmark.url
                })
            }

            function saveReadmark(url) {
                getExistingBookmark(url).then(
                    function(bookmark) {
                        return updateBookmark(bookmark, url)
                    },
                    function(reason) {
                        return createBookmark(url)
                    }
                )
            }

            function updateBookmark(bookmark, url) {
                return chromeService.getCurrentTab().then(function(tab) {
                    return chromeService.updateBookmark(bookmark.id, tab.title, url)
                })
            }

            function createBookmark(url) {
                return getReadmarkFolder().then(function(folder) {
                    return chromeService.getCurrentTab().then(function(tab){
                        return chromeService.createBookmark(folder.id, null, tab.title, url)
                    })
                })
            }

            function getExistingBookmark(url) {
                return getReadmarkFolder().then(
                    function(folder) {
                        for (var i=0; i<folder.children.length; i++) {
                            var bookmark = folder.children[i]
                            if (urlService.getHost(bookmark.url) === urlService.getHost(url)) {
                                return bookmark
                            }
                        }
                        return $q.reject("Couldn't find an existing bookmark")
                    },
                    function(reason) {
                        makeReadmarksFolder()
                        return $q.reject("Couldn't find existing ReadMark folder")
                    }
                )
            }

            function makeReadmarksFolder() {
                // TODO: resolve this inefficiency
                // Calling getOtherBookmarks here and in getReadmarkFolder is potentially inefficient
                // we might need to keep track of the result the first time around
                return getOtherBookmarks().then(
                    function(tree) {
                        return chromeService.createBookmark(tree.id,
                            null,
                            "ReadMarks",
                            null
                        )
                    }
                )
            }

            function getReadmarkFolder() {
                return getOtherBookmarks().then(
                    function(tree) {
                        for (var i=0; i<tree.children.length; i++) {
                            if (tree.children[i].title == "ReadMarks") {
                                return tree.children[i]
                            }
                        }
                        return $q.reject("Couldn't find ReadMarks folder")
                    }
                )
            }

            function getOtherBookmarks() {
                return chromeService.getBookmarkTree().then(
                    function(tree) {
                        var root = tree[0]
                        for (var i=0; i<root.children.length; i++) {
                            if (root.children[i].title == "Other Bookmarks") {
                                return root.children[i]
                            }
                        }
                        return $q.reject("Couldn't find 'Other Bookmarks'")
                    }
                )
            }
        }
    ]
)