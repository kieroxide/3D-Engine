/**
 * Manages and renders all meshes in the scene.
 * @class
 */
class Scene {
    /**
     * Creates a new Scene.
     * @returns {void}
     */
    constructor() {
        this.meshs = [];
    }

    /**
     * Draws all meshes in the scene onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     * @param {Camera} camera - The camera to project from.
     * @returns {void}
     */
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
                    Renderer.draw(canvasTriangle, ctx, mesh.outline);
                }

            }
        }
    }
}