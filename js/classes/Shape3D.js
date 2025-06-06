class Shape3D{
    constructor(faces = [], edges = [], vertices = []) {
        this.faces = faces; 
        this.vertices = vertices;  
        this.edges = edges;
    }
    rasterize() {
        // Will have Duplicate triangles if faces share vertices
        let triangles = [];
        for (const face of this.faces) {
            if (face.length < 3) continue; // Skip faces with less than 3 vertices
            for (let i = 1; i < face.length - 1; i++) {
                triangles.push(face.rasterize());
            }
        }
        return triangles;
    }
}