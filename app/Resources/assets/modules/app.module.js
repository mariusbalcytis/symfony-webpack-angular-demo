(function() {
    'use strict';

    // as '' is included in modulesDirectories (in app/config/webpack.config.js),
    // we can provide dependencies in parent directories and avoid putting things to "node_modules"
    var requireAll = require('utils/requireAll');

    // we export module - this allows to easily add it to dependencies:
    // `require('.../main').name` would return `app` in this case
    module.exports = require('angular')
        .module('app', [
            'oc.lazyLoad',
            require('router.module').name,
            require('i18n.module').name
        ]);

    // we require all files inside `main` directory;
    // we put all module files inside separate directory to avoid requiring
    // "ourselves" and still being able to require all files instantly without explicitly providing each of them
    requireAll(require.context('app', true));  // true means "use subdirectories"
})();