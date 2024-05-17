import { Goal } from "../objects/platform.js"

export function init_level1(module, engine, game_state) {
    let goal = new Goal(200, 800, engine, module, game_state);
    game_state.drop_coords = [450, 50];
    game_state.goal = goal;
}