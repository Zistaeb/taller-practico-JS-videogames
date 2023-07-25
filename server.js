var express = require('express');
var fs = require('fs');
var https = require('https');

const app = express();

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('Hola estas en la pagina principal');  
    console.log('Se recibio una peticion get')
});

const port = 80;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});