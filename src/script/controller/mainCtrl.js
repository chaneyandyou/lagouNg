'use strict';

angular.module('app').controller('mainCtrl', ['$scope', 'httpTool' , function($scope, httpTool) {
    httpTool.getData({
            url:'/data/positionList.json',
            method:'get',
            params:null
        },function (res) {
              $scope.list = res;
        },function (error) {

        });
}]);
