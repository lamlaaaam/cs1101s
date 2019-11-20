// T3B Green. Yap Jing Kang, Nichelle Teo, Phang Jia Xuan, Lam Zhi Yuan

const left = ev3_motorA();
const right = ev3_motorB();
const light = ev3_colorSensor();
const isBlack = () => ev3_reflectedLightIntensity(light) < 10;

function move(speedL, speedR, distL, distR) { // Function to make moving easier
    ev3_runForDistance(left, distL, speedL);
    ev3_runForDistance(right, distR, speedR);
}

function stop() { // Stops
    ev3_stop(left);
    ev3_stop(right);
}

while(true) {
    ev3_runUntil(isBlack, () => move(200, 200, 99999, 99999)); 
    // Since not allowed to use runForever function, distance = 99999
    move(100, 100, -100, -100);
    ev3_pause(1500);
    move(300, 300, -110, 110);
    ev3_pause(1500);
}