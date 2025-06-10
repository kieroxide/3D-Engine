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
    let camera = new Camera(0, 0, 400);


    let p1 = new Point3D(0,0, -400);
    let p2 = new Point3D(100,100,-400);
    let p3 = new Point3D(100,250,-400);

    let tri = new Triangle(p1, p2, p3);

    let pn1 = new Point3D(0,0, -500);
    let pn2 = new Point3D(100,100,-300);
    let pn3 = new Point3D(100,250,-500);

    let tri2 = new Triangle(pn1, pn2, pn3, 'blue');
    scene.meshs.push(new Mesh([tri,tri2]));

    async function init() {
        await Modeller.readObjectFile();
        Modeller.mesh.scale(new Point3D(500,500,500));
        scene.meshs.push(Modeller.mesh);
        console.log(Modeller.mesh);
    }
    init();


    //let physicsbox = new PhysicsBox(p1, 200);

    //let spinningCubes = []
    //spinningCubes.push(new Cube(new Point3D(300, 300, -1000), 100, 0));
    //spinningCubes.push(new Cube(new Point3D(-300, 300, -1000), 100, 0));

    //for(let i = 0; i < 50; i++) {
    //    physicsbox.addCube();
    //}

    //physicsbox.addToScene(scene);
    //for(const cube of spinningCubes){
    //    scene.meshs.push(cube.mesh);
    //}
    window.addEventListener('resize', () => {
        resizeCanvas(canvas, ctx);
    });

    /** 
     * Main animation loop. Handles controls, clears the canvas,
     * draws the scene and axes, and schedules the next frame.
     */
    function draw() {
        controls.CheckControls(camera, canvas);
        //physicsbox.update();

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
 * Resizes the canvas and centers the drawing context.
 * @param {HTMLCanvasElement} canvas - The canvas to resize.
 * @param {CanvasRenderingContext2D} ctx - The drawing context.
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

/**
 * Generates faces for a sphere mesh.
 * @param {number} radius - Sphere radius.
 * @param {number} latSegments - Number of latitude segments.
 * @param {number} lonSegments - Number of longitude segments.
 * @param {Array<string>} [colours=['red','green','blue']] - Colour cycle for faces.
 * @returns {Array<Face>} Array of Face instances making up the sphere.
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