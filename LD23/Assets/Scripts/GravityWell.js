#pragma strict

var mass : float = 10.0f;
var playerRef : Transform;

function Update () {
	if (playerRef) {
		var playerPlanet : TinyPlanetController = playerRef.GetComponent(TinyPlanetController);
		var force : float = (playerPlanet.mass * mass)/Vector3.Distance(transform.position, playerRef.position);
		force *= 0.05f;
		playerPlanet.PullInDir((playerRef.position-transform.position).normalized*force);
	}
}