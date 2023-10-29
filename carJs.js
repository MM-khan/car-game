const score = document.querySelector(".score");
const startArea = document.querySelector('.startArea');
const gameArea =document.querySelector('.gameArea');

let keys ={ArrowUp :false, ArrowDown:false , ArrowLeft: false,
ArrowRight:false};
let player = {speed : 5 , score : 0};

startArea.addEventListener('click', start);

document.addEventListener('keydown' , keyDown);
document.addEventListener('keyup' , keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
    // console.log(keys);
};

// hit the car

function hitCar(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top)
    || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

// lines animation

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >= 520){
            item.y -= 610
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}
// game over

function gameover(){
    player.start = false;
    startArea.classList.remove("hide");
    startArea.innerHTML= 'Game Over 👎 <br> Your Score is ' + player.score + 
    '<br> Click Here To Restart The Game. 👆'
}
// cars animation

function movecars(car){
    let moveCar = document.querySelectorAll('.otherCars');
    moveCar.forEach(function(item){

        if(hitCar(car ,item)){
            console.log('HIT THE Car');
            gameover();
        }
        if(item.y >= 520){
            item.y = -300
            item.style.left= Math.floor(Math.random()*250)+ 'px';
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}
function playGame(){
    // console.log('start road animation');
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect()

    if(player.start){
        moveLines();
        movecars(car);

        if(keys.ArrowUp && player.y > (road.top - 0) ){player.y -= player.speed};
        if(keys.ArrowDown && player.y < (road.bottom - 65)){player.y += player.speed};
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed};
        if(keys.ArrowRight && player.x < (road.width - 50)){player.x += player.speed};

        car.style.top =player.y + "px";
        car.style.left =player.x + "px"

        window.requestAnimationFrame(playGame);

        player.score++;
        let pS = player.score -1;
        score.innerText = 'Score : ' + pS;
    }
}
function start(){
    // gameArea.classList.remove('hide');
    startArea.classList.add("hide");
    gameArea.innerHTML = '';

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(playGame);

    for(l=0;l<5;l++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (l*150);
        roadLine.style.top = roadLine.y + 'px';
        gameArea.appendChild(roadLine)

    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    car.innerText = 'heelo i am car'
    gameArea.appendChild(car);

    player.y = car.offsetTop;
    player.x  = car.offsetLeft;
    
    // create other cars

    for(x=0;x<3;x++){
        let otherCars = document.createElement('div');
        otherCars.setAttribute('class', 'otherCars');
        otherCars.y = ((x+1)*250)* -1;
        otherCars.style.top = otherCars.y + 'px';
        otherCars.style.background= "red";
        otherCars.style.left= Math.floor(Math.random()*250)+ 'px';
        gameArea.appendChild(otherCars)

    } 
}