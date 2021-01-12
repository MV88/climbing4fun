const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');

class Rope extends Model {
  static get tableName () {
    return tableNames.rope;
  }

  static get jsonschema () {
    return {
      $schema: "http://json-schema.org/draft-07/schema",
      type: "object",
      title: "The Rope schema",
      description: "The Rope.",
      required: [
        "ownerId",
        "name",
        "color",
        "length",
        "thickness",
        "purchaseDate",
      ],
      properties: {
        id: {
          $id: "#/properties/id",
          type: "integer",
          title: "The ID",
        },
        ownerId: {
          $id: "#/properties/ownerId",
          type: "string",
          title: "The id of the user that is the owner",
          examples: [
            "chronosoutoftime@gmail.com",
          ],
        },
        name: {
          $id: "#/properties/name",
          type: "string",
          title: "The name of the Rope",
          examples: [
            "Chronos",
          ],
        },
        surname: {
          $id: "#/properties/surname",
          type: "string",
          title: "The surname of the Rope",
        },
        password: {
          $id: "#/properties/name",
          type: "string",
          title: "The password of the Rope",
        },
        created_at: {
          $id: "#/properties/created_at",
          type: "string",
          title: "The date of creation of the Rope",
          examples: [
            "2021-01-07T22:48:30.656Z",
          ],
        },
        updated_at: {
          $id: "#/properties/updated_at",
          type: "string",
          title: "The date of the update of the Rope",
          examples: [
            "2021-01-07T22:48:30.656Z",
          ],
        },
      },
      additionalProperties: false,
    };
  }
}
module.exports = Rope;
