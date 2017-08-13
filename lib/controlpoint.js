/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * controlpoint.js implement a control point, uses create.js 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

/****
 *
 * Control point
 *
 ****/
 
mavis.ControlPoint = function( _axes, _stage, _params) {
    this.stage = _stage;
    this.axes = _axes;
	this.position = new mavis.Vector(0, 0);
	this.radius = 10;
	this.fillStyle = "red";
	this.constraint = null;
	this.onMove = null;
	for (var key in _params) this[key] = _params[key];
	this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.fillStyle).drawCircle(0, 0, this.radius);
	this.stage.addChild(this.shape);
	var pos = axes.toPixel(this.position);
	this.shape.x = pos.x;
	this.shape.y = pos.y;
	this.shape.on("pressmove", this.onPressMove);
	this.shape.owner = this;
 }
  
mavis.ControlPoint.prototype.onPressMove = function(evt) {
	var cp = evt.target.owner;
	cp.position = cp.axes.toVal(new mavis.Vector(evt.stageX, evt.stageY));
	if (cp.constraint) {
		cp.position = cp.constraint.constrain(cp.position);
	}
	var pos = cp.axes.toPixel(cp.position);
	evt.target.x = pos.x;
	evt.target.y = pos.y;
	if (cp.onMove)
		cp.onMove(evt);
}

/**
 * Constrain point to integer values
 */
 
mavis.ConstrainInteger = function() {
}
	
mavis.ConstrainInteger.prototype.constrain = function(source) {
	return new mavis.Vector(Math.round(source.x), Math.round(source.y));
}
	
/**
 * Constrain point to a rectangle
 */
 
mavis.ConstrainRectangle = function(_minX, _minY, _maxX, _maxY) {
	this.minX = _minX;
	this.maxX = _maxX;
	this.minY = _minY;
	this.maxY = _maxY;
}
	
mavis.ConstrainRectangle.prototype.constrain = function(source) {
	var x = source.x;
	var y = source.y;
	if (x < this.minX)
		x = this.minX;
	else if (x > this.maxX)
		x = this.maxX;
	if (y < this.minY)
		y = this.minY;
	else if (y > this.maxY)
		y = this.maxY;
	return new mavis.Vector(x, y);
}
	
/**
 * Constrain point to a circle
 */
 
mavis.ConstrainCircle = function(_circle) {
	this.circle = circle;
}
	
mavis.ConstrainCircle.prototype.constrain = function(source) {
	var x = source.x;
	var y = source.y;
	var ang = Math.atan2(y - circle.centre.y, x - circle.centre.x);
	x = circle.centre.x + circle.radius*Math.cos(ang);
	y = circle.centre.y + circle.radius*Math.sin(ang);
	return new mavis.Vector(x, y);
}
	
