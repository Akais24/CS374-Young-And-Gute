const gridsize = 12.5;
const offsetGrid = [
	[[4,4]],[[2,4],[6,4]],[[4,2],[2,6],[6,6]],[[2,2],[6,2],[2,6],[6,6]],
	[[3,2],[5,2],[2,6],[4,6],[6,6]],[[2,2],[4,2],[6,2],[2,6],[4,6],[6,6]],
	[[2,2],[4,2],[6,2],[1,6],[3,6],[5,6],[7,6]],
	[[1,2],[3,2],[5,2],[7,2],[1,6],[3,6],[5,6],[7,6]]
];

let imgpnt = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

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
    change_query(qni);

	var curimgs = qni.images;
    const nextPIds = curimgs.map(img => img.pId)
    /*
    const newPIds = nextPIds.map(pid => imgpnt.includes(pid));
    const disappearPIds = imgpnt.map(pid => (pid!=-1)&&!(nextPIds.includes(pid)));

    const disappearDivs = [];
    const appearDivs = [];
    */

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

function change_query(qni){
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
}

function alignimgs(number) {
	return new Promise(async (resolve, reject) => {
		const promises = [];
		var imgCount = 0;
		for (let i = 1; i <= 8; i++) {
            if (imgpnt[i] == -1) continue;

            //set animation
            imgCount++;
            const offset = getOffset(number,imgCount);
			promises.push(new Promise((resolve, reject) => {
				$(`#wrongdiv${i}, #div${i}`).animate({left: offset[0] +"%",top: offset[1] +"%"}, 500, "swing", resolve);
			})); 
			
		}
		await Promise.all(promises);
		resolve();
	});
}

function init_candidates(){
	for(var i=1 ; i<= 8 ; i++){
        let offset = getOffset(8,i);
        $(`#wrongdiv${i}, #div${i}`).animate({left: offset[0] +"%",top: offset[1] +"%"}, 1);
        $(`#div${i}`).hide();
		imgpnt[i]=-1;
	}
}

function getOffset(number,index){
    console.log(number+","+index);
    let offset = offsetGrid[number-1][index-1];
    return [offset[0]*gridsize, offset[1]*gridsize];
}