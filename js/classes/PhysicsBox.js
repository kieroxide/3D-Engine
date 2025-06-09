class PhysicsBox {
    constructor(midpoint, size){
        this.midpoint = midpoint;
        this.size = size;
        
        this.mainBox = new Cube(midpoint, size, 0);
        this.mainBox.mesh.wireframe = true;
        this.mainBox.mesh.fill = false;
        
        this.cubes = [];
        this.gravity = -0.05;
    }

    update(){
        for(const cube of this.cubes){
            cube.boundaryCheck(this);
            cube.update();
        }
        this.collisionCheck();
    }
    collisionCheck(){
        for(const cube of this.cubes){
            for(const otherCube of this.cubes){
                if(cube !== otherCube){
                    cube.collisionCheck(otherCube);
                }
            }
        }
    }
    addCube(){
        let randomX = Math.random() * this.size - this.size / 2 + this.midpoint.x;
        let randomY = Math.random() * this.size - this.size / 2 + this.midpoint.y;
        let randomZ = Math.random() * this.size - this.size / 2 + this.midpoint.z;
        let point = new Point3D(randomX, randomY, randomZ);
        let cube = new Cube(point, 10, this.gravity);
        this.cubes.push(cube);
    }

    addToScene(scene){
        scene.meshs.push(this.mainBox.mesh);
        for(const cube of this.cubes){
            scene.meshs.push(cube.mesh);
        }
    }
}