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
        // prepare will be executed BEFORE loading the bundle
        // use this to initialize anything needed for extensions (like routing and buttons)
        // you can also use `init` in the same way, it will be executed right AFTER loading bundle
        'prepare': ['translationLoader', function(translationLoader) {
            // load translation files after loading the bundle
            return translationLoader.load(['buttons']); // this can be string or array
        }],
        // routing data for this bundle
        'routing': require('routing'),

        // any extensions can go here, this is an example
        'todo.buttons': require('buttons')
    }
})();