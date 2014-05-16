angular.module('ajaxServer',[])
.service('ajaxServer', ['$http', '$q', 'dataObj', function ($http, $q, dataObj) {
    //tbd - http timeout, 
    this._sqlQuery  = function (myquery) {

        //global vars
        //TBD - put in config/provider
        var myUrl, authTokens, reqData;
        myUrl = dataObj.appGlobal.appSettings.serverurl + '.mobiquery';
        authTokens = {userId: "fiona.goa", sessionId: "1234567890", sessionKey: "1234567890987654321", reqSeq: 12345};
        reqData = {queryStr: "", queryTmout: 1000};

        //increment request Seuence
        authTokens.reqSeq = authTokens.reqSeq + 1;
      
        //prepare reqData
        reqData.queryStr = myquery.queryStr;

        var httpQrstr, defered, promise;

        //build Http Request String 
        httpQrstr = '{' + '"authTokens": ' + JSON.stringify(authTokens) + ',' + '"reqData": ' + JSON.stringify(reqData) + '}';
        //console.log(httpQrstr);
        //alert(httpQrstr);

        //create a new instance of deferred
        defered = $q.defer();
        promise = defered.promise;
        //alert(obj2Str(promise));

        $http.get(myUrl + "?" + httpQrstr).
            success(function (data, status, headers, config) {
                // ajax successful
                //tbd - implement error codes full handling/alerts
                if (data.respStatus == 101) {
                    //query ok
                    myquery.queryResult = data.respData;
                    myquery.queryStatus = data.respStatus;
                    myquery.ajaxres     = data;
                    defered.resolve();
                } else {
                    //some application server error
                    myquery.queryStatus = '900';
                    myquery.ajaxres     = data;
                    defered.resolve();
                }
            }).
            error(function (data, status, headers, config) {
                // something went wrong :
                myquery.queryStatus = '999';
                //alert('server not available')
                //btw, keep separate global flag for online/offline
                myquery.ajaxres = data;
                //myquery.ajaxres = '';
                defered.resolve();
            });

        //return the promise to the invoker
        return promise;
    };
}]);

