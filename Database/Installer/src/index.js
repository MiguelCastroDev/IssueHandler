'use strict'

// instanciando los objetos app y BrowserWindow
const { app, BrowserWindow} = require('electron');
const devtools =  require('./tools/devtools');
const path = require('path');

//Si nos encontramos en entorno de desarrollo, cargamos las herramientas de desarrollo
if (process.env.NODE_ENV === 'development') {
    devtools()
}


// Evento de salida
app.on('before-quit', () => {
    
})

// Cuando la aplicación esta cargada
app.on('ready', () => {

    //Creamos y configuramos la ventana principal
    global.win = new BrowserWindow({
        width: 800,
        height: 220,
        title: 'Database software',
        center: true,
        maximizable: false,
        show: false,
        fullscreen: false,
        icon: path.join(__dirname, 'assets', 'icons', 'main-icon.png'),
        webPreferences: {
            nodeIntegration: true
        }
    })
    global.win.setMenuBarVisibility(false);

    //Mostramos la ventana cuando el contenido este listo
    global.win.once('ready-to-show', () => {
        global.win.show()
    })

    //Escuchamos el evento de movimiento de ventana
    global.win.on('move', () => {
    
    })

    //Detectamos el cierra de la aplicación
    global.win.on('closed', () => {
        app.quit()
    })

    //Carga de una url
    global.win.loadURL(`file://${__dirname}/views/main/main.html`);
})
