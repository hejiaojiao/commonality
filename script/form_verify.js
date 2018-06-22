/**
 * Created by hejiao on 2018/5/8.
 */
var app = angular.module('commonalityApp');
    app.controller("formValidController" , formValidController);

/*全局加载*/
var httpCount = 0;
app.factory("httpInterceptor", [ "$q", "$rootScope", function($q, $rootScope) {
    return {
        request: function(config) {
            httpCount++;
            layer.load();
            return config || $q.when(config);
        },
        requestError: function(rejection) {
            httpCount--;
            return $q.reject(rejection);
        },
        response: function(response) {
            httpCount--;
            if(httpCount == 0){
                layer.closeAll();
            }
            return response || $q.when(response);
        },
        responseError : function(rejection) {
            httpCount--;
            if(httpCount == 0){
                layer.closeAll();
            }
            return $q.reject(rejection);
        }
    };
}]);
app.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

formValidController.$injector = ['$scope','$http'];
function formValidController($scope,$http) {
    /*接口调用*/
        $http.get('http://10.6.23.13:1088/applogs/api/logs?page=10&size=200')
        .then(function success(res){
            $scope.conditionList = res.data;
            $scope.dataList = res.data.content;
            console.log(res.data);
            $scope.previousPageNumber = function(){

            };
            $scope.nextPageNumber = function(){

            }
        },function error(){
            $scope.loadErrorMsg = '加载失败，请重试！';
        });
    }




