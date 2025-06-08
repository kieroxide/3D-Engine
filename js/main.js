/**
 * Main entry point for the 3D Space Explorer application.
 * Sets up the canvas, scene, camera, controls, and animation loop.
 */
function main() {
    // Initialize canvas and context
    let {canvas, ctx} = loadCanvas();

    // Core engine components
    let scene = new Scene();
    let controls = new Controls();

    // Camera setup
    let camera = new Camera(0, 0, 200);

    let cubeMidpoint = new Point3D(0,0,0);
    let cubeColours = ['red', 'green', 'blue', 'orange'];
    let cube = new Mesh(generateCubeVertices(cubeMidpoint, 100, cubeColours));
    scene.meshs.push(cube);

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
        scene.draw(ctx, camera);

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


function generateCubeVertices(midpoint, size, colours = ['red', 'green', 'blue']){
    const h = size / 2;

    const v = [
        new Point3D(midpoint.x - h, midpoint.y - h, midpoint.z - h), // 0
        new Point3D(midpoint.x + h, midpoint.y - h, midpoint.z - h), // 1
        new Point3D(midpoint.x + h, midpoint.y + h, midpoint.z - h), // 2
        new Point3D(midpoint.x - h, midpoint.y + h, midpoint.z - h), // 3
        new Point3D(midpoint.x - h, midpoint.y - h, midpoint.z + h), // 4
        new Point3D(midpoint.x + h, midpoint.y - h, midpoint.z + h), // 5
        new Point3D(midpoint.x + h, midpoint.y + h, midpoint.z + h), // 6
        new Point3D(midpoint.x - h, midpoint.y + h, midpoint.z + h)  // 7
    ];

    const faceIndices = [
        [0, 1, 2, 3], // back
        [4, 5, 6, 7], // front
        [0, 1, 5, 4], // bottom
        [3, 2, 6, 7], // top
        [1, 2, 6, 5], // right
        [0, 3, 7, 4]  // left
    ];

    const faces = [];

    for (let i = 0; i < faceIndices.length; i++) {
        const [a, b, c, d] = faceIndices[i];
        const colour = colours[i % colours.length];

        const tri1 = new Triangle(v[a], v[b], v[c], colour);
        const tri2 = new Triangle(v[a], v[c], v[d], colour);

        faces.push(new Face([tri1, tri2], colour));
    }

    return faces;
}

main();