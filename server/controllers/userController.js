const User = require("../models/userModel");

module.exports.register = async (req, res, next) =>{
    try{
        const {username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck){
            return res.json({ msg: "Username already used", status: false });
         }

         const emailCheck = await User.findOne({ email }); 
         if (emailCheck){
            return res.json({ msg: "Email already used", status: false });
        }
        const user = await User.create({
            email,
            username,
            password: password,
          });
        return res.json({ status: true, user });
    }catch(msg){
        next(msg);
    }
}
module.exports.login = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        if (!user){
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        const pass = await User.findOne({ password });
        if (!pass){
            return res.json({ msg: "Incorrect Username or Password", status: false });
            delete user.password;
        }
            return res.json({ status: true, user});
        }catch(msg){
        next(msg);
    }
}