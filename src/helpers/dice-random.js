import Chance from "chance";
import Random from "random";
import { Random as RandomJS, MersenneTwister19937 } from "random-js";
import _ from "lodash";
import randomInteger from "random-int";

const random1 = () => {
    return Math.floor(Math.random() * 6) + 1;
};
const random2 = () => {
    const chance = new Chance();
    return chance.d6();
};

const random3 = () => {
    const chance = new Chance();
    return chance.integer({ min: 1, max: 6 });
};

const random4 = () => {
    return Random.int(1, 6);
};

const random5 = () => {
    const randomEngine = new RandomJS(MersenneTwister19937.autoSeed());
    return randomEngine.integer(1, 6);
};

const random6 = () => {
    return _.random(1, 6);
};

function random7() {
    return randomInteger(1, 6);
}

const randomModes = {
    1: [random1, random2, random3, random4],
    2: [random4, random5, random6, random7],
    3: [random1, random3, random5, random7],
};

export const random = (randomMode) => {
    const chance = new Chance();
    const randomFunctions = randomModes[randomMode] ?? randomModes[1];
    const randomFunction = chance.pickone(randomFunctions);

    return randomFunction();
};
