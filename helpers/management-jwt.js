const axios = require('axios');

const generateToken = async() =>{
    const clientId = process.env.CLIENTID;
    const clientSecret = process.env.CLIENTSECRET;
    
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        data: undefined,
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        },
        params: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    
    try {
        const resp = await axios(authOptions)
        return resp;
    } catch (error) {
        throw error
    }
}

module.exports = {
    generateToken
}