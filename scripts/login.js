var loginapp = angular.module('loginapp', []);

loginapp.factory('loginCtrl', ['', function(){
    return function name(){
        
    };
}])
loginapp.controller('loginCtrl', ['$scope','$location', function ($scope, $location) {
    //some vars for debugging only
    $scope.userid = "FIONA.GOA";

    $scope.LoginUser = function($scope) {
        /*alert("Hello from LoginUser function");*/
/*        var cUserId = $scope.userid;
        var cPwd = $scope.pwd;
        var cPin = $scope.pin;*/

       /* if (cUserId == 'FIONA.GOA'){
            $scope.userid.message = "";
        }
        else {
                $scope.m.userid.message = "Invalid User Id.";
        }*/

        /*return;*/
        /*$location.url = "Menu2.html";*/
        location.href = "Menu2.html";
        /*$location.path('/Menu2.html');*/
        /*$location.url('../Menu2.html');*/
        /*$location.url('/Menu2.html').search({ id: "0" });*/
    }

    
}]);
