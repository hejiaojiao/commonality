/**
 * Created by 何娇  on 2018/4/27.
 */
angular.module('commonalityApp')

.controller('suspendController',['$scope','$http','$filter',function($scope,$http,$filter){
    //$http.get("http://122.114.75.166:8082/app/iptv/findChannels?tag=88888888")
    //    .then(function success(res) {
    //        $scope.roll_list = res.data.data;
    //    },function error() {
    //
    //    });
}])
/*悬浮框*/
.directive('suspend',[function(){
    return{
        restrict:'E',
        template:'<div ng-transclude></div>',
        transclude:true,
        link:link
    };
    function link(scope,eleme,attrs){

    }
}])
.directive('suspendBox',[function(){
        return{
            restrict:'E',
            template:'<div ng-transclude="alertIcon"></div>'+
            '<div class="pos-alert">' +
            '<div class="alert-box"><div ng-transclude="alertContent"></div><div class="close-icon fa fa-close"></div></div>' +
            '</div>',
            transclude:{
                'alertContent':'alertContent',
                'alertIcon':'alertIcon'
            },
            link:link,
            controller:function($scope,$element,$attrs){

            }
        };
        function link(scope,eleme,attrs){
            var btn_box = eleme.find(".btn"),
                alert_box = eleme.find(".alert-box"),
                close_icon = eleme.find(".close-icon");
            alert_box.css({
                'display':'none'
            });
            /*获取宽高度和位置*/
            function getLocation(){
                var clientH = eleme.find(".alert-box").outerHeight(),
                    clientW = eleme.find(".alert-box").outerWidth(),
                    offsetTop = eleme.offset().top,
                    offsetLeft = eleme.offset().left,
                    offsetParent = eleme[0].offsetParent;
                /*获取当前元素距离顶部以及最左侧的距离*/
                while(offsetParent != null){
                    offsetTop += offsetParent.offsetTop + offsetParent.clientTop;
                    offsetLeft += offsetParent.offsetLeft + offsetParent.clientLeft;
                    offsetParent = offsetParent.offsetParent;
                }
                /*判断距离显示位置*/
                if(offsetTop>=clientH && offsetLeft>clientW){
                    alert_box.addClass('topRight')
                }else if(offsetTop>=clientH && offsetLeft<clientW){
                    alert_box.addClass('topLeft')
                }else if(offsetTop<clientH && offsetLeft>clientW){
                    alert_box.addClass('bottomRight')
                }
            }
            /*鼠标hover显示隐藏提示*/
            if(attrs.openWay == 'hover'){
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
            }else if(attrs.openWay == 'click'){
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
    }]);