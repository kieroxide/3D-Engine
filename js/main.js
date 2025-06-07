/**
 * Main entry point for the 3D Space Explorer application.
 * Sets up the canvas, scene, camera, controls, and animation loop.
 */
function main() {
    // Initialize canvas and context
    let {canvas, ctx} = loadCanvas();

    // Core engine components
    let renderer = new Renderer();
    let scene = new Scene();
    let controls = new Controls();

    // Axis lines for reference
    let axis = [];

    let p1 = new Point3D(0, 0, 0);
    let p2 = new Point3D(100, 100, 100);

    axis.push(new Line(new Point3D(0, 0, -40), new Point3D(200, 0, -1), 'red'));
    axis.push(new Line(new Point3D(0, 0, -40), new Point3D(0, 200, -1), 'green'));
    axis.push(new Line(new Point3D(0, 0, -40), new Point3D(0, 0, -200), 'blue'));

    // Camera setup
    let camera = new Camera(0, 0, 200);

    // Example 2D shapes
    scene.add2DShape([p1, p2, new Point3D(50, 50, -50)], []);
    scene.add2DShape([p1, p2, new Point3D(100, 0, -50), new Point3D(0, 100, -50)], 0);

    // Add a 3D cube to the scene
    let cube = new Shape3D().createCube(new Point3D(0, 0, -50), 100, ['red', 'green', 'blue']);
    scene.shapes.push(cube);

    /**
     * Main animation loop. Handles controls, clears the canvas,
     * draws the scene and axes, and schedules the next frame.
     */
    function draw() {
        controls.CheckControls(camera);
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        scene.draw(ctx, camera, renderer);

        for (let l of axis) {
            renderer.renderLine(ctx, camera, l);
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/**
 * Loads the canvas element and returns its context.
 * @returns {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
 */
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

    // Center the origin
    ctx.translate(canvas.width / 2, canvas.height / 2);
    return {canvas, ctx};
}

main();