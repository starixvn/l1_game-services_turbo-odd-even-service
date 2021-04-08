import { asClass, asValue } from "awilix";
import { ContainerRegistry } from "sc-pool-betting-game-base";

import { TurboOddEvenBetLogs, TurboOddEvenBets, TurboOddEvenRounds } from "./models";
import { TurboOddEvenRoundQuery, TurboOddEvenHistoryQuery } from "./query-apis";

export default class TurboOddEvenContainerRegistry extends ContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(TurboOddEvenRounds),
            betsRepository: asValue(TurboOddEvenBets),
            betLogsRepository: asValue(TurboOddEvenBetLogs),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            roundQuery: asClass(TurboOddEvenRoundQuery).singleton(),
            historyQuery: asClass(TurboOddEvenHistoryQuery).singleton(),
        });
    }
}
