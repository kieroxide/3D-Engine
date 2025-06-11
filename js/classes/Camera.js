/**
 * Represents a camera in 3D space with position, orientation, and movement.
 * @class
 */
class Camera {
    /**
     * Creates a Camera instance.
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} cameraSpeed 
     */
    constructor(x, y, z, cameraSpeed = 1){
        this.worldUp = new Point3D(0, 1, 0);
        this.camPos = new Point3D(x, y, z);
        this.camSpeed = cameraSpeed;
        this.yaw = 0;
        this.pitch = 0;
        this.camDirection = new Point3D(0, 0, -1);
        this.camUp = new Point3D(0, 1, 0);
        this.camRight = new Point3D(1, 0, 0);
        this.focalLength = 500;
        this.updateCameraVectors();
    }

    /**
     * Updates camera direction, right, and up vectors based on yaw and pitch.
     * @returns {void}
     */
    updateCameraVectors() {
        let cosYaw = Math.cos(this.yaw);
        let sinYaw = Math.sin(this.yaw);
        let cosPitch = Math.cos(this.pitch);
        let sinPitch = Math.sin(this.pitch);

        // Forward Vector
        this.camDirection.x = cosPitch * sinYaw;
        this.camDirection.y = sinPitch;
        this.camDirection.z = -cosPitch * cosYaw;

        this.camDirection = Math3D.normalize(this.camDirection);
        // Right Vector
        let crossProduct = Math3D.crossProduct(this.camDirection, this.worldUp);
        let normalizedCross = Math3D.normalize(crossProduct);

        this.camRight.x = normalizedCross.x;
        this.camRight.y = normalizedCross.y;
        this.camRight.z = normalizedCross.z;

        // Up Vector
        this.camUp = Math3D.crossProduct(this.camRight, this.camDirection);
    }

    /**
     * Rotates the camera around the yaw axis.
     * @param {number} angle 
     * @returns {void}
     */
    rotateYaw(angle) {
        this.yaw += angle;
        this.updateCameraVectors();
    }

    /**
     * Rotates the camera around the pitch axis.
     * @param {number} angle 
     * @returns {void}
     */
    rotatePitch(angle) {
        this.pitch += angle;
        this.updateCameraVectors();
    }

    /**
     * Moves the camera right/left.
     * @param {number} dx 
     * @returns {void}
     */
    translateX(dx) {
        this.camPos.x += this.camRight.x * dx * this.camSpeed;
        this.camPos.y += this.camRight.y * dx * this.camSpeed;
        this.camPos.z += this.camRight.z * dx * this.camSpeed;
    }

    /**
     * Moves the camera up/down.
     * @param {number} dy 
     * @returns {void}
     */
    translateY(dy) {
        this.camPos.x += this.camUp.x * dy * this.camSpeed;
        this.camPos.y += this.camUp.y * dy * this.camSpeed;
        this.camPos.z += this.camUp.z * dy * this.camSpeed;
    }

    /**
     * Moves the camera forward/backward.
     * @param {number} dz 
     * @returns {void}
     */
    translateZ(dz) {
        this.camPos.x += this.camDirection.x * dz * this.camSpeed;
        this.camPos.y += this.camDirection.y * dz * this.camSpeed;
        this.camPos.z += this.camDirection.z * dz * this.camSpeed;
    }
}