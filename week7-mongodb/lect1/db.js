const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userid = new Schema({
    email: {type:String, unique: true},
    name: String,
    password: String,
    namak: String
});
const todo = new Schema({
    todo: String,
    done: Boolean,
    userid: ObjectId
});
const Usermodel = mongoose.model('users', userid);
const todomodel = mongoose.model('todos', todo);

module.exports = {
    Usermodel: Usermodel,
    todomodel: todomodel
}