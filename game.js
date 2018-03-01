


//controll buttons
function keyPressed(event){          
           
    if(event.keyCode == 37){
        left = true;
    }
    if(event.keyCode == 38){
        up = true;
    }
    if (event.keyCode == 39){
        right = true;
    }
    if(event.keyCode == 40){
        down = true;
    }
   }

   function keyReleased(event){
       if(event.keyCode == 37){
       left = false;
       }

       if(event.keyCode == 38){
        up = false;
        }
        if (event.keyCode == 39){
            right = false;
        }
        if (event.keyCode == 40){
            down = false;
        }
   }