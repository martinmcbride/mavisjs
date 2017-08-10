/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * text.js draw text 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

/****
 *
 * Text
 *
 ****/
 
mavis.Text = function(_axes, _params) {
    this.axes = _axes;
	this.position = new mavis.Point(0, 0);
	this.align = "center";
	this.valign = "middle";
	this.font = "40pt Verdana, Geneva, sans-serif";
	this.content = "text";
	this.offset = null;
	this.fillStyle = "black";
    this.fillAlpha = 1;
	for (var key in _params) this[key] = _params[key];
 }
  
mavis.Text.prototype.draw = function(ctx) {
    //Clip everything to the graph area
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.fillAlpha;
    
	var p = this.axes.toPixel(this.position);
    ctx.font = this.font;
	ctx.textAlign = this.align;
	ctx.textBaseline = this.valign;
	
	if (this.offset){
		p = this.offset.offset(p);
	}

    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fillText(this.content, p.x, p.y);
    }

    ctx.restore()
}

/**
 * Offset text in an angle.
 * Place text 
 */
 
mavis.TextOffsetAngle = function(_axes, _p1, _p2, _dist) {
	this.axes = _axes;
	this.p1 = _p1;
	this.p2 = _p2;
	this.dist = _dist;
}
	
mavis.TextOffsetAngle.prototype.offset = function(p) {
	var a = this.axes.toPixel(this.p1);
	var b = this.axes.toPixel(this.p2);
    var ang1 = Math.atan2(a.y-p.y, a.x-p.x);
    var ang2 = Math.atan2(b.y-p.y, b.x-p.x);
	ang1 = (ang1+ang2)/2;
	return new mavis.Point(p.x + this.dist*Math.cos(ang1), p.y + this.dist*Math.sin(ang1));
}
	
