import {
  createDataTable,
  createUserTable,
  deleteDataTable,
  deleteUserTable,
} from "../__fixtures__/SQL.js";
import pool from "../bin/bd.js";
import fs from "fs";

const RE_EOL = /\r?\n/;
const TAB = /\t/;

const makeDataSQL = ([
  AccountingNumber,
  Surname,
  Name,
  SecondName,
  DateOfBirth,
  INN,
  USERFIO,
  Status,
]) => {
  return `INSERT INTO Data (AccountingNumber,Surname,Name,SecondName,DateOfBirth,INN,USERFIO,Status) 
VALUES (${AccountingNumber},'${Surname}','${Name}','${SecondName}','${DateOfBirth}',${INN},'${USERFIO}','${Status}');`;
};

const makeUserSQL = ([USERFIO, Login, Password]) => {
  return `INSERT INTO Data (USERFIO,Login,Password) 
    VALUES ('${USERFIO}','${Login}','${Password}');`;
};

const makeBase = async (datafilepath, userfilepath) => {
  try {
    await pool.connect();
    await pool.query(deleteDataTable);
    await pool.query(createDataTable);
    await pool.query(deleteUserTable);
    await pool.query(createUserTable);
  } catch (err) {
    console.log(err);
  }

  try {
    const fileData = await fs.readFile(datafilepath, "utf-8");
    const masData = await fileData.split(RE_EOL);

    const fileUser = await fs.readFile(userfilepath, "utf-8");
    const masUser = await fileUser.split(RE_EOL);
    for (let dataLine of masData) {
      const dataLineBroke = await dataLine.split(TAB);
      await pool.query(makeDataSQL(dataLineBroke));
    }
    for (let userLine of masUser) {
      const userLineBroke = await userLine.split(TAB);
      await pool.query(makeUserSQL(userLineBroke));
    }
  } catch (err) {
    console.log(err);
  } finally {
    pool.end();
  }
};

export default makeBase;
