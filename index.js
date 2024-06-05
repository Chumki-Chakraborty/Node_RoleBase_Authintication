const express=require("express")
const ejs=require("ejs")
const flash=require("connect-flash")
const app=express()
const session=require("express-session")
const bodyParser = require('body-parser')

const cookiepurser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookiepurser());
const dotenv=require("dotenv")
dotenv.config()
const mongodb_connection=require("./config/database")
mongodb_connection()
app.set("view engine","ejs")
app.set("views","views")

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:600000} 
  }))
app.use(flash())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const UserRoute=require("./route/user_route")
app.use(UserRoute)
// Admin_route
const Admin_route=require("./route/admin_route")
app.use(Admin_route)


const port=2424
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})