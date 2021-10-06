module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleNameMapper: {
    "@libs/(.*)": "<rootDir>/src/libs/$1",
    "@functions/(.*)": "<rootDir>/src/functions/$1",
  },
};
