690, 855, 670, 717
656, 744, 1012, 734

import { Goal, Platform } from "../objects/platform.js"

export function init_level5(module, engine, game_state) {
    let goal = new Goal(800, 800, engine, module, game_state);
    game_state.drop_coords = [450, 50];
    game_state.goal = goal;
    new Platform(690, 855, 670, 717, engine, module);
    new Platform(656, 744, 1012, 634, engine, module)
}