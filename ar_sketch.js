// create a variable to hold our world object
var world;
var myChar;

// create variables to hold our markers
var markerHiro, markerZb;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');

  // create some geometry to add to our marker
  // the marker is 1 meter x 1 meter, with the origin at the center
  // the x-axis runs left and right
  // -0.5, 0, -0.5 is the top left corner
  var littleCube1 = new Box({
    x: 0,
    y: 0.25,
    z: 0,
    red: 255,
    green: 0,
    blue: 0,
    width: 0.5,
    height: 0.5,
    depth: 0.5,
    asset: 'stonebrick'
  });
  markerHiro.addChild(littleCube1);

}


function draw() {

  if (markerHiro.isVisible()) {
    myChar.setUnlockable('hiro');
    window.location = "index.html";
  }

}
