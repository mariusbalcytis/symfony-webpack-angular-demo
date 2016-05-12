(function() {
    'use strict';

    require('angular').module('app.randomNumber')
        .controller('RandomNumber', RandomNumber);

    function RandomNumber(numberGenerator) {
        // we can annotate like this to automatically inject dependencies.
        // we use di-strict, so if you would comment the following line,
        //      you'd get an error even in development (non-minified version)
        'ngInject';

        /* jshint validthis: true */
        var vm = this;

        vm.generate = numberGenerator.generate;
    }
})();
