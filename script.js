function enter_result() {
    $("#section").append('<object type="text/html" data="result/result.html" style="width:100%;height:100%;"></object>');
    slide();
}

function slide(){
    $("#question").animate({marginTop:"0%"},1000);
}