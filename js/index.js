
// ==================== ALL Changing page effect with loading ==================== 
    
    // when go to that page will show cover leave
    function show_Loading_Cover(){
        setTimeout(function(){ 
            $(".pageLoadingCover").animate({marginTop:"-100vh"},500,"swing");
        }, 500);
    };

    // when leave that page will show cover come
    $('a.linkToLoading').click(function(e){
        e.preventDefault();
        let moveTo = this.getAttribute("href");
        $(".pageLoadingCover").animate({marginTop:"0%"},500,"swing");
        setTimeout(function(){
            window.location = moveTo;
        }, 500);
    });



// ==================== ALL Page scroll effect Using fullpage.js ==================== 

    $(document).ready(function(){
        $('#fullPage').fullpage({

            sectionsColor:['#fff','#fff','#fff','#fff'],
            controlArrows:false,
            verticalCentered:false,
            resize:true,
            scrollingSpeed:1000,
            anchors:['page1','page2','page3','page4'],
            fixedElements:"#header",
            navigation:true,
            navigationPosition:"right",
            slidesNavigation:true,
            slidesNavPositon:"top",
            
            afterLoad: function(anchorLink, index){

                let w = $(window).width();
                let circleArr = document.querySelectorAll(".circle");
                
                // ============= make circlePlus icon to original places everytime scroll ============= 
                if (w > 1025){
                    for (let i = 0; i < circleArr.length ; i++){
                        circleArr[i].style.transform = `translate(-35px,-35px)`; 
                    }
                }

                if (index >= 1){

                // ============= Scroll and food detail elements action ============= 

                    // food detail elements move from down to up every time you slide only 5% to 0
                    $(".fadeWord").animate({marginTop:"0%",opacity:"1"},300);
                    $(".fadeMoveWord").animate({marginTop:"0%",opacity:"1"},300);
                    $(".ingredientBox").animate({marginTop:"0%"},300);
                    
                    // detect if circle Plus class is clicked, food detail elements should move upper again 
                    // already finished 5% to 0% but again upper 10% 
                    for (let j = 0; j < circleArr.length ; j++){
                        if (circleArr[j].classList.contains("clicked")){
                            $(".productName").animate({marginTop:"-10%"},300);
                            $(".productSubName").animate({marginTop:"-10%"},300);
                            $(".ingredientBox").animate({opacity:"1",marginTop:"0%"},300);
                            } else {
                            $(".productName").animate({marginTop:"0%"},300);
                            $(".productSubName").animate({marginTop:"0%"},300);
                            $(".ingredientBox").animate({opacity:"0",marginTop:"35%"},300);
                            }
                    }

                //  ============= detect which food page section is user watching and make right circle become white color inside ============= 
                    let hashArray = ["#page1","#page2","#page3","#page4"];
                    let hashNum = window.location.hash;
                    let circleCArray = ['.circleDotPlace1','.circleDotPlace2','.circleDotPlace3','.circleDotPlace4'];
                    for (let h = 0; h < hashArray.length ; h ++){
                        if (hashNum === hashArray[h]){
                            let circleNumber = circleCArray[h];
                            $(circleNumber).addClass('circleSelected');
                        } 
                    };
                }
            },

            onLeave: function(index,nextIndex,direction){
                
                if (nextIndex >= 1){
                    // move back food detail elements every time when you scroll to other section
                    $(".fadeWord").stop(true,true).animate({marginTop:"+5%",opacity:"0"},300);
                    $(".fadeMoveWord").stop(true,true).animate({marginTop:"+5%",opacity:"0"},300);
                    $(".ingredientBox").stop(true,true).animate({marginTop:"35%",opacity:"0"},10);
                    $(".cir").removeClass('circleSelected');
                }
            }
        });
    });



// ==================== ALL click hambuger nav and show whole page Nav in mobile page ==================== 

    function click_Show_Mobile_Nav(x){
        x.classList.toggle("changeLooking");

        // if the button was clicked, moved them to show on page, vice versa
        if (x.classList.contains("changeLooking")){
            $("#fullNav").animate({height:"100%",opacity:1},500);
            $("#navMove").animate({marginTop:"0%"},500);
        } else {
            $("#fullNav").animate({height:"0%",opacity:0},500);
            $("#navMove").animate({marginTop:"-150%"},500);
        }

        $('.mobileNavFoodLink').click(function(e){
            setTimeout(function(){
                $("#navMove").animate({marginTop:"-150%"},500);
                $("#fullNav").animate({height:"0%",opacity:0},500);
            }, 300);
            x.classList.remove("changeLooking");
        })
        
    }



// ==================== ALL move all circle plus icon / elements ==================== 


    function move_Circle_Around(e){

        // mouse move everytime will get position data
        let x = e.clientX;
        let y = e.clientY;

        // detect the correct x and y of circle

        let cirxy = document.querySelector(".circle").getBoundingClientRect();
        let cY = cirxy.top + 35;
        let cX = cirxy.left + 35;


        // let's move our circle plus icon

        let newX = (x-cX)/20;
        let newY = (y-cY)/20;

    
        let circleArr = document.querySelectorAll(".circle");

        let w = $(window).width();
        if (w > 1025){
            
            for (let i = 0; i < circleArr.length ; i++){
                if (i === 0){
                    circleArr[i].style.transform = `translate(${newX-35}px,${newY-35}px)`; 
                } else if (i === 1){
                    circleArr[i].style.transform = `translate(${newX-35}px,${newY-75}px)`; 
                } else if (i === 2){
                    circleArr[i].style.transform = `translate(${newX-35}px,${newY-105}px)`;
                } else if (i === 3){
                    circleArr[i].style.transform = `translate(${newX-35}px,${newY-135}px)`;
                }
            }
            
        }
        
    }



// ==================== ALL nav bar show underline when in that page ==================== 

    if (window.location.pathname == "/index.html"){
        $("#indexLink").addClass('hoverEffectLink');
    } else {
        $("#indexLink").removeClass('hoverEffectLink');
    }

    if (window.location.pathname == "/food.html"){
        $("#foodLink").addClass('hoverEffectLink');
    } else {
        $("#foodLink").removeClass('hoverEffectLink');
    }

    if (window.location.pathname == "/about.html"){
        $("#aboutLink").addClass('hoverEffectLink');
    } else {
        $("#aboutLink").removeClass('hoverEffectLink');
    }



// ==================== ALL click arrow will move to next page function ==================== 

    function down_To_Next_Section(){
        let pageHash = window.location.hash.slice(5);

        // get number of page
        let secArr = document.querySelectorAll(".section");
        let secNum = secArr.length;

        // if in the first page withous hash yet, clicked just move to second page
        if (window.location.hash == ""){
            window.location.hash =  `#page2`; 
        } else if (pageHash < secNum){
            // if have hash number already then just add 1 will move to next page
            pageHash = Number(pageHash) + 1 ;
            window.location.hash =  `#page${pageHash}`; 
        } 

        if (pageHash == secNum){
            // if hash number is as the same as the total number of section then make arrow hide
            $("#movingArrow").css({'opacity':'0'});
        } else if (pageHash < secNum){
            $("#movingArrow").css({'opacity':'1'});
        }
    }



// ==================== ALL detect if scroll to last page, will make the clickable arrow disappeared ==================== 

    document.getElementById("fullPage").addEventListener("transitionend",detect_Disappear_Footer_Arrow);

    function detect_Disappear_Footer_Arrow(){
        // get the right hash and right section number where user now
        let pageHash = window.location.hash.slice(5);

        // get total number of section and changed to array
        let secArr = document.querySelectorAll(".section");
        let secNum = secArr.length;

        if (pageHash == secNum){
            $("#movingArrow").css({'opacity':'0'});
        } else if (pageHash < secNum) {
            $("#movingArrow").css({'opacity':'1'});
        } 
    }



// ==================== ALL change mobile nav text color when user is in that page ==================== 

    let navMobArr = $("#navMove>a").length;

    for (let y = 0; y < navMobArr ; y ++){
        let navMobHref = $("#navMove>a")[y].getAttribute("href");
        let pathNameNow = window.location.pathname.slice(15);
        
        if (navMobHref == pathNameNow){
            $("#navMove>a").eq(y).css({'opacity':'1'});
        } else if (navMobHref.slice(0,10) == pathNameNow && pathNameNow == "about.html"){
            $("#navMove>a").eq(4).css({'opacity':'1'});
        } else {
            $("#navMove>a").eq(y).css({"opacity":"0.5"});
            $("#navMove>a").eq(y).hover(function(){
                $(this).css({"opacity":"0.9"});
            }, function(){
                $(this).css("opacity", "0.5");
            });
        }

        if (navMobHref == pathNameNow && pathNameNow == "food.html"){
            $(".mobileNavFoodLink>a").css({'opacity':'1'});
            $(".mobileNavFoodLink>a").hover(function(){
                $(this).css("opacity", "0.5");
                }, function(){
                $(this).css("opacity", "1");
            });
        }
    }




