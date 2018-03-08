
var interval = 0;
var element;
var positionLeft = 0;
var positionTop = 0;


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
        
      
        if(positionTop > innerHeight * 0.65){
            horse[i].className = "horse runRight"; 
            horse[i].style.left = positionLeft + randomSpeed +'px'; }       
        
        

                    
            
           }       
    
}

    



function start(){          
        interval = setInterval(moveRight, 10);
        
       
    }
   

    


function myLoadEvent() {
    var startButton = document.querySelector('div #start');
    startButton.addEventListener('click', start);
   }

   document.addEventListener('DOMContentLoaded', myLoadEvent);