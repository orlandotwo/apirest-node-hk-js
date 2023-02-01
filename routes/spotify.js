const { Router } = require('express');
const { getAlbums } = require('../controllers/spotify');

const router = Router();

router.get('/albums',[
    //middleware
],getAlbums);

module.exports = router;