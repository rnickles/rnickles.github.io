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
    #game_state
    constructor(x, y, engine, module, ball, game_state) {
        super(x, y, 200, 10, engine, module);
        this.#detector = module.Detector.create({bodies: [this.bod, ball.bod]});
        this.#module = module;
        this.#game_state = game_state;
    }
    update() {
        if (this.#module.Detector.collisions(this.#detector).length !== 0) {
            this.#game_state.level_complete = true;
        }
    }
}

export class UserPlatform {
    constructor(startX, startY, endX, endY, engine, module) {
        // Calculate length and angle of the platform
        const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const angle = Math.atan2(endY - startY, endX - startX);

        // Calculate the midpoint of the line
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // Create the platform body
        const platform = module.Bodies.rectangle(midX, midY, length, 10, {
            angle: angle,
            isStatic: true
        });

        // Add the platform to the world
        module.Composite.add(engine.world, platform);
    }
}