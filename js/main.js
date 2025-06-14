/**
 * Main entry point for the 3D Space Explorer application.
 * Sets up the canvas, scene, camera, controls, and animation loop.
 * @returns {void}
 */
function main() {
    // Initialize canvas and context
    let {canvas, ctx} = loadCanvas();

    // Core engine components
    let scene = new Scene();
    let controls = new Controls();

    // Camera setup
    let camera = new Camera(0, 0, 0);


    let p1 = new Point3D(0,0, -400);
    let physicsbox = new PhysicsBox(p1, 200);

    let spinningCubes = []
    spinningCubes.push(new Cube(new Point3D(300, 300, -1000), 100, 0));
    spinningCubes.push(new Cube(new Point3D(-300, 300, -1000), 100, 0));

    for(let i = 0; i < 50; i++) {
        physicsbox.addCube();
    }

    physicsbox.addToScene(scene);
    for(const cube of spinningCubes){
        scene.meshs.push(cube.mesh);
    }
    window.addEventListener('resize', () => {
        resizeCanvas(canvas, ctx);
    });

    /** 
     * Main animation loop. Handles controls, clears the canvas,
     * draws the scene and axes, and schedules the next frame.
     */
    function draw() {
        controls.CheckControls(camera, canvas);
        physicsbox.update();

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
    resizeCanvas(canvas, ctx); 
    ctx.foc
    return {canvas, ctx};
}

/**
 * Resizes the canvas and sets up the context transform.
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @returns {void}
 */
function resizeCanvas(canvas, ctx) {
    let size = Math.min(window.innerHeight, window.innerWidth);
    const margin = 60;
    size -= margin;
    canvas.width = size;
    canvas.height = size;

    if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        ctx.translate(canvas.width / 2, canvas.height / 2);
    }
}



// Assuming Point3D, Triangle, Face classes exist as in your cube code

/**
 * Generates faces for a sphere mesh.
 * @param {number} radius 
 * @param {number} latSegments 
 * @param {number} lonSegments 
 * @param {Array<string>} colours 
 * @returns {Array<Face>}
 */
function generateSphereFaces(radius, latSegments, lonSegments, colours = ['red', 'green', 'blue']) {
    const vertices = [];
    const faces = [];

    // Generate vertices as Point3D
    for (let lat = 0; lat <= latSegments; lat++) {
        let theta = (lat * Math.PI) / latSegments;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);

        for (let lon = 0; lon <= lonSegments; lon++) {
            let phi = (lon * 2 * Math.PI) / lonSegments;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            let x = radius * sinTheta * cosPhi;
            let y = radius * cosTheta;
            let z = radius * sinTheta * sinPhi;

            vertices.push(new Point3D(x, y, z));
        }
    }

    // Generate faces as pairs of triangles
    for (let lat = 0; lat < latSegments; lat++) {
        for (let lon = 0; lon < lonSegments; lon++) {
            let first = lat * (lonSegments + 1) + lon;
            let second = first + lonSegments + 1;

            const colour = colours[(lat * lonSegments + lon) % colours.length];

            const tri1 = new Triangle(vertices[first], vertices[second], vertices[first + 1], colour);
            const tri2 = new Triangle(vertices[second], vertices[second + 1], vertices[first + 1], colour);

            faces.push(new Face([tri1, tri2], colour));
        }
    }

    return faces;
}

main();