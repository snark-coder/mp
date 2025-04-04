const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")


//middleware
// makes connection to frontend site

app.use(cors());
app.use(express.json());

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

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bookCollection = client.db("BookInventory").collection("books");
    const rentalCollection = client.db("BookInventory").collection("rentals");

    //insert a book using post method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
    
      if (!data.uploadedBy || !data.uploadedBy.uid) {
        return res.status(400).send({ message: "Missing uploader info" });
      }
    
      const result = await bookCollection.insertOne({
        ...data,
        createdAt: new Date()
      });
    
      res.send(result);
    });
    

    //get all books from db

    // app.get("/all-books", async(req, res)=>{
    //     const books = await bookCollection.find();
    //     const result = await books.toArray();
    //     res.send(result);
    // })

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
    
      let query = {};
      if (userEmail) {
        query = { "uploadedBy.email": { $ne: userEmail } };
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
        createdAt: new Date()
      };
    
      const result = await rentalCollection.insertOne(rental);
      res.send(result);
    });

    // get rentals that i have rented
    app.get("/my-rentals/:userId", async (req, res) => {
      const { userId } = req.params;
    
      const result = await rentalCollection
        .find({ renterId: userId })
        .toArray();
    
      res.send(result);
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