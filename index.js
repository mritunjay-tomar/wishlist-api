const express = require("express");
require("./db/connection")
const Wishlist = require("./db/models/Wishlist")

// creating the app object from express
const app = express();
// getting the port number from environment variable
const port = process.env.PORT || 3001;

app.use(express.json()); // This is used to recognize that request object is a JSON object


// First API request, which is a POST request.
app.post("/SaveWishlist", (req, res) => {
    const wish = new Wishlist(req.body)
    wish.save().then( () => {
        res.status(201).send("Wish Saved to Wishlist!");
    }).catch( (e) => {
        res.status(400).send(e);
    })
})

// Second API request, which is a GET request.
app.get("/", async(req, res) => {
    try {
        const Wishes = await Wishlist.find();
        res.send(Wishes);
    } catch(e) {
        res.send("Couldn't fetch your wishes :(");
    }
})

// Third API request, which is a PATCH request
app.patch("/UpdateWishlist/:id", async(req, res) => {
    try {
        const _id = req.params.id
        const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
        // Returns the updated data
        res.send(UpdateRequest);
    } catch(e) {
        res.status(404).send("Couldn't update your wish :(");
    }
})

// Fourth API request, which is a DELETE request.
app.delete("/DeleteWishlist/:id", async(req, res) => {
    try{
        console.log(req.params.id)
        const DeleteRequest = await Wishlist.findByIdAndDelete(req.params.id);
        // Returns the deleted data
        res.send(DeleteRequest);
    } catch(e) {
        res.status(500).send("Couldn't delete your wish :(");
    }
})

// Making the express server to listen on the port number specified.
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
})