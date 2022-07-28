import { asClass, asValue } from "awilix";
import { ContainerRegistry } from "sc-pool-betting-game-base";
import OddEvenPlaceBetConsumer from "./consumers/odd-even-place-bet-consumer";

import { TurboOddEvenGameCron } from "./crons";
import { TurboOddEvenBetLogs, TurboOddEvenBets, TurboOddEvenRounds } from "./models";
import { TurboOddEvenHistoryQuery, TurboOddEvenRoundQuery } from "./query-apis";

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

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(TurboOddEvenGameCron).singleton().proxy(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(OddEvenPlaceBetConsumer).singleton(),
        });
    }
}
