/*
	The main JavaScript file to run our Virtual pet
	Contains the draw function, which is what prints to the screen
*/
var walkImg;
var petImg;
var bg;
var timer =200;
var myChar;
var foodButtonPic;
var medecineButtonPic;
var outsideButton;
var toiletButton;

var date = new Date();
var sunWindow;
var nightWindow;
var sunriseWindow;
var sunsetWindow;

var loveButton;
var statusButton;

var menuBG;

var buttons = [];
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

}
function setup(){
	myCanvas = createCanvas(750, 750);
	myCanvas.parent("sketch-holder");
	myChar = new Character();
	imageMode(CENTER);
	buttons.push(new Button("Status", statusButton, 150, 525));
	buttons.push(new Button("Toilet", toiletButton, 450, 525));
	buttons.push(new Button("Outside", outsideButton, 300, 675));
	buttons.push(new Button("Love", loveButton, 150, 675));
	buttons.push(new Button("Food", foodButtonPic, 300, 525));
	buttons.push(new Button("Medecine", medecineButtonPic, 600, 525));
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
		drawWindow();
		image(bg, 375,375, 750, 750);
		for(let i = 0; i < buttons.length; i++){
			buttons[i].display();
		}
		myChar.display();
	}
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
		}
		else{
			fill(0);
			rect(this.xPos-50, this.yPos-50, 100, 100);
			image(this.pic, this.xPos, this.yPos);
		}
	}
}
