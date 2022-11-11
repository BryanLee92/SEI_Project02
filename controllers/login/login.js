const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const accountData = require("../../models/account.js")
const arr = require("../../models/array.js");

router.get("/login", (req ,res)=>{
    res.render("foodie/login.ejs", {userdata: req.session.currentUser});
})

router.post("/",(req ,res)=>{
    accountData.findOne({ username: req.body.username }, (err, data)=>{
        if(err){
            console.log(err.message)
        }else{
            if(data){
                if(bcrypt.compareSync(req.body.password, data.password)){
                    req.session.currentUser = data;
                    res.redirect("/")
                }
                else{
                    res.send("<h1>Wrong Password</h1>")
                }
            }
            else{
                res.send("<h1>Invalid User ID</h1>")
            }
        }
    })
})

router.get("/:id/update", (req ,res)=>{
    accountData.findById(req.params.id, (error, update)=>{
        if(error){
            console.log(error.message)
        }else{
            res.render("foodie/update.ejs", {
                userdata: req.session.currentUser,
                id: update});
        }
    })
})

router.put("/:id",(req, res)=>{
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
        )
    accountData.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err, data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect("/")
        }
    })
})

router.get('/logout/:id', (req, res)=>{
    req.session.destroy();
    arr.splice(req.params.id, 1000);
    return res.redirect("/")
})

module.exports=router;