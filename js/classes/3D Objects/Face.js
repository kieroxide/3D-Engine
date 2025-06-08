class Face {
    constructor(triangles){
        this.triangles = triangles;
        this.midpoint;
        this.midpointDistance = 0;
        this.transformedTriangles;
        this.projectedTriangles;

    }

    getMidpoint(){
        let midpoint = new Point3D(0, 0, 0);
        for (const triangle in triangles){
            Math3D.addPoints(triangle.get_Midpoint(), midpoint);
        }
        midpoint = Math3D.scalePoint(midpoint, (1/this.triangles.length));
        this.midpoint = midpoint;
        return midpoint;
    }

    getMidpointDistance(){
        this.midpoint = this.get_Midpoint();
        this.midpointDistance = Math.sqrt(this.midpoint.x ** 2 + this.midpoint.y ** 2 + this.midpoint.y ** 2);
        return this.midpointDistance;
    }
}