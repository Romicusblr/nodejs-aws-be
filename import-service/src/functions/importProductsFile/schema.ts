const schema = {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    },
  },
} as const;

export default schema;
