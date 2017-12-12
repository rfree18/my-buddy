class Food{
	constructor(img, name, healthVal, cost, loveVal, hungerVal, gettingSmallerImgs){
		this.image = img;
		this.name = name;
		this.healthVal = healthVal;
		this.cost = cost;
		this.loveVal = loveVal;
		this.hungerVal = hungerVal;
		this.eatingImgs = gettingSmallerImgs;
	}
	canPurchase(){
		return myChar.properties.money >= this.cost;
	}
	purchase(){
		if(this.canPurchase()){
			myChar.properties.money-=this.cost;
			this.eat();
		}else{
			return false;
		}
	}
	eat(){
		myChar.properties.hunger += this.hungerVal;
		myChar.properties.health += this.healthVal;
		myChar.properties.love += this.loveVal;
	}
	display(num){
		switch(num){
			case 0:
				image(this.image, 440, 400);
			case 1:
				image(this.eatingImgs[0], 440, 400);
			case 2:
				image(this.eatingImgs[1], 440, 400);
			case 3:
				image(this.eatingImgs[2], 440, 400);
		}
	}
}