define("QueryParser", function(require, exports, module) {
    'use strict';
    
    /**
     * URL Query parser
     * @module modules/QueryParser
     * @name QueryParser
     */
    
    
    /**
     * @function getUrlParameters
     * @description Parses the query parameters of a given URL
     * @param {string} url - Fully qualified URL
     * @returns {object} status Object containing all the query parameters
     */
    var getUrlParameters = function (url) {
        var status = {};
        var urlSplit = url.split("?");
        
        if (urlSplit.length === 1) {
            status.result = "error";
            status.message = "No query parameters";
        }
        else {
            status.result = "success";
//            status.queryParams = [];
            status.queryParams = {};
            var params = urlSplit[1].split("&");
            
            for(var i = 0; i < params.length; i++) {
                var parameter = params[i].split("=");
                
                status.queryParams[parameter[0]] = parameter[1];
            }
            
//            for(var i = 0; i < params.length; i++) {
//                var parameter = params[i].split("=");
//                
//                var queryParam = {};
//                
//                queryParam.key = parameter[0];
//                queryParam.value = parameter[1];
//                
//                status.queryParams.push(queryParam);
//            }
        }
        
        return status;
    };
    
    exports.getUrlParameters = getUrlParameters;
});