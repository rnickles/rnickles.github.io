import { Ball } from "../objects/ball.js"
import { Platform, Goal } from "../objects/platform.js"

export function init_level2(module, engine, game_state) {
    new Platform(400, 610, 810, 60, engine, module); //ground
    let goal = new Goal(200, 400, engine, module, game_state);

    game_state.goal = goal;
}