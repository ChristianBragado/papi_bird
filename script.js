let block = document.getElementById("block");
let hole = document.getElementById("hole");
let papi = document.getElementById("papi");
let jumping = 0;
let counter = 0;


hole.addEventListener('animationiteration', () => {
    let random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
});
setInterval(function(){ //setInterval for the block to move
    let papiTop = parseInt(window.getComputedStyle(papi).getPropertyValue("top"));
    if(jumping==0){
        papi.style.top = (papiTop+3)+"px";
    }
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let cTop = -(500-papiTop);
    if((papiTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Game Over Papi. Your Score is: "+(counter-1));
        papi.style.top = 100 + "px";
        counter=0;
    }
},15);

function jump(){ //jump function for the papi
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let papiTop = parseInt(window.getComputedStyle(papi).getPropertyValue("top"));
        if((papiTop>6)&&(jumpCount<15)){
            papi.style.top = (papiTop-4)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    let now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let sound = new Howl({
    src: ['sounds/music.mp3'],
    autoplay: true,
    loop: true,
    volume: 1,
});

sound.play();
