const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couseSchema = new Schema({
    description: { type: String, required: true },
    price: { type: Number, required: true },
    creatorid: Schema.Types.ObjectId,
    imageUrl: { type: String, required: true },

});
const Course = mongoose.model('Course', couseSchema);

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});
const User = mongoose.model('User', userSchema);

const adminschema = new Schema ({
    email: String,
    password: String,
    salt: String,

});
const Admin = mongoose.model('Admin',adminschema);

module.exports = { Course, User, Admin };

