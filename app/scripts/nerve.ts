/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angularjs/angular-resource.d.ts"/>
/// <reference path="../../typings/bootstrap/bootstrap.d.ts"/>
/// <reference path="../../typings/jquery/jquery.d.ts"/>

/**
 * Bootstrap
 */

// Enable Tooltips
$('[data-toggle="tooltip"]').tooltip({ html: true });


/**
 * AngularJS
 */
var nerve = angular.module('nerve', ['ngResource', 'ngRoute']);

// Config
nerve.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/intro.html',
        })
        .when('/general', {
            templateUrl: 'views/general.html',
        })
        .when('/cpu', {
            templateUrl: 'views/cpu.html',
            controller: 'NerveCpuController'
        })
        .when('/gpu', {
            templateUrl: 'views/gpu.html',
        })
        .when('/memory', {
            templateUrl: 'views/memory.html',
        })
        .when('/files', {
            templateUrl: 'views/files.html',
        })
        .when('/system', {
            templateUrl: 'views/system.html',
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

// Services
nerve.factory('$server', ($http) => new ServerProvider($http));

// Factories
nerve.factory('ThreadResource', ThreadResource);

// Controllers
nerve.controller('ServerController', ['$scope', '$server', ServerController]);
nerve.controller('NerveCpuController', NerveCpuController);

// Filters
nerve.filter('hexadecimal', HexadecimalFilter);

/**
 * Nerve UI
 */

// Directives
nerve.directive('nuiToolbar', () => new nui.ToolbarDirective());
nerve.directive('nuiRadioGroup', () => new nui.RadioGroupDirective());
nerve.directive('nuiRadio', () => new nui.RadioDirective());
