const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {   
        name: {type: String, required: true},
        price: {type: Number, required: true}
    },
    {Timestamp: true}
)

const cart = mongoose.model( "cart", cartSchema );
module.exports=cart;