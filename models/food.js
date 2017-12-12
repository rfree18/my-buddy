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
				
			case 1:
			case 2:
			case 3:
		}
	}
}