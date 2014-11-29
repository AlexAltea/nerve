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
var nerve = angular.module('nerve', ['ngResource']);

// Config
// TODO: Do routing

// Services
nerve.factory('$server', ($http) => new ServerProvider($http));

// Factories
nerve.factory('ThreadResource', ThreadResource);

// Directives
nerve.directive('nerveCpu', () => new NerveCpuDirective());

// Controllers
nerve.controller('ServerController', ['$scope', '$server', ServerController]);

// Filters
nerve.filter('hexadecimal', HexadecimalFilter);

/**
 * Nerve UI
 */
nerve.directive('nuiToolbar', () => new nui.ToolbarDirective());
nerve.directive('nuiRadioGroup', () => new nui.RadioGroupDirective());
nerve.directive('nuiRadio', () => new nui.RadioDirective());
