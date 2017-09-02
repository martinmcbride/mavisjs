/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * plot.js Plot an xy function. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Draw an XY plot on the given axes.
  *
  ****/
  
mavis.XYPlot = function(_axes, _fn, _params) {
    this.axes = _axes;
    this.fn = _fn;
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.XYPlot.prototype.recalc = function(ctx) {
}

mavis.XYPlot.prototype.singularity = function(y1, y2) {
	var s = this.axes.yAxis.start;
	var e = this.axes.yAxis.start+this.axes.yAxis.range;
	if (y1<s && y2>e) {
		return true;
	} else if (y2<s && y1>e) {
		return true;
	} else {
		return false;
	}
}

mavis.XYPlot.prototype.draw = function(ctx) {
	var y_old;
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    for (var i = this.axes.xAxis.pstart; i < this.axes.xAxis.pstart + this.axes.xAxis.prange; i++){
        var x = this.axes.toVal(new mavis.Vector(i, 0)).x;
        var y = this.fn(x);
        var j = this.axes.toPixel(new mavis.Vector(0, y)).y;
        if (i==this.axes.xAxis.spstart) {
            ctx.moveTo(i, j);
		}
        else if (this.singularity(y, y_old)) {
			if (j<0)
				ctx.moveTo(i, -1);
			else
				ctx.moveTo(i, 100000);
        } else {
            ctx.lineTo(i, j);
		}
		y_old = y;
    }
    ctx.stroke();
    ctx.restore();
}
    
/****
  *
  * Draw a parametric plot on the given axes.
  *
  ****/
  
mavis.ParamPlot = function(_axes, _fnx, _fny, _params) {
    this.axes = _axes;
    this.fnx = _fnx;
    this.fny = _fny;
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	this.startT = 0;
	this.endT = 1;
	this.stepT = 0.01;
	for (var key in _params) this[key] = _params[key];
}

mavis.ParamPlot.prototype.recalc = function(ctx) {
}

mavis.ParamPlot.prototype.singularity = function(y1, y2) {
	var s = this.axes.yAxis.start;
	var e = this.axes.yAxis.start+this.axes.yAxis.range;
	if (y1<s && y2>e) {
		return true;
	} else if (y2<s && y1>e) {
		return true;
	} else {
		return false;
	}
}

mavis.ParamPlot.prototype.draw = function(ctx) {
	var start = true;
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    for (var t = this.startT; t < this.endT; t+=this.stepT){
        var x = this.fnx(t);
        var y = this.fny(t);
        var p = this.axes.toPixel(new mavis.Vector(x, y));
        if (start) {
            ctx.moveTo(p.x, p.y);
			start = false;
        } else {
            ctx.lineTo(p.x, p.y);
		}
    }
    ctx.stroke();
    ctx.restore();
}
    
