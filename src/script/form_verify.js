/**
 * Created by hejiao on 2018/5/8.
 */
var app = angular.module('commonalityApp',[]);
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
    var currentPage = 0;
    $scope.query = function(currentPage){
        $http.get('http://10.6.23.13:1088/applogs/api/logs?page='+currentPage+'&size=10').then(function success(data){
            if(data.status == 200){
                $scope.conditionList = data.data;
                $scope.dataList = data.data.content;
                $scope.number = $scope.conditionList.number +1;
            }else{
                $scope.loadErrorMsgb = true;
                $scope.loadErrorMsg ='数据加载失败！'
            }
        },function error(){
            $scope.loadErrorMsgb = true;
            $scope.loadErrorMsg ='数据加载失败！'
        });
    };
    $scope.query(currentPage);
    /*上一页下一页*/
    $scope.previousPageNumber = function(){
        $scope.query(currentPage-=1)
    };
    $scope.nextPageNumber = function(){
        $scope.query(currentPage+=1)
    };
    /*首页末页*/
    $scope.homePageClick = function(){
        $scope.query(0)
    };
    $scope.lastPageClick = function(totalPages){
        $scope.query(totalPages)
    }
}




