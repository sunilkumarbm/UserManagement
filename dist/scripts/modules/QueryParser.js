define("QueryParser", function(require, exports, module) {
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