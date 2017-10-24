/*
	The main JavaScript file to run our Virtual pet
	Contains the draw function, which is what prints to the screen
*/
var walkImg;
var bg;
var timer =400;

function preload(){
	walkImg = loadImage("img/character_imgs/blueBaby/walk.png");
	bg = loadImage("img/defaultBG.png");
}
function setup(){
	myCanvas = createCanvas(750, 750);
	myCanvas.parent("sketch-holder");
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
		image(bg, 0,0);

	}
}
//This will be the pet object that the user must raise
function Character(n){
	this.name = n;
	//Represents health of the user's pet
	this.health = 50;
	//Represents how hungry the pet is: 0 is very hungry, 10 is full.
	this.hunger = 0;
	//Represents how clean the pet is: the higher the number, the dirtier the pet
	this.dirty = 0;
	//Amount of love given to pet: can go negative
	this.love = 0;
	//Age measured in hours, minutes, and days
	this.age = {
		hours: 0,
		minutes: 0,
		days: 0
	};
	//The array of images that represent the current character
	this.imgArr = [];
	//The stage is similar to the age, but is changed at specific ages.  0 is the baby stage
	this.stage = 0;
	//Happiness variable: 0 is least happy to 10 most happy
	this.happiness = 0;

	this.walkCycle = [];



	this.display = function(){
		//Later on, display pet
	};
	this.sayHi = function(){
		//Implement to say hi when the user speaks the words "hello" or "hi" into the mic
	};
	this.updateAge = function(){
		//Implement a method to take in the time and change the age of the pet
	};
	this.changeStage = function(){
		//Using the health as one variable, and another later implemented
		//"good care" variable, change the stage to the appropriate character
	};
	this.updateImageArray = function(){
		//Update the array of images that represents this character
		//Typically called when the stage of the character changes
		//Later on implement the arrays
	};
	this.giveLove = function(){
		//Add to the pet's love variable
	};
	this.giveHate = function(){
		//Decrement the love variable
	};
	this.feed = function(){
		//Increment the hunger variable
		//Possibly give love if the food is good
		//Possibly take love if the food is disliked by this character
	};
	this.makeHappy = function(){
		//Increment the happiness
	};
	this.makeSad = function(){
		//Decrement happiness
	};
	this.makeHungry = function(){
		//Decrement hunger
	};
	this.walkLeft = function(){
		//walks left on the screen

	}
}
