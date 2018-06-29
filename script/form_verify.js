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

formValidController.$injector = ['$scope','$http','$filter'];
function formValidController($scope,$http,$filter) {
    /*接口调用*/
    $http.get('http://10.6.23.13:1088/applogs/api/logs?page=0&size=10').then(function success(data){
            if(data.status == 200){
                $scope.query = function(){
                    $scope.conditionList = data.data;
                    $scope.dataList = data.data.content;
                    $scope.number = $scope.conditionList.number +1;
                };
                $scope.query();
                console.log($scope.conditionList);
                $scope.previousPageNumber = function(){
                    $scope.number--;
                    if($scope.number<=0){

                    }
                };
                $scope.nextPageNumber = function(){
                    $scope.number++;
                }
            }else{
                $scope.loadErrorMsgb = true;
                $scope.loadErrorMsg ='数据加载失败！'
            }
            },function error(){
            $scope.loadErrorMsgb = true;
            $scope.loadErrorMsg ='数据加载失败！'
     });
    }




