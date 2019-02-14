const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,//{type: String, required: true},
  email: String, //{type: String, required: true},
  password: String, //{type: String, required: true},
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
},
 {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
