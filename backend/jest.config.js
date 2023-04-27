export default {
  testEnvironment: "node",
  transform: {},
  moduleFileExtensions: ["js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
  globals: {
    NODE_ENV: "test",
  },
  setupFiles: ["dotenv/config"],
  verbose: true,
};
