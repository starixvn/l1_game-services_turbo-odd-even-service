import { Core } from "sc-game-base";
import { GameData } from "sc-pool-betting-game-base";

import appConfigs from "./app-configs";
import TurboOddEvenContainerRegistry from "./container-registry";
import gameSettings from "./game-settings";
import { random } from "./helpers";
import { getSettlementResult } from "./settlement-rule";

const generateResult = (randomMode) => {
    const dice1 = random(randomMode);
    const dice2 = random(randomMode);
    const dice3 = random(randomMode);

    return { dice1, dice2, dice3 };
};

const run = async () => {
    const gameData = new GameData(gameSettings.durations.wholeRound);
    const definition = new Core.GameDefinition(gameSettings, generateResult, getSettlementResult);
    const container = new TurboOddEvenContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("TurboOddEven", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
