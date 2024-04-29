// db.js
const { Pool } = require('pg');
const pool = new Pool({
  user: 'brayan',
  host: 'localhost',
  database: 'tienda',
  password: '123456',
  port: 3306,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};