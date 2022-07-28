import { random } from "../../../src/helpers";

describe("diceRandom", () => {
    const expectedResultArr = [1, 2, 3, 4, 5, 6];
    const chanceMock = { pickoneIndex: 0 };

    jest.mock("chance", () => {
        return function () {
            const orig = {
                ...jest.requireActual("chance"),
            };

            return {
                d6: (opt) => {
                    return new orig.Chance().d6(opt);
                },
                integer: (opt) => {
                    return new orig.Chance().integer(opt);
                },
                pickone: (arr) => arr[chanceMock.pickoneIndex],
            };
        };
    });

    describe("random", () => {
        const testCases = [
            { randomMode: undefined, pickoneIndex: 0 },
            { randomMode: 1, pickoneIndex: 1 },
            { randomMode: 1, pickoneIndex: 2 },
            { randomMode: 2, pickoneIndex: 0 },
            { randomMode: 2, pickoneIndex: 1 },
            { randomMode: 3, pickoneIndex: 0 },
            { randomMode: 3, pickoneIndex: 1 },
        ];

        it.each(testCases)("should return correct number", ({ randomMode, pickoneIndex }) => {
            // Arrange
            chanceMock.pickoneIndex = pickoneIndex;

            // Act
            const actualResult = random(randomMode);

            // Assert
            expect(expectedResultArr.includes(actualResult)).toBeTruthy();
        });
    });
});
