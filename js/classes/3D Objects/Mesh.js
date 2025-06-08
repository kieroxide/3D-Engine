class Mesh{
    constructor(faces = []){
        this.faces = faces
    }
    transform(camera){
        let transFaces = [];
        for(const face of this.faces){
            transFaces.push(face.transform(camera));
        }
        return new Mesh(transFaces);
    }
    project(){
        let projFaces = [];
        for(const face of this.faces){
            let projface = face.project()
            if (face){
                projFaces.push(projface);
            }
        }
        return new Mesh(projFaces);  
    }

    draw(ctx){
        for(const face of this.faces){
            face.draw(ctx);
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
}