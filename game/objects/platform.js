export class Platform {
    #bod
    constructor(x, y, width, height, engine, module) {
        // matter stuff
        // create a matter body
        let bod = module.Bodies.rectangle(x, y, width, height, { isStatic: true });
        // add it to the physics world
        module.Composite.add(engine.world, bod);
        this.#bod = bod;
    }
    get bod() {
        return this.#bod;
    }
}

export class Goal extends Platform {
    #detector
    #module
    constructor(x, y, engine, module, ball) {
        super(x, y, 200, 100, engine, module);
        this.#detector = module.Detector.create({bodies: [this.bod, ball.bod]});
        this.#module = module
    }
    update() {
        if (this.#module.Detector.collisions(this.#detector).length !== 0) {
            console.log("winner")
        }
    }
}