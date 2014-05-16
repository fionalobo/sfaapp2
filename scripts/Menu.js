var menuapp = angular.module('menuapp', ['ui.router','shoppinpal.mobile-menu']);

//Add this to have access to a global variable
/*menuapp.run(['$rootScope', function ($rootScope) {
    alert('Initializing 123!!!');
    $rootScope.MyUserId = 'FIONA'; //global variable
}]);

/*menuapp.controller('MenuCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

    $scope.user = {userid:'LORRAINE.GOA', pwd:'', pin:''};

/*    $scope.userid = 'FIONA.GOA';
    $scope.pwd = '';
    $scope.pin = '';*/

    //var userid = $scope.userid;
/*    var userid = $scope.userid.userid;*/
/*    var user = $scope.user;

    alert(user.userid);
/*    alert(userid);*/

/*    $rootScope.MyUserId = 'FIONA.GOA';*/

//    $scope.MyUserId = $rootScope.MyUserId;
/*    if ($scope.MyUserId == '')
    {
       alert('Hello. Blank User Id');
       $location.path('/gologin');        
    }
    else
    {
        alert('Hello. User Id - FIONA');
        $location.path('/mymenu');        
    }

    $scope.OnClick_DocVisit = function($scope) {
        location.href = "sfamain.html";
    }

    $scope.OnClick_Login = function($scope) {
        location.href = "login.html";
    }
    
    $scope.LoginUser = function($scope) {
//        $scope.MyUserId = $scope.userid;
//        alert(userid);
        alert(user.userid);
        $rootScope.MyUserId = user.userid.substr(0,5);
        alert($rootScope.MyUserId);
        $location.path('/mymenu');
    }

}]);*/

menuapp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");


    $stateProvider
        .state('gologin', 
            {
                url: '/login',
                templateUrl: 'partials/login.html',
                module: 'loginapp',
                controller: 'LoginCtrl'
            })


        .state('mymenu', 
            {
                url: '/menu',
                templateUrl: 'partials/mymenu_partial.html',
                module: 'menuapp',
                controller: 'MenuCtrl'
            })
    
}]);
