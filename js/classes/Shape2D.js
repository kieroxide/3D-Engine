class Shape2D {
    constructor(vertices = [], edges = [], colour = 'black') {
        this.vertices = vertices;
        this.edges = edges;
        this.colour = colour;
    }

    render(ctx, camera, renderer) {
        renderer.renderShape2D(ctx, camera, this);
    }
    
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