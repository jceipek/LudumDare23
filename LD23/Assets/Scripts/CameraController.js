#pragma strict

var target : Transform;
var springiness : float;

function Start () {

}

function Update () {

}

function LateUpdate() {
	var goalPosition : Vector3 = GetGoalPos();
	transform.position = Vector3.Lerp(transform.position, goalPosition, Time.deltaTime * springiness);
}


function GetGoalPos() {
	return new Vector3(target.position.x, transform.position.y, target.position.z);
}