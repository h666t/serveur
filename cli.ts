const {program} = require('commander');
const pkg = require('./package.json');
const db = require('./db.ts');

const {exec} = require("child_process");
//通过exec可以执行命令行命令
program
  .version(pkg.version)
  .option('-p, --port <port>', 'change the port (default:8888)')

// 不传参
if (process.argv.length === 2) {
  exec('tsnd serveur.ts')
}

//传4个参数 即类似于['D:\\Software\\nodejs\\node.exe', 'D:\\code\\p\\Item\\serveur\\cli.ts','-p','8888']
if (process.argv.length === 4){
    const opt = process.argv
  if (opt[2] === '-p'){
    db.read().then((content)=>{

    })
  }
}


program.parse(process.argv);

