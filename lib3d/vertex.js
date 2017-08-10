/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * vertex.js A small sphere to mark a vertex 
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

 function createVertex(point, material) {
	 	var vertexGeometry = new THREE.SphereGeometry( .2, 16, 16 );
		var vertex = new THREE.Mesh(vertexGeometry, material); 
		vertex.position.x = point.x;
		vertex.position.y = point.y;
		vertex.position.z = point.z;
		return vertex;
 }
