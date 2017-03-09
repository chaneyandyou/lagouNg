'use strict';

angular.module('app').controller('mainCtrl',['$scope',function ($scope) {
    $scope.list = [
        {
            id:1,
            name:"前端开发",
            imgSrc:'image/company-1.png',
            companyName:'慕课网',
            city:"北京",
            industry:"互联网",
            time:'2016-11-11 11:11'
        },
        {
            id:2,
            name:"WEB前端",
            imgSrc:'image/company-2.png',
            companyName:'三好网',
            city:"广州",
            industry:"互联网",
            time:'2016-12-12 12:12'
        }
    ]
}]);
