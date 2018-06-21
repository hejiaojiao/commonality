/**
 * Created by 何娇 on 2018/4/27.
 */

var app = angular.module('commonalityApp');
app.directive('carousel',carousel);
app.directive('listRoll',listRoll);

/*轮播*/
carousel.$injector = ['$interval'];
function carousel($interval){
    return{
        restrict:'AE',
        replace:true,
        template:'<div class="carousel-group">' +
        '<div class="carousel-item" ng-transclude></div>' +
        '<div class="carousel-clickIcon">' +
            '<i class="fa fa-chevron-circle-left"></i>' +
            '<i class="fa fa-chevron-circle-right"></i>' +
        '</div>'+
        '<div class="dot-list"></div>'+
        '</div>',
        transclude:true,
        scope:{
           openWay:'@'
        },
        link:link
    };
    function link(scope,element,attr){
        var elmet = angular.element(document),
            dot = elmet.find('.dot-list'),
            img_box = elmet.find('.carousel-item'),
            img_array = elmet.find('.carousel-item img'),
            img_width = elmet.find('.carousel-item img').width(),
            click_leftIcon = elmet.find('.fa-chevron-circle-left'),
            click_rightIcon = elmet.find('.fa-chevron-circle-right');

        /*切换图片*/
        var number = 0;
        function animation(flag){
            if(flag){
                number += 1;
            }else{
                number -= 1;
            }
            if(number > img_array.length){
                number = 1;
            }
            if(number < 1){
                number = img_array.length;
            }
            changeItem();
        }

        function changeItem() {
            var size =  - img_width * (number - 1);
            img_box.animate({'left':size+'px'});
            /*圆点高亮显示*/
            var item  = angular.element(dot_item[number-1]);
            dot_item.removeClass('active');
            item.addClass('active');
        }

        /*圆点*/
        for(var i = 0 ; i < img_array.length; i++){
            dot.append("<span id='itemClick_"+i+"' class='dot-item'</span>");
        }
        var dot_item = elmet.find(".dot-item");
        dot_item.on('click',function(event){
            var dotItemId = event.target.id;
            var num = Number(dotItemId.split('_')[1])+1;

            if(num != number){
                number = num;
                changeItem();
            }
        });
        /*点击切换*/
        if(scope.openWay == 'click'){
            function clickFun(){
                elmet.find('.carousel-clickIcon').css('display','block');
                click_leftIcon.on('click',function(){
                    animation(false)
                });
                click_rightIcon.on('click',function(){
                    animation(true)
                });
            }
            clickFun();
        }
        animation(true);
        /*自动滚动*/
        $interval(function(){
            animation(true);
        },4000)
    }
}

/*判断该ng-repeat数据是否加载完毕*/
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

/*列表滚动*/
app.controller('listRollController',['$scope','$http',function($scope,$http){
    $http.get("http://122.114.75.166:8082/app/iptv/findChannels?tag=88888888")
        .then(function success(res) {
            $scope.roll_list = res.data.data;

        },function error() {

        });
}]);
listRoll.$injector = ['$timeout'];
function listRoll($timeout){
   return{
       restrict:'AE',
       replace:true,
       transclude:true,
       template:'<div class="pos-rtlt-icon">' +
       '<i class="fa fa-arrow-circle-left" ng-click="leftIconClick()"></i>' +
       '<i class="fa fa-arrow-circle-right" ng-click="rightIconClick()"></i>' +
       '<div class="table-wrap"><div ng-transclude=""></div></div>'+
       '</div>',
       controller:['$scope',function($scope){
           return{
               resizeFunc:function(){
                   var table_width = $('.table-wrap').width(),
                       content = $('.flow-list-content'),
                       group_width = content.width(),
                       pos_icon = $('.pos-rtlt-icon'),
                       right_icon = $('.fa-arrow-circle-right'),
                       left_icon = $('.fa-arrow-circle-left');

                   if(group_width>table_width){
                       right_icon.css('display','block');
                       pos_icon.css('padding-right','40px');
                       $scope.rightIconClick = function(){
                           content.css({
                               'margin-left':table_width - group_width-40+'px'
                           });
                           if(content.css('margin-left').split('px')[0]<0){
                               left_icon.css('display','block');
                               pos_icon.css('padding-left','40px');
                               $scope.leftIconClick = function(){
                                   content.css({
                                       'margin-left':'0'
                                   });
                                   if(content.css('margin-left').split('px')[0]==0){
                                       left_icon.css('display','none');
                                       pos_icon.css('padding-left','0');
                                   }else{}
                               }
                           }else{}
                       };
                   }else{}
               }
           };
       }],
       link:link
   };
    function link(scope,element,attr,controller){
        scope.$on('ngRepeatFinished', function () {
            controller.resizeFunc()
        });
        $(window).resize(function() {
            controller.resizeFunc();
        });
    }
}

