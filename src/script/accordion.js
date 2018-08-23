/**
 * Created by hejiao on 2018/6/13.
 */
(function(){
    'use strict';
    angular.module('commonalityApp',[])
        .directive('uiAccordion',uiAccordion)
        .directive('uiAccordionGroup',uiAccordionGroup)
        .directive('uiCollapse',uiCollapse)
        .directive('finishRenderFilters',finishRenderFilters)
        .controller('accordionDataController',accordionDataController)
        .constant('uiAccordionConfig', {
            closeOthers: true
        });

        accordionDataController.$inject = ['$scope','$http'];
        function accordionDataController($scope,$http){
            $scope.groups = [
                {'headingName':'11111111111','headingMsg':'This content is straight in the template1'},
                {'headingName':'22222222222','headingMsg':'This content is straight in the template2'}
            ];
            $scope.oneAtATime = true;
        }

        uiAccordion.$inject = [];
        function uiAccordion(){
            return{
                controller:'UiAccordionController',
                transclude: true,
                template:'<div class="panel-group" ng-transclude></div>'
            }
        }

        uiAccordionGroup.$inject = [];
        function uiAccordionGroup(){
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
        }

        uiCollapse.$inject = ['$timeout'];
        function uiCollapse($timeout){
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
        }

        finishRenderFilters.$inject = ['$timeout'];
        function finishRenderFilters($timeout){
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
        }
}());
