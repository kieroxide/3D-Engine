/**
 * Represents a 3D shape composed of faces, edges, and vertices.
 */
class Shape3D {
    /**
     * @param {Shape2D[]} faces 
     * @param {Array[]} edges 
     * @param {Point3D[]} vertices 
     * @param {string[]} colour 
     */
    constructor(faces = [], edges = [], vertices = [], colour = ['red', 'green', 'blue']) {
        this.faces = faces; 
        this.vertices = vertices;  
        this.edges = edges;
        this.colour = colour;
    }

    /**
     * Converts faces to triangles for rasterization.
     * @returns {Triangle[]}
     */
    rasterize() {
        let triangles = [];
        let colourInc = 0;
        for (const face of this.faces) {
            if (face.vertices.length < 3) continue;
            triangles = triangles.concat(face.rasterize(this.colour[colourInc]));
            colourInc = (colourInc + 1) % this.colour.length;
        }
        return triangles;
    }

    /**
     * Creates a cube centered at midpoint with given size.
     * @param {Point3D} midpoint 
     * @param {number} size 
     * @returns {Shape3D}
     */
    createCube(midpoint, size) {
        const halfSize = size / 2;
        const vertices = [
            new Point3D(midpoint.x - halfSize, midpoint.y - halfSize, midpoint.z - halfSize),
            new Point3D(midpoint.x + halfSize, midpoint.y - halfSize, midpoint.z - halfSize),
            new Point3D(midpoint.x + halfSize, midpoint.y + halfSize, midpoint.z - halfSize),
            new Point3D(midpoint.x - halfSize, midpoint.y + halfSize, midpoint.z - halfSize),
            new Point3D(midpoint.x - halfSize, midpoint.y - halfSize, midpoint.z + halfSize),
            new Point3D(midpoint.x + halfSize, midpoint.y - halfSize, midpoint.z + halfSize),
            new Point3D(midpoint.x + halfSize, midpoint.y + halfSize, midpoint.z + halfSize),
            new Point3D(midpoint.x - halfSize, midpoint.y + halfSize, midpoint.z + halfSize)
        ];
        
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];
        
        const faces = [
            new Shape2D([vertices[0], vertices[1], vertices[2], vertices[3]], edges.slice(0, 4)),
            new Shape2D([vertices[4], vertices[5], vertices[6], vertices[7]], edges.slice(4, 8)),
            new Shape2D([vertices[0], vertices[1], vertices[5], vertices[4]], edges.slice(8, 12)),
            new Shape2D([vertices[1], vertices[2], vertices[6], vertices[5]], edges.slice(12)),
            new Shape2D([vertices[2], vertices[3], vertices[7], vertices[6]], edges.slice(14)),
            new Shape2D([vertices[3], vertices[0], vertices[4], vertices[7]], edges.slice(16))
        ];
        
        this.faces = faces;
        this.vertices = vertices;
        this.edges = edges;
        return this;
    }
}