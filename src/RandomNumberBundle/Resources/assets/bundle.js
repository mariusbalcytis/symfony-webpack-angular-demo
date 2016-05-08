(function() {
    'use strict';

    module.exports = {
        // bundle name - must be unique
        'name': 'randomNumber',
        // function to load files for the bundle. Callback must be called when done with loaded module names
        'load': function(ready) {
            // as `require()` is inside `ensure` block, it will be loaded asynchronously
            require.ensure([], function() {
                ready([
                    require('modules/randomNumber.module').name
                ]);
            });
        },
        'tags': [
            // any tags - not yet used practically
        ],
        // routing data for this bundle
        'routing': require('routing')
    }
})();