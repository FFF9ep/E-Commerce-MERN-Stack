require('dotenv').config();

const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');


const app = express();
const path = require('path');
const { type } = require('os');
// const { error, log } = require('console');
// const { json } = require('stream/consumers');

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error   connecting to MongoDB', err));

    // const dns = require('dns');

    // dns.lookup('cluster0.1owha.mongodb.net', (err, address, family) => {
    // if (err) {
    //     console.error('DNS lookup failed:', err);
    // } else {
    //     console.log('Address:', address);
    //     console.log('Family:', family);
    // }
    // });

// API Create

app.get("/", (req,res) => {
    res.send("Express is Running");
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage})

//Create Upload Endpoint For Images
app.use('/images', express.static('upload/images'))

app.post("/upload",upload.single('product'), (req,res) => {
    res.json({
        success: 1,
        Image_url: `http:localhost:${port}/images/${req.file.filename}`
    })
    // console.log(req.body)
})

// Schema Products Creatiaton

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

app.post('/addproduct', async (req,res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) 
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else
    {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name:req.body.name,
    })
})

//API Delete Products
app.post('/removeproduct', async (req,res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Remove");
    res.json({
        success: true,
        name:req.body.name
    })
})

// API Get All Products
app.get('/allproducts', async (req,res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.json(products);
})

// Schema User Model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email: {
        type:String,
        unique:true,
    },
    password: {
        type:String,
    },
    cartData:{
        type:Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// API User Registration
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"existing user found with the same email id or email address"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
})

// User Login Endpoint
app.post('/login', async (req,res) => {
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false, errors:"Wrong password"});
        }
    }
    else {
        res.json({success:false, errors:"Wrong Email ID"});
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running On Port " + port);
    }
    else {
        console.log("Error :" + error);
    }
})