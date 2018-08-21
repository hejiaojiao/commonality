/**
 * Created by hejiao on 2018/7/3.
 */
angular.module('commonalityApp',[])
    .controller('lazyLoadingController',['$scope','$http','$filter','$document',function($scope,$http,$filter,$document){
        $scope.lazy_imgList = [
            {'src':'../assets/images/02.jpg'},
            {'src':'../assets/images/03.jpg'},
            {'src':'../assets/images/07.jpg'},
            {'src':'../assets/images/05.jpg'},
            {'src':'../assets/images/06.jpg'}
        ];
    }])
    .directive('lazyLoad',[function(){
        return{
            restrict:'A',
            link:function(scope,element,attrs){
                var img_src = scope.lazy_imgList;
                console.log(img_src);
            }
        }
    }]);