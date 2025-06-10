/**
 * Loads and parses .obj files into Mesh instances.
 * @class
 */
class Modeller {
    /**
     * Fetches and reads an OBJ file, then builds a mesh.
     * @returns {Promise<void>}
     */
    static async readObjectFile(){
        const response = await fetch('Models/Plane/Plane.obj');
        if (!response.ok) throw new Error('Network error');
        const objText = await response.text();
        const [vertices, faces] = Modeller.parseObjectData(objText);
        Modeller.mesh = Modeller.generateMesh(vertices, faces);
    }

    /**
     * Parses .obj text to extract vertices and faces.
     * @param {string} objText - Raw OBJ file content.
     * @returns {[Point3D[], number[][]]} Tuple of vertices array and face index arrays.
     */
    static parseObjectData(objText){
        const vertices = [];
        const faces = [];

        const lines = objText.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.length === 0 || trimmed.startsWith('#')) continue; // skip empty and comments

          const parts = trimmed.split(/\s+/);
          const prefix = parts[0];

          if (prefix === 'v') {
            // Vertex line: v x y z
            const x = parseFloat(parts[1]);
            const y = parseFloat(parts[2]);
            const z = parseFloat(parts[3]);
            const newPoint = new Point3D(x,y,z);
            vertices.push(newPoint);
          } else if (prefix === 'f') {
            // Face line: f v1 v2 v3 (each v could be '1', '1/2/3', etc.)
            // For simplicity, split by '/' and take only vertex indices:
            const faceVerts = parts.slice(1).map(part => {
              const idx = part.split('/')[0]; // get vertex index before '/'
              return parseInt(idx, 10);
            });
            faces.push(faceVerts);
          }
          // You can add vt, vn parsing similarly if needed
        }
        return [vertices, faces];
    }

    /**
     * Converts parsed vertices and faces into a Mesh of Triangles.
     * @param {Point3D[]} vertices - Array of 3D vertices.
     * @param {number[][]} faceIndices - Array of face vertex index triples.
     * @returns {Mesh} The constructed mesh.
     */
    static generateMesh(vertices, faceIndices){
        const triangles = [];
        for(const indices of faceIndices){
            const triangle = new Triangle(vertices[indices[0] - 1],vertices[indices[1] - 1],vertices[indices[2] - 1]);
            triangles.push(triangle);
        }
        const mesh = new Mesh(triangles, true);
        return mesh;
    }
}