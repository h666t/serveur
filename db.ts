const fs = require('fs');
const p = require('path');
const homedir = process.env.HOME || require('os').homedir();
const argsPath = p.join(homedir, '.serveur');

const db = {
  read() {
    return new Promise((resolve, reject)=>{
      fs.readFile(argsPath, {flag: 'a+'}, (err, data) => {
        if (err) return reject(err);
        let content = data.toString();
        resolve(content);
      });
    })
  },
  write(data){
    return new Promise((resolve, reject)=>{
      fs.writeFile(argsPath, data, (error) => {
        reject(error)
      })
    })
  }

};

module.exports = db;