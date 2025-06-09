class Mesh{
    constructor(faces = [], wireframe = false, fill = true){
        this.faces = faces;
        this.wireframe = wireframe;
        this.fill = fill;
        this.midpointDistance = 0;
    }
    transform(camera){
        let transFaces = [];
        for(const face of this.faces){
            transFaces.push(face.transform(camera));
        }
        return new Mesh(transFaces,this.wireframe, this.fill);
    }
    project(){
        let projFaces = [];
        for(const face of this.faces){
            let projface = face.project()
            if (projface){
                projFaces.push(projface);
            }
        }
        return new Mesh(projFaces,this.wireframe, this.fill);  
    }

    draw(ctx){
        for(const face of this.faces){
            face.draw(ctx);
        }
    }

    drawTriangleOutline(ctx){
        for(const face of this.faces){
            for(const tri of face.triangles){
                tri.drawOutline(ctx)
            }
        }
    }
    depthOrder(){
        const faces = this.faces;
        for(const face of faces){
            face.getMidpointDistance();
        }
        this.faces.sort((a,b) => b.midpointDistance - a.midpointDistance);
        return this;
    }
    
    getVertices(){
        let vertices = [];
        for(const face of faces){
            for(const triangle of face.triangles){
                vertices.push(triangle.p1);
                vertices.push(triangle.p2);
                vertices.push(triangle.p3);
            }
        }
        return vertices;
    }

    calcMidpointDistance(){
        let midPoint = new Point3D(0, 0, 0);
        for(const face of this.faces){
            face.getMidpoint();
            midPoint = Math3D.addPoints(midPoint, face.midpoint);
        }
        midPoint= Math3D.scalePoint(midPoint, 1/this.faces.length);
        this.midpointDistance = Math.sqrt(
            midPoint.x ** 2 +
            midPoint.y ** 2 +
            midPoint.z ** 2
        )
    }
}