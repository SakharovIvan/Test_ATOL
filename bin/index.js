#!/usr/bin/env node
import { Command } from "commander";
import findUser from "../src/finduser.js";

const program = new Command();

program
  .version("0.1.0")
  .description("Find clients by login and password and change status.")
  .argument("[login]")
  .argument("[password]")
  .argument("[AccountingNumber]", "AccountingNumber", 0)
  .argument("[Status]", "Status", "")
  .helpOption("-h, --help", "output usage information")
  .action(async (login, password, AccountingNumber, Status) => {
    try {
      console.log(await findUser(login, password, AccountingNumber, Status));
    } catch (err) {
      console.log(err);
    }
  });

program.parse();
