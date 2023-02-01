const { getAlbum } = require("./spotify-api-queries");

const getCurrentDate = () => {
    const date  = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toTimeString();
    const currentNumberDate = Date.now()/1000;

    const resp = {
        date,
        currentDate,
        currentTime,
        currentNumberDate
    }
    //console.log(resp)
    return resp;
}
const addPopularityInListAlbum = async(access_token,listAlbum) => {
    for(let i =0; i < listAlbum.length; i++){     
        try {
            const respGetAlbum = await getAlbum(access_token,listAlbum[i].id);
            //console.log(respGetAlbum.data.id,' - ',respGetAlbum.data.popularity);
            listAlbum[i].popularity = respGetAlbum.data.popularity;
        } catch (error) {
            listAlbum[i].popularity = 0;
        }
    }
    return listAlbum
}

module.exports = {
    getCurrentDate,
    addPopularityInListAlbum
}