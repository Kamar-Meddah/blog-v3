const express = require('express');
const app = express();
const fs=require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer({dest: 'img/articles/' }); // for parsing multipart/form-data
const SessionStore = require('express-session-sequelize')(session.Store);




app.use(session({
  secret: 'keep it secret, keep it safe.',
  store: new SessionStore({db: new (require('sequelize'))(require('./config/dbconfig'))}),
  resave: true,
  saveUninitialized: false,
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(__dirname+'/')); 
app.post('/',upload.array('images'),(req,res)=>{
 const string=req.body.request.split('.')
 const ctrl=require(`./app/controller/${string[0]}Ctrl`);
 const fun=string[1]
 ctrl[fun](req,res)
})

//-------------------------------------------------------------------------
//server port default=80*/
app.listen(80);