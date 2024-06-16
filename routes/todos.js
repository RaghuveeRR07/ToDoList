const express = require('express');

const todoModel = require('../models/todoModel');

const {
    getTodos,
    getSingle,
    createTodo,
    deleteTodo,
    updateTodo
} = require('../controller/todoController')

const router = express.Router();

// GET all todos
router.get('/', getTodos);

// GET a single todo
router.get('/:id', getSingle);

// POST a todo
router.post('/', createTodo);

// DELETE a todo
router.delete('/:id', deleteTodo)

// PATCH a todo 
router.patch('/:id',updateTodo)

module.exports = router;