/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * polygon.js Draw polygon
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Draw a polygon
  *
  ****/
  
mavis.Polygon = function(_axes, _params) {
    this.axes = _axes;
    this.strokeStyle = "black";
    this.lineWidth = 4;
	this.fillStyle = "white";
    this.strokeAlpha = 1;
    this.fillAlpha = 1;
	this.lineJoin = 'bevel';
    this.closed = true;
	for (var key in _params) this[key] = _params[key];
    
    this.points = []; //Array of n points
}

mavis.Polygon.prototype.createRegular = function(n, radius=1, cx=0, cy=0, angle=0) {
	var delta = 2*Math.PI/n;
	var a = -Math.PI/2 + delta/2 + angle;
	this.points = [];
	for (var i = 0; i < n; i++) {
		this.points.push(new mavis.Point(cx+radius*Math.cos(a), cy+radius*Math.sin(a)));
		a += delta;
	}
}

/*
 * Create a shape defined by the points, but offset by offset(x, y)
 */
mavis.Polygon.prototype.offsetPoints = function(offset, points) {
	this.points = [];
	for (p in points) {
		p = mavis.p_add(points[p], offset);
		this.points.push(p);
	}
}


mavis.Polygon.prototype.draw = function(ctx) {
    if (this.points.length < 2) {
        return;
    }
    //Clip everything to the graph area
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.beginPath();
    var p;
    for (var i = 0; i < this.points.length; i++ ) {
        p = this.axes.toPixel(this.points[i]);
        if (!i) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);        
        }
    }
    if (this.closed) {
        ctx.closePath();
    }
    if (this.fillStyle) {
		ctx.globalAlpha = this.fillAlpha;
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
    if (this.strokeStyle) {
		ctx.globalAlpha = this.strokeAlpha;
        ctx.lineWidth = this.lineWidth;
        ctx.lineJoin = this.lineJoin;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }

    ctx.restore()
}
    
