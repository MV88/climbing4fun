const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CYCLES_FOR_PASSWORD } = require('../constants/project');
const catch500Error = (res, error) => {
  console.log("error", error);
  res.status(500).json({ error });
};

const authFailed = res => res.status(401).json({ message: "Auth failed" });

/**
 * it hashes a password
 * @param {string} pwd
 * @return {Promise} the Promise that will generate the hash
 */
const hashPassword = pwd => bcrypt.hash(pwd, CYCLES_FOR_PASSWORD);

const sign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    }, (error, token) => {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    });
  });
};
const comparePasswords = (userPwdFromDB, notHashedPWD) => {
  return bcrypt.compare(notHashedPWD, userPwdFromDB);
};

module.exports = {
  catch500Error,
  sign,
  authFailed,
  hashPassword,
  comparePasswords,
};
