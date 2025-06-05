class Line{
    constructor(startPoint, endPoint, colour){
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.colour = colour;
    }

    draw(ctx, camera){
        ctx.beginPath();
        //  Translates the lines relative to the camera position
        ctx.moveTo(
            this.startPoint.x - camera.camPos.x,
            this.startPoint.y - camera.camPos.y
        );
        ctx.lineTo(
            this.endPoint.x - camera.camPos.x,
            this.endPoint.y - camera.camPos.y
        );
        ctx.strokeStyle = this.colour;
        ctx.stroke();
        ctx.closePath();
    }
}