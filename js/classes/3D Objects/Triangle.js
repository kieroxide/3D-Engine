/**
 * Represents a triangle defined by three 3D points and a color.
 */
class Triangle {
    /**
     * @param {Point3D} pointA 
     * @param {Point3D} pointB 
     * @param {Point3D} pointC 
     * @param {string} colour 
     */
    constructor(pointA, pointB, pointC , colour = 'black') {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
        this.colour = colour;
        this.avgZ = 0;
        this.minZ = 0;
        this.midpoint = new Point3D(0,0,0);;
        this.midDistance = 0;
        this.depthScore = 0;
    }
    
    averageZ() {
        this.avgZ = (this.pointA.z + this.pointB.z + this.pointC.z) / 3;
    }

    computeMinZ() {
        this.minZ = Math.min(this.pointA.z, this.pointB.z, this.pointC.z);
    }

    getMidpoint() {
        let mX = (this.pointA.x + this.pointB.x + this.pointC.x) / 3;
        let mY = (this.pointA.y + this.pointB.y + this.pointC.y) / 3;
        let mZ = (this.pointA.z + this.pointB.z + this.pointC.z) / 3;
        this.midpoint = new Point3D(mX, mY, mZ);
        console.log(this.midpoint);
    }
    midpointDistance() {
        this.getMidpoint();
        this.midDistance = Math.sqrt(
            this.midpoint.x ** 2 + this.midpoint.y ** 2 + this.midpoint.z ** 2
        );
    }
}