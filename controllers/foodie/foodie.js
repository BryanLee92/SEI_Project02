const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();

//account
const accountData = require("../../models/account.js")
//main
const foodSchema = require("../../models/foodSchema.js")
console.log(foodSchema)
const mainSeed = require("../../models/mainSeed.js")
//sides
const sideSeed = require("../../models/sideSeed.js");
//drinks
const drinkSeed = require("../../models/drinkSeed.js");
//desserts
const dessertSeed = require("../../models/dessertSeed.js");
//cart
const cart = require("../../models/cartSchema.js");
const arr = require("../../models/array.js");

router.get("/main", (req ,res)=>{
    foodSchema.find({category: "main"}, (err,data)=>{
        if(err){
            console.log(err.message);
        }else{
            res.render("foodie/main.ejs", {
                userdata: req.session.currentUser,
                main: data
            });
        }
    })
})

router.get("/sides", (req ,res)=>{
    foodSchema.find({category: "side"}, (err,data)=>{
        if(err){
            console.log(err.message);
        }else{
            res.render("foodie/sides.ejs", {
                userdata: req.session.currentUser,
                sides: data
            });
        }
    })
})

router.get("/drinks", (req ,res)=>{
    foodSchema.find({category: "drinks"}, (err,data)=>{
        if(err){
            console.log(err.message);
        }else{
            res.render("foodie/drinks.ejs", {
                userdata: req.session.currentUser,
                drinks: data
            });
        }
    })
})

router.get("/dessert", (req ,res)=>{
    foodSchema.find({category: "dessert"}, (err,data)=>{
        if(err){
            console.log(err.message);
        }else{
            res.render("foodie/desserts.ejs", {
                userdata: req.session.currentUser,
                dessert: data
            });
        }
    })
})

router.get("/product/new",(req, res)=>{
     res.render("foodie/createFood.ejs", {
        userdata: req.session.currentUser
    })
})

router.post("/product", (req ,res)=>{
    foodSchema.create(req.body, (err, data)=>{
        if(err){
            console.log(`ERROR at: ${err.message}`)
        }else{
            console.log(data);
            res.redirect("/");
        }
    })
})

router.get("/signup", (req ,res)=>{
    res.render("foodie/new.ejs" , {userdata: req.session.currentUser});
})

router.post("/", (req ,res)=>{
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
        )
    accountData.create(req.body, (err, data)=>{
        if(err){
            console.log(`ERROR at: ${err.message}`)
        }else{
            res.redirect("/");
        }
    })
})

router.get("/:id/edit", (req, res)=>{
    foodSchema.findById(req.params.id, (error, data)=>{
        if(error){
            console.log(error.message)
        }else{
            res.render("foodie/editfood.ejs", 
            {userdata: req.session.currentUser,
            data: data})
        }
    })
})

router.put("/:id", (req, res)=>{
    foodSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updated)=>{
            if(error){
                console.log(error.message)
            }else{
                res.redirect("/");
            }
        })
})

router.delete("/:id", (req, res)=>{
    foodSchema.findByIdAndDelete(req.params.id, (error, data)=>{
        if(error){
            console.log(error.message)
        }else{
            console.log(data)
            res.redirect("/")
        }
    })
})

router.get("/cart", (req, res)=>{
   res.render("foodie/cart.ejs", 
   {userdata: req.session.currentUser,
   cart: arr})
});

router.get("/cart/:name/:price", (req, res)=>{
    arr.push({name: req.params.name,
    price: req.params.price})
})

router.post("/cart", (req, res)=>{
    cart.create(arr, (err, data)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log(data)
            res.redirect("/foodie/checkout")
        }
    })
});

router.delete("/cart/:id", (req, res)=>{
    arr.splice(req.params.id, 1);
    res.redirect("/foodie/cart");
})

router.get("/checkout", (req ,res)=>{
    res.render("foodie/checkout.ejs", 
   {userdata: req.session.currentUser,
    checkout: arr})
})

router.get("/get/main", (req, res)=>{
    foodSchema.create(mainSeed, (err, data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect("/foodie/main")
        }
    });
});

router.get("/get/sides", (req, res)=>{
    foodSchema.create(sideSeed, (err, data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect("/foodie/sides")
        }
    });
});

router.get("/get/drinks", (req, res)=>{
    foodSchema.create(drinkSeed, (err, data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect("/foodie/drinks")
        }
    });
});

router.get("/get/dessert", (req, res)=>{
    foodSchema.create(dessertSeed, (err, data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect("/foodie/dessert")
        }
    });
});
module.exports=router;