/*********************************
 *
 * mavisjs - graphing and geometry library for HTML5 canvas
 *
 * edge.js Create a cylinder to rerpresent an edhge between two points.
 *
 * Author: Martin McBride (martin.mcbride@axlesoft.com)
 *
 * Copyright (c) Martin McBride 2016
 *
 *********************************/

function createEdge(point1, point2, material)
{
    var direction = new THREE.Vector3().subVectors(point2, point1);
    var arrow = new THREE.ArrowHelper(direction.clone().normalize(), point1);
    var rotation = new THREE.Euler();
	rotation.setFromQuaternion(arrow.quaternion);
    var edgeGeometry = new THREE.CylinderGeometry(.05, .05, direction.length(), 16, 4 );
    var edge = new THREE.Mesh(edgeGeometry, material); 
    var pos = new THREE.Vector3().addVectors(point1, direction.multiplyScalar(0.5));
    edge.position.x = pos.x;
    edge.position.y = pos.y;
    edge.position.z = pos.z;
	edge.rotation.x = rotation.x;
	edge.rotation.y = rotation.y;
	edge.rotation.z = rotation.z;
	return edge;
}