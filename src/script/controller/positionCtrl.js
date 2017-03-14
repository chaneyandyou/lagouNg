 'use strict';
 angular.module('app').controller('positionCtrl', ['$q','$scope', 'httpTool', '$state', function($q,$scope, httpTool, $state) {
     $scope.isLogin = false;
     function getPosition(){
       var def = $q.defer();
       httpTool.getData({
           url: 'data/position.json?id' + $state.params.id,
           method: 'get',
       }, function(res) {
           $scope.position = res;
           def.resolve(res);
       },function(err){
          def.reject(err);
       })
       return def.promise;
     }

     function getCompany(id){
       httpTool.getData({
         url:'data/company.json?id=' + id,
         method:'get'
       },function(res){
          $scope.company = res;
       });
     }
     getPosition().then(function(obj){
       getCompany(obj.companyId);
      // console.log(obj);
     })
 }]);
