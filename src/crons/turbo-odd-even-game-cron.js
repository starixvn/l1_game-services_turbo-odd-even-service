import { GameCron } from "sc-pool-betting-game-base";

export default class TurboOddEvenGameCron extends GameCron {
    async getLastArchiveRound() {
        const archiveStatus = await this.archiveStatusesRepository.findOne({ name: "chanleturbo" }, "lastArcId").lean().exec();

        return archiveStatus ? archiveStatus.lastArcId["_phiens"] + 1 : 1;
    }
}
