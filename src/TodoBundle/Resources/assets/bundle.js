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
        'routing': require('routing')
    }
})();