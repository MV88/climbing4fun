const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');

/*
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex,
  },
  avatarPicture: { type: String },
});
*/

class User extends Model {
  static get tableName () {
    return tableNames.user;
  }

  static get jsonschema () {
    return {
      $schema: "http://json-schema.org/draft-07/schema",
      type: "object",
      title: "The User schema",
      description: "The user.",
      required: [
        "email",
        "name",
        "surname",
        "password",
      ],
      properties: {
        id: {
          $id: "#/properties/id",
          type: "integer",
          title: "The ID",
        },
        email: {
          $id: "#/properties/email",
          type: "string",
          title: "The email of the user, must be unique",
          examples: [
            "chronosoutoftime@gmail.com",
          ],
        },
        name: {
          $id: "#/properties/name",
          type: "string",
          title: "The name of the user",
          examples: [
            "Chronos",
          ],
        },
        surname: {
          $id: "#/properties/surname",
          type: "string",
          title: "The surname of the user",
        },
        password: {
          $id: "#/properties/name",
          type: "string",
          title: "The password of the user",
        },
        created_at: {
          $id: "#/properties/created_at",
          type: "string",
          title: "The date of creation of the user",
          examples: [
            "2021-01-07T22:48:30.656Z",
          ],
        },
        updated_at: {
          $id: "#/properties/updated_at",
          type: "string",
          title: "The date of the update of the user",
          examples: [
            "2021-01-07T22:48:30.656Z",
          ],
        },
      },
      additionalProperties: false,
    };
  }
}
module.exports = User;
