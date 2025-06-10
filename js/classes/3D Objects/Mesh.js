class Mesh {
  constructor(triangles = []) {
    this.triangles = triangles;
    this.position = new Point3D(0, 0, 0);
    this.rotation = new Point3D(0, 0, 0); // rotation in radians, Euler angles
    this.scale = new Point3D(1, 1, 1);
  }

  

}