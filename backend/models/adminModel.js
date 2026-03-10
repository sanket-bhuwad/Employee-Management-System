const { pool } = require('../config/db');

const findAdminByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT id, name, email, password, created_at
     FROM admins
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0] || null;
};

const createAdmin = async ({ name, email, passwordHash }) => {
  const [result] = await pool.query(
    `INSERT INTO admins (name, email, password)
     VALUES (?, ?, ?)`,
    [name, email, passwordHash]
  );

  const [rows] = await pool.query(
    `SELECT id, name, email, created_at
     FROM admins
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0];
};

module.exports = {
  findAdminByEmail,
  createAdmin
};