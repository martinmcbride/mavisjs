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

