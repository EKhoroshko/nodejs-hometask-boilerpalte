const { user } = require('../models/user');

let regexMail = new RegExp('[a-z0-9]+@gmail.com');
let regexPhone = new RegExp(/^\+?([3][8][0])\)?([0-9]{9})$/);

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  try {
    const { email, phoneNumber, lastName, firstName, password } = req.body;

    if (Object.keys(req.body).length === 0) {
      throw new Error("Feilds is empty");
    }

    if (!lastName || !firstName) {
      throw Error("lastName and Firstname is required")
    }

    if (!email || regexMail.test(email) === false) {
      throw Error("only @gmail.com domen");
    }

    if (!phoneNumber || regexPhone.test(phoneNumber) === false) {
      throw Error("only +380xxxxxxxxx format");
    }

    if (!password || password.length < 3) {
      throw Error("Password more 3 symvol");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: true, message: error.message })
  }
}

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const checkKeys = Object.keys(req.body).every(key => Object.keys(user).includes(key));

  try {
    const { email, phoneNumber, lastName, firstName, password } = req.body;
    if (checkKeys === false) {
      throw new Error("Unknown field")
    }

    if (Object.keys(req.body).length === 0) {
      throw new Error("Feilds is empty");
    }

    if (lastName.length == 0 || firstName.length == 0) {
      throw Error("lastName or Firstname is empty");
    }

    if (email && regexMail.test(email) === false) {
      throw Error("only @gmail.com domen");
    }

    if (phoneNumber && regexPhone.test(phoneNumber) === false) {
      throw Error("only +380xxxxxxxxx format");
    }

    if (password && password.length < 3) {
      throw Error("Password more 3 symvol");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: true, message: error.message })
  }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;