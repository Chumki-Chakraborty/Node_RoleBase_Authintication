const express=require("express")
const ejs=require("ejs")
const Admin_route=express.Router()
const{Admin_Login,AdminDashboard,AdminLogInPost,adminAuthcheck,AdminLogout}=require("../controller/admin_controller")
const { jwtAdminAuth } = require("../middleware/auth")
Admin_route.get("/login/admin",Admin_Login)
Admin_route.get("/admin/dashboard",jwtAdminAuth,adminAuthcheck,AdminDashboard)

Admin_route.post('/admin/dashbord/create',AdminLogInPost)
Admin_route.get('/logout/admin',jwtAdminAuth,adminAuthcheck,AdminLogout)





module.exports=Admin_route