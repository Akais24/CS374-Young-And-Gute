function setImageVisible(id, visible) {
    var img = document.getElementById(id);
    img.style.visibility = (visible ? 'visible' : 'hidden');
}

$(document).ready(function() {

        $("#btn").click(function() {

            if($("#displayDiv").css("display") == "none") {

                $("#displayDiv").show();
            }
           
            else {

		$("#displayDiv").fadeToggle(3000);

                //$("#displayDiv").hide();
            }
        });
});

var fgImage = null;

function loadImage(){
var imgcanvas = document.getElementById("redcanvas");
var upimg = document.getElementById("image");
fgImage = new SimpleImage(upimg);
fgImage.drawTo(imgcanvas);
}

function Redscale(){
  for(var pixel of fgImage.values()){
     var  avg= (pixel.getRed()+pixel.getGreen()+pixel.getBlue());
  if ( avg < 128) {
  pixel.setRed(2*avg);
  pixel.setGreen(0);
  pixel.setBlue(0);
      }
   else{
     pixel.setRed(255);
     pixel.setGreen((2*avg)-255);
   } 
}
  graycanvas =document.getElementById("redcanvas");
  
  fgImage.drawTo(graycanvas);
}