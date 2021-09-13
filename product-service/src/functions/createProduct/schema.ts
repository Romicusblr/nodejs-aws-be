export default {
  type: "object",
  properties: {
    count: { type: "number" },
    price: { type: "number" },
    title: { type: "string" },
    description: { type: "string" },
  },
  required: ["count", "price", "title"],
} as const;
