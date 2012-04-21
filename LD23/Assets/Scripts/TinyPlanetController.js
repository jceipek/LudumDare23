#pragma strict

class PlanetMovement {
	var chargeRate = 1.0;
	var totalFuel : float = 100.0f;

	@System.NonSerialized
	var chargeLevel : float = 0.0f;
			
	@System.NonSerialized
	var charging : boolean = false;
	
	@System.NonSerialized
	var thrustDirection : Vector3 = new Vector3(0.0f,0.0f,-1.0f); // What way are we facing?
	
	@System.NonSerialized
	var velocity : Vector3 = new Vector3(0.0f, 0.0f, 0.0f);
	
	@System.NonSerialized
	var rotation : Quaternion = Quaternion.identity;
	var rotationSpeed : float = 10.0f;

}

var move : PlanetMovement;

var thrustParticlePrefab : Transform;

private var controller : CharacterController;
//private var particles : ParticleSystem;

function Start () {
	controller = GetComponent(CharacterController);

}

function Update () {
	move.charging = Input.GetButton("Charge");

	if (move.charging) {
		var delta : float = Time.deltaTime * move.chargeRate;
		if (move.totalFuel - (move.chargeLevel + delta) > 0.0f) {
			move.chargeLevel += delta;
		}
	} else if (move.chargeLevel > 0.0f) {
		Thrust();
	}
	
	controller.Move(move.velocity * Time.deltaTime);
	
	var h : float = Input.GetAxis("Horizontal");
	if (Mathf.Abs(h) > 0.0) {
		transform.Rotate(Vector3.up*h*move.rotationSpeed*Time.deltaTime);
		move.thrustDirection = transform.rotation * (-1.0f * Vector3.forward);
	}
	

}

function Thrust() {
	move.totalFuel -= move.chargeLevel;
	move.velocity += move.thrustDirection * move.chargeLevel;
	
	
	var particles : Transform = Instantiate(thrustParticlePrefab, transform.position, transform.rotation);
	particles.gameObject.SendMessage("Setup", move.chargeLevel);
	particles.gameObject.SendMessage("SetVelocity", move.velocity);
	move.chargeLevel = 0.0f;
}