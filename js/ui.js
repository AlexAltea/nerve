/**
 * Adjust Modal parameters and display it
 */
function showModal(args) {
    $(".modal-title").html(args.title);
    $(".modal-body").html(args.body);
    $(".modal-footer").html(args.footer);
    $(".modal-close").focus();
    $(".modal").modal('show');
}

/**
 * CPU: Registers
 */
function initRegisters() {
    $("#nerve-cpu-registers").css("height", "calc(100% - 60px)");
}

angular.module('buttonsRadio', [])
       .directive('buttonsRadio', function() {
        return {
            restrict: 'E',
            scope: { model: '=', options:'='},
            controller: function($scope){
                $scope.activate = function(option){
                    $scope.model = option;
                };      
            },
            template: "<button type='button' class='btn' "+
                        "ng-class='{active: option == model}'"+
                        "ng-repeat='option in options' "+
                        "ng-click='activate(option)'>{{option}} "+
                      "</button>"
        };
    });