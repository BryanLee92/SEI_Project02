const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    category: String,
    name: {type: String, required: true},
    description: String,
    img: String,
    price: {type: Number, required: true}
})

const food = mongoose.model("food", foodSchema);
module.exports=food;