/**
 * Controls class handles keyboard and mouse input for camera movement and rotation.
 * @class
 * @property {Object} keys - Stores the state of pressed keys.
 * @property {number} movementSpeed - Speed of camera movement.
 * @property {number} rotateSpeed - Speed of camera rotation.
 * @property {number} mouseX - Current mouse X position.
 * @property {number} mouseY - Current mouse Y position.
 */
class Controls {
    /**
     * Creates a Controls instance and sets up event listeners.
     * @constructor
     */
    constructor() {
        this.keys = {};
        this.movementSpeed = 5;
        this.rotateSpeed = 0.02;

        // Mouse position
        this.mouseX = 0;
        this.mouseY = 0;

        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
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
     * @param {Camera} camera - The camera object to control.
     * @param {HTMLCanvasElement} canvas - The canvas element for mouse centering.
     * @returns {void}
     */
    CheckControls(camera, canvas) {
        if (this.isKeyPressed('KeyW')) camera.translateZ(-this.movementSpeed);
        if (this.isKeyPressed('KeyS')) camera.translateZ(this.movementSpeed);
        if (this.isKeyPressed('KeyA')) camera.translateX(-this.movementSpeed);
        if (this.isKeyPressed('KeyD')) camera.translateX(this.movementSpeed);
        if (this.isKeyPressed('Space')) camera.translateY(this.movementSpeed);
        if (this.isKeyPressed('ShiftLeft')) camera.translateY(-this.movementSpeed);

        // Mouse look: always point where the mouse is
        // Center of canvas
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate yaw and pitch based on mouse position
        const sensitivity = 0.002;
        const dx = this.mouseX - centerX;
        const dy = this.mouseY - centerY;

        camera.yaw = dx * sensitivity;
        camera.pitch = dy * sensitivity;
        camera.updateCameraVectors();
    }
}