/**
 * Handles keyboard controls for camera movement and rotation.
 */
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

    /**
     * Checks if a key is currently pressed.
     * @param {string} keyCode 
     * @returns {boolean}
     */
    isKeyPressed(keyCode) {
        return this.keys[keyCode];
    }

    /**
     * Handles camera movement and rotation based on key input.
     */
    CheckControls(camera) {
        if (this.isKeyPressed('KeyW')) camera.translateZ(-1);
        if (this.isKeyPressed('KeyS')) camera.translateZ(1);
        if (this.isKeyPressed('KeyA')) camera.translateX(-1);
        if (this.isKeyPressed('KeyD')) camera.translateX(1);
        if (this.isKeyPressed('Space')) camera.translateY(1);
        if (this.isKeyPressed('ShiftLeft')) camera.translateY(-1);
        if (this.isKeyPressed('ArrowLeft')) camera.rotateYaw(-0.01);
        if (this.isKeyPressed('ArrowRight')) camera.rotateYaw(0.01);
        if (this.isKeyPressed('ArrowUp')) camera.rotatePitch(-0.01);
        if (this.isKeyPressed('ArrowDown')) camera.rotatePitch(0.01);
    }
}