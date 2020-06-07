const fadeTime = 500;

function set_intro() {
    const introImages = getIntroImages();
    for (let i = 0; i < introImages.length; i++) {
        const sampleImageItem = `
            <li class="intro_examples_image_li">
                <img src="${introImages[i].mainImage}" class="intro_examples_image_src">
                <div>${introImages[i].name}</div>
            </li>`;
        
        $(".intro_examples_image_ul").append(sampleImageItem);
    }

    $("#intro_start_btn").click(async function () {
		await fadeOutComponentById("intro");
		await fadeInComponentById("question");
		newQ(getNextQuestionAndImages(undefined, undefined));
    });
}

function set_fail() {
	$("#fail_go_intro").click(async function () {
		reset_algorithm();
		reset_query();

		await fadeOutComponentById("fail");
		await fadeInComponentById("intro");
	});
	
	$(".fail_back_button").click(async function () {
		reset_query();
		await fadeOutComponentById("fail");
		await fadeInComponentById("question");
        newQ(undoAnswer());
    });
}

function fadeInComponentById(componentId) {
    return new Promise((resolve, reject) => {
        $(`#${componentId}`).fadeIn(fadeTime, resolve);
    });
}

function fadeOutComponentById(componentId) {
    return new Promise((resolve, reject) => {
        $(`#${componentId}`).fadeOut(fadeTime, resolve);
    });
}

function enter_result() {
    $("#section").html('<object type="text/html" data="result/result.html" style="width:100%;height:100%;"></object>');
}

function slide(){
    $("#question").animate({marginTop:"0%"},1000);
}

let actimg = 0;
let firstpage = 1;

let imgpnt = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

function reset_query() {
    $(".question").empty();
    $(".choices").empty();
}

function hide_query(callback) {
	return  $(".query").fadeOut(fadeTime, callback);
}

function show_query() {
    return new Promise((resolve, reject) => {
        $(".query").fadeIn(fadeTime, resolve);
    });
}

async function newQ(qni){
    if (qni === undefined) {
		await fadeOutComponentById("question");
		await fadeInComponentById("fail");
        return;
    }

    hide_query(async function() {
		reset_query();
		// set next query
		var query = qni.question;
	
		$(".question").text(query["question"]);
	
		var choices = query["answers"];
		for(var i=0; i<query["answers"].length; i++){
	
			var b = $('<button type="button" class="btn btn-default">').text(choices[i]).data("idx", i);
			b.click(function(){
				var idx = $(this).data("idx");
				var next = getNextQuestionAndImages(idx, undefined);
				newQ(next);
			})
			$(".choices").append(b);
		}
		
		show_query();
	});

	var curimgs = qni.images;

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
					//putimage(j,"1.jpg");
					putimage(j, "https://drive.google.com/uc?export=view&id=1gpnnJUARu5uA3Q11osy5dwHf9HSi13Ok");
					setTimeout(function(div){$(div).fadeIn();}, 500, document.getElementById("div"+j));
					imgpnt[j]=img.pId;
					actimg++;
					break;
				}
			}
		}

	}
	//console.log(imgpnt);
        //console.log(actimg);
	setTimeout(function(){alignimgs(actimg);}, 500);
}

$(".back_button").click(async function(){
	const prevQni = undoAnswer();
	if (prevQni === undefined) {
		await fadeOutComponentById("question");
        reset_query();
		await fadeInComponentById("intro");
	} else {
		newQ(prevQni);
	}
});

function putimage(img_ind, img_url){
	//document.getElementById("image"+img_ind).src = "images/"+img_url;
	document.getElementById("image"+img_ind).src = img_url;
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

$("#div1").click(function() {           

		gotoRes(1,imgpnt[1]);

});

$("#div2").click(function() {
           
		gotoRes(2,imgpnt[2]);

});

$("#div3").click(function() {
           
		gotoRes(3,imgpnt[3]);

});

$("#div4").click(function() {
           
		gotoRes(4,imgpnt[4]);

});

$("#div5").click(function() {
           
		gotoRes(5,imgpnt[5]);

});

$("#div6").click(function() {
           
		gotoRes(6,imgpnt[6]);

});

$("#div7").click(function() {
           
		gotoRes(7,imgpnt[7]);

});

$("#div8").click(function() {
           
		gotoRes(8,imgpnt[8]);

});

function gotoRes(imgnum, pId){
	console.log(imgnum);
	console.log(pId);
}

// hide all component
$("#intro").hide();
$("#fail").hide();
reset_query();
$("#question").hide();

set_intro();
set_fail();

$(document).ready(async function() {
    alignimgs(8);
	await fadeInComponentById("intro");
});