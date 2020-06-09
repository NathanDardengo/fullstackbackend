const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Configs
var corsOptions ={
    origin : 'http://localhost:3000',
    optionsSuccessStatus : 200

}

//O cors permite que seja configurado o acesso a nossa API
app.use(cors());
app.use(express.json());

//Database connection
//Sintaxe da conexão: passar o protocolo, a url, a porta padrão, e o database
mongoose.connect(process.env.MONGODB,{useNewUrlParser : true, useUnifiedTopology : true});

//Models
requireDir('./src/models');

//Websocket - middleware
//Passando uma callback dentro do use | O next serve pra pular um determinado procedimento
app.use((req,res,next) =>{
    req.io = io;
    next();
})

//Routes
app.use('/api',require('./src/routes'));

server.listen(process.env.PORT || 3002);
console.log('Server is listening on port 3002');
