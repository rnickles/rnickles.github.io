export class Ground {
    constructor(x, y, width, height, engine, module) {
        // matter stuff
        // create a matter body
        let bod = module.Bodies.rectangle(x, y, width, height, { isStatic: true });
        // add it to the physics world
        module.Composite.add(engine.world, bod);
    }
}