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
        this.averageZ = 0;
    }
    
    AverageZ() {
        return (this.pointA.z + this.pointB.z + this.pointC.z) / 3;
    }
}