import { Core } from "sc-game-base";
import { initAPIStub, stubUserService } from "sc-game-service-integration-utils";
import { GameData } from "sc-pool-betting-game-base";

import appConfigs from "../../../src/app-configs.IGT";
import gameSettings from "../../../src/game-settings";
import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";
import ContainerRegistry from "../../../src/turbo-odd-even-container-registry";

const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    stubUserService(appConfigs);

    const gameData = new GameData(gameSettings.durations.wholeRound);
    const definition = new Core.GameDefinition(gameSettings, generateResult, getSettlementResult);
    const container = new ContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("TurboOddEven", appConfigs);

    await app.run();
    await app.startGame(container);
};

run();
