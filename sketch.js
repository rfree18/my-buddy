/*
	The main JavaScript file to run our Virtual pet
	Contains the draw function, which is what prints to the screen
*/
var walkImg;
var petImg;
var sickImg;
var eatImg;
var madImg;
var charPoopingImg;

var bg;
var timer =200;
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

var menuBG;
var firstFeed = false;

//True for feed, false for anger
var feedOrAnger = true;

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

var clickSound;

var syringes;
function preload(){
	walkImg = [];
	for(let i = 1; i <= 5; i++){
		walkImg.push(loadImage("img/character_imgs/blueBaby/walk/walk" + i + ".png"));
	}
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
	sunsetWindow = loadImage("img/window/sunriseWindow.png");
	backButton = new Button("Back", loadImage('img/buttons/back.png'), 75, 75);
	charPoopImg = loadImage("img/character_imgs/blueBaby/pooping.png");

	poopImg1 = loadImage("img/poop1.png");
	poopImg2 = loadImage("img/poop2.png");

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
	}

	syringes = [];
	for(let i = 1; i < 6; i++){
		syringes.push(loadImage("img/animations/syringe/" + i + ".png"));
	}


	charPoopingImg = loadImage("img/character_imgs/blueBaby/pooping.png");
	clickSound = loadSound("sound/pong.ogg");
}
function setup(){
	myCanvas = createCanvas(750, 750);
	myCanvas.parent("sketch-holder");
	imageMode(CENTER);
	buttons.push(new Button("Status", statusButton, 150, 525));
	buttons.push(new Button("Toilet", toiletButton, 450, 525));
	buttons.push(new Button("Outside", outsideButton, 300, 675));
	buttons.push(new Button("Love", loveButton, 150, 675));
	buttons.push(new Button("Food", foodButtonPic, 300, 525));
	buttons.push(new Button("Medicine", medecineButtonPic, 600, 525));

	foodButtons.push(new Button("Apple", appleIcon, 250, 400));
	foodButtons.push(new Button("Cookie", cookieIcon, 500, 400))
}
function draw(){
	background(0, 0, 100);
	textSize(50);
	fill(255);
	textAlign(CENTER);

	if(currUser == undefined) {
		text("Please login to continue", 375, 375);
	} else if(timer > 0){
		text(`Welcome ${currUser.displayName}!`, 375, 375);
		timer--;
	}
	else{
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
				foodmenu = false;
			}
		}
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
		else if(statusMenu){
			displayStatusMenu();
			if(backButton.display()){
				statusMenu = false;
			}
		}
		else{
			drawWindow();
			image(bg, 375,375, 750, 750);
			drawPoop();

			cycleButtons();
			myChar.display();
		}
	}
	clicked = false;
}
function cycleButtons(){
for(let i = 0; i < buttons.length; i++){
		if (buttons[i].display()){
			clickSound.play();
			//If the user is pressing a button...
			if(buttons[i].name === "Food"){
				foodmenu = true;
			}
			if(buttons[i].name === "Medicine"){
				myChar.cure();
			}
			if(buttons[i].name === "Status"){
				statusMenu = true;
			}
			if(buttons[i].name === "Toilet"){
				clearPoop();
			}
			if(buttons[i].name === "Outside"){

			}
			if(buttons[i].name === "Love"){

			}
		}
	}
}
function clearPoop(){
	poopOnScreen = [];
}
function drawPoop(){
	poopOnScreen.forEach((p)=>{
		p.display();
	});
}
function cycleFoodButtons(){
	for(let i = 0; i < foodButtons.length; i++){
		if(foodButtons[i].display()){
			foodName = foodButtons[i].name;
			return true;
		}
	}
}
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
			charEatFr = 1;
		}
		else{
			charEatFr = 0;
		}
	}
}
function angerAnimation(){

}
function displayStatusMenu(){

}
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
function Button(name, img,x,y){
	this.name = name;
	this.pic = img;
	this.xPos = x;
	this.yPos = y;


	this.checkHovering = function(){
		if(mouseX > this.xPos - 50 && mouseX < this.xPos + 50 && mouseY > this.yPos-50 && mouseY < this.yPos+50){
			return true;
		}
		else{
			return false;
		}
	}
	this.display = function(){
		if(this.checkHovering() === false){
			image(this.pic, this.xPos, this.yPos);
			return false;
		}
		else{
			fill(0);
			rect(this.xPos-50, this.yPos-50, 100, 100);
			//clickSound.play();
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
function Poop(x, y, sz){
	this.xPos = x;
	this.yPos = y+50;
	this.size = sz;
	this.counter = 20;
	this.state = 0;
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
