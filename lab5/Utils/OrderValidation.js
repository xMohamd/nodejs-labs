const ajv = require("ajv");
const ajv1 = new ajv();
const schema = {
  type: "object",
  properties: {
    id: { type: "number" },
    totalPrice: { type: "number" },
    items: { type: "array" },
  },
  required: ["id", "totalPrice", "items"],
  additionalProperties: false,
};
const validate = ajv1.compile(schema);
module.exports = validate;
