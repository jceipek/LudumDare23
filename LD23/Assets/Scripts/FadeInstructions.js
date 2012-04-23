#pragma strict

var topTex : Texture;
var bottomTex : Texture;

var fadeColor : Color;

var fadeDuration : float = 1.0f;

private var startFading : boolean = false;

private var arrowLeft : boolean = false;
private var arrowRight : boolean = false;
private var space : boolean = false;

private var startTime : float;

function Update () {
	if (Input.GetAxis("Horizontal") > 0.1f) {
		arrowLeft = true;
	}
	if (Input.GetAxis("Horizontal") < 0.1f) {
		arrowRight = true;
	}	
	if (Input.GetButtonUp("Charge")) {
		space = true;
	}
	
	if (arrowLeft && arrowRight && space) {
		startTime = Time.time;
		startFading = true;
	}
}

function OnGUI () {
	var currTime : float = Time.time;
	
	if (startFading) {
		var alpha : float;
		alpha = Mathf.Lerp(1.0f, 0.0f, (currTime-startTime)/fadeDuration);
		GUI.color = new Color(fadeColor.r, fadeColor.g, fadeColor.b, alpha);
		
		if ((currTime-startTime) >= fadeDuration) {
			//Destroy(gameObject);
		}
	}
	

	
	GUI.DrawTexture(Rect(Screen.width-(topTex.width/1.0f)+300.0f, 20.0f, topTex.width/2.0f, topTex.height/2.0f), topTex);
	GUI.DrawTexture(Rect(Screen.width-(bottomTex.width/1.0f)+300.0f, Screen.height-20.0f-bottomTex.height, bottomTex.width/2.0f, bottomTex.height/2.0f), bottomTex);
}