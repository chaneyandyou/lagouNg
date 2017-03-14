'use strict';

angular.module('app',['ui.router']);
angular.module('app')
.config(['$sceDelegateProvider',function ($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        './data/**'
    ]);

}]);

'use strict';
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller: 'mainCtrl'
    }).state('position', {
        url: '/position/:id',
        templateUrl: 'view/position.html',
        controller: 'positionCtrl'
    })
      .state('company',{
          url:'/company',
          templateUrl:'view/company.html',
          controller:'companyCtrl'
      })
    $urlRouterProvider.otherwise('main');
}]);



'use strict';
angular.module('app').controller('companyCtrl',['$scope',function ($scope) {

}]);
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

'use strict';
angular.module('app').directive('appCompany',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'./view/template/company.html',
        scope:{
          com:'='
        }
    }
}]);

'use strict';
angular.module('app').directive('appFoot',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'./view/template/foot.html'
    }
}]);

'use strict';
angular.module('app').directive('appHead', [function () {
    return {
        restrict:'A',
        replace:true,
        templateUrl:'./view/template/head.html'
    }
}]);
'use strict';
angular.module('app').directive('appHeadBar', [function () {
    return {
        restrict: 'A',
        replace:true,
        templateUrl: 'view/template/headBar.html',
        scope:{
            text:'@'
        },
        link:function (scope) {
            scope.back = function () {
                window.history.back();
            }
        }
    };
}]);
'use strict';
angular.module('app').directive('appPositionClass',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/positionClass.html'
    }
}]);
'use strict';
angular.module('app').directive('appPositionInfo',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'../view/template/positionInfo.html',
        scope:{
            isActive:'=',
            isLogin:'=',
            pos:'='
        },
        link:function ($scope) {
            $scope.imagePath = $scope.isActive?'image/star-active.png':'image/star.png'
        }
    }
}]);

'use strict';
angular.module('app').directive('appPositionList',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'./view/template/positionList.html',
        scope:{
            data:'='
        }
    }
}]);


angular.module('app')
.service('httpTool',['$http',function ($http) {

    this.getData = function (args,success,error) {

        if (args.method == 'post'){

            var data = "";
            for(var key  in args.params){
                data += key+'='+args.params[key]+'&'
            }
            data = data.slice(0,-1);

            $http({

                url:args.url,
                method:args.method,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                data:data
            })

        }else if(args.method == 'get' || args.method == 'jsonp') {

            $http({
                url:args.url,
                method:args.method,
                params:args.params
            }).then(function (res) {
                success(res.data);
            }).catch(function (err) {
                error(err);
            })
        }
    };

}]);
