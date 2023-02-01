const { response, request } = require('express');
const { generateToken } = require('../helpers/management-jwt');
const { getDbToken, setDbToken, updateDbToken, saveRequestData } = require('../database/queties-db');
const { getCurrentDate } = require('../helpers/tools');
const { artist, artistAlbums } = require('../helpers/spotify-api-queries');

const getAlbums = async(req = request, res = response) => {
  const { artistName = ' '} = req.query;
  let access_token = "";
  try {
    //controlo si existe access_token en base de datos
    const dbToken = await getDbToken();
    //console.log(dbToken);
    if(dbToken !== null){
      //si existe controlo que no haya expirado
      access_token = dbToken['token']
      const {currentNumberDate} = getCurrentDate();

      if(currentNumberDate > dbToken['limit_time']){
        // si expiro refresco el access_token
        //console.log('expiro',(currentNumberDate - dbToken['limit_time']) );
        const resp = await generateToken();
        if(resp.status === 200){
          //console.log('todo bien');
          const {date, currentNumberDate} = getCurrentDate();
          access_token = resp.data.access_token; 
          const limit_time = (currentNumberDate + resp.data.expires_in);        
          //console.log(access_token,' - ',date,' - ', limit_time)

          //actualizar token en base
          await updateDbToken( access_token,date,limit_time);
        }
      }
    }else{
      //si no existe solicito token a spotify
      //console.log('sin token');
      const resp = await generateToken();
      //console.log(resp);
      if(resp.status === 200){
        //console.log('todo bien');
        //console.log(resp.data.access_token);
        const {date, currentNumberDate} = getCurrentDate();
        access_token = resp.data.access_token; 
        const recorded_date =  date;
        const expiration_time = resp.data.expires_in;
        const limit_time = (currentNumberDate + resp.data.expires_in)
        
        //console.log(access_token,recorded_date,expiration_time);
        //Date.now() / 1000
        await setDbToken('token_spotify',access_token,recorded_date,expiration_time,limit_time);
      }
    }
  
    //console.log('Token ->',access_token);
    // utilizo token para buscar albumes con el artista enviado
    //consulto artista
    //console.log('Artista a buscar:', artistName);
    const queryArtist = await artist(access_token, artistName);
    //console.log(queryArtist);
    //consulto albumes de artistas
    const queryArtistAlbums = await artistAlbums(access_token, queryArtist.id);
    //console.log('-------------------------------------')
    //console.log(queryArtistAlbums.data.items[3]);
    //const auxQAA = await queryArtistAlbums.data.items.sort((a, b) => b.popularity - a.popularity);
    //console.log('-------------------------------------');
    
    const userIp = req.connection.remoteAddress;
    const {date} = getCurrentDate();
    const auxArtistName = queryArtist.name;
    //console.log(auxArtistName)
    //console.log(userIp,' - ',date,' - ',auxArtistName);

    await saveRequestData(userIp,date,auxArtistName);

    res.json({
        artist: queryArtist,
        albums: queryArtistAlbums.data.items 
    })
  } catch (error) {
    res.status(400).json({
      msg: 'No se encontro Artista'
    })
  }
}

module.exports = {
  getAlbums
}