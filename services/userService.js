const { UserRepository } = require('../repositories/userRepository');

class UserService {

  // TODO: Implement methods to work with user

  getAll() {
    return UserRepository.getAll();
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser = (data) => {
    const { email, phoneNumber } = data;
    if (this.search({ email }) !== null || this.search({ phoneNumber }) !== null) {
      throw Error('Email or phone already in use');
    }
    const newUser = UserRepository.create(data);
    return newUser;
  }

  putUser = (id, data) => {
    if (!this.search({ id })) {
      throw Error('User not found')
    }
    const updateUser = UserRepository.update(id, data);
    return updateUser;
  }

  deleteUser = (id) => {
    if (!this.search({ id })) {
      throw Error('User not found')
    }
    const removeUser = UserRepository.delete(id);
    return removeUser;
  }
}

module.exports = new UserService();