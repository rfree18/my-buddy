function Character(obj){
	if(obj === undefined) {
			this.name = "Billy";

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
		this.stage = 0;
		//Happiness variable: 0 is least happy to 10 most happy
		this.happiness = 0;
	} else {
		this.name = obj.name;

		//Represents health of the user's pet
		this.health = obj.health;
		//Represents how hungry the pet is: 0 is very hungry, 10 is full.
		this.hunger = obj.hunger;
		//Represents how clean the pet is: the higher the number, the dirtier the pet
		this.dirty = obj.dirty;
		//Amount of love given to pet: can go negative
		this.love = obj.love;
		//Age measured in hours, minutes, and days
		this.age = obj.age;
		this.stage = obj.stage;
		//Happiness variable: 0 is least happy to 10 most happy
		this.happiness = obj.happiness;
	}

	this.xPos = 375;
	this.yPos = 375;


	//The array of images that represent the current character
	this.imgArr = [];
	//The stage is similar to the age, but is changed at specific ages.  0 is the baby stage


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
