const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mySchema = new Schema({
  name: String,
  email: {
      type: String,
      required: true,
  }
 });

const model = mongoose.model('Subscription', mySchema);
module.exports = model;