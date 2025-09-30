# 3D Space Explorer 

An interactive 3D space visualization engine built from scratch using vanilla JavaScript and HTML5 Canvas. This project demonstrates 3D graphics programming fundamentals, including coordinate transformations, camera controls, and real-time rendering.

## 🎯 Overview
This project was one of my first ambitious programming efforts. Looking back, there are many things I would improve, such as adding matrix math, exploring WebAssembly for performance, and implementing an AST for more advanced depth sorting. Despite its limitations, this project was a great starting point and marked the beginning of my serious journey into programming and computer graphics.

This 3D engine allows you to explore and visualize 3D objects in a virtual space with smooth FPS-style controls. Built as a learning project to understand the mathematical foundations of 3D graphics programming.

## ✨ Features
- **Industry Standard Coordinate System**: Right-handed -Z coordinate system
- **Intuitive Controls**: WASD movement with mouse camera control (FPS-style)
- **Real-time Physics**: Physics simulation with collision detection
- **3D Objects**: Support for cubes
- **Lightweight Architecture**: Zero dependencies, pure vanilla JavaScript
- **Responsive Design**: Automatic canvas resizing and optimization

- **Educational Focus**

## 🎮 Controls
- **WASD**: Move camera forward/backward/left/right
- **Mouse**: Look around (FPS camera control)
- **Scroll**: Zoom in/out

## 🛠️ Technologies
- **JavaScript (ES6+)**: Core engine logic and object-oriented design
- **HTML5 Canvas**: 2D rendering context for 3D projection
- **Mathematical Libraries**: Custom 3D math utilities 
- **Git**: Version control and project management

## 🚀 Getting Started
1. Clone the repository
2. Open `index.html` in a modern web browser
3. Use WASD and mouse to explore the 3D space

## 📁 Project Structure
```
3D-Engine/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styling
└── js/
    ├── main.js         # Entry point and animation loop
    └── classes/        # Core engine classes
        ├── Camera.js
        ├── Controls.js
        ├── Scene.js
        └── 3D Objects/ # 3D geometry classes
```

## 🎓 Learning Objectives
This project demonstrates:
- 3D coordinate system mathematics
- Perspective projection algorithms
- Real-time rendering optimization
- Object-oriented JavaScript architecture
- Canvas API advanced usage

## 🔮 Future Enhancements
- Lighting and shading models
- Texture mapping
- Advanced physics interactions
- More complex 3D shapes
- Performance optimizations
- Matrix Math


## 📚 What I Learned
- Implementing 3D geometry from scratch, including cube mesh generation and face construction
- Writing custom 3D-to-2D projection and camera transformation logic
- Managing object-oriented JavaScript for 3D engines (classes for Mesh, Face, Triangle, Cube, PhysicsBox, etc.)
- Handling real-time animation, physics, and collision detection in JavaScript
- Building a rendering pipeline: transforming, projecting, sorting, and drawing 3D objects on a 2D canvas
- Responsive canvas resizing and high-DPI support

## 🧩 Challenges Faced
- Debugging visual artifacts (e.g., “weird corners” on cubes) due to projection math, vertex order, or face sorting
- Ensuring correct face winding and triangle construction for proper rendering
- Implementing robust collision detection and response for multiple moving cubes
- Maintaining performance with many objects and real-time updates
- Designing extensible code for adding new shapes and features

---
*Built by a Computer Science student as a learning project in 3D graphics programming*
