(function() {
    'use strict';

    // we require translator and export it (file defines it in global scope)
    var translator = require('exports?Translator!@BazingaJsTranslationBundle/Resources/public/js/translator.min.js');
    // we require config file for translator to work
    // we import translator file - the same that was required line before; we need to URL-encode it as it's part of imports query parameter
    require('imports?Translator=exports%3FTranslator%21@BazingaJsTranslationBundle/Resources/public/js/translator.min.js!translations/config.js');

    angular.module('maba.i18n')
        .factory('translator', translatorFactory);

    translatorFactory.$inject = [];

    function translatorFactory() {
        // let's just return original object as a service
        return translator;
    }
})();