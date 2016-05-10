(function() {
    'use strict';

    angular.module('maba.i18n')
        .factory('translationLoader', translationLoaderFactory);

    translationLoaderFactory.$inject = ['$q', 'translator'];

    function translationLoaderFactory($q, translator) {
        // we save already loaded translations to avoid duplicate loading
        var loadedResources = {};

        return {
            load: loadTranslations
        };

        ////////////

        function loadTranslations(domain, locale) {
            if (!locale) {
                // use current locale if not provided
                locale = translator.locale;
            }
            if (locale in loadedResources && domain in loadedResources[locale]) {
                // return resolved promise if already loaded
                return $.when();
            }
            
            var deferred = $q.defer();
            loadTranslationsWithCallback(domain, locale, function() {
                if (!(locale in loadedResources)) {
                    loadedResources[locale] = {};
                }
                loadedResources[locale][domain] = true;

                deferred.resolve();
            });
            return deferred.promise;
        }
        
        function loadTranslationsWithCallback(domain, locale, done) {
            // here we use webpack dynamic loading - it makes bundles for each combination of available files
            // as we use bundle loader (`bundle!` in the beginning), translations are loaded asynchronously
            // we also use import loader to import `Translator` variable into translations file
            var bundledResources = require(
                'bundle!imports?Translator=exports%3FTranslator%21@BazingaJsTranslationBundle/Resources/public/js/translator.min.js'
                    + '!translations/' + domain + '/' + locale + '.js'
            );
            bundledResources(done);
        }
    }
})();