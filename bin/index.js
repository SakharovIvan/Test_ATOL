import {Command} from "commander";
import makeBase from '../src/createSQLbase.js'
import findUser from '../src/finduser.js'
const program = new Command();

program
  .version("0.1.0")
  .description("Create your SQL base and find users.")
  .argument("<login>")
  .argument("<password>")
  .option("-d, --data <datafilepath>")
  .option("-u, --user <userfilepath>")
  .option("-f, --format <type>", "output format")
  .helpOption("-h, --help", "output usage information")
  .action((datafilepath, userfilepath)=>{
  console.log(makeBase(datafilepath,userfilepath))
  })
  .action((login,password)=>{
    console.log(findUser(login,password))
  });

program.parse();