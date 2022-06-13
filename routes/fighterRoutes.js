const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', async (req, res, next) => {
  try {
    const fighters = await FighterService.getAll();
    res.status(200).json(
      fighters
    )
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const fighterById = await FighterService.search({ id })
    if (fighterById) {
      res.status(200).json({
        fighterById
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
    const createNewFighter = await FighterService.createFighter(req.body);
    res.status(201).json({
      createNewFighter
    });
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', async (req, res, next) => {
  try {
    const updateFighter = await FighterService.putFighter(req.params.id, req.body, { new: true })
    if (updateFighter) {
      res.status(200).json({
        updateFighter
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
    const deleteFighter = await UserService.deleteUser(req.params.id)
    if (deleteFighter) {
      return res.status(200).json({
        message: "Fighter remove"
      })
    }
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;