/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * measure.js Draw measurement arrows on a line. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Draw arrows a line
  *
  ****/
  
mavis.Measure = function(_axes, _params) {
    this.axes = _axes;
    this.start = new mavis.Vector(0, 0);
    this.end = new mavis.Vector(1, 1);
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.Measure.prototype.draw = function(ctx) {
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
	
    var p1 = this.axes.toPixel(this.start);
    var p2 = this.axes.toPixel(this.end);
	
	//Find the unit vector in the direction of the line
	var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
	var vector = new mavis.Vector((p1.x-p2.x)/length, (p1.y-p2.y)/length);
	var pvector = new mavis.Vector(vector.y, -vector.x);
	
	this.drawMeasure(ctx, p1, vector, pvector);
	this.drawMeasure(ctx, p2, vector, pvector);
    ctx.restore();
}
    
mavis.Measure.prototype.drawMeasure = function(ctx, pt, v, pv) {
	ctx.beginPath();
	ctx.moveTo(pt.x + 7*pv.x*this.lineWidth, pt.y + 7*pv.y*this.lineWidth);
	ctx.lineTo(pt.x + 1*pv.x*this.lineWidth, pt.y + 1*pv.y*this.lineWidth);
	ctx.stroke();
}