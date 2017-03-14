angular.module('app')
.config(['$sceDelegateProvider',function ($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        './data/**'
    ]);

}]);
