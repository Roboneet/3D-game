function Shaker(r, A=0.3, phi=0, omega=1){
	this.A = A;
	this.phi = phi;
	this.omega = omega;
	this.d = -A/r;
	this.t = 0;
	this.inc = 2*PI/r;
	this.calculate();
}

Shaker.prototype.value = function(){
	return this.val;
}	

Shaker.prototype.update = function(){
	this.A += this.d;
	// console.log(this.A);
	this.t += this.inc;
	this.calculate();
}

Shaker.prototype.calculate = function(){
	var {A, phi, omega, t} = this;
	this.val = A*sin(omega*t + phi);
}

Shaker.prototype.done = function(){
	return this.t >= 2*PI;
}