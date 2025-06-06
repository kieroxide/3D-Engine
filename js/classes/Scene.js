class Scene {
    constructor(){
        this.shapes = [];
        this.lines = [];
    }

    add2DShape(vertices, edges, colour = 'black') {
        const shape = new Shape2D(vertices, edges);
        this.shapes.push(shape);
        return shape;
    }

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