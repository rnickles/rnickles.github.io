import { Ball } from "../objects/ball.js"
import { Platform, Goal } from "../objects/platform.js"

export function init_level2(module, engine, game_state) {

    // create two boxes and a ground
    var boxA = module.Bodies.rectangle(200, 200, 80, 80);
    var boxB = module.Bodies.rectangle(250, 50, 80, 80);
    // var ground = module.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    module.Composite.add(engine.world, [boxA, boxB]);

    new Platform(400, 610, 810, 60, engine, module); //ground
    let ball = new Ball(250, 50, engine, module);
    let goal = new Goal(200, 400, engine, module, ball, game_state);

    let _bodies = [];
    _bodies.push(goal);
    return _bodies;
}