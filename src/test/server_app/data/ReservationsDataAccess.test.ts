import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";
import { Reservation } from "../../../app/server_app/model/ReservationModel";

const mockInsert = jest.fn();
const mockGetBy = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockGetAllElements = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: mockInsert,
                getBy: mockGetBy,
                update: mockUpdate,
                delete: mockDelete,
                getAllElements: mockGetAllElements,
            };
        }),
    };
});

describe("ReservationsDataAccess test suite", () => {
    let database: ReservationsDataAccess;

    const someId = "1234";

    const someReservation: Reservation = {
        endDate: "someEndDate",
        startDate: "someStartDate",
        id: "",
        room: "someRoom",
        user: "someUser",
    };

    beforeEach(() => {
        database = new ReservationsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
        jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(someId);
    });

    afterEach(() => {
        jest.clearAllMocks();
        someReservation.id = "";
    });

    it("Should return the id of newly created reservation", async () => {
        mockInsert.mockResolvedValueOnce(someId);

        const actual = await database.createReservation(someReservation);

        expect(actual).toBe(someId);
        expect(mockInsert).toBeCalledWith(someReservation);
    });

    it("Should make the update reservation call", async () => {
        await database.updateReservation(someId, "endDate", "someOtherEndDate");

        expect(mockUpdate).toBeCalledWith(someId, "endDate", "someOtherEndDate");
    });

    it("Should make the delete reservation call", async () => {
        await database.deleteReservation(someId);

        expect(mockDelete).toBeCalledWith(someId);
    });

    it("Should return reservation by id", async () => {
        mockGetBy.mockResolvedValueOnce(someReservation);

        const actual = await database.getReservation(someId);

        expect(actual).toEqual(someReservation);
        expect(mockGetBy).toBeCalledWith("id", someId);
    });

    it("Should return all reservations", async () => {
        mockGetAllElements.mockResolvedValueOnce([someReservation, someReservation]);

        const actual = await database.getAllReservations();

        expect(actual).toEqual([someReservation, someReservation]);
        expect(mockGetAllElements).toBeCalledTimes(1);
    });
});
