function Character(obj){
	if(obj === undefined) {
		this.properties = {
			name: "",
			health: 50,
			hunger: 0,
			dirty: 0,
			love: 0,
			stage: 0,
			condition: {
				asleep: false,
				sick: false,
				mad: false,
				alive: true
			},
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

	this.isPooping = false;
	this.walkCycle = walkImg;
	this.walkDir = 1;
	this.walkUp = true;
	this.walkCycleCounter = 0;
	this.walkTimer = 8;
	this.frameTimer = 20;
	this.frameState = 0;
	this.maxHealth = 100;
	this.maxHunger = 50;

	this.wait = false;

	this.display = function(){
		//Later on, display pet
		if(!this.properties.condition.alive){

		}
		else if(this.properties.condition.asleep){

		}
		else if(this.isPooping){
			if(this.frameState === 0){
				image(charPoopImg, this.xPos-3, this.yPos);
				this.frameTimer--;
				if(this.frameTimer % 15 === 0){
					this.frameState = 1;
				}
			} else{
				image(charPoopImg, this.xPos+3, this.yPos);
				this.frameTimer--;
				if(this.frameTimer % 15 === 0){
					this.frameState = 0;
				}
			}
			if(this.frameTimer === 0){
				this.isPooping = false;
				poopOnScreen.push(new Poop(this.xPos, this.yPos, random(60) + 50));
			}
		}
		else if(this.properties.condition.sick){
			if(this.frameState === 0){
				image(sickImg[0], 375, this.yPos);
				this.frameTimer--;
				if(this.frameTimer === 0){
					this.frameState = 1;
					this.frameTimer = 20;
				}
			}
			else{
				image(sickImg[1], 375, this.yPos);
				this.frameTimer--;
				if(this.frameTimer === 0){
					this.frameState = 0;
					this.frameTimer = 20;
				}
			}
		}
		else if(this.properties.condition.mad){

		}
		else{
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
		}
	};
	this.setIntervals = function(){
		//SET ALL INTERVALS FOR ALL OF THE HUNGER, HAPPINESS, ETC FUNCTIONS
		var intids = {
			//Update age every minute
			ageInt: setInterval(function(){myChar.updateAge()}, 60000),
			//Update hunger every 5 minutes
			hungerInt: setInterval(function(){myChar.makeHungry()}, 300000),
			//Check if love should be decremented every 5 minutes
			loveInt: setInterval(function(){myChar.giveHate()}, 300000),
			//Check if health should be decremented every 5 minutes
			healthInt: setInterval(function(){myChar.decrementHealth()}, 300000),
			//Poop every so-often
			poopInt: setInterval(function(){myChar.poop()}, 10000),
		};
		return intids;
	};
	this.sayHi = function(){
		//Implement to say hi when the user speaks the words "hello" or "hi" into the mic
	};
	this.poop = function(){
		this.isPooping = true;
		this.frameTimer = 130;
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
	this.decrementHealth = function(){
		//Subtract from health
		//If health < 15, pet is ill
		//If health is 0, pet is dead
	};
	this.changeStage = function(){
		//Using the health as one variable, and another later implemented
		//"good care" variable, change the stage to the appropriate character
	};
	this.giveLove = function(){
		//Add to the pet's love variable
		this.properties.love += 5;
		clearInterval(this.intervalIds.loveInt);
		this.intervalIds.loveInt = setInterval(this.giveHate(), 600000);
	};
	this.giveHate = function(){
		//Decrement the love variable
		this.properties.love -= 2;
	};
	this.feed = function(food){
		//Increment the hunger variable
		//Possibly give love if the food is good
		//Possibly take love if the food is disliked by this character
		if(this.properties.hunger < this.maxHunger){
			if(food === "Apple"){
				this.properties.hunger += 10;
				this.properties.health += 5;
				return true;
			}
			else if(food === "Cookie"){
				this.hunger += 10;
				this.health -=5;
				this.giveLove();
				return true;
			}
		} else{
			return false;
		}
	};
	this.makeHungry = function(){
		//Decrement
		this.properties.hunger -= 5;
	};
	this.cure = function(){
		if(this.properties.condition.sick === true){
			this.medAnimation();
		}
		let f = function(){
			let i = random(2);
			if(i >= 1){
				return false;
			}
			else{
				return true;
			}
		}
		if(f()){
			this.properties.condition.sick = false;
		}
	}
	this.medAnimation = function(){

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
	this.intervalIds = this.setIntervals();
}
