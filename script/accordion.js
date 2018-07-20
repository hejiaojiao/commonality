/**
 * Created by hejiao on 2018/6/13.
 */
angular.module('commonalityApp')
.constant('uiAccordionConfig', {
    closeOthers: true
})
.controller('accordionDataController',['$scope','$http',function($scope,$http){
        $scope.groups = [
            {'headingName':'11111111111','headingMsg':'This content is straight in the template1'},
            {'headingName':'22222222222','headingMsg':'This content is straight in the template2'}
        ];
        $scope.oneAtATime = true;
    }])
.controller('UiAccordionController',['$scope','$attrs','uiAccordionConfig',function($scope,$attrs,uiAccordionConfig){

}])
.directive('uiAccordion',function(){
    return{
        controller:'UiAccordionController',
        transclude: true,
        template:'<div class="panel-group" ng-transclude></div>'
    }
})
.directive('uiAccordionGroup',function(){
    return{
        require: '^uiAccordion',
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
.directive('uiCollapse', ['$timeout',function($timeout) {
    return {
        link:function(scope, element, attrs){
            function collapseFun(){
                var css = {'height':''},
                    pbody_height = element[0].firstChild.offsetHeight;
                scope.toggleOpen = function(){
                    element.hasClass('in') == false?element.addClass('in'):element.removeClass('in');
                    element.hasClass('in')==true?element.css('height',pbody_height) :element.css(css);
                };
            }
            scope.$on('ngRepeatFinished', function () {
                collapseFun();
            });
            collapseFun();
        }
    };
}])
.directive('finishRenderFilters', function ($timeout) {
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
