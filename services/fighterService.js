const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  // TODO: Implement methods to work with fighters
  getAll() {
    return FighterRepository.getAll();
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createFighter = (data) => {
    const { name } = data;
    if (this.search({ name }) !== null) {
      throw Error('There is already a fighter with that name');
    }
    const newFighter = FighterRepository.create(data);
    return newFighter;
  }

  putFighter = (id, data) => {
    if (!this.search({ id })) {
      throw Error('Fighter not found')
    }
    const updateFighter = FighterRepository.update(id, data);
    return updateFighter;
  }

  deleteFighter = (id) => {
    if (!this.search({ id })) {
      throw Error('Fighter not found')
    }
    const removeFighter = FighterRepository.delete(id);
    return removeFighter;
  }
}

module.exports = new FighterService();