const router = require('express').Router()
const {auth} = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")
const User = require('../models/userModel')


router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/user', auth, userCtrl.updateUser)

router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow)

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.put('/users/:id/disable', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.status = 'disabled';
      await user.save();
  
      res.json({ message: 'User status has been updated to disable' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.put('/users/:id/enable', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.status = 'active';
      await user.save();
  
      res.json({ message: 'User status has been updated to enable' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router