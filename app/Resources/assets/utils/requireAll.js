(function() {
    'use strict';

    // function to require all files in given require context
    // taken from https://webpack.github.io/docs/context.html#context-module-api
    function requireAll(requireContext) {
        return requireContext.keys().map(requireContext);
    }

    module.exports = requireAll;
})();