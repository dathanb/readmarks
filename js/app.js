angular.module('readmarksModule')
.controller('PageController',
    ['$scope', '$document', 'chromeService', 'storageService',
    function($scope, $document, chromeService, storageService) {

        $document.ready(function(){
            var queryInfo = {
                active: true,
                currentWindow: true
            };

            chrome.tabs.query(queryInfo, function(tabs) {
                $scope.readmark_url = tabs[0].url
                $scope.$apply()
            });

        })

        $scope.readmark_url = ""

        $scope.saveBookmark = function() {

        }

        $scope.loadBookmark = function() {

        }

    }])