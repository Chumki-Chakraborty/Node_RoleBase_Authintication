const { hashpassword, comparepassword } = require("../middleware/auth")
const User = require("../model/usermodel")
const jwt = require("jsonwebtoken")
const flash = require("connect-flash")
const { Validator } = require('node-input-validator');
const RegisterUser = (req, res) => {
    res.render("user/userregister", {
        title: "registerpage",
        message: req.flash('message')

    })
}
// Login_User
const Login_User = (req, res) => {
    res.render("user/user_login", {
        title: "loginuser",
        message: req.flash('message')

    })

}
// UserDashboard
const UserDashboard = (req, res) => {
    res.render("user/user_dashboard", {
        title: "dashboarduser",
        data: req.user
    })

}
// CreateUser
const CreateUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (!name) {
            console.log(`name is required`);
            return res.redirect("/create/user")
        }
        if (!email) {
            console.log(`email is required`);
            return res.redirect("/create/user")
        }
        if (!phone) {
            console.log(`phone is required`);
            return res.redirect("/create/user")
        }
        if (!password) {
            console.log(`password is required`);
            return res.redirect("/create/user")
        }
        const ExistingUser = await User.findOne({ email })
        if (ExistingUser) {
            console.log(`Email is already exist`);
            req.flash("message", "Email is already exist..Try Again!!")
            return res.redirect("/create/user")

        }
        // HashPassword
        const HashPassword = await hashpassword(password)

        const v = await new Validator(req.body, {
            name: 'required|regex:[a-zA-Z]',
            email: 'required|minLength:5',
            phone: "required|minLength:10|integer",
            password: 'required|minLength:5|integer'
        })
        const condition = await v.check().then((val) => val)
        if (!condition) {
            console.log(`all condition not matched `);
            req.flash('message', 'all condtion not matched')
            return res.redirect("/create/user")
        }

        const newuser = await new User({
            name, email, phone, password: HashPassword
        })
        newuser.save()
        if (newuser) {
            console.log(`new user registration done`);
            req.flash('message', 'Log In succesfully')
            return res.redirect("/login/user")


        } else {
            return res.redirect("/create/user")
        }



    } catch (error) {
        console.log(error);

    }

}
// LogInUser
const UserLPost = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            console.log('email exist');
            res.redirect('/login/user')
        }
        const matched = await User.findOne({ email })
        if (!matched) {
            console.log('email not registered');
            res.redirect('/login/user')

        }
        if (matched.role == 'USER') {
        
            const mathpass = await comparepassword(password, matched.password)
            if (!mathpass) {
                console.log('password incurrect');
                res.redirect('/login/user')
            }
            const token = await jwt.sign({
                name: matched.name,
                email: matched.email,
                phone: matched.phone,
            }, process.env.JWT_SECRET, { expiresIn: "12h" })
            if (token) {
                res.cookie('userToken', token)
                res.redirect('/user/dashboard');
                // res.redirect('/user/service')
            }
        } else {
            res.redirect('/login/user')
        }



    } catch (error) {
        console.log(error)
    }

}
// 
const userAuthcheck = (req, res, next) => {
    if (req.user) {
        // console.log(req.admin);
        next();
    } else {
        //console.log('Err While Admin Auth');
        res.redirect('/login/user')
    }
}
// Service
const UserService = (req, res) => {
    res.render('user/service', {
        title: 'service page'
    })

}
// UserLOgOut
const UserLogout = (req, res) => {
    res.clearCookie("userToken")
    res.redirect('/login/user')
}


module.exports = {
    RegisterUser,
    Login_User,
    UserDashboard,
    CreateUser,
    UserLPost,
    userAuthcheck,
    UserService,
    UserLogout
}