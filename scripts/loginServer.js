angular.module('loginServer',[])
.service('loginServer', ['$http', '$q', 'dataObj', function ($http, $q, dataObj) {
    //tbd - http timeout, 
    this._loginReq  = function (loginReq) {

        var myUrl, authTokens;
        myUrl = dataObj.appGlobal.appSettings.serverurl + '.loginreq';
        authTokens = loginReq.authTokens;

        var httpQrstr, defered, promise;

        //build Http Request String 
        httpQrstr = '{' + '"authTokens": ' + JSON.stringify(authTokens)  + '}';
        console.log(httpQrstr);
//        alert(myUrl); 
 //       alert(httpQrstr);

        //create a new instance of deferred
        defered = $q.defer();
        promise = defered.promise;
        //alert(obj2Str(promise));

        //send http request to server
        $http.get(myUrl + "?" + httpQrstr).
            success(function (data, status, headers, config) {
                // ajax successful
                //tbd - implement error codes full handling/alerts
                if (data.reqStatus == 101) {
                    //query ok
//                    alert(JSON.stringify(data));
                    loginReq.reqStatus = data.reqStatus;
                    loginReq.ssnTokens = data.ssnTokens;
                    loginReq.ajaxres   = data;
                    defered.resolve();
                } else {
                    //some application server error
                    loginReq.reqStatus = data.reqStatus;
                    loginReq.ajaxres   = data;
                    defered.resolve();
                }
            }).
            error(function (data, status, headers, config) {
                // something went wrong :
                loginReq.reqStatus = '999';
                //alert('server not available')
                //btw, keep separate global flag for online/offline
                loginReq.ajaxres = data;
                defered.resolve();
            });

        //return the promise to the invoker
        return promise;
    };
}]);

