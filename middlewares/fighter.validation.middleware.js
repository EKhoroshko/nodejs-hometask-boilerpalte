const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  try {
    const { defense, name, power, health } = req.body;

    if (Object.keys(req.body).length === 0) {
      throw new Error("Feilds is empty");
    }

    if (!power || power < 1 || power > 100) {
      throw new Error('Power fighter from 1 to 100')
    }

    if (!defense || defense < 1 || defense > 10) {
      throw new Error('Defense fighter from 1 to 10')
    }

    if (health && health < 80 || health > 120) {
      throw new Error('Health fighter from 80 to 120')
    }

    if (!name) {
      throw new Error('Need name fighter')
    }

    next();
  } catch (error) {
    res.status(400).json({ error: true, message: error.message })
  }
}

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  const checkKeys = Object.keys(req.body).every(key => Object.keys(fighter).includes(key));

  try {
    const { defense, name, power, health } = req.body;

    if (checkKeys === false) {
      throw new Error("Unknown field")
    }

    if (Object.keys(req.body).length === 0) {
      throw new Error("Feilds is empty");
    }

    if (power && power < 1 || power > 100) {
      throw new Error('Power fighter from 1 to 100')
    }

    if (defense && defense < 1 || defense > 10) {
      throw new Error('Defense fighter from 1 to 10')
    }

    if (health && health < 80 || health > 120) {
      throw new Error('Health fighter from 80 to 120')
    }

    if (name.length < 1) {
      throw new Error('Short name')
    }

    next();
  } catch (error) {
    res.status(400).json({ error: true, message: error.message })
  }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;