/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * tick.js Draw ticks on a line. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Draw ticks a line
  *
  ****/
  
mavis.Tick = function(_axes, _params) {
    this.axes = _axes;
    this.start = new mavis.Vector(0, 0);
    this.end = new mavis.Vector(1, 1);
	this.count = 1; //Number of ticks
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.Tick.prototype.draw = function(ctx) {
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
	
	//Find the mid point of the line
    var p1 = this.axes.toPixel(this.start);
    var p2 = this.axes.toPixel(this.end);
	var pmid = new mavis.Vector((p1.x+p2.x)/2, (p1.y+p2.y)/2);
	
	//Find the unit vector in the direction of the line
	var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
	var vector = new mavis.Vector((p1.x-p2.x)/length, (p1.y-p2.y)/length);
	var pvector = new mavis.Vector(vector.y, -vector.x);
	
	if (this.count==1) {
		this.drawTick(ctx, pmid, pvector);
	}
	else if (this.count==2) {
		this.drawTick(ctx, new mavis.Vector(pmid.x - vector.x*this.lineWidth, pmid.y - vector.y*this.lineWidth), pvector);
		this.drawTick(ctx, new mavis.Vector(pmid.x + vector.x*this.lineWidth, pmid.y + vector.y*this.lineWidth), pvector);
	} else {
		this.drawTick(ctx, new mavis.Vector(pmid.x - vector.x*this.lineWidth*2, pmid.y - vector.y*this.lineWidth*2), pvector);
		this.drawTick(ctx, pmid, pvector);
		this.drawTick(ctx, new mavis.Vector(pmid.x + vector.x*this.lineWidth*2, pmid.y + vector.y*this.lineWidth*2), pvector);
	}
		
	
    ctx.restore();
}
    
mavis.Tick.prototype.drawTick = function(ctx, pt, vector) {
	ctx.beginPath();
	ctx.moveTo(pt.x+vector.x*this.lineWidth*3, pt.y+vector.y*this.lineWidth*3);
	ctx.lineTo(pt.x-vector.x*this.lineWidth*3, pt.y-vector.y*this.lineWidth*3);
	ctx.stroke();
}