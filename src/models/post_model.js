import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  coverUrl: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
