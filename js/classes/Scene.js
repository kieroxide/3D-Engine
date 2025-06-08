/**
 * Represents a scene containing shapes and lines.
 */
class Scene {
    constructor(){
        this.shapes = [];
        this.lines = [];
        this.facesToRender = [];
        this.facesToDraw = [];
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
    draw(ctx, camera) {
        ctx.clearRect(-ctx.canvas.width / 2, -ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height);
        
        let triangles = this.getAllTriangles();
        let CamViewTriangles = [];
        //console.log(triangles);
        //gets Cam Space Triangles
        for(const face of faces){
            for (const triangle of faces.triangles){
                let cameraSpaceTriangle = Renderer.triangleToCameraSpace(triangle, camera);
                if(cameraSpaceTriangle){
                    CamViewTriangles.push(cameraSpaceTriangle);
                }
            }
        }
        //console.log(CamViewTriangles);

        Renderer.depthSort(CamViewTriangles);

        let CanvasTriangles = [];
        // gets Canvas space from triangles
        for (const triangle of CamViewTriangles){
            let canvasTriangle = Renderer.triangleTo2DCanvas(triangle);
            if(canvasTriangle) {
                CanvasTriangles.push(canvasTriangle);
            }
        }


        console.log(CanvasTriangles);
        //draws the Canvas Triangles to the canvas
        for (const triangle of CanvasTriangles){
            Renderer.draw(triangle, ctx);
        }
        
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