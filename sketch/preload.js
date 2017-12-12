//Declare variables
var walkImg;
var petImg;
var sickImg;
var eatImg;
var madImg;
var charPoopingImg;
var charDeadImg;

var bg;
var timer = 100;
var myChar;
var foodButtonPic;
var medecineButtonPic;
var outsideButton;
var toiletButton;
var backButton;

var date = new Date();
var sunWindow;
var nightWindow;
var sunriseWindow;
var sunsetWindow;

var foodAni = false;
var foodAniTimer = 0;
var charEatFr = 0;

var loveButton;
var statusButton;
var infoButton;
var saveButton;
var version;
var infoMenu;
var isInfoMenu = false;

var loveAni = [];

var menuBG;
var firstFeed = false;

//True for feed, false for anger
var feedOrAnger = true;

var resetButton;

var buttons = [];
var poopOnScreen = [];
var foodButtons = [];
var appleIcon;
var cookieIcon;
var cakeIcon;
var pearIcon;
var sushiIcon;
var pizzaIcon;
var tacoIcon;

var cakeArr = [];
var pearArr = [];
var sushiArr = [];
var pizzaArr = [];
var tacoArr = [];

var foodName;

var appleArr = [];
var cookieArr = [];

var poopImg1;
var poopImg2;

var foodmenu = false;
var statusMenu = false;
var clicked = false;

var canSayHi = true;

//Sounds!
var saveSound;
var bgSong;
var bubbleSound;
var noSound;
var failSound;
var poopSound;
var sadSound;
var menuSound;
var nomSound;
var healSound;
var bgDeadSong;
var bgDeadSongBegin;
var loveSound;
var statusScreen;

var day;
var night;
var sunset;
var sunrise;
var isOutside = false;
var checkOutsideInterval;

var syringes;
var ghosties;

var heart;

var canLove = true;

var myRec;
var seesHi;

//TESTING NEW CHARACTER
var newWalkImg = [];
var newFrontFace;
var lightWalk = [];
var lightFront;

//Doors
var sunsetDoor;
var sunriseDoor;
var nightDoor;
var dayDoor;

var closedDoor;
var openDoor;

var foods = [];

//Button object
function Button(name, img, x, y) {
  this.name = name;
  this.pic = img;
  this.xPos = x;
  this.yPos = y;

  //Return true if the user's mouse is hovering over the button
  this.checkHovering = function() {
    if (mouseX > this.xPos - 50 && mouseX < this.xPos + 50 && mouseY > this.yPos - 50 && mouseY < this.yPos + 50) {
      return true;
    } else {
      return false;
    }
  }
  //Displays the button graphic, returns true if the user has clicked the button
  this.display = function() {
    if (this.checkHovering() === false) {
      image(this.pic, this.xPos, this.yPos);
      return false;
    } else {
      fill(0);
      if (this.name !== "Apple" && this.name !== "Cookie") {
        rect(this.xPos - 50, this.yPos - 50, 100, 100);
      } else {
        rect(this.xPos - 75, this.yPos - 75, 150, 150);
      }
      image(this.pic, this.xPos, this.yPos);
      if (clicked) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function preload() {

  //Load in sounds
  saveSound = loadSound("sound/save.mp3");
  loveSound = loadSound("sound/love.mp3");
  bgSong = loadSound("sound/bgSong.mp3");
  bubbleSound = loadSound("sound/bubbles.mp3");
  noSound = loadSound("sound/no.mp3");
  failSound = loadSound("sound/fail.mp3");
  poopSound = loadSound("sound/poop.mp3");
  sadSound = loadSound("sound/sad.mp3");
  menuSound = loadSound("sound/menu.mp3");
  nomSound = loadSound("sound/nom.mp3");
  healSound = loadSound("sound/potion.mp3");
  bgDeadSong = loadSound("sound/bgDeadSong.mp3");
  bgDeadSongBegin = loadSound("sound/bgDeadSongBeginning.mp3");
  resetButton = new Button("Reset", loadImage('img/buttons/reset.png'), 650, 100);

  walkImg = [];
  for (let i = 1; i <= 5; i++) {
    walkImg.push(loadImage("img/character_imgs/blueBaby/walk/walk" + i + ".png"));
    newWalkImg.push(loadImage("img/character_imgs/purpleEmo/walk/" + i + ".png"));
    lightWalk.push(loadImage("img/character_imgs/lightBulb/walk/" + i + ".png"));
  }
  //TEST
  newFrontFace = loadImage("img/character_imgs/purpleEmo/purpleFWD.png");
  lightFront = loadImage("img/character_imgs/lightBulb/bulbFWD.png");
  //END TEST

  //Load in images
  day = loadImage("img/outside/day.png");
  night = loadImage("img/outside/night.png");
  sunset = loadImage("img/outside/sunset.png");
  sunrise = loadImage("img/outside/sunrise.png");

  //Door images
  openDoor = loadImage("img/door.png");
  closedDoor = loadImage("img/openDoor.png");

  sunriseDoor = loadImage("img/door/sunriseDoor.png");
  nightDoor = loadImage("img/door/nightDoor.png");
  dayDoor = loadImage("img/door/dayDoor.png");
  sunsetDoor = loadImage("img/door/sunsetDoor.png");

  infoMenu = loadImage("img/infoScreen.png");
  version = "Alpha 1.0";
  statusScreen = loadImage("img/status/menuBG.png");
  heart = loadImage("img/status/heart.png");

  petImg = loadImage("img/character_imgs/blueBaby/babyFWD.png");
  bg = loadImage("img/defaultBG.png");
  menuBG = loadImage("img/menuBG.png");
  foodButtonPic = loadImage("img/buttons/food.png");
  medecineButtonPic = loadImage("img/buttons/medecine.png");
  outsideButton = loadImage("img/buttons/outside.png");
  toiletButton = loadImage("img/buttons/toilet.png");
  loveButton = loadImage("img/buttons/love.png");
  statusButton = loadImage("img/buttons/status.png");
  nightWindow = loadImage("img/window/nightWindow.png");
  sunWindow = loadImage("img/window/sunWindow.png");
  sunriseWindow = loadImage("img/window/sunriseWindow.png");
  sunsetWindow = loadImage("img/window/sunsetWindow.png");
  backButton = new Button("Back", loadImage('img/buttons/back.png'), 75, 75);
  charPoopImg = loadImage("img/character_imgs/blueBaby/pooping.png");

  poopImg1 = loadImage("img/poop1.png");
  poopImg2 = loadImage("img/poop2.png");

  infoButton = loadImage("img/buttons/info.png");
  saveButton = loadImage("img/buttons/save.png");

  ghosties = new AnimatedImage("img/character_imgs/blueBaby/death/ghostie", ".png", 2, 40, true);

  appleIcon = (loadImage("img/food/appleIcon.png"));
  cookieIcon = (loadImage("img/food/cookieIcon.png"));
  pearIcon = loadImage("img/food/pearIcon.png");
  cakeIcon = loadImage("img/food/cakeIcon.png");
  pizzaIcon = loadImage("img/food/pizzaIcon.png");
  sushiIcon = loadImage("img/food/sushiIcon.png");
  tacoIcon = loadImage("img/food/tacoIcon.png");

  eatImg = [];
  sickImg = [];
  madImg = [];

  for (let i = 1; i < 4; i++) {
    appleArr.push(loadImage("img/food/apple" + i + ".png"));
    cookieArr.push(loadImage("img/food/cookie" + i + ".png"));
    cakeArr.push(loadImage("img/food/cake" + i + ".png"));
    pizzaArr.push(loadImage("img/food/pizza" + i + ".png"));
    sushiArr.push(loadImage("img/food/sushi" + i + ".png"));
    pearArr.push(loadImage("img/food/pear" + i + ".png"));
    tacoArr.push(loadImage("img/food/taco" + i + ".png"));

  }
  foods.push(new Food(loadImage("img/food/apple0.png"), "Apple", 5, 0, -5, 10, appleArr));
  foods.push(new Food(loadImage("img/food/cookie0.png"), "Cookie", -5, 0, 10, 5, cookieArr));
  foods.push(new Food(loadImage("img/food/cake.png"), "Cake", -7.5, 0, 15, 10, cakeArr));
  foods.push(new Food(loadImage("img/food/sushi.png"), "Sushi", 2, 0, 3, 150, sushiArr));
  foods.push(new Food(loadImage("img/food/pear.png"), "Pear", 5, 0, -2, 7.5, pearArr));
  foods.push(new Food(loadImage("img/food/pizza.png"), "Pizza", -5, 0, 5, 15, pizzaArr));
  foods.push(new Food(loadImage("img/food/taco.png"), "Taco", 0, 0, 2, 17, tacoArr));

  for (let i = 1; i < 3; i++) {
    eatImg.push(loadImage("img/character_imgs/blueBaby/eat" + i + ".png"));
    sickImg.push(loadImage("img/character_imgs/blueBaby/sick" + i + ".png"));
    madImg.push(loadImage("img/character_imgs/blueBaby/mad" + i + ".png"));
    loveAni.push(loadImage("img/character_imgs/blueBaby/love" + i + ".png"));
  }

  syringes = new AnimatedImage("img/animations/syringe/", ".png", 5, 20, false);

  charPoopingImg = loadImage("img/character_imgs/blueBaby/pooping.png");

  charDeadImg = new AnimatedImage("img/character_imgs/blueBaby/death/", ".png", 10, 20, false);

}