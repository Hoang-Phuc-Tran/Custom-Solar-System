


https://github.com/Hoang-Phuc-Tran/Custom-Solar-System/assets/120700092/3a6ebe0d-846c-45bf-9939-6905906e2203


# 3D Solar System Model

## Overview
This project features a 3D model of a solar system created using p5.js's 3D functionality. It includes a simulation of planets orbiting a star and moons orbiting the planets, all rendered in a visually appealing, interactive 3D environment.

### Canvas
- The simulation is presented on a **700x700 canvas**.
- Viewed from above, with planets moving on the x/y plane and rotating/orbiting around the z-axis.

### Starfield
- The background is adorned with **100 randomly placed stars**, which can be white or colored, each with a size of 3.
- Stars maintain their positions each frame, considering WEBGL mode where the origin is the screen's center.

### The Sun
- A yellow sphere representing the sun sits at the solar system's center.
- The sun has a **radius of 30**.

### The Earth
- The default planet, Earth, is a textured sphere.
- It rotates around its own axis and orbits the sun.

### The Moon
- A single moon, textured and orbiting Earth, is included by default.
- The moon orbits Earth but does not spin on its axis.

### Additional Planets
- Users can add extra planets to the solar system through GUI elements.

### UI Elements
- Built using **DOM elements via p5.js APIs**.
- Placed to the right of the canvas.
- Includes inputs for star count, sliders for Earth's and Moon's distances, and rotation speeds.
- Additional GUI elements for creating new planets, allowing users to specify the planet's size, color, orbital speed, distance from the sun, and moon characteristics.
- Buttons are provided for removing the last custom planet, pausing rotation, and resetting the program.
- Custom planets are displayed as solid colored spheres using `ambientMaterial`.

### Customization
- Both text-based and GUI-based configurations are supported for adding new planets.
- Users are encouraged to experiment with different settings to create varied and dynamic solar systems.
