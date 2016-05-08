(function() {
    'use strict';

    require('angular')
        .module('app')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.value = 9000;
    }
})();