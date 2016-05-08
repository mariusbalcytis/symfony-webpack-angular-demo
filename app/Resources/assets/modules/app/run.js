(function() {
    'use strict';

    require('angular').module('app')
        .run(runBlock);

    runBlock.$inject = ['routerHelper'];
    function runBlock(routerHelper) {
        // just inject routerHelper to bootstrap code in it's initialization
    }
})();