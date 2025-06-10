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
        const triangles = [];
        for(const mesh of this.meshs) {
            triangles.push(...mesh.triangles);
        }
        let camViewTriangles = [];

        for (const triangle of triangles) {
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

    rayHitCheck(ctx, camera){
        const { origin, direction } = Renderer.castForwardRay(camera);
        let closest = Infinity, hit = null;
        for (const mesh of scene.meshs) {
          for (const tri of mesh.triangles) {
            const t = Math3D.intersectRayTriangle(origin, direction, tri.p1, tri.p2, tri.p3);
            if (t != null && t < closest) {
              closest = t;
              hit     = tri;
            }
          }
        }
        if (hit) {
          console.log('centre‐ray hit', hit, 'at', closest);
          // highlight or act on `hit`
        }
    }
}
