import mongoose, { Schema,InferRawDocType, Types } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const x:string = process.env.DATABASE_CONN||"";
mongoose.connect(x);

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true,},
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
const   linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

const Tag = mongoose.model('Tag', tagSchema);
const User = mongoose.model('User', userSchema);
const Content = mongoose.model('Content', contentSchema);
const Link = mongoose.model('Link', linkSchema);

// type TagType = InferRawDocType<typeof tagSchema>;
// type UserType = InferRawDocType<typeof userSchema>;
// type ContentType = InferRawDocType<typeof contentSchema>;
// type LinkType = InferRawDocType<typeof linkSchema>;
export {Tag,User,Content,Link};
