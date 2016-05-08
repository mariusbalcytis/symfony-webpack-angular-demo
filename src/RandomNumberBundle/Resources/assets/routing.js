(function() {
    'use strict';

    var routes = [];

    // each route has:
    // - `state` (to find what bundle to load if it's requested)
    // - `url` (to find what bundle to load if it's matched)
    // - `config` - configuration for UI Router; `url` will be added if not provided here
    //   `config` can be object or a function. Function is injectable. It can return an object or a promise to an object
    routes.push({
        state: 'randomNumberGenerator',
        url: '/random-number-generator',
        config: ['$q', function($q) {
            var deferred = $q.defer();
            // we use function, promise and `ensure` so that template would be loaded only if route was matched
            require.ensure([], function() {
                deferred.resolve({
                    controller: 'RandomNumber',
                    controllerAs: 'vm',
                    template: require('templates/randomNumber.html')
                });
            });
            return deferred.promise;
        }]
    });

    module.exports = routes;
})();