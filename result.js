var yes_button;
var no_button;
var product_name;


var fadeElements =[
    "#result_middle",
    "#result_bottom p",
    "#result_bottom img"
];

var imgSource_test =[
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg"
];

var test_product_name = "Macrame"

function test_enter(){
    setProductImg(imgSource_test[2]);
    setCandidatesImg(imgSource_test);
    setProductname("Pokemon");
    enter_animation();
}
function test_quit(){
    quit_animation();
}

function setProductname(name){
    product_name = name;

    document.querySelector("#product_text").innerHTML=product_name;
    document.querySelector("#result_bottom p").innerHTML="Other images of "+ product_name;

    buylink = "https://search.shopping.naver.com/search/all?query="+name+"&frm=NVSHATC"
    yes_button = document.querySelector("#result_yes");
    yes_button.setAttribute("onClick","location.href=\""+buylink+"\"");
}

function setCandidatesImg(imgList){
    var img =  document.querySelectorAll("#result_bottom img");
    img.forEach(function(element,index,array){
        element.setAttribute("src",imgList[index]);
    });
}

function setProductImg(imgsrc){
    var img =  document.querySelector("#product_img");
    img.setAttribute("src",imgsrc);
}

function hideObjects(){
    fadeElements.forEach(element => {
        $(element).hide();
    });
}

function enter_animation(){
    hideObjects();
    var elem = document.getElementById("result");
    var pos = 100;
    var id = setInterval(frame,5);
    function frame(){
        if (pos==0){
            clearInterval(id);
            fadeInElements();
        }
        else {
            pos--;
            elem.style.marginTop = pos+"%";
        }
    }
}

function quit_animation(){
    fadeOutElements();
    setTimeout(do_quit_animation,fadeElements.length*200+200);
}
function do_quit_animation(){
    var elem = document.getElementById("result");
    var pos = 0;
    var id = setInterval(frame,5);
    function frame(){
        if (pos==100){
            clearInterval(id);
        }
        else {
            pos++;
            elem.style.marginTop = pos+"%";
        }
    }
}

function fadeInElements(){
    fadeElements.forEach(function(element,index,array) {
        $(element).delay(index*200).fadeIn();
    });
}
function fadeOutElements(){
    fadeElements.forEach(function(element,index,array) {
        $(element).delay(index*200).fadeOut();
    });
}
