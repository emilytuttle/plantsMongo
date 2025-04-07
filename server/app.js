const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Plant = require('./models/plant.model')

dotenv.config();

//check if mongoDB works and loads by logging in console
console.log('MongoDB URI:', process.env.MONGODB_URI);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to mongodb and log in console if it worked
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to MongoDB Atlas: ', err));

//api routes
// uses express as app, makes routes with asynchronous requests so the app can get the data from mongodb, but can keep loading other data or information while it waits for a response.
// get request, asks for the ones already in the database
app.get('/plants', async (req, res) => {
    // Get a json object of all of the plants. Searches the model from the models folder that uses mongoose to ask MongoDb for the schema
    const plants = await Plant.find();
    res.json(plants);
});

//post request, will make a body object with the info from my form on the home page, and create a new plant object. Uses .save() to put it in mongodb
app.post('/plants', async (req, res) => {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    res.status(201).json(newPlant);
});

// put request to be able to edit. Searches the plants in mongodb for the one that has a matching id and puts the new chenges there.
app.put('/plants/:id', async (req, res) => {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlant);
});

//delete request, does the same thing as the put request to search by id and delete using mongo commands.
app.delete('/plants/:id', async (req, res) => {
    await Plant.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Lets me know my server is working and what port it is on
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Gets a single plant by its id, so that they can be pulled up in an edit portion and can be edited.
app.get('/plants/:id', async (req, res) => {
    const plant = await Plant.findById(req.params.id);
        res.json(plant);
});

