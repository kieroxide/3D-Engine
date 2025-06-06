function main() {
    let {canvas, ctx} = loadCanvas();
    
    let renderer = new Renderer();
    let scene = new Scene();

    let p1 = new Point3D(0, 0, -50);
    let p2 = new Point3D(50, 100, -50);
    let line1 = new Line(p1, p2, 'red');

    let camera = new Camera(0, 0, 0);

    scene.add2DShape([p1, p2, new Point3D(50, 50, -50)], []);
    scene.add2DShape([p1, p2, new Point3D(100, 0, -50), new Point3D(0, 100, -50)],0);

    function draw(){
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        //camera.translateCameraX(1);
        //camera.translateCameraY(1);
        //camera.translateCameraZ(1);
        camera.rotateYaw(0.01);

        renderer.renderLine(ctx, camera, line1);
        scene.draw(ctx, camera, renderer); 

        requestAnimationFrame(draw)
    }
    draw();
}

function loadCanvas() {
    let canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    let ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    return {canvas, ctx};
}
main();