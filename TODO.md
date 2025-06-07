# TODO LIST
-Add Depth Check for making sure draw order is correct
    -Will have to check Z coordinate
        -Using Camera View Z coordinates
        -Will be Before Projection
    -No culling for now 
    -Just order the triangle order in Scene for First->Lower Z, ... , last-> Closest to 0
    -Since they are 3 points for 1 triangle, A simple average z of the triangle will have to do
# Checked
-Store all triangles to be drawn in one array in the Scene Class. TICK