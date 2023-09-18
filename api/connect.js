import mysql from "mysql";

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Acle2567",
  database:"paywave"
})