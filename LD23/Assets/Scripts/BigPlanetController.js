#pragma strict

function HitByPlayer() {
	Debug.Log("I'm hit!");
	Destroy(gameObject);
}