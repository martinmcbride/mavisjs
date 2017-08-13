/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * plot.js Plot a  line. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Draw a line on the given axes.
  *
  ****/
  
mavis.Line = function(_axes, _params) {
    this.axes = _axes;
    mavis.Line.SEGMENT = 0;
    mavis.Line.RAY = 1;
    mavis.Line.LINE = 2;
    
    this.start = new mavis.Vector(0, 0);
    this.end = new mavis.Vector(1, 1);
    this.angle = 0;
    this.length = 1;
    this.type = mavis.Line.LINE;
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.lineDash = [];
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];

}

mavis.Line.prototype.draw = function(ctx) {
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.setLineDash(this.lineDash);
    ctx.strokeStyle = this.strokeStyle;
    var p1 = this.axes.toPixel(this.start);
    var p2 = this.axes.toPixel(this.end);
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
}
    
mavis.Line.prototype.getUnit = function() {
	return mavis.line_unit(this.start, this.end);
}
    
mavis.Line.prototype.getUnitPerp = function() {
	return mavis.line_perp(this.start, this.end);
}
    
