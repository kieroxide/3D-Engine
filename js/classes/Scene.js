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
        
        this.trianglesToCamView = this.getAllTriangles(); // Reset and get triangles to render
        this.trianglesToProject = [];

        
        for (let triangle of this.trianglesToCamView) {
            let CamViewTriangle = renderer.triangleToCameraSpace(ctx, camera, triangle);
            if(CamViewTriangle !== null && CamViewTriangle !== undefined) {
                this.trianglesToProject.push(CamViewTriangle);
            }
        }
        
        // Sort triangles by average Z value for depth sorting
        for (let triangle of this.trianglesToProject) {
            triangle.averageZ = triangle.AverageZ();
        }

        this.trianglesToProject.sort((a, b) => a.averageZ - b.averageZ);

        for (let triangle of this.trianglesToProject) {
            let projectedTriangle = renderer.projectTriangle(triangle);
            if (projectedTriangle) {
                this.trianglesToDraw.push(new Triangle(projectedTriangle[0], projectedTriangle[1], projectedTriangle[2], triangle.colour));
            }
        }
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