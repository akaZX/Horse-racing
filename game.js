//global variables required for betting
var selection; //horse from dropdown
var funds = 100; // funds to start with
var bet; // betting amount
var selectedHorse; // stores selection from dropdown list
var odd = [2,2,2,2]; //starting odds

//sets starting position in arrays
const STARTLEFT = [];
const STARTTOP = [];
var scoreBoard = [];
var interval = 0;
var element;
var positionLeft = 0;
var positionTop = 0;
var nearFinish = false;

// array for different corner angles
var turningCorner1 = [];
turningCorner1[0] = 0.06;
turningCorner1[1] = 0.04;
turningCorner1[2] = 0.02;
turningCorner1[3] = 0.00;


//records betting selections
function bettingSelections(){
    var e = document.getElementById("bethorse");
    selection = e.value;

    console.log(selection);
    let el = document.getElementById("amount");
    bet = el.value;

    if(bet > funds && funds <= 0){
        alert("Insufficient funds");
        bettingSelections();            
    }    
}

//horses movement
function move() {

    var startButton = document.querySelector('#start');
    startButton.removeEventListener('click', start);
    //startButton.style.color = "Red";
    startButton.style.cursor = "not-allowed";

    var horse = document.getElementsByClassName('horse')


    for (var i = 0; i < horse.length; i++) {
        var randomSpeed = Math.floor(Math.random() * 7);
        var positionTop = horse[i].offsetTop;
        var positionLeft = horse[i].offsetLeft;

        //moves horses right
        if (positionTop > innerHeight * (0.72 - turningCorner1[i]) && positionLeft < innerWidth * (0.75 + turningCorner1[i]) && positionLeft > innerWidth * 0.05) {
                       
            horse[i].className = "horse runRight";
            horse[i].style.left = positionLeft + randomSpeed + 'px';
        }

        //moves horses up          
        else if (positionTop > innerHeight * (0.07 + turningCorner1[3 - i]) && positionLeft >= innerWidth * (0.75 + turningCorner1[i])) {
            horse[i].className = "horse runUp";
            horse[i].style.top = positionTop - randomSpeed + 'px';
        }

        //moves horses left
        if (positionTop < innerHeight * (0.07 + turningCorner1[3 - i]) && positionLeft >= innerWidth * (0.12 - turningCorner1[3 - i])) {
            horse[i].className = "horse runLeft";
            horse[i].style.left = positionLeft - randomSpeed + 'px';
        }

        //moves horse down   
        else if (positionLeft <= innerWidth * (0.14 - turningCorner1[3 - i]) && positionTop < innerHeight * (0.74 - turningCorner1[i])) {
            horse[i].className = "horse runDown";
            horse[i].style.top = positionTop + randomSpeed + 'px';
            nearFinish = true;
        }
        //final movement to right
        else if (nearFinish == true && positionTop > innerHeight * (0.72 - turningCorner1[i]) && positionLeft < innerWidth * (0.75 + turningCorner1[i]) && positionLeft > innerWidth * 0.05) {
            nearFinish = true;
           
            horse[i].className = "horse runRight";
            horse[i].style.left = positionLeft + randomSpeed + 'px';

            //finds start line
            var finishLine = document.querySelector('#startline');
            var finish = finishLine.offsetLeft + 120;

            //checks horse position according to set finish position
            if (positionLeft >= finish) {
                horse[i].style.left = finish + 'px';
                //horse[i].style.left = positionLeft + 0 + 'px';
                horse[i].className = "horse standRight";

                //adds elements to scoreboard array it is added by sequence who reached finish position first 
                var adding = winners(scoreBoard, "horse" + (i + 1));

                if (adding == false) {
                    scoreBoard.push("horse" + (i + 1));
                    
                }   
            }  
        }  
    }   

    //stops timer and function when array has four elements in it    
    if (scoreBoard.length == horse.length) {
        clearInterval(interval);
        winnerTable();                     
}   }

// Checks scoreBoard array for same elements
function winners(array, horseNumber) {
    var check = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == horseNumber) {
            check = true;
        }
    }
    return check;
}

// Updates winner table according to horse finish position
function winnerTable() {
    for (var i = 0; i < scoreBoard.length; i++) {
        var winnerPosition = document.getElementById((i + 1));
        winnerPosition.className = scoreBoard[i];       
    }     
    betResults();    
}

//generates odds for winner horse and loosers
function odds(){
    for(var i=0; i < 4;i++){
        if(scoreBoard[0] == "horse" + (i+1)){           
            odd[i] = odd[i]/2;
            if(odd[i]<2){
                odd[i]=2;
            }
        }
        else{
            odd[i]=odd[i]+2;
        }
    }
}

//resets horse position to original 
function resetPosition() {
    scoreBoard= []; //clears array
    var horse = document.getElementsByClassName('horse');

    for(var i = 0; i < 4; i++){
        horse[i].style.left = STARTLEFT[i] + 'px';
        horse[i].style.top = STARTTOP[i] + 'px';
       
        
        horse[i].className = "horse standRight";
        nearFinish = false;        
    }  
    selection = "";
    bet = 0;
    myLoadEvent(); 
}


// adds betting results
function betResults(){

    if(selection == scoreBoard[0]){
        let number = scoreBoard[0].charAt(5);
        console.log(number); 
        let wonAmount = bet * odd[number-1];
        alert("You just won: "+ wonAmount);
        funds = funds + wonAmount; 
    }    
    document.getElementById("funds").innerHTML = funds;
    odds();
    resetPosition();
}


//checks betting sum and funds to carry on betting
function betting(){
    let e = document.getElementById("bethorse");
    selection = e.value;
    let el = document.getElementById("amount");
    bet = el.value;
    
        if(bet > funds || funds <= 0){
            alert("Insufficient funds");
            el.value = "";
            bet = 0; 
            betting();                    
        }
         if(bet == 0 || bet>funds) {
            alert("Please enter amount");            
         } 
         else{    
        funds = funds-bet;
        document.getElementById("funds").innerHTML=funds;
        interval = setInterval(move, 10);}
}

function start() {  
    betting();    
}


function myLoadEvent() {
    //gets starting positions
    let horse = document.getElementsByClassName('horse');
    for (var i = 0; i < horse.length ; i++){
        STARTLEFT[i] = horse[i].offsetLeft;
        STARTTOP[i] = horse[i].offsetTop;
        horse[i].className = "horse standRight";
    }    
    var startButton = document.querySelector('div #start');
    if(scoreBoard.length==0){
      
        startButton.style.cursor = "pointer";
    }
    startButton.addEventListener('click', start);
}


document.addEventListener('DOMContentLoaded', myLoadEvent);