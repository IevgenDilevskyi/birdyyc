const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  stockQuantity:{
    type: Number,
    required: true,
  },
  imageUrl:{
    type: String,
    required: true,
  },
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  },
  subcategoryId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'subcategory'
  },
  size:{
    type: String,
    required: false,
  },
  color:{
    type: String,
    required: false,
  },
  averageRating:{
    type: Number,
    required: false,
  }
});

module.exports = mongoose.model('Product', productSchema);
