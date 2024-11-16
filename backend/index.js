require('dotenv').config();

const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');


const app = express();
const path = require('path');
const { error } = require('console');

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
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running On Port " + port);
    }
    else {
        console.log("Error :" + error);
    }
})