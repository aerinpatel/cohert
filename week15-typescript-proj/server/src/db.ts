import mongoose, { Schema, Types } from 'mongoose';
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true,},
    password:{type:String,required:true,}
});
const tagSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true,},
});
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

const Tag = mongoose.model('Tag', tagSchema);
const User = mongoose.model('Tag', userSchema);

module.exports = {Tag,User};
