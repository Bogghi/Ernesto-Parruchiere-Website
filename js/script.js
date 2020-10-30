// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
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

function showHbMenu (showVar) { 
    let menu = document.querySelector(".menu");
    let displayStatus = menu.style.display;

    if(!showVar){
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

const hbMenu = document.querySelector(".mobile-menu");
var isHidden = false;

hbMenu.addEventListener("click",function(){
    isHidden = showHbMenu(isHidden)
});

 // portfolio
 $('.gallery ul li a').click(function() {
    var itemID = $(this).attr('href');
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