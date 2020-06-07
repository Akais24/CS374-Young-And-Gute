function enter_intro() {
    $("#intro").fadeIn(1000);

    const introImages = getIntroImages();

    for (let i = 0; i < introImages.length; i++) {
        const sampleImageItem = `
            <li class="intro_examples_image_li">
                <img src="${introImages[i].mainImage}" class="intro_examples_image_src">
                <div>${introImages[i].name}</div>
            </li>`;
        
        $(".intro_examples_image_ul").append(sampleImageItem);
    }
}

function exit_intro() {
    $("intro").fadeOut();
}


function enter_result() {
    $("#section").html('<object type="text/html" data="result/result.html" style="width:100%;height:100%;"></object>');
}
function enter_fail() {
    $("#section").html('<object type="text/html" data="fail/fail.html" style="width:100%;height:100%"></object>');
}
function slide(){
    $("#question").animate({marginTop:"0%"},1000);
}

// hide all component
$("#intro").hide();

$(document).ready(function() {
    enter_intro();
});