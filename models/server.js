const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.app.set('trust proxy', true);
        this.port = process.env.PORT;
        this.usuariosPath = '/apirest';
        //Conectar a Base de Datos
        this.conectarDB();
        //Middleware - funcionalidades
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //Lectura y parseo del codigo
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use( this.usuariosPath, require('../routes/spotify'));
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Server running in port -> ', this.port);
        });
    }
}

module.exports = Server;