(function() {
    'use strict';

    require('angular').module('app.randomNumber')
        .controller('RandomNumber', RandomNumber);

    RandomNumber.$inject = [];
    function RandomNumber() {
        /* jshint validthis: true */
        var vm = this;

        vm.generate = generate;

        function generate(max) {
            return Math.floor(Math.random() * (max === undefined ? 10 : max)) + 1;
        }
    }
})();
