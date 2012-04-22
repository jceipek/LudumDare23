#pragma strict

var fadeTexture : Texture;
var fadeDuration : float = 1.0f;
var fadeColor : Color;
var fadeOnStart : boolean = false;

var doFadeIn : boolean = true; // Else fade out

private var startTime : float;
private var started : boolean = false;
private var screenRect : Rect;

var notifyWhenDone : GameObject;
var notifyWhenStart : GameObject;

function Start () {
	screenRect = new Rect(0, 0, Screen.width, Screen.height);
	if (fadeOnStart) {
		Fade();
	}
}

function OnGUI () {
	if (started) {
		var alpha : float;
		var currTime : float = Time.time;
		if (doFadeIn) {
			alpha = Mathf.Lerp(0.0f, 1.0f, (currTime-startTime)/fadeDuration);
		} else {
			alpha = Mathf.Lerp(1.0f, 0.0f, (currTime-startTime)/fadeDuration);
		}

		GUI.color = new Color(fadeColor.r, fadeColor.g, fadeColor.b, alpha);
		GUI.DrawTexture(screenRect, fadeTexture);
		
		if ((currTime-startTime) >= fadeDuration) {
			if (notifyWhenDone) {
				notifyWhenDone.SendMessage("DoneFading");
			}

			Destroy(gameObject);
		} 
	}
}

function Fade() {
	if (!started) {
		startTime = Time.time;
		started = true;
	
		if (notifyWhenStart) {
			notifyWhenStart.SendMessage("StartedFading");
		}
	}
}