class Renderer {
    constructor(){
        
    }

    renderPoint(camera, point) {
        let renderPoint = new Point3D(0, 0, 0);

        // Translate the point relative to the camera position
        renderPoint.x = point.x - camera.camPos.x;
        renderPoint.y = point.y - camera.camPos.y;
        renderPoint.z = point.z - camera.camPos.z;

        // Project the 3D point onto the 2D canvas
        let projectedPoint = this.projectPoint(renderPoint, camera.focalLength);
        
        return projectedPoint;
    }

    projectPoint(point, focalLength = 500) {
        let projectedPoint = new Point3D(0, 0, 0);
        // Avoid division by zero
        if (point.z === 0) point.z = 0.0001;

        let nx = point.x / point.z;
        let ny = point.y / point.z;

        projectedPoint.x = nx * focalLength;
        projectedPoint.y = ny * focalLength;
        // Perspective projection formula
        return projectedPoint;
}

    renderLine(ctx, camera, line) {
        let projectedStartPoint = this.renderPoint(camera, line.startPoint);
        let projectedEndPoint = this.renderPoint(camera, line.endPoint);
        ctx.beginPath();
        ctx.moveTo(projectedStartPoint.x, projectedStartPoint.y);
        ctx.lineTo(projectedEndPoint.x, projectedEndPoint.y);
        ctx.strokeStyle = line.colour;
        ctx.stroke();
        ctx.closePath();
    }

    renderTriangle(ctx, camera, pointA, pointB, pointC, colour = 'black') {
        let projectedA = this.renderPoint(camera, pointA);
        let projectedB = this.renderPoint(camera, pointB);
        let projectedC = this.renderPoint(camera, pointC);

        ctx.beginPath();
        ctx.moveTo(projectedA.x, projectedA.y);
        ctx.lineTo(projectedB.x, projectedB.y);
        ctx.lineTo(projectedC.x, projectedC.y);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
    }
}