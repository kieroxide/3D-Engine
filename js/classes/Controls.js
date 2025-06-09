/**
 * Handles keyboard controls for camera movement and rotation.
 */
class Controls {
    constructor() {
        this.keys = {};
        this.movementSpeed = 5;
        this.rotateSpeed = 0.02;

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
        if (this.isKeyPressed('KeyW')) camera.translateZ(-this.movementSpeed);
        if (this.isKeyPressed('KeyS')) camera.translateZ(this.movementSpeed);
        if (this.isKeyPressed('KeyA')) camera.translateX(-this.movementSpeed);
        if (this.isKeyPressed('KeyD')) camera.translateX(this.movementSpeed);
        if (this.isKeyPressed('Space')) camera.translateY(this.movementSpeed);
        if (this.isKeyPressed('ShiftLeft')) camera.translateY(-this.movementSpeed);
        if (this.isKeyPressed('ArrowLeft')) camera.rotateYaw(-this.rotateSpeed);
        if (this.isKeyPressed('ArrowRight')) camera.rotateYaw(this.rotateSpeed);
        if (this.isKeyPressed('ArrowUp')) camera.rotatePitch(-this.rotateSpeed);
        if (this.isKeyPressed('ArrowDown')) camera.rotatePitch(this.rotateSpeed);
    }
}