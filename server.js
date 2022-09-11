require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const authRoute = require("./routes/authRoute")
const blogRoute = require("./routes/blogRoute")
const {checkUser} = require("./middlewares/authMiddle")

const port = process.env.PORT

const app = express()

app.set("search-engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//db Connection
const db = require("./config/db_connecion")

db.authenticate()
.then(() => console.log("Connected"))
.catch((err) => console.log(err))
//

app.get("*", checkUser)
app.get("/", (req, res) => res.render("home.ejs"))

app.use(authRoute)
app.use(blogRoute)

app.listen(port, console.log("running on", port))