/**
 * Represents a scene containing shapes and lines.
 */
class Scene {
    constructor(){
        this.meshs = [];
    }

    draw(ctx, camera){
        const meshs = this.meshs;
        // Tranform mesh to cameraSpace
        let transMeshs = [];
        for( const mesh of meshs){
            transMeshs.push(mesh.transform(camera));
        }

        for( const mesh of transMeshs){
            mesh.depthOrder();
        }
        let projMeshs = [];
        // Project mesh
        for( const mesh of transMeshs){
            let projMesh = mesh.project();
            for(const face of projMesh.faces){
                face.triangles = Renderer.cullTriangles(face.triangles);
            }
            projMeshs.push(projMesh);
        }
        //actual drawing
        for( const mesh of projMeshs){
            if(mesh.wireframe == true){
                mesh.drawTriangleOutline(ctx);
            }
            if(mesh.fill == true){
                mesh.draw(ctx);
            }
        }
    }

}