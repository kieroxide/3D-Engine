/**
 * Represents a triangle defined by three 3D points and a colour.
 * @class
 */
class Triangle {
  /**
   * Creates an instance of a triangle.
   * @param {Object} p1 - The first vertex of the triangle.
   * @param {Object} p2 - The second vertex of the triangle.
   * @param {Object} p3 - The third vertex of the triangle.
   * @param {string} [colour="red"] - The colour of the triangle.
   */
  constructor(p1, p2, p3, colour = "red", outline = false) {
    this.p1 = p1; // Vertex
    this.p2 = p2;
    this.p3 = p3;
    this.colour = colour; 
    this.sortZ = 0;      // Used for painter's sort
    this.outline = outline;
  }
  scale(factor, position){
        this.p1.scale(factor, position);
        this.p2.scale(factor, position);
        this.p3.scale(factor, position);
  }
  /**
   * Checks if all vertices exist.
   * @returns {boolean} True if all three points exist.
   */
    exists(){
    let points = [this.p1, this.p2, this.p3];
    for(const point of points){
        if(!(point) || !(point.exists()) ){
            return false;
        }
    }
    return true;
  }

  /**
   * Computes the average Z for painter's algorithm sorting.
   * @returns {number} The computed average Z value.
   */
  computeSortZ() {
    this.sortZ = (this.p1.z + this.p2.z + this.p3.z) / 3;
    return this.sortZ;
  }

  /**
   * Calculates the surface normal vector of the triangle.
   * @returns {Vector3D} The normalized normal vector.
   */
  getNormal() {
    const a = this.v1.position.sub(this.v0.position);
    const b = this.v2.position.sub(this.v0.position);
    return a.cross(b).normalize();
  }

  /**
   * Computes the centroid of the triangle.
   * @returns {Point3D} The point at the triangle's centroid.
   */
  getCentroid() {
    return this.v0.position
      .add(this.v1.position)
      .add(this.v2.position)
      .div(3);
  }

}
