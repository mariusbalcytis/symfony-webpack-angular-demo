(function() {
    'use strict';

    angular.module('app.todo')
        .factory('buttonManager', buttonManagerFactory);

    buttonManagerFactory.$inject = ['$injector', 'bundleRegistry'];

    function buttonManagerFactory($injector, bundleRegistry) {
        return {
            getButtons: getButtons
        };
        /////////////////////////

        function getButtons() {
            // we collect data from bundles
            // as bundles can be prepared before that (load translation files etc.), we get a promise
            return bundleRegistry.collectData('todo.buttons').then(function(registeredButtons) {
                var result = [];
                for (var bundleName in registeredButtons) {
                    for (var i in registeredButtons[bundleName]) {
                        result.push(buildButton(registeredButtons[bundleName][i], bundleName));
                    }
                }
                return result;
            });
        }

        function buildButton(button, bundleName) {
            // both text and click can be injectable functions - we use $injector to handle that
            return {
                text: typeof button.text === 'string' ? button.text : $injector.invoke(button.text),
                click: function() {
                    // we load the bundle with all the dependencies only when button is clicked
                    return bundleRegistry.loadByName(bundleName).then(function() {
                        return $injector.invoke(button.click);
                    });
                }
            };
        }
    }
})();
