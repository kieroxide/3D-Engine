/**
 * Represents a 3D line segment with a color.
 */
class Line {
    /**
     * @param {Point3D} startPoint 
     * @param {Point3D} endPoint 
     * @param {string} colour 
     */
    constructor(startPoint, endPoint, colour) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.colour = colour;
    }
}