/*
The main JavaScript file to run our Virtual pet
Contains the draw function, which is what prints to the screen
*/

function setup() {

  myRec = new p5.SpeechRec();

  // set up our recorder to constantly monitor the incoming audio stream
  myRec.continuous = true; // do continuous recognition

  // allow partial results - this will detect words as they are said and will
  // call the parse function as soon as a word is decoded
  // when a pause in conversation occurs the entire string will be sent
  // to the parse function
  myRec.interimResults = true;

  // define our parse function (called every time a word/phrase is detected)
  myRec.onResult = parseResult;

  // start the recording engine
  myRec.start();
  myCanvas = createCanvas(750, 750);
  myCanvas.parent("sketch-holder");
  imageMode(CENTER);
  buttons.push(new Button("Status", statusButton, 150, 525));
  buttons.push(new Button("Toilet", toiletButton, 450, 525));
  buttons.push(new Button("Outside", outsideButton, 300, 675));
  buttons.push(new Button("Love", loveButton, 150, 675));
  buttons.push(new Button("Food", foodButtonPic, 300, 525));
  buttons.push(new Button("Medicine", medecineButtonPic, 600, 525));
  buttons.push(new Button("Info", infoButton, 450, 675));
  buttons.push(new Button("Save", saveButton, 600, 675));

  foodButtons.push(new Button("Apple", appleIcon, 250, 400));
  foodButtons.push(new Button("Cookie", cookieIcon, 500, 400));

  failSound.setVolume(.5);
  menuSound.setVolume(.5);
  nomSound.setVolume(.25);
  bgSong.setVolume(.05);
  bgDeadSong.setVolume(.05);
  bgDeadSongBegin.setVolume(.05);
  bgSong.loop();

  setInterval(function() {
    canLove = true;
  }, 60000);
  setInterval(function() {
    canSayHi = true;
  }, 6000);
}

function draw() {
  background(0, 0, 100);
  textSize(50);
  fill(255);
  textAlign(CENTER);

  // Determine whether or not the user is currently signed in
  if (currUser === undefined) {
    text("Please login to continue", 375, 375);
  } else if (timer > 0) {
    text(`Welcome ${currUser.displayName}!`, 375, 375);
    timer--;
  } else {
    //If dead, play the right song
    if (myChar.properties.condition.alive === false && bgSong.isPlaying()) {
      bgSong.stop();
      bgDeadSongBegin.play();
    }
    //If user is on the food menu
    pushNewFoodIcons();
    if (foodmenu) {
      image(menuBG, 375, 375);
      text("Pick a food to eat!", 375, 100);
      if (cycleFoodButtons()) {
        foodmenu = false;
        foodAni = true;
        foodAniTimer = 200;
        firstFeed = true;
      }
      if (backButton.display()) {
        failSound.play();
        foodmenu = false;
      }
    }
    //If character is eating
    else if (foodAni) {
      drawWindow();
      image(bg, 375, 375, 750, 750);
      if (firstFeed) {
        feedOrAnger = myChar.feed(foodName);
        firstFeed = false;
      }
      if (feedOrAnger) {
        foodAnimation();
      } else {
        foodAni = false;
        myChar.angerAnimation();
      }
      foodAniTimer--;
      if (foodAniTimer === 0) {
        foodAni = false;
        foodmenu = true;
      }
    }
    //If the user is on the status menu
    else if (statusMenu) {
      displayStatusMenu();
      if (backButton.display()) {
        failSound.play();
        statusMenu = false;
      }
    }
    //If the user is on the info menu
    else if (isInfoMenu) {
      image(infoMenu, 375, 375);
      text("Information", 375, 100);
      text("Version: " + version, 375, 675);
      if (backButton.display()) {
        failSound.play();
        isInfoMenu = false;
      }
    }
    //User is on the main screen, though potentially outside
    else {
      drawWindow();

      //User is outside
      if (isOutside) {
        drawOutdoorBG();
        if (backButton.display()) {
          failSound.play();
          clearInterval(checkOutsideInterval);
          isOutside = false;
        }
      }
      //User is inside
      else {
        image(bg, 375, 375, 750, 750);
        //Code to make door open if user hovers on it
        displayDoorImage();
        // Don't open door if character is dead
        if (doorIsClosed() || !myChar.properties.condition.alive) {
          image(closedDoor, 500, 290, 145, 252);
        } else {
          image(openDoor, 645, 290, 145, 252);
        }
      }
      drawPoop();
      //If the user speaks the words "hello" or "hi" into the mic
      if (myChar.properties.condition.alive === true) {
        if (seesHi) {
          myChar.loveAnimation();
          seesHi = false;
        }
        cycleButtons();
      } else {
        //If the character is dead, display the reset button
        if (resetButton.display()) {
          myChar.reset();
        }
      }
      myChar.display();
    }
  }
  clicked = false;
  seesHi = false;
}
//Similar to the drawWindow function in that it produces the correct door graphic depending on time of day
function displayDoorImage() {
  date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 9) {
    image(sunriseDoor, 500, 290, 145, 252);
  } else if (date.getHours() >= 9 && date.getHours() < 18) {
    image(dayDoor, 500, 290, 145, 252);
  } else if (date.getHours() >= 18 && date.getHours() < 20) {
    image(sunsetDoor, 500, 290, 145, 252);
  } else if (date.getHours() >= 20 || date.getHours() < 8) {
    image(nightDoor, 500, 290, 145, 252);
  }
}
//Function to determine if the door is open or closed
function doorIsClosed() {
  if (mouseX > 427.5 && mouseX < 572.5 && mouseY > 290 - 126 && mouseY < 290 + 126) {
    // Don't go outside if character is dead
    if (mouseIsPressed && myChar.properties.condition.alive) {
      menuSound.play();
      isOutside = true;
      checkOutsideInterval = setInterval(function() {
        return isOutside
      }, 240000);
    }

    return false;
  } else {
    return true;
  }
}
//Depending on the time of day, draws the appropriate sceneary when outdoors
function drawOutdoorBG() {
  date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 9) {
    image(sunrise, 375, 375);
  } else if (date.getHours() >= 9 && date.getHours() < 18) {
    image(day, 375, 375);
  } else if (date.getHours() >= 18 && date.getHours() < 20) {
    image(sunset, 375, 375);
  } else if (date.getHours() >= 20 || date.getHours() < 8) {
    image(night, 375, 375);
  }
}
//Loop through the buttons and determine what do to depending on
//the button pressed
function cycleButtons() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].display()) {
      //If the user is pressing a button...
      if (buttons[i].name === "Food") {
        foodmenu = true;
        menuSound.play();
        if (isOutside) {
          clearInterval(checkOutsideInterval);
        }
        isOutside = false;
      }
      if (buttons[i].name === "Medicine") {
        myChar.cure();
        if (isOutside) {
          clearInterval(checkOutsideInterval);
        }
        isOutside = false;
      }
      if (buttons[i].name === "Status") {
        statusMenu = true;
        menuSound.play();
      }
      if (buttons[i].name === "Toilet") {
        clearPoop();
        bubbleSound.play();
      }
      if (buttons[i].name === "Outside") {
        menuSound.play();
        isOutside = true;
        checkOutsideInterval = setInterval(function() {
          return isOutside
        }, 240000);
      }
      if (buttons[i].name === "Love") {
        myChar.loveButton();
      }
      if (buttons[i].name === "Info") {
        isInfoMenu = true;
        menuSound.play();
      }
      if (buttons[i].name === "Save") {
        saveGame();
        saveSound.play();
        console.log("Game has been saved at " + date.toString());
      }
    }
  }
}
//Empty the poop array if the toilet button is hit
function clearPoop() {
  poopOnScreen = [];
}
//display the poop on the screen
function drawPoop() {
  poopOnScreen.forEach((p) => {
    p.display();
  });
}
//Loop through the food buttons
function cycleFoodButtons() {
  for (let i = 0; i < foodButtons.length; i++) {
    if (foodButtons[i].display()) {
      foodName = foodButtons[i].name;
      return true;
    }
  }
}
//Draws the eating animation for the character
function foodAnimation(food) {
    if (foodAniTimer > 150) {
      food.display(0);
    } else if (foodAniTimer > 100) {
      food.display(1);
    } else if (foodAniTimer > 50) {
      food.display(2);
    } else if (foodAniTimer > 25) {
      food.display(3);
    }
  image(eatImg[charEatFr], 300, myChar.yPos);
  if (foodAniTimer % 15 === 0) {
    if (charEatFr === 0) {
      nomSound.play();
      charEatFr = 1;
    } else {
      charEatFr = 0;
    }
  }
}
//Displays the status menu with the correct number
//of hearts in each spot, representing how hungry
//and happy the pet is.
function displayStatusMenu() {
  image(statusScreen, 375, 375);
  let h = myChar.properties.hunger;
  let hap = myChar.properties.love;
  let x = 175;
  let y = 402;
  if (h > 0) {
    image(heart, x, y);
  }
  if (h > 10) {
    image(heart, x + 99, y);
  }
  if (h > 20) {
    image(heart, x + 99 + 99, y);
  }
  if (h > 30) {
    image(heart, x + 99 + 99 + 99, y);
  }
  if (h > 40) {
    image(heart, x + 99 + 99 + 99 + 99, y);
  }
  y += 250;
  if (hap > 0) {
    image(heart, x, y);
  }
  if (hap > 10) {
    image(heart, x + 99, y);
  }
  if (hap > 20) {
    image(heart, x + 99 + 99, y);
  }
  if (hap > 30) {
    image(heart, x + 99 + 99 + 99, y);
  }
  if (hap > 40) {
    image(heart, x + 99 + 99 + 99 + 99, y);
  }
  fill(255);
  text("Status", 375, 100);
  fill(0);
  text("Age: " + myChar.properties.age.days + " years old", 525, 200);
  image(petImg, 150, 250);
}
//Draw the window in the house, which changes depending on the time of day
function drawWindow() {
  date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 9) {
    image(sunriseWindow, 172, 172);
  } else if (date.getHours() >= 9 && date.getHours() < 18) {
    image(sunWindow, 172, 172);
  } else if (date.getHours() >= 18 && date.getHours() < 20) {
    image(sunsetWindow, 172, 172);
  } else if (date.getHours() >= 20 || date.getHours() < 8) {
    image(nightWindow, 172, 172);
  }
}

function mousePressed() {
  clicked = true;
}

//The poop object, with 3 variables: x, y, and the size (which is a random variable within a specific range)
function Poop(x, y, sz) {
  this.xPos = x;
  this.yPos = y + 50;
  this.size = sz;
  this.counter = 20;
  this.state = 0;

  //Draws the poop on the screen
  this.display = function() {
    if (this.state === 0) {
      image(poopImg1, this.xPos, this.yPos, this.size, this.size);
      this.counter--;
      if (this.counter === 0) {
        this.counter = 20;
        this.state = 1;
      }
    } else {
      image(poopImg2, this.xPos, this.yPos, this.size, this.size);
      this.counter--;
      if (this.counter === 0) {
        this.counter = 20;
        this.state = 0;
      }
    }
  }
}
//Used for speech to test to parse the result into a string
function parseResult() {
  if (canSayHi && (myRec.resultString.toLowerCase() === "hi" || myRec.resultString.toLowerCase() === "hello")) {
    seesHi = true;
    canSayHi = false;
  }
}
//Check which foods the user has unlocked
function pushNewFoodIcons(){
  if(myChar.properties.unlockables.cake){
    foodButtons.push(new Button("Cake", cakeIcon, 600, 400));
    foodButtons[0].xPos = 200;
    foodButtons[1].xPos = 400;
  }
  if(myChar.properties.unlockables.taco){
    if(foodButtons.length === 2){
      foodButtons.push(new Button("Taco", tacoIcon, 600, 400));
      foodButtons[0].xPos = 200;
      foodButtons[1].xPos = 400;
    }
    else{
      foodButtons.push(new Button("Taco", tacoIcon, 600, 400));
      foodButtons[0].xPos = 150;
      foodButtons[1].xPos = 300;
      foodButtons[2].xPos = 450;
    }
  }
  if(myChar.properties.unlockables.pear){

  }
  if(myChar.properties.unlockables.sushi){

  }
  if(myChar.properties.unlockables.pizza){
    
  }
}