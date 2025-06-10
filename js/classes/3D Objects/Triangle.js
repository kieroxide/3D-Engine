class Triangle {
  constructor(p1, p2, p3, colour = "red") {
    this.p1 = p1; // Vertex
    this.p2 = p2;
    this.p3 = p3;
    this.colour = colour; 
    this.sortZ = 0;      // Used for painter's sort
  }

  // Compute average Z (or use maxZ for safer sorting)
  computeSortZ() {
    this.sortZ = (this.p1.z + this.p2.z + this.p3.z) / 3;
    return this.sortZ;
  }

  // Useful for basic normal calculation (for backface culling or lighting)
  getNormal() {
    const a = this.v1.position.sub(this.v0.position);
    const b = this.v2.position.sub(this.v0.position);
    return a.cross(b).normalize();
  }

  // Centroid can help with certain effects (like camera-facing billboards)
  getCentroid() {
    return this.v0.position
      .add(this.v1.position)
      .add(this.v2.position)
      .div(3);
  }

}
