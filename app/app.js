(function() {
    'use strict';

    //ui.bootstrap https://angular-ui.github.io/bootstrap/ - MIT License
    //ngRoute https://docs.angularjs.org/api/ngRoute - MIT License
    //ngMessages https://docs.angularjs.org/api/ngMessages/directive/ngMessages - MIT License
    //https://github.com/angular-ui/ui-select
    //https://github.com/angular-ui/ui-sortable
    var app = angular.module('controleApp', ['ui.bootstrap', 'ngRoute', 'ngMessages', 'ui.select', 'ui.sortable']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'mainCtrl',
                templateUrl: '/app/views/index.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    app.filter('startFrom', function () {
    	return function (input, start) {
    		if (input) {
    			start = +start;
    			return input.slice(start);
    		}
    		return [];
    	};
    });


    /**
     * AngularJS default filter with the following expression:
     * "person in people | filter: {name: $select.search, age: $select.search}"
     * performs a AND between 'name: $select.search' and 'age: $select.search'.
     * We want to perform a OR.
     */
    app.filter('propsFilter', function() {
      return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
          items.forEach(function(item) {
            var itemMatches = false;

            var keys = Object.keys(props);
            for (var i = 0; i < keys.length; i++) {
              var prop = keys[i];
              var text = props[prop].toLowerCase();
              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
              }
            }

            if (itemMatches) {
              out.push(item);
            }
          });
        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
      };
    });


})();
