const express = require('express');
const { todoController, displayTodoController, deleteTodoController, updateTodoController } = require('../Controller/Todo.contoller');

const todoRouter= express.Router();

todoRouter.get('/', displayTodoController);

todoRouter.post('/', todoController);

todoRouter.delete('/:id', deleteTodoController);

todoRouter.put('/:id',updateTodoController);

module.exports = { todoRouter };