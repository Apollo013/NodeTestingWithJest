import { DataBase } from "../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../src/app/server_app/data/IdGenerator";

type someTypeWithId = {
    id: string;
    name: string;
    color: string;
};

const someObject1 = {
    id: "",
    name: "someName",
    color: "blue",
};

const someObject2 = {
    id: "",
    name: "someOtherName",
    color: "blue",
};

describe("Database Test Suite", () => {
    let database: DataBase<someTypeWithId>;

    const fakeId = "1234";

    beforeEach(() => {
        database = new DataBase<someTypeWithId>();
        jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
    });

    it("Should return id after insert", async () => {
        const actual = await database.insert({ id: "" } as any);
        expect(actual).toBe(fakeId);
    });

    it("Should get element after inset", async () => {
        const id = await database.insert(someObject1);
        const actual = await database.getBy("id", id);

        expect(actual).toBe(someObject1);
    });

    it("Should find all elements with the same property", async () => {
        await database.insert(someObject1);
        await database.insert(someObject2);

        const expected = [someObject1, someObject2];

        const actual = await database.findAllBy("color", "blue");

        expect(actual).toEqual(expected);
    });

    it("Should change color on object", async () => {
        const id = await database.insert(someObject1);
        const expectedColor = "red";

        await database.update(id, "color", expectedColor);
        const object = await database.getBy("id", id);
        const actualColor = object.color;

        expect(actualColor).toBe(expectedColor);
    });

    it("Should delete object", async () => {
        const id = await database.insert(someObject1);
        await database.delete(id);

        const actual = await database.getBy("id", id);

        expect(actual).toBeUndefined();
    });

    it("Should get all elements", async () => {
        await database.insert(someObject1);
        await database.insert(someObject2);
        const expected = [someObject1, someObject2];

        const actual = await database.getAllElements();

        expect(actual).toEqual(expected);
    });
});
