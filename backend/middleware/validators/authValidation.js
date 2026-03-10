const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeLoginBody = (req, res, next) => {
  req.body = {
    email: String(req.body.email || '').trim().toLowerCase(),
    password: String(req.body.password || '')
  };

  next();
};

const validateLoginBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  return next();
};

const normalizeSignupBody = (req, res, next) => {
  req.body = {
    name: String(req.body.name || '').trim(),
    email: String(req.body.email || '').trim().toLowerCase(),
    password: String(req.body.password || ''),
    confirmPassword: String(req.body.confirmPassword || '')
  };

  next();
};

const validateSignupBody = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'name, email, password and confirmPassword are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password and confirmPassword must match' });
  }

  return next();
};

module.exports = {
  normalizeLoginBody,
  validateLoginBody,
  normalizeSignupBody,
  validateSignupBody
};
