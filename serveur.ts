import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as http from 'http';
import * as p from 'path'
import {type} from 'os';

const homedir = process.env.HOME || require('os').homedir();
const argsPath = p.join(homedir, '.serveur');

const dbData = JSON.parse(fs.readFileSync(argsPath).toString())
const {path,port,cacheControl} = dbData
const targetPath = p.join(__dirname,path)

const serveur = http.createServer()

const fetchPage = (request,response) => {
  const filename = request.url.replace(/\//,'')
  const fileStyle = request.url.replace(/^.*\./,'')
  fs.readFile(p.join(targetPath,filename),(err,data)=>{
    response.setHeader('content-type',`text/${fileStyle};charset=uft-8`)
    response.setHeader('Cache-Control',`public,max-age=${cacheControl}`);
    response.end(data)
  })
}

serveur.on('request',(request: IncomingMessage,response: ServerResponse)=>{
  fetchPage(request,response)

})

serveur.listen(port)