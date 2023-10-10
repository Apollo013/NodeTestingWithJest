import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";

// SessionTokenDataAccess mocks:
const isValidTokenMock = jest.fn();
const generateTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();
jest.mock("../../../app/server_app/data/SessionTokenDataAccess", () => {
    return {
        SessionTokenDataAccess: jest.fn().mockImplementation(() => {
            return {
                isValidToken: isValidTokenMock,
                generateToken: generateTokenMock,
                invalidateToken: invalidateTokenMock,
            };
        }),
    };
});

// UserCredentialsDataAccess mocks:
const addUserMock = jest.fn();
const getUserByUserNameMock = jest.fn();
jest.mock("../../../app/server_app/data/UserCredentialsDataAccess", () => {
    return {
        UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
            return {
                addUser: addUserMock,
                getUserByUserName: getUserByUserNameMock,
            };
        }),
    };
});

describe("Authorizer test suite", () => {
    let authoriser: Authorizer;

    const someId = "1234";
    const someUserName = "someUserName";
    const somePassword = "somePassword";

    beforeEach(() => {
        authoriser = new Authorizer();
        expect(SessionTokenDataAccess).toHaveBeenCalledTimes(1);
        expect(UserCredentialsDataAccess).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should validate token", async () => {
        isValidTokenMock.mockResolvedValueOnce(false);

        const actual = await authoriser.validateToken(someId);

        expect(actual).toBe(false);
    });

    it("Should return id for new registered user", async () => {
        addUserMock.mockResolvedValueOnce(someId);

        const actual = await authoriser.registerUser(someUserName, somePassword);

        expect(actual).toBe(someId);
        expect(addUserMock).toBeCalledWith({
            id: "",
            password: somePassword,
            userName: someUserName,
        });
    });

    it("Should return tokenId for valid credentials", async () => {
        getUserByUserNameMock.mockResolvedValueOnce({
            password: somePassword,
        });
        generateTokenMock.mockResolvedValueOnce(someId);

        const actual = await authoriser.login(someUserName, somePassword);

        expect(actual).toBe(someId);
    });

    it("Should return undefined for invalid credentials", async () => {
        getUserByUserNameMock.mockResolvedValueOnce({
            password: somePassword,
        });
        generateTokenMock.mockResolvedValueOnce(someId);

        const actual = await authoriser.login(someUserName, "someOtherPassword");

        expect(actual).toBeUndefined();
    });

    it("Should invalidate token on logout call", async () => {
        await authoriser.logout(someId);

        expect(invalidateTokenMock).toBeCalledWith(someId);
    });
});
