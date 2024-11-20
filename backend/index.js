require('dotenv').config();

const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');


const app = express();
const path = require('path');
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
    const product = new Product({
        id: req.body.id,
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

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running On Port " + port);
    }
    else {
        console.log("Error :" + error);
    }
})