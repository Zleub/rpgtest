class Attractor {
	int x;
	int y;

	Attractor (int _x, int _y) {
		x = _x;
		y = _y;
	}

	void draw() {
		stroke(255, 0, 0);
		arc(x, y, 5, 5, 0, PI * 2)
	}
}

class Particule {
	float dst;
	float x;
	float y;
	float vel_x;
	float vel_y;

	Particule (int _x, int _y) {
		x = _x;
		y = _y;
		vel_x = 0;
		vel_y = 0;
	}

	void update(Attractor attr) {
		dst = sqrt( pow(attr.x - x, 2) + pow(attr.y - y, 2) );

		vel_x = (vel_x + (attr.x - x) / dst) * 0.998;
		vel_y = (vel_y + (attr.y - y) / dst) * 0.998;

		x = x + vel_x / 10
		y = y + vel_y / 10
	}

	void draw() {
		float d = dst / 250;
		stroke(255 / d, 255 * d, 0);
		point(x, y);
	}
}

Attractor[] attrs = new Attractor[1];
Particule[] particules = new Particule[2048];

void setup() {
	size(400, 400);
	background(0);
	stroke(255, 255, 255);

	for (int i = 0; i < particules.length; i++) {
		particules[i] = new Particule(random(width), random(height));
	}
}

float time = 0;

void draw() {
	attrs[0] = new Attractor(mouseX, mouseY);

	background(0);
	for (int i = 0; i < particules.length; i++) {
		particules[i].update(attrs[0]);
		particules[i].draw();
	}
}
