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

    // Camera setup
    let camera = new Camera(0, 0, 200);

    // Add a 3D cube to the scene
    let cube = new Shape3D().createCube(new Point3D(0, 0, -50), 100, ['red', 'green', 'blue']);
    scene.shapes.push(cube);
    window.addEventListener('resize', () => {
        resizeCanvas(canvas, ctx);
    });

    /**
     * Main animation loop. Handles controls, clears the canvas,
     * draws the scene and axes, and schedules the next frame.
     */
    function draw() {
        controls.CheckControls(camera);

        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        scene.draw(ctx, camera, renderer);

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
    resizeCanvas(canvas); // Initial size
    // Center the origin
    ctx.translate(canvas.width / 2, canvas.height / 2);
    return {canvas, ctx};
}


function resizeCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        ctx.translate(canvas.width / 2, canvas.height / 2); // Recenter
    }
}



main();