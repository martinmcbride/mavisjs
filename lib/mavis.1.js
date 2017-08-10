/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * utils.js some common utility functions. 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

var mavis = mavis || {}; 

//Colours

mavis.BLUE = '#2340c9';
mavis.RED = '#c92323';
mavis.GREEN = '#23c926';
mavis.PURPLE = '#8a23c9';
mavis.CYAN = '#23a0c9';
mavis.ORANGE = '#c97e23';
mavis.YELLOW = '#e5e110';
mavis.GRAY = '#767676';

mavis.BLUE50 = '#909FE4';
mavis.RED50 = '#E49090';
mavis.GREEN50 = '#90E492';
mavis.PURPLE50 = '#C490E4';
mavis.CYAN50 = '#90CFE4';
mavis.ORANGE50 = '#E4BE90';
mavis.YELLOW50 = '#F2F087';
mavis.GRAY50 = '#BABABA';

//Text

mavis.SANS = "40pt Verdana, Geneva, sans-serif";
mavis.SERIF = "40pt Georgia, serif";
mavis.SERIFI = "Italic 40pt Georgia, serif";

/****
 *
 * Utilities
 *
 ****/

//Count the number of decimal places in a number (eg 0.05 has 2 dps)
 mavis.countDecimals = function(n) {
    if(Math.floor(n.valueOf()) === n.valueOf()) return 0;
    return n.toString().split(".")[1].length || 0; 
}

//2D point object
mavis.Point = function(x, y) {
    this.x = x;
    this.y = y;
}

/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * geometry.js Methods to manipulate points, lines, angles etc
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 /****
  *
  * Point functions
  *
  ****/

//Create a copy of point p  
mavis.p_copy = function(p) {
	return new mavis.Point(p.x, p.y)
}

//Add point p1 to p2, return result as a new point
mavis.p_add = function(p1, p2) {
	return new mavis.Point(p1.x + p2.x, p1.y + p2.y)
}

//Subtract point p2 from p1, return result as a new point
mavis.p_sub = function(p1, p2) {
	return new mavis.Point(p1.x - p2.x, p1.y - p2.y)
}

//Multiply point p by scalar s
mavis.p_mul = function(p, s) {
	return new mavis.Point(p.x*s, p.y*s)
}

//Interpolate between point p2 from p1, return result as a new point
mavis.p_interp = function(p1, p2, c) {
	return new mavis.Point((1-c)*p1.x + c*p2.x, (1-c)*p1.y + c*p2.y)
}


 /****
  *
  * Line functions
  *
  ****/
  
//Get line length
mavis.line_length = function(p1, p2) {
	return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
}

//Get unit vector in line p1 to p2 
mavis.line_unit = function(p1, p2) {
	var length = Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
	return new mavis.Point((p2.x - p1.x)/length, (p2.y - p1.y)/length);
}

//Get unit vector perendicular line p1 to p2 (ccw rotation) 
mavis.line_perp = function(p1, p2) {
	var length = Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
	return new mavis.Point(-(p2.y - p1.y)/length, (p2.x - p1.x)/length);
}
    
//Get line angle
mavis.line_angle = function(p1, p2) {
	return Math.atan2((p2.y-p1.y), (p2.x-p1.x));
}

/****
 *
 * Angle functions
 *
 ****/
 
 //Normalise an angle to between 0 and 2*PI
 mavis.angle_norm = function(a) {
	 while (a < 0)
		 a += Math.PI*2;
	 while (a > Math.PI*2)
		 a -= Math.PI*2;
	 return a;
 }
 
//Non-reflex version of angle a
 mavis.angle_nonreflex = function(a) {
	 a = mavis.angle_norm(a);
	 if (a > Math.PI)
		 a = 2*Math.PI - a;
	 return a;
 }
 
//Non-reflex angle of 3 points
 mavis.angle_points = function(a, b, c, nonreflex=false) {
	 var ab = mavis.line_angle(a, b);
	 var bc = mavis.line_angle(c, b);
	 var ang = mavis.angle_norm(ab - bc);
	 if (nonreflex)
		ang = mavis.angle_nonreflex(ang);
	return ang;
 }
 

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
        var x = this.axes.toVal(new mavis.Point(i, 0)).x;
        var y = this.fn(x);
        var j = this.axes.toPixel(new mavis.Point(0, y)).y;
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
  
mavis.PointMarker = function(_axes, _params) {
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

mavis.PointMarker.prototype.draw = function(ctx) {
    ctx.save();
	var p = this.axes.toPixel(new mavis.Point(this.x, this.y))
	this.pointStyle(ctx, p.x, p.y, this.size, this.strokeStyle, this.lineWidth, this.fillStyle);
    ctx.restore();
}
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
    
    this.start = new mavis.Point(0, 0);
    this.end = new mavis.Point(1, 1);
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
    this.start = new mavis.Point(0, 0);
    this.end = new mavis.Point(1, 1);
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
	var pmid = new mavis.Point((p1.x+p2.x)/2, (p1.y+p2.y)/2);
	
	//Find the unit vector in the direction of the line
	var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
	var vector = new mavis.Point((p1.x-p2.x)/length, (p1.y-p2.y)/length);
	var pvector = new mavis.Point(vector.y, -vector.x);
	
	if (this.count==1) {
		this.drawTick(ctx, pmid, pvector);
	}
	else if (this.count==2) {
		this.drawTick(ctx, new mavis.Point(pmid.x - vector.x*this.lineWidth, pmid.y - vector.y*this.lineWidth), pvector);
		this.drawTick(ctx, new mavis.Point(pmid.x + vector.x*this.lineWidth, pmid.y + vector.y*this.lineWidth), pvector);
	} else {
		this.drawTick(ctx, new mavis.Point(pmid.x - vector.x*this.lineWidth*2, pmid.y - vector.y*this.lineWidth*2), pvector);
		this.drawTick(ctx, pmid, pvector);
		this.drawTick(ctx, new mavis.Point(pmid.x + vector.x*this.lineWidth*2, pmid.y + vector.y*this.lineWidth*2), pvector);
	}
		
	
    ctx.restore();
}
    
mavis.Tick.prototype.drawTick = function(ctx, pt, vector) {
	ctx.beginPath();
	ctx.moveTo(pt.x+vector.x*this.lineWidth*3, pt.y+vector.y*this.lineWidth*3);
	ctx.lineTo(pt.x-vector.x*this.lineWidth*3, pt.y-vector.y*this.lineWidth*3);
	ctx.stroke();
}/*********************************
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
}/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * measure.js Draw measurement arrows on a line. 
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
  
mavis.Measure = function(_axes, _params) {
    this.axes = _axes;
    this.start = new mavis.Point(0, 0);
    this.end = new mavis.Point(1, 1);
    this.strokeStyle = "black";
    this.lineWidth = 4;
    this.strokeAlpha = 1;
	for (var key in _params) this[key] = _params[key];
}

mavis.Measure.prototype.draw = function(ctx) {
    ctx.save();
    this.axes.applyClip(ctx);
    ctx.globalAlpha = this.strokeAlpha;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
	
    var p1 = this.axes.toPixel(this.start);
    var p2 = this.axes.toPixel(this.end);
	
	//Find the unit vector in the direction of the line
	var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
	var vector = new mavis.Point((p1.x-p2.x)/length, (p1.y-p2.y)/length);
	var pvector = new mavis.Point(vector.y, -vector.x);
	
	this.drawMeasure(ctx, p1, vector, pvector);
	this.drawMeasure(ctx, p2, vector, pvector);
    ctx.restore();
}
    
mavis.Measure.prototype.drawMeasure = function(ctx, pt, v, pv) {
	ctx.beginPath();
	ctx.moveTo(pt.x + 7*pv.x*this.lineWidth, pt.y + 7*pv.y*this.lineWidth);
	ctx.lineTo(pt.x + 1*pv.x*this.lineWidth, pt.y + 1*pv.y*this.lineWidth);
	ctx.stroke();
}/*********************************
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
    this.a = new mavis.Point(1, 0);
    this.b = new mavis.Point(0, 0);
    this.c = new mavis.Point(0, 1);
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
		v = new mavis.Point(Math.cos(ang1), Math.sin(ang1));
		pv = new mavis.Point(Math.cos(ang2), Math.sin(ang2));
		ctx.moveTo(pt.x + v.x*radius, pt.y + v.y*radius);
		ctx.lineTo(pt.x + (v.x + pv.x)*radius, pt.y + (v.y + pv.y)*radius);
		ctx.lineTo(pt.x + pv.x*radius, pt.y + pv.y*radius);
	}
	ctx.stroke();
}/*********************************
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
	
/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * controlpoint.js implement a control point, uses create.js 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

/****
 *
 * Control point
 *
 ****/
 
mavis.ControlPoint = function( _axes, _stage, _params) {
    this.stage = _stage;
    this.axes = _axes;
	this.position = new mavis.Point(0, 0);
	this.radius = 10;
	this.fillStyle = "red";
	this.constraint = null;
	this.onMove = null;
	for (var key in _params) this[key] = _params[key];
	this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.fillStyle).drawCircle(0, 0, this.radius);
	this.stage.addChild(this.shape);
	var pos = axes.toPixel(this.position);
	this.shape.x = pos.x;
	this.shape.y = pos.y;
	this.shape.on("pressmove", this.onPressMove);
	this.shape.owner = this;
 }
  
mavis.ControlPoint.prototype.onPressMove = function(evt) {
	var cp = evt.target.owner;
	cp.position = cp.axes.toVal(new mavis.Point(evt.stageX, evt.stageY));
	if (cp.constraint) {
		cp.position = cp.constraint.constrain(cp.position);
	}
	var pos = cp.axes.toPixel(cp.position);
	evt.target.x = pos.x;
	evt.target.y = pos.y;
	if (cp.onMove)
		cp.onMove(evt);
}

/**
 * Constrain point to integer values
 */
 
mavis.ConstrainInteger = function() {
}
	
mavis.ConstrainInteger.prototype.constrain = function(source) {
	return new mavis.Point(Math.round(source.x), Math.round(source.y));
}
	
/**
 * Constrain point to a rectangle
 */
 
mavis.ConstrainRectangle = function(_minX, _minY, _maxX, _maxY) {
	this.minX = _minX;
	this.maxX = _maxX;
	this.minY = _minY;
	this.maxY = _maxY;
}
	
mavis.ConstrainRectangle.prototype.constrain = function(source) {
	var x = source.x;
	var y = source.y;
	if (x < this.minX)
		x = this.minX;
	else if (x > this.maxX)
		x = this.maxX;
	if (y < this.minY)
		y = this.minY;
	else if (y > this.maxY)
		y = this.maxY;
	return new mavis.Point(x, y);
}
	
/**
 * Constrain point to a circle
 */
 
mavis.ConstrainCircle = function(_circle) {
	this.circle = circle;
}
	
mavis.ConstrainCircle.prototype.constrain = function(source) {
	var x = source.x;
	var y = source.y;
	var ang = Math.atan2(y - circle.centre.y, x - circle.centre.x);
	x = circle.centre.x + circle.radius*Math.cos(ang);
	y = circle.centre.y + circle.radius*Math.sin(ang);
	return new mavis.Point(x, y);
}
	
