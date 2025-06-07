/**
 * Represents a scene containing shapes and lines.
 */
class Scene {
    constructor(){
        this.shapes = [];
        this.lines = [];
        this.trianglesToRender = [];
        this.trianglesToDraw = [];
    }

    /**
     * Adds a 2D shape to the scene.
     */
    add2DShape(vertices, edges, colour = 'black') {
        const shape = new Shape2D(vertices, edges);
        this.shapes.push(shape);
        return shape;
    }
    
    /**
     * Adds a 3D shape to the scene.
     */
    add3DShape(faces, edges, vertices) {
        const shape = new Shape3D(faces, edges, vertices);
        this.shapes.push(shape);
        return shape;
    }

    /**
     * Draws all shapes and lines in the scene.
     */
    draw(ctx, camera, renderer) {
        ctx.clearRect(-ctx.canvas.width / 2, -ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height);
        for (let line of this.lines) {
            line.render(ctx, camera, renderer);
        }
        this.trianglesToRender = this.getAllTriangles(); // Reset and get triangles to render
        this.trianglesToDraw = [];
        console.log("Triangles to Render:", this.trianglesToRender.length);

        for (let triangle of this.trianglesToRender) {
            let renderedTriangle = triangle.render(ctx, camera, renderer);
            if(renderedTriangle !== null && renderedTriangle !== undefined) {
                this.trianglesToDraw.push(renderedTriangle);
            }
        }
        
        console.log("Triangles to Draw:", this.trianglesToDraw.length);
        renderer.drawTriangles(ctx, this.trianglesToDraw);
    }

    /**
     * Returns a flat array of all triangles rasterized from all shapes in the scene.
     * @returns {Triangle[]}
     */
    getAllTriangles() {
        let allTriangles = [];
        for (let shape of this.shapes) {
                const triangles = shape.rasterize();
                if (Array.isArray(triangles) && triangles.length > 0) {
                    allTriangles.push(...triangles);
                }
        }
        return allTriangles;
    }
}