#pragma strict

var goal : Transform;
private var direction : Vector3;

var rotationSpeed : float = 5.0f;

function Start () {
	direction = Vector3.forward;
	transform.rotation = Quaternion.identity;
}

function Update () {
	 var goalRot : Quaternion = Quaternion.FromToRotation(direction, (goal.position - transform.position)); 
	 transform.rotation = Quaternion.Slerp(transform.rotation, goalRot, rotationSpeed*Time.deltaTime);

	 //direction = (transform.position - goal.position);
}