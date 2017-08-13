/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * point.js drawing points. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

/*****
 *
 * Draw various point styles
 *
 ****/
 
mavis.DrawCross = function(ctx, x, y, size, stroke, width, fill) {
    ctx.beginPath();
    ctx.moveTo(x - size, y - size)
    ctx.lineTo(x + size, y + size)
    ctx.moveTo(x + size, y - size)
    ctx.lineTo(x - size, y + size)
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.stroke();
    }
 }
 
mavis.DrawCircle = function(ctx, x, y, size, stroke, width, fill) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.stroke();
    }
 }
 
  /****
  *
  * Draw a point on the given axes.
  *
  ****/
  
mavis.VectorMarker = function(_axes, _params) {
    this.axes = _axes;
	this.x = 0;
	this.y = 0;
    this.pointStyle = mavis.DrawCross;
	this.size = 10;
    this.strokeStyle = "black";
    this.lineWidth = 4;
	this.fillStyle = "white";
    this.strokeAlpha = 1;
    this.fillAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.VectorMarker.prototype.draw = function(ctx) {
    ctx.save();
	var p = this.axes.toPixel(new mavis.Vector(this.x, this.y))
	this.pointStyle(ctx, p.x, p.y, this.size, this.strokeStyle, this.lineWidth, this.fillStyle);
    ctx.restore();
}
