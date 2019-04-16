/***
	change player input on key down
***/
function doKeyDown(event){
   var keynum;

   if(window.event){ //Browser is IE
      keynum = event.keyCode;
   }
   else{
      keynum = event.which;
   }

   if(keynum == 37){
      playerInput.left = 1;
   }
   else if(keynum == 38){
      playerInput.up = 1;
   }
   else if(keynum == 39){
      playerInput.right = 1;
   }
   else if(keynum == 40){
      playerInput.down = 1;
   }
}


/***
	change player input on key up
***/
function doKeyUp(event){
   var keynum;
   
   if(window.event){ //Browser is IE
      keynum = event.keyCode;
   }
   else{
      keynum = event.which;
   }

   if(keynum == 37){
      playerInput.left = 0;
   }
   else if(keynum == 38){
      playerInput.up = 0;
   }
   else if(keynum == 39){
      playerInput.right = 0;
   }
   else if(keynum == 40){
      playerInput.down = 0;
   }
}
