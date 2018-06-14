/**
 * Created by hejiao on 2018/6/13.
 */
angular.module('commonalityApp')
.constant('uibAccordionConfig', {
    closeOthers: true
})
.directive('uiAccordion',function(){
    return{
        transclude: true,
        template:'<div class="panel-group" ng-transclude></div>'
    }
})
.directive('uiAccordionGroup',function(){
    return{
        transclude: true,
        restrict: 'A',
        template:'<div class="panel-heading">' +
        '<h4 class="panel-title">' +
        '<a href="" class="accordion-toggle"  ng-click="toggleOpen()"><span>{{heading}}</span></a>' +
        '</h4>' +
        '</div>' +
        '<div class="panel-collapse collapse" ui-collapse>' +
        '<div class="panel-body" ng-transclude></div>' +
        '</div>',
        scope:{
            heading: '@'
        },
        link:function(scope, element, attrs){

        }
    }
})
.directive('uiCollapse', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
        link:function(scope, element, attrs){
            var expandingExpr = $parse(attrs.expanding),
                css = {},
                cssTo = {};
            function init() {
                css = {height: ''};
                cssTo = {height: '0'};

                scope.toggleOpen = function(){
                    element.hasClass('in') == false?element.addClass('in'):element.removeClass('in')
                    .addClass('collapse')
                    .css(css);
                }
            }
            init();
            console.log(!scope.$eval(attrs.uibCollapse))
        }
    };
}]);
