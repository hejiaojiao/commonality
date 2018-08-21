/**
 * Created by hejiao on 2018/6/12.
 */
angular.module('commonalityApp',[])
.controller('modalController',['$scope',function($scope){
        $scope.modaltrue = false;
        $scope.openClick = function(){
            $scope.modaltrue = true;
        };
        $scope.CancelClick = function(){
            $scope.modaltrue = false;
        }
    }]);