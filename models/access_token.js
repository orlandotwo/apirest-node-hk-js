const { Sequelize } = require("sequelize");
const { sequelize } = require("../database/config");

const Access_Token = sequelize.define("access_token",{
    name: { type: Sequelize.STRING },
    token: { type: Sequelize.STRING },
    recorded_date: {type: Sequelize.DATE},
    expiration_time: {type: Sequelize.INTEGER},
    limit_time: {type: Sequelize.FLOAT},
},{
    timestamps: false,
    freezeTableName: true
});
Access_Token.removeAttribute('id');

module.exports = Access_Token