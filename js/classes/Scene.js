/**
 * Represents a scene containing shapes and lines.
 * @class
 */
class Scene {
    /**
     * Creates a Scene instance.
     */
    constructor(){
        this.meshs = [];
    }

    /**
     * Draws the scene.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Camera} camera 
     * @returns {void}
     */
    draw(ctx, camera){
        const meshs = this.meshs;
        // Tranform mesh to cameraSpace
        let transMeshs = [];
        for( const mesh of meshs){
            transMeshs.push(mesh.transform(camera));
        }

        this.depthOrder(transMeshs);
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
        // Separate mainBox mesh (assume it's always first in the array)
        let mainBoxMesh = projMeshs[0];
        let otherMeshes = projMeshs.slice(1);

        // Draw all other meshes first
        for(const mesh of otherMeshes){
            if(mesh.wireframe == true){
                mesh.drawTriangleOutline(ctx);
            }
            if(mesh.fill == true){
                mesh.draw(ctx);
            }
        }
        // Draw mainBox outline last
        if(mainBoxMesh && mainBoxMesh.wireframe == true){
            mainBoxMesh.drawTriangleOutline(ctx);
        }
    }

    /**
     * Sorts meshes in the scene by depth.
     * @param {Array<Mesh>} meshs 
     * @returns {Array<Mesh>}
     */
    depthOrder(meshs){
        // Calculate distances for all except the first mesh
        for(const mesh of meshs.slice(1)){
            mesh.calcMidpointDistance();
        }
        // Separate first mesh and the rest
        const first = meshs[0];
        const rest = meshs.slice(1);
        // Sort the rest
        rest.sort((a, b) => b.midpointDistance - a.midpointDistance);
        // Recombine
        meshs.splice(1, rest.length, ...rest);
        return meshs;
    }

    /**
     * Adds a cube to the scene.
     * @param {Point3D} midpoint 
     * @param {number} size 
     * @returns {void}
     */
    addCube(midpoint, size){
        const cube = new Cube(midpoint, size);
        this.meshs.push(cube);
    }
}