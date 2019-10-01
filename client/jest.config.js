module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"],
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/config/jest/jest-transformer.js",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
};
