// Import necessary modules
const express = require('express');
const router = express.Router();
const ReviewReport = require('../models/reviewReportModel');
const reviewModel = require('../models/reviewModel');

// API endpoint for reporting a review
router.post('/reviews/:id/report', async (req, res) => {
  const { id } = req.params; // Id of the review being reported
  const { content } = req.body; // Content of the report

  const { userId } = req.body; // Content of the report
  try {
    // Create a new review report

    const report = new ReviewReport({
        
      reviewId: id,
      content,
      userId
    });

    // Save the review report to the database
    const savedReport = await report.save();

    // Send a response to the client
    res.status(200).json({
      success: true,
      message: 'Review reported successfully',
      report: savedReport
    });
  } catch (err) {
    // Send an error response to the client
    res.status(500).json({
      success: false,
      message: 'Error reporting review',
      error: err.message
    });
  }
});

// API endpoint for getting all review reports
router.get('/reports', async (req, res) => {
  try {
    // Find all review reports in the databas
    const reports = await ReviewReport.find().populate('userId').populate({path: "reviewId", populate: {
        path:  "author book",
        select: "-password"
    }})
    

    // Send a response to the client
    res.status(200).json(
      reports
    );
  } catch (err) {
    // Send an error response to the client
    res.status(500).json({
      success: false,
      message: 'Error retrieving review reports',
      error: err.message
    });
  }
});

// API endpoint for updating the status of a review report
router.patch('/reports/:id', async (req, res) => {
  const { id } = req.params; // Id of the review report being updated
  const { status } = req.body; // New status of the review report

  try {
    // Find the review report in the database and update its status
    const updatedReport = await ReviewReport.findByIdAndUpdate(id, { status }, { new: true });

    // Send a response to the client
    res.status(200).json({
      success: true,
      message: 'Review report updated successfully',
      report: updatedReport
    });
  } catch (err) {
    // Send an error response to the client
    res.status(500).json({
      success: false,
      message: 'Error updating review report',
      error: err.message
    });
  }
});

module.exports = router;
