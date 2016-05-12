(function() {
    // extend default config to extract styles
    // if it's not extracted, we get a "flicker" as CSS is injected, not included in HTML
    var config = require('bootstrap-webpack/bootstrap.config.js');
    config.styleLoader = require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!less-loader');
    module.exports = config;
})();