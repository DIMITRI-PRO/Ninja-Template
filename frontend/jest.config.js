module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
};
