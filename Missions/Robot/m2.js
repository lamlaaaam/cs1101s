// T3B Green. Yap Jing Kang, Nichelle Teo, Phang Jia Xuan, Lam Zhi Yuan

const left = ev3_motorA();
const right = ev3_motorB();
const speed = 300;
const dist = 110;

ev3_runForDistance(left, -dist, speed);
ev3_runForDistance(right, dist, speed);
ev3_pause(2000);