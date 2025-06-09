class Cube{
    constructor(midpoint, size, gravity){
        this.midpoint = midpoint;
        this.size = size;
        
        //physics
        this.gravity = gravity || -1; // Default gravity if not provided
        this.velocity = new Point3D(1,1,1);
        
        this.colours = [];
        for (let i = 0; i < 6; i++) {
            this.colours.push(`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`);
        }

        this.mesh = new Mesh(this.generateCubeVertices(this.midpoint, this.size, this.colours));
    }
    
    collisionCheck(otherCube) {
        const thisHalf = this.size / 2;
        const otherHalf = otherCube.size / 2;

        const dx = this.midpoint.x - otherCube.midpoint.x;
        const dy = this.midpoint.y - otherCube.midpoint.y;
        const dz = this.midpoint.z - otherCube.midpoint.z;

        const overlapX = thisHalf + otherHalf - Math.abs(dx);
        const overlapY = thisHalf + otherHalf - Math.abs(dy);
        const overlapZ = thisHalf + otherHalf - Math.abs(dz);

        // Only resolve if overlapping on all axes
        if (overlapX > 0 && overlapY > 0 && overlapZ > 0) {
            // 1. Compute collision normal (from otherCube to this cube)
            let nx = dx;
            let ny = dy;
            let nz = dz;
            let nLen = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
            nx /= nLen;
            ny /= nLen;
            nz /= nLen;

            // 2. Reflect velocity about the normal
            let vDotN = this.velocity.x*nx + this.velocity.y*ny + this.velocity.z*nz;
            this.velocity.x = this.velocity.x - 2 * vDotN * nx;
            this.velocity.y = this.velocity.y - 2 * vDotN * ny;
            this.velocity.z = this.velocity.z - 2 * vDotN * nz;

            // 3. Position correction: separate cubes along the normal
            const minOverlap = Math.min(overlapX, overlapY, overlapZ);
            const separation = (minOverlap / 2) + 0.01; // small epsilon to prevent sticking
            this.midpoint.x += nx * separation;
            this.midpoint.y += ny * separation;
            this.midpoint.z += nz * separation;
            otherCube.midpoint.x -= nx * separation;
            otherCube.midpoint.y -= ny * separation;
            otherCube.midpoint.z -= nz * separation;
        }
    }

    boundaryCheck(physicsBox) {
        const boxMid = physicsBox.midpoint;
        const boxHalf = physicsBox.size / 2;
        const cubeHalf = this.size / 2;

        // X axis
        if (this.midpoint.x - cubeHalf < boxMid.x - boxHalf) {
            this.midpoint.x = boxMid.x - boxHalf + cubeHalf;
            this.velocity.x *= -1;
        } else if (this.midpoint.x + cubeHalf > boxMid.x + boxHalf) {
            this.midpoint.x = boxMid.x + boxHalf - cubeHalf;
            this.velocity.x *= -1;
        }
        // Y axis
        if (this.midpoint.y - cubeHalf < boxMid.y - boxHalf) {
            this.midpoint.y = boxMid.y - boxHalf + cubeHalf;
            this.velocity.y *= -1;
        } else if (this.midpoint.y + cubeHalf > boxMid.y + boxHalf) {
            this.midpoint.y = boxMid.y + boxHalf - cubeHalf;
            this.velocity.y *= -1;
        }
        // Z axis
        if (this.midpoint.z - cubeHalf < boxMid.z - boxHalf) {
            this.midpoint.z = boxMid.z - boxHalf + cubeHalf;
            this.velocity.z *= -1;
        } else if (this.midpoint.z + cubeHalf > boxMid.z + boxHalf) {
            this.midpoint.z = boxMid.z + boxHalf - cubeHalf;
            this.velocity.z *= -1;
        }
    }

    generateCubeVertices(midpoint, size, colours = ['red', 'green', 'blue']){
        const h = size / 2;

        const v = [
            new Point3D(midpoint.x - h, midpoint.y - h, midpoint.z - h), // 0
            new Point3D(midpoint.x + h, midpoint.y - h, midpoint.z - h), // 1
            new Point3D(midpoint.x + h, midpoint.y + h, midpoint.z - h), // 2
            new Point3D(midpoint.x - h, midpoint.y + h, midpoint.z - h), // 3
            new Point3D(midpoint.x - h, midpoint.y - h, midpoint.z + h), // 4
            new Point3D(midpoint.x + h, midpoint.y - h, midpoint.z + h), // 5
            new Point3D(midpoint.x + h, midpoint.y + h, midpoint.z + h), // 6
            new Point3D(midpoint.x - h, midpoint.y + h, midpoint.z + h)  // 7
        ];

        const faceIndices = [
            [0, 1, 2, 3], // back
            [4, 5, 6, 7], // front
            [0, 1, 5, 4], // bottom
            [3, 2, 6, 7], // top
            [1, 2, 6, 5], // right
            [0, 3, 7, 4]  // left
        ];

        const faces = [];

        for (let i = 0; i < faceIndices.length; i++) {
            const [a, b, c, d] = faceIndices[i];
            const colour = this.colours[i];

            const tri1 = new Triangle(v[a], v[b], v[c], colour);
            const tri2 = new Triangle(v[a], v[c], v[d], colour);

            faces.push(new Face([tri1, tri2], colour));
        }

        return faces;
    }
    update(){
        this.velocity.y += this.gravity;
        // Apply velocity to position
        this.midpoint.x += this.velocity.x;
        this.midpoint.y += this.velocity.y;
        this.midpoint.z += this.velocity.z;
        this.regenerateCubeVertices();
    }
    translateY(dy){
        this.midpoint.y += dy;
    }

    regenerateCubeVertices(){
        const midpoint = this.midpoint;
        const colours = this.colours;
        const size = this.size;
        const h = size / 2;

        const v = [
            new Point3D(midpoint.x - h, midpoint.y - h, midpoint.z - h), // 0
            new Point3D(midpoint.x + h, midpoint.y - h, midpoint.z - h), // 1
            new Point3D(midpoint.x + h, midpoint.y + h, midpoint.z - h), // 2
            new Point3D(midpoint.x - h, midpoint.y + h, midpoint.z - h), // 3
            new Point3D(midpoint.x - h, midpoint.y - h, midpoint.z + h), // 4
            new Point3D(midpoint.x + h, midpoint.y - h, midpoint.z + h), // 5
            new Point3D(midpoint.x + h, midpoint.y + h, midpoint.z + h), // 6
            new Point3D(midpoint.x - h, midpoint.y + h, midpoint.z + h)  // 7
        ];

        const faceIndices = [
            [0, 1, 2, 3], // back
            [4, 5, 6, 7], // front
            [0, 1, 5, 4], // bottom
            [3, 2, 6, 7], // top
            [1, 2, 6, 5], // right
            [0, 3, 7, 4]  // left
        ];

        const faces = [];

        for (let i = 0; i < faceIndices.length; i++) {
            const [a, b, c, d] = faceIndices[i];
            const colour = this.colours[i];

            const tri1 = new Triangle(v[a], v[b], v[c], colour);
            const tri2 = new Triangle(v[a], v[c], v[d], colour);

            faces.push(new Face([tri1, tri2], colour));
        }

        this.mesh.faces = faces;
    }
}