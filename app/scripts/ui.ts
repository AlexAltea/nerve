/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

// Display Bootstrap Modal: Adjusts the Modal parameters and shows it
function showModal(args) {
    $(".modal-title").html(args.title);
    $(".modal-body").html(args.body);
    $(".modal-footer").html(args.footer);
    $(".modal-close").focus();
    $(".modal").modal('show');
}

/**
 * Nerve UI
 */
module nui {
    
    // Toolbar
    export class ToolbarDirective implements ng.IDirective {
        restruct = 'E';
        transclude = true;
        template = '<div class="nui-toolbar" ng-transclude></div>';
    }

    // Radio
    export class RadioGroupDirective implements ng.IDirective {
        require = 'ngModel';
        restrict = 'E';
        transclude = true;
        template = '<div class="nui-input-group" ng-transclude></div>';
        link = (scope, element, attr, controller) => {
            var radioChildren = element[0].querySelectorAll('nui-radio');

            // View -> Model
            angular.forEach(radioChildren, (child) => {
                $(child).bind('click', () => {
                    scope.$apply(() => {
                        var childValue = $(child).attr('ng-value');
                        controller.$setViewValue(childValue);
                        controller.$render();
                    });
                });
            });

            // Model -> View
            controller.$render = () => {
                angular.forEach(radioChildren, (child) => {
                    var childValue = $(child).attr('ng-value');
                    var isEqual = angular.equals(controller.$modelValue, childValue);
                    if (isEqual) {
                        $(child).find("input").attr('checked');
                    } else {
                        $(child).find("input").removeAttr('checked');
                    }
                });
            };
        }
    }

    export class RadioDirective implements ng.IDirective {
        restrict = 'E';
        transclude = true;
        template = '<label class="nui-input nui-button" ng-transclude></label>';
    }
}