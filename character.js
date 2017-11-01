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
			date: Date.now()
		};
	} else {
		this.properties = obj;

		// Number of minutes passed
		const diff = Math.floor((this.date - Date.now()) / 1000 / 60);
		const diff5 = Math.floor(diff / 5);

		this.decrementHealth(diff5);
		this.giveHate(diff5);
		this.makeHungry(diff5);
		this.updateAge(diff);

	}
	this.xPos = 375;
	this.yPos = 375;

	//The array of images that represent the current character
	this.imgArr = [];
	//The stage is similar to the age, but is changed at specific ages.  0 is the baby stage

	this.isPooping = false;
	this.isBeingMedicated = false;
	this.walkCycle = walkImg;
	this.walkDir = 1;
	this.walkUp = true;
	this.walkCycleCounter = 0;
	this.walkTimer = 8;
	this.frameTimer = 20;
	this.frameState = 0;
	this.maxHealth = 100;
	this.maxHunger = 50;

	this.noAni = false;
	this.wait = false;

	this.display = function(){
		//Later on, display pet
		if(!this.properties.condition.alive){

		}
		else if(this.properties.condition.asleep){

		}
		else if(this.isBeingMedicated){
			image(charPoopImg, this.xPos, this.yPos);
			if(this.frameTimer > 80){
				image(syringes[0], 420, 330);
			}
			else if(this.frameTimer > 60){
				image(syringes[1], 420, 330);
			}
			else if(this.frameTimer > 40){
				image(syringes[2], 420, 330);
			}
			else if(this.frameTimer > 20){
				image(syringes[3], 420, 330);
			}
			else if(this.frameTimer > 0){
				image(syringes[4], 420, 330);
			}
			else if(this.frameTimer === 0){
				this.isBeingMedicated = false;
			}
			this.frameTimer--;
		}
		else if(this.noAni){
			if(this.frameState === 0){
				image(madImg[0], 375, this.yPos);
				this.frameTimer--;
				if(this.frameTimer % 15 === 0){
					this.frameState = 1;
				}
			} else{
				image(madImg[1], 375, this.yPos);
				this.frameTimer--;
				if(this.frameTimer % 15 === 0){
					this.frameState = 0;
				}
			}
			if(this.frameTimer === 0){
				this.noAni = false;
			}
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
		a = setInterval(()=>{this.updateAge()}, 60000);
		b = setInterval(()=>{this.makeHungry()}, 300000);
		c = setInterval(()=>{this.giveHate()}, 300000);
		d = setInterval(()=>{this.decrementHealth()}, 300000);
		e = setInterval(()=>{this.poop()}, 10000);
		//SET ALL INTERVALS FOR ALL OF THE HUNGER, HAPPINESS, ETC FUNCTIONS
		var intids = {
			//Update age every minute
			ageInt: a,
			//Update hunger every 5 minutes
			hungerInt: b,
			//Check if love should be decremented every 5 minutes
			loveInt: c,
			//Check if health should be decremented every 5 minutes
			healthInt: d,
			//Poop every so-often
			poopInt: e,
		};
		return intids;
	};
	this.sayHi = function(){
		//Implement to say hi when the user speaks the words "hello" or "hi" into the mic
	};
	this.poop = function(){
		if(!this.properties.condition.sick && this.properties.condition.alive){
			this.isPooping = true;
			this.frameTimer = 130;
		}
	};
	this.updateAge = function(val){
		console.log(date.getMinutes());
		//Implement a method to take in the time and change the age of the pet
		const incr = val || 1;

		this.properties.age.minutes += incr;
		while(this.properties.age.minutes >= 60) {
			this.properties.age.minutes -= 60;
			this.properties.age.hours += 1;
		}

		while(this.properties.age.hours >= 24) {
			this.properties.age.hours -= 24;
			this.properties.age.days += 1;
		}

		// Auto-save character
		saveGame();
	};
	this.decrementHealth = function(val){
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
		this.intervalIds.loveInt = setInterval(()=>{this.giveHate()}, 600000);
	};
	this.giveHate = function(val){
		//Decrement the love variable
		const mult = val || 1;
		this.properties.love -= 2 * mult;
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
	this.makeHungry = function(val){
		//Decrement
		const mult = val || 1;
		this.properties.hunger -= 5 * mult;
	};
	this.makeSick = function(){
		this.frameTimer = 20;
		this.properties.condition.sick = true;

	}
	this.cure = function(){
		if(this.properties.condition.sick === true){
			this.medAnimation();
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
		else{
			this.angerAnimation();
		}
	}
	this.angerAnimation = function(){
		this.frameTimer = 100;
		this.noAni = true;
	}
	this.medAnimation = function(){
		this.isBeingMedicated = true;
		this.frameTimer = 120;
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
