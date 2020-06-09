const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const server = express();

//Configs
server.use(cors());
server.use(express.json());

//Database connection
//Sintaxe da conexão: passar o protocolo, a url, a porta padrão, e o database
mongoose.connect('mongodb+srv://admin:admin@cluster0-jrrv6.mongodb.net/integraGit?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology : true});

//Models
requireDir('./src/models');

//Routes
server.use('/api',require('./src/routes'));

server.listen(3002);
console.log('Server is listening on port 3002');
