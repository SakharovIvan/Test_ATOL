import pkg from 'pg';
const {Pool} = pkg;


const pool = new Pool({
  user: "root",
  host: "192.168.0.74",
  database: "ForTests",
  password: "root",
  port: "5432",
});


export default pool;