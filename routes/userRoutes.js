const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json({
      users
    })
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await UserService.search({ id })
    if (userById) {
      res.status(200).json({
        userById
      })
    }
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', async (req, res, next) => {
  try {
    const registrationUser = await UserService.createUser(req.body)
    res.status(201).json({
      registrationUser
    });
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await UserService.putUser(req.params.id, req.body, { new: true })
    if (updateUser) {
      res.status(200).json({
        updateUser
      })
    }
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