class Camera {
    constructor(x, y, z, cameraSpeed = 1){
        this.camPos = new Point3D(x,y,z);
        this.camSpeed = cameraSpeed;
        this.camDirection = new Point3D(0, 0, -1); // Right handed coordinate system
        this.camUp = new Point3D(0, 1, 0); // Up vector
        this.camRight = new Point3D(1, 0, 0); // Right vector
    }

    

    translateCameraX(dx) {
        return this.camPos.x + dx;
    }

    translateCameraY(dy){
        return this.camPos.y + dy;
    }

    translateCameraZ(dz){
        return this.camPos.z + dz;
    }
}