const { program } = require('commander');
const pkg = require('./package.json')
const db = require('./db.ts')
let path = 'public'
let port = '8888'
let cacheControl = '0'

program
  .version(pkg.version)
  // .option('-port, --chdir <path>', 'change the working directory')

// 不传参
if (process.argv.length === 2 ){
  //读取homedir/.serveur的参数
  db.read().then((content)=>{
    if (content === ''){
      let newContent = [path,port,cacheControl]
    }
  })
}



console.log(process.argv);



program.parse(process.argv);