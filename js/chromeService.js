angular.module("chromeModule", [])
.service("chromeService", ["$q",
    function($q) {

        this.getCurrentTab = getCurrentTab
        this.getCurrentTabUrl = getCurrentTabUrl
        this.setCurrentTabUrl = setCurrentTabUrl

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
    }
])