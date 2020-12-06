import * as http from 'http';

const serveur = http.createServer()

serveur.on('request',()=>{
  console.log('hello world');
})

serveur.listen('8888')