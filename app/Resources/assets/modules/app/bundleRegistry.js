(function() {
    'use strict';

    var loadPromises = {}, loadedBundles = {};
    var bundles = require('bundles');
    validateBundles(bundles);

    angular.module('app')
        .factory('bundleRegistry', bundleRegistryFactory);

    bundleRegistryFactory.$inject = ['$ocLazyLoad', '$q', '$log'];

    function bundleRegistryFactory($ocLazyLoad, $q, $log) {
        return {
            getBundles: getBundles,
            loadByName: loadByName,
            loadByTag: loadByTag,
            collectData: collectData
        };
        /////////////////////////

        function getBundles() {
            return bundles;
        }
        function loadByName(bundleName) {
            for (var i in bundles) {
                if (bundles[i].name === bundleName) {
                    return load(bundles[i]);
                }
            }
            return $q.reject('Bundle not found: ' + bundleName);
        }
        function loadByTag(tag) {
            var promises = [];
            for (var i in bundles) {
                if (bundles[i].tags && bundles[i].tags.indexOf(tag) !== -1) {
                    promises.push(load(bundles[i]));
                }
            }
            return $q.all(promises);
        }
        function collectData(itemName) {
            var result = {};
            for (var i in bundles) {
                if (itemName in bundles[i]) {
                    result[bundles[i].name] = bundles[i][itemName];
                }
            }
            return result;
        }

        function load(bundle) {
            $log.debug('Loading bundle', bundle.name);
            if (bundle.name in loadPromises) {
                return loadPromises[bundle.name];
            } else if (bundle.name in loadedBundles) {
                return $q.when({bundle: bundle, status: 'already_loaded'});
            }

            var deferred = $q.defer();
            loadPromises[bundle.name] = deferred.promise;
            bundle.load(function(moduleNames) {
                for (var j in moduleNames) {
                    $ocLazyLoad.load({
                        name: moduleNames[j]
                    });
                }
                $log.info('Bundle loaded', bundle.name);
                
                delete loadPromises[bundle.name];
                loadedBundles[bundle.name] = true;

                deferred.resolve({bundle: bundle, status: 'loaded'});
            });
            return deferred.promise;
        }
    }

    function validateBundles(bundles) {
        var names = {};
        for (var i in bundles) {
            if (!('name' in bundles[i])) {
                throw new Error('name is mandatory inside each bundle');
            }
            if (bundles[i].name in names) {
                throw new Error('Duplicate name for bundle: ' + bundles[i].name);
            }
            names[bundles[i].name] = true;
        }
    }
})();