const express=require("express")
const ejs=require("ejs")
const user_route=express.Router()

const{RegisterUser,Login_User,UserDashboard,CreateUser,UserLPost,userAuthcheck,UserService,UserLogout}=require("../controller/usercontroller")
const { jwtUserAuth } = require("../middleware/auth")
user_route.get("/create/user",RegisterUser)
user_route.get("/login/user",Login_User)
user_route.get("/user/dashboard",jwtUserAuth,userAuthcheck,UserDashboard)
user_route.get("/user/service",jwtUserAuth,userAuthcheck,UserService)

// 
user_route.post("/create/data",CreateUser)
user_route.post('/login',UserLPost)
user_route.get('/logout',jwtUserAuth,userAuthcheck,UserLogout)




module.exports=user_route