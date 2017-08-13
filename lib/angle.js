/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * angle.js Draw angle markers between lines. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Draw angles.
  *
  * For points A, B, C the angles if at B. The marker is draw anticlockwise from
  * AB to BC.
  *
  ****/
  
mavis.Angle = function(_axes, _params) {
    this.axes = _axes;
    this.a = new mavis.Vector(1, 0);
    this.b = new mavis.Vector(0, 0);
    this.c = new mavis.Vector(0, 1);
	this.radius = 20;
	this.rightAngle = false;
	this.noReflex = false;  //Force angle to switch sides to be < 180
	this.count = 1; //Number of marks
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.Angle.prototype.draw = function(ctx) {
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
	
	//Find the angles
    var p1 = this.axes.toPixel(this.a);
    var p2 = this.axes.toPixel(this.b);
    var p3 = this.axes.toPixel(this.c);
    var ang1 = Math.atan2(p1.y-p2.y, p1.x-p2.x);
    var ang2 = Math.atan2(p3.y-p2.y, p3.x-p2.x);
	
	if (((ang1-ang2 < 0 && ang1-ang2 > -Math.PI) || ang1-ang2>Math.PI) && this.noReflex) {
		var temp = ang1;
		ang1 = ang2;
		ang2 = temp;
	}
	
	if (this.count==1) {
		this.drawAngle(ctx, p2, ang1, ang2, this.radius);
	}
	else if (this.count==2) {
		this.drawAngle(ctx, p2, ang1, ang2, this.radius-this.lineWidth);
		this.drawAngle(ctx, p2, ang1, ang2, this.radius+this.lineWidth);
	} else {
		this.drawAngle(ctx, p2, ang1, ang2, this.radius-this.lineWidth*2);
		this.drawAngle(ctx, p2, ang1, ang2, this.radius);
		this.drawAngle(ctx, p2, ang1, ang2, this.radius+this.lineWidth*2);
	}
	
    ctx.restore();
}
    
mavis.Angle.prototype.drawAngle = function(ctx, pt, ang1, ang2, radius) {
	ctx.beginPath();
	if (!this.rightAngle) {
		ctx.arc(pt.x, pt.y, radius, ang1, ang2, true);
	} else {
		v = new mavis.Vector(Math.cos(ang1), Math.sin(ang1));
		pv = new mavis.Vector(Math.cos(ang2), Math.sin(ang2));
		ctx.moveTo(pt.x + v.x*radius, pt.y + v.y*radius);
		ctx.lineTo(pt.x + (v.x + pv.x)*radius, pt.y + (v.y + pv.y)*radius);
		ctx.lineTo(pt.x + pv.x*radius, pt.y + pv.y*radius);
	}
	ctx.stroke();
}