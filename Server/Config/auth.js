module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: '30d',
  jwtCookieExpire: 30
};

// Validate JWT secret is set
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be defined in production environment');
}
