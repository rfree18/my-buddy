/*
The main JavaScript file to run our Virtual pet
Contains the draw function, which is what prints to the screen
*/

//Declare variables
var walkImg;
var petImg;
var sickImg;
var eatImg;
var madImg;
var charPoopingImg;
var charDeadImg = [];

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
var ghosties = [];

var heart;

var canLove = true;

var myRec;
var seesHi;

function preload(){

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
	for(let i = 1; i <= 5; i++){
		walkImg.push(loadImage("img/character_imgs/blueBaby/walk/walk" + i + ".png"));
	}
	//Load in images
	day = loadImage("img/outside/day.png");
	night = loadImage("img/outside/night.png");
	sunset = loadImage("img/outside/sunset.png");
	sunrise = loadImage("img/outside/sunrise.png");

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

	ghosties.push(loadImage("img/character_imgs/blueBaby/death/ghostie1.png"));
	ghosties.push(loadImage("img/character_imgs/blueBaby/death/ghostie2.png"));

	appleIcon = (loadImage("img/food/appleIcon.png"));
	cookieIcon = (loadImage("img/food/cookieIcon.png"));
	eatImg = [];
	sickImg = [];
	madImg = [];

	for(let i = 0; i < 4; i++){
		appleArr.push(loadImage("img/food/apple" + i + ".png"));
		cookieArr.push(loadImage("img/food/cookie" + i + ".png"));
	}

	for(let i = 1; i < 3; i++){
		eatImg.push(loadImage("img/character_imgs/blueBaby/eat" + i + ".png"));
		sickImg.push(loadImage("img/character_imgs/blueBaby/sick" + i + ".png"));
		madImg.push(loadImage("img/character_imgs/blueBaby/mad" + i + ".png"));
		loveAni.push(loadImage("img/character_imgs/blueBaby/love" + i + ".png"));
	}

	syringes = [];
	for(let i = 1; i < 6; i++){
		syringes.push(loadImage("img/animations/syringe/" + i + ".png"));
	}

	charPoopingImg = loadImage("img/character_imgs/blueBaby/pooping.png");

	for(let i = 1; i < 11; i++){
		charDeadImg.push(loadImage("img/character_imgs/blueBaby/death/" + i + ".png"));
	}

}
function setup(){

	myRec = new p5.SpeechRec();

  // set up our recorder to constantly monitor the incoming audio stream
	myRec.continuous = true; // do continuous recognition

  // allow partial results - this will detect words as they are said and will
  // call the parse function as soon as a word is decoded
  // when a pause in conversation occurs the entire string will be sent
  // to the parse function
	myRec.interimResults = true;

  // define our parse function (called every time a word/phrase is detected)
	myRec.onResult = parseResult;

  // start the recording engine
	myRec.start();
	myCanvas = createCanvas(750, 750);
	myCanvas.parent("sketch-holder");
	imageMode(CENTER);
	buttons.push(new Button("Status", statusButton, 150, 525));
	buttons.push(new Button("Toilet", toiletButton, 450, 525));
	buttons.push(new Button("Outside", outsideButton, 300, 675));
	buttons.push(new Button("Love", loveButton, 150, 675));
	buttons.push(new Button("Food", foodButtonPic, 300, 525));
	buttons.push(new Button("Medicine", medecineButtonPic, 600, 525));
	buttons.push(new Button("Info", infoButton, 450, 675));
	buttons.push(new Button("Save", saveButton, 600, 675));

	foodButtons.push(new Button("Apple", appleIcon, 250, 400));
	foodButtons.push(new Button("Cookie", cookieIcon, 500, 400))
	failSound.setVolume(.5);
	menuSound.setVolume(.5);
	nomSound.setVolume(.25);
	bgSong.setVolume(.05);
	bgDeadSong.setVolume(.05);
	bgDeadSongBegin.setVolume(.05);
	bgSong.loop();

	setInterval(function(){canLove = true;}, 60000);
	setInterval(function(){canSayHi = true;}, 6000);
}
function draw(){
	background(0, 0, 100);
	textSize(50);
	fill(255);
	textAlign(CENTER);

	// Determine whether or not the user is currently signed in
	if(currUser == undefined) {
		text("Please login to continue", 375, 375);
	} else if(timer > 0){
		text(`Welcome ${currUser.displayName}!`, 375, 375);
		timer--;
	}
	else{
		//If dead, play the right song
		if(myChar.properties.condition.alive === false && bgSong.isPlaying()){
			bgSong.stop();
			bgDeadSongBegin.play();
		}
		//If user is on the food menu
		if(foodmenu){
			image(menuBG, 375, 375);
			text("Pick a food to eat!", 375, 100);
			if(cycleFoodButtons()){
				foodmenu = false;
				foodAni = true;
				foodAniTimer = 400;
				firstFeed = true;
			}
			if(backButton.display()){
				failSound.play();
				foodmenu = false;
			}
		}
		//If character is eating
		else if(foodAni){
			drawWindow();
			image(bg, 375,375, 750, 750);
			if(firstFeed){
				feedOrAnger = myChar.feed(foodName);
				firstFeed = false;
			}
			if(feedOrAnger){
				foodAnimation();
			}
			else{
				foodAni = false;
				myChar.angerAnimation();
			}
			foodAniTimer--;
			if(foodAniTimer === 0){
				foodAni = false;
				foodmenu = true;
			}
		}
		//If the user is on the status menu
		else if(statusMenu){
			displayStatusMenu();
			if(backButton.display()){
				failSound.play();
				statusMenu = false;
			}
		}
		//If the user is on the info menu
		else if(isInfoMenu){
			image(infoMenu, 375, 375);
			text("Information", 375, 100);
			text("Version: " + version, 375, 675);
			if(backButton.display()){
				failSound.play();
				isInfoMenu = false;
			}
		}
		//User is on the main screen, though potentially outside
		else{
			drawWindow();

			//User is outside
			if(isOutside){
				drawOutdoorBG();
				if(backButton.display()){
					failSound.play();
					clearInterval(checkOutsideInterval);
					isOutside = false;
				}
			}
			//User is inside
			else{
				image(bg, 375,375, 750, 750);
			}
			drawPoop();
			//If the user speaks the words "hello" or "hi" into the mic
			if(myChar.properties.condition.alive === true){
				if(seesHi){
					myChar.loveAnimation();
					seesHi = false;
				}
				cycleButtons();
			}
			else{
				//If the character is dead, display the reset button
				if(resetButton.display()){
					myChar.reset();
				}
			}
			myChar.display();
		}
	}
	clicked = false;
	seesHi = false;
}
//Depending on the time of day, draws the appropriate sceneary when outdoors
function drawOutdoorBG(){
	date = new Date();
	if(date.getHours() >= 6 && date.getHours() < 9){
		image(sunrise, 375, 375);
	}
	else if(date.getHours() >= 9 && date.getHours() < 18){
		image(day, 375, 375);
	}
	else if(date.getHours() >= 18 && date.getHours() < 20){
		image(sunset, 375, 375);
	}
	else if(date.getHours() >= 20 || date.getHours() < 8){
		image(night, 375, 375);
	}
}
//Loop through the buttons and determine what do to depending on
//the button pressed
function cycleButtons(){
	for(let i = 0; i < buttons.length; i++){
		if (buttons[i].display()){
			//If the user is pressing a button...
			if(buttons[i].name === "Food"){
				foodmenu = true;
				menuSound.play();
				if(isOutside){
					clearInterval(checkOutsideInterval);
				}
				isOutside = false;
			}
			if(buttons[i].name === "Medicine"){
				myChar.cure();
				if(isOutside){
					clearInterval(checkOutsideInterval);
				}
				isOutside = false;
			}
			if(buttons[i].name === "Status"){
				statusMenu = true;
				menuSound.play();
			}
			if(buttons[i].name === "Toilet"){
				clearPoop();
				bubbleSound.play();
			}
			if(buttons[i].name === "Outside"){
				menuSound.play();
				isOutside = true;
				checkOutsideInterval = setInterval(function(){return isOutside}, 240000);
			}
			if(buttons[i].name === "Love"){
				myChar.loveButton();
			}
			if(buttons[i].name === "Info"){
				isInfoMenu = true;
				menuSound.play();
			}
			if(buttons[i].name === "Save"){
				saveGame();
				saveSound.play();
				console.log("Game has been saved at " + date.toString());
			}
		}
	}
}
//Empty the poop array if the toilet button is hit
function clearPoop(){
	poopOnScreen = [];
}
//display the poop on the screen
function drawPoop(){
	poopOnScreen.forEach((p)=>{
		p.display();
	});
}
//Loop through the food buttons
function cycleFoodButtons(){
	for(let i = 0; i < foodButtons.length; i++){
		if(foodButtons[i].display()){
			foodName = foodButtons[i].name;
			return true;
		}
	}
}
//Draws the eating animation for the character
function foodAnimation(){
	if(foodName === "Apple"){
		if(foodAniTimer > 300){
			image(appleArr[0], 425, 400, 100, 100);
		}
		else if(foodAniTimer > 200){
			image(appleArr[1], 425, 400, 100, 100);
		}
		else if(foodAniTimer > 100){
			image(appleArr[2], 425, 400, 100, 100);
		}
		else if(foodAniTimer > 25){
			image(appleArr[3], 425, 400, 100, 100);
		}
		else{

		}
	}
	else if(foodName === "Cookie"){
		if(foodAniTimer > 300){
			image(cookieArr[0], 425, 375);
		}
		else if(foodAniTimer > 200){
			image(cookieArr[1], 425, 375);
		}
		else if(foodAniTimer > 100){
			image(cookieArr[2], 425, 375);
		}
		else if(foodAniTimer > 25){
			image(cookieArr[3], 425, 375);
		}
		else{

		}
	}
	image(eatImg[charEatFr], 300, myChar.yPos);
	if(foodAniTimer % 15 === 0){
		if(charEatFr === 0){
			nomSound.play();
			charEatFr = 1;
		}
		else{
			charEatFr = 0;
		}
	}
}
//Displays the status menu with the correct number
//of hearts in each spot, representing how hungry
//and happy the pet is.
function displayStatusMenu(){
	image(statusScreen, 375, 375);
	let h = myChar.properties.hunger;
	let hap = myChar.properties.love;
	let x = 175;
	let y = 402;
	if(h > 0){
		image(heart, x, y);
	}
	if(h > 10){
		image(heart, x+99, y);
	}
	if(h > 20){
		image(heart, x+99+99, y);
	}
	if(h > 30){
		image(heart, x+99+99+99, y);
	}
	if(h > 40){
		image(heart, x+99+99+99+99, y);
	}
	y+=250;
	if(hap > 0){
		image(heart, x, y);
	}
	if(hap > 10){
		image(heart, x+99, y);
	}
	if(hap > 20){
		image(heart, x+99+99, y);
	}
	if(hap > 30){
		image(heart, x+99+99+99, y);
	}
	if(hap > 40){
		image(heart, x+99+99+99+99, y);
	}
	fill(255);
	text("Status", 375, 100);
	fill(0);
	text("Age: " + myChar.properties.age.days + " years old", 525, 200);
	image(petImg, 150, 250);
}
//Draw the window in the house, which changes depending on the time of day
function drawWindow(){
	date = new Date();
	if(date.getHours() >= 6 && date.getHours() < 9){
		image(sunriseWindow, 172, 172);
	}
	else if(date.getHours() >= 9 && date.getHours() < 18){
		image(sunWindow, 172, 172);
	}
	else if(date.getHours() >= 18 && date.getHours() < 20){
		image(sunsetWindow, 172, 172);
	}
	else if(date.getHours() >= 20 || date.getHours() < 8){
		image(nightWindow, 172, 172);
	}
}
function mousePressed(){
	clicked = true;
}
//Button object
function Button(name, img,x,y){
	this.name = name;
	this.pic = img;
	this.xPos = x;
	this.yPos = y;

	//Return true if the user's mouse is hovering over the button
	this.checkHovering = function(){
		if(mouseX > this.xPos - 50 && mouseX < this.xPos + 50 && mouseY > this.yPos-50 && mouseY < this.yPos+50){
			return true;
		}
		else{
			return false;
		}
	}
	//Displays the button graphic, returns true if the user has clicked the button
	this.display = function(){
		if(this.checkHovering() === false){
			image(this.pic, this.xPos, this.yPos);
			return false;
		}
		else{
			fill(0);
			if(this.name !== "Apple" && this.name !== "Cookie"){
				rect(this.xPos-50, this.yPos-50, 100, 100);
			}
			else{
				rect(this.xPos-75, this.yPos-75, 150, 150);
			}
			image(this.pic, this.xPos, this.yPos);
			if(clicked){
				return true;
			}
			else{
				return false;
			}
		}
	}
}
//The poop object, with 3 variables: x, y, and the size (which is a random variable within a specific range)
function Poop(x, y, sz){
	this.xPos = x;
	this.yPos = y+50;
	this.size = sz;
	this.counter = 20;
	this.state = 0;

	//Draws the poop on the screen
	this.display = function(){
		if(this.state === 0){
			image(poopImg1, this.xPos, this.yPos, this.size, this.size);
			this.counter--;
			if(this.counter === 0){
				this.counter = 20;
				this.state = 1;
			}
		}
		else{
			image(poopImg2, this.xPos, this.yPos, this.size, this.size);
			this.counter--;
			if(this.counter === 0){
				this.counter = 20;
				this.state = 0;
			}
		}
	}
}
//Used for speech to test to parse the result into a string
function parseResult() {
  if(canSayHi && (myRec.resultString.toLowerCase() === "hi" || myRec.resultString.toLowerCase() === "hello")){
  	seesHi = true;
  	canSayHi = false;
  }
}
