//Creation&Computation
//reads 2 sensor values from arduino
//draws a circles based on the analog sensor values
//requires p5.serialcontrol to be running
//and arduino running the sensorOutput1 sketch




var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFD121';  // fill in your serial port name here
var buttonValues = [];  //array that will hold all values coming from arduino


var punch;  // define variables
var punchLeft;



var trump;
//var trump2
var GloveImg1;
var TrumpImg1;
var TrumpImg2;
var TrumpImg3;
//var TrumpImg2;
//var inData; inData was what I used when just doing one serial input, not needed w 2
var RingImg;

var punchSound;
var punchSound2;


function preload() // preload image/sound assets
{
TrumpImg1 = loadImage("assets/trump1.png");
GloveImg1 = loadImage("assets/R_glove.png");
GloveImg2 = loadImage("assets/L_glove.png");
RingImg = loadImage("assets/ring_bg.png");
TrumpImg2 = loadImage("assets/trump2.png");
TrumpImg3 = loadImage("assets/trump3.png");

punchSound = loadSound('assets/punch.mp3');  
punchSound2= loadSound('assets/crowd.mp3');
       //Sound
//soundFormats('mp3');
}





function setup() {
  createCanvas(windowWidth,windowHeight);
  
  
  
  trump = createSprite(width/2, height/3, 100, 175);
  trump.addImage(TrumpImg1);
  trump.mouseActive = true;
  punch = createSprite(width/2, height/1.3, 150, 200);
  punch.addImage(GloveImg1);
  punchLeft = createSprite(width/2.5, height/1.3, 150, 200);
  punchLeft.addImage(GloveImg2);

  //trump2 = createSprite(width/2, height/3, 100, 175);


//trump.addImage("normal", TrumpImg1);
//trump.addAnimation("react", "assets/trump2.png", "assets/trump1.png");


  //trump.onMouseOver = function() {
   // this.scale = 2;
 

 //trump.onMouseOut = function() {
   // this.scale = 1;
  //}




//Setting up the serial port

serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', console.log);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data',dataReceived);   //when data is received execute the dataReceived function
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port


}
  
function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
//function serialEvent() {
   //inData = String.fromCharCode(serial.read());

function dataReceived()   //this function is called every time data is received
{
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
console.log(rawData);
    if(rawData.length>1)                      //check that there is something in the string
    {                                         //values received in pairs  index,value
      var incoming = rawData.split(",");      //split the string into components using the comma as a delimiter
      for(var i=0;i<incoming.length;i++)
      {
        buttonValues[i]=parseInt(incoming[i]);        //convert the values to ints and put them into the buttonValues array
      }
    }
}





function serialError(err) {
  console.log('Shhhhiiiiiit, Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}




function draw() {
	
  //background(255);
  background(RingImg);
  //console.log(trump2);

// PUNCHING
  if(buttonValues[1]||mouseIsPressed == 1){ //if yellow wired Button is pressed
    //Left Punch Actions
    punchLeft.position.y -= 50;
    punchLeft.overlap(trump, swapImage2)
    //punchSound2.play();
  }

 
  else {
    //punch.velocity.x = (mouseX-punch.position.x)*0.2; // follows mouse movement
    //punch.velocity.y = (mouseY-punch.position.y)*0.2;
    trump.addImage(TrumpImg1);
     //punch.position.y -= 100;


  }



if(buttonValues[0]||mouseIsPressed == 1){ //if blue is pressed
  //   //do something
    punch.position.y -= 50;
    punch.overlap(trump, swapImage)
    punchSound.play();
    }

   else {
	  //punch.velocity.x = (mouseX-punch.position.x)*0.2; // follows mouse movement
	  //punch.velocity.y = (mouseY-punch.position.y)*0.2;
    trump.addImage(TrumpImg1);
	 //punch.position.y -= 100;

  }


	drawSprites();

}

function swapImage(){
  trump.addImage(TrumpImg2);
  punch.position.y = width/2, height/1.3;

 }




function swapImage2(){
 trump.addImage(TrumpImg3);
 punchLeft.position.y = width/2.5, height/1.3;
}








 //if (trump.mouseIsOver && mouseIsPressed) {
    //trump.rotation += 4;
  //}












