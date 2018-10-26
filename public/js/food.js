// ==================== FOOD clicked cicle plus + to enlarge the food infor and make other things disappeared ==================== 

    function clickEnlargeShowDetail(x) {
        // click + to toggle adding or remove css
        x.classList.toggle("clicked");
        
        // when clicked make right small navigation dots hide 
        $("#fp-nav").css("display","none");

        let w = $(window).width();
        let circleLoop = document.querySelectorAll(".circle");
        if(x.classList.contains("clicked")){
            // check if one of circle is clicked, change all of them to be clicked
            for (let i = 0; i < circleLoop.length ; i++){
                circleLoop[i].classList.add("clicked");
            }

            // move out outside unnecessary things
            $("header").animate({marginTop:"-50%"},300);
            $("footer").animate({marginBottom:"-50%"},300);

            // make gray bg full screen
            $(".grayBackGroundCover").animate({opacity:"1",height:"100vh",padding:"0px 200px",width:"3000px"},10);
            // show food detail elements move to correct position
            $(".productName").animate({marginTop:"-10%"},300);
            $(".productSubName").animate({marginTop:"-10%"},300);
            $(".ingredientBox").animate({opacity:"1",marginTop:"0%"},300);
            // enlarge main food photo
            $(".foodPhoto").animate({padding:"0px"},300);
            // food detail part right-side web circle navigation show
            $("#circlePicDotNavigate").animate({marginRight:"0%"},300);

            // screen smaller than 900 show mobile nav
            if (w < 900) {
                $(".topLogoMobileBox").animate({marginTop:"-150%"},300);
                $(".bottomNavMobileBox").animate({marginTop:"-250%"},300);
            } 
        
        } else {
            // show small right dots back when unclicked but smaller than 550px hide again
            $("#fp-nav").css("display","initial");
            if (w < 550) {
                $("#fp-nav").css("display","none");
            } 

            for (let i = 0; i < circleLoop.length ; i++){
                circleLoop[i].classList.remove("clicked");
            };
            $("header").animate({marginTop:"0%"},300);
            $("footer").animate({marginBottom:"0%"},300);
            $(".grayBackGroundCover").animate({opacity:"0",height:"0vh",padding:"0px 0px",width:"100%"},10);
            $(".productName").animate({marginTop:"0%"},300);
            $(".productSubName").animate({marginTop:"0%"},300);
            $(".ingredientBox").animate({opacity:"0",marginTop:"35%"},100);
            $(".foodPhoto").animate({padding:"20px"},300);
            $("#circlePicDotNavigate").animate({marginRight:"-250%"},300); 

            
            if (w < 900) {
                $(".topLogoMobileBox").animate({marginTop:"0%"},300);
                $(".bottomNavMobileBox").animate({marginTop:"0%"},300);
            } 
        }



        //  ============= detect which food page section is user watching and make right circle become white color inside ============= 
        
        let hashArray = ["#page1","#page2","#page3","#page4"];
        let hashNum = window.location.hash;
        let circleCArray = ['.circleDotPlace1','.circleDotPlace2','.circleDotPlace3','.circleDotPlace4'];
        for (let h = 0; h < hashArray.length ; h ++ ){
            if ( hashNum === hashArray[h]){
                let circleNumber = circleCArray[h];
                $(circleNumber).addClass('circleSelected');
                } else if (hashNum === "") {
                let circleNumber = circleCArray[0];
                $(circleNumber).addClass('circleSelected');
                }
            };
    }



// ==================== FOOD circle bar with photos when hover ==================== 

    let circleCArray = ['.circleDotPlace1','.circleDotPlace2','.circleDotPlace3','.circleDotPlace4'];
    let circlePArray = ['.circlePic1','.circlePic2','.circlePic3','.circlePic4'];

    for ( let y = 0; y < circleCArray.length ; y++) {
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



// ==================== FOOD restaurant icon hover and have animation effect ==================== 

    $(".restaurantBox").hover(function(){
        let w = $(window).width();

        $(".ingredientBox").css("background-position-x", "210px");
        $(".ingredientBox").css("background-position-y", "50px");
        $(".ingredientBox").css("transition", "ease-in-out .8s");
        $(".hoverText").css("display", "block");

        if (w < 550) {
            $(".ingredientBox").css("background-position-x", "60px");
            $(".ingredientBox").css("background-position-y", "50px");
        } else if (w < 1024){
            $(".ingredientBox").css("background-position-x", "210px");
            $(".ingredientBox").css("background-position-y", "50px");
        } else if (w < 1200 && w > 1024){
            $(".ingredientBox").css("background-position-x", "60px");
            $(".ingredientBox").css("background-position-y", "80px");
        } else if (w > 1200) {
            $(".ingredientBox").css("background-position-x", "210px");
            $(".ingredientBox").css("background-position-y", "50px");
        }

    }, function(){
        $(".ingredientBox").css("background-position-x", "410px");
        $(".ingredientBox").css("background-position-y", "150px");
        $(".ingredientBox").css("transition", "initial");
        $(".hoverText").css("display", "none");
        }
    );