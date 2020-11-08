/* constructor inizialize the attributes
@currentPosition depending on the position where the page gets loaded we get a pointer where we are at
@index array containing the amout of pixel from the document top
*/
let currentPosition = document.documentElement.scrollTop;
let index = scrollPointArray(pointer);
let pointerIndex = "placeholder";
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
    dest = 0;
}
/* based on the @dir parameter we get scroll up or down

@dir variable that is valued up/down and indicate if we are scrolling up or down
*/
function scrollUp(){
    if(currentPosition > dest){
        console.log("currentPosition: "+currentPosition+" dest: "+dest);
        currentPosition -= 50;    
        window.scrollBy(0,-50);
        let x = setTimeout(scrollUp(currentPosition, dest),10);
    }else {
        console.log("exit currentPosition: "+currentPosition+" dest: "+dest);
    }
}

function scrollDown(){
    if(currentPosition < dest){
        console.log("currentPosition: "+currentPosition+" dest: "+dest);
        currentPosition += 50;    
        window.scrollBy(0,50);
        let x = setTimeout(scrollDown(currentPosition, dest),10);
    }else{
        console.log("exit currentPosition: "+currentPosition+" dest: "+dest);
    }
}

