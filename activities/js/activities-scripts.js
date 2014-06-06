
/* Global functions used by activities*/

//GLOBALS
var imgLayer = null;
var txtLayer = null;
var images = {};
var tweens = {};

//Template of the object passed to the drawImage and createTween functions
var object = {
    imgName: null, //(string) the name of the image
    imgSrc: null, //(string) the url src of the image
    posX: null, //(float) the starting x coordinate 
    posY: null, //(float) the starting y coordinate 
    movX: null, //(float) the amount of x movement +ve or -ve
    movY: null, //(float) the amount of y movement +ve or -ve
    scale: null, //(float) the amount of scale on original image (1.0 is none)
    scaleTo: null, //(float) the amount of scaling during the tween
    rotation: null,//(integer 0-360) rotation during the tween
    duration: null,//(integer) duration of tween in seconds 
    easing: null,//any easing eg EaseIn, EaseOut, EaseInOut (Linear is default)*  
    callback: function() { //any callback script to be run at the end of the tween
    }};

//*For all easings: http://www.html5canvastutorials.com/kineticjs/html5-canvas-all-easing-functions-with-kineticjs/

//Array with completion messages, used by some activities - shown randomly
messages = ["well done", "you did it", "all finished", "awesome job",
    "too cool", "excellent", "great work", "you are the best", "you are smart"];

//Initialises the container according to the dimensions
function initStage() {
//set the stage
    stage = new Kinetic.Stage({
        container: 'container',
        width: $("#container").width(),
        height: $("#container").height()
    });
}

//Initialises the separate layers used for images and text
function initLayers() {

    imgLayer = new Kinetic.Layer();
    txtLayer = new Kinetic.Layer();
    stage.add(imgLayer);
    stage.add(txtLayer);

    var canvas1 = imgLayer.getCanvas();
    //canvas1.setPixelRatio(1);
    canvas1.setWidth($("#container").width());
    canvas1.setHeight($("#container").height());
    var canvas2 = txtLayer.getCanvas();
    //canvas2.setPixelRatio(1);
    canvas2.setWidth($("#container").width());
    canvas2.setHeight($("#container").height());
}

//Draws the text on the canvas, in the required position and size
//parameters: posX: x coord, posY:y coord, size: font size, message: message string
function drawText(posX, posY, size, message) {

    message = message.replace(/_/g, " ");

    txtLayer.removeChildren();

    var textMsg = new Kinetic.Text({
        x: posX,
        y: posY,
        text: message,
        fontSize: size,
        fontStyle: "bold",
        fontFamily: 'Comic Sans MS',
        shadowColor: "darkgrey",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        stroke: "black",
        strokeWidth: 1,
        fill: 'white'
    });
    //center the text
    textMsg.offsetX(textMsg.width() / 2);
    txtLayer.add(textMsg);
    stage.add(txtLayer);
}//end drawText

//Draws the image on the image layer, which is stored in the images array,
//then used by createTween function
//parameter: the object (described above) 
function drawImage(object) {

    var imageObj = new Image();
    imageObj.src = object.imgSrc;
    imageObj.onload = function() {
        var image = new Kinetic.Image({
            x: object.posX,
            y: object.posY,
            scaleX: typeof (object.scale) === "undefined" ? 0 : object.scale,
            scaleY: typeof (object.scale) === "undefined" ? 0 : object.scale,
            image: imageObj
        });
        image.hide();
        imgLayer.add(image);
        stage.add(imgLayer);

        //add image to images object
        images[object.imgName] = image;
        createTween(image, object);
    };
}

//Creates the tween on the image layer, which is stored in the tweens array
//parameter: image - the image created by drawImage; the object (described above) 
function createTween(image, object) {

    var newPosX = typeof (object.movX) === "undefined" ? 280 : image.getX() + object.movX;
    var newPosY = typeof (object.movY) === "undefined" ? 50 : image.getY() + object.movY;

    var tween = new Kinetic.Tween({
        node: image,
        force3D: true,
        rotation: typeof (object.rotation) === "undefined" ? 0 : object.rotation,
        duration: object.duration,
        easing: Kinetic.Easings[object.easing],
        x: newPosX,
        y: newPosY,
        scaleX: typeof (object.scaleTo) === "undefined" ? 0 : object.scaleTo,
        scaleY: typeof (object.scaleTo) === "undefined" ? 0 : object.scaleTo,
        onFinish: function() {
            object.callback();
        }
    });

    //add tween to tweens object
    tweens[object.imgName] = tween;
}