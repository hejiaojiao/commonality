/**
 * Created by hejiao on 2018/2/28.
 */
angular.module('commonalityApp',[ 'ui.router'])
    .config(config)
    .controller('homeController',homeController)
    .directive('hLight',hLight);

    config.$injector = ['$stateProvider','$urlRouterProvider','$locationProvider'];
     function config($stateProvider, $urlRouterProvider,$locationProvider){
         $locationProvider.hashPrefix('');
         $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'layouts/home.html'
            })
            /*按钮*/
            .state('button', {
                url: '/button',
                templateUrl: 'templates/button.html'
            })
            /*表单*/
            .state('forms', {
                url: '/forms',
                templateUrl: 'templates/forms.html'
            })
            /*悬浮框*/
            .state('suspend', {
                url: '/suspend',
                templateUrl: 'templates/suspend.html'
            })
            /*轮播*/
            .state('carousel', {
                url: '/carousel',
                templateUrl: 'templates/carousel.html'
            })
            /*Accordion*/
            .state('modal', {
                url: '/modal',
                templateUrl: 'templates/modal.html'
            })
             /*modal*/
            .state('accordion', {
                url: '/accordion',
                templateUrl: 'templates/accordion.html'
            })
            /*数据交互*/
            .state('form_verify', {
                url: '/form_verify',
                templateUrl: 'templates/form_verify.html'
            })
           /*懒加载*/
            .state('lazy_loading', {
                url: '/lazy_loading',
                templateUrl: 'templates/lazy_loading.html'
            });
         $urlRouterProvider.otherwise('button')
        }
        homeController.$injector = ['$scope','$http','$state'];
        function homeController($scope,$http,$state,$timeout){
            /*sidebar click*/
            $scope.cssClick = function () {
                $state.go("button");
                $scope.sidebartitle = '基于Bootstrap全局css样式重构';
                $scope.sidebarintroduce = '设置全局 CSS 样式；基本的 HTML 元素均可以通过 class 设置样式并得到增强效果。';
                $scope.isClick = 1;
                $scope.sidebarItem = [
                    {
                        sidebarName:'按钮',
                        itemName:[
                            {barName:'按钮',uiSref:'button'}
                        ]
                    },
                    {
                        sidebarName:'表单',
                        itemName:[
                            {barName:'表单',uiSref:'forms'}
                        ]
                    }
                ];
            };
            $scope.scriptClick = function () {
                $state.go("suspend");
                $scope.sidebartitle = 'JavaScript 插件';
                $scope.sidebarintroduce = 'jQuery 插件为 Bootstrap 的组件赋予了“生命”。可以简单地一次性引入所有插件，或者逐个引入到你的页面中。';
                $scope.isClick = 2;
                $scope.sidebarItem = [
                    {
                        sidebarName:'自定义指令',
                        itemName:[
                            {barName:'悬浮提示',uiSref:'suspend'},
                            {barName:'轮播',uiSref:'carousel'},
                            {barName:'弹窗',uiSref:'modal'},
                            {barName:'手风琴',uiSref:'accordion'}
                        ]
                    }
                ];
            };
            $scope.otherClick = function () {
                $state.go("form_verify");
                $scope.sidebartitle = 'JavaScript 插件';
                $scope.sidebarintroduce = 'jQuery 插件为 Bootstrap 的组件赋予了“生命”。可以简单地一次性引入所有插件，或者逐个引入到你的页面中。';
                $scope.isClick = 3;
                $scope.sidebarItem = [
                    {
                        sidebarName:'数据交互',
                        itemName:[
                            {barName:'数据交互',uiSref:'form_verify'}
                        ]
                    },
                    {
                        sidebarName:'加载',
                        itemName:[
                            {barName:'懒加载',uiSref:'lazy_loading'}
                        ]
                    }
                ];
            };
            /*当前是哪个界面就调用哪个方法*/
            if(window.location.hash == '#/button' || window.location.hash == '#/form'){
                $scope.cssClick();
            }else if( window.location.hash == '#/form_verify' ||  window.location.hash == '#/lazy_loading'){
                $scope.otherClick();
            }else{
                $scope.scriptClick();
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


