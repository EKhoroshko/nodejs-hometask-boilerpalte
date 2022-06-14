const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', async (req, res, next) => {
  try {
    const fighters = await FighterService.getAll();
    res.data = fighters;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const fighterById = await FighterService.search({ id })
    res.data = fighterById;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createFighterValid, async (req, res, next) => {
  try {
    const { name, power, defense, health = 100 } = req.body;
    const createNewFighter = await FighterService.createFighter({ name, power, defense, health });
    res.data = createNewFighter;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateFighterValid, async (req, res, next) => {
  try {
    const updateFighter = await FighterService.putFighter(req.params.id, req.body, { new: true })
    res.data = updateFighter;
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