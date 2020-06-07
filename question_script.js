let history = [];
let curQNI = undefined;
let actimg = 0;

let imgpnt = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

$(document).ready(function(){
    var first = {
        question: questions[0],
        images: products.slice(0, maxImageLimit).map(extractDataFromProduct)
    };

    newQ(first);
});

function fin(){
    $(".query").fadeIn();
}

function fout(fun){
    $(".query").fadeOut(fun);
}

function newQ(qni){
<<<<<<< HEAD
    //console.log('newQ');
=======
>>>>>>> a0d6ae2f9941ac91d724055623f1bafcfb87373d
    fout(function(){
        var curQNI = qni;
        var query = qni.question;	
        questionIndex = query["qId"];
<<<<<<< HEAD
        //console.log(questionIndex);
=======
>>>>>>> a0d6ae2f9941ac91d724055623f1bafcfb87373d
        $(".question").text(query["question"]);
		$(".choices").empty();
		
        var choices = query["answers"];
        for(var i=0; i<choices.length; i++){
<<<<<<< HEAD
            //console.log(choices[i]);
=======
>>>>>>> a0d6ae2f9941ac91d724055623f1bafcfb87373d
            var b = $('<button type="button" class="btn btn-default">').text(choices[i]).data("idx", i);
            b.click(function(){
                history.push(curQNI);
                var idx = $(this).data("idx");
                var next = getNextQuestionAndImages(idx, undefined);
                newQ(next);
            })
            $(".choices").append(b);
        }
    }); 
    fin();

	var curimgs = qni.images;
<<<<<<< HEAD
        //console.log(curimgs);
=======
>>>>>>> a0d6ae2f9941ac91d724055623f1bafcfb87373d


	for(var i=1 ; i<=8 ; i++){

		if(imgpnt[i]==-1)
			continue;
		
		var check = 0;
		for(img of curimgs){
			if(imgpnt[i]==img.pId)
				check++;
		}
		
		if(check == 0){
			var wrongdiv = document.getElementById("wrongdiv"+i);
			$(wrongdiv).show();
			$("#div"+i).fadeToggle(500);
			$("#wrongdiv"+i).fadeToggle(500);
			imgpnt[i]=-1;
			actimg--;
		}

	}

<<<<<<< HEAD
	//console.log(imgpnt);

=======
>>>>>>> a0d6ae2f9941ac91d724055623f1bafcfb87373d

	for(img of curimgs){
		if(actimg ==8)
			break;
		
		var check = 0;
		for(var i=1 ; i<=8 ; i++){
			if(imgpnt[i]==img.pId)
				check++
		}

		if(check == 0){
			for(var j=1 ; j<=8 ; j++){
				if(imgpnt[j]==-1){
					//putimage(j,img.mainImage);
					putimage(j,"1.jpg");
					setTimeout(function(div){$(div).fadeIn();}, 1000, document.getElementById("div"+j));
					imgpnt[j]=img.pId;
					actimg++;
					break;
				}
			}
		}

	}
<<<<<<< HEAD
	//console.log(imgpnt);
        //console.log(actimg);
	setTimeout(function(){alignimgs(actimg);}, 500);
=======
	
	setTimeout(function(){alignimgs(actimg);}, 1000);
>>>>>>> a0d6ae2f9941ac91d724055623f1bafcfb87373d
}

$(".back_button").click(function(){
    // var newQuery = questions.find(p => p.qId == questionIndex-1);
    newQ(history.pop());
});

function putimage(img_ind, img_url){
	document.getElementById("image"+img_ind).src = "images/"+img_url;
}

function alignimgs(number){

	var j=0;

	if(number == 1){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var down = 50;
				var right = 50;
				var div = document.getElementById("div"+i);
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 2){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var div = document.getElementById("div"+i);
				var down = 50;
				var right = j*50+25;
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//$(div).animate({top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 3){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var down = parseInt((j+1)/2)*50+25;
				var right =((j+1)%2)*50+25;
				if(parseInt((j+1)/2) == 0)
					right = 50;
				var div = document.getElementById("div"+i);
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 4){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var down = parseInt(j/2)*50+25;
				var right =(j%2)*50+25;
				var div = document.getElementById("div"+i);
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 5){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var down = parseInt((j+1)/3)*50+25;
				var right =((j+1)%3)*25+25;
				if(parseInt((j+1)/3) == 0)
					right = (j%3)*25+37.5;
				var div = document.getElementById("div"+i);
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 6){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var down = parseInt(j/3)*50+25;
				var right =(j%3)*25+25;
				var div = document.getElementById("div"+i);
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 7){
		for(var i=1 ; i<= 8 ; i++){
			
			if(imgpnt[i]!=-1){
				var down = parseInt((j+1)/4)*50+25;
				var right =((j+1)%4)*25+12.5;
				if(parseInt((j+1)/4) == 0)
					right = (j%4)*25+25;
				var div = document.getElementById("div"+i);
				var wrongdiv = document.getElementById("wrongdiv"+i);
				$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
				$(div).animate({left: right +"%",top: down +"%"}, 500);
				//div.style.top = down +"%";
				//div.style.left = right +"%";
				div.style.transform = "translate(-50%, -50%)";
				j++;
			}
		}
	}

	if(number == 8){
		for(var i=1 ; i<= 8 ; i++){
			var down = (parseInt((i-1)/4))*50+25;
			var right = ((i-1)%4)*25+12.5;
			var div = document.getElementById("div"+i);
			var wrongdiv = document.getElementById("wrongdiv"+i);
			$(div).animate({left: right +"%",top: down +"%"}, 500);
			$(wrongdiv).animate({left: right +"%",top: down +"%"}, 500);
			//div.style.top = down +"%";
			//div.style.left = right +"%";
			div.style.transform = "translate(-50%, -50%)";

		}
	}

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
