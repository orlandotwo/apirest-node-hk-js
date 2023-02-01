const axios = require('axios');

const artist = async(access_token,artist = '') => {
    try {
        const authOptions = {
            url: 'https://api.spotify.com/v1/search',
            data: undefined,
            method: 'GET', 
            headers: {
                'Content-Type': 'Content-Type: application/json',
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                type: 'artist',
                q: artist
            },
            json: true
        };

        let resp = await axios(authOptions);

        return resp.data.artists.items[0];
    } catch (error) {
        console.log(error)
        throw error;
    }
}
const artistAlbums = async(access_token,idArtist = '') => {
    try {
        const authOptions = {
            url: `https://api.spotify.com/v1/artists/${idArtist}/albums`,
            data: undefined,
            method: 'GET', 
            headers: {
                'Content-Type': 'Content-Type: application/json',
                'Authorization': `Bearer ${access_token}`
            }
        };
        let resp = await axios(authOptions);

        return resp;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    artist,
    artistAlbums
}