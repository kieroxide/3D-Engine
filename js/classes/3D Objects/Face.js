class Face {
    constructor(triangles){
        this.triangles = triangles;
        this.midpoint;
        this.midpointDistance = 0;
    }

    get_Midpoint(){
        let midpoint = new Point3D(0, 0, 0);
        for (const triangle in triangles){
            Math3D.addPoints(triangle.get_Midpoint(), midpoint);
        }
        midpoint = Math3D.scalePoint(midpoint, (1/this.triangles.length));
        this.midpoint = midpoint;
        return midpoint;
    }

    get_midpoint_distance(){
        this.midpoint = this.get_Midpoint();
        this.midpointDistance = Math.sqrt(this.midpoint.x ** 2 + this.midpoint.y ** 2 + this.midpoint.y ** 2);
        return this.midpointDistance;
    }
}