const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

userSchema = new Schema({
    email:{
        required: true,
        type:String,
        unique:true
    },
    password:{
        required: true,
        type:String,
    }
}, {timestamps: true})


userSchema.statics.signup = async function (email, password) {
    const exist = await this.findOne({email})
    if(!email || !password){
        throw Error("All fields are required")
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not in right format eg johndoe@gmail.com')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('This Password is not Strong enough')
    }
    if(exist){
        throw Error('Email already exist')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash})

    return user;
}

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email})
    if(!email || !password){
        throw Error('Please Enter all fields')
    }
    if(!user){
        throw Error('incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}


module.exports = mongoose.model('User', userSchema)