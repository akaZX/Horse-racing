
var scoreBoard =[];
var interval = 0;
var element;
var positionLeft = 0;
var positionTop = 0;

var nearFinish = false;

// array for different corner angles
/*var turningCorner1 = [];
turningCorner1[0] = 0.06;
turningCorner1[1] = 0.04;
turningCorner1[2] = 0.02;
turningCorner1[3] = 0.00;*/

var turningCorner1 = [];
turningCorner1[0] = 0.045;
turningCorner1[1] = 0.03;
turningCorner1[2] = 0.015;
turningCorner1[3] = 0.00;




//horses movement
function moveRight(){    

    var startButton = document.querySelector('#start');
    startButton.removeEventListener('click', start);
    startButton.style.color = "Red";
    startButton.style.cursor = "not-allowed";
    
     var horse = document.getElementsByClassName('horse')
    
    
    for (var i = 0; i < horse.length; i++) {
        var randomSpeed = Math.floor(Math.random()*7);        
        positionTop = horse[i].offsetTop;
		positionLeft = horse[i].offsetLeft;       
        
        //moves horses right
        if(positionTop > innerHeight * (0.72 - turningCorner1[i]) && positionLeft < innerWidth*(0.75 + turningCorner1[i]) && positionLeft > innerWidth*0.05){
            horse[i].className = "horse runRight"; 
            horse[i].style.left = positionLeft + randomSpeed  +'px';         
        }  

        //moves horses up          
        else if ( positionTop > innerHeight *(0.07 + turningCorner1[3-i]) && positionLeft >= innerWidth*(0.75 + turningCorner1[i]) ){
            horse[i].className = "horse runUp"; 
            horse[i].style.top = positionTop - randomSpeed +'px'; }

        //moves horses left
        if(positionTop < innerHeight*(0.07 + turningCorner1[3-i]) &&  positionLeft >= innerWidth*(0.12-turningCorner1[3-i])){
            horse[i].className = "horse runLeft"; 
            horse[i].style.left = positionLeft - randomSpeed +'px'; }

        //moves horse down   
        else if ( positionLeft <= innerWidth*(0.14-turningCorner1[3-i]) && positionTop < innerHeight * (0.74 - turningCorner1[i]) ){
            horse[i].className = "horse runDown"; 
            horse[i].style.top = positionTop + randomSpeed +'px'; 
            nearFinish=true;
        }
        //final movement to right
        else if( nearFinish == true && positionTop > innerHeight * (0.72 - turningCorner1[i]) && positionLeft < innerWidth*(0.75 + turningCorner1[i]) && positionLeft > innerWidth*0.05){
            nearFinish = true;         
            horse[i].className = "horse runRight"; 
            horse[i].style.left = positionLeft + randomSpeed  +'px'; 

            //finds start line
            var finishLine = document.querySelector('#startline');
            var finish = finishLine.offsetLeft + 120;

            //checks horse position according to set finish position
            if (positionLeft >= finish ){
                horse[i].style.left = finish;
                horse[i].style.left = positionLeft + 0 +'px'; 
                horse[i].className = "horse standRight";

                //adds elements to scoreboard array it is added by sequence who reached finish position first 
                var adding = winners(scoreBoard, i);
                
                if(adding == false){
                    scoreBoard.push(i)
                }
            }
            //stops timer and function if array length is equals to 4
            if(scoreBoard.length == 4){
                winnerTable();
                clearInterval(interval);
            }
        }
                    
    }            
}




// check score board array for duplication
function winners(array, horseNumber){    
        var check=false;
        for (var i = 0; i< array.length ; i++){
            if (array[i] == horseNumber){
               check = true;
                
            }
        }
          return check; 
    }

function winnerTable(){
    

}






function start(){          
        interval = setInterval(moveRight, 10);
        
       
    }
   

    


function myLoadEvent() {
    var startButton = document.querySelector('div #start');
    startButton.addEventListener('click', start);
   }

   document.addEventListener('DOMContentLoaded', myLoadEvent);