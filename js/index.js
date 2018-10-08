
// have a changing page effect when go and leave

function loadingPage() {
    setTimeout(function(){ 
        console.log("yo");
        $(".pageLoadingCover").animate({marginTop:"-300%"},500,"swing");
    }, 500);
};

$('a.link').click(function(e){
    e.preventDefault();
    let moveTo = this.getAttribute("href");
    $(".pageLoadingCover").animate({marginTop:"0%"},500,"swing");
    setTimeout(function(){
        window.location = moveTo;
    }, 500);
});




// page scroll effect 

$(document).ready(function() {
    $('#fullpage').fullpage({
        //配置项介绍

        //sectionsColor为每个section设置background-color属性
        sectionsColor:['#fff','#fff','#fff','#fff'],
        //controlArrows定义是否通过箭头来控制slide,默认true
        controlArrows:false,
        //verticalCentered定义每一页的内容是否垂直居中，默认true
        verticalCentered:false,
        //resize字体是否随窗口缩放而缩放，默认false
        resize:true,
        //scrollingSpeed设置滚动速度，单位毫秒，默认700
        scrollingSpeed:1000,
        //anchors定义锚链接，默认为[],定义锚链接时，值不要和页面中的任何ID或name相同，且不需要加#
        anchors:['page1','page2','page3','page4'],
        //lockAnchors是否锁定锚链接，默认为false,设为true后链接地址不会改变
        // lockAnchors:true,
        //easing定义页面section滚动的动画方式，默认为easeInOutCubic,若修改此项需引入jquery.easing插件
        //css3是否使用CSS3 transforms来实现滚动效果，默认为true。若浏览器不支持CSS3，则会用Jquery来实现
        //css3:false,
        //loopTop滚动到最顶部后是否连续滚动到底部，默认为false
        //loopBottom滚动到最低部后是否连续滚动到顶部，默认为false
        //loopHorizontal横向slide幻灯片是否循环滚动，默认为true
        //autoScrolling是否使用插件的滚动方式，默认为true,若为false则会出现浏览器自带滚动条    
        //scrollBar是否包含滚动条，默认为false,若为true浏览器自带滚动条出现
        //paddingTop/paddingBottom设置每一个section顶部和底部的padding,默认为0
        //fixedElements固定元素，默认为null,需要配置一个jquery选择器，在页面滚动时，fixElements设置的元素不滚动
        fixedElements:"#header",
        //keyboardScrolling是否可以使用键盘方向键导航，默认为true
        //touchSensitivity在移动设备中滑动页面的敏感性，默认为5最高100，越大越难滑动
        //continousVertical是否循环滚动，默认为false,注意这个属性和loopTop loopBottom不兼容，不能同时设置
        //animateAnchor锚链接是否可以控制滚动动画，默认为true,若为false则锚链接定位失效
        //recordHistory是否记录历史，默认为true,通过浏览器的前进后退来导航。若设置autoScrolling:false,那么这个属性将被关闭
        //menu绑定菜单，设定的相关属性与anchors的值对应后，菜单可以控制滚动条，默认为false。可设置为菜单的jquery选择器
        //menu:"#fullpageMenu",
        //navigation是否显示导航，默认为false
        navigation:false,
        //navigationPosition导航小圆点的位置
        navigationPosition:"right",
        //navigationTooltips导航小圆点的提示，注意按顺序设置
        navigationTooltips:['Sweet','Soup','Noodles','Syoronbou'],
        //showActiveTooltip是否显示当前页面的tooltip信息，默认为false
        //slidesNavigation 是否显示横向幻灯片的导航，默认为false
        slidesNavigation:true,
        //slidesNavPosition横向导航的位置，默认为bottom，可以设置为top或bottom
        slidesNavPositon:"top",
        //scrollOverflow内容超过满屏后是否显示滚动条，默认为false,如果为true则会显示滚动条，若需滚动查看内容还需要jquery.slimscroll插件的配合
        //sectionSelector:section选择器。默认为.section
        //slideSelector:slide选择器，默认为.slide

        //方法介绍
        //$.fn.fullpage.***()
        //moveSectionUp()向上滚动一页
        //moveSectionDown()向下滚动一页
        //moveTo(section,slide)section从1开始，slide从0开始
        //silentMoveTo(section,slide)和moveTo一样，但是没有滚动效果
        //moveSlideRight()幻灯片向右滚动
        //moveSlideLeft()幻灯片向左滚动
        //setAutoScrolling(boolean):动态设置autoScrolling
        //setLockAnchors(boolean):动态设置lockAnchors
        //setRecordHistory(boolean):动态设置recordHistory
        //setScrollingSpeed(milliseconds):动态设置scrollingSpeed
        //destory(type)销毁fullpage,type可以不写或者使用all
        //reBuild()重新更新页面和尺寸，用于ajax请求改变页面结构后重建效果
        //lazyLoading

        afterLoad: function(anchorLink, index){
            if(index>= 1){
                // move from 5 to 0 every time you slide
                $(".fadeWord").animate({marginTop:"0%",opacity:"1"},300);
                $(".fadeMoveWord").animate({marginTop:"0%",opacity:"1"},300);
                $(".recipeCover").animate({marginTop:"0%"},300);

                // detect if class is clicked, all Name should move -10 after back to 0
                let circleLo = document.querySelectorAll(".circle");
                for (let j = 0; j<circleLo.length; j++){
                    if(circleLo[j].classList.contains("clicked")){
                        $(".productName").animate({marginTop:"-10%"},300);
                        $(".productSubName").animate({marginTop:"-10%"},300);
                        $(".recipeCover").animate({opacity:"1",marginTop:"0%"},300);
                        } else {
                        $(".productName").animate({marginTop:"0%"},300);
                        $(".productSubName").animate({marginTop:"0%"},300);
                        $(".recipeCover").animate({opacity:"0",marginTop:"35%"},300);
                        }
                }

                // detect which page is user watching and give special effect on circle
                let hashArray = ["#page1","#page2","#page3","#page4"];
                let hashNum = window.location.hash;
                let circleCArray = ['.circle1','.circle2','.circle3','.circle4'];
                for (let h = 0; h < hashArray.length ; h ++ ){
                    if ( hashNum === hashArray[h]){
                        let CN = circleCArray[h];
                        $(CN).addClass('circleSelected');
                    } 
                };
                

            }
        },

        onLeave: function(index,nextIndex,direction){
            if(nextIndex>= 1){
                // move back every time when you leave
                $(".fadeWord").stop(true,true).animate({marginTop:"+5%",opacity:"0"},300);
                $(".fadeMoveWord").stop(true,true).animate({marginTop:"+5%",opacity:"0"},300);
                $(".recipeCover").stop(true,true).animate({marginTop:"35%",opacity:"0"},10);
                $(".cir").removeClass('circleSelected');
            }
        }
        
        
    });
});



// click hambuger nav and change whole page

function clickFunction(x) {
    x.classList.toggle("change");

    if(x.classList.contains("change")){
        console.log("hi");
        $("#fullNav").animate({height:"100%",opacity:1},300);
        $("#navMove").animate({marginTop:"0%"},300);
    } else {
        console.log("no");
        $("#fullNav").animate({height:"0%",opacity:0},300);
        $("#navMove").animate({marginTop:"-150%"},300);
    }

    $('.smallLink').click(function(e){
        setTimeout(function(){
            $("#navMove").animate({marginTop:"-150%"},300);
            $("#fullNav").animate({opacity:0},300);
        }, 300);
        x.classList.remove("change");
    })
    
}



// click + to enlarge the food infor and make other things disappeared

function enlargeFunction(x) {
    // click + to toggle it
    x.classList.toggle("clicked");
    
    

    let circleLoop = document.querySelectorAll(".circle");
    if(x.classList.contains("clicked")){
        // the check if one of circle is clicked, change all of them to be clicked
        for (let i = 0; i < circleLoop.length ; i++){
            circleLoop[i].classList.add("clicked");
        }
        $("header").animate({marginTop:"-50%"},300);
        $("footer").animate({marginBottom:"-50%"},300);
        
        $(".magicCover").animate({opacity:"1",height:"100vh",padding:"0px 200px",width:"3000px"},10);
        $(".productName").animate({marginTop:"-10%"},300);
        $(".productSubName").animate({marginTop:"-10%"},300);
        $(".recipeCover").animate({opacity:"1",marginTop:"0%"},300);
        $(".foodPhoto").animate({padding:"0px"},300);
        $("#moveRotate").animate({marginRight:"0%"},300);

        let w = $(window).width();
        if (w < 900) {
            $(".leftBox").animate({marginTop:"-150%"},300);
            $(".rightBox").animate({marginTop:"-250%"},300);
        } else if (w > 900) {
            $(".leftBox").animate({marginLeft:"-150%"},300);
            $(".rightBox").animate({marginRight:"-250%"},300);
        }
       
    } else {
        console.log("no");
        for (let i = 0; i < circleLoop.length ; i++){
            circleLoop[i].classList.remove("clicked");
        };
        $("header").animate({marginTop:"0%"},300);
        $("footer").animate({marginBottom:"0%"},300);

        $(".magicCover").animate({opacity:"0",height:"0vh",padding:"0px 0px",width:"100%"},10);
        $(".productName").animate({marginTop:"0%"},300);
        $(".productSubName").animate({marginTop:"0%"},300);
        $(".recipeCover").animate({opacity:"0",marginTop:"35%"},100);
        $(".foodPhoto").animate({padding:"20px"},300);
        $("#moveRotate").animate({marginRight:"-250%"},300); 

        let w = $(window).width();
        if (w < 900) {
            $(".leftBox").animate({marginTop:"0%"},300);
            $(".rightBox").animate({marginTop:"0%"},300);
        } else if (w > 900) {
            $(".leftBox").animate({marginLeft:"0%"},300);
            $(".rightBox").animate({marginRight:"0%"},300);
        }
    }

    // detect which page and change circle bar
    let hashArray = ["#page1","#page2","#page3","#page4"];
    let hashNum = window.location.hash;
                let circleCArray = ['.circle1','.circle2','.circle3','.circle4'];
                for (let h = 0; h < hashArray.length ; h ++ ){
                    if ( hashNum === hashArray[h]){
                        let CN = circleCArray[h];
                        $(CN).addClass('circleSelected');
                         } else if (hashNum === "") {
                            let CN = circleCArray[0];
                            $(CN).addClass('circleSelected');
                         }
                    
                 };
}



// About page enlarge decorative small pics

$('.enlargeKey').hover(function(){
    let picLoop = document.querySelectorAll(".enlarge");
    for (let i = 0; i<picLoop.length; i++){
        $(picLoop[i]).addClass('transitionLarge');
    }
},function(){
    let picLoop = document.querySelectorAll(".enlarge");
    for (let i = 0; i<picLoop.length; i++){
        $(picLoop[i]).removeClass('transitionLarge');
    }  
});



// circle bar with photos when hover

let circleCArray = ['.circle1','.circle2','.circle3','.circle4'];
let circlePArray = ['.circlePic1','.circlePic2','.circlePic3','.circlePic4'];

for ( let y = 0; y < circleCArray.length ; y++) {
    console.log("hey");
    let circleNum = circleCArray[y];
    let circlePN = circlePArray[y];

    // the first time when hover to enlarge
    $(circleNum).hover(function(){
        $(circleNum).addClass('growBig');
        $(circlePN).addClass('picBig');
    
    },function(){
        $(circleNum).removeClass('growBig');
        $(circlePN).removeClass('picBig');
    });

    $(circlePN).hover(function(){
        $(circleNum).addClass('growBig');
        $(circlePN).addClass('picBig');
    },function(){
        $(circleNum).removeClass('growBig');
        $(circlePN).removeClass('picBig');
    });
}




// let all circle moooooooooooove 




function circleMoveAround(e){

    // mouse move everytime will get something
    let x = e.clientX;
    let y = e.clientY;
    let  coor = "Coordinates: (" + x + "," + y + ")";
    console.log(coor);

    // detect the correct x and y of circle

    let cirxy = document.querySelector(".circle").getBoundingClientRect();
    let cY = cirxy.top + 35;
    let cX = cirxy.left + 35;
    console.log(cY);
    console.log(cX);

    // let's move our circle

    let newX = (x-cX)/20;
    let newY = (y-cY)/20;

 
    console.log(newX);
    console.log(newY);
    let circleArr = document.querySelectorAll(".circle");

    let w = $(window).width();
    if (w > 1025) {
    
        for (let i = 0; i < circleArr.length ; i++){
            if (i === 0) {
                circleArr[i].style.transform = `translate(${newX-35}px,${newY-35}px)`; 
            } else if ( i === 1) {
                circleArr[i].style.transform = `translate(${newX-35}px,${newY-75}px)`; 
            } else if ( i === 2) {
                circleArr[i].style.transform = `translate(${newX-35}px,${newY-105}px)`;
            } else if ( i === 3) {
                circleArr[i].style.transform = `translate(${newX-35}px,${newY-135}px)`;
            }
        }
        
    }

    
    
}

