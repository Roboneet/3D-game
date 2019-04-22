
/*****
	Score Manager
****/
function ScoreManager(ele, items, target, hasPotion, potionUsed){
	// hook a notification function on the collectables
	items.forEach(m => m.hook(this.notification.bind(this)))
	this.ele = ele;
	var {aim, action}= target;
	this.aim = aim;
	this.action = action;
	this.hasPotion = hasPotion;
	this.potionUsed = potionUsed;
	addClass(this.ele, "active");
	this.update(0);
}

// notified by item when it is collected
ScoreManager.prototype.notification = function(item){
	console.log(item.score);
	if(item.score < 0 && this.hasPotion()){

		this.potionUsed();
		return;
	}
	console.log(this.hasPotion());
	this.update(this.score + item.score);
	// console.log("ScoreManager says  score is ", this.score);
	if(this.score >= this.aim){
		this.action();
	}
}

ScoreManager.prototype.update = function(n){
	this.score = n;
	$(this.ele, "p").innerText = this.score;
}

ScoreManager.prototype.dispose = function(){
	console.log("dispose score manager");
	removeClass(this.ele, "active");		
}

/*****
	Inventory Manager
****/
function Inventory(container, collectables, potions){
	this.collectables = collectables;
	this.collectedTypes = {}
	this.container = container;

	// hook a notification function on the collectables
	this.collectables.forEach(m => {
		this.collectedTypes[m.type] = false;
		m.hook(this.notification.bind(this))
	});
	potions.forEach(m => {
		m.hook(this.addPotion.bind(this));
	})

	this.panel = {};
	var scope = this;

	this.collectables.map(ele => {
		var o = scope.createDisplay(ele);
		this.panel[ele.id] = o;
		return o;
	}).forEach(ele => {
		container.appendChild(ele);
	})
	this.key = this.createKey();
	container.appendChild(this.key);

	this.hasKey = false;

	// will be called by another function.
	// so, bind this to my scope.
	this.giveKey = this.giveKey.bind(this);
	this.addPotion = this.addPotion.bind(this);
	this.usePotion = this.usePotion.bind(this);
	this.hasPotion = this.hasPotion.bind(this);

	addClass(container, "active");
	this.potion = 0;
}

Inventory.prototype.addPotion = function(){
	
	this.potion += 1;
}

Inventory.prototype.usePotion = function(){
	this.potion -= 1;
}

Inventory.prototype.hasPotion = function(){
	
	return this.potion > 0;
}

Inventory.prototype.createKey = function(){
	var keyImage = "http://realpinkaz.com/wp-content/uploads/olde-key-clip-art-at-clker-vector-clip-art-online-royalty-key-cartoon.svg";
	var d = document.createElement("div");
	d.className = "collectable key";
	d.setAttribute('data-collected', false);
	d.innerHTML = ('<div class="overlay"></div>' +
		'<div class="material"><img src="' + keyImage + '"></div>');
	return d;
}

Inventory.prototype.createDisplay = function(obj){
	var {id, url, collected, score} = obj;
	var d = document.createElement("div");
	d.className = "collectable";
	d.setAttribute('data-collected', collected);
	d.innerHTML = ('<div class="overlay"><p> +' + score + '</p></div>' +
	'<div class="material"><img src="' + url + '"></div>');
	return d;
}

// notified by collectable when it is collected
Inventory.prototype.notification = function(collectable){
	// console.log("Inventory says ", collectable, "is collected");
	this.panel[collectable.id].setAttribute('data-collected', collectable.collected);
	this.collectedTypes[collectable.type] = true;
}

Inventory.prototype.collected_all_types = function(){
	var types = this.collectedTypes;
	for(var ct in types){
		if(!types[ct])return false;
	}
	return true;
}

Inventory.prototype.giveKey = function(){
	if(this.hasKey)return;
	
	this.hasKey = true;
	this.key.setAttribute('data-collected', true);

}

Inventory.prototype.dispose = function(){
	
	removeClass(this.container, "active");
	var scope = this;
	setTimeout(() => {
		var c = Array.from(scope.container.children);
		c.forEach(e => e.remove());
	}, 1000);
}
