(function() {
    'use strict';

    module.exports = require('angular')
        .module('maba.i18n', [

        ]);

    require('utils/requireAll')(require.context('i18n', true));
})();
