const ajv = require("ajv");
const ajv1 = new ajv();
const schema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    price: { type: "number" },
    desc: { type: "string" },
  },
  required: ["id", "name", "price", "desc"],
  additionalProperties: false,
};
const validate = ajv1.compile(schema);
module.exports = validate;
