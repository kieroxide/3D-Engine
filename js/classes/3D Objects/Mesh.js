/**
 * Represents a mesh composed of faces.
 * @class
 */
class Mesh{
    /**
     * Creates a Mesh instance.
     * @param {Array<Face>} faces 
     * @param {boolean} [wireframe=false] 
     * @param {boolean} [fill=true] 
     */
    constructor(faces = [], wireframe = false, fill = true){
        this.faces = faces;
        this.wireframe = wireframe;
        this.fill = fill;
        this.midpointDistance = 0;
    }

    /**
     * Transforms all faces in the mesh to camera space.
     * @param {Camera} camera 
     * @returns {Mesh}
     */
    transform(camera){
        let transFaces = [];
        for(const face of this.faces){
            transFaces.push(face.transform(camera));
        }
        return new Mesh(transFaces,this.wireframe, this.fill);
    }

    /**
     * Projects all faces in the mesh to 2D canvas coordinates.
     * @returns {Mesh}
     */
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

    /**
     * Draws all faces in the mesh.
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {void}
     */
    draw(ctx){
        for(const face of this.faces){
            face.draw(ctx);
        }
    }

    /**
     * Draws the outlines of all triangles in the mesh.
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {void}
     */
    drawTriangleOutline(ctx){
        for(const face of this.faces){
            for(const tri of face.triangles){
                tri.drawOutline(ctx)
            }
        }
    }

    /**
     * Sorts faces in the mesh by depth.
     * @returns {Mesh}
     */
    depthOrder(){
        const faces = this.faces;
        for(const face of faces){
            face.getMidpointDistance();
        }
        this.faces.sort((a,b) => b.midpointDistance - a.midpointDistance);
        return this;
    }
    
    /**
     * Gets all vertices in the mesh.
     * @returns {Array<Point3D>}
     */
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

    /**
     * Calculates and sets the midpoint distance for the mesh.
     * @returns {void}
     */
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