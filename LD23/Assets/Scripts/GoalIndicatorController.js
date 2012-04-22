#pragma strict

var indicatorTexture : Texture;
var player : Transform;
var winLevel : String;

function Start () {

}

function Update () {

}

function OnGUI () {
	if (player) {
		if (player.position.x > transform.position.x && player.position.z < transform.position.z) {
			GUI.DrawTexture(Rect(-60, -60, 120, 120), indicatorTexture); // Top Left
		}
		if (player.position.x > transform.position.x && player.position.z > transform.position.z) {
			GUI.DrawTexture(Rect(-60, Screen.height-60, 120, 120), indicatorTexture); // Bottom Left
			
		}
		if (player.position.x < transform.position.x && player.position.z > transform.position.z) {
			GUI.DrawTexture(Rect(Screen.width-60, Screen.height-60, 120, 120), indicatorTexture); // Bottom Right
		}
		if (player.position.x < transform.position.x && player.position.z < transform.position.z) {
			GUI.DrawTexture(Rect(Screen.width-60, -60, 120, 120), indicatorTexture); // Top Right
		}
	}
}

function HitByPlayer() {
	Debug.Log("Win!");
	Application.LoadLevel(winLevel);
}