class Triangle{
    constructor(p1, p2, p3, colour){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.colour = colour;
    }
    transform(camera){
        return Renderer.triangleToCameraSpace(this, camera)
    }
    project(){
        let projTri = Renderer.triangleTo2DCanvas(this);
        if(projTri){
            return projTri;
        }
    }
    draw(ctx){
        Renderer.draw(this, ctx);
    }

    get_midpoint(){
        return new Point3D(
        (this.p1.x + this.p2.x + this.p3.x) / 3,
        (this.p1.y + this.p2.y + this.p3.y) / 3,
        (this.p1.z + this.p2.z + this.p3.z) / 3
        );
    }
}