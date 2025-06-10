class Scene {
    constructor() {
        this.meshs = [];
    }

    draw(ctx, camera) {
        for(const mesh of this.meshs) {
            let camViewTriangles = [];

            for (const triangle of mesh.triangles) {
                camViewTriangles.push(Renderer.triangleToCameraSpace(triangle, camera));
            }

            let orderedTriangles = Renderer.orderTriangles(camViewTriangles);

            for(const triangle of orderedTriangles){
                let canvasTriangle = Renderer.triangleTo2DCanvas(triangle);

                if (canvasTriangle) {
                    Renderer.draw(canvasTriangle, ctx);
                }

            }
        }
    }
}