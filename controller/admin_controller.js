const Admin_User=require("../model/usermodel")
const{comparepassword}=require("../middleware/auth")
const jwt=require('jsonwebtoken')
const Admin_Login=(req,res)=>{
    res.render("admin/admin_login",{
        title:"adminlogin"
    })
}
const AdminDashboard=(req,res)=>{
    res.render("admin/admin_dashboard",{
        title:"admindashboard",
        admindata:req.admin
    
    })
}
// 
const AdminLogInPost = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            console.log('all filed is required');
            res.redirect('/login/admin')
        }
        const matched = await Admin_User.findOne({ email })
        if (!matched) {
            console.log('email not registered');
            res.redirect('/login/admin')

        }
        //console.log('k',matched);
        if (matched.role == "admin") {
            const mathpass = await comparepassword(password, matched.password)
            if (!mathpass) {
                console.log('password incurrect');
                res.redirect('/login/admin')
            }
            const token = await jwt.sign({
                name: matched.name,
                email: matched.email,
                phone: matched.phone,
            }, process.env.JWT_SECRET, { expiresIn: "12h" })
            if (token) {
                res.cookie('adminToken', token)
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/login/admin')
            }

        } else {
            res.redirect('/login/admin')
        }
    } catch (error) {
        console.log(error)
    }

}
// 
const adminAuthcheck = (req, res, next) => {
    if (req.admin) {
        // console.log(req.admin);
        next();
    } else {
        //console.log('Err While Admin Auth');
        res.redirect('/login/admin')
    }
}
const AdminLogout = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect('/login/admin')
}

module.exports={
    Admin_Login,
    AdminDashboard,
    AdminLogInPost,
    adminAuthcheck,
    AdminLogout
}