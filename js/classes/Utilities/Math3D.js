/**
 * Utility class for 3D math operations.
 */
class Math3D {
    static dotProduct(a, b) {
        let xDot = a.x * b.x;
        let yDot = a.y * b.y;
        let zDot = a.z * b.z;
        return xDot + yDot + zDot;
    }

    static crossProduct(a, b) {
        let xCross = a.y * b.z - a.z * b.y;
        let yCross = a.z * b.x - a.x * b.z;
        let zCross = a.x * b.y - a.y * b.x;
        return new Point3D(xCross, yCross, zCross);
    }

    static normalize(vector) {
        let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
        if (length === 0) return new Point3D(0, 0, 0);
        return new Point3D(vector.x / length, vector.y / length, vector.z / length);
    }

    static rotateYaw(vector, angle) {
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);
        return new Point3D(
            vector.x * cosAngle - vector.z * sinAngle,
            vector.y,
            vector.x * sinAngle + vector.z * cosAngle
        );
    }
    static rotatePitch(vector, angle) {
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);
        return new Point3D(
            vector.x,
            vector.y * cosAngle - vector.z * sinAngle,
            vector.y * sinAngle + vector.z * cosAngle
        );
    }

    static addPoints(point1, point2){
        let sumPoint = new Point3D(0,0,0);
        sumPoint.x = point1.x + point2.x;
        sumPoint.y = point1.y + point2.y;
        sumPoint.z = point1.z + point2.z;
        return sumPoint;
    }

    static scalePoint(point, scale){
        let scaledPoint = new Point3D(0,0,0);
        scaledPoint.x = point.x * scale;
        scaledPoint.y = point.y * scale;
        scaledPoint.z = point.z * scale;
        return scaledPoint;
    }

    static findMidpoint(points){
        let midpoint = new point3D(0,0,0);
        for( const point of points){
            midpoint = Math3D.addPoints(point, midpoint);
        }
        midpoint = Math3D.scalePoint(midpoint, (1/points.length));
    }
}