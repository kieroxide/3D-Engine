/**
 * Represents a triangle in 3D space.
 * @class
 */
class Triangle{
    /**
     * Creates a Triangle instance.
     * @param {Point3D} p1 
     * @param {Point3D} p2 
     * @param {Point3D} p3 
     * @param {string} colour 
     */
    constructor(p1, p2, p3, colour){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.colour = colour;
    }

    /**
     * Transforms the triangle to camera space.
     * @param {Camera} camera 
     * @returns {Triangle}
     */
    transform(camera){
        return Renderer.triangleToCameraSpace(this, camera)
    }

    /**
     * Projects the triangle to 2D canvas coordinates.
     * @returns {Triangle|undefined}
     */
    project(){
        let projTri = Renderer.triangleTo2DCanvas(this);
        if(projTri){
            return projTri;
        }
    }

    /**
     * Draws the triangle on the canvas.
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {void}
     */
    draw(ctx){
        Renderer.draw(this, ctx);
    }

    /**
     * Draws the outline of the triangle.
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {void}
     */
    drawOutline(ctx){
        ctx.beginPath();
        ctx.strokeStyle = 'black';  // set line color to black
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.lineTo(this.p3.x, this.p3.y);
        ctx.closePath();
        ctx.stroke();
    }

    /**
     * Gets the midpoint of the triangle.
     * @returns {Point3D}
     */
    get_midpoint(){
        return new Point3D(
        (this.p1.x + this.p2.x + this.p3.x) / 3,
        (this.p1.y + this.p2.y + this.p3.y) / 3,
        (this.p1.z + this.p2.z + this.p3.z) / 3
        );
    }
}