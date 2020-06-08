
let firstpage = 1;

let imgpnt = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

function hide_query(callback) {
	return  $(".query").fadeOut(fadeTime, callback);
}

function show_query() {
    return new Promise((resolve, reject) => {
        $(".query").fadeIn(fadeTime, resolve);
    });
}

function reset_query() {
    $(".question").empty();
    $(".choices").empty();
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


function putimage(img_ind, img_url){
	//document.getElementById("image"+img_ind).src = "images/"+img_url;
	document.getElementById("image"+img_ind).src = img_url;
	//console.log("load first"+img_ind);
}


var gridsize = 12.5;
var offsetGrid = [
	[4,4],[[2,4],[6,4]],[[4,2],[2,6],[6,6]],[[2,2],[6,2],[2,6],[6,6]],
	[[3,2],[5,2],[2,6],[4,6],[6,6]],[[2,2],[4,2],[6,2],[2,6],[4,6],[6,6]],
	[[2,2],[4,2],[6,2],[1,6],[3,6],[5,6],[7,6]],
	[[1,2],[3,2],[5,2],[7,2],[1,6],[3,6],[5,6],[7,6]]
];


function alignimgs(number) {
	return new Promise(async (resolve, reject) => {
		const promises = [];

		let j = 0;
		let offset = offsetGrid[number-1];
		for (let i = 1; i <= 8; i++) {
			if (imgpnt[i] == -1) continue;

			// set animation
			const div = document.getElementById("div"+i);
			const wrongdiv = document.getElementById("wrongdiv"+i);
			const property = { 
				left: offset[j][0]*gridsize +"%",
				top: offset[j][1]*gridsize +"%" 
			};

			promises.push(new Promise((resolve, reject) => {
				$(div,wrongdiv).animate(property, 500, "swing", resolve);
			}));
			
			j++;
		}
		await Promise.all(promises);
		resolve();
	});
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