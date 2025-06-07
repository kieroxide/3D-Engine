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
    rasterize(colour = 'black') {
        let triangles = [];
        for(let i = 1; i < this.vertices.length - 1; i++) {
            triangles.push(new Triangle(
                this.vertices[0],
                this.vertices[i],
                this.vertices[i + 1],
                colour
            ));
        }
        return triangles;
    }
}