const express = require('express');
const app = express();
const mysql = require('mysql')
const bodyParser = require('body-parser');
const port = 3333;
const multer = require("multer");
const upload = multer();
const fs = require('fs');
const path = require('path');


app.use(express.static('client/dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wooden_spoon'
});

app.post("/",upload.array('file',1),(req, res) => {
    if(req.files){

        let file = req.files[0];
        let fileUrl = `pics/portalPics/${file.originalname.substring(0,file.originalname.length - 4)}${Date.parse(new Date())}.jpg`;

        fs.writeFile(`${__dirname}/client/dist/${fileUrl}`, file.buffer, (err) => {
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                let q = `insert into posts (url, post) values('${fileUrl}','${req.body.text}');`;
                db.query(q, (err, data) => {
                    if(err){
                        res.status(500).send(err);
                    }else{
                        db.query("select * from posts;", (err, data) => {
                            console.log('wrong')
                            res.send({"data":data})
                    });
                    }
                })
            }
        })
    } else {
        db.query("select * from posts;", (err, data) => {
            console.log('wrong')
            res.send({"data":data})
        });
    }
});

// app.post('/post', (req))

app.listen(port, () => console.log(`Wooden spoon started on port: http://localhost:${port}`));


