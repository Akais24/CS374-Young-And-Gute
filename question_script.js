$(document).ready(function(){
    $(".question").text(queries[0]["question"]);
});

function putimage(img_ind, img_num){
	document.getElementById("image"+img_ind).src = "images/"+img_num+".jpg";
}

$("#btn1").click(function() {
           

		$("#image1").fadeToggle(1000);


});


$("#btn2").click(function() {
           

		$("#image2").fadeToggle(1000);

});

$("#btn3").click(function() {
           

		$("#image5").fadeToggle(1000);
$("#image6").fadeToggle(1000);
$("#image7").fadeToggle(1000);
$("#image8").fadeToggle(1000);

});

putimage(1,1);
putimage(2,2);
putimage(3,3);
putimage(4,4);
putimage(5,5);
putimage(6,6);
putimage(7,7);
putimage(8,8);
