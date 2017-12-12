// create a variable to hold our world object
var world;
var myChar;
var isLoading;

// create variables to hold our markers
var markers = [];

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  isLoading = false;

  const markerTags = document.querySelectorAll('a-marker');
  markerTags.forEach((tag) => {
    markers.push(world.getMarker(tag.id));
  });

  // create some geometry to add to our marker
  // the marker is 1 meter x 1 meter, with the origin at the center
  // the x-axis runs left and right
  // -0.5, 0, -0.5 is the top left corner
  // var littleCube1 = new Box({
  //   x: 0,
  //   y: 0.25,
  //   z: 0,
  //   red: 255,
  //   green: 0,
  //   blue: 0,
  //   width: 0.5,
  //   height: 0.5,
  //   depth: 0.5,
  //   asset: 'stonebrick'
  // });
  // markerHiro.addChild(littleCube1);

}


function draw() {

  markers.forEach((marker) => {
    if (marker.isVisible() && myChar && !isLoading) {
      if (myChar.properties.unlockables === undefined) {
        myChar.properties.unlockables = {};
      }

      if(myChar.properties.unlockables[marker.tag.id]) {
        window.location = 'index.html';
      } else {
        isLoading = true;
        myChar.setUnlockable(marker.tag.id, function() {
          isLoading = false;
          console.log("hello!");
          window.location = 'index.html';
        });
      }
    }
  });

}
