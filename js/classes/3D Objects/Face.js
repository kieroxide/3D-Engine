/**
 * Represents a face composed of triangles.
 * @class
 */
class Face{
    /**
     * Creates a Face instance.
     * @param {Array<Triangle>} triangles 
     * @param {string} colour 
     */
    constructor(triangles, colour){
        this.triangles = triangles;
        this.colour = colour;
        this.midpoint = null;
        this.midpointDistance = 0;
    }

    /**
     * Transforms all triangles in the face to camera space.
     * @param {Camera} camera 
     * @returns {Face}
     */
    transform(camera){
        let transTriangles = [];
        for(const triangle of this.triangles){
            transTriangles.push(triangle.transform(camera));
        }
        return new Face(transTriangles, this.colour);
    }

    /**
     * Projects all triangles in the face to 2D canvas coordinates.
     * @returns {Face}
     */
    project(){
        let projTriangles = [];
        for(const triangle of this.triangles){
            let tri = triangle.project();
            if(tri){
                projTriangles.push(tri);
            }
        }
        return new Face(projTriangles, this.colour);
    }

    /**
     * Draws all triangles in the face.
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {void}
     */
    draw(ctx){
        for(const tri of this.triangles){
            tri.draw(ctx);
        }
    }

    /**
     * Calculates and sets the midpoint of the face.
     * @returns {void}
     */
    getMidpoint(){
        let midpoint = new Point3D(0,0,0);
        for(const triangle of this.triangles){
            midpoint = Math3D.addPoints(midpoint, triangle.get_midpoint());
        }
        this.midpoint = Math3D.scalePoint(midpoint, (1/this.triangles.length));
    }
    
    /**
     * Calculates and sets the midpoint distance from the origin.
     * @returns {void}
     */
    getMidpointDistance(){
        this.getMidpoint();
        this.midpointDistance = Math.sqrt(
            this.midpoint.x ** 2 +
            this.midpoint.y ** 2 +
            this.midpoint.z ** 2
        )
    }
}