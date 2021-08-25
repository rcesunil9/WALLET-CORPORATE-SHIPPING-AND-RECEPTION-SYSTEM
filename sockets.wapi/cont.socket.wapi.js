const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode');

// Mis importaciones
const { apiController } = require("../APIW/controllerAPI");
const { usuarioInicioController } = require('../controllers/usuarios.controller');


// Abrir y guardar sesion whatsapp

const SESSION_FILE_PATH = "./whatsapp-session.json";

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    try {
        sessionCfg = require("../whatsapp-session.json");
    } catch (error) {
        sessionCfg = require(SESSION_FILE_PATH);
    }
    //sessionCfg = require(SESSION_FILE_PATH);
    //console.log(sessionCfg);
}

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ],
    },
    session: sessionCfg
});


client.on('message', usuarioInicioController);

//console.log(client);






client.initialize();


// Socket IO
//const socket = io();
// Mensajes de Sockets
const socketController = (socket) => {
    socket.emit('message', 'Conectando...');
    //console.log(client);
    client.on('qr', (qr) => {
        console.log('QR RECIBIDO', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'Codigo QR recibido, escanea por favor!');
        });
    });

    client.on('listo', () => {
        socket.emit('listo', 'Whatsapp esta listo!');
        socket.emit('message', 'Whatsapp esta listo!');
    });

    client.on('authenticated', (session) => {
        socket.emit('authenticated', 'Whatsapp se ha iniciado sesion!');
        socket.emit('message', 'Whatsapp ha iniciado sesion!');
        console.log('AUTHENTICATED', session);
        sessionCfg = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
            if (err) {
                console.error(err);
            }
        });
    });

    client.on('auth_failure', function(session) {
        socket.emit('message', 'Inicio de sesion fallida, reiniciando...');
    });

    client.on('disconnected', (reason) => {
        socket.emit('message', 'Whatsapp esta desconectado!');
        fs.unlinkSync(SESSION_FILE_PATH, function(err) {
            if (err) return console.log(err);
            console.log('El archivo de sesion esta borrada!');
        });
        client.destroy();
        client.initialize();
    });

}

module.exports = {
    socketController
}