#pragma strict

var sceneToLoad : String;
var inputBlockTime : float = 0.1f;

private var startedFading : boolean = false;

var loadFromFile : boolean = true;


function Start() {
	if (loadFromFile && PlayerPrefs.HasKey("CurrLevel")) {
		sceneToLoad = PlayerPrefs.GetString("CurrLevel");
	}
}

function Update() {

	if (!startedFading && inputBlockTime <= 0.0f) {
		if (Input.GetButtonDown("Charge")) {
			gameObject.Find("Fader").SendMessage("Fade", SendMessageOptions.DontRequireReceiver);
			startedFading = true;
		}
	}
	
	inputBlockTime -= Time.deltaTime;
}

function DoneFading() {
	Application.LoadLevel(sceneToLoad);
}