#pragma strict

var mass : float = 1.0f;

enum fadeReason {NONE, EXPLODE, WIN, OUT_OF_FUEL, CRASH}

private var reasonToFade : fadeReason = fadeReason.NONE;

private var goalLevel : String;

var alive : boolean = true;

var canMove : boolean = true;

var doDepleteFuel : boolean = false;

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
	
	var terminalVelocity : float = 20.0f;

}
var move : PlanetMovement;

class PlanetAnimation {
	var minShakeSpeed : float = 5.0f;
	var maxShakeSpeed : float = 10.0f;
}
var anim : PlanetAnimation;



var thrustParticlePrefab : Transform;
var explosionParticlePrefab : Transform;

private var controller : CharacterController;
//private var particles : ParticleSystem;

function Awake() {
	PlayerPrefs.SetString("CurrLevel", Application.loadedLevelName);
	PlayerPrefs.Save();
}

function Start () {
	controller = GetComponent(CharacterController);
}

function Update () {
	if (alive && canMove) {
	
		var shake = animation["Shake"];
	
		move.charging = Input.GetButton("Charge");
	
		if (move.charging) {
			animation.CrossFade("Shake");
		
			var delta : float = Time.deltaTime * move.chargeRate;
			
			if ((move.totalFuel - (move.chargeLevel + delta)) < 0.0f) {
				Debug.Log("Compensate!");
				delta = (move.totalFuel - move.chargeLevel);
			}
			
			delta = Mathf.Max(0.0f, delta);
			
			if ((move.chargeLevel + delta) > move.maxChargeLevel) {
				// We want to explode here
				Debug.Log("Explode!");
				Explode();
				delta = move.maxChargeLevel - move.chargeLevel;
			}
			
			delta = Mathf.Max(0.0f, delta);

			move.chargeLevel += delta;
			
			shake.speed = Mathf.Lerp(anim.minShakeSpeed, anim.maxShakeSpeed, move.chargeLevel/move.maxChargeLevel);
			
		} else {
			animation.Stop();
			if (move.chargeLevel > 0.0f) {
				Thrust();
			}
		}
		
		if (move.velocity.magnitude > move.terminalVelocity) {
			move.velocity = move.velocity.normalized * move.terminalVelocity;
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

}

function Explode() {
	var particles : Transform = Instantiate(explosionParticlePrefab, transform.position, Quaternion.identity);
	particles.gameObject.SendMessage("SetVelocity", move.velocity);
	reasonToFade = fadeReason.EXPLODE;
	//Application.LoadLevel("ExplodeScene");
	alive = false;
	Destroy(gameObject.Find("Armature"));
	gameObject.Find("Fader").SendMessage("Fade");
}

function DoneFading() {
	if (reasonToFade == fadeReason.EXPLODE) {
		Application.LoadLevel("ExplodeScene");
		//Destroy(gameObject);
	} else if (reasonToFade == fadeReason.CRASH) {
		Application.LoadLevel("CrashScene");
	} else if (reasonToFade == fadeReason.WIN) {
		Application.LoadLevel(goalLevel);
	}
}

function Thrust() {
	if (doDepleteFuel) {
		move.totalFuel -= move.chargeLevel;
	}
	move.velocity += move.thrustDirection * move.chargeLevel * move.thrustPower;

	var particlePos : Vector3 = new Vector3(transform.position.x, transform.position.y-5.0f, transform.position.z);
	var particles : Transform = Instantiate(thrustParticlePrefab, particlePos, transform.rotation);
	//var particles : Transform = Instantiate(thrustParticlePrefab, particlePos, Quaternion.identity);
	//particles.RotateAround(transform.rotation, Vector3.up, ransform.rotation);
	
	particles.gameObject.BroadcastMessage("Setup", move.chargeLevel);
	particles.gameObject.BroadcastMessage("SetVelocity", move.velocity);
	move.chargeLevel = 0.0f;
}


function OnControllerColliderHit (hit : ControllerColliderHit) {
	hit.collider.gameObject.SendMessage("HitByPlayer", SendMessageOptions.DontRequireReceiver);
	if (hit.collider.tag == "planet") {
		var particles : Transform = Instantiate(explosionParticlePrefab, transform.position, Quaternion.identity);
		particles.gameObject.SendMessage("SetVelocity", move.velocity);
		reasonToFade = fadeReason.CRASH;
		//Application.LoadLevel("ExplodeScene");
		alive = false;
		Destroy(gameObject.Find("Armature"));
		gameObject.Find("Fader").SendMessage("Fade");
	} else if (hit.collider.tag == "goal") {
		Debug.Log("Hit!");
		reasonToFade = fadeReason.WIN;
		var goalController : GoalIndicatorController = hit.collider.GetComponent(GoalIndicatorController);
		goalLevel = goalController.GetGoalLevel();
		canMove = false;
		gameObject.Find("Fader").SendMessage("Fade");
	}
	
}

function PullInDir(dir : Vector3) {
	if (canMove) {
		var diffVector : Vector3 = new Vector3(dir.x, 0.0f, dir.z);
		move.velocity -= diffVector;
	}
}