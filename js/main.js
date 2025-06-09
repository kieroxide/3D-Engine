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

    let cubeMidpoint = new Point3D(0, 0, 0);
    let cubeColours = ['red', 'green', 'blue', 'orange', 'purple', 'cyan'];
    let cube = new Mesh(generateCubeVertices(cubeMidpoint, 100, cubeColours));
    console.log(cube);
    let sphereFaces = generateSphereFaces(500, 10, 10, ['red']);
    let sphere = new Mesh(sphereFaces)

    let worldBoxMidpoint = new Point3D(0, 0, 0);
    let worldBoxSize = 40; // Large enough to enclose your scene
    let worldBoxColours = ['rgba(0,0,255,0.03)']; // More transparent

    let worldBox = new Mesh(generateCubeVertices(worldBoxMidpoint, worldBoxSize, worldBoxColours));
    //scene.meshs.push(sphere);

    cube.fill = true;
    worldBox.wireframe = true;

    scene.meshs.push(cube);
    scene.meshs.push(worldBox);
    
    window.addEventListener('resize', () => {
        resizeCanvas(canvas, ctx);
    });

    /** 
     * Main animation loop. Handles controls, clears the canvas,
     * draws the scene and axes, and schedules the next frame.
     */
    function draw() {
        controls.CheckControls(camera);
        console.log(camera);
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
    return {canvas, ctx};
}


function resizeCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        ctx.translate(canvas.width / 2, canvas.height / 2);
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

// Assuming Point3D, Triangle, Face classes exist as in your cube code

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