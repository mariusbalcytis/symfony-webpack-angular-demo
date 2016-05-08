(function() {
    'use strict';

    require('angular')
        .module('maba.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        var otherwiseHandler;

        /* jshint validthis:true */
        this.$get = RouterHelper;

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise(function($injector, $location) {
            if (otherwiseHandler) {
                otherwiseHandler($injector, $location);
            }
        });

        RouterHelper.$inject = ['$state', '$rootScope', '$urlRouter', '$q', 'bundleRegistry', '$log', '$injector'];
        /* @ngInject */
        function RouterHelper($state, $rootScope, $urlRouter, $q, bundleRegistry, $log, $injector) {
            var routing, routingPromises = {};
            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            activate();

            return service;

            ///////////////

            function activate() {
                // get routing data from all the bundles
                routing = bundleRegistry.collectData('routing');

                for (var bundleName in routing) {
                    // if URL is as in bundle's routing - load bundle asynchronously
                    bindAsyncBundleLoading(bundleName);
                }

                $rootScope.$on('$stateNotFound', function(event, state) {
                    // if we want to go to some state which is not yet loaded - load bundle asynchronously
                    if (loadMissingState(state)) {
                        event.preventDefault();
                    }
                });

                otherwiseHandler = function($injector, $location) {
                    $log.warn('URL not found', $location.path());
                }
            }

            function configureStates(states) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
            }

            function getStates() {
                return $state.get();
            }

            function bindAsyncBundleLoading(bundleName) {
                var bundleRoutes = routing[bundleName];
                for (var i in bundleRoutes) {
                    var route = bundleRoutes[i];
                    if (route.url) {
                        // we use `once` helper to avoid intifite loop as `sync` initiates same `when` (URL is left the same)
                        $urlRouterProvider.when(route.url, once(function() {
                            registerBundleRoutes(bundleName).then(function() {
                                // we need to call `sync` to initiate looking for loaded state and entering it
                                // `sync` will find this same block first, but `once` handles that
                                $urlRouter.sync();
                            });
                        }));
                    }
                }
            }

            function registerBundleRoutes(bundleName) {
                if (!(bundleName in routingPromises)) {
                    // same promises to avoid loading routes several times (this includes race conditions)
                    routingPromises[bundleName] = bundleRegistry.loadByName(bundleName).then(function() {
                        // we always register all routes in a bundle (not single matched one) to handle parent states
                        return registerRoutes(routing[bundleName]);
                    });
                }

                return routingPromises[bundleName];
            }

            function registerRoutes(routeList) {
                var promises = [];
                for (var i in routeList) {
                    promises.push(registerRoute(routeList[i]));
                }
                return $q.all(promises);
            }

            function registerRoute(route) {
                var config;
                // route.config can be object or injectable function which returns object or promise
                if (Array.isArray(route.config) || typeof route.config === 'function') {
                    config = $injector.invoke(route.config);
                } else if (typeof route.config === 'object') {
                    config = route.config;
                }

                return $q.when(config).then(function(config) {
                    // here config is always an object
                    // we have url inside route definition, but let's allow it to be overwritten
                    if (typeof config.url === 'undefined') {
                        config.url = route.url;
                    }
                    $log.debug('Got config for state, registering', route.state, config);
                    // we register state configuration; after next `sync`, it will be matched
                    $stateProvider.state(route.state, config);
                });
            }

            function loadMissingState(state) {
                for (var bundleName in routing) {
                    var bundleRoutes = routing[bundleName];
                    for (var i in bundleRoutes) {
                        var route = bundleRoutes[i];
                        if (route.state === state.to) {
                            // we've found needed state - let's load bundle and register routes in it
                            registerBundleRoutes(bundleName).then(function() {
                                // now we can re-initiate transition to already loaded state
                                $state.transitionTo(state.to, state.toParams, state.options)
                            });
                            return true;
                        }
                    }
                }
                return false;
            }

            function once(callback) {
                var ran = false;
                return function() {
                    if (ran) {
                        return false;
                    }
                    ran = true;
                    return callback();
                }
            }
        }
    }
})();
