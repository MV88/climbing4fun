const crypto = require("crypto");
const bcrypt = require("bcrypt");
// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
const tableNames = require("../../constants/tableNames");
const styles = require("../../constants/styles");
const grades = require("../../constants/grades");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map(name => knex(name).del()));

  const password = crypto.randomBytes(15).toString("hex");

  const user = {
    name: "Matteo",
    surname: "V",
    username: "ChronosOutOfTime",
    email: "teo.rubber@gmail.com",
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user)
    .insert([user])
    .returning("*");

  if (process.env.NODE_ENV !== "test") {
    console.log(
      "user created: ",
      {
        password,
      },
      createdUser,
    );
  }

  await knex(tableNames.style).insert(
    styles,
    "*",
  );
  await knex(tableNames.grade).insert(
    grades,
    "*",
  );
};
