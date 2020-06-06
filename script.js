function enter_intro() {
    $("#section").html('<object type="text/html" data="intro/intro.html" style="width:100%;height:100%"></object>');
}
function enter_result() {
    $("#section").append('<object type="text/html" data="result/result.html" style="width:100%;height:100%;"></object>');
    slide();
}

function enter_fail() {
    $("#section").html('<object type="text/html" data="fail/fail.html" style="width:100%;height:100%"></object>');
}
function slide(){
    $("#question").animate({marginTop:"0%"},1000);
}