angular.module('lstoreServer',[])
.service('lstoreServer', ['$http', '$q', function ($http, $q) {
    //tbd - http timeout, 
    this.hasContainer  = function (containerName) {
//        alert("hi from lstoreServer - " + containerName);
        if (typeof localStorage[containerName] !== 'undefined') {
//            alert("hi - container exists");
            return true;
        } else {
//            alert("hi - container does not exist");
            return false;
        }
    };

    this.createContainer  = function (containerName, maxEntries) {
//        alert("hi from lstoreServer - " + containerName);
        if (typeof localStorage[containerName] !== 'undefined') {
//            alert("hi - container already exists - no need to create");
            return true;
        } else {
//            alert("hi - container does not exist - creating now");
            var myContainer = {};
            myContainer.objList = [];
            myContainer.maxEntries = maxEntries;
            localStorage[containerName] = JSON.stringify(myContainer);
//            alert("hi - new container is : " + localStorage[containerName]);
            return true;
        }
    };

    this.deleteContainer  = function (containerName) {
//        alert("hi from lstoreServer - " + containerName);
        if (typeof localStorage[containerName] !== 'undefined') {
//            alert("hi - container exists - trying to delete");
            var myContainer = JSON.parse(localStorage[containerName]);
            for (var i=0; i < myContainer.objList.length; i++) {
                var objName = myContainer.objList[i].objToken;
//                alert("hi - removing object " + objName);
                //remove object from storage
                localStorage.removeItem(containerName+objName);
            }
           
            //now delete container 
//            alert("hi - removing container " + containerName);
            localStorage.removeItem(containerName);
            return true;
        } else {
//            alert("hi - container does not exist - no need to delete");
            return true;
        }    
    };


    this.hasObject  = function (containerName,objName) {
//        alert("hi from lstoreServer - " + containerName + " - " + objName);
        if (typeof localStorage[containerName] == 'undefined') {
//            alert("hi - container does not exist" );
            return false;
        } else {
//            alert("hi - container exists, checking for object in container's object list");
            var myContainer = JSON.parse(localStorage[containerName]);
            for (var i=0; i < myContainer.objList.length; i++) {
                if (myContainer.objList[i].objToken == objName) {
//                   alert("hi - object exists");
                   return true;
                } 
            }
            //container's object list does not have object's entry  
//            alert("hi - object does not exist");
            return false;
        }    
    };


    this.putObject  = function (containerName,objName,objStr) {
//        alert("hi from lstoreServer - " + containerName + " - " + objName);
        if (typeof localStorage[containerName] == 'undefined') {
//            alert("hi - container does not exist - can not update object" );
            return false;
        } else {
//            alert("hi - container exists, updating object");
            //tbd - maxentries/lru eviction
            var myContainer = JSON.parse(localStorage[containerName]);
            for (var i=0; i < myContainer.objList.length; i++) {
                if (myContainer.objList[i].objToken == objName) {
                    //update this entry for object
                    myContainer.objList[i].lruTime = new Date().getTime();

                    //update object in local storage
                    localStorage[containerName+objName] = objStr;

                    //update container's properties
                    localStorage[containerName] = JSON.stringify(myContainer);
//                    alert("hi - updated object string is : " + localStorage[containerName+objName]);
                    return true;
                } 
            }
  
            //add a new entry for the object 
            var myObj = {} ;
            myObj.objToken = objName;
            myObj.lruTime = new Date().getTime();
            myContainer.objList.push(myObj);
            localStorage[containerName+objName] = objStr;
            localStorage[containerName] = JSON.stringify(myContainer);
//            alert("hi - updated object string is : " + localStorage[containerName+objName]);
            return true;
        }    
    };


    this.getObject  = function (containerName,objName) {
//        alert("hi from lstoreServer - " + containerName + " - " + objName);
        if (typeof localStorage[containerName] == 'undefined') {
//            alert("hi - container does not exist - so no object" );
            return "";
        } else {
//            alert("hi - container exists, getting object");
            var myContainer = JSON.parse(localStorage[containerName]);
            for (var i=0; i < myContainer.objList.length; i++) {
                if (myContainer.objList[i].objToken == objName) {
                    //update this entry's lruTime
                    myContainer.objList[i].lruTime = new Date().getTime();
                    localStorage[containerName] = JSON.stringify(myContainer);
//                    alert("hi - required object string is : " + localStorage[containerName+objName]);
                    return localStorage[containerName+objName];
                } 
            }
            //error - no object 
//            alert("hi - object does not exist");
            return "";
        }    
    };


    this.deleteObject  = function (containerName,objName) {
//        alert("hi from lstoreServer - " + containerName + " - " + objName);
        if (typeof localStorage[containerName] == 'undefined') {
//            alert("hi - container does not exist - no need to delete object" );
            return true;
        } else {
//            alert("hi - container exists, deleting object");
            var myContainer = JSON.parse(localStorage[containerName]);
            for (var i=0; i < myContainer.objList.length; i++) {
                if (myContainer.objList[i].objToken == objName) {
                    //remove object from storage
                    localStorage.removeItem(containerName+objName);

                    //remove its entry from container's objectlist
                    myContainer.objList.splice(i,1);
                    localStorage[containerName] = JSON.stringify(myContainer);
                    return true;
                } 
            }
  
            // No object 
//            alert("hi - required object is not there - nothing to delete");
            return true;
        }    
    };

}]);