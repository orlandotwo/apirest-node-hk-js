const Access_Token = require('../models/access_token');
const Requests = require('../models/requests');

//Obtengo Token
const getDbToken = async() => {
    try {
        const dbtoken = await Access_Token.findAll();
        if(Object.entries(dbtoken).length == 0)
            return null;
        else
            return dbtoken[0]['dataValues'];
        
    } catch (error) {
        console.log(error);
        return null;
    }
}
//Guardo Token
const setDbToken = async(name="",access_token = "", recorded_date = "", expiration_time = 0 , limit_time = 0.0) => {
    //console.log(name,access_token, recorded_date, expiration_time, limit_time);
    try {
        const resp = await Access_Token.create({name, token: access_token, recorded_date,expiration_time, limit_time});
        //console.log(resp);
        return true;
    } catch (error) {
        //console.log(error);
        throw error;
    }
}
//Actualizo Token
const updateDbToken = async(access_token = "", recorded_date = "", limit_time = 0.0) => {
    //console.log(access_token, recorded_date, limit_time);
    try {
        const resp = await Access_Token.update({
            token: access_token, 
            recorded_date: recorded_date, 
            limit_time: limit_time
        },{
            where: {name:"token_spotify"}
        });
        //console.log(resp);
        return true;
    } catch (error) {
        //console.log(error);
        throw error;
    }
}
const saveRequestData = async(ip = "", date = "", artistName = "") => {
    try {
        const requestSave = Requests.build({
            ip: ip, 
            date: date,
            artist_name: artistName
        });

        await requestSave.save();
        //console.log(resp);
        return true;
    } catch (error) {
        //console.log(error);
        throw error;
    }
}

module.exports = {
    getDbToken,
    setDbToken,
    updateDbToken,
    saveRequestData
}