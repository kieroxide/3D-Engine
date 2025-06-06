class Triangle{
    constructor(pointA, pointB, pointC , colour = 'black') {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
        this.colour = colour;
    }

    render(ctx, camera, renderer) {
        renderer.renderTriangle(ctx, camera, this.pointA, this.pointB, this.pointC, this.colour);
    }
}