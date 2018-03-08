
var interval = 0;
var element;
var positionLeft = 0;
var positionTop = 0;

var nearFinish = false;


var randomTurn = [];
randomTurn[0] = 0.07;
randomTurn[1] = 0.05;
randomTurn[2] = 0.02;
randomTurn[3] = 0.00;


//horses movement
function moveRight(){    

    var startButton = document.querySelector('#start');
    startButton.removeEventListener('click', start);
    startButton.style.color = "Red";
    startButton.style.cursor = "not-allowed";
    
     var horse = document.getElementsByClassName('horse')
    
    
    for (var i = 0; i < horse.length; i++) {
        var randomSpeed = Math.floor(Math.random()*3);        
        positionTop = horse[i].offsetTop;
		positionLeft = horse[i].offsetLeft;       
        
        //moves horses right
        if(nearFinish == false && positionTop > innerHeight * (0.74 - randomTurn[i]) && positionLeft < innerWidth*(0.74 + randomTurn[i]) && positionLeft > innerWidth*0.05){
            horse[i].className = "horse runRight"; 
            horse[i].style.left = positionLeft + randomSpeed  +'px';         
        }  

        //moves horses up          
        else if ( nearFinish == false && positionTop > innerHeight *(0.07 + randomTurn[i]) && positionLeft >= innerWidth*(0.74 + randomTurn[i]) ){
            horse[i].className = "horse runUp"; 
            horse[i].style.top = positionTop - randomSpeed +'px'; }

        //moves horses left
        if( nearFinish == false && positionTop < innerHeight*(0.07 + randomTurn[i]) &&  positionLeft >= innerWidth*(0.12-randomTurn[i])){
            horse[i].className = "horse runLeft"; 
            horse[i].style.left = positionLeft - randomSpeed +'px'; }

        //moves horse down   
        else if (positionLeft <= innerWidth*(0.16-randomTurn[i]) && positionTop < innerHeight * (0.74 - randomTurn[i]) ){
            horse[i].className = "horse runDown"; 
            horse[i].style.top = positionTop + randomSpeed +'px'; 
            //nearFinish = true;
        }

        /*else if( nearFinish == true && positionTop > innerHeight * (0.74 - randomTurn[i]) && positionLeft < innerWidth*(0.74 + randomTurn[i]) && positionLeft > innerWidth*0.05){
                      
            horse[i].className = "horse runRight"; 
            horse[i].style.left = positionLeft + randomSpeed  +'px'; 

            var finishLine = document.querySelector('#startline');
            var finish = finishLine.offsetLeft + 70;
            
            if (positionLeft == finish ){
                horse[i].style.left = finish;
                horse[i].className = "horse standRight";
            }*/
        }
                    
                
        }

    



function start(){          
        interval = setInterval(moveRight, 1);
        
       
    }
   

    


function myLoadEvent() {
    var startButton = document.querySelector('div #start');
    startButton.addEventListener('click', start);
   }

   document.addEventListener('DOMContentLoaded', myLoadEvent);