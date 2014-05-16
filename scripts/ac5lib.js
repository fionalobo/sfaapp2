angular.module('ac5lib',[])
.service('ac5lib', function(){
    this._monthName = function(field){
     var vdate = new Date(field);

     var month=new Array();
     month[0]='JAN,';
     month[1]='FEB,';
     month[2]='MAR,';
     month[3]='APR,';
     month[4]='MAY,';
     month[5]='JUN,';
     month[6]='JUL,';
     month[7]='AUG,';
     month[8]='SEP,';
     month[9]='OCT,';
     month[10]='NOV,';
     month[11]='DEC,';
     var m = month[vdate.getMonth()];
    
    return m;

    };

    this._weekDay = function(field){
     var vdate = new Date(field);

     var _weekDay=new Array(7);
     _weekDay[0]='Sunday';
     _weekDay[1]='Monday';
     _weekDay[2]='Tuesday';
     _weekDay[3]='Wednesday';
     _weekDay[4]='Thursday';
     _weekDay[5]='Friday';
     _weekDay[6]='Saturday';

     var n = _weekDay[vdate.getDay()];

     return n;
    };

});

