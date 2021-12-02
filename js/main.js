const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const rows = 10;
const cols = 10;
const cellW = width / rows;
const cellH = height / cols;

class Character{
    constructor(col,row){
        this.col = col;
        this.row = row;
        this.score = 0;
        this.images = {
           up: new Image(),
           right: new Image(),
           left: new Image(),
           down: new Image()
        };
        this.images.up.src = './images/character-up.png';
        this.images.right.src = './images/character-right.png';
        this.images.left.src = './images/character-left.png';
        this.images.down.src = './images/character-down.png';

        this.image = this.images.right;
    }
    checkPosition(){
        this.row = this.row >= rows-1 ? rows-1 : this.row;
        this.row = this.row <= 0 ? 0 : this.row;
        this.col = this.col >= cols-1 ? cols-1 : this.col;
        this.col = this.col <= 0 ? 0 : this.col;
    }
    moveUp(){
        this.row -= 1;
        this.image = this.images.up;
    }
    moveRight(){
        this.col += 1;
        this.image = this.images.right;
    }
    moveDown(){
        this.row += 1;
        this.image = this.images.down;
    }
    moveLeft(){
        this.col -= 1;
        this.image = this.images.left;
    }
}

class Treasure{
    constructor(col,row){
        this.col = col;
        this.row = row;
        this.image = new Image();
        this.image.src='./images/treasure.png';
    }
    setRandomPosition(col,row){
        this.col = col;
        this.row = row;
    }
}

const character = new Character(0,0)
const treasure = new Treasure(0,0)
treasure.setRandomPosition(Math.floor(cols*Math.random()),Math.floor(rows*Math.random()));



// Iteration 1
function drawGrid() {
  // TODO: write the code of the function
  
  let x = 0;
  let y = 0;

  for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++){
        context.strokeRect(x, y, cellW, cellW);
        x+= cellW;
      }
      x= 0;
      y+= cellH;
  }

}

function drawEverything() {

    context.clearRect(0,0,width, height);
    drawGrid();
    drawPlayer();
    drawTreasure();
    drawScore();
}

function drawPlayer(){
    context.drawImage(character.image,character.col*cellW,character.row*cellH);
}


function drawTreasure(){
    context.drawImage(treasure.image,treasure.col*cellW,treasure.row*cellH,cellW,cellH);
}

function drawScore(){
    context.fillStyle = "#000";
    context.fillRect(width-50,0,50,20);
    context.fillStyle = "#fff";
    context.font = '18px sans-serif';
    context.fillText(character.score, width-47, 17);
}


window.onload = function() {

    window.addEventListener('keydown', (event) => {
        // Stop the default behavior (moving the screen to the left/up/right/down)
        event.preventDefault();
    
        // React based on the key pressed
        switch (event.keyCode) {
            case 37:
            character.moveLeft();
            break;
            case 38:
            character.moveUp();
            break;
            case 39:
            character.moveRight();
            break;
            case 40:
            character.moveDown();
            break;
        }
        character.checkPosition();
        if(character.col == treasure.col && character.row == treasure.row){
            character.score ++;
            treasure.setRandomPosition(Math.floor(cols*Math.random()),Math.floor(rows*Math.random()));
        }
        drawEverything();
        
    });

    drawEverything();
};

