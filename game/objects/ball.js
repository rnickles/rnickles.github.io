const DOT_SIZE = 30;

export class Ball {
    #bod
    constructor(x, y, engine, module) {
        // matter stuff
        // create a matter body
        let bod = module.Bodies.circle(x, y, DOT_SIZE * 0.5, {
            friction: 0.00001,
            restitution: 0.5,
            density: 0.1
        });
        // add it to the physics world
        module.Composite.add(engine.world, bod);
        this.#bod = bod;
    }
    get bod() {
        return this.#bod;
    }
}