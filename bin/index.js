#!/usr/bin/env node
import { Command } from "commander";
import findUser from "../src/finduser.js";

const program = new Command();

program
  .version("0.1.0")
  .description("Find clients by login and password and change status.")
  .argument("<login>")
  .argument("<password>")
  .argument("[AccountingNumber]", "AccountingNumber", 0)
  .argument("[Status]", "Status", "")
  .helpOption("-h, --help", "output usage information")

  .action(async (login, password, AccountingNumber, Status) => {
    try {
      const mas = await findUser(login, password, AccountingNumber, Status);
      for(let el of mas){
        console.log(el.accountingnumber, "|",el.surname," ".repeat(10-el.surname.length),"|",el.name," ".repeat(10-el.name.length),"|", el.secondname," ".repeat(15-el.secondname.length),"|",el.dateofbirth,"|",el.inn,"|",el.userfio,"|",el.status,"|",)
      }
    } catch (err) {
      console.log(err);
    }
  });

program.parse();


