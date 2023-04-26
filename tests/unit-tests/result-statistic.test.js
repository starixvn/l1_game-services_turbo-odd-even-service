import { random } from "../../src/helpers";
import { getSettlementResult } from "../../src/settlement-rule";

const generateResult = (randomMode) => {
    const dice1 = random(randomMode);
    const dice2 = random(randomMode);
    const dice3 = random(randomMode);

    return { dice1, dice2, dice3 };
};

describe("Running 100000 rounds", () => {
    it.each([1, 2, 3])("Mode %d - ratio of odd/even should be >= 0.49", (mode) => {
        const totalRounds = 100_000;
        const streaks = {
            odd: {},
            even: {},
        };

        const streakNumber = 4;
        const longestStreak = 4;
        let occurrences = 0;
        let prev = "odd";
        const stats = {
            streaks: { total: 0, odd: 0, even: 0 },
        };

        for (let index = 0; index < totalRounds; index++) {
            const result = generateResult(mode);
            const settlement = getSettlementResult(result);

            if (settlement[prev]) {
                occurrences++;
            } else {
                if (occurrences >= streakNumber) {
                    stats.streaks.total++;
                    stats.streaks[prev]++;

                    if (occurrences >= longestStreak) {
                        streaks[prev][occurrences] = streaks[prev][occurrences] ?? 0;
                        streaks[prev][occurrences]++;
                    }
                }

                prev = settlement.odd ? "odd" : "even";
                occurrences = 1;
            }

            Object.keys(settlement).reduce((choiceResults, choice) => {
                stats[choice] = stats[choice] ?? { count: 0, ratio: 0 };
                stats[choice].count += settlement[choice] ? 1 : 0;
                stats[choice].ratio = stats[choice].count / totalRounds;
            }, {});
        }

        expect(stats.odd.ratio).toBeGreaterThanOrEqual(0.49);
        expect(stats.even.ratio).toBeGreaterThanOrEqual(0.49);
        console.log(`======== Run ${totalRounds} rounds in mode ${mode} ========`);

        console.log(stats);
        console.log(`Longest streaks (>=${longestStreak}) in mode ${mode} : `);
        console.log(streaks);
    });
});
