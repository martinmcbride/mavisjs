/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * text.js Button 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

/****
 *
 * Button
 *
 ****/
 
mavis.Button = function(_axes, _stage, _params) {
    this.axes = _axes;
    this.stage = _stage;
	this.stage.enableMouseOver();
	this.position = new mavis.Vector(0, 0);
	this.align = "center";
	this.valign = "middle";
	this.font = "20pt Verdana, Geneva, sans-serif";
	this.content = "button";
	this.fillStyle = "blue";
	this.textColor = "white";
	this.width = 100;
	this.height = 50;
	this.enabled = true;
	this.highlight = false;
	for (var key in _params) this[key] = _params[key];
	
	this.hit = new createjs.Shape();
	var pos = axes.toPixel(this.position);
	this.hit.graphics.beginFill("rgba(255, 255, 255, 0.01)").drawRect(pos.x, pos.y, this.width, this.height);
	this.hit.owner = this;
	this.hit.on("click", this.onClickInternal);
	this.hit.on("mouseover", this.onMouseOver);
	this.hit.on("mouseout", this.onMouseOut);
	this.stage.addChild(this.hit);

}
  
mavis.Button.prototype.onClickInternal = function(evt) {
	var btn = evt.target.owner;
	if (btn.onClick && btn.enabled)
		btn.onClick(evt);
}

mavis.Button.prototype.onMouseOver = function(evt) {
	evt.target.owner.highlight = true;
}

mavis.Button.prototype.onMouseOut = function(evt) {
	evt.target.owner.highlight = false;
}

mavis.Button.prototype.draw = function(ctx) {
    //Clip everything to the graph area
    ctx.save();
    
	var p = this.axes.toPixel(this.position);

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + this.width, p.y);
    ctx.lineTo(p.x + this.width, p.y + this.height);
    ctx.lineTo(p.x, p.y + this.height);
    ctx.closePath();
	
	var style = this.fillStyle;
	if (!this.enabled)
		style = "grey";
	else if (this.highlight)
	{
		style = shadeColor(style, 50);
	}

    if (this.fillStyle) {
        ctx.fillStyle = style;
        ctx.fill();
    }

    ctx.font = this.font;
	ctx.textAlign = this.align;
	ctx.textBaseline = this.valign;
	
    if (this.textColor) {
      ctx.fillStyle = this.textColor;
      ctx.fillText(this.content, p.x + this.width/2, p.y + this.height/2);
    }

    ctx.restore()
}
