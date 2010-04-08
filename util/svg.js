/*
	Licencováno pod MIT Licencí, její celý text je uveden v souboru licence.txt
	Licenced under the MIT Licence, complete text is available in licence.txt file
*/

/**
 * @overview Prace s SVG
 * @version 3.0
 * @author Wendigo, Zara
 */ 
 
/**
 * @class SVG
 * @augments JAK.Vector.Canvas
 */ 
JAK.SVG = JAK.ClassMaker.makeClass({
	NAME: "SVG",
	VERSION: "3.0",
	IMPLEMENT: JAK.Vector.Canvas
})

JAK.SVG.prototype.ns = "http://www.w3.org/2000/svg";
JAK.SVG.prototype.xlinkns = "http://www.w3.org/1999/xlink";

/**
 * @see JAK.Vector.Canvas
 */
JAK.SVG.prototype.$constructor = function(width, height) {
	var svg = document.createElementNS(this.ns, "svg");
	svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", this.xlinkns);
	
	var g = document.createElementNS(this.ns, "g");
	svg.appendChild(g);
	
	this.ec = [];

	this.ec.push(JAK.Events.addListener(svg,'mousemove',JAK.Events.cancelDef));
	this.ec.push(JAK.Events.addListener(svg,'mousedown',JAK.Events.cancelDef));
	this.ec.push(JAK.Events.addListener(svg,'mouseup',JAK.Events.cancelDef));

	this.canvas = svg;
	this.g = g;
	
	this.resize(width, height);
};

/**
 * destruktor
 */   
JAK.SVG.prototype.$destructor = function() {
	for (var i=0;i<this.ec.length;i++) {
		JAK.Events.removeListener(this.ec[i]);
	}
	this.ec = [];

	if (this.canvas.parentNode && this.canvas.parentNode.nodeType == 1) { this.canvas.parentNode.removeChild(this.canvas); }
	this.canvas = null;
};

/**
 * @see JAK.Vector#getContainer
 */   
JAK.SVG.prototype.getContainer = function() {
	return this.canvas;
};

/**
 * @see JAK.Vector#getContent
 */   
JAK.SVG.prototype.getContent = function() {
	return this.g;
};

/**
 * @see JAK.Vector#clear
 */   
JAK.SVG.prototype.clear = function() {
	JAK.DOM.clear(this.g);
};

/**
 * @see JAK.Vector#resize
 */   
JAK.SVG.prototype.resize = function(width, height) {
	this.canvas.setAttribute("width", width);
	this.canvas.setAttribute("height", height);
};

/**
 * @see JAK.Vector#setScale
 */   
JAK.SVG.prototype.setScale = function(scale) {
	this.g.setAttribute("transform", "scale("+scale+")");
}


/**
 * @see JAK.Vector#polyline
 */   
JAK.SVG.prototype.polyline = function() {
	var el = document.createElementNS(this.ns, "polyline");
	el.setAttribute("fill", "none");
	el.setAttribute("stroke", "none");
	el.setAttribute("stroke-linejoin", "round");
	el.setAttribute("stroke-linecap", "round");

	return el;
};

/**
 * @see JAK.Vector#circle
 */   
JAK.SVG.prototype.circle = function() {
	var el = document.createElementNS(this.ns, "circle");
	el.setAttribute("fill", "none");
	el.setAttribute("stroke", "none");
	return el;
};

/**
 * @see JAK.Vector#polygon
 */   
JAK.SVG.prototype.polygon = function() {
	var el = document.createElementNS(this.ns, "polygon");
	el.setAttribute("fill", "none");
	el.setAttribute("stroke", "none");
	el.setAttribute("stroke-linejoin", "round");
	el.setAttribute("stroke-linecap", "round");
	
	return el;
};

/**
 * @see JAK.Vector#path
 */   
JAK.SVG.prototype.path = function() {
	var el = document.createElementNS(this.ns, "path");
	el.setAttribute("fill", "none");
	el.setAttribute("stroke", "none");
	el.setAttribute("stroke-linejoin", "round");
	el.setAttribute("stroke-linecap", "round");

	return el;
}

/**
 * @see JAK.Vector#setStroke
 */
JAK.SVG.prototype.setStroke = function(element, options) {
	if ("color" in options) { element.setAttribute("stroke", options.color); }
	if ("opacity" in options) { element.setAttribute("stroke-opacity", options.opacity); }
	if ("width" in options) { element.setAttribute("stroke-width", options.width); }
}

/**
 * @see JAK.Vector#setFill
 */   
JAK.SVG.prototype.setFill = function(element, options) {
	if ("color" in options) { element.setAttribute("fill", options.color); }
	if ("opacity" in options) { element.setAttribute("fill-opacity", options.opacity); }
}

/**
 * @see JAK.Vector#setCenterRadius
 */   
JAK.SVG.prototype.setCenterRadius = function(element, center, radius) {
	element.setAttribute("cx", center.getX());
	element.setAttribute("cy", center.getY());
	element.setAttribute("r", radius);
}

/**
 * @see JAK.Vector#setPoints
 */   
JAK.SVG.prototype.setPoints = function(element, points, closed) {
	var arr = points.map(function(item) { return item.join(" "); });
	element.setAttribute("points", arr.join(", "));
}

/**
 * @see JAK.Vector#setFormat
 */   
JAK.SVG.prototype.setFormat = function(element, format) {
	element.setAttribute("d", format);
}
