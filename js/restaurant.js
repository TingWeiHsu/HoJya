//  ==================== GET DATA AND CREATE ELEMENT FUNCTION ==================== 

let db = firebase.database();

const createE = function(tagN, classN, textC, setKey, setValue){
    let theElement = document.createElement(tagN);
    theElement.className = classN;
    theElement.textContent = textC ? textC:"";
    theElement[setKey] = setValue;
    return theElement;
}



//  ==================== click spoon and chopsticks icon and enter to restaurant part ==================== 

    $(".restaurantEnter").click(function(e){
        // get user x and y position and grow a circle just that point until bigger than screen
        let x = e.clientX;
        let y = e.clientY;
        $(".clickWhiteCircle").css("top", `calc(-2500px + ${y}px)`);
        $(".clickWhiteCircle").css("left", `calc(-2500px + ${x}px)`);
        $(".clickWhiteCircle").css("display", "block");

        // use seatimeout after the circle animation finished and start to show restaurant information
        setTimeout(function(){ 
            // get the id from the icon user clicked, as the key for data
            let enterKey = e.target.id;
            create_Restaurant_Section(enterKey);
        }, 1000);
        
    });



//  ==================== click to close restaurant part  ==================== 

    $(".resClose").click(function(){
        $(".clickCircle").css("margin-top", "0");
        $(".clickWhiteCircle").css("display", "none");
        $("#restaurantFullPage").css("display", "none");
        $(".clickCircle").css("display", "none");
        //clean to make it default
        document.getElementById('restaurantCard').innerHTML="";
    });



// ==================== produce the restaurant information after got them from the database ==================== 

    function create_Restaurant_Section(ek){
        // the gray bg which will cover the full screen first
        $(".clickCircle").css("display", "block");
        // show the real restaurant part page infor
        $("#restaurantFullPage").css("display", "block");

        let arrowSpanL = createE("span", "btn", null, "id", "leftRestButton");
        let arrowSpanR = createE("span", "btn", null, "id", "rightRestButton");
        arrowSpanL.classList.add("prev");
        arrowSpanR.classList.add("next");
        
        document.getElementById('restaurantCard').appendChild(arrowSpanL);
        document.getElementById('restaurantCard').appendChild(arrowSpanR);


        db.ref(ek).on('child_added', function(snapshot){
        
            // create a img source, make sure to got the img before show whole information
            let testImg = createE("img", null, null, "src", snapshot.val().bg);

            testImg.onload = function(){
                
                // img finished, hide the gray full screen cover
                $(".clickCircle").fadeOut("5s");

                // information part
                let titleH = createE("h1", null, snapshot.val().name, null, null);
                let subH = createE("h2", null, snapshot.val().pinyin, null, null);
                let addressP = createE("p", null, snapshot.val().address, null, null);
                let timeP = createE("p", null, snapshot.val().time, null, null);
                let telP = createE("p", null, snapshot.val().tel, null, null);
                
                // Link to home site information part
                let moreSp = createE("span", "moreSpan", "公式サイト", null, null);
                let iconA = createE("a", "moreA", null, "target", "_blank");
                iconA.setAttribute("href", snapshot.val().link );        
                
                let officialBox = createE("div", "officialBox", null, null, null);
                let textBox = createE("div", "restDetail", null, null, null);
                
                // restaurant food's container need to set background image
                let picBox = createE("div", "restPicture", null, null, null);
                picBox.style.backgroundImage = `url(${snapshot.val().pic})`;
            
                let mediumBox = createE("div", "restBig", null, null, null);
            
                // the biggest full screen, need to set background image
                let restaurantDiv = createE("div", "restaurantBG", null, "id", "restaurantBG");
                restaurantDiv.style.backgroundImage = `url(${snapshot.val().bg})`;

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
                
                // click restaurant home icon and have hover effect 
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

        // click arrow to another restaurant page

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



// ==================== RESTAURANT move the circle plus icon in restaurant ==================== 

function move_Restaurant_Circle_Around(e){

    // mouse move everytime will get x and y data
    let x = e.clientX;
    let y = e.clientY;
  
    // detect the correct x and y data of circle
    let cirxy = document.querySelector(".resClose").getBoundingClientRect();
    let cY = cirxy.top + 35;
    let cX = cirxy.left + 35;


    // let's move our circle, everytime move just bit of px
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



//  ==================== RESTAURANT removing the arrow when cannot scroll anymore ==================== 

function detect_Remove_Unnecessary_Arrow() {
    let totalWidth = document.getElementById('restaurantCard').scrollWidth;
    let oneWidth = $("#restaurantCard").width();
    let place = $("#restaurantCard").scrollLeft();

    let halfW = oneWidth/2;

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
















   
