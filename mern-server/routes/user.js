const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = function(client) {
  const usersCollection = client.db("BookInventory").collection("users");

  // Save or update user address
  router.post('/save-address', async (req, res) => {
    const { userId, address, zipcode, state, country } = req.body;
    

    if (!userId || !address || !zipcode || !state || !country) {
      return res.status(400).json({ message: "All address fields are required" });
    }

    try {
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            address: {
              address,
              zipcode,
              state,
              country,
            },
          },
        },
        { upsert: true }
      );

      res.status(200).json({ message: "Address saved successfully" });
    } catch (err) {
      console.error("Failed to save address:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  router.post('/user-address/:userId', async (req, res) => {
    const { userId } = req.params;
    const { address } = req.body;
  
    try {
      const usersCollection = client.db("BookInventory").collection("users");
  
      const result = await usersCollection.updateOne(
        { userId },
        {
          $set: {
            address,
            addressSaved: true // ✅ Mark address as saved
          }
        },
        { upsert: true }
      );
  
      res.send({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, error: err.message });
    }
  });

  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const usersCollection = client.db("BookInventory").collection("users");
  
    try {
      // Fetch user data from the database using userId
      const user = await usersCollection.findOne({ userId });
  
      // If user is not found, send an error response
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send back the user's address if found
      res.json({ address: user.address || null });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user's address", error: err.message });
    }
  });
  
  
  

  return router;
};