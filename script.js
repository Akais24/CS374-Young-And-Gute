const fadeTime = 500;

function enter_intro() {
    return new Promise((resolve, reject) => {
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
            await exit_intro();
            await start_question();
        });

        $("#intro").fadeIn(fadeTime, resolve);
    });
}

function exit_intro() {
    return new Promise((resolve, reject) => {
        $("#intro").fadeOut(fadeTime, resolve);
    })
}

function enter_fail() {
    return new Promise((resolve, reject) => {
        $("#fail").fadeIn(fadeTime, resolve);
    });
}

function exit_fail() {
    return new Promise((resolve, reject) => {
        $("#fail").fadeOut(fadeTime, resolve);
    });
}

function enter_result() {
    $("#section").html('<object type="text/html" data="result/result.html" style="width:100%;height:100%;"></object>');
}
function slide(){
    $("#question").animate({marginTop:"0%"},1000);
}

function start_question() {
}

// hide all component
$("#intro").hide();
$("#fail").hide();

$(document).ready(async function() {
    await enter_intro();
});