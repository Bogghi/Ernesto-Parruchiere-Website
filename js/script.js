//navBG function manage the transparency of the navbar plus update the scrollTop value to be used by the hambuger menu
let scrollTopValue = document.documentElement.scrollTop;
const hbMenu = document.querySelector(".mobile-menu");
let hbIsHidden = false;

document.addEventListener("scroll",navBG);


function navBG(){
    console.log(hbIsHidden + " " + scrollTopValue);

    let navbar = document.querySelector("nav");
    scrollTopValue = document.documentElement.scrollTop;
    if(scrollTopValue > 100 && !hbIsHidden){
        navbar.classList.add("scroll");
    }else if(scrollTopValue < 100 && !hbIsHidden){
        navbar.classList.remove("scroll");
    }
}

hbMenu.addEventListener("click",function(){
    hbIsHidden = showHbMenu(hbIsHidden)
});

function showHbMenu (menuHidden) { 
    let menu = document.querySelector(".menu");

    if(!menuHidden){
        console.log("showMenu: " + menuHidden);
        navBgOnClick(menuHidden);
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
        console.log("showMenu: " + menuHidden);
        navBgOnClick(menuHidden);
        // navbar.classList.remove("scroll");
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

// function to manage the transparency of the nav based on the scrol top
// @status is 0 if drop down menu is hidden
// @status is 1 if drop down menu is visible
function navBgOnClick(status){
    let navbar = document.querySelector("nav");
    console.log("navBg: " + status);

    if(!status){
        navbar.classList.add('scroll');
    }else if(status && scrollTopValue < 100){
        navbar.classList.remove('scroll');
    }

}


// Wrap every letter in a span
let textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

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

function activeLiChange(){
    let activeLi = document.querySelector("li.active");
    if(this != activeLi){
        this.classList.add("active");
        activeLi.classList.remove("active");
    }
}

const ul = document.querySelectorAll("nav ul li");

ul.forEach(li => {
    li.addEventListener("click", activeLiChange);
});

 // portfolio
 $('.gallery ul li a').click(function() {
    let itemID = $(this).attr('href');
    $('.gallery ul').addClass('item_open');
    $(itemID).addClass('item_open');
    return false;
});
$('.close').click(function() {
    $('.port, .gallery ul').removeClass('item_open');
    return false;
});

$(".gallery ul li a").click(function() {
    $('html, body').animate({
        scrollTop: parseInt($("#top").offset().top)
    }, 400);
});