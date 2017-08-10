/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * arrow.js Draw arrows (parallele or vector) on a line. 
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
  
mavis.Arrow = function(_axes, _params) {
    this.axes = _axes;
    this.start = new mavis.Point(0, 0);
    this.end = new mavis.Point(1, 1);
	this.count = 1; //Number of ticks
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.Arrow.prototype.draw = function(ctx) {
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
	
	//Find the mid point of the line
    var p1 = this.axes.toPixel(this.start);
    var p2 = this.axes.toPixel(this.end);
	var pmid = new mavis.Point((p1.x+p2.x)/2, (p1.y+p2.y)/2);
	
	//Find the unit vector in the direction of the line
	var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
	var vector = new mavis.Point((p1.x-p2.x)/length, (p1.y-p2.y)/length);
	var pvector = new mavis.Point(vector.y, -vector.x);
	
	if (this.count==1) {
		this.drawArrow(ctx, pmid, vector, pvector);
	}
	else if (this.count==2) {
		this.drawArrow(ctx, new mavis.Point(pmid.x - vector.x*this.lineWidth*1.5, pmid.y - vector.y*this.lineWidth*1.5), vector, pvector);
		this.drawArrow(ctx, new mavis.Point(pmid.x + vector.x*this.lineWidth*1.5, pmid.y + vector.y*this.lineWidth*1.5), vector, pvector);
	} else {
		this.drawArrow(ctx, new mavis.Point(pmid.x - vector.x*this.lineWidth*3, pmid.y - vector.y*this.lineWidth*3), vector, pvector);
		this.drawArrow(ctx, pmid, vector, pvector);
		this.drawArrow(ctx, new mavis.Point(pmid.x + vector.x*this.lineWidth*3, pmid.y + vector.y*this.lineWidth*3), vector, pvector);
	}
		
	
    ctx.restore();
}
    
mavis.Arrow.prototype.drawArrow = function(ctx, pt, v, pv) {
	ctx.beginPath();
	ctx.moveTo(pt.x+(3*v.x +3*pv.x)*this.lineWidth, pt.y+(3*v.y +3*pv.y)*this.lineWidth);
	ctx.lineTo(pt.x, pt.y);
	ctx.lineTo(pt.x+(3*v.x -3*pv.x)*this.lineWidth, pt.y+(3*v.y -3*pv.y)*this.lineWidth);
	ctx.stroke();
}