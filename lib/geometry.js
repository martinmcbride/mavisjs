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
  * Vector functions
  *
  ****/

//Create a copy of vector p  
mavis.v_copy = function(p) {
	return new mavis.Vector(p.x, p.y)
}

//Add vector p1 to p2, return result as a new vector
mavis.v_add = function(p1, p2) {
	return new mavis.Vector(p1.x + p2.x, p1.y + p2.y)
}

//Subtract vector p2 from p1, return result as a new vector
mavis.v_sub = function(p1, p2) {
	return new mavis.Vector(p1.x - p2.x, p1.y - p2.y)
}

//Multiply vector p by scalar s
mavis.v_mul = function(p, s) {
	return new mavis.Vector(p.x*s, p.y*s)
}

//Interpolate between vector p2 from p1, return result as a new vector
mavis.v_interp = function(p1, p2, c) {
	return new mavis.Vector((1-c)*p1.x + c*p2.x, (1-c)*p1.y + c*p2.y)
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
	return new mavis.Vector((p2.x - p1.x)/length, (p2.y - p1.y)/length);
}

//Get unit vector perendicular line p1 to p2 (ccw rotation) 
mavis.line_perp = function(p1, p2) {
	var length = Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
	return new mavis.Vector(-(p2.y - p1.y)/length, (p2.x - p1.x)/length);
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
 

