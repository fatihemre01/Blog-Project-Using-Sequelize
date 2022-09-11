const Sequelize = require("sequelize")

module.exports = new Sequelize(
    "blog_db",
    "root",
    "123456",
    {
        host: "localhost",
        dialect: "mysql"
    }
)