/**
 * Created by 何娇  on 2018/4/27.
 */
angular.module('commonalityApp')
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
        link:link
    };
    function link(scope,elme,attr){
        var elm = angular.element(document),
            btn_box = elm.find('.btn'),
            alert_box = elm.find('.alert-box'),
            close_icon = elm.find('.close-icon');
        alert_box.css({
            'display':'none'
        });
        /*获取宽高度和位置*/
        function getlocation(){
            var clientH = elme[0].lastChild.lastChild.clientHeight,
                offsetTop = elme[0].offsetTop;
            if(offsetTop>=clientH){
                alert_box.addClass('directionTop')
            }else{

            }
        }
        /*鼠标hover显示隐藏提示*/
        if(scope.openWay == 'hover'){
            btn_box.on('mouseover',function(){
                alert_box.css({
                    'display':'block'
                });
                getlocation();
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
                getlocation();
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