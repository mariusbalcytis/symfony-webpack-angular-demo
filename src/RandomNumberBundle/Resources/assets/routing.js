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
        config: {
            controller: 'RandomNumber',
            controllerAs: 'vm',
            // let's just use URL to template - this is shorter and clearer
            templateUrl: require('!!file!templates/randomNumber.html'), // !! to avoid adding pre-configured loaders
                                                                        // file loader gives URL to a file
            resolve: {
                translations: ['translationLoader', function(translationLoader) {
                    // load translation files before loading the controller
                    translationLoader.load('security');
                }]
            }
        }
    });

    module.exports = routes;
})();