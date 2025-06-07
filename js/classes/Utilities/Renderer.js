/**
 * Handles projection and rendering of 3D primitives to 2D canvas.
 */
class Renderer {
    constructor(){ }

    // Convert 3D point to Camera space
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

    // Convert Camera space to 2D canvas coordinates
    static toCanvasCoordinates(point, focalLength = 500) {
        if (point.z === 0) point.z = 0.0001;
        if (point.z > 0) return null; // Behind camera
        let nx = point.x / point.z;
        let ny = point.y / point.z;

        let cx = nx * focalLength;
        let cy = ny * focalLength;

        let newPoint = new Point3D(cx, cy, point.z) 
        //console.log(newPoint);
        return newPoint;
    }

    static triangleToCameraSpace(triangle, camera) {
        let Ctriangle = new Triangle();
        //console.log(triangle);
        Ctriangle.pointA = Renderer.toCameraSpace(triangle.pointA, camera);
        Ctriangle.pointB = Renderer.toCameraSpace(triangle.pointB, camera);
        Ctriangle.pointC = Renderer.toCameraSpace(triangle.pointC, camera);
        Ctriangle.colour = triangle.colour;

        return Ctriangle;
    }

    static triangleTo2DCanvas(camViewTriangle) {
        let canvasTriangle = new Triangle();
        canvasTriangle.pointA = Renderer.toCanvasCoordinates(camViewTriangle.pointA);
        canvasTriangle.pointB = Renderer.toCanvasCoordinates(camViewTriangle.pointB);
        canvasTriangle.pointC = Renderer.toCanvasCoordinates(camViewTriangle.pointC);
        canvasTriangle.colour = camViewTriangle.colour;
        return canvasTriangle;
    }

    static depthSort(triangles){
        //different values to sort by
        for (const triangle of triangles){
            triangle.averageZ();
            triangle.computeMinZ();
            triangle.midpointDistance();
        }
        //midpoint distance seems to be best for simple shapes
        triangles.sort((a, b) => {
        let diff = b.midDistance - a.midDistance;
        if (Math.abs(diff) < 0.001) return 0; // treat nearly equal distances as equal
        return diff;
        });
        return triangles;
    }
    static draw(triangle, ctx){
        ctx.beginPath();
        ctx.moveTo(triangle.pointA.x, triangle.pointA.y);   // First vertex (x1, y1)
        ctx.lineTo(triangle.pointB.x, triangle.pointB.y);  // Second vertex (x2, y2)
        ctx.lineTo(triangle.pointC.x, triangle.pointC.y);   // Third vertex (x3, y3)
        ctx.closePath();       // Closes the path back to the first vertex

        ctx.fillStyle = triangle.colour;  // Optional: fill color
        ctx.fill();              // Fill the triangle
    }
}