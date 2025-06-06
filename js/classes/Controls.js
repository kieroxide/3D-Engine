class Controls {
    constructor() {
        this.keys = {};

        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    isKeyPressed(keyCode) {
        return this.keys[keyCode];
    }

    CheckControls(camera) {
        if (this.isKeyPressed('KeyW')) {
            camera.translateZ(-1);
        }
        if (this.isKeyPressed('KeyS')) {
            camera.translateZ(1);
        }
        if (this.isKeyPressed('KeyA')) {
            camera.translateX(-1);
        }
        if (this.isKeyPressed('KeyD')) {
            camera.translateX(1);
        }
        if (this.isKeyPressed('Space')) {
            camera.translateY(1);
        }
        if (this.isKeyPressed('ShiftLeft')) {
            camera.translateY(-1);
        }
        if (this.isKeyPressed('ArrowLeft')) {
            camera.rotateYaw(-0.01);
        }
        if (this.isKeyPressed('ArrowRight')) {
            camera.rotateYaw(0.01);
        }
    }
}