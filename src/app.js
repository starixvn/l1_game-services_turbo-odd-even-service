import { Core } from "sc-game-base";
import { GameData } from "sc-pool-betting-game-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { random } from "./helpers";

const settlementRuleEntries = Object.entries({
    odd: (totalPoints) => totalPoints % 2 !== 0,
    even: (totalPoints) => totalPoints % 2 === 0,
});

const generateResult = () => {
    const dice1 = random();
    const dice2 = random();
    const dice3 = random();

    return { dice1, dice2, dice3 };
};

const getSettlementResult = (roundResult) => {
    const totalPoints = Object.values(roundResult).reduce((accumulator, currentValue) => accumulator + currentValue);

    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(totalPoints);

        return result;
    }, {});
};

const run = async () => {
    const gameData = new GameData(gameSettings.durations.wholeRound);
    const definition = new Core.GameDefinition(gameSettings, generateResult, getSettlementResult);
    const container = new TurboOddEvenContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(container);

    await app.run();
};

run();
