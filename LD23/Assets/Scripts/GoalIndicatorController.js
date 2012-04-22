#pragma strict

var indicatorTexture : Texture;
var indicatorArrowTexture : Texture;

var player : Transform;
var winLevel : String;

var displayGUI : boolean = true;

var deadZoneX : float = 20.0f;
var deadZoneY : float = 20.0f;

private var angle : float = 0.0f;

function Start () {

}

function Update () {

}
/*
function OnGUI () {
	if (player && displayGUI) {

		var width : float = 120.0f;
		
		if (player.position.x - deadZoneX > transform.position.x && player.position.z + deadZoneY < transform.position.z) {
			GUI.DrawTexture(Rect(-width/2.0f, -width/2.0f, width, width), indicatorTexture); // Top Left
		}
		if (player.position.x - deadZoneX > transform.position.x && player.position.z - deadZoneY > transform.position.z) {
			GUI.DrawTexture(Rect(-width/2.0f, Screen.height-width/2.0f, width, width), indicatorTexture); // Bottom Left
		}
		if (player.position.x + deadZoneX < transform.position.x && player.position.z - deadZoneY > transform.position.z) {
			GUI.DrawTexture(Rect(Screen.width-width/2.0f, Screen.height-width/2.0f, width, width), indicatorTexture); // Bottom Right
		}
		if (player.position.x + deadZoneX < transform.position.x && player.position.z + deadZoneY < transform.position.z) {
			GUI.DrawTexture(Rect(Screen.width-width/2.0f, -width/2.0f, width, width), indicatorTexture); // Top Right
		}
		
		
		width = 60.0f;
		
		if (player.position.x + deadZoneX > transform.position.x && player.position.x - deadZoneX < transform.position.x &&
			player.position.z > transform.position.z) {
			GUI.DrawTexture(Rect(Screen.width/2.0f-width/2.0f, Screen.height-width/2.0f, width, width), indicatorTexture); // Bottom Center
		}
		
		if (player.position.x + deadZoneX > transform.position.x && player.position.x - deadZoneX < transform.position.x &&
			player.position.z < transform.position.z) {
			GUI.DrawTexture(Rect(Screen.width/2.0f-width/2.0f, -width/2.0f, width, width), indicatorTexture); // Top Center
		}
		
		if (player.position.z + deadZoneY > transform.position.z && player.position.z - deadZoneY < transform.position.z &&
			player.position.x < transform.position.x) {
			GUI.DrawTexture(Rect(Screen.width-width/2.0f, Screen.height/2.0f-width/2.0f, width, width), indicatorTexture); // Right Center
		}
		
		if (player.position.z + deadZoneY > transform.position.z && player.position.z - deadZoneY < transform.position.z &&
			player.position.x > transform.position.x) {
			GUI.DrawTexture(Rect(-width/2.0f, Screen.height/2.0f-width/2.0f, width, width), indicatorTexture); // Left Center
		}
		
		angle += 10.0f * Time.deltaTime;
		
		//if (player.position.z + deadZoneY > transform.position.z && player.position.z - deadZoneY < transform.position.z &&
		//	player.position.x > transform.position.x) {
			GUIUtility.RotateAroundPivot (angle+180.0f, new Vector2(width/2.0f, Screen.height/2.0f)); 
			GUI.DrawTexture(Rect(0.0f, Screen.height/2.0f-width/2.0f, width, width), indicatorArrowTexture); // Left Center
			
			
		//}
		
		
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
*/

function HitByPlayer() {
	Debug.Log("Win!");
	//Application.LoadLevel(winLevel);
}

function GetGoalLevel() {
	return winLevel;
}

function StartedFading() {
	displayGUI = false;
}