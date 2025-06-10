/**
 * Represents a point in 3D space.
 * @class
 */
class Point3D {
    /**
     * Creates a Point3D instance.
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    scale(factor, position){
        this.x - position.x;
        this.y - position.y;
        this.z - position.z;

        this.x *= factor.x;
        this.y *= factor.y;
        this.z *= factor.z;

        this.x + position.x;
        this.y + position.y;
        this.z + position.z;
    }
    /**
     * Checks if all coordinates are non-null/non-undefined.
     * @returns {boolean} True if x, y, z are valid numbers.
     */
    exists() {
        if (this.x && this.y && this.z) {
            return true;
        } else {
            return false;
        }
    }
}