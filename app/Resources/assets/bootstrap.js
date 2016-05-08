(function() {
    'use strict';

    // we require CSS file(s) - this allows to mix-and-match JS and CSS files;
    // this way we can have reusable component with single entry point
    require('imports.css');

    var angular = require('angular');
    angular.element(document).ready(function () {
        // as angular/main exports module, we can provide it as a dependency adding `.name` suffix;
        // this way we can change the name of the module and be sure that the module will be fully loaded at this point
        angular.bootstrap(document, [require('angular/main').name], {
            strictDi: true
        });
    });
})();