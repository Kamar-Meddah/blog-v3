const express = require('express');
const app = express();
const fs=require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer({dest: 'img/articles/' }); // for parsing multipart/form-data
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/sessionStore'));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie:{secure:false}
}));


app.use(express.static(__dirname+'/')); 
app.post('/',upload.array('images'),(req,res)=>{
 const string=req.body.request.split('.')
 const ctrl=require(`./app/controller/${string[0]}Ctrl`);
 const fun=string[1]
 ctrl[fun](req,res)
})
app.post('/r',upload.array('images'),(req,res)=>{

  console.log(req.body)
  console.log(req.files)


})

//-------------------------------------------------------------------------
//server port default=80*/
app.listen(80);