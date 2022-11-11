const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String},
        number: {type: String},
    },
    {timestamps: true}
)

accountSchema.index({username:1 ,email:1},{unique:true})

const account = mongoose.model("account", accountSchema)
module.exports = account;