const { pool } = require('../config/db');

const parsePagination = (page, limit) => {
  const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
  const parsedLimit = Math.max(parseInt(limit, 10) || 10, 1);

  return {
    page: parsedPage,
    limit: parsedLimit,
    offset: (parsedPage - 1) * parsedLimit
  };
};

const getAllEmployees = async ({ search, page, limit }) => {
  const { page: currentPage, limit: pageSize, offset } = parsePagination(page, limit);
  const searchTerm = search ? `%${search}%` : null;

  const whereClause = searchTerm
    ? 'WHERE name LIKE ? OR email LIKE ? OR department LIKE ?'
    : '';

  const params = searchTerm ? [searchTerm, searchTerm, searchTerm] : [];

  const [rows] = await pool.query(
    `SELECT id, name, email, department, salary, joining_date, created_at
     FROM employees
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );

  const [countResult] = await pool.query(
    `SELECT COUNT(*) AS total FROM employees ${whereClause}`,
    params
  );

  const total = countResult[0]?.total || 0;

  return {
    data: rows,
    pagination: {
      page: currentPage,
      limit: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  };
};

const getEmployeeById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, email, department, salary, joining_date, created_at
     FROM employees
     WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
};

const createEmployee = async (employeeData) => {
  const { name, email, department, salary, joining_date } = employeeData;

  const [result] = await pool.query(
    `INSERT INTO employees (name, email, department, salary, joining_date)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, department, salary, joining_date]
  );

  return getEmployeeById(result.insertId);
};

const updateEmployee = async (id, employeeData) => {
  const { name, email, department, salary, joining_date } = employeeData;

  const [result] = await pool.query(
    `UPDATE employees
     SET name = ?, email = ?, department = ?, salary = ?, joining_date = ?
     WHERE id = ?`,
    [name, email, department, salary, joining_date, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getEmployeeById(id);
};

const deleteEmployee = async (id) => {
  const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

const getEmployeeStats = async () => {
  const [rows] = await pool.query(
    `SELECT
      COUNT(*) AS totalEmployees,
      COALESCE(SUM(salary), 0) AS totalSalary,
      COALESCE(AVG(salary), 0) AS averageSalary,
      COUNT(DISTINCT department) AS totalDepartments
     FROM employees`
  );

  return rows[0];
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
};
