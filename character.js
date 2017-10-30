function Character(obj){
	if(obj === undefined) {
		this.properties = {
			name: "",
			health: 50,
			hunger: 0,
			dirty: 0,
			love: 0,
			stage: 0,
			age: {
				hours: 0,
				minutes: 0,
				days: 0
			},
		};
	} else {
		this.properties = obj;
	}

	this.xPos = 375;
	this.yPos = 375;


	//The array of images that represent the current character
	this.imgArr = [];
	//The stage is similar to the age, but is changed at specific ages.  0 is the baby stage

	this.condition = 0;
	//condition can be:
		//0 for fine
		//1 for sick
		//2 for mad
		//-1 for dead

	this.walkCycle = walkImg;
	this.walkDir = 1;
	this.walkUp = true;
	this.walkCycleCounter = 0;
	this.walkTimer = 8;

	this.wait = false;

	this.intervalIds = [];

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
		this.properties.age.minutes += 1;
		if(this.properties.age.minutes >= 60) {
			this.properties.age.minutes -= 60;
			this.properties.age.hours += 1;
		}

		if(this.properties.age.hours >= 24) {
			this.properties.age.hours -= 24;
			this.properties.age.days += 1;
		}
	};
	this.setIntervals = function(){
		//SET ALL INTERVALS FOR ALL OF THE HUNGER, HAPPINESS, ETC FUNCTIONS
		
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
		this.love += 5;
	};
	this.giveHate = function(){
		//Decrement the love variable
		this.love -= 5;
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
		//Increment hunger
		this.properties.hunger += 1;
	};
	this.cure = function(){
		let i = random(2);
		if(i <= 1){
			//still sick
		}
		else{
			//cured!
		}
	}
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
