import type { Config } from "@jest/types";

//const baseDir = "<rootDir>/src/app/*.ts";

// const baseDir = "<rootDir>/src/app/password_checker";
//const baseTestDir = "<rootDir>/src/test/password_checker";

//const baseDir = "<rootDir>/src/app/doubles";
//const baseTestDir = "<rootDir>/src/test/doubles";

const baseDir = "<rootDir>/src/app/server_app";
const baseTestDir = "<rootDir>/src/test/server_app";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [`${baseDir}/**/*.ts`],
    testMatch: [
        `${baseTestDir}/auth/**/*test.ts`,
        `${baseTestDir}/data/**/*test.ts`,
        `${baseTestDir}/handlers/**/*test.ts`,
        `${baseTestDir}/server/**/*test.ts`,
        `${baseTestDir}/tests_with_wrappers/**/*test.ts`,
        `${baseTestDir}/utils/**/*test.ts`,
        `${baseTestDir}/custom_matchers/**/*test.ts`,
    ],
    setupFiles: ["<rootDir>/src/test/server_app/utils/config.ts"],
};

export default config;
