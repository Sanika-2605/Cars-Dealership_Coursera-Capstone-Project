const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());

const reviewsPath = fs.existsSync(path.join(__dirname, 'data', 'reviews.json'))
  ? path.join(__dirname, 'data', 'reviews.json')
  : path.join(__dirname, 'reviews.json');

const dealershipsPath = fs.existsSync(path.join(__dirname, 'data', 'dealerships.json'))
  ? path.join(__dirname, 'data', 'dealerships.json')
  : path.join(__dirname, 'dealerships.json');

const reviews_data = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync(dealershipsPath, 'utf8'));

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/";
mongoose.connect(mongoUrl, { dbName: 'dealershipsDB' })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    initData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const Reviews = require('./review');
const Dealerships = require('./dealership');

async function initData() {
  try {
    await Reviews.deleteMany({});
    await Reviews.insertMany(reviews_data['reviews']);
    await Dealerships.deleteMany({});
    await Dealerships.insertMany(dealerships_data['dealerships']);
    console.log("Database initialized with reviews and dealerships");
  } catch (error) {
    console.error("Error initializing documents:", error);
  }
}

// Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: parseInt(req.params.id) });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const stateParam = req.params.state;
    // Allow matching state name or state abbreviation (st) case-insensitively
    const documents = await Dealerships.find({
      $or: [
        { state: { $regex: new RegExp(`^${stateParam}$`, 'i') } },
        { st: { $regex: new RegExp(`^${stateParam}$`, 'i') } }
      ]
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const documents = await Dealerships.find({ id: parseInt(req.params.id) });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to insert review
app.post('/insert_review', async (req, res) => {
  try {
    let data = req.body;
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const documents = await Reviews.find().sort({ id: -1 });
    let new_id = (documents.length > 0 && documents[0]['id']) ? documents[0]['id'] + 1 : 1;

    const review = new Reviews({
      "id": new_id,
      "name": data['name'],
      "dealership": parseInt(data['dealership']),
      "review": data['review'],
      "purchase": data['purchase'],
      "purchase_date": data['purchase_date'],
      "car_make": data['car_make'],
      "car_model": data['car_model'],
      "car_year": parseInt(data['car_year']),
    });

    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
