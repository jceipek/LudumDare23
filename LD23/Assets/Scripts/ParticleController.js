#pragma strict

var lifetime : float;

private var velocity : Vector3 = new Vector3(0.0f,0.0f,0.0f);

function Update () {

	if (lifetime > 0.0f) {
		lifetime -= Time.deltaTime;
		transform.Translate(velocity*Time.deltaTime, Space.World);
	} else {
		Destroy(gameObject);
	}

}

function Setup(life : float) {
	lifetime = 5.0f;
	//particleSystem.emissionRate = life*100.0f;
}

function SetVelocity(newVel : Vector3) {
	velocity.x = newVel.x;
	velocity.y = newVel.y;
	velocity.z = newVel.z;
}