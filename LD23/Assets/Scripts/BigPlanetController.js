#pragma strict

var crashLevel : String;

function HitByPlayer() {
	Debug.Log("I'm hit!");
	//Destroy(gameObject);
	Application.LoadLevel(crashLevel);
}