angular.module('refTables',[])
.factory('refTables', [function () {
    var refTables = {};
    
    //All Fk tables
    //Define structure here
    // and load them in appinit()
    refTables.empmst = [{empno:"000001",empname:"someone",headqrt:"PANAJI",sldivcd:"HC"},{empno:"000002",empname:"someone",headqrt:"PANAJI1",sldivcd:"HC1"}];
    refTables.townmst = [];
    refTables.doctmst = [];
    refTables.prodmst = [];

    refTables._thisrecord = {};

    refTables._getValue = function(tableName,keymapObj,retexprStr, nomatchValue) {
        //refTables._getvalue("empmst",{empno:docvishd.empno},"thisrecord.headqrt", "");
//        alert ("table is " + tableName + " ," + "keymap is " + JSON.stringify(keymapObj) + " ," + "retexpr is " + retexprStr );
        refTables._thisrecord = _.findWhere(refTables[tableName],keymapObj);
        if (refTables._thisrecord != undefined) {
            //IMP : thisrecord will not work on minification !
            refTables._thisrecord._evalexpr = function (cExpr) {return eval(cExpr)};
  //          alert("this record obj is " + JSON.stringify(refTables._thisrecord));

            return refTables._thisrecord._evalexpr(retexprStr);
        } else {
            return nomatchValue;
        }
    };
         
    return refTables;
}]);
