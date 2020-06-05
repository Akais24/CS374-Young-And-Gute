function setImageVisible(id, visible) {
    var img = document.getElementById(id);
    img.style.visibility = (visible ? 'visible' : 'hidden');
}

var fgImage = null;

function loadImage(){
  var imgcanvas = document.getElementById("testcanvas");
  var upimg = document.getElementById("image");
  fgImage = new SimpleImage(upimg);
  fgImage.drawTo(imgcanvas);
}


        $("#btn").click(function() {
           

		remove("testcanvas");


        });


        $("#btn2").click(function() {
           

		move("testcanvas");

        });



function Redscale(canvas){
  for(var pixel of fgImage.values()){
  pixel.setRed(255); 
}
 // graycanvas =document.getElementById("testcanvas");
  
  fgImage.drawTo(canvas);
}

function remove(canvasid){

  canvas = document.getElementById(canvasid);

  Redscale(canvas);

  $(canvas).fadeToggle(3000);
}

function move(canvasid){

           var main = document.getElementById(canvasid);
           var render = main.getContext("2d");
           main.width = 200;
           main.height = 200;
           main.style.left = "100px";
           main.style.top = "100px";
           main.style.position = "absolute";
	   fgImage.drawTo(main);

}


$(document).ready(function() {




});



