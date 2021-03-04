import { asValue } from "awilix";
import { ContainerRegistry } from "sc-pool-betting-game-base";

import { TurboOddEvenBetLogs, TurboOddEvenBets, TurboOddEvenRounds } from "./models";

export default class TurboOddEvenContainerRegistry extends ContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(TurboOddEvenRounds),
            betsRepository: asValue(TurboOddEvenBets),
            betLogsRepository: asValue(TurboOddEvenBetLogs),
        });
    }
}
