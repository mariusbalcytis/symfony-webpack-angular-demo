(function() {
    'use strict';

    module.exports = require('angular')
        .module('maba.router', [
            require('angular-ui-router')    // exports name of the module
        ]);

    require('utils/requireAll')(require.context('router', true));
})();