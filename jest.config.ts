import type { Config } from "@jest/types";

//const baseDir = "<rootDir>/src/app/*.ts";

const baseDir = "<rootDir>/src/app/password_checker";
const baseTestDir = "<rootDir>/src/test/password_checker";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [`${baseDir}/**/*.ts`],
    testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
