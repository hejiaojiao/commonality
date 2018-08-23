/**
 * Created by hejiao on 2018/7/3.
 */
(function() {
    'use strict';
    angular.module('commonalityApp',[])
        .directive('lazyLoad', lazyLoad)
        .controller('lazyLoadingController', lazyLoadingController);

    lazyLoadingController.$inject = ['$scope', '$http', '$filter', '$document'];
    function lazyLoadingController($scope, $http, $filter, $document) {
        $scope.lazy_imgList = [
            {'src': '../assets/images/02.jpg'},
            {'src': '../assets/images/03.jpg'},
            {'src': '../assets/images/07.jpg'},
            {'src': '../assets/images/05.jpg'},
            {'src': '../assets/images/06.jpg'}
        ];
    }

    lazyLoad.$inject = [];
    function lazyLoad() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var img_src = scope.lazy_imgList;
                console.log(img_src);
            }
        }
    }
}());