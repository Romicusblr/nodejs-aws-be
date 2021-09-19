export default {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        productId: { type: "string", format: "uuid" },
      },
      required: ["productId"],
      additionalProperties: false,
    },
  },
} as const;
