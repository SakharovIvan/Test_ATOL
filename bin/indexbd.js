#!/usr/bin/env node
import { Command } from "commander";
import makeBase from "../src/createSQLbase.js";


const program = new Command();

program
  .version("0.1.0")
  .description("Create your SQL base.")
  .option("-d, --data <datafilepath>", "Upload your data file")
  .option("-u, --user <userfilepath>", "Upload your users file")
  .helpOption("-h, --help", "output usage information")
  .action(async (datafilepath, userfilepath) => {
    try {
      await makeBase(datafilepath.data, datafilepath.user);
    } catch (err) {
      console.log(err);
    }
  });

program.parse();