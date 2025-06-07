/**
 * Represents a scene containing shapes and lines.
 */
class Scene {
    constructor(){
        this.shapes = [];
        this.lines = [];
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
        for (let shape of this.shapes) {
            shape.render(ctx, camera, renderer);
        }
    }
}