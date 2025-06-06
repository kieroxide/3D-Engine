class Renderer {
    constructor(){ }

    renderPoint(camera, point) {
        let renderPoint = new Point3D(0, 0, 0);

        // Translate the point relative to the camera position
        renderPoint.x = point.x - camera.camPos.x;
        renderPoint.y = point.y - camera.camPos.y;
        renderPoint.z = point.z - camera.camPos.z;

        // Rotate the point based on the camera's yaw and pitch
        renderPoint = Math3D.rotateYaw(renderPoint, camera.yaw);
        
        // Project the 3D point onto the 2D canvas
        let projectedPoint = this.projectPoint(renderPoint, camera.focalLength);
        
        return projectedPoint;
    }

    projectPoint(point, focalLength = 500) {
        let projectedPoint = new Point3D(0, 0, 0);
        // Avoid division by zero
        if (point.z === 0) point.z = 0.0001;
        if (point.z > 0) {
            return null // Point is behind the camera, do not project
        }
        let nx = point.x / point.z;
        let ny = point.y / point.z;

        projectedPoint.x = nx * focalLength;
        projectedPoint.y = ny * focalLength;
        // Perspective projection formula
        return projectedPoint;
}

    renderLine(ctx, camera, line) {
        console.log(camera);
        let renderedStartPoint = this.renderPoint(camera, line.startPoint);
        let renderedEndPoint = this.renderPoint(camera, line.endPoint);
        if (renderedStartPoint == null || renderedEndPoint == null) {
            return; // Skip rendering if any point is behind the camera
        }
        console.log("here");
        ctx.beginPath();
        ctx.moveTo(renderedStartPoint.x, renderedStartPoint.y);
        ctx.lineTo(renderedEndPoint.x, renderedEndPoint.y);
        ctx.strokeStyle = line.colour;
        ctx.stroke();
        ctx.closePath();
    }

    renderTriangle(ctx, camera, pointA, pointB, pointC, colour = 'black') {
        let projectedA = this.renderPoint(camera, pointA);
        let projectedB = this.renderPoint(camera, pointB);
        let projectedC = this.renderPoint(camera, pointC);
        if (projectedA.z < 0 || projectedB.z < 0 || projectedC.z < 0) {
            return; // Skip rendering if any point is behind the camera
        }
        ctx.beginPath();
        ctx.moveTo(projectedA.x, projectedA.y);
        ctx.lineTo(projectedB.x, projectedB.y);
        ctx.lineTo(projectedC.x, projectedC.y);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
    }

    renderShape2D(ctx, camera, shape) {
        let triangles = shape.rasterize();
        for (let triangle of triangles) {
            triangle.render(ctx, camera, this);
        }
    }
}