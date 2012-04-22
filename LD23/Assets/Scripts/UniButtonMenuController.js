#pragma strict

var sceneToLoad : String;

function Update () {
	if (Input.GetButtonDown("Charge")) {
		gameObject.Find("Fader").SendMessage("Fade", SendMessageOptions.DontRequireReceiver);
	}
}

function DoneFading() {
	Application.LoadLevel(sceneToLoad);
}