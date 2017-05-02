/*

A small concept of a drawing app. Uses p5.js and processing.js frameworks.

Author: Erkki Halinen

*/

//When true, hides toolbar
var hideTools = false;

var redX = 25;
var redY = 250;
var greenX = redX + 30;
var greenY = 250;
var blueX = redX + 60;
var blueY = 250;
var whiteX = redX + 90;
var whiteY = 250;

var eraserClr;

//These variables hold the selected color and tool
var selectedColor;
var selectedTool;

//image variables
var pencilTool;
var lineTool;
var decreaseImg;
var increaseImg;
var eraserImg;

//Tool variables
var pen;
var lineDraw;
var increase;
var decrease;
var eraser;

//Holds the selected pencil stroke size by default it is 4 = 2x2 pixels on the canvas
var strokeSize = 4

//Arrays containing all the drawingTool objects and all paletteColor objects
var tools = [];
var colors = [];

//The shades of the palette RGB colors 
var saturations = [255, 240, 220, 200, 180, 160, 140, 120, 100];

function setup() {
    
    createCanvas(screen.width - 100, screen.height - (screen.height / 6));
    var bg = loadImage("img/workspaceBackground.png");    
    tint(255, 255);
    
    rectMode(CENTER);
    
    background(bg);
    
    noStroke();
    
    //Load color palette
    drawColors();
    eraserClr = new paletteColor(0, 0, 4, 255);
    
    //Load tool icons and create instance of drawingTool, and push objects into array
    pencilTool = loadImage("../img/toolicons/Penciltool.png");
    pen = new drawingTool(90, 40, pencilTool, "Pencil");
    tools.push(pen);
    
    lineTool = loadImage("../img/toolicons/Linetool.png");
    lineDraw = new drawingTool(20, 40, lineTool, "Line");
    tools.push(lineDraw);
    
    increaseImg = loadImage("../img/toolicons/increase.png");
    increase = new drawingTool(90, 180, increaseImg, "increaseSize");
    tools.push(increase);
    
    decreaseImg = loadImage("../img/toolicons/decrease.png");
    decrease = new drawingTool(20, 180, decreaseImg, "decreaseSize");
    tools.push(decrease);
    
    eraserImg = loadImage("../img/toolicons/eraser.png");
    eraser = new drawingTool(50, 100, eraserImg, "eraser");
    tools.push(eraser);
    
    //Makes the pencil the default tool
    selectedTool = pen;
    
}


function draw() {
    
    if(!hideTools) {
        
        drawTools();
        
        for(var counter = 0; counter < colors.length; counter++) {
        
        colors[counter].show();
        
        }    
        
        fill(200);
        text("Stroke size", 40, 170);
        text(strokeSize.toString(), 66, 200);
        
    }
}

//Draws the toolbar which appears 
function drawTools() {
    
    //This is the background of the toolbar
    fill(61, 61, 61);
    rect(75, height / 2, 150, height);
    
    //Display toolbar icons
    for(var counter = 0; counter < tools.length; counter++) {
        
        image(tools[counter].icon, tools[counter].x, tools[counter].y );
        
    }
}


//Draws the color palette into the toolbar
function drawColors() {
    
    var counter = 0;
    var colorCounter = 0;
    //Red shade loop
    for(counter; counter < 240; ) {
        
        redShade = new paletteColor(redX, redY + counter, 0, saturations[colorCounter]);
        colors.push(redShade);
        
        counter = counter + 30;
        colorCounter++;
        
    }
    
    counter = 0;
    colorCounter = 0;
    
    //Green shade loop
    for(counter; counter < 240; ) {
        
        greenShade = new paletteColor(greenX, greenY + counter, 1, saturations[colorCounter]);
        colors.push(greenShade);
        
        counter = counter + 30;
        colorCounter++;
        
    }
    
    counter = 0;
    colorCounter = 0;
    
    //Blue shade loop
    for(counter; counter < 240; ) {
        
        blueShade = new paletteColor(blueX, blueY + counter, 2, saturations[colorCounter]);
        colors.push(blueShade);
        
        counter = counter + 30;
        colorCounter++;
        
    }
    
    counter = 0;
    colorCounter = 0;
    //White shade loop
    for(counter; counter < 240; ) {
        
        whiteShade = new paletteColor(whiteX, whiteY + counter, 3, saturations[colorCounter]);
        colors.push(whiteShade);
        
        counter = counter + 30;
        colorCounter++;
        
    }
    
}

//Function for creating an instance of a color rect in the toolbar. hue: 0 = red, 1 = green, 2 = blue, 3 = white
function paletteColor(x, y, hue, fillClr) {
    
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.fillColor = fillClr;
    
    this.show = function() {
    
      if(hue == 0) {
        
        fill(this.fillColor, 0, 0);
        
    }
    
    if(hue == 1) {
        
        fill(0, this.fillColor, 0);
        
    }
    
    if(hue == 2) {
        
        fill(0, 0, this.fillColor);
        
    }
        
    if(hue == 3) {
        
        fill(this.fillColor);
        
    }
        
        //Draws the color palette according to the hue chosen before.
        rect(this.x, this.y, 20, 20);
        
    }
} 

//function for creating an instance of a tool, who knows its x and y position, and the image its displaying, and what kind of tool it is.
function drawingTool(x, y, icon, name) {
    
    this.x = x;
    this.y = y;
    this.icon = icon;
    this.name = name;
    
}

//Activates when the user clicks with the mouse.
function mousePressed() {
    
    if(!selectToolsOrColors()) {
        
        drawOnCanvas();   
        
    }
}

//Activates when the user drags the mouse. Allows user to draw lines
function mouseDragged() {
    
    if(!selectToolsOrColors()) {
        
        drawOnCanvas();   
        
    }
}

//Paints the selected color into the canvas
function drawOnCanvas() {
    
    if(mouseX >= 152) {
        
        if(selectedTool.name === "eraser") {
            
            fill(45, 46, 46);
            
        } else {
        
        //Switchbox determines the color based on selectedColor's hue variable
        switch(selectedColor.hue) {
                
                
            case 0:
                fill(selectedColor.fillColor, 0, 0);
                break;
                
            case 1:
                fill(0, selectedColor.fillColor, 0);
                break;
                
            case 2:
                fill(0, 0, selectedColor.fillColor, 150);
                break;
                
            case 3:
                fill(selectedColor.fillColor)

            }
        }
        ellipse(mouseX, mouseY, strokeSize / 2, strokeSize / 2);
        
    }
    
}

//Checks whether the user is clicking on a tool or a color or the pencil stroke size button 
function selectToolsOrColors() {
    
    for(var counter = 0; counter < colors.length; counter++) {
        
        if(int(dist(colors[counter].x, colors[counter].y, mouseX, mouseY)) <= 20) {
            
            if(selectedTool.name === "eraser") {  } else {
            
            selectedColor = colors[counter];
            
            return true;
            
            }
        }
    }
    
    for(var counter = 0; counter < tools.length; counter++) {
        
        if(int(dist(tools[counter].x, tools[counter].y, mouseX, mouseY)) <= 20) {
            
            if(tools[counter].name === "increaseSize") {
                
                if(strokeSize < 90) {
                
                    strokeSize += 4;
                    
                    console.log(strokeSize);
                    
                }
                
            } 
            
            if(tools[counter].name === "decreaseSize") {
                    
                if(strokeSize > 4) {
                
                    strokeSize -= 4;
                    
                    console.log(strokeSize);
                
                }
                
            } else {
            
            selectedTool = tools[counter];
                
                console.log(selectedTool);
            
            return true;
            
            
            }
        }
    }
}