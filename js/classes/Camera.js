class Camera {
    constructor(x, y, z, cameraSpeed = 1){
        this.camPos = new Point3D(x,y,z);
        this.camSpeed = cameraSpeed;
        this.camDirection = new Point3D(0, 0, -1); // Right handed coordinate system
        this.camUp = new Point3D(0, 1, 0); // Up vector
        this.camRight = new Point3D(1, 0, 0); // Right vector
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