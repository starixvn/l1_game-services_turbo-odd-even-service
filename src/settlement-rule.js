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
