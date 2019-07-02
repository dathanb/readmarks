angular.module('readmarksModule')
.controller('PageController',
    ['$scope', '$document', 'chromeService', 'storageService',
    function($scope, $document, chromeService, storageService) {

        $document.ready(fetchAndDisplayReadmark);

        $scope.readmark_url = "";
        $scope.current_url = null;
        // indicates whether the tab's current url matches the configured readmark for the current host
        $scope.on_current_readmark = false;

        $scope.saveReadmark = saveReadmark;
        $scope.loadReadmark = loadReadmark;

        $scope.has_readmark = false;
        $scope.matches_readmark = false;

        function fetchAndDisplayReadmark() {
            return fetchCurrentTabUrl().then(function(url){
                return storageService.getReadmarkFor(url);
            }).then(function(url){
                $scope.readmark_url = url;
                $scope.has_readmark = true;
                updateCurrentReadmarkFlag();
                return url;
            });
        }

        function updateCurrentReadmarkFlag() {
            $scope.on_current_readmark = ($scope.readmark_url === $scope.current_url);
        }

        function fetchCurrentTabUrl() {
            return chromeService.getCurrentTabUrl().then(function(url){
                $scope.current_url = url;
                updateCurrentReadmarkFlag();
                return url;
            });
        }

        function updateScopeUrl(url){
            $scope.readmark_url = url;
            $scope.has_readmark = true;
        }

        function saveReadmark() {
            chromeService.getCurrentTabUrl().then(function(url){
                storageService.saveReadmark(url)
                updateScopeUrl(url)
            })
        }

        function loadReadmark() {
            chromeService.getCurrentTabUrl().then(function(url) {
                return storageService.getReadmarkFor(url)
            }).then(function(url){
                chromeService.setCurrentTabUrl(url)
            })
        }

    }]);