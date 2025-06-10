/**
 * Utility class for 3D math operations.
 * @class
 */
class Math3D {
    /**
     * Calculates the dot product of two vectors.
     * @param {Point3D} a 
     * @param {Point3D} b 
     * @returns {number}
     */
    static dotProduct(a, b) {
        let xDot = a.x * b.x;
        let yDot = a.y * b.y;
        let zDot = a.z * b.z;
        return xDot + yDot + zDot;
    }

    /**
     * Calculates the cross product of two vectors.
     * @param {Point3D} a 
     * @param {Point3D} b 
     * @returns {Point3D}
     */
    static crossProduct(a, b) {
        let xCross = a.y * b.z - a.z * b.y;
        let yCross = a.z * b.x - a.x * b.z;
        let zCross = a.x * b.y - a.y * b.x;
        return new Point3D(xCross, yCross, zCross);
    }

    /**
     * Normalizes a vector.
     * @param {Point3D} vector 
     * @returns {Point3D}
     */
    static normalize(vector) {
        let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
        if (length === 0) return new Point3D(0, 0, 0);
        return new Point3D(vector.x / length, vector.y / length, vector.z / length);
    }

    /**
     * Rotates a vector around the yaw axis.
     * @param {Point3D} vector 
     * @param {number} angle 
     * @returns {Point3D}
     */
    static rotateYaw(vector, angle) {
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);
        return new Point3D(
            vector.x * cosAngle - vector.z * sinAngle,
            vector.y,
            vector.x * sinAngle + vector.z * cosAngle
        );
    }

    /**
     * Rotates a vector around the pitch axis.
     * @param {Point3D} vector 
     * @param {number} angle 
     * @returns {Point3D}
     */
    static rotatePitch(vector, angle) {
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);
        return new Point3D(
            vector.x,
            vector.y * cosAngle - vector.z * sinAngle,
            vector.y * sinAngle + vector.z * cosAngle
        );
    }

    /**
     * Adds two points.
     * @param {Point3D} point1 
     * @param {Point3D} point2 
     * @returns {Point3D}
     */
    static addPoints(point1, point2){
        let sumPoint = new Point3D(0,0,0);
        sumPoint.x = point1.x + point2.x;
        sumPoint.y = point1.y + point2.y;
        sumPoint.z = point1.z + point2.z;
        return sumPoint;
    }

    /**
     * Scales a point by a scalar.
     * @param {Point3D} point 
     * @param {number} scale 
     * @returns {Point3D}
     */
    static scalePoint(point, scale){
        let scaledPoint = new Point3D(0,0,0);
        scaledPoint.x = point.x * scale;
        scaledPoint.y = point.y * scale;
        scaledPoint.z = point.z * scale;
        return scaledPoint;
    }

    /**
     * Finds the midpoint of an array of points.
     * @param {Array<Point3D>} points 
     * @returns {Point3D}
     */
    static findMidpoint(points){
        let midpoint = new point3D(0,0,0);
        for( const point of points){
            midpoint = Math3D.addPoints(point, midpoint);
        }
        midpoint = Math3D.scalePoint(midpoint, (1/points.length));
        return midpoint;
    }

    /**
     * Subtracts vector b from a.
     * @param {Point3D} a 
     * @param {Point3D} b 
     * @returns {Point3D}
     */
    static sub(a, b) {
        return new Point3D(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    /**
     * Möller–Trumbore ray/triangle intersection test.
     * @param {Point3D} orig – Ray origin
     * @param {Point3D} dir  – Ray direction (normalized)
     * @param {Point3D} v0   – Triangle vertex 1
     * @param {Point3D} v1   – Triangle vertex 2
     * @param {Point3D} v2   – Triangle vertex 3
     * @returns {number|null} Distance t along the ray, or null if no hit
     */
    static intersectRayTriangle(orig, dir, v0, v1, v2) {
        const EPS = 1e-6;
        const edge1 = Math3D.sub(v1, v0);
        const edge2 = Math3D.sub(v2, v0);
        const pvec  = Math3D.crossProduct(dir, edge2);
        const det   = Math3D.dotProduct(edge1, pvec);
        if (Math.abs(det) < EPS) return null;
        const invDet = 1 / det;
        const tvec   = Math3D.sub(orig, v0);
        const u      = invDet * Math3D.dotProduct(tvec, pvec);
        if (u < 0 || u > 1) return null;
        const qvec = Math3D.crossProduct(tvec, edge1);
        const v    = invDet * Math3D.dotProduct(dir, qvec);
        if (v < 0 || u + v > 1) return null;
        const t = invDet * Math3D.dotProduct(edge2, qvec);
        return t > EPS ? t : null;
    }
}