const db = require("../config/db_connecion")
const sequelize = require("sequelize")

const User = db.define("user", {
    username: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false
});

User.sync()
.then(() => console.log("Users table created"))
.catch((err) => console.log("Users table not created!!"))

module.exports = User