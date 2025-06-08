class Ball{
    constructor(mesh, radius){
        this.mesh = mesh; 
        this.radius = radius;
        this.midpoint = Math3D.findMidpoint(mesh.getVertices());
    }

    

}