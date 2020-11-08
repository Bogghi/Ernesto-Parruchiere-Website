class scrollOjb {
    /* constructor inizialize the attributes
    @currentPosition depending on the position where the page gets loaded we get a pointer where we are at
    @index array containing the amout of pixel from the document top

    */
    constructor(pointer){
        this.currentPosition = document.documentElement.scrollTop;
        this.index = this.scrollPointArray(pointer);
        this.pointerIndex = "placeholder";
        this.dest = 0;
        this.dir = '';
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

    /* update the value of the attribute currentPosition
    this method can be attached to a event listener on the scroll event to keep track of where we are in the page
    */
    updateCurrentPosotion(){
        this.currentPosition = document.documentElement.scrollTop;
    }
    
    /* select and manage the scroll direction calling the pageScroll method
    
    @id is the index id to get the element to scroll to
    @dest populate the dest variable to indicate where we have to stop
    */
    scrollTo(id){
        this.dest = this.index[id].topDist;
        if(this.dest > this.currentPosition){
            this.dir = 'down';
            setTimeout(this.pageScroll(),1000);
        }else if(this.dest < this.currentPosition){
            this.dir = 'up';
            setTimeout(this.pageScroll(),1000);
        }
        this.dest = 0;
    }

    /* based on the @dir parameter we get scroll up or down
    
    @dir variable that is valued up/down and indicate if we are scrolling up or down
    */
    pageScroll() { 
        if(this.dir == 'up'){

            while(this.currentPosition > this.dest){
                console.log("currentPosition: "+this.currentPosition+" dest: "+this.dest);
                this.currentPosition -= 50;
                setTimeout(function(){
                    window.scrollBy(0,-50);
                },10);
            }

        }else if(this.dir == 'down') {

                while(this.currentPosition < this.dest){
                    console.log("currentPosition: "+this.currentPosition+" dest: "+this.dest);
                    this.currentPosition += 50;
                    setTimeout(function(){
                        window.scrollBy(0,50);
                    },10);
                }

        }
    }
    
}

let a = new scrollOjb("#scroll-point");

document.addEventListener("scroll",function(){
    a.updateCurrentPosotion();
});

// console.log(a.updateCurrentPosotion());

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