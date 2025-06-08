class Face{
    constructor(triangles, colour){
        this.triangles = triangles;
        this.colour = colour;
        this.midpoint = null;
        this.midpointDistance = 0;
    }
    transform(camera){
        let transTriangles = [];
        for(const triangle of this.triangles){
            transTriangles.push(triangle.transform(camera));
        }
        return new Face(transTriangles, this.colour);
    }
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

    draw(ctx){
        for(const tri of this.triangles){
            tri.draw(ctx);
        }
    }

    getMidpoint(){
        let midpoint = new Point3D(0,0,0);
        for(const triangle of this.triangles){
            midpoint = Math3D.addPoints(midpoint, triangle.get_midpoint());
        }
        this.midpoint = Math3D.scalePoint(midpoint, (1/this.triangles.length));
        debugger;
    }

    getMidpointDistance(){
        this.getMidpoint();
        this.midpointDistance = Math.sqrt(
            this.midpoint.x ** 2 +
            this.midpoint.y ** 2 +
            this.midpoint.z ** 2
        )
        debugger;
    }
}