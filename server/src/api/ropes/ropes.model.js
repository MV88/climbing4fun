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
        "brand",
        "color",
        "length",
        "thickness",
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
        },
        brand: {
          $id: "#/properties/brand",
          type: "string",
          title: "The brand of the Rope",
          examples: [
            "Beal",
          ],
        },
        color: {
          $id: "#/properties/color",
          type: "string",
          title: "The color of the Rope",
          examples: [
            "Orange",
          ],
        },
        purchaseDate: {
          $id: "#/properties/purchaseDate",
          type: "string",
          title: "The date of purchase of the Rope",
          examples: [
            "10/09/2020",
          ],
        },
        length: {
          $id: "#/properties/length",
          type: "number",
          title: "The length of the Rope in meters",
        },
        thickness: {
          $id: "#/properties/thickness",
          type: "number",
          title: "The thickness of the Rope in millimeters",
        },
        shopLink: {
          $id: "#/properties/shopLink",
          type: "string",
          title: "The link where the Rope has been bought",
        },
        owner: {
          $id: "#/properties/owner",
          type: "string",
          title: "The name surname, whatever, related to owner",
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
