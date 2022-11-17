import { random } from "./dice-random";

export const generateResult = (randomMode) => {
    const dice1 = random(randomMode);
    const dice2 = random(randomMode);
    const dice3 = random(randomMode);

    return { dice1, dice2, dice3 };
};

const settlementRuleEntries = Object.entries({
    odd: (totalPoints) => totalPoints % 2 !== 0,
    even: (totalPoints) => totalPoints % 2 === 0,
});

export const getSettlementResult = (roundResult) => {
    const totalPoints = Object.values(roundResult).reduce((accumulator, currentValue) => accumulator + currentValue);

    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(totalPoints);

        return result;
    }, {});
};
