#pragma strict

var delay : float = 1.0f;

//private var audio : AudioSource;
private var hasPlayed : boolean = false;

function Start () {
	//audio = GetComponent(AudioSource);
}

function Update () {
	if (delay <= 0.0f && !hasPlayed) {
		audio.Play();
		hasPlayed = true;
	} else {
		delay -= Time.deltaTime;
	}
}