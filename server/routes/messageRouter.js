const router = require('express').Router()
const messageCtrl = require('../controllers/messageCtrl')
const {auth} = require('../middleware/auth')
const conversationModel = require('../models/conversationModel')

router.post('/message', auth, messageCtrl.createMessage)

router.get('/conversations', auth, messageCtrl.getConversations)

router.get('/message/:id', auth, messageCtrl.getMessages)

router.delete('/message/:id', auth, messageCtrl.deleteMessages)

router.delete('/conversation/:id', auth, messageCtrl.deleteConversation)

router.post('/group/discussions',auth, async (req, res) => {
    try {
      const { groupId, title } = req.body;
  console.log(title)
      const discussion = new conversationModel({
        group: groupId,
        title,
   
      });
  
      const newDiscussion = await discussion.save();
      res.json(newDiscussion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create discussion' });
    }
  });
  router.post('/conversations/:conversationId/join', (req, res) => {
    const conversationId = req.params.conversationId;
    
    // Thực hiện các bước xử lý để tham gia vào cuộc trò chuyện
    // Ví dụ: Tìm cuộc trò chuyện theo ID và cập nhật danh sách thành viên
    conversationModel.findByIdAndUpdate(
      conversationId,
      { $addToSet: { members: req.body.userId } }, // req.body.userId là ID của người dùng muốn tham gia
      { new: true }
    )
      .then((updatedConversation) => {
        if (updatedConversation) {
          res.json({ message: 'Successfully joined the conversation' });
        } else {
          res.status(404).json({ error: 'Conversation not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  });
module.exports = router