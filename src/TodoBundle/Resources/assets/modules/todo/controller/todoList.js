(function() {
    'use strict';

    require('angular').module('app.todo')
        .controller('TodoList', TodoList);

    TodoList.$inject = ['todos'];

    function TodoList(todos) {
        /* jshint validthis: true */
        var vm = this;

        vm.todos = todos;
    }
})();
