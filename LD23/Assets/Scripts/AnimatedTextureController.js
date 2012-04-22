#pragma strict

var splitX : int = 1;
var splitY : int = 1;
var cycleRate : float = 1.0f;

var currIndex : int = 0;

private var timer : float;

function Update () {
	if (timer >= cycleRate) {
		timer = 0.0f;
		currIndex += 1;
		currIndex = currIndex % (splitX * splitY);
		var offset : Vector2 = new Vector2(parseFloat(currIndex%splitX)/parseFloat(splitX), Mathf.Floor(currIndex/splitX)/parseFloat(splitY));
		renderer.material.SetTextureOffset ("_MainTex", offset);
	} else {
		timer += Time.deltaTime;
	}
	

}