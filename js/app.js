angular.module('readmarksModule')
.controller('PageController',
    ['$scope', '$document', 'chromeService', 'storageService',
    function($scope, $document, chromeService, storageService) {

        $document.ready(fetchAndDisplayReadmark);

        $scope.readmark_url = ""
        $scope.saveReadmark = saveReadmark;
        $scope.loadReadmark = loadReadmark;

        $scope.has_readmark = false


        function fetchAndDisplayReadmark() {
            chromeService.getCurrentTabUrl().then(function(url) {
                return storageService.getReadmarkFor(url)
            }).then(function(url){
                $scope.readmark_url = url
                $scope.has_readmark = true
            })
        }

        function updateScopeUrl(url){
            $scope.readmark_url = url
            $scope.has_readmark = true
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

    }])