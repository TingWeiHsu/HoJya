// ==================== ABOUT  enlarge decorative small pics ==================== 

$('.pageTitle').hover(function(){
    let enlargePicArr = document.querySelectorAll(".enlargePic");
    for (let i = 0; i<enlargePicArr.length; i++){
        $(enlargePicArr[i]).addClass('transitionLarge');
    }
},function(){
    let enlargePicArr = document.querySelectorAll(".enlargePic");
    for (let i = 0; i<enlargePicArr.length; i++){
        $(enlargePicArr[i]).removeClass('transitionLarge');
    }  
});