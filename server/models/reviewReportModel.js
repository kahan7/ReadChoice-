const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewReportSchema = new Schema({
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true

  },
  content: {
    type: String,
    required: true
  },
  reportDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['processing', 'resolved'],
    default: 'processing'
  }
  
});

const ReviewReport = mongoose.model('ReviewReport', reviewReportSchema);

module.exports = ReviewReport;
