const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const hashpassword=async(password)=>{
    const saltpassword=10
    const hashpassword=await bcrypt.hash(password,saltpassword)
    return hashpassword
}
const comparepassword=async(password,saltpassword)=>{
    try{
        return await bcrypt.compare(password,saltpassword)

    }catch(error){
        console.log(error)
    }
}
// 
const jwtUserAuth = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, process.env.JWT_SECRET, (err, data) => {
            req.user = data
            next()
        })
       // console.log('ll',req.user);
    } else {

        console.log('can`t access this page please login first');
        next()
    }
}
// 
const jwtAdminAuth = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, process.env.JWT_SECRET, (err, data) => {
            req.admin = data
            next()
        })
       // console.log('ll',req.user);
    } else {

        console.log('can`t access this page please login first');
        next()
    }
}

module.exports={
    hashpassword,
    comparepassword,
    jwtUserAuth,
    jwtAdminAuth
}