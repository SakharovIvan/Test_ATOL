import pool from "../bin/bd.js";

const findUser = async (login, password, AccountingNumber = 0, Status = "") => {
  if (AccountingNumber === 0) {
    try {
      await pool.connect();
      const user = await pool.query(
        `SELECT USERFIO FROM users WHERE login ='${login}' AND password = '${password}'`
      );
      const result = await pool.query(
        `SELECT * FROM data WHERE USERFIO = '${user.rows[0].userfio}';`
      );
      pool.end();
      return result.rows;
    } catch (err) {
      //console.log(err)
      pool.end();
      return "Wrong Login or Password";
    }
  } else {
    const masStatus = ["Не_в_работе", "В_работе", "Отказ", "Сделка_закрыта"];
    if (!masStatus.includes(Status)) {
      return "Не корректный статус, возможны статусы: «Не_в_работе», «В_работе», «Отказ», «Сделка_закрыта»";
    }
    try {
      await pool.connect();
      const user = await pool.query(
        `SELECT USERFIO FROM users WHERE login ='${login}' AND password = '${password}';`
      );
      await pool.query(
        `UPDATE data SET Status = '${Status}' WHERE AccountingNumber=${AccountingNumber};`
      );
      const result = await pool.query(
        `SELECT * FROM data WHERE USERFIO = '${user.rows[0].userfio}' AND AccountingNumber=${AccountingNumber};`
      );
      pool.end();
      return result.rows;
    } catch (err) {
      //console.log(err)
      pool.end();
      return "Wrong Login or Password";
    }
  }
};

export default findUser;
