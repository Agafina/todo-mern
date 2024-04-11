const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo: {
        required:true,
        type:String
    },
    user_id: {
        required: true,
        type:String
    }
}, {timestamps:true})
module.exports = mongoose.model('Todo', todoSchema)