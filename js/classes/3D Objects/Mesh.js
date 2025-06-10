/**
 * Represents a mesh composed of triangles with position, rotation, and scale.
 * @class
 */
class Mesh {
    /**
     * Creates a Mesh.
     * @param {Triangle[]} triangles - Array of triangles making up the mesh.
     * @returns {void}
     */
    constructor(triangles = [], outline = true) {
        this.triangles = triangles;
        this.position = new Point3D(0, 0, 0);
        this.rotation = new Point3D(0, 0, 0); // rotation in radians, Euler angles
        this.meshScale = new Point3D(1, 1, 1);
        this.uniquePoints = this.getUniquePoints();
        this.outline = outline;
        this.updateOutlines();
    }
    updateOutlines(){
        for(const tri of this.triangles){
            tri.outline = this.outline;
        }
    }
    scale(factor) {
        this.uniquePoints = this.getUniquePoints();
        for(const point of this.uniquePoints){
            point.scale(factor, this.position);
        }
        console.log(this.triangles);
    }

    getUniquePoints(){
        const uniquePoints = new Set();
        for(const tri of this.triangles){
            uniquePoints.add(tri.p1);
            uniquePoints.add(tri.p2);
            uniquePoints.add(tri.p2);
        }
        console.log(uniquePoints);
        return uniquePoints;
    }
}