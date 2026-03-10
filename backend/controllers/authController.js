const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const adminModel = require('../models/adminModel');

const buildTokenResponse = (email) => {
  const token = jwt.sign(
    { role: 'admin', email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return {
    message: 'Login successful',
    token,
    user: {
      email,
      role: 'admin'
    }
  };
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const dbAdmin = await adminModel.findAdminByEmail(email);

    if (dbAdmin) {
      const isValid = await bcrypt.compare(password, dbAdmin.password);

      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json(buildTokenResponse(dbAdmin.email));
    }

    const adminEmail = String(env.adminEmail).toLowerCase();
    const adminPassword = env.adminPassword;
    const adminPasswordHash = env.adminPasswordHash;

    const isEmailValid = email === adminEmail;
    const isPasswordValid = adminPasswordHash
      ? await bcrypt.compare(password, adminPasswordHash)
      : password === adminPassword;

    if (!isEmailValid || !isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json(buildTokenResponse(adminEmail));
  } catch (error) {
    return next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await adminModel.findAdminByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Admin user already exists with this email' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = await adminModel.createAdmin({ name, email, passwordHash });

    return res.status(201).json({
      message: 'Signup successful. You can now login.',
      user: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: 'admin'
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Admin user already exists with this email' });
    }

    return next(error);
  }
};

module.exports = {
  login,
  signup
};
