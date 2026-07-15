const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcryptjs = require("bcryptjs")
const dotenv = require("dotenv")
const User = require("../models/userModel")
dotenv.config();

const SignUp = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (await User.findOne({ userName })) {
            return res.status(401).json({ message: "Username already exists" })
        }
        if (! await validator.isEmail(email)) {
            return res.status(401).json({ message: "Email not valid" })
        }
        if (await User.findOne({ email })) {
            return res.status(401).json({ message: "Email already exists" });

        }
        if (! await validator.isStrongPassword(password)) {
            return res.status(401).json({ message: "Password not valid" })
        }
        password = await bcryptjs.hash(password, 10);
        const user = await User.create({ userName, email, password })

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        });
        return res.status(200).json(user)


    }
    catch (err) {
        return res.status(401).json({ message: "SignUp Unsuccessfull" + err })
    }

}
const SignIn = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (! await validator.isEmail(email)) {
            return res.status(401).json({ message: "Email not valid" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });

        }

        let isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }



        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        });
        return res.status(200).json(user)


    }
    catch (err) {
        return res.status(401).json({ message: "Login Unsuccessfull" + err })
    }
}
const LogOut = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout Successfull" })
    }
    catch(err){
        return res.status(401).json({ message: "Logout Unsuccessfull" + err })
    }
}
module.exports = { SignUp, SignIn, LogOut };