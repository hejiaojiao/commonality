/**
 * Created by hejiao on 2018/7/3.
 */
angular.module('commonalityApp')
    .controller('lazyLoadingController',['$scope','$http','$filter','$document',function($scope,$http,$filter,$document){
        $scope.lazy_imgList = [
            {'src':'../assets/images/02.jpg'},
            {'src':'../assets/images/03.jpg'},
            {'src':'../assets/images/07.jpg'},
            {'src':'../assets/images/05.jpg'},
            {'src':'../assets/images/06.jpg'}
        ];
        /*练习示例*/
        $scope.lists = [
            {'name':'何娇','age':'18','native_place':'中国四川'},
            {'name':'何娇1','age':'19','native_place':'中国上海'},
            {'name':'何娇2','age':'20','native_place':'中国天津'}
        ];


    }])
    .directive('lazyLoad',[function(){
        return{
            restrict:'A',
            link:function(scope,element,attrs){
                element.find('.lazy-img').click(function(){

                })
            }
        }
    }]);