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
        // resolve is also injectable, so in this case we could just return plain object
        //      and move function and dependency into resolve.todos;
        //      this is just to show that dynamic configuration is also possible
        config: ['todoRepository', 'buttonManager', function(todoRepository, buttonManager) {
            return {
                controller: 'TodoList',
                controllerAs: 'vm',
                templateUrl: require('!!file!templates/todoList.html'),
                resolve: {
                    todos: todoRepository.getTodos,
                    buttons: buttonManager.getButtons
                }
            };
        }]
    });

    module.exports = routes;
})();