import {
  createDataTable,
  createUserTable,
  deleteDataTable,
  deleteUserTable,
} from "../__fixtures__/SQL.js";
import pool from "../bin/bd.js";
import fs from "file-system";
import util from "util";

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
  return `INSERT INTO Users (USERFIO,Login,Password) 
    VALUES ('${USERFIO}','${Login}','${Password}');`;
};

const readFile = util.promisify(fs.readFile);

const makeBase = async (datafilepath, userfilepath) => {
  try {
    await pool.connect();

    try {
      await pool.query(deleteDataTable);
      await pool.query(deleteUserTable);
    } catch (err) {
      console.log(err);
    }

    await pool.query(createDataTable);
    await pool.query(createUserTable);
    console.log("Table created");
  } catch (err) {
    console.log(err);
  }

  try {
    const fileData = await readFile(datafilepath, "utf-8");
    const masData = await fileData.split(RE_EOL);

    const fileUser = await readFile(userfilepath, "utf-8");
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
    console.log("Table data added");
  }
};

export default makeBase;
