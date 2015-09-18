angular.module('readmarksModule')
.controller('PageController',
    ['$scope', '$document', 'chromeService', 'storageService',
    function($scope, $document, chromeService, storageService) {

        $document.ready(function() {
            chromeService.getCurrentTabUrl().then(function(url) {
                return storageService.getReadmarkFor(url)
            }).then(function(url){
                $scope.readmark_url = url
            })
        })

        $scope.readmark_url = ""

        function updateScopeUrl(url){
            $scope.readmark_url = url
        }

        $scope.saveReadmark = function() {
            chromeService.getCurrentTabUrl().then(function(url){
                storageService.saveReadmark(url)
                updateScopeUrl(url)
            })
        }

        $scope.loadReadmark = function() {
            chromeService.getCurrentTabUrl().then(function(url) {
                return storageService.getReadmarkFor(url)
            }).then(function(url){
                chromeService.setCurrentTabUrl(url)
            })
        }

    }])