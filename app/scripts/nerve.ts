/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

/// <reference path="../../typings/angularjs/angular.d.ts"/>
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
var nerve = angular.module('nerve', []);

// Services
nerve.factory('$server', ($http) => new ServerProvider($http));

// Directives
nerve.directive('nerveCpu', () => new NerveCpuDirective());

// Controllers
nerve.controller('ServerController', ['$scope', '$server', ServerController]);
