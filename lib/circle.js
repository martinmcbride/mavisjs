/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * circle.js draw circles, arcs, sectors and segments 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

/****
 *
 * Circle
 *
 ****/
 
mavis.Circle = function(_axes, _params) {
    this.axes = _axes;
	this.centre = new mavis.Point(0, 0);		//Centre
	this.radius = 1;		 //Radius
	this.startAngle = 0;	 //Start of arc
	this.endAngle = 2*Math.PI;	//End of arc
	this.direction = false;
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.lineDash = [];
	this.fillStyle = "white";
    this.strokeAlpha = 1;
    this.fillAlpha = 1;
	for (var key in _params) this[key] = _params[key];
 }
  
mavis.Circle.prototype.draw = function(ctx) {
    //Clip everything to the graph area
    ctx.save();
    this.axes.applyClip(ctx);
    
	var p = this.axes.toPixel(this.centre);
	var r = this.axes.toPixelLength(this.radius);
    if (this.fillStyle) {
		ctx.globalAlpha = this.fillAlpha;
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
		ctx.arc(p.x, p.y, r, -this.startAngle, -this.endAngle, !this.direction);
        ctx.fill()
    }
    if (this.strokeStyle) {
		ctx.globalAlpha = this.strokeAlpha;
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
		ctx.setLineDash(this.lineDash);
		ctx.arc(p.x, p.y, r, -this.startAngle, -this.endAngle, !this.direction);
        ctx.stroke();
    }

    ctx.restore()
}
