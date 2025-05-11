const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = function(client) {
  const cartCollection = client.db("BookInventory").collection("userCarts");

  router.post('/add', async (req, res) => {
    try {
      const { userId, bookId } = req.body;
  
      // Validate that bookId is a valid ObjectId
      if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid bookId" });
      }
  
      if (!userId || !bookId) {
        return res.status(400).json({ message: "Missing userId or bookId" });
      }
  
      await client.connect();
      const cartCollection = client.db("BookInventory").collection("userCarts");
  
      await cartCollection.updateOne(
        { userId },
        { $push: { cartItems: new ObjectId(bookId) } },
        { upsert: true }
      );
  
      res.status(201).json({ message: "Item added to cart" });
    } catch (err) {
      console.error("Error adding to cart:", err);
      res.status(500).json({ message: "Server error" });
    } finally {
      //await client.close();
    }
  });
  

  router.get('/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await cartCollection.findOne({ userId });

      res.status(200).json(cart?.cartItems || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete('/remove/:userId/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;
  
    // Validate bookId
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid bookId" });
    }
  
    try {
      await cartCollection.updateOne(
        { userId },
        { $pull: { cartItems: new ObjectId(bookId) } }
      );
  
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  });
  

  return router;
};
