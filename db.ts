const fs = require('fs');
const p = require('path');
const homedir = process.env.HOME || require('os').homedir();
const argsPath = p.join(homedir, '.serveur');

const db = {
  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(argsPath, {flag: 'a+'}, (err, data) => {
        if (err) return reject(err);
        let content = data.toString();
        content === '' ? resolve({}) : resolve(JSON.parse(content));
      });
    });
  },
  write(data) {
    const dataStr = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      fs.writeFile(argsPath, dataStr, (error) => {
        reject(error);
      });
    });
  },
  autoCompleteDb() {
    const hash = {
      path: 'public',
      port: '8888',
      cacheControl: '0'
    };
    //读取homedir/.serveur的参数
    this.read().then(function (content) {
      const newContent = JSON.parse(JSON.stringify(content));
      for (let key in hash) {
        if (!content[key]) {
          newContent[key] = hash[key];
          this.write(newContent)
            .catch(err => err ? console.log(err) : undefined);
        }
      }
      if (!content.path && !content.port && !content.cacheControl) {
        //写入默认的参数{path:"public",port:"8888",cacheControl:"0"}
        this.write({path: hash.path, port: hash.port, cacheControl: hash.cacheControl})
          .catch(err => err ? console.log(err) : undefined);
        return;
      }
    });
  },
  settingSingleDbContent(arg, data) {
    const hash = {
      '-p': 'port',
      '-o': 'path',
      '-c': 'cacheControl'
    };
    for (let key in hash) {
      if (key === arg) {
        if (arg === key) {
          this.read().then((content) => {
            const newContent = JSON.parse(JSON.stringify(content));
            newContent[hash[key]] = data;
            this.write(newContent)
              .catch(err => err ? console.log(err) : undefined);
          });
        }
      }
    }
  }
};

export default db;