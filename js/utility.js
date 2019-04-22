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
   }else if(keynum == 13){
      playerInput.enter = 1;
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
   }else if(keynum == 13){
      playerInput.enter = 0;
   }
}

function addClass(ele, name){
   if(ele.className.match(name) == null)
      ele.className += (" " + name);
}
function removeClass(ele, name){
   var c = ele.className
   if(c.match(name) != null)
      ele.className = c.replace(name, "");
}

function createDoor(scene, x=-0.3, y=0, z=-0.465){
   var size = (x) => [x, 2*x];
   var doorGeometry = new THREE.PlaneGeometry(...size(0.25),0.1);
   // scene.add(doorGeometry);

   const loader = new THREE.TextureLoader();
   var doorMaterial = new THREE.MeshPhongMaterial({map: loader.load('http://textures101.com/textures/Doors/Wooden_Doors/Single_Old/2011/6/13/tn1_doormossy_fwhqk.jpg'),});
   var door = new THREE.Mesh(doorGeometry,doorMaterial);
   door.position.z=z;
   door.position.x=x;
   door.position.y=y;
   scene.add(door);
}

function displayMessage(str, ...options){
   var container = div();
   container.className = "box-cont";
   var box = div();
   box.className = "box";
   
   var optionDiv = div();
   optionDiv.className = "options";
   options.forEach(([name, handler]) => {
      var a = make('a');
      a.className = "option";
      // var d = div();
      a.innerText = name;
      a.addEventListener('click', () => {
         container.className += " fade-out";
         setTimeout( () => {
            container.remove();
            handler();
         }, 800);
      });
      // a.appendChild(d);
      optionDiv.appendChild(a);
   })
   

   var msgDiv = div();
   msgDiv.className = "message";
   msgDiv.innerHTML = '<p>' + str + '</p>';
   box.appendChild(msgDiv);
   box.appendChild(optionDiv);
   container.appendChild(box);
   document.body.appendChild(container);
   if(optionDiv.children.length != 0)
      optionDiv.children[0].focus();
}

function bind(o, f){
   return o[f].bind(o);
}