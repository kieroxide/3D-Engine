class Camera {
    constructor(x, y, z, cameraSpeed = 1){
        this.worldUp = new Point3D(0, 1, 0); // World up vector
        this.camPos = new Point3D(x,y,z);
        this.camSpeed = cameraSpeed;
        this.yaw = 0;
        this.pitch = 0;
        this.camDirection = new Point3D(0, 0, -1); // Right handed coordinate system
        this.camUp = new Point3D(0, 1, 0); // Up vector
        this.camRight = new Point3D(1, 0, 0); // Right vector
        this.focalLength = 500; // Focal length for perspective projection
    }

    updateCameraVectors() {
        let cosYaw = Math.cos(this.yaw);
        let sinYaw = Math.sin(this.yaw);
        let cosPitch = Math.cos(this.pitch);
        let sinPitch = Math.sin(this.pitch);

        // Forward Vector
        this.camDirection.x = cosPitch * sinYaw;
        this.camDirection.y = sinPitch;
        this.camDirection.z = cosPitch * cosYaw;

        // Right Vector
        let crossProduct = Math3D.crossProduct(this.camDirection, this.worldUp);
        let normalizedCross = Math3D.normalize(crossProduct);

        this.camRight.x = normalizedCross.x;
        this.camRight.y = normalizedCross.y;
        this.camRight.z = normalizedCross.z;

        // Up Vector
        this.camUp = Math3D.crossProduct(this.camRight, this.camDirection);
    }

    rotateYaw(angle) {
        this.yaw += angle;
        this.updateCameraVectors();
    }

    rotatePitch(angle) {
        this.pitch += angle;
        this.updateCameraVectors();
    }

    translateX(dx) {
        // Move right/left
        this.camPos.x += this.camRight.x * dx * this.camSpeed;
        this.camPos.y += this.camRight.y * dx * this.camSpeed;
        this.camPos.z += this.camRight.z * dx * this.camSpeed;
    }

    translateY(dy) {
        // Move up/down
        this.camPos.x += this.camUp.x * dy * this.camSpeed;
        this.camPos.y += this.camUp.y * dy * this.camSpeed;
        this.camPos.z += this.camUp.z * dy * this.camSpeed;
    }

    translateZ(dz) {
        // Move forward/backward
        this.camPos.x += this.camDirection.x * dz * this.camSpeed;
        this.camPos.y += this.camDirection.y * dz * this.camSpeed;
        this.camPos.z += this.camDirection.z * dz * this.camSpeed;
    }
}