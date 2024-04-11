const { default: mongoose } = require('mongoose')
const Todo = require('../models/todoModel')


const getTodos = async(req, res) =>{
    const user_id = req.user._id
    const todos = await Todo.find({user_id}).sort({createdAt: -1})
    res.status(200).json(todos)
}

const getSingleTodo = async(req, res) => {
    const { id } = req.params
    const todos = await Todo.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Todo"})
    }
    res.status(200).json(todos)
}

const createTodo =async(req, res) => {
    const {todo} = req.body

    try{
        const user_id = req.user._id
        const todos = await Todo.create({ todo, user_id })
        res.status(200).json(todos)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}

const deleteTodo = async(req, res) => {
    const {id}  = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such Todo'})
    }
    const todos = await Todo.findByIdAndDelete(id)
    if(!todos){
        res.status(400).json({error: "No such Todo"})
    }
    res.status(200).json(todos)
}

const updateTodo = async(req, res) => {
    const {id} = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such Todo'})
    }
    const todos = await Todo.findByIdAndUpdate({_id: id})

    if(!todos){
        res.status(400).json({error: "No such Todo"})
    }
    res.status(200).json(todos)
}

module.exports = {
    getTodos,
    getSingleTodo,
    deleteTodo,
    updateTodo,
    createTodo
}