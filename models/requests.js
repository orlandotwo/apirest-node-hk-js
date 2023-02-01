const { Sequelize } = require("sequelize");
const { sequelize } = require("../database/config");

const Requests = sequelize.define("requests",{
    //name: { type: Sequelize.STRING },
    ip: { type: Sequelize.STRING },
    date: {type: Sequelize.DATE},
    artist_name: {type: Sequelize.STRING},
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Requests