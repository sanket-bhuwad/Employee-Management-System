const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const MAX_SALARY = 99999999.99;

const normalizeEmployeeBody = (req, res, next) => {
  const payload = {
    name: String(req.body.name || '').trim(),
    email: String(req.body.email || '').trim().toLowerCase(),
    department: String(req.body.department || '').trim(),
    salary: Number(req.body.salary),
    joining_date: String(req.body.joining_date || '').trim()
  };

  req.body = payload;
  next();
};

const validateEmployeeBody = (req, res, next) => {
  const { name, email, department, salary, joining_date } = req.body;

  if (!name || !email || !department || !joining_date) {
    return res.status(400).json({ message: 'name, email, department and joining_date are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!Number.isFinite(salary) || salary < 0) {
    return res.status(400).json({ message: 'Salary must be a positive number' });
  }

  if (salary > MAX_SALARY) {
    return res.status(400).json({ message: `Salary must be less than or equal to ${MAX_SALARY}` });
  }

  if (!dateRegex.test(joining_date)) {
    return res.status(400).json({ message: 'joining_date must be in YYYY-MM-DD format' });
  }

  const parsedDate = new Date(joining_date);
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: 'Invalid joining_date' });
  }

  return next();
};

const validateEmployeeIdParam = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'Employee id must be a positive integer' });
  }

  req.params.id = id;
  return next();
};

module.exports = {
  normalizeEmployeeBody,
  validateEmployeeBody,
  validateEmployeeIdParam
};
