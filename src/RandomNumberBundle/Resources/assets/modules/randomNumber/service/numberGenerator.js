(function() {
    'use strict';

    require('angular').module('app.randomNumber')
        .service('numberGenerator', numberGeneratorFactory);

    numberGeneratorFactory.$inject = [];
    function numberGeneratorFactory() {
        /* jshint validthis: true */
        var vm = this;

        vm.generate = generate;
        
        function generate(max) {
            return Math.floor(Math.random() * (max === undefined ? 10 : max)) + 1;
        }
    }
})();
