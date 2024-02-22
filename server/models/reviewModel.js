const mongoose = require('mongoose');


  const ReviewSchema = new mongoose.Schema({
  
    author: {  type: mongoose.Types.ObjectId, ref: 'user', required: true},
    content: { type: String, required: true },
    book: {   type: mongoose.Types.ObjectId, ref: 'book',required:true},
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    rating:{ type: Number, required: true, min: 1, max: 5 },
  }); 
  
ReviewSchema.index({ author: 1, book: 1 }, { unique: false });
module.exports = mongoose.model('Review', ReviewSchema);
