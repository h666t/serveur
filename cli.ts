import db from './db';
import {log} from 'util';

const {program} = require('commander');
const pkg = require('./package.json');
const {exec} = require("child_process");
//通过exec可以执行命令行命令
program
  .version(pkg.version)
  .option('-p, --port <port>', 'change the port (default:8888)')
  .option('-o, --path <path>', 'change the path (default:public)')
  .option('-c, --path <cacheControl>', 'change the cacheControl (default:0)')

// 不传参
if (process.argv.length === 2) {
  db.autoCompleteDb()
  exec('ts-node-dev serveur.ts')
}

//传4个参数 即类似于['D:\\Software\\nodejs\\node.exe', 'D:\\code\\p\\Item\\serveur\\cli.ts','-p','8888']
if (process.argv.length === 4){
    const arg = process.argv[2]
    const data = process.argv[3]
    db.settingSingleDbContent(arg,data)
}

if (process.argv.length === 3 || process.argv.length > 4){
  throw new Error('请输入正确的参数')
}


program.parse(process.argv);

