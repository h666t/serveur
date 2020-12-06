import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';

const serveur = http.createServer()

serveur.on('request',(request:IncomingMessage,response:ServerResponse)=>{
  console.log('hello world');
  response.end('hi')
})

serveur.listen('8888')