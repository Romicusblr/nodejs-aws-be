export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        count: { type: "integer", minimum: 0 },
        price: { type: "number", minimum: 0 },
        title: { type: "string", maxLength: 64 },
        description: { type: "string", maxLength: 256 },
      },
      required: ["count", "price", "title"],
      additionalProperties: false,
    },
  },
} as const;
