const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")

app.use(cors());
app.use(express.json());






//middleware
// makes connection to frontend site



app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongodb configuration



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:hsd1hFMhQnu9n3yc@db.ssegx.mongodb.net/?appName=db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const cartRoutes = require('./routes/cart')(client);
app.use('/api/cart', cartRoutes);
const userRoutes = require('./routes/user')(client);
app.use('/api/user', userRoutes);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bookCollection = client.db("BookInventory").collection("books");
    const rentalCollection = client.db("BookInventory").collection("rentals");
    //const cart = client.db("BookInventory").collection("cart")

    //insert a book using post method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      //console.log(req.body);
    
      if (!data.uploadedBy || !data.uploadedBy.uid) {
        return res.status(400).send({ message: "Missing uploader info" });
      }
    
      const result = await bookCollection.insertOne({
        ...data,
        createdAt: new Date(),
        isAvailable: true
      });
    
      res.send(result);
    });

    // delete from my-rentals
    // server.js
app.delete("/rental/:rentalId", async (req, res) => {
  const { rentalId } = req.params;

  try {
    const result = await rentalCollection.deleteOne({ _id: new ObjectId(rentalId) });
    res.send(result);
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).send({ message: "Failed to delete rental" });
  }
});


// save address



// get user cart
app.get('/user-cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userCartCollection = client.db("BookInventory").collection("userCarts");

    const userCart = await userCartCollection.findOne({ userId });

    res.send(userCart?.cartItems || []);
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

// save address after checkout

app.post('/user-address/:userId', async (req, res) => {
  const { userId } = req.params;
  const { address } = req.body;

  try {
    const usersCollection = client.db("BookInventory").collection("users");

    const result = await usersCollection.updateOne(
      { userId },
      { $set: { address } },
      { upsert: true }
    );

    res.send({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

// fetch multiple cart books



// Route to get user cart items


// Route to fetch books in cart based on their IDs
app.get('/cart-books', async (req, res) => {
  try {
    const idsParam = req.query.ids;
    if (!idsParam) {
      return res.status(400).send({ message: "No book IDs provided" });
    }

    const ids = idsParam.split(',').map(id => {
      try {
        return new ObjectId(id);
      } catch (err) {
        return null; // Filter out invalid IDs
      }
    }).filter(id => id !== null);

    if (ids.length === 0) {
      return res.status(400).send({ message: "Invalid book IDs" });
    }

    const result = await bookCollection.find({ _id: { $in: ids } }).toArray();
    res.send(result || []);
  } catch (err) {
    console.error("Error fetching cart books:", err);
    res.status(500).send([]);
  }
});
    // returning a books
    app.post("/return/:rentalId", async (req, res) => {
      const { rentalId } = req.params;
    
      try {
        const rental = await rentalCollection.findOne({ _id: new ObjectId(rentalId) });
    
        if (!rental) {
          return res.status(404).send({ message: "Rental not found" });
        }
    
        //  Set rental status to returned
        const updateResult = await rentalCollection.updateOne(
          { _id: new ObjectId(rentalId) },
          { $set: { status: "returned", returnDate: new Date() } }
        );
    
        // Make book available again
        await bookCollection.updateOne(
          { _id: new ObjectId(rental.bookId) },
          { $set: { isAvailable: true } }
        );
    
        res.send({ message: "Book returned and made available", updateResult });
      } catch (err) {
        res.status(500).send({ message: "Failed to return book", error: err.message });
      }
    });
    
    

    app.get("/my-rentals/:userId", async (req, res) => {
      const { userId } = req.params;
    
      try {
        const rentals = await rentalCollection.find({ renterId: userId }).toArray();
    
        const bookIds = rentals.map(r => r.bookId);
        const books = await bookCollection.find({ _id: { $in: bookIds } }).toArray();
    
        // Map book ID to book details for easy lookup
        const bookMap = {};
        books.forEach(book => {
          bookMap[book._id.toString()] = book;
        });
    
        // Attach book details and calculate due date
        const enhancedRentals = rentals.map(rental => {
          const book = bookMap[rental.bookId.toString()];
          return {
            rentalId: rental._id,
            rentStartDate: rental.rentStartDate,
            status:rental.status,
            dueDate: new Date(new Date(rental.rentStartDate).getTime() + rental.rentDurationDays * 24 * 60 * 60 * 1000),
            book: {
              title: book?.bookTitle,
              imageURL: book?.imageURL,
              price: book?.bookPrice,
              bookId: book?._id,
              isAvailable:true
            },
            returnDate: rental.returnDate
          };
        });
    
        res.send(enhancedRentals);
      } catch (error) {
        console.error("Error fetching rentals:", error);
        res.status(500).send({ message: "Error fetching rentals" });
      }
    });


  
    
    

    // app.patch("/backfill-availability", async (req, res) => {
    //   const result = await bookCollection.updateMany(
    //     { isAvailable: { $exists: false } },
    //     { $set: { isAvailable: true } }
    //   );
    //   res.send(result);
    // });
    

    //update books data
    app.patch("/book/:id", async(req, res)=>{
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = {_id :new ObjectId(id)};
        const options = {upsert:true};

        const updateDoc = {
            $set: {
                ...updateBookData
            }
        }

        //update
        const result = await bookCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    })

    //delete a book data

    app.delete("/book/:id", async(req, res)=>{
        const id = req.params.id;
        const filter = {_id:new ObjectId(id)};
        const result = await bookCollection.deleteOne(filter);
        res.send(result);
    })

    // get all books except your own books
    app.get("/all-books", async (req, res) => {
      const userEmail = req.query.email;
      
    
      let query = { isAvailable: true }; // 👈 Only show available books
      if (userEmail) {
        query["uploadedBy.email"] = { $ne: userEmail };
      }
    
      const result = await bookCollection.find(query).toArray();
      res.send(result);
    });
    

    // get single book data
    app.get("/book/:id", async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)};
      const result = await bookCollection.findOne(filter);
      res.send(result);
    })
    
    // get users books (current users)
    app.get("/my-books/:ownerId", async (req, res) => {
      const { ownerId } = req.params;
    
      try {
        const result = await bookCollection
          .find({ ownerId })
          .toArray();
    
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Error fetching user books" });
      }
    });

    // rent a book

    app.post("/rent", async (req, res) => {
      const { bookId, renterId, rentDurationDays } = req.body;
    
      const book = await bookCollection.findOne({ _id: new ObjectId(bookId) });
    
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
    
      if (book.ownerId === renterId) {
        return res.status(400).send({ message: "You cannot rent your own book" });
      }
    
      const rental = {
        bookId: new ObjectId(bookId),
        renterId,
        rentStartDate: new Date(),
        rentDurationDays,
        status: "pending",
        createdAt: new Date(),
        returnDate:null,
      };
    
      const rentalResult = await rentalCollection.insertOne(rental);
    
      // ✅ Mark book as unavailable
      await bookCollection.updateOne(
        { _id: new ObjectId(bookId) },
        { $set: { isAvailable: false } }
      );
    
      res.send(rentalResult);
    });
    
    

    
    // get the people that have rented my books
    app.get("/rented-my-books/:ownerId", async (req, res) => {
      const { ownerId } = req.params;
    
      // Get user's books first
      const userBooks = await bookCollection.find({ ownerId }).toArray();
      const userBookIds = userBooks.map(book => book._id);
    
      // Then find rentals of those books
      const rentals = await rentalCollection
        .find({ bookId: { $in: userBookIds } })
        .toArray();
    
      res.send(rentals);
    });

    app.get("/user-books", async (req, res) => {
      const email = req.query.email;
      const result = await bookCollection.find({ "uploadedBy.email": email }).toArray();
      res.send(result);
    });
    
    
    
    

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})