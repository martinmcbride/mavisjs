/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * axes.js drawing graph axes. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

/****
 * Axis
 *
 * Contains the start, range and tick frequency of an axis.
 *
 ****/
 
mavis.Axis = function(_params={}) {
	this.start = 0;		//Start value
	this.range = 1;		//Range of values
	this.pstart = 0;	//Start pixel
	this.prange = 100;	//Pixel range
	this.div = 1;		//Spacing of divisions
	for (var key in _params) this[key] = _params[key];

    this.divs = []; //List of tick positions, in pixels relative to start of axis
	this.setDivs();
 }
  
//Set the divs array. Call after the axes are set.
mavis.Axis.prototype.setDivs = function() {
    this.divs = [];
    n = Math.ceil(this.start/this.div)*this.div;
    while (n <= this.start + this.range) {
        this.divs.push(n);
        n += this.div;
    }
}

//Convert between values and pixels
mavis.Axis.prototype.toPixel = function(val) {
    return (val - this.start)*this.prange/this.range + this.pstart;
}
mavis.Axis.prototype.toVal = function(pixel) {
    return (pixel-this.pstart)*this.range/this.prange + this.start;
}

/****
 * Axes
 *
 * Defines the size and appearance of the axes.
 *
 ****/
 
 mavis.Axes = function(_xAxis, _yAxis, _params) {
    this.xAxis = _xAxis;
    this.yAxis = _yAxis;
	
    this.font = "20px Arial";
    this.strokeStyle = "black";
    this.fillStyle = "white";
    this.lineWidth = 3;
    this.lineDash = [];
    this.divStrokeStyle = "#a0a0ff";
    this.divLineWidth = 2;
    this.strokeAlpha = 1;
    this.fillAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}
 
//Convert between values and pixels.
//val and pixel are Points.
mavis.Axes.prototype.toPixel = function(val) {
    return new mavis.Point(this.xAxis.toPixel(val.x), this.yAxis.prange - this.yAxis.toPixel(val.y));
}
mavis.Axes.prototype.toVal = function(pixel) {
    return new mavis.Point(this.xAxis.toVal(pixel.x), this.yAxis.toVal(this.yAxis.prange - pixel.y));
}

//Convert a length to pixels
mavis.Axes.prototype.toPixelLength = function(val) {
	return this.xAxis.toPixel(val) - this.xAxis.toPixel(0);
}

mavis.Axes.prototype.draw = function(ctx) {
    this.xAxis.setDivs();
    this.yAxis.setDivs();
    if (this.fillStyle) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.rect(this.xAxis.pstart, this.yAxis.pstart, this.xAxis.prange, this.yAxis.prange);
        ctx.fill()
    }
    //Clip everything to the graph area
    ctx.save();
    this.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    
    //Draw the divisions
    if (this.divStrokeStyle) {
        ctx.beginPath();
        ctx.lineWidth = this.divLineWidth;
		ctx.setLineDash(this.lineDash);
        ctx.strokeStyle = this.divStrokeStyle;
        for (var i = 0; i < this.xAxis.divs.length; i++) {
            n = this.toPixel(new mavis.Point(this.xAxis.divs[i], 0)).x;
            ctx.moveTo(n, this.yAxis.pstart);
            ctx.lineTo(n, this.yAxis.pstart+this.yAxis.prange);
        }
        for (var i = 0; i < this.yAxis.divs.length; i++) {
            n = this.toPixel(new mavis.Point(0, this.yAxis.divs[i])).y;
            ctx.moveTo(this.xAxis.pstart, n);
            ctx.lineTo(this.xAxis.pstart+this.xAxis.prange, n);
        }
        ctx.stroke();
    }

    //Draw the axes
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    var origin = this.toPixel(new mavis.Point(0, 0));
    if (origin.x >= this.xAxis.pstart && origin.x < this.xAxis.pstart + this.xAxis.prange) {
        ctx.moveTo(origin.x, this.yAxis.pstart);
        ctx.lineTo(origin.x, this.yAxis.pstart+this.yAxis.prange);
    }
    if (origin.y >= this.yAxis.pstart && origin.y < this.yAxis.pstart + this.yAxis.prange) {
        ctx.moveTo(this.xAxis.pstart, origin.y);
        ctx.lineTo(this.xAxis.pstart+this.xAxis.prange, origin.y);
    }
    ctx.stroke();
    
    //Draw the labels
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.strokeStyle;
    ctx.font = this.font;
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    var dp = mavis.countDecimals(this.xAxis.div);
    for (var i = 0; i < this.xAxis.divs.length; i++) {
        if (this.xAxis.divs[i]) {
            var pos = this.toPixel(new mavis.Point(this.xAxis.divs[i], 0));
            if (pos.x + 10 < this.xAxis.pstart + this.xAxis.prange && pos.x - 10 > this.xAxis.pstart) {
                ctx.fillText(this.xAxis.divs[i].toFixed(dp), pos.x, pos.y + 3);
                ctx.moveTo(pos.x, pos.y);
                ctx.lineTo(pos.x, pos.y + 5);
            }
        }
    }
    
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    var dp = mavis.countDecimals(this.yAxis.div);
    for (var i = 0; i < this.yAxis.divs.length; i++) {
        if (this.yAxis.divs[i]) {
            var pos = this.toPixel(new mavis.Point(0, this.yAxis.divs[i]));
            if (pos.y + 10 < this.yAxis.pstart + this.yAxis.prange && pos.y - 10 > this.yAxis.pstart) {
                ctx.fillText(this.yAxis.divs[i].toFixed(dp), pos.x-8, pos.y);
                ctx.moveTo(pos.x, pos.y);
                ctx.lineTo(pos.x-5, pos.y);
            }
        }
    }
    
    //Origin marker
    var radius = 8;
    ctx.moveTo(origin.x + radius, origin.y);
    ctx.arc(origin.x, origin.y, radius, 0, 2*Math.PI, false);
    ctx.stroke();

    ctx.restore()
}

mavis.Axes.prototype.applyClip = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.xAxis.pstart, this.yAxis.pstart, this.xAxis.prange, this.yAxis.prange);
    ctx.clip();
}

