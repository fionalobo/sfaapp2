angular.module('docvisitapp')
.controller('DocCtrl',  ['$scope', '$rootScope','$state','$location','$filter','$dialogs','ac5lib', 'ajaxServer', 'lstoreServer', 'refTables', 'dataObj', function ($scope,$rootScope,$state, $location,$filter,$dialogs,ac5lib,ajaxServer, lstoreServer, refTables, dataObj) {
    
 $scope.test = function(){
    $rootScope.$spMenu.toggle();
}

    $scope.goMenuPg = function() {
        $state.transitionTo('mymenu');
    };

  //some vars for debugging only
    $scope.revno = "279";
    $scope.lastobj = "dummy";

    //global memory variables (shift to globals)
    var loccd = "GOA";
    var empno = "000001";

    //memory variables for control
    $scope.loccd = loccd ;
    $scope.empno = empno ;
    $scope.visdate = dataObj.docvishd.visdate ;
    
    $scope.addbutton = {};

    //data set variable
    $scope.docvishd_querySet = dataObj.docvisit.txqrSet.docvishd;
    $scope.lastOpr = dataObj.docvishd.lastOpr;
    $scope.lastPtr = dataObj.docvishd.curPtr;
    $scope.recnotdeleted != 'D';

    $scope.m =  dataObj.docvisit.m[0];
    var m = $scope.m;

     $scope.setvisdate = function (){
     var vdate = new Date(dataObj.docvishd.visdate);

     var n = ac5lib._weekDay(dataObj.docvishd.visdate);

     var m = ac5lib._monthName(dataObj.docvishd.visdate);

     $scope.m.dayofweek =n;
     $scope.m.month = m + " "+ vdate.getFullYear();
     $scope.m.day = vdate.getDate();

    }

    $scope.setvisdate();

    $scope.tabs= [{title:"Visit Details"},{title:"Products Briefed"}];

   $scope.tabs[0].active = dataObj.docvishd.tab1;
   $scope.tabs[1].active = dataObj.docvishd.tab2;

    $scope.docvishd = dataObj.docvisit.editRec.docvishd[0];
    var docvishd = $scope.docvishd;

    $scope.docvispg = dataObj.docvisit.editRec.docvispg[0];
    var docvispg = $scope.docvispg;
    
    // for enabling and disabling of key fields
    $scope.curMode = dataObj.docvishd.curMode;
   
    $scope.state_docvishd = dataObj.docvishd.state[0];
    var state_docvishd = $scope.state_docvishd ;

   $scope.state_docvispg = dataObj.docvispg.state[0];
    var state_docvispg = $scope.state_docvispg ;

   $scope.docvispg_querySet = dataObj.docvisit.txSet.docvispg;

    // for enabling and disabling the key fields
    $scope.curModepg = dataObj.docvispg.curMode;


    
    $scope.callDtSelect = function (_cObjName){
       $state.go('docvisit.date') ; 
    }
  
  
// call searchData from search PB instead of getData() to implement the algorithm
/*  $scope.searchData = function(){
       var contrName = 'docvisitQr';
       var contrId   = $scope.loccd+$scope.empno+$scope.visdate.substring(0,4)+$scope.visdate.substring(5,7)+$scope.visdate.substring(8);

       var hasId = lstoreServer._hasObject(contrName,contrId);
        if (hasId == false)
        {
            if (appGlobal.srvAvl == false)
            {
                 $dialogs.error('Error','No connectivity');
            }
            else{
                $scope.getData();
                if ($scope.docvisitqr.queryStatus == 900)
                {
                     $dialogs.error('Error','Error getting data from backend');
                }
                }
        }
        else
        {
            var contrData = lstoreServer._getObject(contrName,contrId);
            angular.copy(contrData, dataObj.docvisit.txqrSet.docvishd);
            var j=dataObj.docvisit.txqrSet.docvishd.length ;
            var counter = 0;
            for (var i=0; i < j; i++) 
            {
                if ((dataObj.docvisit.txqrSet.docvishd[i].w_syncflag == 0 ) && (dataObj.docvisit.txqrSet.docvishd[i].w_txflag != 0))
                {
                    counter++;
                }
                
            }

            if (counter > 0)
            {
               // txqrSet is dirty . use as it is
            }
            else
            {

             if (appGlobal.srvAvl == false)
               {
                 // use the same txqrSet
                }
              else{
                  $scope.getData();
                  if ($scope.docvisitqr.queryStatus == 900)
                  {
                     $dialogs.error('Error','Error getting data from backend');
                  }
                 }

            }
            
        }
  }*/
    
  //queryStr: "select *, 'O' as w_rectype, ' ' as w_recstat, 1 as w_recvalid, 0 as w_recseq, 0 as w_recsync from docvishd where " + " loccd=" + str2MysqlStr($scope.loccd) + " and empno=" + str2MysqlStr($scope.empno) +  " and visdate=" + str2MysqlStr(dataObj.docvishd.visdate) ,
    //function to get the data from server
    $scope.getData = function () {
        
        $scope.myquery = {
            queryStr: "select a.*,b.doctname, 'O' as w_rectype, ' ' as w_recstat, 1 as w_recvalid, 0 as w_recseq, 0 as w_recsync from docvishd a,doctmst b where " + " a.loccd=" + str2MysqlStr($scope.loccd) + " and a.empno=" + str2MysqlStr($scope.empno) +  " and a.visdate=" + str2MysqlStr(dataObj.docvishd.visdate) + " and a.loccd=b.loccd and a.headqrt = b.headqrt and a.town=b.town and a.doctcd=b.doctcd" ,
            queryStatus: 0,
            queryResult: [],
            ajaxres: ''
        };
        ajaxServer._sqlQuery($scope.myquery).
            then(function () {
                angular.copy($scope.myquery.queryResult, dataObj.docvisit.txqrSet.docvishd);
                if ($scope.myquery.queryStatus == 101){

                       for (var i=1,j=dataObj.docvisit.txqrSet.docvishd.length ; i < j; i++) {
                           dataObj.docvisit.txqrSet.docvishd[i].w_recseq=i;
                       }
                       dataObj.docvishd.curPtr = 0;
                       dataObj.docvishd.curMode = 0;
                       dataObj.docvishd.lastOpr = 'search'; 

                       //subquery here 
                        $scope.getProd();
                    }
                else if ($scope.myquery.queryStatus == 900)
                {
                    if (dataObj.docvisit.txqrSet.docvishd.length == 0) {
                       $dialogs.error('Error','There is no data for given search');
                    }
                    dataObj.docvishd.curPtr = 0;
                    dataObj.docvishd.curMode = 0;
                    dataObj.docvishd.lastOpr = 'search'; 
                }

            });
    };
 
    //function to get product data from server
    $scope.getProd = function () {
        $scope.myquery = {
            queryStr: "select distinct b.prodcd,b.vissrl,c.itemname as prodname, 0 as sampleqty,a.loccd,a.empno,a.visdate,'O' as w_rectype, ' ' as w_recstat, 1 as w_recvalid, 0 as w_recseq, 0 as w_recsync from docvishd a,docvispg b,itemmst c where " + " a.loccd=" + str2MysqlStr($scope.loccd) + " and a.empno=" + str2MysqlStr($scope.empno) +  " and a.visdate=" + str2MysqlStr(dataObj.docvishd.visdate) + " and a.loccd=b.loccd and a.empno = b.empno and a.visdate=b.visdate  and  b.prodcd=c.itemcd" ,
            queryStatus: 0,
            queryResult: [],
            ajaxres: ''
        };
        ajaxServer._sqlQuery($scope.myquery).
            then(function () {
                angular.copy($scope.myquery.queryResult, dataObj.docvisit.txqrSet.docvispg);
                if ($scope.myquery.queryStatus == 101){
                       //fix w_recseq
                       for (var i=1,j=dataObj.docvisit.txqrSet.docvispg.length ; i < j;  i++) {
                           dataObj.docvisit.txqrSet.docvispg[i].w_recseq=i;
                       }
                    //   $scope.getProdmst();
                       
                    }
                else if ($scope.myquery.queryStatus == 900)
                {

                    if (dataObj.docvisit.txqrSet.docvispg.length == 0) {
                       $dialogs.error('Error','There is no data for given search');
                    }
                    
                }

            });
    };

    $scope.editEntry = function (currec) {
        dataObj.docvishd.curPtr = currec;
        dataObj.docvishd.curMode = 1;
        dataObj.docvishd.lastOpr = 'edit'; 

        angular.copy(dataObj.docvisit.txqrSet.docvishd[dataObj.docvishd.curPtr], dataObj.docvisit.txSet.docvishd[0]);
        angular.copy(dataObj.docvisit.txSet.docvishd[0], dataObj.docvisit.editRec.docvishd[0]);
        
        dataObj.docvisit.txqrSet.docvispg = ($filter('filter')(dataObj.docvisit.txqrSet.docvispg,{loccd: $scope.loccd,empno: $scope.empno, visdate: $scope.visdate}));
  
        angular.copy(dataObj.docvisit.txqrSet.docvispg, dataObj.docvisit.txSet.docvispg);

        //call onSetRecord
        $scope.onSetRecord();
  
        $state.go('docvisit.update');
    };

    $scope.delEntry = function (currec) {
      var m = $dialogs.confirm('Question','Delete the record?');
          //mark the row for deletion and delete the corresponding row from the queryset
          dataObj.docvishd.curPtr = currec;
          dataObj.docvishd.lastOpr = 'del'; 

          angular.copy(dataObj.docvishd.querySet[dataObj.docvishd.curPtr], dataObj.docvishd.editRec[0]); 
        
        m.result.then(function ()
         {
          var docvishd = dataObj.docvishd.editRec[0];
          docvishd.w_rectype  = "D";
          docvishd.w_recseq   = dataObj.docvishd.curPtr;
          _userid = "USER2";
          docvishd.mstupdby = _userid;
          docvishd.mstupddttm = new Date().toISOString();
        
          angular.copy(dataObj.docvishd.editRec[0], dataObj.docvishd.querySet[dataObj.docvishd.curPtr]);
  
          });
    };

    $scope.addEntry = function () {
        //set Current pointer, set mode
        //and copy emptySet to editRec
        dataObj.docvishd.curPtr = dataObj.docvisit.txqrSet.docvishd.length + 1 -1;
        dataObj.docvishd.curMode = 2;
        dataObj.docvishd.lastOpr = 'add'; 
        
        angular.copy(dataObj.docvisit.emptySet.docvishd[0], dataObj.docvisit.txSet.docvishd[0]);
     
        angular.copy(dataObj.docvisit.txSet.docvishd[0], dataObj.docvisit.editRec.docvishd[0]);
     
        //angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.txSet.docvispg[0]);

        //call onNewRecord
        $scope.onNewRecord();

        $state.go('docvisit.update') ;
       };


    $scope.onNewRecord = function () {
        var docvishd = dataObj.docvisit.editRec.docvishd[0];
        var docvispg = dataObj.docvisit.editRec.docvispg[0];

        // update key fields with control variables
        docvishd.loccd   = $scope.loccd;
        docvishd.empno   = $scope.empno;
        docvishd.visdate = $scope.visdate;

        //for child tables, update inherited fields
        docvispg.loccd   = docvishd.loccd;
        docvispg.empno   = docvishd.empno;
        docvispg.visdate = docvishd.visdate;

        // update default values (for onNewRecord attribute)  
        docvishd.headqrt = refTables._getValue("empmst",{empno:docvishd.empno},"this.headqrt", "");
        docvishd.sldivcd = refTables._getValue("empmst",{empno:docvishd.empno},"this.sldivcd", "");

        docvispg.sldivcd = docvishd.sldivcd;
        var dt = new Date();
        docvishd.vistime = $filter('date')(dt, 'HH:mm');

        //update control indicators
        docvishd.w_rectype  = "N";
        docvishd.w_recstat  = " ";
        docvishd.w_recvalid = 0;
        docvishd.w_recseq   = dataObj.docvishd.curPtr;
        docvishd.w_recsync  = 0;

        //copy editRec to preeditRec, so that we can compare it onSaveEntry logic
        //to determine if record has changed   
        angular.copy(dataObj.docvisit.editRec.docvishd[0], dataObj.docvisit.preeditRec.docvishd[0]);

    };

    $scope.onSetRecord = function () {
        var docvishd = dataObj.docvisit.editRec.docvishd[0]

        angular.copy(dataObj.docvisit.editRec.docvishd[0], dataObj.docvisit.preeditRec.docvishd[0]);
    };

    $scope.showProds = function (currec) {
        //set current pointer of parent record
        dataObj.docvishd.curPtr = currec;
        dataObj.docvishd.curMode = 0;
        dataObj.docvishd.lastOpr = 'products'; 

        angular.copy(dataObj.docvishd.querySet[dataObj.docvishd.curPtr], dataObj.docvishd.editRec[0]);
     
        //construct cpkeysObj from parent
        for (var myProp in dataObj.docvishd.cpkeysObj) {
            dataObj.docvishd.cpkeysObj[myProp] = dataObj.docvishd.editRec[0][myProp];
        }
//        alert(JSON.stringify(dataObj.docvishd.cpkeysObj));
        
        var parProp = "";  
        for (var myProp in dataObj.docvishd.chkeysmap) {
            parProp =  dataObj.docvishd.chkeysmap[myProp];
            dataObj.docvishd.chkeysObj[myProp] = dataObj.docvishd.editRec[0][parProp];
        }
    };

    $scope.onFocus = function (_cObjName) {
        console.log("hi from onFocus 2 - " + _cObjName);
        return false;
    };
 
    $scope.onBlur = function (_cObjName) {
        console.log("hi from onBlur - " + _cObjName);

        var onUpdatedFn = "$scope.onUpdated_" + _cObjName +'()';
        eval(onUpdatedFn);

        var onValidateFn = "$scope.onValidate_" + _cObjName +'()';
        eval(onValidateFn);

    };

    $scope.onUpdated_vistime = function () {
      //  alert('onUpdated_ of vistime')
    };

    $scope.onUpdated_town = function () {
       //key field should be in uppercase
        var town = docvishd.town;
        docvishd.town = town.toUpperCase();
    };

    $scope.onUpdated_doctcd = function () {
        //key field should be in uppercase
        var doctcd = docvishd.doctcd;
        docvishd.doctcd = doctcd.toUpperCase();
    };
    
    $scope.onUpdated_remarks = function () {
//        alert("remarks "+JSON.stringify(dataObj.docvisit.editRec.docvishd[0]));
    };

    $scope.onUpdated_prodcd = function () {
        
    };

    $scope.onUpdated_sampleqty = function () {
        
    };

    //Key field. onupdated is not required as it will not be changed. But onvalidate is required as date comes 
    //from the data visit query screen.
    $scope.onValidate_visdate = function () {
        //Visit Date should be less than or equal to today
        //GetUtcDtTm to be used later
        
        var today = new Date().toISOString();
        if ((docvishd.visdate).toString() > today.substring(0,10))
        {
            state_docvishd.visdate.valid = false;
            state_docvishd.visdate.message = "Visit Date cannot be greater than Today's date.";
            return false;
        }
        else
        {   state_docvishd.visdate.valid = true;
            state_docvishd.visdate.message = "";
            return true;
        }
    };

    $scope.onValidate_vistime = function () {
        //Vistime should be required
        //Vistime should be fill completely
        //Vistime should not contain embedded spaces
        if ($scope.myform.vistime.$invalid)
        {
            state_docvishd.vistime.valid = false;
            state_docvishd.vistime.message = "Invalid Visit Time.";

            if ($scope.myform.vistime.$error.required)
            {
                state_docvishd.vistime.message = "Visit Time must be specified.";
                return false;
            };
        } 

        else
        {
            state_docvishd.vistime.valid = true;
            state_docvishd.vistime.message = "";
            return true;
        };      
    };

    $scope.onValidate_town = function () {
       //Town should be checked whether it belongs to TOWNMST for LocCd,HeadQrt,Town
       //Town is required
       //Town should not be closed

        if ($scope.myform.town.$invalid)
        {
            state_docvishd.town.valid = false;
            state_docvishd.town.message = "Invalid Town.";

            if ($scope.myform.town.$error.required)

            {
                state_docvishd.town.message = "Town must be specified.";
                return false;
            };
        } 

        else
        {
            var town = refTables._getValue("townmst",{loccd:docvishd.loccd,headqrt:docvishd.headqrt,town:docvishd.town},"this.town", "");
            var isrecclsd = refTables._getValue("townmst",{loccd:docvishd.loccd,headqrt:docvishd.headqrt,town:docvishd.town},"this.isrecclsd", false);

            if (docvishd.town.length > 20)
            {
                state_docvishd.town.valid = false;
                state_docvishd.town.message = "Town cannot be more than 20 characters.";
                return false;
            }
            else if (docvishd.town != town)
            {

                state_docvishd.town.valid = false;
                state_docvishd.town.message = "This Town is not present in Towns Master Table.";
                return false;

            }
            else if (isrecclsd == true )
            {
                state_docvishd.town.valid = false;
                state_docvishd.town.message = "This Town is Closed. Cannot be used.";
                return false;
            }
            else
            {
                state_docvishd.town.valid = true;
                state_docvishd.town.message = "";
                return true;
            }
            
        };      
    };

    $scope.onValidate_doctcd = function () {
        //Doctcd should be checked whether it belongs to DOCTMST for LocCd,HeadQrt,Town,DoctCd
        //DoctCd is required
        //Doctcd should not be closed
        if ($scope.myform.doctcd.$invalid)
        {
            state_docvishd.doctcd.valid = false;
            state_docvishd.doctcd.message = "Invalid Doctor Code.";

            if ($scope.myform.doctcd.$error.required)
            {
                state_docvishd.doctcd.message = "Doctor Code must be specified.";
                return false;
            };
        } 
        else
        {
            var doctcd = refTables._getValue("doctmst",{loccd:docvishd.loccd,headqrt:docvishd.headqrt,town:docvishd.town,doctcd:docvishd.doctcd},"this.doctcd", "");
            var isrecclsd = refTables._getValue("doctmst",{loccd:docvishd.loccd,headqrt:docvishd.headqrt,town:docvishd.town,doctcd:docvishd.doctcd},"this.isrecclsd", false);
            
            if (docvishd.doctcd.length > 10)
            {
                state_docvishd.doctcd.valid = false;
                state_docvishd.doctcd.message = "Doctor Code cannot be more than 10 characters.";
                return false;
            }
            else if (docvishd.doctcd != doctcd)
            {
            
                state_docvishd.doctcd.valid = false;
                state_docvishd.doctcd.message = "This Doctor's Code is not present in Doctors Master Table.";
                return false;
            }
            else if (isrecclsd == true )
            {
                state_docvishd.doctcd.valid = false;
                state_docvishd.doctcd.message = "This Doctor's Code is Closed. Cannot be used.";
                return false;
            }
            else
            {
               state_docvishd.doctcd.valid = true;
               state_docvishd.doctcd.message = "";
               return true;
            }
        };      
    };

    $scope.onValidate_remarks = function () {
        state_docvishd.remarks.valid = true;
        state_docvishd.remarks.message = "";
    };

   $scope.onValidate_prodcd = function () {
        state_docvispg.prodcd.valid = true;
        state_docvispg.prodcd.message = "";
    };

  $scope.onValidate_sampleqty = function () {
        state_docvispg.sampleqty.valid = true;
        state_docvispg.sampleqty.message = "";
    };

   $scope.donewithProd = function(){
     dataObj.docvishd.tab1 = true;
     dataObj.docvishd.tab2 = false;
    }

    $scope.selProd = function() {

       dataObj.docvisit.txqrSet.docvispg = ($filter('filter')(dataObj.docvisit.txqrSet.docvispg,{loccd: $scope.loccd,empno: $scope.empno, visdate: $scope.visdate}));
  
        angular.copy(dataObj.docvisit.txqrSet.docvispg, dataObj.docvisit.txSet.docvispg);

        $scope.docvispg_querySet = dataObj.docvisit.txSet.docvispg;
    }
    
    $scope.prodAdd = function () {
           dataObj.docvispg.curModepg = 2; //add   
           dataObj.docvispg.curPtr = dataObj.docvisit.txqrSet.docvispg.length + 1 -1;
           dataObj.docvispg.lastOpr = 'add'; 
         $state.go('docvisit.update.product') ;  
    }
    $scope.prodEdit = function (currec) {
        dataObj.docvispg.curModepg = 1; //edit  
        dataObj.docvispg.curPtr = currec;   
        dataObj.docvispg.lastOpr = 'edit'; 
         $state.go('docvisit.update.product');
    } 

    $scope.prodDel = function (currec) {
          dataObj.docvispg.curPtr = currec;
          dataObj.docvispg.lastOpr = 'del'; 

          angular.copy(dataObj.docvispg.querySet[dataObj.docvispg.curPtr], dataObj.docvispg.editRec[0]);
        
          var docvispg = dataObj.docvispg.editRec[0];
          docvispg.w_rectype  = "D";
          docvispg.w_recseq   = dataObj.docvispg.curPtr;

          angular.copy(dataObj.docvispg.editRec[0], dataObj.docvispg.querySet[dataObj.docvispg.curPtr]);
    };
 
    $scope.callDdn = function (_cObjName){
        if (_cObjName=='town') {
           $state.go('docvisit.update.town') ;
        }
        else if (_cObjName=='doctcd') {
          $state.go('docvisit.update.doctor') ;
        }
        else if (_cObjName == 'prodcd'){
          $state.go('docvisit.update.product.code') ;    
        }
    }

    $scope.assignTm = function() {
     $scope.docvishd.vistime = $filter('date')($scope.docvishd.vistime, 'HH:mm');
    }
  
    $scope.onRecordValidate = function () {
        if (state_docvishd.visdate.valid == false) {
            if ($scope.onValidate_visdate() == false)
                {
                return false;
            }
            }

        if (state_docvishd.vistime.valid == false) {
            if ($scope.onValidate_vistime() == false)
                {
                return false;
            }
            }            

        if (state_docvishd.town.valid == false) {
            if ($scope.onValidate_town() == false) 
            {
                return false;
            }
            }

        if (state_docvishd.doctcd.valid == false) {
            if ($scope.onValidate_doctcd() == false)
             {
                return false;
            }   
            }   

        if (state_docvishd.remarks.valid == false) {
            if ($scope.onValidate_remarks() == false)
                {
                return false;
            }
            }            
        return true;
    } ;


    //call onValidate of key fields after defining the function 
    $scope.onValidate_visdate ();

    $scope.saveEntry = function () {
        if (dataObj.docvishd.curMode !== 0) {
            var docvishd = dataObj.docvisit.editRec.docvishd[0];
            var pre_docvishd = dataObj.docvisit.preeditRec.docvishd[0];
            var recchanged = false;
            for (var myProp in docvishd) {
                if (docvishd[myProp] !== pre_docvishd[myProp]) {
                    recchanged = true;
                }
            }

            if (recchanged == true) {
                docvishd.w_recstat = "C";
            }  

            _userid = "USER1";
            docvishd.mstupdby = _userid;
            docvishd.mstupddttm = new Date().toISOString();
            
            //if there is no change disallow save
            if (docvishd.w_recstat !== "C") {
                //pending 
                //check if changes are made to the child (new rows are added or rows are edited in products breifed tab)
                //alert("No changes were done, there is nothing to save");
                $dialogs.notify('Information','No changes were done, there is nothing to save');
                return false;
            }

            //Validate full record again and set w_recvalid flag)

             if ($scope.onRecordValidate() == false )
            {
                return false;
            }
            else
             {
                docvishd.w_recvalid = 1;
             }   

        }

        if (dataObj.docvishd.curMode == 1) {
            // Edit Mode 
            angular.copy(dataObj.docvisit.editRec.docvishd[0], dataObj.docvisit.txqrSet.docvishd[dataObj.docvishd.curPtr]);

            $dialogs.notify('Information','Record is modified');
        } 

        if (dataObj.docvishd.curMode == 2) {
            //Append Mode
            //append a new entry 
            dataObj.docvisit.txqrSet.docvishd.push({});
            angular.copy(dataObj.docvisit.editRec.docvishd[0], dataObj.docvisit.txqrSet.docvishd[dataObj.docvishd.curPtr]);
           $dialogs.notify('Information','Record is appended');
        }
         
        //set view mode and go to docvisitqr.html
        dataObj.docvishd.curMode = 0;
        $state.go('docvisit');

        //save on backend
        //save on localstorage with w_syncflag = 0
        //when update set W-sync to 1, set w_rectype = "O", w_recstat = " "

    };


    $scope.cancelEntry = function () {
        var m = $dialogs.confirm('Question','Do you want to canel the changes, if any ?');
        
        m.result.then(function(){
          //set view mode and go to docvisitqr.html
          dataObj.docvishd.curMode = 0;
         $state.go('docvisit');
        });
    };

$scope.selectDate = function(dt){
        var d = dt.getDate() ;
        d= (d <10 ? '0':'')+d;
        var m = dt.getMonth() + 1;
        m= (m < 10? '0':'')+m;
        var date = dt.getFullYear() + '-' + m +  '-' + d;

        dataObj.docvishd.visdate = date;
       $state.go('docvisit');
    }

    $scope.editProd = function (currec) {
        dataObj.docvispg.curPtr = currec;
        dataObj.docvispg.curMode = 1;
        dataObj.docvispg.lastOpr = 'edit'; 
        angular.copy(dataObj.docvisit.txqrSet.docvispg[dataObj.docvispg.curPtr], dataObj.docvisit.editRec.docvispg[0]);

        //call onSetRecord
        $scope.onSetProd();
    };

    $scope.addProd = function (){
        //set Current pointer, set mode
        //and copy emptySet to editRec
        dataObj.docvispg.curPtr = dataObj.docvisit.txqrSet.docvispg.length + 1 -1;
        dataObj.docvispg.curModepg = 2;
        dataObj.docvispg.lastOpr = 'add'; 
        
        $scope.onNewProd();
       };

      $scope.doneProd = function(){
        if (dataObj.docvispg.curModepg == 1) {
            // Edit Mode 
             angular.copy(dataObj.docvisit.editRec.docvispg[0], dataObj.docvisit.txqrSet.docvispg[dataObj.docvispg.curPtr]);

            dataObj.docvisit.txqrSet.docvispg = ($filter('filter')(dataObj.docvisit.txqrSet.docvispg,{loccd: $scope.loccd,empno: $scope.empno, visdate: $scope.visdate}));
            angular.copy(dataObj.docvisit.txqrSet.docvispg, dataObj.docvisit.txSet.docvispg);
            
        } 

        if (dataObj.docvispg.curModepg == 2) {
            //Append Mode
            //append a new entry 
            dataObj.docvisit.txqrSet.docvispg.push({});
            angular.copy(dataObj.docvisit.editRec.docvispg[0], dataObj.docvisit.txqrSet.docvispg[dataObj.docvispg.curPtr]);

            dataObj.docvisit.txqrSet.docvispg = ($filter('filter')(dataObj.docvisit.txqrSet.docvispg,{loccd: $scope.loccd,empno: $scope.empno, visdate: $scope.visdate}));
            angular.copy(dataObj.docvisit.txqrSet.docvispg, dataObj.docvisit.txSet.docvispg);

        }
        
        //set view mode and go to docvisitqr.html
        dataObj.docvispg.curModepg = 0;
        angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.editRec.docvispg[0]);
       $state.go('docvisit.update');
        
    }

    $scope.cancelProd = function () {
          dataObj.docvispg.curModepg = 0;
          angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.editRec.docvispg[0]);
      $state.go('docvisit.update');
    };

    $scope.onNewProd = function (){
        angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.editRec.docvispg[0]);

        // update inherited fields
        docvispg.loccd   = docvishd.loccd;
        docvispg.empno   = docvishd.empno;
        docvispg.visdate = docvishd.visdate;
        docvispg.sldivcd = docvishd.sldivcd;

        //update control indicators
        docvispg.w_rectype  = "N";
        docvispg.w_recstat  = " ";
        docvispg.w_recvalid = 0;
        docvispg.w_recseq   = dataObj.docvispg.curPtr;
        docvispg.w_recsync  = 0;

        //copy editRec to preeditRec, so that we can compare it onSaveEntry logic
        //to determine if record has changed   
        angular.copy(dataObj.docvisit.editRec.docvispg[0], dataObj.docvisit.preeditRec.docvispg[0]);
    };

    $scope.onSetProd = function () {

        docvispg.loccd   = docvishd.loccd;
        docvispg.empno   = docvishd.empno;
        docvispg.visdate = docvishd.visdate;

        angular.copy(dataObj.docvisit.editRec.docvispg[0], dataObj.docvisit.preeditRec.docvispg[0]);
    };

    // lastopr is checked because, addprod() and editprod() has to be called only once for the corresponding setup. In all othercases(selecting product form dropdown)
    // it show work on the existing editRecord. After calling the function lastopr is made empty(see if it can be set laterstage)
    var currmode = dataObj.docvispg.curModepg ;
    var currrec  = dataObj.docvispg.curPtr;
    var opr      = dataObj.docvispg.lastOpr ;

    if (currmode == 2 && opr == 'add')
    {
        $scope.addProd();
        dataObj.docvispg.lastOpr = '';
    }
    else if (currmode == 1 && opr == 'edit')
    {
        $scope.editProd(currrec);
        dataObj.docvispg.lastOpr = '';
    }
 //for  incrementor/decrementor
    
    $scope.decrVal = function(val) {
        docvispg.sampleqty = val - 1;
    };

    $scope.incrVal = function(val) {
        docvispg.sampleqty = val + 1;
    };

    $scope.minNumber = function(){
        if (docvispg.sampleqty < 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    };      

    $scope.maxNumber = function(){
        if (docvispg.sampleqty >= 10)
        {
            return true;
        }
        else
        {
            return false;
        }
    };      


    $scope.prodmst = [];
    angular.copy(refTables.prodmst,$scope.prodmst);
    
    $scope.recentprod= [{prodcd: 'BALIKA',prodname: 'BALIKA GUTTI',isrecclsd:  0},{prodcd: 'ASCORIL',prodname: 'ASCORIL D Q for Dry Cough',isrecclsd:  0},{prodcd: 'SINARESTTTTT',prodname: 'SINAREST AF',isrecclsd:  0}];
    
    $scope.selectProd = function(prodcd){
        $scope.docvispg.prodcd = prodcd;
        $state.go('docvisit.update.product');
    }

    $scope.doctmst = [];
    angular.copy(refTables.doctmst,$scope.doctmst);
    
    $scope.recentdoct= [{loccd: 'GOA',headqrt: 'PANAJI',town: 'VASCO',doctcd: 'TPADHYE',doctname: 'Tarun Padhye',isrecclsd:  0},{loccd: 'GOA',headqrt: 'PONDA',town: 'BORIM ',doctcd: '0000000002',doctname: '0000000002',isrecclsd: 0},{loccd: 'GOA',headqrt: 'PANAJI ',town: 'MAPUSA ',doctcd: 'PILLAMAN',doctname: 'Pilla Man  ',isrecclsd: 0}];
    
    $scope.selectDoct = function(doctcd){
        $scope.docvishd.doctcd = doctcd;
      $state.go('docvisit.update');
    }
  
   $scope.townmst = [];
    angular.copy(refTables.townmst,$scope.townmst);
    $scope.recenttown= [{loccd: 'GOA',headqrt: 'PANAJI',town: 'VASCO',isrecclsd:  0},{loccd: 'GOA',headqrt: 'PONDA',town: 'CURTI',isrecclsd: 0},{loccd: 'GOA',headqrt: 'PONDA',town: 'BORIM',isrecclsd: 0}];
    
    $scope.selectTown = function(town){
        $scope.docvishd.town = town;
      $state.go('docvisit.update');
    }

}]);
