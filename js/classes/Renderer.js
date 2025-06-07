/**
 * Handles projection and rendering of 3D primitives to 2D canvas.
 */
class Renderer {
    constructor(){ }

    /**
     * Projects a 3D point to 2D canvas coordinates.
     */
    renderPoint(camera, point) {
        let renderPoint = new Point3D(0, 0, 0);

        // Translate the point relative to the camera position
        renderPoint.x = point.x - camera.camPos.x;
        renderPoint.y = point.y - camera.camPos.y;
        renderPoint.z = point.z - camera.camPos.z;

        // Rotate the point based on the camera's yaw and pitch
        renderPoint = Math3D.rotateYaw(renderPoint, camera.yaw);
        renderPoint = Math3D.rotatePitch(renderPoint, camera.pitch);

        // Project the 3D point onto the 2D canvas
        let projectedPoint = this.projectPoint(renderPoint, camera.focalLength);
        return projectedPoint;
    }

    /**
     * Perspective projection of a 3D point.
     */
    projectPoint(point, focalLength = 500) {
        let projectedPoint = new Point3D(0, 0, 0);
        if (point.z === 0) point.z = 0.0001;
        if (point.z > 0) {
            return null; // Point is behind the camera
        }
        let nx = point.x / point.z;
        let ny = point.y / point.z;
        projectedPoint.x = nx * focalLength;
        projectedPoint.y = ny * focalLength;
        return projectedPoint;
    }

    /**
     * Renders a 3D line segment.
     */
    renderLine(ctx, camera, line) {
        let renderedStartPoint = this.renderPoint(camera, line.startPoint);
        let renderedEndPoint = this.renderPoint(camera, line.endPoint);
        if (renderedStartPoint == null || renderedEndPoint == null) {
            return;
        }
        ctx.beginPath();
        ctx.moveTo(renderedStartPoint.x, renderedStartPoint.y);
        ctx.lineTo(renderedEndPoint.x, renderedEndPoint.y);
        ctx.strokeStyle = line.colour;
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * Renders a triangle by projecting its vertices and filling it.
     */
    renderTriangle(ctx, camera, pointA, pointB, pointC, colour = 'black') {
        let projectedA = this.renderPoint(camera, pointA);
        let projectedB = this.renderPoint(camera, pointB);
        let projectedC = this.renderPoint(camera, pointC);

        if (projectedA == null || projectedB == null || projectedC == null) {
            return null;
        }
        if (projectedA.z < 0 || projectedB.z < 0 || projectedC.z < 0) {
            return null;
        }


        return new Triangle(projectedA, projectedB, projectedC, colour);
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