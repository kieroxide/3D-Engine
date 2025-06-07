class Shape3D{
    constructor(faces = [], edges = [], vertices = [], colour = ['red', 'green', 'blue']) {
        this.faces = faces; 
        this.vertices = vertices;  
        this.edges = edges;
        this.colour = colour;
    }
    rasterize() {
        let triangles = [];
        let colourInc = 0;
        for (const face of this.faces) {
            if (face.vertices.length < 3) continue;
            triangles = triangles.concat(face.rasterize(this.colour[colourInc]));
            colourInc = (colourInc + 1) % this.colour.length; // Cycle through colours
        }
        return triangles;
    }

    render(ctx, camera, renderer) {
        if (!this.faces || this.faces.length === 0) {
            console.warn("No faces to render in Shape3D");
            return;
        }
        let triangles = this.rasterize();
        for (const triangle of triangles) {
            triangle.render(ctx, camera, renderer);
        }
   }

    renderTriangle(ctx, camera, pointA, pointB, pointC, colour = 'black') {
        let projectedA = this.renderPoint(camera, pointA);
        let projectedB = this.renderPoint(camera, pointB);
        let projectedC = this.renderPoint(camera, pointC);
        if (projectedA == null || projectedB == null || projectedC == null) {
            return; // Skip rendering if any point is behind the camera
        }
        ctx.beginPath();
        ctx.moveTo(projectedA.x, projectedA.y);
        ctx.lineTo(projectedB.x, projectedB.y);
        ctx.lineTo(projectedC.x, projectedC.y);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
    }

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