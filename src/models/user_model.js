import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});

const bcrypt = require('bcryptjs');

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
  if (bcrypt.compareSync(candidatePassword, this.password)) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};

// 这里不能用 (next)=> 不然没有this
// https://stackoverflow.com/questions/37365038/this-is-undefined-in-a-mongoose-pre-save-hook
UserSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  if (!this.isModified('password')) return next();

  // TODO: do stuff here
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  // Store hash in your password DB.
  this.password = hash;

  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  // only hash the password if it has been modified (or is new)
  return next();
});

// create model class

// Mongoose#model(name, [schema], [collection], [skipInit])

// Defines a model or retrieves it.

// Parameters:

// 1st param - name <String> model name
// 2nd param - [schema] <Schema> schema name
// 3rd param - [collection] <String> collection name (optional, induced from model name)
// 4th param - [skipInit] <Boolean> whether to skip initialization (defaults to false)
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
