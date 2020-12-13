import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as http from 'http';
import * as p from 'path'

const homedir = process.env.HOME || require('os').homedir();
const argsPath = p.resolve(homedir, '.serveur');

const dbData = JSON.parse(fs.readFileSync(argsPath).toString())
const {path,port,cacheControl} = dbData
const targetPath = p.join('..',path)

const serveur = http.createServer()

const mangeError = (response: ServerResponse,err) => {
  response.setHeader('content-type',`text/text;charset=uft-8`)
  response.write(`errno:${err.errno} \n code:${err.code} \n syscall:${err.syscall} \n path:${err.path}` )
  response.end()
}

const fetchPage = (request: IncomingMessage,response: ServerResponse) => {
  const filename = request.url.replace(/\//,'')
  const fileStyle = request.url.replace(/^.*\./,'')
  if (filename === "favicon.ico"){
    fs.readFile('./favicon/favicon.icon',(err,data)=>{
      response.end(data)
    })
    return
  }
  fs.readFile(p.resolve(targetPath,filename),(err,data)=>{
    if (err) return mangeError(response,err)
    response.setHeader('content-type',`text/${fileStyle};charset=uft-8`)
    response.setHeader('Cache-Control',`public,max-age=${cacheControl}`);
    response.end(data)
  })
}

serveur.on('request',(request: IncomingMessage,response: ServerResponse)=>{
  fetchPage(request,response)

})

serveur.listen(port)