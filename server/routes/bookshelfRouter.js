const router = require('express').Router()
const BookshelfCtrl =  require('../controllers/bookshelfCtrl')
const {auth} = require('../middleware/auth')
const Bookshelf = require('../models/Bookshelf_Books')

router.post('/bookshelf/books',auth, BookshelfCtrl.addtobookshelf) 

router.get('/bookshelf/books/:userId', BookshelfCtrl.getbookshelf) 

router.post('/bookshelves/:userId/drawers', async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.params.userId;
  
      // Find the bookshelf by ID
      const bookshelf = await Bookshelf.findOne({user:userId});
  
      if (!bookshelf) {
        return res.status(404).json({ error: 'Bookshelf not found' });
      }
  
      // Add a new drawer to the bookshelf
      const newDrawer = { name, books: [] };
      bookshelf.drawers.push(newDrawer);
  
      // Save the updated bookshelf to the database
      const updatedBookshelf = await bookshelf.save();
  
      res.status(201).json(newDrawer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create drawer' });
    }
  });
  router.delete('/bookshelves/:userId/drawers/:drawerId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const drawerId = req.params.drawerId;
    
      // Find the bookshelf by ID
      const bookshelf = await Bookshelf.findOne({ user: userId });
    
      if (!bookshelf) {
        return res.status(404).json({ error: 'Bookshelf not found' });
      }
    
      // Find the drawer by ID
      const drawer = bookshelf.drawers.id(drawerId);
    
      if (!drawer) {
        return res.status(404).json({ error: 'Drawer not found' });
      }
    
      // Remove the drawer from the bookshelf
      drawer.remove();
      // Save the updated bookshelf to the databas
      const updatedBookshelf = await bookshelf.save();  
      res.status(200).json({ message: 'Drawer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete drawer' });
    }
  });
  router.put('/bookshelves/:userId/drawers/:drawerId', async (req, res) => {
    try {
      const { name } = req.body;
      const { userId, drawerId } = req.params;
  
      // Find the bookshelf by ID
      const bookshelf = await Bookshelf.findOne({ user: userId });
  
      if (!bookshelf) {
        return res.status(404).json({ error: 'Bookshelf not found' });
      }
  
      // Find the drawer by ID
      const drawer = bookshelf.drawers.id(drawerId);
  
      if (!drawer) {
        return res.status(404).json({ error: 'Drawer not found' });
      }
  
      // Update the name of the drawer
      drawer.name = name;
  
      // Save the updated bookshelf to the database
      const updatedBookshelf = await bookshelf.save();
  
      res.status(200).json(drawer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update drawer' });
    }
  });
  
  
module.exports = router