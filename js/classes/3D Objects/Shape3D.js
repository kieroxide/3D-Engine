/**
 * Represents a 3D shape composed of faces, edges, and vertices.
 */
class Shape3D {
    /**
     * @param {Shape2D[]} faces 
     * @param {Point3D[]} vertices 
     * @param {string[]} colour 
     */
    constructor(faces = [], vertices = [], colour = ['red', 'green', 'blue']) {
        this.faces = faces; 
        this.vertices = vertices;  
        this.colour = colour;
    }

    createCube(midpoint, size, colours){
        this.colours = colours;
        function generateVertices(midpoint, size){
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
            return v;
        }

        const faceDefs = [
            [0, 1, 2, 3], // back
            [4, 5, 6, 7], // front
            [0, 1, 5, 4], // bottom
            [2, 3, 7, 6], // top
            [1, 2, 6, 5], // right
            [0, 3, 7, 4]  // left
        ];

        this.vertices = generateVertices(midpoint, size);

        for (let i = 0; i < faceDefs.length; i++) {
            const [a, b, c, d] = faceDefs[i];
            const colour = colours[i % colours.length];

            const t1 = new Triangle(this.vertices[a], this.vertices[b], this.vertices[c], colour);
            const t2 = new Triangle(this.vertices[a], this.vertices[c], this.vertices[d], colour);

            const face = new Face([t1, t2], colour);
            this.faces.push(face);
        }
        this.vertices = v;
        return;
    }
    
}