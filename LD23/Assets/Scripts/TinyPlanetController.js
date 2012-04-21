#pragma strict

var mass : float = 1.0f;

class PlanetMovement {
	var chargeRate = 1.0;
	var thrustPower = 1.0;
	var maxChargeLevel = 10.0;
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
		
		if ((move.totalFuel - (move.chargeLevel + delta)) < 0.0f) {
			Debug.Log("Compensate!");
			delta = (move.totalFuel - move.chargeLevel);
		}
		
		delta = Mathf.Max(0.0f, delta);
		
		if ((move.chargeLevel + delta) > move.maxChargeLevel) {
			// We want to explode here
			Debug.Log("Explode!");
			delta = move.maxChargeLevel - move.chargeLevel;
		}
		
		delta = Mathf.Max(0.0f, delta);
						
		move.chargeLevel += delta;
		
	} else if (move.chargeLevel > 0.0f) {
		Thrust();
	}
	
	controller.Move(move.velocity * Time.deltaTime);
	//transform.Translate(move.velocity * Time.deltaTime);
	//rigidbody.MovePosition(rigidbody.position + (move.velocity * Time.deltaTime));
	
	var h : float = Input.GetAxis("Horizontal");
	if (Mathf.Abs(h) > 0.0) {
		transform.Rotate(Vector3.up*h*move.rotationSpeed*Time.deltaTime, Space.World);
		move.thrustDirection = transform.rotation * (-1.0f * Vector3.forward);
	}

}

function Thrust() {
	move.totalFuel -= move.chargeLevel;
	move.velocity += move.thrustDirection * move.chargeLevel * move.thrustPower;

	var particles : Transform = Instantiate(thrustParticlePrefab, transform.position, transform.rotation);
	particles.gameObject.SendMessage("Setup", move.chargeLevel);
	particles.gameObject.SendMessage("SetVelocity", move.velocity);
	move.chargeLevel = 0.0f;
}


function OnControllerColliderHit (hit : ControllerColliderHit) {
	hit.collider.gameObject.SendMessage("HitByPlayer", SendMessageOptions.DontRequireReceiver);
}

function PullInDir(dir : Vector3) {
	move.velocity -= dir;
}