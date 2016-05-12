(function() {
    'use strict';

    require('angular').module('app.todo')
        .controller('TodoList', TodoList);

    TodoList.$inject = ['buttons', 'todos'];

    function TodoList(buttons, todos) {
        /* jshint validthis: true */
        var vm = this;

        vm.buttons = buttons;
        vm.todos = todos;
    }
})();
