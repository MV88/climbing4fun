const crypto = require("crypto");
const bcrypt = require("bcrypt");
// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");
const styles = require("../../src/constants/styles");
const grades = require("../../src/constants/grades");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map(name => knex(name).del()));

  const password = crypto.randomBytes(15).toString("hex");

  const user = {
    name: "Matteo",
    surname: "Velludini",
    email: "teo.rubber@gmail.com",
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user)
    .insert([user])
    .returning("*");

  console.log(
    "user created: ",
    {
      password,
    },
    createdUser,
  );

  await knex(tableNames.style).insert(
    styles,
    "*",
  );
  await knex(tableNames.grade).insert(
    grades,
    "*",
  );
};
