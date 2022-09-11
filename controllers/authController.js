const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

function createToken(email) {
    return jwt.sign({email}, process.env.TOKEN_SECRET)
}

module.exports.get_signup = (req, res) => {
    res.render("signup.ejs")
}

module.exports.get_login = (req, res) => {
    res.render("login.ejs")
}

module.exports.post_signup = async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        const token = createToken(user.email)
        res.cookie("jwt", token)
        res.redirect("/")
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}

module.exports.post_login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(user) {
            const validate = await bcrypt.compare(req.body.password, user.password)
            if(validate) {
                const token = createToken(user.email)
                res.cookie("jwt", token)
                res.redirect("/")
            } else{
                res.json("Password is wrong!")
            }
        } else{
            res.json("Email is wrong!")
        }

    } catch (error) {
        res.json(error)
        console.log(error)
    }
}

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/")
}