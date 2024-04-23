// db.js
const { Pool } = require('pg');
const pool = new Pool({
  user: 'brayan',
  host: 'localhost',
  database: 'tienda',
  password: '123456',
  port: 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};