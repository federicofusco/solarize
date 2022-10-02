import * as THREE from "three";

const EditorCamera = function ( camera, document, startRadius, cameraStartPos, originObject ) {
	this.camera = camera;
	this.mouseDown = false;
	this.startRadius = startRadius || 20;
	this.startExp = 6;
	this.radius = this.startExp;
	this.originObject = originObject || { position: new THREE.Vector3 () };
	this.cameraStartPos = cameraStartPos || new THREE.Vector2 ( Math.PI / 8, -Math.PI / 4 );
	this.cameraPos = this.cameraStartPos.clone ();
	this.mouseClickPos = new THREE.Vector2 ();
	var editorCamera = this;
	
	var addEventListeners = function () {

		document.addEventListener ( 'pointermove', event => {
			var mousePos = new THREE.Vector2 ( event.clientX, event.clientY );
			if ( editorCamera.mouseDown == true ) {
				var diff = mousePos.clone ().sub ( editorCamera.mouseClickPos ).multiplyScalar ( 1 / 250 ); 
				editorCamera.cameraPos = editorCamera.cameraStartPos.clone ().add ( diff );
				editorCamera.rotateCamera ();
			}
		});
		
		document.addEventListener ( 'wheel', event => {
			var delta = event.wheelDelta / 100_000;
			if (editorCamera.getScaledRadius ( editorCamera.radius - delta ) >= 0 ) {
				editorCamera.radius -= delta;
				editorCamera.zoomCamera ();
			}
		});

		document.addEventListener ( 'pointerdown', event => {
			event.preventDefault();
			var mousePos = new THREE.Vector2 ( event.clientX, event.clientY );			
			editorCamera.mouseClickPos = mousePos;
			editorCamera.mouseDown = true;
		});

		document.addEventListener ( 'pointerup', _ => {
			editorCamera.cameraStartPos = editorCamera.cameraPos;
			editorCamera.mouseDown = false;
		});
	}

	
	editorCamera.getScaledRadius = function ( radius ) {
		return Math.exp ( radius ) - Math.exp ( editorCamera.startExp ) + editorCamera.startRadius;
	}
	
	editorCamera.zoomCamera = function () {
		editorCamera.camera.position.normalize ().multiplyScalar ( editorCamera.getScaledRadius ( editorCamera.radius ) );
	}
	
	editorCamera.rotateCamera = function () {
		editorCamera.camera.position.y = editorCamera.cameraPos.y;
		editorCamera.camera.position.x = Math.sin ( -editorCamera.cameraPos.x );
		editorCamera.camera.position.z = Math.cos ( -editorCamera.cameraPos.x );
		
		editorCamera.zoomCamera ();
		
		editorCamera.camera.lookAt ( new THREE.Vector3 ( 0, 0, 0 ) );
		
		editorCamera.camera.position.add ( editorCamera.originObject.position );
	}
	
	addEventListeners ();
	editorCamera.rotateCamera ();
}

export default EditorCamera;