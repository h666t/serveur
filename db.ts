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
  },
  complete(){
    return new Promise((resolve, reject)=>{
      const hash = {
        path:"public",
        port:"8888",
        cacheControl:"0"
      }

      //读取homedir/.serveur的参数
      this.read().then(function (content) {
        const newContent = JSON.parse(JSON.parse(content))
        for (let key in hash){
            if (!content[key]){

            }
        }


        if (!content.path && !content.port && !content.cacheControl) {
          //写入默认的参数{path:"public",port:"8888",cacheControl:"0"}
          db.write({path,port,cacheControl})
            .catch(err => err ? console.log(err) : undefined);
          resolve()
          return;
        }
        throw new Error('请传入正确的参数 [path,port,cacheControl]');
      });
    })

  }

};

module.exports = db;