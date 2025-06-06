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

    rotateYaw(angle) {
        this.yaw += angle;
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

    translateCameraX(dx) {
        this.camPos.x += dx * this.camSpeed;
    }

    translateCameraY(dy){
        this.camPos.y += dy * this.camSpeed;
    }

    translateCameraZ(dz){
        this.camPos.z += dz * this.camSpeed;
    }
}