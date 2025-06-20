/**
 * Handles projection and rendering of 3D primitives to 2D canvas.
 * @class
 */
class Renderer {
    constructor(){ }

    /**
     * Converts a 3D point to camera space.
     * @param {Point3D} point - The 3D point.
     * @param {Camera} camera - The camera object.
     * @returns {Point3D} The point in camera space.
     */
    static toCameraSpace(point, camera) {
        let viewPoint = new Point3D(
            point.x - camera.camPos.x,
            point.y - camera.camPos.y,
            point.z - camera.camPos.z
        );

        viewPoint = Math3D.rotateYaw(viewPoint, camera.yaw);
        viewPoint = Math3D.rotatePitch(viewPoint, camera.pitch);

        return viewPoint;
    }

    /**
     * Converts a camera space point to 2D canvas coordinates.
     * @param {Point3D} point - The point in camera space.
     * @param {number} [focalLength=500] - Focal length for projection.
     * @returns {Point3D|null} The projected 2D point or null if behind camera.
     */
    static toCanvasCoordinates(point, focalLength = 500) {
        if (point.z > -0.0001) return null;
        let nx = point.x / point.z;
        let ny = point.y / point.z;

        let cx = nx * focalLength;
        let cy = ny * focalLength;

        let newPoint = new Point3D(cx, cy, point.z) 
        return newPoint;
    }

    /**
     * Converts a triangle to camera space.
     * @param {Triangle} triangle - The triangle to convert.
     * @param {Camera} camera - The camera object.
     * @returns {Triangle} The triangle in camera space.
     */
    static triangleToCameraSpace(triangle, camera) {
        let Ctriangle = new Triangle();
        Ctriangle.p1 = Renderer.toCameraSpace(triangle.p1, camera);
        Ctriangle.p2 = Renderer.toCameraSpace(triangle.p2, camera);
        Ctriangle.p3 = Renderer.toCameraSpace(triangle.p3, camera);
        Ctriangle.colour = triangle.colour;

        return Ctriangle;
    }

    /**
     * Converts a camera space triangle to 2D canvas coordinates.
     * @param {Triangle} camViewTriangle - The triangle in camera space.
     * @returns {Triangle|undefined} The projected triangle or undefined if invalid.
     */
    static triangleTo2DCanvas(camViewTriangle) {
        let canvasTriangle = new Triangle();
        canvasTriangle.p1 = Renderer.toCanvasCoordinates(camViewTriangle.p1);
        canvasTriangle.p2 = Renderer.toCanvasCoordinates(camViewTriangle.p2);
        canvasTriangle.p3 = Renderer.toCanvasCoordinates(camViewTriangle.p3);
        canvasTriangle.colour = camViewTriangle.colour;
        if(camViewTriangle.p1 && camViewTriangle.p2 && camViewTriangle.p3){
            return canvasTriangle;
        }
    }

    /**
     * Sorts faces by depth.
     * @param {Array<Face>} faces - Array of faces to sort.
     * @returns {void}
     */
    static depthSort(faces){
        for( const face in faces){
            face.getMidpointDistance();
        }
        faces.sort((a,b) => b.midpointDistance - a.midpointDistance);
    }

    /**
     * Draws a triangle on the canvas.
     * @param {Triangle} triangle - The triangle to draw.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     * @returns {void}
     */
    static draw(triangle, ctx){
        ctx.beginPath();
        ctx.strokeStyle = triangle.colour; // Set stroke color
        ctx.moveTo(triangle.p1.x, triangle.p1.y);
        ctx.lineTo(triangle.p2.x, triangle.p2.y);  // Second vertex (x2, y2)
        ctx.lineTo(triangle.p3.x, triangle.p3.y);   // Third vertex (x3, y3)
        ctx.closePath();       // Closes the path back to the first vertex
        ctx.fillStyle = triangle.colour; 
        ctx.fill();              // Fill the triangle
        ctx.stroke();            // Draw the outline of the triangle
    }

    /**
     * Removes null or invalid triangles from an array.
     * @param {Array<Triangle>} triangles - Array of triangles.
     * @returns {Array<Triangle>} Filtered array of valid triangles.
     */
    static cullTriangles(triangles) {
        return triangles.filter(tri =>
            tri &&
            tri.p1 && tri.p2 && tri.p3 &&
            tri.p1.x !== undefined && tri.p1.y !== undefined && tri.p1.z !== undefined &&
            tri.p2.x !== undefined && tri.p2.y !== undefined && tri.p2.z !== undefined &&
            tri.p3.x !== undefined && tri.p3.y !== undefined && tri.p3.z !== undefined
        );
    }
}