const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  password: String,
  name: String,
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('account', Account);
