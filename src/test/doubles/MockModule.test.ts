jest.mock("../../app/doubles/DoubleUtils", () => ({
    ...jest.requireActual("../../app/doubles/DoubleUtils"),
    calculateComplexity: () => {
        return 10;
    },
}));

jest.mock("uuid", () => ({
    v4: () => "123",
}));

import * as DoubleUtils from "../../app/doubles/DoubleUtils";

describe("module tests", () => {
    test("calculate complexity", () => {
        const result = DoubleUtils.calculateComplexity({} as any);
        expect(result).toBe(10);
    });

    test("keep other functions", () => {
        const result = DoubleUtils.toUpperCase("abc");
        expect(result).toBe("ABC");
    });

    test("string with id", () => {
        const result = DoubleUtils.toLowerCaseWithId("ABC");
        expect(result).toBe("abc123");
    });
});
