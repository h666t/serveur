const fs = require('fs');
const p = require('path');
const homedir = process.env.HOME || require('os').homedir();
const argsPath = p.join(homedir, '.serveur');

const db = {
  read() {
    return new Promise((resolve, reject)=>{
      fs.readFile(argsPath, {flag: 'a+'}, (err, data) => {
        console.log('hi');
        if (err) return reject(err);
        let content = data.toString();
        content === '' ? resolve([]) : resolve(JSON.parse(content))
      });
    })
  },
  write(data){
    const dataStr = JSON.stringify(data)
    return new Promise((resolve, reject)=>{
      fs.writeFile(argsPath, dataStr, (error) => {
        reject(error)
      })
    })
  }

};

module.exports = db;