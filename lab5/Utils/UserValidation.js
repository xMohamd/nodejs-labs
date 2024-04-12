const ajv = require("ajv");
const ajv1 = new ajv();
const schema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    age: { type: "number" },
    address: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["id", "name", "age", "address", "email", "password"],
  additionalProperties: false,
};
const validate = ajv1.compile(schema);

module.exports = validate;
