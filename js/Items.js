// prototype class
/*****
	General Item
****/
function Item(){}

Item.prototype.hook = function(f){
	this.subjects.push(f);
}

Item.prototype.notify = function(){
	this.subjects.forEach(f => f(this));
}


/*****
	Collectable Item
****/
// Collectable object constructor
function Collectable(x, y, index, url, loader, score, type){
	this.x = x;
	this.y = y;
	this.id = null;
	this.index = index;
	this.url = url;
	this.collectableMaterial = new THREE.MeshStandardMaterial( {map: loader.load(url)});
	this.score = score;
	this.collected = false;
	this.subjects = [];
	this.type = type; // uses itemTypes[type]
}

// new object with all elements of Item.prototype
Collectable.prototype = Object.assign({}, Item.prototype);

Collectable.prototype.action = function() {
	this.collected = true;
	this.notify();
};


/*****
	Obstacle Item
****/
function Obstacle(x, y, index, url, loader, score, type){
	this.x = x;
	this.y = y;
	this.id = null;
	this.index = index;
	this.url = url;
	this.obstacleMaterial = new THREE.MeshStandardMaterial({ color: "#FFF", transparent: true, alphaTest: 0.0 });
	var alphaMap = new THREE.TextureLoader().load(url);
	this.obstacleMaterial.alphaMap = alphaMap;
	this.obstacleMaterial.alphaMap.magFilter = THREE.NearestFilter;
	this.obstacleMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
	this.obstacleMaterial.alphaMap.repeat.y = 1;
	this.score = score;
	this.collected = false;
	this.subjects = [];
	this.type = type; // uses obstacleTypes[type]
}

Obstacle.prototype = Object.assign({}, Collectable.prototype);


/*****
	Potion Item
****/
function Potion(x, y, index, material, geometry, type){
	this.x = x;
	this.y = y;
	this.id = null;
	this.index = index;
	this.material = material;
	this.geometry = geometry;
	this.collected = false;
	this.subjects = [];
	this.type = type; // uses itemTypes[type]
}

// new object with all elements of Item.prototype
Potion.prototype = Object.assign({}, Collectable.prototype);
