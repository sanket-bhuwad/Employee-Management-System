const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  const isEmailValid = email === adminEmail;
  const isPasswordValid = adminPasswordHash
    ? await bcrypt.compare(password, adminPasswordHash)
    : password === adminPassword;

  if (!isEmailValid || !isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin', email: adminEmail },
    process.env.JWT_SECRET || 'supersecret',
    { expiresIn: '8h' }
  );

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      email: adminEmail,
      role: 'admin'
    }
  });
};

module.exports = {
  login
};
