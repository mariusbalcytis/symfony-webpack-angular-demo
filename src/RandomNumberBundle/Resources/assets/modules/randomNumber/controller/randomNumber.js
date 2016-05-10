(function() {
    'use strict';

    require('angular').module('app.randomNumber')
        .controller('RandomNumber', RandomNumber);

    RandomNumber.$inject = ['translator'];
    function RandomNumber(translator) {
        /* jshint validthis: true */
        var vm = this;

        vm.generate = generate;
        // just to demonstrate translations - this translation is from Symfony core
        // change <html> lang attribute and reload page to see correct translations
        vm.text = translator.trans('An authentication exception occurred.', {}, 'security', 'lt');

        function generate(max) {
            return Math.floor(Math.random() * (max === undefined ? 10 : max)) + 1;
        }
    }
})();
