


$(".restaurantEnter").click(function(e){
    // click and then show the full page  if ok want to add transition animation before go to full page
    $("#restaurantFullPage").css("display", "block");
    // get the id as the key for data
    let enterKey = e.target.id;
    create(enterKey);
});

$(".resClose").click(function(){
    $("#restaurantFullPage").css("display", "none");
    document.getElementById('restaurantCard').innerHTML="";
});


let db = firebase.database();





function create(ek){
    console.log(ek);

    let arrowSpanL = document.createElement('span');
    let arrowSpanR = document.createElement('span');
    arrowSpanL.classList.add("btn");
    arrowSpanR.classList.add("btn");
    arrowSpanL.classList.add("prev");
    arrowSpanR.classList.add("next");
    document.getElementById('restaurantCard').appendChild(arrowSpanL);
    document.getElementById('restaurantCard').appendChild(arrowSpanR);

    db.ref(ek).on('child_added', function(snapshot) {
        console.log(snapshot.val());
    
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
        let iconA = document.createElement("a");
        iconA.setAttribute("href", snapshot.val().link );
        iconA.setAttribute("target", "_blank");
        
    
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
    
    
        textBox.appendChild(titleH);
        textBox.appendChild(subH);
        textBox.appendChild(addressP);
        textBox.appendChild(timeP);
        textBox.appendChild(telP);
        textBox.appendChild(iconA);
    
        mediumBox.appendChild(textBox);
        mediumBox.appendChild(picBox);
    
        restaurantDiv.appendChild(mediumBox);
    
        document.getElementById('restaurantCard').appendChild(restaurantDiv);
        
    })



    // scroll arrow to another page

    const gallery = document.querySelector('#restaurantFullPage');
    const gallery_scroller = document.querySelector('#restaurantCard');
    const gallery_item_size = document.querySelector('div').clientWidth;

    console.log(gallery_item_size);

    gallery.querySelector('.btn.next').addEventListener('click', scrollToNextPage);
    gallery.querySelector('.btn.prev').addEventListener('click', scrollToPrevPage);

    function scrollToNextPage() {
    gallery_scroller.scrollBy(gallery_item_size, 0);
    }
    function scrollToPrevPage() {
    gallery_scroller.scrollBy(-gallery_item_size, 0);
    }

   
}







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
















   
