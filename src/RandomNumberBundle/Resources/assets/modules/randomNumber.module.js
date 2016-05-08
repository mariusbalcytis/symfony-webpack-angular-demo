(function() {
    'use strict';

    // we need to use @app prefix, as utils folder is not anywhere in the ancestors of this folder
    var requireAll = require('@app/utils/requireAll');

    module.exports = require('angular').module('app.randomNumber', [
        // required modules
    ]);

    requireAll(require.context('randomNumber', true));
})();