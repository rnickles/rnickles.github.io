import { Ball } from "../objects/ball.js"
import { Platform, Goal } from "../objects/platform.js"

export function init_level1(module, engine, game_state) {
    let goal = new Goal(200, 400, engine, module, game_state);
    game_state.drop_coords = [450, 50];
    game_state.goal = goal;
}