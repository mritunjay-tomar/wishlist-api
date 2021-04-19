const express = require("express");
require("./db/connection")
const Wishlist = require("./db/models/Wishlist")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // This is used to recodnize that request object is a JSON object

app.post("/SaveWishlist", (req, res) => {
    const wish = new Wishlist(req.body)
    wish.save().then( () => {
        res.status(201).send("Wishlist Saved!");
    }).catch( (e) => {
        res.status(400).send(e);
    })
})

app.get("/", async(req, res) => {
    try {
        const Wishes = await Wishlist.find();
        res.send(Wishes);
    } catch(e) {
        res.send(e);
    }
})

app.patch("/UpdateWishlist/:id", async (req, res) => {
    try {
        const _id = req.params.id
        console.log("Update")
        const UpdateRequest = Wishlist.findByIdAndUpdate({_id : _id}, req.body, {new: true})
        res.send(UpdateRequest);
    } catch(e) {
        console.log(e);
        res.status(404).send(e);
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
})