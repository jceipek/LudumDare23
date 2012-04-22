#pragma strict

var rotationSpeed : float = 5.0f;

function Update () {
	transform.Rotate(Vector3.up*rotationSpeed*Time.deltaTime, Space.World);
}