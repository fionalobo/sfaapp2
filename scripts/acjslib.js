

//utility functions
function obj2Str(myObj) {
    var retStr, myProp;
    retStr = '';
    for (myProp in myObj) {
        retStr = retStr + 'name: ' + myProp + ' ; value: ' + myObj[myProp] + ' ';
    }
    return retStr;
}

function str2MysqlStr(cStr) {
    cStr = cStr.replace(/'/g, "\\'");
    cStr = cStr.replace(/"/g, '\\"');

    //work on these details further,
    //see sqlstring.js of felixge 
    //_cStr = strtran(_cStr,[\],[\\])
    //_cStr = strtran(_cStr,["],[\"])
    //_cStr = strtran(_cStr,['],[\'])
    //_cStr = strtran(_cStr,chr(0),[\0])
    //_cStr = strtran(_cStr,chr(26),[\z])
    return "'" + cStr + "'" ;

    //we put every thing in single quotes in query string, bcuz it is itself 
    //put in json format in double quotes
    //otherwise, angular will try to insert escape chars
    // and that alters the semantics
}



