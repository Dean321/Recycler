var bananaImg, canImg, gearImg, leftBeltImg, middleBeltImg, 
    rightBeltImg, sideTrackImg, topTrackImg, x1, x2, 
    peel, peelGroup, can, canGroup, mouse, 
    paperBinImg, paperBin, trashBinImg, trashBin, 
    plasticBinImg, plasticBin, canBinImg, canBin,
    wrongImg, wrong, canvas, chineseContainerImg, 
    paper, paperGroup, plastic, plasticGroup, 
    plasticBottleImg, randomFuncNumber, randomPictureNumber,
    pepsi, _7up, fanta, miranda, sprite

function preload(){
  bananaImg = loadImage("assets/bananaPeel.png")
  canImg = loadImage("assets/can.png")
  gearImg = loadImage("assets/gear.png")
  leftBeltImg = loadImage("assets/leftBelt.png")
  middleBeltImg = loadImage("assets/middlebelt.png")
  rightBeltImg = loadImage("assets/rightbelt.png")
  sideTrackImg = loadImage("assets/sideTrack.png")
  topBeltImg = loadImage("assets/topTrack.png")
  paperBinImg = loadImage("assets/paperBin.png")
  trashBinImg = loadImage("assets/trashBin.png")
  plasticBinImg = loadImage("assets/plasticBin.png")
  canBinImg = loadImage("assets/canDustbin.png")
  wrongImg = loadImage("assets/wrong.png")
  chineseContainerImg = loadImage("assets/chineseContainer.png")
  plasticBottleImg = loadImage("assets/plasticBottle.png")
  pepsi = loadImage("assets/pepsiCan.png")
  _7up = loadImage("assets/7up.png")
  fanta = loadImage("assets/fanta.png")
  miranda = loadImage("assets/mirandaCan.png")
  sprite = loadImage("assets/sprite.png")
}

function setup() {
  /** canvas =  */createCanvas(660,800);
  // canvas.mousePressed() // Doesn't work with this version

  //For Scrolling Effect
  x1 = 0
  x2 = -width

  canGroup = new Group() // Group for Cans
  peelGroup = new Group() // Group for Peels
  plasticGroup = new Group() // Group for Plastic
  paperGroup = new Group() // Group for Paper

  // Mouse Sprite for helping with picking stuff from the belt
  mouse = createSprite(10,10,10,10)
  mouse.type = "mouse"
  mouse.visible = false

  // Yellow CANS Bin
  canBin = createSprite(70, 670)
  canBin.addImage(canBinImg)
  canBin.scale = 0.5

  // Green TRASH Bin
  trashBin = createSprite(235, 670)
  trashBin.addImage(trashBinImg)
  trashBin.scale = 0.5

  // Blue PAPER Bin
  paperBin = createSprite(400, 670)
  paperBin.addImage(paperBinImg)
  paperBin.scale = 0.5

  // Red PLASTIC Bin
  plasticBin = createSprite(565, 670)
  plasticBin.addImage(plasticBinImg)
  plasticBin.scale = 0.5

  // Sprite to show incorrect option
  wrong = createSprite(70, 670)
  wrong.addImage(wrongImg)
  wrong.scale = 0.2

}

function draw() {
  background("lightblue");
  //To make mouse with our Mouse
  mouse.x = mouseX
  mouse.y = mouseY

  // Keeping the WRONG sprite invisible
  wrong.visible = false

  //First Idea
  image(sideTrackImg, x1, 50, width, 100)
  image(sideTrackImg, x2, 50, width, 100)
  x1 += 3
  x2 += 3
  if(x1 > width){
    x1 = -width + x2
  }
  if(x2 > width){
    x2 = -width + x1
  }

  //Second Idea
  image(topBeltImg, x1, 200, width, 100)
  image(topBeltImg, x2, 200, width, 100)
  x1 += 3
  x2 += 3
  if(x1 > width){
    x1 = -width + x2
  }
  if(x2 > width){
    x2 = -width + x1
  }

  //Third Idea
  image(leftBeltImg, 55, 440, 100, 100)
  image(middleBeltImg, 145, 440, 100, 100)
  image(rightBeltImg, 240, 440, 100, 100)
    
  if(frameCount % 100 == 0){ // Generate a trash item every 100 frames
    randomFuncNumber = 1//Math.round(random(1,4)) // Random number between 1 to 4
    switch(randomFuncNumber){
      case 1:
              createCans() // Making Cans appear
              break
      case 2: 
              createPeels() // Making Peels appear
              break
      case 3:
              createPaper() // Making Chinese Food Containers appear
              break
      case 4:
              createPlastic() // Making Plastic bottles appear
              break
      default:
              console.log("randomFuncNumber switch-case broke")
    }
  }
  
  // if(mousePressedOver(canGroup)) // Will not work on groups
  if (mouseIsPressed === true){
    mouse.isTouching(canGroup, changeSprites)
    mouse.isTouching(peelGroup, changeSprites)
    mouse.isTouching(paperGroup, changeSprites)
    mouse.isTouching(plasticGroup, changeSprites)
  }
 
  if(mouseIsOver(canBin)){ // CANS YELLOW BIN
    // console.log(83, mouse.type) // For checking purpose
    if(mouse.type == "can"){
      throwTrash()
    }
    else{
      if(mouse.type!="mouse"){
        wrong.x = canBin.x 
        wrong.y = canBin.y
        wrong.visible = true
      }
    }
  }
  if(mouseIsOver(trashBin)){ // PEELS GREEN BIN
    // console.log(83, mouse.type) // For checking purpose
    if(mouse.type == "peel"){
      throwTrash()
    }
    else{
      if(mouse.type!="mouse"){
        wrong.x = trashBin.x
        wrong.y = trashBin.y
        wrong.visible = true
      }
    }
  }
  if(mouseIsOver(paperBin)){ // PAPER BLUE BIN
    // console.log(83, mouse.type) // For checking purpose
    if(mouse.type == "paper"){
      throwTrash()
    }
    else{
      if(mouse.type!="mouse"){
        wrong.x = paperBin.x
        wrong.y = paperBin.y
        wrong.visible = true
      }
    }
  }
  if(mouseIsOver(plasticBin)){ // PLASTIC RED BIN
    // console.log(83, mouse.type) // For checking purpose
    if(mouse.type == "plastic"){
      throwTrash()
    }
    else{
      if(mouse.type!="mouse"){
        wrong.x = plasticBin.x
        wrong.y = plasticBin.y
        wrong.visible = true
      }
    }
  }
  
  drawSprites();
  text(mouseX+","+mouseY, mouseX, mouseY)
}

function createCans(){ // Function to create cans
  // if(frameCount % 100 == 0){
    randomPictureNumber = Math.round(random(1,6)) // random number to choose different type of can
    can = createSprite(-50,  60)
    switch(randomPictureNumber){
      case 1:
              can.addImage(canImg) // Coco-cola picture
              break
      case 2:
              can.addImage(pepsi) // Pepsi Picture
              break
      case 3:
              can.addImage(sprite) // Sprite Picture
              break
      case 4:
              can.addImage(_7up) // 7up Picture
              break
      case 5:
              can.addImage(fanta) // Fanta Picture
              break
      case 6:
              can.addImage(miranda) // Miranda Picture
              break
      default:
              console.log("randomPictureNumber switch-case broke")
    }
    
    can.scale = 0.2;
    can.velocityX = 3;
    can.type = "can"
    canGroup.add(can)
  // }
}

function createPeels(){ // Function to create peels
  // if(frameCount % 100 == 0){
    peel = createSprite(-50,  60)
    peel.addImage(bananaImg)
    peel.scale = 0.2;
    peel.velocityX = 3;
    peel.type = "peel"
    peelGroup.add(peel)
  // }
}

function createPaper(){ // Function to create chinese food containers
  // if(frameCount % 100 == 0){
    paper = createSprite(-50,  60)
    paper.addImage(chineseContainerImg)
    paper.scale = 0.2;
    paper.velocityX = 3;
    paper.type = "paper"
    paperGroup.add(paper)
  // }
}

function createPlastic(){ // Function to create plastic bottles
  // if(frameCount % 100 == 0){
    plastic = createSprite(-50,  60)
    plastic.addImage(plasticBottleImg)
    plastic.scale = 0.2;
    plastic.velocityX = 3;
    plastic.type = "plastic"
    plasticGroup.add(plastic)
  // }
}

function changeSprites(m, c){ // For picking stuff from belt
  m.destroy()
  mouse = c
  console.log("118",c)
}

// function mousePressed() { //Has been discontinued, will not work
//   console.log("mousePressed")
//   mouse.isTouching(canGroup, changeSprites)
// }

function throwTrash(){ // To drop trash in the bin
    mouse.destroy()
    mouse = createSprite(mouseX, mouseY, 10, 10)
    mouse.type = "mouse"
    mouse.visible = false
}