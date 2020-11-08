class scrollOjb {
    /* constructor inizialize the attributes
    @currentPosition depending on the position where the page gets loaded we get a pointer where we are at
    @index array containing the amout of pixel from the document top

    */
    constructor(pointer){
        this.currentPosition = document.documentElement.scrollTop;
        this.index = this.scrollPointArray(pointer);
        this.pointerIndex = "placeholder";
        console.log(this.index);
    }

    /* array builder for the index
    @scrollPoints nodeList containing the pointer in the document
    @scrollPointsIndex array containing the offest from document top for each pointer

    this fucntion return an oject containing:
    i: name of the destination link
    topDist: distance from the top of the document of the link

    its easy access thank to the array organization that find itself in the html
    */
    scrollPointArray(selector){
        let scrollPoints = document.querySelectorAll(selector);
        let scrollPointsIndex = [];
        
        for(let i = 0; i < scrollPoints.length; i++){
            let point = scrollPoints[i];
            point.setAttribute('pId',i);
            let crtIndex = {
                i: point.getAttribute('name'),
                topDist: this.getDistanceFromTop(point)
            };
            scrollPointsIndex.push(crtIndex);
        }

        return scrollPointsIndex;
    }

    /* function to calculate the distance from the top of the document of the @element
    @element element wher the distance get calculated
    @yPost var containing the final distance ( starts at -100 because the navbar is 100px )
    */
    getDistanceFromTop(element) {
        var yPos = -100;
    
        while(element) {
            yPos += (element.offsetTop);
            element = element.offsetParent;
        }
    
        return yPos;
    }
    
}

let a = new scrollOjb("#scroll-point","");

//     let clickedDest = document.querySelector("a li.active").parentElement;
//     scroll(clickedDest.getAttribute("id"));

//     function getDistanceFromTop(element) {
//         var yPos = -100;
    
//         while(element) {
//             yPos += (element.offsetTop);
//             element = element.offsetParent;
//         }
    
//         return yPos;
//     }
    
//     function pageScroll() {
//         if(currentPosition < toDest){
//             window.scrollBy(0,50);
//             currentPosition += 50;
//             scrolldelay = setTimeout(pageScroll,10);
//         }
//         // else {
//         //     toDest = currentPosition = 0;
//         // }
//     }

//     let toDest = 0, currentPosition = 0;

// //variable and code to save the link to navigate in the page
// let a = document.querySelectorAll("a");
// let aArray = [];

// a.forEach(aElement => {
//     let currentName = aElement.getAttribute("name");
//     if(isNaN(currentName)){
//        aArray.push(aElement);
//     }
// })