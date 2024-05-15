import { Ball } from "../objects/ball.js"
import { Platform, Goal } from "../objects/platform.js"

export function init_level1(module, engine, game_state) {
    new Platform(400, 610, 810, 60, engine, module); //ground
    let ball = new Ball(450, 50, engine, module);
    let goal = new Goal(200, 400, engine, module, ball, game_state);

    let _bodies = [];
    _bodies.push(goal);
    return _bodies;
}