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

var buttons = [];
function preload(){
	walkImg = [];
	for(let i = 1; i <= 5; i++){
		walkImg.push(loadImage("img/character_imgs/blueBaby/walk/walk" + i + ".png"));
	}
	petImg = loadImage("img/character_imgs/blueBaby/babyFWD.png");
	bg = loadImage("img/defaultBG.png");
	foodButtonPic = loadImage("img/buttons/food.png");
	medecineButtonPic = loadImage("img/buttons/medecine.png");
	outsideButton = loadImage("img/buttons/outside.png");
}
function setup(){
	myCanvas = createCanvas(750, 750);
	myCanvas.parent("sketch-holder");
	myChar = new Character("Billy");
	imageMode(CENTER);
	buttons.push(new Button("Outside", outsideButton, 500, 550));
	buttons.push(new Button("Food", foodButtonPic, 375, 550));
	buttons.push(new Button("Medecine", medecineButtonPic, 250, 550));
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
		image(bg, 375,375, 750, 750);
		for(let i = 0; i < buttons.length; i++){
			buttons[i].display();
		}
		myChar.display();
	}
}
//This will be the pet object that the user must raise
function Character(n){
	this.name = n;
	this.xPos = 375;
	this.yPos = 375;
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

	this.walkCycle = walkImg;
	this.walkDir = 1;
	this.walkUp = true;
	this.walkCycleCounter = 0;
	this.walkTimer = 8;

	this.wait = false;


	this.display = function(){
		//Later on, display pet
		if(this.wait){
			image(petImg, this.xPos, this.yPos);
			this.walkTimer--;
			if(this.walkTimer == 0){
				this.wait = false;
				this.walkTimer = 8;
			}
		}
		else if(this.walkDir == 1){
			this.walkLeft();
			this.xPos--;
			if(this.xPos <= 100){
				this.walkDir = 0;
				this.wait = true;
				this.walkTimer = 10;
			}
		}
		else if(this.walkDir == 0){
			this.walkRight();
			this.xPos++
			if(this.xPos >= 650){
				this.walkDir = 1;
				this.wait = true;
				this.walkTimer = 10;
			}
		}
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
		if(this.walkUp){
			if(this.walkTimer > 0){
				image(walkImg[this.walkCycleCounter], this.xPos, this.yPos);
				this.walkTimer--;
			}
			else{
				image(walkImg[this.walkCycleCounter], this.xPos, this.yPos);
				this.walkCycleCounter++;
				this.walkTimer = 8;
				if(this.walkCycleCounter == 4){
					this.walkUp = false;
				}
			}
		}
		else{
			if(this.walkTimer > 0){
				image(walkImg[this.walkCycleCounter], this.xPos, this.yPos);
				this.walkTimer --;
			}
			else{
				image(walkImg[this.walkCycleCounter], this.xPos, this.yPos);
				this.walkCycleCounter--;
				this.walkTimer = 8;
				if(this.walkCycleCounter == 0){
					this.walkUp = true;
				}
			}
		}
	}
	this.walkRight = function(){
		if(this.walkUp){
			if(this.walkTimer > 0){
				scale(-1, 1);
				image(walkImg[this.walkCycleCounter], -1 * this.xPos, this.yPos);
				this.walkTimer--;
			}
			else{
				scale(-1,1);
				image(walkImg[this.walkCycleCounter], -1 * this.xPos, this.yPos);
				this.walkCycleCounter++;
				this.walkTimer = 8;
				if(this.walkCycleCounter == 4){
					this.walkUp = false;
				}
			}
		}
		else{
			if(this.walkTimer > 0){
				scale(-1, 1);
				image(walkImg[this.walkCycleCounter], -1 * this.xPos, this.yPos);
				this.walkTimer --;
			}
			else{
				scale(-1, 1);
				image(walkImg[this.walkCycleCounter], -1 * this.xPos, this.yPos);
				this.walkCycleCounter--;
				this.walkTimer = 8;
				if(this.walkCycleCounter == 0){
					this.walkUp = true;
				}
			}
		}
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
