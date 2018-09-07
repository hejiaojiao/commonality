/**
 * Created by 何娇  on 2018/4/27.
 */
(function() {
    'use strict';
    angular.module('commonalityApp')
        .directive('suspendAlert', suspendAlert)
        .controller('suspendController', suspendController);

    suspendController.$inject = ['$scope', '$http', '$filter', '$document'];
    function suspendController($scope, $http, $filter, $document) {
        $scope.dropdownClick = function () {
            $document.find('.dropdown').addClass('open');
        };
        $document.bind("click", function () {
            $document.find('.dropdown').removeClass('open');
        });
        $document.find(".dropdown").click(function ($event) {
            $event.stopPropagation();
        });

        $scope.userNmae = {
            'name': '<p>哈哈哈哈哈哈哈哈哈哈</p>' +
            '<a href="">哈哈哈哈哈哈哈哈哈哈</a>' +
            '<p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>'
        };
    }

    /*悬浮框*/
    suspendAlert.$inject = ['$document'];
    function suspendAlert($document) {
        return {
            restrict: 'A',
            scope: {
                alertContent: '@'
            },
            link: link
        };
        function link(scope, element, attrs) {
            function locationFun($event) {
                var $html = '<div class="pos-alert-content">' +
                    '<div class="alert-box" id="alert-box"><div class="alert-content"></div><div class="close-icon fa fa-close"></div></div>' +
                    '</div>';
                $document.find('body').append($html);
                /*计算触发点的位置*/
                var target = $event.target,
                    offsetTop = target.offsetTop,
                    offsetLeft = target.offsetLeft,
                    offsetParent = target.offsetParent;
                while (offsetParent != null) {
                    offsetTop += offsetParent.offsetTop + offsetParent.clientTop;
                    offsetLeft += offsetParent.offsetLeft + offsetParent.clientLeft;
                    offsetParent = offsetParent.offsetParent;
                }

                $document.find('.alert-content').html(scope.alertContent);
                /*alert显示位置*/
                var alert_content = $document.find('.pos-alert-content'),
                    alert_box = $document.find('.alert-box'),
                    alert_content_h = $document.find('#alert-box').outerHeight() + 10,
                    alert_content_w = $document.find('#alert-box').outerWidth(),
                    window_w = $(window).width();

                if (offsetTop >= alert_content_h && window_w - offsetLeft < alert_content_w) {
                    alert_content.css({
                        'left': offsetLeft - alert_content_w + target.offsetWidth + 'px',
                        'top': offsetTop - alert_content_h - 10 + 'px'
                    });
                    alert_box.addClass('topLeft');
                } else if (offsetTop < alert_content_h && window_w - offsetLeft > alert_content_w) {
                    alert_content.css({
                        'left': offsetLeft + 'px',
                        'top': offsetTop + target.offsetHeight + 'px'
                    });
                    alert_box.addClass('bottomRight');
                } else if (offsetTop < alert_content_h && offsetLeft > alert_content_w) {
                    alert_content.css({
                        'left': offsetLeft - alert_content_w + target.offsetWidth + 'px',
                        'top': offsetTop + target.offsetHeight + 'px'
                    });
                    alert_box.addClass('bottomLeft');
                } else {
                    alert_content.css({
                        'left': offsetLeft + 'px',
                        'top': offsetTop - alert_content_h - 10 + 'px'
                    });
                }
            }
            /*移除*/
            function removeContent(){
                $document.find('.pos-alert-content').remove();
                $(window).resize(function () {
                    $document.find('.pos-alert-content').remove();
                });
            }
            if (attrs.openWay == 'click') {
                /*click显示提示*/
                element.click(function ($event) {
                    locationFun($event);
                    $(window).resize(function () {
                        locationFun($event);
                    });
                    $document.find('.close-icon').css('display','block');
                    $document.find('.alert-content').css('padding-right','20px');
                    $document.find('.close-icon').click(function(){
                        removeContent();

                    });
                    /*判断是否在当前页面*/
                    if(element){
                        var element1 = element == true;
                        scope.$watch('element1',function(newVal,oldVal){
                            console.log(oldVal);
                            console.log(newVal)
                        })
                    }
                });

            } else {
                /*hover显示提示*/
                element.mouseover(function ($event) {
                    locationFun($event);
                    $(window).resize(function () {
                        locationFun($event);
                    });
                });
                element.mouseout(function () {
                    removeContent();
                });
            }
        }
    }
}());
