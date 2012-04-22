#pragma strict

function Start() {
	PlayerPrefs.DeleteKey("CurrLevel");
	PlayerPrefs.Save();
}
