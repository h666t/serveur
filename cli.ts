const {program} = require('commander');
const pkg = require('./package.json');
const db = require('./db.ts');
let path = 'public';
let port = '8888';
let cacheControl = '0';
const {exec} = require("child_process");
//通过exec可以执行命令行命令
program
  .version(pkg.version)
  .option('-p, --port <port>', 'change the port (default:8888)')

// 不传参
if (process.argv.length === 2) {
  //读取homedir/.serveur的参数
  db.read().then(function (content) {
    if (!content.path && !content.port && !content.cacheControl) {
      db.write({path,port,cacheControl})
        .catch(err => err ? console.log(err) : undefined);
      exec('tsnd serveur.ts')
      return;
    }
    throw new Error('请传入正确的参数 [path,prot,cacheControl]');
  });
}

//传4个参数 即类似于['D:\\Software\\nodejs\\node.exe', 'D:\\code\\p\\Item\\serveur\\cli.ts','-p','8888']
if (process.argv.length === 4){

}


program.parse(process.argv);

