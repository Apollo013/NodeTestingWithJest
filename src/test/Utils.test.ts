import { getStringInfo, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
    it("should return upper case", () => {
        const result = toUpperCase("abc");
        expect(result).toBe("ABC");
    });

    describe("toUpperCase examples", () => {
        it.each([
            { input: "abc", expected: "ABC" },
            { input: "mystring", expected: "MYSTRING" },
        ])("$input toUpperCase should be $expected", ({ input, expected }) => {
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
    });
});

describe("getStringInfo for arg My-String should", () => {
    it("should return correct length", () => {
        const actual = getStringInfo("My-String");
        expect(actual.characters).toHaveLength(9);
    });

    it("should return correct lower case", () => {
        const actual = getStringInfo("My-String");
        expect(actual.lowerCase).toBe("my-string");
    });

    it("should return correct upper case", () => {
        const actual = getStringInfo("My-String");
        expect(actual.upperCase).toBe("MY-STRING");
    });

    it("should return correct characters", () => {
        const actual = getStringInfo("My-String");
        expect(actual.characters).toEqual(["M", "y", "-", "S", "t", "r", "i", "n", "g"]);
        expect(actual.characters).toContain<string>("M");
        expect(actual.characters).toEqual(
            expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
        );
    });

    it("return defined extra info", () => {
        const actual = getStringInfo("My-String");
        expect(actual.extraInfo).toBeDefined();
    });

    it("return right extra info", () => {
        const actual = getStringInfo("My-String");
        expect(actual.extraInfo).toEqual({});
    });
});
