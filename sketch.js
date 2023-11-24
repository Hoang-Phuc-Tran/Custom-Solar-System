const TOTAL_STARS = 100;
const EARTH_SPIN_SPEED_DEFAULT = 0.01;
const EARTH_TRAVEL_SPEED_DEFAULT = 0.01;
const LUNAR_ORBIT_SPEED_DEFAULT = 0.02;
const EARTH_SUN_DISTANCE_DEFAULT = 150;
const EARTH_SPIN_SPEED_INITIAL = 0.01;
const MOON_EARTH_DISTANCE_DEFAULT = 45;
const MOON_TRAVEL_SPEED_INITIAL = 0.02;
const PLANET_DIAMETER_DEFAULT = 30;
const ORBITAL_VELOCITY_DEFAULT = 0.01;
const SUN_DISTANCE_PLANET_DEFAULT = 200;
const SATELLITE_DISTANCE_DEFAULT = 45;
const SATELLITE_SPEED_DEFAULT = 0.02;
const SATELLITE_DIAMETER_DEFAULT = 10;
const VALUE_ZERO = 0;
const MAX_RANGE_COLOR = 255;

let celestialStars = [];
let starCount = TOTAL_STARS;
let textureEarth, textureMoon;
let colorSun;
let earthRotation = VALUE_ZERO; // Earth's spin on its Y-axis
let earthOrbitAngle = VALUE_ZERO; // Earth's orbit around the Z-axis
let moonOrbitAngle = VALUE_ZERO; // Moon's orbit around the Earth on the X/Y plane
let earthRotationSpeed = EARTH_SPIN_SPEED_DEFAULT;
let earthOrbitSpeed = EARTH_TRAVEL_SPEED_DEFAULT; // Slower orbit speed for a more visible effect
let moonOrbitSpeed = LUNAR_ORBIT_SPEED_DEFAULT;
let inputStarCount, buttonUpdateStar;
let earthDistanceSlider, earthRotationSpeedSlider, moonDistanceSlider, moonOrbitSpeedSlider;
let planetSizeSlider, planetColorPicker, planetSpeedSlider, planetDistanceSlider;
let moonCheckbox, moonDistancePlanetSlider, moonSpeedSlider, moonSizeSlider;
let planets = [];
let flagPause = false;
let removePlanetButton, pauseButton, resetButton, addPlanetButton;

function preload() {
  textureEarth = loadImage("assets/earth_daymap.jpg");
  textureMoon = loadImage("assets/moon.jpg");
}

function setup() {
  createCanvas(700, 700, WEBGL);
  colorSun = color(255, 204, VALUE_ZERO); // Yellow color for the sun

  // Layout column positions
  let col1X = 720; // X position for the first column
  let col2X = col1X + 250; // X position for the second column, adjust the value as needed
  let startY = 10; // Starting Y position for the GUI elements
  let gapY = 17; // Vertical gap between GUI elements

  /// Title for the Earth and Moon GUI
  let earthMoonTitle = createDiv("GUI for the Earth and Moon");
  earthMoonTitle.position(col1X, startY);
  earthMoonTitle.style("color", "black"); // Set text color to white
  earthMoonTitle.style("font-size", "16px"); // Set font size

  /// Title for the Earth and Moon GUI
  let guiTitle = createDiv("GUI for Custom planets");
  guiTitle.position(col2X, startY);
  guiTitle.style("color", "black"); // Set text color to white
  guiTitle.style("font-size", "16px"); // Set font size

  startY += 30; // Adjust startY to position elements below the title
  // Generate the initial star positions
  generateStars(starCount);

  // Create the input for the number of celestialStars
  inputStarCount = createInput(starCount.toString());
  inputStarCount.position(col1X, startY); // Place it to the right of the canvas
  buttonUpdateStar = createButton("Update Stars");
  buttonUpdateStar.position(inputStarCount.x, inputStarCount.y + inputStarCount.height + 5);
  buttonUpdateStar.mousePressed(updateStars);

  // Slider and label for Earth's distance from the sun
  createDiv("Earth Distance from Sun").position(
    col1X,
    buttonUpdateStar.y + buttonUpdateStar.height + gapY
  );
  earthDistanceSlider = createSlider(50, 300, EARTH_SUN_DISTANCE_DEFAULT);
  earthDistanceSlider.position(col1X, buttonUpdateStar.y + buttonUpdateStar.height + gapY * 2);

  // Slider and label for Earth's rotation speed
  createDiv("Earth Rotation Speed").position(
    col1X,
    earthDistanceSlider.y + earthDistanceSlider.height + gapY
  );
  earthRotationSpeedSlider = createSlider(VALUE_ZERO, 0.05, EARTH_SPIN_SPEED_INITIAL, 0.001);
  earthRotationSpeedSlider.position(
    col1X,
    earthDistanceSlider.y + earthDistanceSlider.height + gapY * 2
  );

  // Slider and label for Moon's distance from the Earth
  createDiv("Moon Distance from Earth").position(
    col1X,
    earthRotationSpeedSlider.y + earthRotationSpeedSlider.height + gapY
  );
  moonDistanceSlider = createSlider(20, 100, MOON_EARTH_DISTANCE_DEFAULT);
  moonDistanceSlider.position(
    col1X,
    earthRotationSpeedSlider.y + earthRotationSpeedSlider.height + gapY * 2
  );

  // Slider and label for Moon's orbit speed
  createDiv("Moon Orbit Speed").position(
    col1X,
    moonDistanceSlider.y + moonDistanceSlider.height + gapY
  );
  moonOrbitSpeedSlider = createSlider(VALUE_ZERO, 0.05, LUNAR_ORBIT_SPEED_DEFAULT, 0.001);
  moonOrbitSpeedSlider.position(col1X, moonDistanceSlider.y + moonDistanceSlider.height + gapY * 2);

  // GUI elements for the creation of additional planets in column 2
  createDiv("Planet Size").position(col2X, startY);
  planetSizeSlider = createSlider(5, 50, PLANET_DIAMETER_DEFAULT);
  planetSizeSlider.position(col2X, startY + 15);

  createDiv("Planet Color").position(col2X, planetSizeSlider.y + planetSizeSlider.height + gapY);
  planetColorPicker = createColorPicker("#00ff00");
  planetColorPicker.position(col2X, planetSizeSlider.y + planetSizeSlider.height + gapY * 2);

  createDiv("Planet Speed").position(col2X, planetColorPicker.y + planetColorPicker.height + gapY);
  planetSpeedSlider = createSlider(VALUE_ZERO, 0.05, ORBITAL_VELOCITY_DEFAULT, 0.001);
  planetSpeedSlider.position(col2X, planetColorPicker.y + planetColorPicker.height + gapY * 2);

  createDiv("Planet Distance from Sun").position(
    col2X,
    planetSpeedSlider.y + planetSpeedSlider.height + gapY
  );
  planetDistanceSlider = createSlider(50, 400, SUN_DISTANCE_PLANET_DEFAULT);
  planetDistanceSlider.position(col2X, planetSpeedSlider.y + planetSpeedSlider.height + gapY * 2);

  createDiv("Planet Has Moon").position(
    col2X,
    planetDistanceSlider.y + planetDistanceSlider.height + gapY
  );
  moonCheckbox = createCheckbox("", false);
  moonCheckbox.position(col2X, planetDistanceSlider.y + planetDistanceSlider.height + gapY * 2);

  createDiv("Moon Distance from Planet").position(
    col2X,
    moonCheckbox.y + moonCheckbox.height + gapY
  );
  moonDistancePlanetSlider = createSlider(10, 100, SATELLITE_DISTANCE_DEFAULT);
  moonDistancePlanetSlider.position(col2X, moonCheckbox.y + moonCheckbox.height + gapY * 2);

  createDiv("Moon Speed").position(
    col2X,
    moonDistancePlanetSlider.y + moonDistancePlanetSlider.height + gapY
  );
  moonSpeedSlider = createSlider(VALUE_ZERO, 0.1, SATELLITE_SPEED_DEFAULT, 0.001);
  moonSpeedSlider.position(
    col2X,
    moonDistancePlanetSlider.y + moonDistancePlanetSlider.height + gapY * 2
  );

  createDiv("Moon Size").position(col2X, moonSpeedSlider.y + moonSpeedSlider.height + gapY);
  moonSizeSlider = createSlider(1, 30, SATELLITE_DIAMETER_DEFAULT);
  moonSizeSlider.position(col2X, moonSpeedSlider.y + moonSpeedSlider.height + gapY * 2);

  // Positioning the "Add Planet" button below the "Moon Size" slider
  addPlanetButton = createButton("Add Planet");
  addPlanetButton.position(col2X, moonSizeSlider.y + moonSizeSlider.height + gapY);
  addPlanetButton.mousePressed(addPlanet);

  // Positioning the "Pause Rotation" button below the "Add Planet" button
  pauseButton = createButton("Pause Rotation");
  pauseButton.position(col2X, addPlanetButton.y + addPlanetButton.height + gapY);
  pauseButton.mousePressed(togglePause);

  // Positioning the "Remove Last Planet" button below the "Pause Rotation" button
  removePlanetButton = createButton("Remove Last Planet");
  removePlanetButton.position(col2X, pauseButton.y + pauseButton.height + gapY);
  removePlanetButton.mousePressed(removeLastPlanet);

  resetButton = createButton("Reset Program");
  resetButton.position(col2X, removePlanetButton.y + removePlanetButton.height + gapY);
  resetButton.mousePressed(resetProgram);
}

function draw() {
  background(VALUE_ZERO); // Black space background
  ambientLight(MAX_RANGE_COLOR); // Add ambient light to illuminate the objects
  directionalLight(MAX_RANGE_COLOR, MAX_RANGE_COLOR, MAX_RANGE_COLOR, 0.25, 0.25, -1); // Adding directional light for better illumination

  // Draw celestialStars
  stroke(MAX_RANGE_COLOR); // White color for celestialStars
  strokeWeight(3);
  for (let star of celestialStars) {
    point(star.x, star.y);
  }

  // Update Earth and Moon parameters with slider values
  let earthDistance = earthDistanceSlider.value();
  earthRotationSpeed = earthRotationSpeedSlider.value();
  let moonDistance = moonDistanceSlider.value();
  moonOrbitSpeed = moonOrbitSpeedSlider.value();

  // Draw the Sun
  push();
  fill(colorSun);
  noStroke();
  sphere(30);
  pop();

  if (!flagPause) {
    // Increment the rotation and orbit angles only if not paused
    earthRotation += earthRotationSpeed;
    earthOrbitAngle += earthOrbitSpeed;
    moonOrbitAngle += moonOrbitSpeed;

    // Update custom planets and moons
    planets.forEach((planet) => {
      planet.orbitAngle += planet.speed; // Update the planet's orbit around the sun
      if (planet.moon) {
        planet.moon.orbitAngle += planet.moon.speed; // Update the moon's orbit around the planet
      }
    });
  }
  // Draw the Earth with texture
  push(); // Start a new drawing state
  noStroke();
  rotateZ(earthOrbitAngle); // Rotate for Earth's orbit around the Z-axis
  translate(earthDistance, VALUE_ZERO); // Move to Earth's orbital position
  push(); // Nest a push to isolate Earth's spin
  rotateY(earthRotation); // Then rotate the Earth around its Y-axis
  texture(textureEarth); // Apply Earth texture
  sphere(25); // Draw Earth
  pop(); // Pop to maintain Earth's translation for the Moon

  // Draw the Moon with texture
  rotateZ(moonOrbitAngle); // Rotate for the Moon's orbit around the Earth
  translate(moonDistance, VALUE_ZERO); // Move to the Moon's orbital position around the Earth
  noStroke();
  texture(textureMoon); // Apply Moon texture
  sphere(10); // Draw Moon
  pop(); // Pop to restore to the original state before Earth's transformations

  // Draw additional planets and their moons
  planets.forEach((planet) => {
    push(); // Isolate the transformation state for each planet

    if (!flagPause) {
      planet.orbitAngle += planet.speed; // Update the planet's orbit angle if not paused
    }
    let col = color(planet.color);
    ambientMaterial(red(col), green(col), blue(col)); // Apply color using ambientMaterial
    noStroke();
    rotateZ(planet.orbitAngle); // Rotate around the sun (Z-axis)
    translate(planet.distance, VALUE_ZERO); // Move to the planet's orbital position
    sphere(planet.size); // Draw the planet

    if (planet.moon) {
      // Draw the moon for this planet
      push(); // Isolate the transformation state for the moon
      noStroke();
      rotateZ(planet.moon.orbitAngle); // Rotate the moon around the planet
      translate(planet.moon.distance, 0); // Move to the moon's orbital position
      texture(textureMoon); // Apply the moon texture
      sphere(planet.moon.size); // Draw the moon
      pop();
    }
    pop();
  });
}

/**
 * Function to generate celestialStars based on the specified number.
 *
 * @param {number} number - The number of celestialStars to generate.
 */
function generateStars(number) {
  celestialStars = []; // Clear the existing celestialStars
  for (let i = VALUE_ZERO; i < number; i++) {
    celestialStars.push(
      createVector(random(-width / 2, width / 2), random(-height / 2, height / 2))
    );
  }
}

/**
 * Function called when the "Update Stars" button is pressed.
 * It updates the number of celestialStars and regenerates them.
 */
function updateStars() {
  starCount = parseInt(inputStarCount.value()); // Update the number of celestialStars
  generateStars(starCount); // Regenerate celestialStars
}

/**
 * Function to add a new planet to the simulation with specified properties.
 * It adds the planet to the `planets` array.
 */
function addPlanet() {
  const newPlanet = {
    size: planetSizeSlider.value(),
    color: planetColorPicker.value(),
    speed: planetSpeedSlider.value(),
    distance: planetDistanceSlider.value(),
    orbitAngle: VALUE_ZERO,
    moon: moonCheckbox.checked()
      ? {
          size: moonSizeSlider.value(),
          distance: moonDistancePlanetSlider.value(),
          speed: moonSpeedSlider.value(),
          orbitAngle: VALUE_ZERO,
          texture: textureMoon, // Apply the moon texture here
        }
      : null,
  };
  planets.push(newPlanet);
}

/**
 * Function to remove the last planet from the simulation.
 * It removes the last planet in the `planets` array.
 */
function removeLastPlanet() {
  if (planets.length > VALUE_ZERO) {
    planets.pop(); // Remove the last planet from the array
  }
}

/**
 * Function to toggle the pause state of the simulation.
 * It switches between paused and unpaused states.
 */
function togglePause() {
  flagPause = !flagPause; // Toggle the pause state
}

/**
 * Function to reset the entire program to its default values.
 * It clears additional planets, resets sliders, and other parameters.
 */
function resetProgram() {
  // Reset to default values
  planets = []; // Clear any additional planets
  starCount = 100;
  generateStars(starCount);
  inputStarCount.value(starCount.toString());

  // Reset Earth and Moon sliders
  earthDistanceSlider.value(150); // Default distance of Earth from Sun
  earthRotationSpeedSlider.value(0.01); // Default rotation speed of Earth
  moonDistanceSlider.value(45); // Default distance of Moon from Earth
  moonOrbitSpeedSlider.value(0.02); // Default orbit speed of Moon

  // Reset planet creation sliders and checkbox
  planetSizeSlider.value(30); // Default planet size
  planetColorPicker.value("#00ff00"); // Default planet color
  planetSpeedSlider.value(0.01); // Default planet speed
  planetDistanceSlider.value(200); // Default planet distance from Sun
  moonCheckbox.checked(false); // Default - no moon

  // Reset the properties of the default moon to their initial values
  moonDistancePlanetSlider.value(45); // Default moon distance from planet
  moonSpeedSlider.value(0.02); // Default moon orbit speed
  moonSizeSlider.value(10); // Default moon size

  // Reset rotation and orbit angles
  earthRotation = VALUE_ZERO;
  earthOrbitAngle = VALUE_ZERO;
  moonOrbitAngle = VALUE_ZERO;

  // Unpause the simulation if paused
  flagPause = false;
}
