let toDest = 0, currentPosition = 0;

//variable and code to save the link to navigate in the page
let a = document.querySelectorAll("a");
let aArray = [];

a.forEach(aElement => {
    let currentName = aElement.getAttribute("name");
    if(isNaN(currentName)){
       aArray.push(aElement);
    }
})

//navBG function manage the transparency of the navbar plus update the scrollTop value to be used by the hambuger menu
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
}

// event listener for the action onthe navbar
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

ul.forEach(li => {
    li.addEventListener("click", activeLiChange);
});

// animation of the li change
function activeLiChange(){
    let activeLi = document.querySelectorAll("li.active");

    activeLi.forEach(li => {
        if(!this.isEqualNode(li)){
            this.classList.add("active");
            li.classList.remove("active")
        }
    });

    let clickedDest = document.querySelector("a li.active").parentElement;
    scroll(clickedDest.getAttribute("id"));
}

function scroll(destIndex) {
    toDest = getDistanceFromTop(aArray[destIndex]);
    pageScroll();
}

function getDistanceFromTop(element) {
    var yPos = -100;

    while(element) {
        yPos += (element.offsetTop);
        element = element.offsetParent;
    }

    return yPos;
}

function pageScroll() {
    if(currentPosition < toDest){
        window.scrollBy(0,50);
        currentPosition += 50;
        scrolldelay = setTimeout(pageScroll,10);
    }else {
        toDest = currentPosition = 0;
    }
}


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
    $('.test').addClass('item_open');
    $('.test').addClass('item_open');
});



