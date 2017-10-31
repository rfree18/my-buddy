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

var loveButton;
var statusButton;

var menuBG;

var buttons = [];
var poopOnScreen = [];

var foodmenu = false;
var statusMenu = false;
var clicked = false;

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

	eatImg = [];
	sickImg = [];
	madImg = [];

	for(let i = 1; i < 3; i++){
		eatImg.push(loadImage("img/character_imgs/blueBaby/eat" + i + ".png"));
		sickImg.push(loadImage("img/character_imgs/blueBaby/sick" + i + ".png"));
		madImg.push(loadImage("img/character_imgs/blueBaby/mad" + i + ".png"));
	}

	charPoopingImg = loadImage("img/character_imgs/blueBaby/pooping.png");
}
function setup(){
	myCanvas = createCanvas(750, 750);
	myCanvas.parent("sketch-holder");
	myChar = new Character();
	myChar.setIntervals();
	imageMode(CENTER);
	buttons.push(new Button("Status", statusButton, 150, 525));
	buttons.push(new Button("Toilet", toiletButton, 450, 525));
	buttons.push(new Button("Outside", outsideButton, 300, 675));
	buttons.push(new Button("Love", loveButton, 150, 675));
	buttons.push(new Button("Food", foodButtonPic, 300, 525));
	buttons.push(new Button("Medicine", medecineButtonPic, 600, 525));
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
			if(backButton.display()){
				foodmenu = false;
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

			cycleButtons();
			myChar.display();
		}
	}
	clicked = false;
}
function cycleButtons(){
for(let i = 0; i < buttons.length; i++){
		if (buttons[i].display()){
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

			}
			if(buttons[i].name === "Outside"){

			}
			if(buttons[i].name === "Love"){

			}
		}
	}
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
