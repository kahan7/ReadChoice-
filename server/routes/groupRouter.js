const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const groupCtrl  = require('../controllers/groupCtrl');
const groupModel = require('../models/groupModel');
const Conversation = require('../models/conversationModel');

router.get('/groups', groupCtrl.getGroups,auth);
router.post('/groups/create', groupCtrl.createGroup,auth);
router.get('/group/:groupId', groupCtrl.getaGroup,auth);
router.post('/groups/join/:groupId', auth,groupCtrl.joinaGroup);
router.get('/groups/search', async (req, res) => {
    const { query } = req.query;
  
    try {
      const groups = await groupModel.find({
        name: {
          $regex: `^${query}`,
          $options: 'i'
        }
      }).limit(10);
  
      res.json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

// Route to get all discussions in a group
router.get('/groups/:groupId/discussions', async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const discussions = await Conversation.find({ group: groupId }).populate('recipients').populate('members');
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
