/**
 * Created by hejiao on 2018/7/3.
 */
(function() {
    'use strict';
    angular.module('commonalityApp')
        .directive('lazySrc', lazySrc)
        .controller('lazyLoadingController', lazyLoadingController);

    lazyLoadingController.$inject = ['$scope', '$http', '$filter', '$document'];
    function lazyLoadingController($scope, $http, $filter, $document) {

    }

    lazySrc.$inject = [];
    function lazySrc() {
        var src_list = [];
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                console.log(attrs)

            }
        }
    }
}());