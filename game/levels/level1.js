import { Ball } from "../objects/ball.js"
import { Platform, Goal } from "../objects/platform.js"

export function init_level1(module, engine, game_state) {

    // create two boxes and a ground
    var boxA = module.Bodies.rectangle(400, 200, 80, 80);
    var boxB = module.Bodies.rectangle(450, 50, 80, 80);
    // var ground = module.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    module.Composite.add(engine.world, [boxA, boxB]);

    new Platform(400, 610, 810, 60, engine, module); //ground
    let ball = new Ball(450, 50, engine, module);
    let goal = new Goal(400, 400, engine, module, ball);

    let _bodies = [];
    _bodies.push(goal);
    return _bodies;
}