/**
 * Created by hejiao on 2018/6/12.
 */
(function() {
    'use strict';
    angular.module('commonalityApp',[])
        .controller('modalController', modalController);

    modalController.$inject = ['$scope'];
    function modalController($scope) {
        $scope.modaltrue = false;
        $scope.openClick = function () {
            $scope.modaltrue = true;
        };
        $scope.CancelClick = function () {
            $scope.modaltrue = false;
        }
    }
}());