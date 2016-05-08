(function() {
    'use strict';

    var routes = [];

    // example with parent state
    routes.push({
        state: 'todo',
        config: {
            abstract: true,
            template: '<div data-ui-view></div>'
        }
    });

    routes.push({
        state: 'todo.list',
        // we need to provide full URL here - no merging with parent scopes
        url: '/todo/list',
        config: ['todoRepository', function(todoRepository) {
            return {
                controller: 'TodoList',
                controllerAs: 'vm',
                template: 'Todo list: <div data-ng-bind="vm.todos"></div>',
                resolve: {
                    todos: todoRepository.getTodos
                }
            };
        }]
    });

    module.exports = routes;
})();