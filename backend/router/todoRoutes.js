const express = require('express')
const Todo = require('../models/todoModel')
const {
    createTodo,
    getSingleTodo,
    getTodos,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')



const router = express.Router()
router.use(requireAuth)

router.get('/', getTodos)

router.get('/:id', getSingleTodo)

router.post('/', createTodo)

router.delete('/:id',deleteTodo)

router.patch('/:id', updateTodo)

module.exports = router