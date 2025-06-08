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
        
        //Transform Faces
        for( const shape in this.shapes){
            for (const face in shape.faces){
                for( const triangle in face.triangle){
                    face.transformedTriangles.push(Renderer.triangleToCameraSpace(triangle));
                }
            }
        }

        for(const shape in this.shapes){
            for(const face in shape.faces){
                face.getMidpointDistance();
            }
        }
        //Depth Sort Faces midpoint
        //Project Faces
        
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