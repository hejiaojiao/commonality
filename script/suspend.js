/**
 * Created by 何娇  on 2018/4/27.
 */
angular.module('commonalityApp')

.controller('suspendController',['$scope','$http','$filter',function($scope,$http,$filter){
    $http.get("http://122.114.75.166:8082/app/iptv/findChannels?tag=88888888")
        .then(function success(res) {
            $scope.roll_list = res.data.data;
        },function error() {

        });
}])
/*悬浮框*/
.directive('suspendBox',suspendBox);
suspendBox.$injector = ['$interval', '$document'];
function suspendBox($interval,$document){
    return{
        restrict:'AE',
        replace:true,
        template:'<div class="pos-alert">' +
        '<button class="btn btn-warning" type="button">悬浮提示</button>'+
        '<div class="alert-box"><div ng-transclude></div><div class="close-icon fa fa-close"></div></div>' +
        '</div>',
        transclude: true,
        scope:{
            openWay:'@'
        },
        link:link,
        controller:controller
    };
    function controller(){

    }
    function link(scope,eleme,attr){
        var element = angular.element(document),
             btn_box = element.find(".btn"),
            alert_box = element.find(".alert-box"),
            close_icon = element.find(".close-icon");
            alert_box.css({
                'display':'none'
            });
        /*获取宽高度和位置*/
        function getLocation(){
            var clientH = eleme[0].lastChild.clientHeight,
                offsetTop = eleme[0].offsetTop,
                offsetLeft = eleme[0].offsetLeft;
            console.log(offsetLeft);
            if(offsetTop>=clientH){
                alert_box.addClass('topLeft')
            }else{

            }
        }
        /*鼠标hover显示隐藏提示*/
        if(scope.openWay == 'hover'){
            btn_box.on('mouseover',function(){
                alert_box.css({
                    'display':'block'
                });
                getLocation();
            });
            btn_box.on('mouseout',function(){
                alert_box.css({
                    'display':'none'
                });
            });
            close_icon.css({
                'display':'none'
            });
            /*点击显示隐藏提示*/
        }else if(scope.openWay == 'click'){
            btn_box.on('click',function(){
                alert_box.css({
                    'display':'block'
                });
                getLocation();
            });
            close_icon.on('click',function(){
                alert_box.css({
                    'display':'none'
                });
            })
        }else{

        }
    }
}