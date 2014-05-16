//angular.module('loginapp', []);
angular.module('docvisitapp', []);

var mainapp = angular.module('mainapp', ['ui.bootstrap','ui.router','dialogs','loginServer','ajaxServer','lstoreServer','refTables','ac5lib','docvisitapp','dataObj','spMenu']);

/*********************************************************************************************************************************************************/

mainapp.run(['$rootScope', '$state', '$stateParams', '$spMenu', 'dataObj', 'lstoreServer',function($rootScope, $state, $stateParams, $spMenu, dataObj, lstoreServer){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$spMenu = $spMenu;
//    alert('Hello, You are in run');

    // 1) Check if appGlobal Container is present in local storage
//    var isappGlobalContainer = lstoreServer.hasContainer("appGlobal");

    // 1.a) If Container is present, check if msfaGlobal object is present
//    if (isappGlobalContainer) {
        //            alert('appGlobal container is available as local storage. let us load appGlobal from local storage');
        //            alert('Let us evaluate the object');
        // Check if msfaGlobal Object is present in appGlobal container
//        var ismsfaGlobalObject = lstoreServer.hasObject("appGlobal","msfaGlobal")

        // If msfaGlobal object is present, load from Local Storage
//        if (ismsfaGlobalObject) {
//            dataObj.appGlobal  = eval ("(" + lstoreServer.getObject("appGlobal","msfaGlobal") + ")");
//            alert('The Loaded appGlobal object is'+ JSON.stringify(dataObj.appGlobal));
//        }

/*        if (dataObj.appGlobal.appSettings.serverurl == '') {
            alert('This is the first time you are using the app. Please specify settings.');*/
            $state.transitionTo('mysettings');
/*        }
        else if (dataObj.appGlobal.userSignedin == true) {
            alert('User is already signed in.');
            $state.transitionTo('mymenu');
            $rootScope.myUser = dataObj.appGlobal.userInfo.empname;
        }
        else {
            alert('User is not signed in');
            $state.transitionTo('gologin');
        }
    }

    // 1.b) If Container is not present, create Container in local storage
    else {
//        alert('appGlobal container is not available as local storage');
        var isappGlobalContainer = lstoreServer.createContainer("appGlobal",12);
//        alert('Hey, a new container appGlobal has been created in local storage');
//        alert('Let us go to Settings page');
        $state.transitionTo('mysettings');
    };

//    alert("appGlobal DATA object"+ JSON.stringify(dataObj.appGlobal));

    var cserverUrl = dataObj.appGlobal.appSettings.serverurl;
//    alert('appGlobal Settings Server Url is '+(cserverUrl));

    /*        if ($scope.dataObj.appGlobal.appSettings.serverurl == '') {
            alert('Let us go to Settings page');
        };*/

}]);

/*********************************************************************************************************************************************************/

mainapp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//  $urlRouterProvider.otherwise("/login");


    $stateProvider
        .state('gologin', 
            {
                url: '/login',
                templateUrl: 'partials/login.html',
                module: 'mainapp',
                controller: 'loginCtrl'
            })


        .state('mymenu', 
            {
                url: '/menu',
                templateUrl: 'partials/mymenu_partial.html',
                module: 'mainapp',
                controller: 'MenuCtrl'
            })
    
        .state('mysettings', 
            {
                url: '/settings',
                templateUrl: 'partials/settings.html',
                module: 'mainapp',
                controller: 'SettingsCtrl'
            })

        .state('docvisit', 
            {
                url: '/docvisit',
                templateUrl: 'partials/docvisitqr.html',
                module: 'docvisitapp',
                controller: 'DocCtrl'
            })        
        
        .state('docvisit.date', {
              url: "/date",
              templateUrl: "partials/docvisitqr.selvisdate.html",
              module: 'docvisitapp',
              controller: 'DocCtrl'
          })
        .state('docvisit.update', {
              url: "/update",
              templateUrl: "partials/docvisitqr.docvistab.html",
              module: 'docvisitapp',
              controller: 'DocCtrl'
          })
         .state('docvisit.update.town', {
              url: "/town",
              templateUrl: "partials/docvisitqr.docvistab.townddn.html",
              module: 'docvisitapp',
              controller: 'DocCtrl'
          })

         .state('docvisit.update.doctor', {
              url: "/doctor",
              templateUrl: "partials/docvisitqr.docvistab.doctddn.html",
              module: 'docvisitapp',
              controller: 'DocCtrl'
          })
         .state('docvisit.update.product', {
              url: "/product",
              templateUrl: "partials/docvisitqr.docvistab.docvispg.html",
              module: 'docvisitapp',
              controller: 'DocCtrl'
          })
         .state('docvisit.update.product.code', {
              url: "/code",
              templateUrl: "partials/docvisitqr.docvistab.docvispg.prodddn.html",
              module: 'docvisitapp',
              controller: 'DocCtrl'
          })
}]);

/*********************************************************************************************************************************************************/

mainapp.controller('loginCtrl', ['$scope','$location','$state','loginServer','dataObj', 'lstoreServer', function ($scope, $location, $state, loginServer, dataObj, lstoreServer) {

    $scope.user = [];
    $scope.user.userid = 'FIONA.GOA';
    $scope.user.pwd = '';
    $scope.user.pin = '';

    var user = $scope.user;

    $scope.loginUser = function() {


/*        $scope.loginReq = {
            authTokens : {appmodid:"MSFA",userid: "AKK.GOA", pwdhash: "NEW", pinhash: "123",ssnreqno:1,ssnreqdttm:"2014-05-06"},
            reqStatus: 0,
            ssnTokens: {loccd:"",appmodid:"",usercd:"",ssnid:"",ssnkey:"",ssnreqno:0,ssnreqdttm:"",ssnexphrs:0},
            ajaxres: ""
        };*/

//        alert(user.userid);
//        alert(user.pwd);
//        alert(user.pin);

        $scope.loginReq = {
            authTokens : {appmodid:"MSFA", appverno:12, appmodbld:15, appreldt:"2014-05-06", userid: user.userid, pwdhash: user.pwd, pinhash: user.pin,ssnreqno:1,ssnreqdttm:"2014-05-06"},
            reqStatus: 0,
            ssnTokens: {loccd:"",appmodid:"",usercd:"",ssnid:"",ssnkey:"",ssnreqno:0,ssnreqdttm:"",ssnexphrs:0},
            ajaxres: ""
        };

//        alert("login req object is " + JSON.stringify($scope.loginReq));

        loginServer._loginReq($scope.loginReq).
            then(function () {
//                alert("Server Response status is "+($scope.loginReq.reqStatus));
                //alert("Server Response is " + JSON.stringify($scope.loginReq));

                if ($scope.loginReq.reqStatus == 101){
                    // check session tokens 
                    alert('Hey you are logged in');
                    dataObj.appGlobal.userSignedin = true;
//                    alert('Since login is success let us store appGlobal back into Local storage');
                    var isobject  = lstoreServer.putObject("appGlobal","msfaGlobal", JSON.stringify(dataObj.appGlobal));
                    $state.transitionTo('mymenu');
                } else {
                    alert('Hey you have failed to login');
                    dataObj.appGlobal.userSignedin = false;
          //          $state.transitionTo('mymenu');
                }
            });

    }
   
}]);

mainapp.controller('MenuCtrl', ['$scope', '$rootScope', '$location', '$state', function ($scope, $rootScope, $location, $state) {

    $scope.OnClick_DocVisit = function($scope) {

        $state.transitionTo('docvisit');
    }

    $scope.OnClick_Login = function($scope) {
        location.href = "login.html";
    }
    
}]);

mainapp.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', '$state', 'dataObj', 'lstoreServer', function ($scope, $rootScope, $location, $state, dataObj, lstoreServer) {

    $scope.serverUrl = dataObj.appGlobal.appSettings.serverurl;

    $scope.SaveSettings = function() {
//        alert('you are in the SaveSettings function');
        dataObj.appGlobal.appSettings.serverurl = $scope.serverUrl;
//        alert('The changed settings are'+ dataObj.appGlobal.appSettings.serverurl);
//        alert('The following appGlobal object whill be stored in Local storage'+ JSON.stringify(dataObj.appGlobal));
        var isobject  = lstoreServer.putObject("appGlobal","msfaGlobal", JSON.stringify(dataObj.appGlobal));

        $state.transitionTo("gologin");
    }

}]);

/*********************************************************************************************************************************************************/