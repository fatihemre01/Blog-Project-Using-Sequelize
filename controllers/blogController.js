const jwt = require("jsonwebtoken")
const Blog = require("../models/Blog")
const User = require("../models/User")


module.exports.get_shareblog = (req, res) => {
    res.render("share-blog.ejs")
}


module.exports.post_shareblog = async (req, res) => {
    try {
        const token = req.cookies.jwt
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decoded) => {
            if(err) return console.log("Invalid token")
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            const blog = await Blog.create({
                title: req.body.title,
                content: req.body.content,
                sharedBy: user.username,
                userEmail: user.email
            })
            res.redirect("/all-blogs")
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.get_allblogs = async (req, res) => {
    const blogs = await Blog.findAll()
    res.render("all-blogs.ejs", {blogs})
}

module.exports.get_readblog = async (req, res) => {
    const blog = await Blog.findOne({
        where: {
            id: req.params.id
        }
    })
    res.render("read-blog.ejs", {blog})
}

module.exports.get_yourblogs = async (req, res) => {
    try {
        const token = req.cookies.jwt
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decoded) => {
            if(err) return console.log("Invalid token")
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            const blogs = await Blog.findAll({
                where: {
                    userEmail: user.email
                }
            })
            
            res.render("your-blogs.ejs", {blogs})
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.get_editblog = async (req, res) => {
    const blog = await Blog.findOne({
        where:{
            id: req.params.id
        }
    })
    res.render("edit-blog.ejs", {blog})
}

module.exports.post_editblog = async (req, res) => {
    Blog.update(
        {title: req.body.title, content: req.body.content},
        {where: {id: req.params.id}}
    )
    res.redirect("/your-blogs")
}

module.exports.deleteblog = async (req, res) => {
    await Blog.destroy({
        where: {id: req.params.id}
    })
    res.redirect("/your-blogs")
}