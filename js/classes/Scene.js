/**
 * Represents a scene containing shapes and lines.
 */
class Scene {
    constructor(){
        this.meshs = [];
    }

    draw(ctx, camera){
        const meshs = this.meshs;
        console.log(meshs);
        // Tranform mesh to cameraSpace
        let transMeshs = [];
        for( const mesh of meshs){
            transMeshs.push(mesh.transform(camera));
        }
        debugger;
        for( const mesh of transMeshs){
            mesh.depthOrder();
        }
        let projMesh = [];
        // Project mesh
        for( const mesh of transMeshs){
            projMesh.push(mesh.project());
        }
        debugger;
        //actual drawing
        for( const mesh of projMesh){
            mesh.draw(ctx);
        }
    }
}