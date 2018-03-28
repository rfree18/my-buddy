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
    const marker = world.getMarker(tag.id);
    const imgPlane = new Plane({
      x: 0,
      y: 0.25,
      z: 0,
      width: 0.5,
      height: 0.5,
      depth: 0.5,
      rotationX: -90,
      asset: `${tag.id}-img`
    });

    marker.addChild(imgPlane);

    markers.push(world.getMarker(tag.id));
  });

}


function draw() {
  markers.forEach((marker) => {
    if (marker.isVisible() && myChar && !isLoading) {
      if (myChar.properties.unlockables === undefined) {
        myChar.properties.unlockables = {};
      }

      if (myChar.properties.unlockables[marker.tag.id]) {
        window.location = 'index.html';
      } else {
        isLoading = true;
        myChar.setUnlockable(marker.tag.id).then(function() {
          isLoading = false;
          window.location = 'index.html';
        });
      }
    }
  });

}
