export function init_level1(module, engine) {

    // create two boxes and a ground
    var boxA = module.Bodies.rectangle(400, 200, 80, 80);
    var boxB = module.Bodies.rectangle(450, 50, 80, 80);
    var ground = module.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    module.Composite.add(engine.world, [boxA, boxB, ground]);
}