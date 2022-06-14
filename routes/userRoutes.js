const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.data = users;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await UserService.search({ id })
    res.data = userById;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createUserValid, async (req, res, next) => {
  try {
    const registrationUser = await UserService.createUser(req.body);
    res.data = registrationUser;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateUserValid, async (req, res, next) => {
  try {
    const updateUser = await UserService.putUser(req.params.id, req.body, { new: true })
    res.data = updateUser;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);


router.delete('/:id', async (req, res, next) => {
  try {
    const deleteUser = await UserService.deleteUser(req.params.id)
    if (deleteUser) {
      return res.status(200).json({
        message: "User remove"
      })
    }
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;