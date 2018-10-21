
  // Initialize Firebase
  


$(".restaurantEnter").click(function(e){
    let x = e.clientX;
    let y = e.clientY;
    console.log(x,y);
    $(".clickWhiteCircle").css("top", `calc(-2500px + ${y}px)`);
    $(".clickWhiteCircle").css("left", `calc(-2500px + ${x}px)`);
    $(".clickWhiteCircle").css("display", "block");
    // click and then show the full page  if ok want to add transition animation before go to full page

    setTimeout(function(){ 
        
        // get the id as the key for data
        let enterKey = e.target.id;
        
        create(enterKey);
     }, 1000);
    
});

$(".resClose").click(function(){
    $(".clickCircle").css("margin-top", "0");
    $(".clickWhiteCircle").css("display", "none");
    $("#restaurantFullPage").css("display", "none");
    $(".clickCircle").css("display", "none");
   
    document.getElementById('restaurantCard').innerHTML="";
});


let db = firebase.database();





function create(ek){
    $(".clickCircle").css("display", "block");
    $("#restaurantFullPage").css("display", "block");
    
    let count = [];

    db.ref(ek).on("child_added", function(snap) {
    console.log("added:", snap.key);
    count.push(snap.key);

    console.log(count);
    });

    

    let arrowSpanL = document.createElement('span');
    let arrowSpanR = document.createElement('span');
    arrowSpanL.classList.add("btn");
    arrowSpanR.classList.add("btn");
    arrowSpanL.classList.add("prev");
    arrowSpanR.classList.add("next");
    arrowSpanL.setAttribute("id","leftRestButton");
    arrowSpanR.setAttribute("id","rightRestButton");
    document.getElementById('restaurantCard').appendChild(arrowSpanL);
    document.getElementById('restaurantCard').appendChild(arrowSpanR);

    let ind = 1;

    db.ref(ek).on('child_added', function(snapshot) {
    
        let img = document.createElement("img");
        img.setAttribute("src",snapshot.val().bg);

        img.onload = function(){

        // $(".clickCircle").animate({marginTop:"-100vh"},1500);
        
        $(".clickCircle").fadeOut("5s");
         


         



        let titleH = document.createElement("h1");
        titleH.textContent = snapshot.val().name;
        let subH = document.createElement("h2");
        subH.textContent = snapshot.val().pinyin;
        let addressP = document.createElement("p");
        addressP.textContent = snapshot.val().address;
        let timeP = document.createElement("p");
        timeP.textContent = snapshot.val().time;
        let telP = document.createElement("p");
        telP.textContent = snapshot.val().tel;

        
        let moreSp = document.createElement("span");
        moreSp.textContent = "公式サイト";
        moreSp.classList.add("moreSpan");
        let iconA = document.createElement("a");
        iconA.setAttribute("href", snapshot.val().link );
        iconA.setAttribute("target", "_blank");
        iconA.classList.add("moreA");

        let officialBox = document.createElement("div");
        officialBox.classList.add("officialBox");
    
        let textBox = document.createElement("div");
        textBox.classList.add("restDetail");
        
    
        // ++++++ need to set background
        let picBox = document.createElement("div");
        picBox.classList.add("restPicture");
        picBox.style.backgroundImage = `url(${snapshot.val().pic})`;
    
        let mediumBox = document.createElement("div");
        mediumBox.classList.add("restBig");
    
    
    
    
        // the biggest layer ++++++ need to set background
        let restaurantDiv = document.createElement('div');
        restaurantDiv.classList.add("restaurantBG");
        restaurantDiv.style.backgroundImage = `url(${snapshot.val().bg})`;
        restaurantDiv.setAttribute("id","restaurantBG");
        restaurantDiv.setAttribute("id",`${ind}`);
        ind += 1;
    
    
        textBox.appendChild(titleH);
        textBox.appendChild(subH);
        textBox.appendChild(addressP);
        textBox.appendChild(timeP);
        textBox.appendChild(telP);
        officialBox.appendChild(moreSp);
        officialBox.appendChild(iconA);
        textBox.appendChild(officialBox);
    
        mediumBox.appendChild(textBox);
        mediumBox.appendChild(picBox);
    
        restaurantDiv.appendChild(mediumBox);
    
        document.getElementById('restaurantCard').appendChild(restaurantDiv);
        
        function checkHover () {
            $(".moreA").hover(function(){
                $(".restBig").css("background-position-x", "80px");
                $(".restBig").css("background-position-y", "150px");
                $(".restBig").css("transition", "ease-in-out .8s");
                $(".moreSpan").css("display", "block");
                
                }, function(){
                $(".restBig").css("background-position-x", "400px");
                $(".restBig").css("background-position-y", "300px");
                $(".restBig").css("transition", "initial");
                $(".moreSpan").css("display", "none");
            });
        }

        checkHover ();
        }
    })



    // scroll arrow to another restaurant page

    const gallery = document.querySelector('#restaurantFullPage');
    const gallery_scroller = document.querySelector('#restaurantCard');
    const gallery_item_size = document.querySelector('div').clientWidth;

    gallery.querySelector('.btn.next').addEventListener('click', scrollToNextPage);
    gallery.querySelector('.btn.prev').addEventListener('click', scrollToPrevPage);

    function scrollToNextPage() {
    gallery_scroller.scrollBy(gallery_item_size, 0);
    }
    function scrollToPrevPage() {
    gallery_scroller.scrollBy(-gallery_item_size, 0);
    }

}





// move the circle in restaurant 

function circleMoAround(e){

    // mouse move everytime will get something
    let x = e.clientX;
    let y = e.clientY;
    let  coor = "Coordinates: (" + x + "," + y + ")";
  

    // detect the correct x and y of circle
    let cirxy = document.querySelector(".resClose").getBoundingClientRect();
    let cY = cirxy.top + 35;
    let cX = cirxy.left + 35;


    // let's move our circle
    let newX = (x-cX)/20;
    let newY = (y-cY)/20;

    let circleArr = document.querySelectorAll(".resClose");

    let w = $(window).width();
    if (w > 1025) {
    
        for (let i = 0; i < circleArr.length ; i++){
            if (i === 0) {
                circleArr[i].style.transform = `translate(${newX}px,${newY}px)`; 
            } 
        }
        
    }
    
}


// removing the arrow when scroll

function scrollDetect() {
    let totalWidth = document.getElementById('restaurantCard').scrollWidth;
    let oneWidth = $("#restaurantCard").width();
    let place = $("#restaurantCard").scrollLeft();

    let halfW = oneWidth/2;
    console.log(halfW);

    if (place < Number(halfW)) {
        $("#leftRestButton").css({'opacity':'0'});
    } else if (place > Number(halfW)) {
        $("#leftRestButton").css({'opacity':'1'});
    }

    if (Number(totalWidth) - Number(oneWidth)- Number(halfW) < place){
        $("#rightRestButton").css({'opacity':'0'});
    } else {
        $("#rightRestButton").css({'opacity':'1'});
    }
}
















   
