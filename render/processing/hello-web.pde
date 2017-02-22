int mode = 0;
int time = 0;

void setup() {
	size(400, 400);
	background(0);
	stroke(125, 125, 125);
	noSmooth();
	noFill();
}

void draw() {
	time += 0.01;

	if (time > 2 && mode == 0) {
		mode = 1;
		time = 0;
		stroke(0);
	}
	if (time > 2 && mode == 1) {
		mode = 0;
		time = 0;
		stroke(125, 125, 125);
	}

	if (mode == 0)
		background(0);
	if (mode == 1)
		background(125);

	arc(200, 200, 200, 200, 0, PI * time);
}
