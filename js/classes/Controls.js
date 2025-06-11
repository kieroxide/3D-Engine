/**
 * Controls class handles keyboard and mouse input for camera movement and rotation.
 * @class
 * @property {Object} keys - Stores the state of pressed keys.
 * @property {number} movementSpeed - Speed of camera movement.
 * @property {number} rotateSpeed - Speed of camera rotation.
 * @property {boolean} pointerLocked - Whether pointer lock is active.
 */
class Controls {
    /**
     * Creates a Controls instance and sets up event listeners.
     */
    constructor(camera, scene) {
        this.keys = {};
        this.movementSpeed = 5;
        this.rotateSpeed = 0.02;
        this.pointerLocked = false;
        this.deltaX = 0;
        this.deltaY = 0;

        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Listen for pointer lock changes
        document.addEventListener('pointerlockchange', () => {
            this.pointerLocked = document.pointerLockElement !== null;
        });

        // Listen for mouse movement only when pointer is locked
        document.addEventListener('mousemove', (e) => {
            if (this.pointerLocked) {
                this.deltaX += e.movementX;
                this.deltaY += e.movementY;
            }
        });


    }

    /**
     * Checks if a key is currently pressed.
     * @param {string} keyCode - The code of the key to check.
     * @returns {boolean} True if the key is pressed, false otherwise.
     */
    isKeyPressed(keyCode) {
        return this.keys[keyCode];
    }

    /**
     * Handles camera movement and rotation based on key and mouse input.
     * Uses pointer lock for mouse look.
     * @param {Camera} camera - The camera object to control.
     * @param {HTMLCanvasElement} canvas - The canvas element for pointer lock.
     * @returns {void}
     */
    CheckControls(camera, canvas) {
        if (this.isKeyPressed('KeyW')) camera.translateZ(-this.movementSpeed);
        if (this.isKeyPressed('KeyS')) camera.translateZ(this.movementSpeed);
        if (this.isKeyPressed('KeyA')) camera.translateX(-this.movementSpeed);
        if (this.isKeyPressed('KeyD')) camera.translateX(this.movementSpeed);
        if (this.isKeyPressed('Space')) camera.translateY(this.movementSpeed);
        if (this.isKeyPressed('ShiftLeft')) camera.translateY(-this.movementSpeed);

        // Only rotate camera with mouse if pointer is locked
        if (this.pointerLocked) {
            const sensitivity = 0.002;
            camera.yaw += this.deltaX * sensitivity;
            camera.pitch += this.deltaY * sensitivity;
            camera.updateCameraVectors();
            this.deltaX = 0;
            this.deltaY = 0;
        }

        // Request pointer lock on canvas click
        canvas.onclick = () => {
            if (!this.pointerLocked) {
                canvas.requestPointerLock();
            }
        };
    }
}