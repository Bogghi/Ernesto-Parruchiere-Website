/* constructor inizialize the attributes
@currentPosition depending on the position where the page gets loaded we get a pointer where we are at
@index array containing the amout of pixel from the document top
*/
let currentPosition = document.documentElement.scrollTop;
let index = scrollPointArray("#scroll-point");
let dest = 0;
let dir = '';

/* array builder for the index
@scrollPoints nodeList containing the pointer in the document
@scrollPointsIndex array containing the offest from document top for each pointer
this fucntion return an oject containing:
i: name of the destination link
topDist: distance from the top of the document of the link
its easy access thank to the array organization that find itself in the html
*/
function scrollPointArray(selector){
    let scrollPoints = document.querySelectorAll(selector);
    let scrollPointsIndex = [];
    
    for(let i = 0; i < scrollPoints.length; i++){
        let point = scrollPoints[i];
        point.setAttribute('pId',i);
        let crtIndex = {
            i: point.getAttribute('name'),
            topDist: getDistanceFromTop(point)
        };
        scrollPointsIndex.push(crtIndex);
    }
    return scrollPointsIndex;
}

/* function to calculate the distance from the top of the document of the @element
@element element wher the distance get calculated
@yPost var containing the final distance ( starts at -100 because the navbar is 100px )
*/
function getDistanceFromTop(element) {
    let yPos = -100;

    while(element) {
        yPos += (element.offsetTop);
        element = element.offsetParent;
    }

    return yPos;
}
/* update the value of the attribute currentPosition
this method can be attached to a event listener on the scroll event to keep track of where we are in the page
*/
function updateCurrentPosotion(){
    currentPosition = document.documentElement.scrollTop;
}

/* select and manage the scroll direction calling the pageScroll method

@id is the index id to get the element to scroll to
@dest populate the dest variable to indicate where we have to stop
*/
function scrollTo(id){
    dest = index[id].topDist;
    if(dest > currentPosition){
        dir = 'down';
        scrollDown();
    }else if(dest < currentPosition){
        dir = 'up';
        // pageScroll();
        scrollUp();
    }
    
}
/* based on the @dir parameter we get scroll up or down

@dir variable that is valued up/down and indicate if we are scrolling up or down
*/
function scrollUp(){
    if(currentPosition > dest){
        console.log("currentPosition: "+currentPosition+" dest: "+dest);
        currentPosition -= 50;    
        window.scrollBy(0,-50);
        scrolldelay = setTimeout(scrollUp,10);
    }else {
        dest = 0;
    }
}

function scrollDown(){
    if(currentPosition < dest){
        console.log("currentPosition: "+currentPosition+" dest: "+dest);
        currentPosition += 50;    
        window.scrollBy(0,50);
        scrolldelay = setTimeout(scrollDown,10);
    }else{
        dest = 0;
    }
}

//navBG function manage the transparency of the navbar   plus update the scrollTop value to be used by the hambuger menu
const hbMenu = document.querySelector(".mobile-menu");
const hbMenuLi = document.querySelector('.menu ul');

let scrollTopValue = document.documentElement.scrollTop;
let hbIsHidden = false;

//adding an even listener to make the transparency of the navbar dinamic
document.addEventListener("scroll",navBG);

// callback function for the transparency
function navBG(){

    let navbar = document.querySelector("nav");
    scrollTopValue = document.documentElement.scrollTop;
    if(scrollTopValue > 100 && !hbIsHidden){
        navbar.classList.add("scroll");
    }else if(scrollTopValue < 100 && !hbIsHidden){
        navbar.classList.remove("scroll");
    }

    updateCurrentPosotion();
}

// event listener for the action on the navbar
hbMenu.addEventListener("click",function(){
    hbIsHidden = showHbMenu(hbIsHidden)
});
hbMenuLi.addEventListener("click",function(){
    hbIsHidden = showHbMenu(hbIsHidden);
});

// this function manage the animation of the drop down menu
function showHbMenu (menuHidden) { 
    let menu = document.querySelector(".menu");

    if(!menuHidden){
        navBgOnClick(menuHidden);
        document.querySelector(".menu").style.display = "flex";
        anime.timeline().add({
            targets: '.menu',
            opacity: [0,1],
            height: "320px",
            easing: "linear",
            duration: 200,
            delay: (el, i) => 70 * (i+1)
        })
        return true;
    }else {
        navBgOnClick(menuHidden);
        document.querySelector(".menu").style.display = "none";
        anime.timeline().add({
            targets: ".menu",
            opacity: 0,
            height: "0px",
            duration: 200,
            easing: "easeOutExpo"
            // delay: 00
          });
        return false;
    }
}

// function to manage the transparency of the nav based on the scrol top and the click event
// @status is 0 if drop down menu is hidden
// @status is 1 if drop down menu is visible
function navBgOnClick(status){
    let navbar = document.querySelector("nav");

    if(!status){
        navbar.classList.add('scroll');
    }else if(status && scrollTopValue < 100){
        navbar.classList.remove('scroll');
    }

}


// Wrap every letter in a span
let textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// animation of the h1
anime.timeline().add({
        targets: '.ml1 .letter',
        scale: [0.3,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        delay: (el, i) => 70 * (i+1)
    }).add({
        targets: '.ml1 .line',
        scaleX: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
    });


const ul = document.querySelectorAll("header ul li");
const logo = document.querySelector("a#home");

ul.forEach(li => {
    li.addEventListener("click", activeLiChange);
});

// animation of the li change
function activeLiChange(){
    let activeLi = document.querySelectorAll("li.active");

    activeLi.forEach(li => {
        if(!this.isEqualNode(li)){
            let id = this.parentElement.id;
            scrollTo(id);
            this.classList.add("active");
            li.classList.remove("active")
        }
    });
}

logo.addEventListener("click",function(){
    scrollTo(0);
});

 // portfolio
 $('.gallery ul li a').click(function() {
    let itemID = $(this).attr('href');
    $('.close').addClass('item_open');
    $(itemID).addClass('item_open');
    return false;
});
$('.close').click(function() {
    $('.port, .close').removeClass('item_open');
    return false;
});

$('.services .card a').click(function () {
    let list = $(this).attr('id') == 'hair';
    
    $('.closePrice').addClass('item_open');
    if(list){
        $('#hairPrice').addClass('item_open');
    }else{
        $('#beardPrice').addClass('item_open');
    }

    return false;
});

$('.closePrice').click(function() {
    $('.closePrice, .price-list').removeClass('item_open');
    return false;
});



