const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    // TODO: Implement login action (get the user if it exist with entered credentials)
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error('Incorrect login or password')
    }
    const user = await AuthService.login(email)
    if (user.password !== password) {
      throw Error("Incorrect password")
    }
    res.data = user;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;