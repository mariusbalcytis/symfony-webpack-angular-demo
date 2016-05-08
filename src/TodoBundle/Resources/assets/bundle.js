(function() {
    'use strict';

    // see random number bundle for more explanations
    module.exports = {
        'name': 'todo',
        'load': function(ready) {
            require.ensure([], function() {
                ready([
                    require('modules/todo.module').name
                ]);
            });
        },
        'tags': [
            // any tags - not yet used practically
        ],
        'routing': require('routing')
    }
})();