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
    		init_candidates();
		await fadeOutComponentById("intro");
		await fadeInComponentById("question");
		
		const introQni = getNextQuestionAndImages(undefined, undefined, undefined);
		newQ(introQni);
    });
}

function set_fail() {
	$("#fail_go_intro").click(async function () {
		reset_algorithm();
		reset_query();

		await fadeOutComponentById("fail");
		await fadeInComponentById("intro");
	});
	
	$("#fail .back_button").click(async function () {
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
    return new Promise((resolve, reject) => {
        $("#result").fadeIn(fadeTime, resolve);
    });
}

function exit_result() {
    return new Promise((resolve, reject) => {
        $("#result").fadeOut(fadeTime, resolve);
    });
}

function slide(){
    $("#question").animate({marginTop:"0%"},1000);
}

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
	// 1) go to fail
    if (qni === undefined) {
		await fadeOutComponentById("question");
		await fadeInComponentById("fail");
        return;
	}
	
	// go to result
	if (qni.pId !== undefined) {
		gotoResFromQuestion(qni.pId);
		return;
	}

	// 2) go to question
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
				var nextQni = getNextQuestionAndImages(idx, undefined, undefined);
				newQ(nextQni);
			})
			$(".choices").append(b);
		}
		
		show_query();
	});

	var curimgs = qni.images;
	const nextPIds = curimgs.map(img => img.pId)

	const disappearPromises = []
	for (let i = 1; i <= 8; i++) {
		// already disabled
		if(imgpnt[i] == -1) continue;
			
		const isExist = nextPIds.includes(imgpnt[i]);
		// remain
		if (isExist) continue
		
		// not remain => should disappear
		const disappearPromise = new Promise((resolve, reject) => {
			// var wrongdiv = document.getElementById("wrongdiv"+i);

			$("#wrongdiv"+i).show();
			$("#div"+i).fadeOut(400, 
				(
					function() {
						putimage(this,"images/image-placeholder.png");
						imgpnt[i] = -1;
						resolve();
					}
				).bind(i)
			);
			$("#wrongdiv"+i).fadeOut(500);
		});

		disappearPromises.push(disappearPromise);
	}

	// hide incorrect 
	await Promise.all(disappearPromises);

	// get appear pIds
	const appearPIds = [];
	for (const newPId of nextPIds) {
		// already in view
		if (imgpnt.includes(newPId)) continue;

		// really new img
		appearPIds.push(newPId);

		// assign the position
		const index = imgpnt.indexOf(-1, 1);
		imgpnt[index] = newPId;
	}

	// move image divs based on imgpnt
	await alignimgs(curimgs.length);

	// appear images
	for (const img of curimgs) {
		const isAppear = appearPIds.includes(img.pId);

		if (isAppear) {
			for (let j = 1; j <= 8; j++) {
				if(imgpnt[j] == img.pId){
					putImageAndFadeIn(document.getElementById("div"+j), j, img.mainImage);
					break;
				}

			}
		}
	}
}

async function putImageAndFadeIn(div, j, mainImage) {
	putimage(j, mainImage);
	$(div).fadeIn(500);
}

$("#question .back_button").click(async function(){
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
	//console.log("load first"+img_ind);
}


function alignimgs(number) {
	return new Promise(async (resolve, reject) => {
		const promises = [];

		let j = 0;
		for (let i = 1; i <= 8; i++) {
			if (imgpnt[i] !== -1) {
				// calculate position
				let down, right;
				switch (number) {
					case 1:
						down = 50;
						right = 50;
						break;
					case 2:
						down = 50;
						right = j*50+25;
						break;
					case 3:
						down = parseInt((j+1)/2)*50+25;
						right =((j+1)%2)*50+25;
						if(parseInt((j+1)/2) == 0)
							right = 50;
						break;
					case 4:
						down = parseInt(j/2)*50+25;
						right =(j%2)*50+25;
						break;
					case 5:
						down = parseInt((j+1)/3)*50+25;
						right =((j+1)%3)*25+25;
						if(parseInt((j+1)/3) == 0)
							right = (j%3)*25+37.5;
						break;
					case 6:
						down = parseInt(j/3)*50+25;
						right =(j%3)*25+25;
						break;
					case 7:
						down = parseInt((j+1)/4)*50+25;
						right =((j+1)%4)*25+12.5;
						if(parseInt((j+1)/4) == 0)
							right = (j%4)*25+25;
						break;
					case 8:
						down = (parseInt((i-1)/4))*50+25;
						right = ((i-1)%4)*25+12.5;
						break;
				}

				// set animation
				const div = document.getElementById("div"+i);
				const wrongdiv = document.getElementById("wrongdiv"+i);

				const property = { left: right +"%",top: down +"%" };

				promises.push(new Promise((resolve, reject) => {
					$(wrongdiv).animate(property, 500, "swing", resolve);
				}));
				promises.push(new Promise((resolve, reject) => {
					$(div).animate(property, 500, "swing", resolve);
				}));

				j++;
			}
		}

		await Promise.all(promises);
		resolve();
	});
}

for (let i = 1; i <= 8; i++) {
	$(`#div${i}`).click(function() {
		const pId = imgpnt[i];
		getNextQuestionAndImages(undefined, pId, undefined);
		gotoResFromImage(pId);
	});
}

$("#result .back_button").click(function(){
	var nextData = undoAnswer();
	if(nextData.pId !== undefined){
		newQ(nextData);
	}
	else {
		quit_animation();
		newQ(nextData);
	}
});

$("#result_back").click(function(){
	var nextData = undoAnswer();
	if(nextData.pId !== undefined){
		newQ(nextData);
	}
	else {
		quit_animation();
		newQ(nextData);
	}
})

function gotoResFromQuestion(pId) {
	var product = products.find(e=>e.pId==pId);
	if(document.getElementById("result").style.display=="none"){
		enter_result();
	}
    setProductImg(product.mainImage);
    setCandidatesImg(product.images);
	setProductname(product.name);
	setNobutton(pId);
	if(document.getElementById("result").style.marginTop!="0%"){
		enter_animation();
	}
	else {
		hideObjects();
		fadeInElements();
	}
}

function gotoResFromImage(pId) {
	var product = products.find(e=>e.pId==pId);
    enter_result();
    setProductImg(product.mainImage);
    setCandidatesImg(product.images);
	setProductname(product.name);
	setBackbutton();
    enter_animation();
}



function init_candidates(){

	for(var i=1 ; i<= 8 ; i++){
		var down = (parseInt((i-1)/4))*50+25;
		var right = ((i-1)%4)*25+12.5;
		var div = document.getElementById("div"+i);
		var wrongdiv = document.getElementById("wrongdiv"+i);
		$(div).animate({left: right +"%",top: down +"%"}, 1);
		$(wrongdiv).animate({left: right +"%",top: down +"%"}, 1);
		//div.style.top = down +"%";
		//div.style.left = right +"%";
		div.style.transform = "translate(-50%, -50%)";

	}

	for(var i=1 ; i<=8 ; i++){

			$("#div"+i).hide();
			imgpnt[i]=-1;

	}
}

// hide all component
$("#intro").hide();
$("#fail").hide();
reset_query();
$("#question").hide();
$("#result").hide();

set_intro();
set_fail();

$(document).ready(async function() {
    alignimgs(8);
	await fadeInComponentById("intro");
});