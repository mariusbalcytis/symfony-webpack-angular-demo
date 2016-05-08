(function() {
    'use strict';

    angular.module('app.todo')
        .factory('todoRepository', todoRepositoryFactory);

    todoRepositoryFactory.$inject = ['$timeout'];

    function todoRepositoryFactory($timeout) {
        return {
            getTodos: getTodos
        };
        /////////////////////////

        function getTodos() {
            // some fake data with timeout to simulate loading from server
            return $timeout(function() {
                return ['First', 'Second'];
            }, 2000);
        }
    }
})();
