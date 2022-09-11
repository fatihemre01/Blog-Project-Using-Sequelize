const db = require("../config/db_connecion")
const sequelize = require("sequelize")

const Blog = db.define("blog", {
    title: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize.DataTypes.TEXT('long'),
        allowNull: false
    },
    sharedBy: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    userEmail: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false
});

Blog.sync()
.then(() => console.log("blogs table created"))
.catch((err) => console.log("blogs table not created!!"))

module.exports = Blog