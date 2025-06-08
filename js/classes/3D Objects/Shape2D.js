/**
 * Represents a 2D shape (face) defined by vertices and edges.
 */
class Shape2D {
    /**
     * @param {Point3D[]} vertices 
     * @param {Array[]} edges 
     * @param {string} colour 
     */
    constructor(vertices = [], edges = [], colour = 'black') {
        this.vertices = vertices;
        this.edges = edges;
        this.colour = colour;
    }
 
    /**
     * Converts the shape into triangles for rasterization.
     * @param {string} colour 
     * @returns {Triangle[]}
     */
    
}