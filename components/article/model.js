const { text } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mySchema = new Schema({
  title: String,
  text: {
    type: String,
    required: true,
   },
  date: String,
 file: String,
 label: String,
 author: String
 

    
});

const model = mongoose.model('Article', mySchema);
module.exports = model;