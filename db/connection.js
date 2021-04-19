const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/Wishlist-API",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then( () => {
}).catch( (err) => {
    if (err) {
        console.log(err)
    }
} )