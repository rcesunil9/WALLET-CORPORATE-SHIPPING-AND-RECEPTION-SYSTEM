const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const { socketController } = require('../sockets.wapi/cont.socket.wapi');
//const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        //this.usuariosPath = '/api/usuarios';
        //this.authPath = '/api/auth';


        // Conectar a base de datos
        // this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    /*   async conectarDB() {
          await dbConnection();
      } */


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(fileUpload({
            debug: true
        }));


        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        //this.app.use(this.authPath, require('../routes/auth'));
        //this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    // Conexion socket
    sockets() {

        //  El controlador esta en la carpeta sockets   js
        this.io.on('connection', socketController);
        //this.io.on('connection', );


    }


    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;