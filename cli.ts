const {program} = require('commander');
const pkg = require('./package.json');
const db = require('./db.ts');
let path = 'public';
let port = '8888';
let cacheControl = '0';

program
  .version(pkg.version);
// .option('-port, --chdir <path>', 'change the working directory')

// 不传参
if (process.argv.length === 2) {
  //读取homedir/.serveur的参数
  db.read().then(function (content) {
    if (content.length === 0) {
      db.write([path, port, cacheControl])
        .catch(() => {});
      return;
    }
    if (content.length === 3) {

    }
    throw new Error('请传入正确的参数 [path,prot,cacheControl]');
  });

}

program.parse(process.argv);

