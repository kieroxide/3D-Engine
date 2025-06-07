/**
 * Handles projection and rendering of 3D primitives to 2D canvas.
 */
class Renderer {
    constructor(){ }

    /**
     * Transforms a 3D point from world space to camera/view space.
     */
    toCameraSpace(camera, point) {
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
     * Projects a 3D point in camera space to 2D canvas coordinates.
     */
    projectPoint(point, focalLength = 500) {
        if (point.z === 0) point.z = 0.0001;
        if (point.z > 0) return null; // Behind camera
        let nx = point.x / point.z;
        let ny = point.y / point.z;
        return new Point3D(nx * focalLength, ny * focalLength, point.z);
    }

    /**
     * Renders a 3D line segment.
     */
    renderLine(ctx, camera, line) {
        let startCam = this.toCameraSpace(camera, line.startPoint);
        let endCam = this.toCameraSpace(camera, line.endPoint);
        let startProj = this.projectPoint(startCam);
        let endProj = this.projectPoint(endCam);
        if (!startProj || !endProj) return;
        ctx.beginPath();
        ctx.moveTo(startProj.x, startProj.y);
        ctx.lineTo(endProj.x, endProj.y);
        ctx.strokeStyle = line.colour;
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * Transforms triangle vertices to camera space.
     */
    triangleToCameraSpace(camera,triangle) {
        return new Triangle(
            this.toCameraSpace(camera, triangle.pointA),
            this.toCameraSpace(camera, triangle.pointB),
            this.toCameraSpace(camera, triangle.pointC),
            triangle.colour
        );
    }

    /**
     * Projects triangle vertices from camera space to 2D.
     */
    projectTriangle(triangle) {
        return new Triangle(
        triangle.pointA.projectPoint(),
        triangle.pointB.projectPoint(),
        triangle.pointC.projectPoint()
        )
    }

    /**
     * Draws a triangle on the canvas.
     */
    drawTriangle(ctx, projA, projB, projC, colour = 'black') {
        if (!projA || !projB || !projC) return;
        ctx.beginPath();
        ctx.moveTo(projA.x, projA.y);
        ctx.lineTo(projB.x, projB.y);
        ctx.lineTo(projC.x, projC.y);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
    }

    drawTriangles(ctx, triangles) {
        for (let triangle of triangles) {
            ctx.beginPath();
            ctx.moveTo(triangle.pointA.x, triangle.pointA.y);
            ctx.lineTo(triangle.pointB.x, triangle.pointB.y);
            ctx.lineTo(triangle.pointC.x, triangle.pointC.y);
            ctx.closePath();
            ctx.fillStyle = triangle.colour;
            ctx.fill();
        }
    }
}