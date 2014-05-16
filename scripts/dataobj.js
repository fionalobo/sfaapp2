angular.module('dataObj',[])
.factory('dataObj', [function () {
    var dataObj = {};

    dataObj.appBooted = 0;
    dataObj.srvOnline = false;


    dataObj.appGlobal = {};
    dataObj.appGlobal.appSettings = {serverurl:"http://192.168.0.252/perp2012home/erpisapi.dll/mobiserver1"};
    dataObj.appGlobal.ssnInfo = {loccd:"GOA",appmodid:"MSFA",usercd:"FIONA",ssnid:"1",ssnkey:"123456789",ssnreqno:1,ssnreqdttm:"",ssnexphrs:10};
    dataObj.appGlobal.userSignedin = false;
    dataObj.appGlobal.userInfo = {empno:"E11293",empname:"Fiona Lobo"};

    dataObj.docvisit = {};
    dataObj.docvisit.txqrkey = {loccd: "",empno: "",visdate: ""};

    dataObj.docvisit.docvishd = {};
    dataObj.docvisit.docvishd.cpkeysObj = {loccd: "", empno: "", visdate: "", vistime: ""};

    dataObj.docvisit.docvispg = {};
    dataObj.docvisit.docvispg.chkeysObj = {loccdx: "", empnox: "", visdatex: "", vistimex: "",prodcd: ""};
    dataObj.docvisit.docvispg.chkeysMap = {loccdx: "loccd", empnox: "empno", visdatex: "visdate", vistimex: "vistime"};

    dataObj.docvisit.emptySet = {};
    dataObj.docvisit.emptySet.docvishd = [{loccd: "",empno: "",visdate: "",vissrl: "",headqrt: "",sldivcd: "", town: "", doctcd: "",vistime: "",waitprd: 0,meetprd: 0,remarks: "",mstupdby: "",mstupddttm: "",w_rectype: "N", w_recstat: " ", w_recvalid: 0,w_recseq: 0,w_recsync: 0}];                                      
    dataObj.docvisit.emptySet.docvispg = [{loccd: "",empno: "",visdate: "",vissrl: "001",sldivcd: "", prodcd: "", pgcd: "",sampleqty: 0,w_rectype: "N", w_recstat: " ", w_recvalid: 0,w_recseq: 0,w_recsync: 0}];

    dataObj.docvisit.txqrSet = {};
    dataObj.docvisit.txqrSet.docvishd = []; //old json queryset(array of objects)
    dataObj.docvisit.txqrSet.docvispg = []; //old json queryset(array of objects)

    dataObj.docvisit.txSet = {};
    dataObj.docvisit.txSet.docvishd  = [{}]; // array of objects
    dataObj.docvisit.txSet.docvispg  = [{}];

    dataObj.docvisit.editRec = {};
    dataObj.docvisit.preeditRec = {};
    dataObj.docvisit.editRec.docvishd = [{}];
    dataObj.docvisit.preeditRec.docvishd = [{}];

    angular.copy(dataObj.docvisit.emptySet.docvishd[0], dataObj.docvisit.txSet.docvishd[0]);
    angular.copy(dataObj.docvisit.emptySet.docvishd[0], dataObj.docvisit.editRec.docvishd[0]);
    angular.copy(dataObj.docvisit.emptySet.docvishd[0], dataObj.docvisit.preeditRec.docvishd[0]);

    dataObj.docvisit.editRec.docvispg = [{}];
    dataObj.docvisit.preeditRec.docvispg = [{}];

    angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.txSet.docvispg[0]);
    angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.editRec.docvispg[0]);
    angular.copy(dataObj.docvisit.emptySet.docvispg[0], dataObj.docvisit.preeditRec.docvispg[0]);

    // For Memory Varibales(required for the calendar icon)
    dataObj.docvisit.m = [{}];

    //Townmst and Doctmst cache for pickindb
    dataObj.docvishd = {};
    
    dataObj.docvishd.curPtr = 0;
    dataObj.docvishd.curMode = 0; //0-show,1-edit,2-add
    dataObj.docvishd.lastOpr = ''; //last operation done
    dataObj.docvishd.visdate = '2010-04-20'; //for query select
    dataObj.docvishd.tab1 = true;
    dataObj.docvishd.tab2 = false;

    dataObj.docvispg = {};
    dataObj.docvispg.curPtr = 0;
    dataObj.docvispg.curModepg = 0; //0-show,1-edit,2-add
    dataObj.docvispg.lastOpr = ''; //last operation done
    
    dataObj.docvishd.state = [{loccd:{ajax:false,valid:false,message:''},town:{ajax:false,valid:false,message:''},doctcd:{ajax:false,valid:false,message:''},visdate:{ajax:false,valid:false,message:''},vistime:{ajax:false,valid:false,message:''},empno:{ajax:false,valid:false,message:''},headqrt:{ajax:false,valid:false,message:''},sldivcd:{ajax:false,valid:false,message:''},remarks:{ajax:false,valid:false,message:''}}];

    dataObj.docvispg.state = [{prodcd:{ajax:false,valid:false,message:''},sampleqty:{ajax:false,valid:false,message:''}}];

    return dataObj;
}])

