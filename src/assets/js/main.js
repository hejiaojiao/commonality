/**
 * Created by hejiao on 2018/2/28.
 */
(function(){
    'use strict';

    angular.module('commonalityApp',[ 'ui.router'])
        .config(config)
        .controller('homeController',homeController)
        .directive('hLight',hLight);

    config.$injector = ['$stateProvider','$urlRouterProvider','$locationProvider'];
    function config($stateProvider, $urlRouterProvider,$locationProvider){
        $urlRouterProvider.when("", "/OSStyle/button");
        $stateProvider
            /*======全局样式======*/
            .state('OSStyle', {
                url: '/OSStyle',
                templateUrl: 'OSStyle/OSStyle.html',
                controller:function($state,$scope){
                    $state.go('OSStyle.button');
                    $scope.OSStyleFun();
                }
            })
            /*按钮*/
            .state('OSStyle.button', {
                url: '/button',
                templateUrl: 'OSStyle/button.html'
            })
            /*表单*/
            .state('OSStyle.forms', {
                url: '/forms',
                templateUrl: 'OSStyle/forms.html'
            })
            /*=========组件=============*/
            .state('subassembly', {
                url: '/subassembly',
                templateUrl: 'subassembly/subassembly.html',
                controller:function($state,$scope){
                    $state.go('subassembly.suspend');
                    $scope.subassemblyFun();
                }
            })
            /*悬浮框*/
            .state('subassembly.suspend', {
                url: '/suspend',
                templateUrl: 'subassembly/suspend.html'
            })
            /*轮播*/
            .state('subassembly.carousel', {
                url: '/carousel',
                templateUrl: 'subassembly/carousel.html'
            })
            /*Accordion*/
            .state('subassembly.modal', {
                url: '/modal',
                templateUrl: 'subassembly/modal.html'
            })
            /*modal*/
            .state('subassembly.accordion', {
                url: '/accordion',
                templateUrl: 'subassembly/accordion.html'
            })
            /*==========其他=======*/
            .state('other', {
                url: '/other',
                templateUrl: 'other/other.html',
                controller:function($state,$scope){
                    $state.go('other.form_verify');
                    $scope.otherFun();
                }
            })
            /*数据交互*/
            .state('other.form_verify', {
                url: '/form_verify',
                templateUrl: 'other/form_verify.html'
            })
            /*懒加载*/
            .state('other.lazy_loading', {
                url: '/lazy_loading',
                templateUrl: 'other/lazy_loading.html'
            });
    }
    homeController.$injector = ['$scope','$http','$state'];
    function homeController($scope,$http,$state,$timeout){
        /*sidebar list*/
        $scope.OSStyle = [
            {
                sidebarName:'按钮',
                itemName:[
                    {barName:'按钮',uiSref:'.button'}
                ]
            },
            {
                sidebarName:'表单',
                itemName:[
                    {barName:'表单',uiSref:'.forms'}
                ]
            }
        ];
        $scope.subassembly = [
            {
                sidebarName:'自定义指令',
                itemName:[
                    {barName:'悬浮提示',uiSref:'.suspend'},
                    {barName:'轮播',uiSref:'.carousel'},
                    {barName:'弹窗',uiSref:'.modal'},
                    {barName:'手风琴',uiSref:'.accordion'}
                ]
            }
        ];
        $scope.other = [
            {
                sidebarName:'数据交互',
                itemName:[
                    {barName:'数据交互',uiSref:'.form_verify'}
                ]
            },
            {
                sidebarName:'加载',
                itemName:[
                    {barName:'懒加载',uiSref:'.lazy_loading'}
                ]
            }
        ];
        /*顶部描述*/
        $scope.OSStyleFun = function(){
            $scope.sidebartitle = "css全局样式";
            $scope.sidebarintroduce = "css全局样式";
        };
        $scope.subassemblyFun = function(){
            $scope.sidebartitle = "angularJs组件";
            $scope.sidebarintroduce = "angularJs组件";
        };
        $scope.otherFun = function(){
            $scope.sidebartitle = "其他";
            $scope.sidebarintroduce = "其他";
        }
    }
    /*代码示例组件*/
    hLight.$injector = [];
    function hLight(){
        return {
            restrict: 'C',
            link: function (scope, elem, attr) {
                var markdownString = elem.val();
                marked.setOptions({
                    highlight: function (code) {
                        return hljs.highlightAuto(code).value;
                    }
                });
                elem.replaceWith(marked(markdownString));
            }
        }
    }
}());



