// This file has been tested with WWW.JSHINT.COM

//global text area variables
var lapsElement;
var amountElement;
var laps;
var checkLaps = false;
//global variables required for betting
var selection; //horse from dropdown
var funds = 100; // funds to start with
var bet; // betting amount
var odd = [2, 2, 2, 2]; //starting odds, additional horses needs new entries
//sets starting position in arrays
const STARTLEFT = [];
const STARTTOP = [];
const HORSECOUNT = 4;
var scoreBoard = [];
var speed = [1, 1, 1, 1]; // pre-set starting speed
var speedInterval = 0;
var randomSpeed = 0;
var interval = 0;
var nearFinish = false;
// array for different corner angles, adding more horses needs more entries
var turningCorner1 = [];
turningCorner1[0] = 0.08;
turningCorner1[1] = 0.06;
turningCorner1[2] = 0.04;
turningCorner1[3] = 0.02;
//array for horse names
var horseName = ["White", "Blue", "Green", "Brown"]; // additional horses needs new entries

//sets incrementing speed for race start
function startSpeed() {
    for (var i = 0; i < HORSECOUNT; i++) {
        if (speed[i] == 4) {
            speed[i] = 4;
            continue;
        }
        speed[i] = speed[i] + 1;
    }
    if (speed[HORSECOUNT-1] == 4) {
        clearInterval(speedInterval);
        randomSpeed = setInterval(speedRandomiser, 250);
    }
}

function speedRandomiser() {

    if (speed.length == HORSECOUNT) {
        speed = [];
    }
    for (var i = 0; i < HORSECOUNT; i++) {
        speed.push((Math.ceil(Math.random() * 3)) + 3);
    }
}
var distance = [0,0,0,0];
//horses movement
function move() {
    //disables start button
    var startButton = document.querySelector('#start');
    startButton.removeEventListener('click', start);
    startButton.style.cursor = "not-allowed";
    startButton.className = "disabled";
    //sets finish position for horses
    let finishLine = document.querySelector('#startline');
    var finish = finishLine.offsetLeft + 140;
    //targets all horse elements 
    var horse = document.getElementsByClassName('horse');
    for (var i = 0; i < horse.length; i++) {
        //tracks horse position in x and y axis
        var positionTop = horse[i].offsetTop;
        var positionLeft = horse[i].offsetLeft;
        //moves horses right
        if (positionTop > window.innerHeight * (0.75 - turningCorner1[i]) && positionLeft < window.innerWidth * (0.72 + turningCorner1[i]) && positionLeft > window.innerWidth * 0.05) {
            horse[i].className = "horse runRight";
            horse[i].style.left = positionLeft + speed[i] + 'px';
            distance[i] = distance[i] +speed[i];
        }
        //moves horses up          
        else if (positionTop > window.innerHeight * (0.07 + turningCorner1[HORSECOUNT-1 - i]) && positionLeft >= window.innerWidth * (0.72 + turningCorner1[i])) {
            horse[i].className = "horse runUp";
            horse[i].style.top = positionTop - speed[i] + 'px';
            checkLaps = true;
            distance[i] = distance[i] +speed[i];
        }
        //moves horses left
        if (positionTop < window.innerHeight * (0.07 + turningCorner1[HORSECOUNT-1- i]) && positionLeft >= window.innerWidth * (0.12 - turningCorner1[HORSECOUNT-1 - i])) {
            horse[i].className = "horse runLeft";
            horse[i].style.left = positionLeft - speed[i] + 'px';
            distance[i] = distance[i] +speed[i];
        }
        //moves horse down   
        else if (positionLeft <= window.innerWidth * (0.14 - turningCorner1[HORSECOUNT-1 - i]) && positionTop < window.innerHeight * (0.80 - turningCorner1[i])) {
            horse[i].className = "horse runDown";
            horse[i].style.top = positionTop + speed[i] + 'px';
            distance[i] = distance[i] +speed[i];
            //checks laps when horse goes down;
            if (checkLaps === true) {
                laps = laps - 1;
                if (laps === 0) {
                    nearFinish = true;
                }
            }
            checkLaps = false;            
        }
        //final movement to right
        else if (nearFinish === true && positionTop > window.innerHeight * (0.75 - turningCorner1[i]) && positionLeft < window.innerWidth * (0.72 + turningCorner1[i]) && positionLeft > window.innerWidth * 0.05) {
            nearFinish = true;
            horse[i].className = "horse runRight";
            horse[i].style.left = positionLeft + speed[i] + 'px';
            distance[i] = distance[i] +speed[i];

            //checks horse position according to set finish position
            if (positionLeft >= finish) {
                horse[i].style.left = finish + 'px';
                horse[i].className = "horse standRight";
                //adds elements to scoreboard array it is added by sequence who reached finish position first 
                var adding = winners(scoreBoard, "horse" + (i + 1));

                if (adding === false) {
                    scoreBoard.push("horse" + (i + 1));
                }
            }
        }
    }
    //stops timer and function when array has four elements in it    
    if (scoreBoard.length == horse.length) {
        clearInterval(interval);
        clearInterval(randomSpeed);
        winnerTable();
    }
}
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
        let winnerPosition = document.getElementById((i + 1));
        winnerPosition.className = scoreBoard[i];
    }
    betResults();
}
//generates odds for winner horse and loosers
//works in a way to half down odds for winner and takes 1 out from second place
function odds() {
    for (var i = 0; i < HORSECOUNT; i++) {
        if (scoreBoard[0] == "horse" + (i + 1)) {
            odd[i] = odd[i] / 2;
            if (odd[i] < 2) {
                odd[i] = 2;
            }
        } else if (scoreBoard[1] == "horse" + (i + 1)) {
            odd[i] = odd[i] - 2;
            if (odd[i] < 2) {
                odd[i] = 2;
            }
        } else {
            odd[i] = odd[i] + 2;
        }
    }
}
// adds betting results
function betResults() {
    if (selection == scoreBoard[0]) {
        let number = scoreBoard[0].charAt(5);
        let wonAmount = bet * odd[number - 1];
        alert("You just won: " + wonAmount);
        funds = funds + wonAmount;
    } else {
        alert("Your selected horse lost");
    }
    document.getElementById("funds").innerHTML = funds;
    odds();
    restart();
}

function restart() {
    var startButton = document.querySelector('#start');
    startButton.classList.remove("disabled");
    startButton.innerHTML = "Restart ?";
    startButton.style.cursor = "pointer";
    startButton.addEventListener('click', resetPosition);
    //resetPosition();
}
//resets horse position to original 
function resetPosition() {
    var startButton = document.querySelector('#start');
    startButton.innerHTML = "Start Race";
    //clears arrays   
    scoreBoard = [];
    //sets speed interval for new round, if more horses added than it need additional inputs in array
    speed = [1,1,1,1];
    // Clears text areas 
    lapsElement.disabled = false;
    lapsElement.value = " ";
    amountElement.disabled = false;
    amountElement.value = '';
    document.getElementById("bethorse").disabled = false;
    // resets horse position to same as when the window was loaded
    var horse = document.getElementsByClassName('horse');
    for (var i = 0; i < HORSECOUNT; i++) {
        horse[i].style.left = STARTLEFT[i] + 'px';
        horse[i].style.top = STARTTOP[i] + 'px';
        horse[i].className = "horse standRight";
    }
    lapsElement = 0;
    amountElement = 0;
    nearFinish = false;
    selection = 0;
    bet = 0;
    startButton.removeEventListener('click', resetPosition);
    myLoadEvent();
}
//checks betting sum and funds to carry on betting
function betting() {

    var e = document.getElementById("bethorse");
    selection = e.value;
    amountElement = document.getElementById("amount");
    bet = amountElement.value;   
    // checks funds
    if (funds === 0) {
        alert("Sell your kidney\n if you want to play more!!");
    // isNaN(bet) checks bet value if its number or a string 
    } else if (isNaN(bet) || bet <=0 || bet > funds) {
        alert("Please enter betting amount\nit can't be 0 or more than you have");
        amountElement.style.backgroundColor = "Red";
        
    } else {
        amountElement.style.backgroundColor = "White";
        amountElement.disabled = true;
        funds = funds - bet;
        document.getElementById("funds").innerHTML = funds;
        //Sets two intervals to start race    
        speedInterval = setInterval(startSpeed, 350);
        interval = setInterval(move, 15);
        }
}

function start() {
    //Checks input in laps textbox and disables dropdown list
    lapsElement = document.getElementById("laps");
    laps = lapsElement.value;
    if (laps > 0 && laps <= 10) {
        lapsElement.style.backgroundColor = "WHITE";
        lapsElement.disabled = true;
        document.getElementById("bethorse").disabled = true;
        betting();
    } else {
        alert("Please enter valid number of laps!!! \nMaximum value is: 10 \nMinimum: 1");
        lapsElement.style.backgroundColor = "Red";
        // resetPosition();
    }
}

function oddsDisplayed() {
    let sel = document.querySelectorAll("option");
    for (var i = 0; i < sel.length; i++) {
        sel[i].innerHTML = horseName[i] + "  odd is: " + odd[i];
    }
}

function myLoadEvent() {
    //updates dropdown selection with odds for each horse
    oddsDisplayed();
    //gets starting positions for each horse
    let horse = document.getElementsByClassName('horse');
    for (var i = 0; i < HORSECOUNT; i++) {
        STARTLEFT[i] = horse[i].offsetLeft;
        STARTTOP[i] = horse[i].offsetTop;
        horse[i].className = "horse standRight";
    }
    var startButton = document.querySelector('#start');
    if (scoreBoard.length === 0) {
        startButton.style.cursor = "pointer";
    }
    startButton.addEventListener('click', start);
}
document.addEventListener('DOMContentLoaded', myLoadEvent);