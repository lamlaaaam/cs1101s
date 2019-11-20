// T3B Green. Yap Jing Kang, Nichelle Teo, Phang Jia Xuan, Lam Zhi Yuan

const left = ev3_motorA();
const right = ev3_motorB();
const color = ev3_colorSensor();

const baseSpeed = 230; // The top speed
const desiredLight = 41; // The light intensity at the edge of the line
const scale = (1.21 * baseSpeed) / desiredLight; // A constant gain factor, found experimentally

// Function to steer the robot
function steerFunc(steer) {
	const lSteer = steer > 0 ? baseSpeed - steer : baseSpeed;
	const rSteer = steer > 0 ? baseSpeed : baseSpeed + steer;
	const direction = steerVal => steerVal < 0 ? -99999 : 99999;
    ev3_runForDistance(left, direction(lSteer), math_abs(lSteer));
    ev3_runForDistance(right, direction(rSteer), math_abs(rSteer));
}

// Main loop
while(true) {
	const currLight = ev3_reflectedLightIntensity(color); // Current intensity
	const error = currLight - desiredLight; // How far it deviates from the desired intensity
	const steer = math_round(error * scale); // Multiply by the scale factor
	steerFunc(steer); // Steer the robot
}