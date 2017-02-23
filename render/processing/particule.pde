class Attractor {
	int x;
	int y;

	Attractor (float _x, float _y) {
		x = _x;
		y = _y;
	}

	void draw() {
		stroke(255, 0, 0);
		arc(x, y, 5, 5, 0, PI * 2);
	}
}

class Particule {
	float dst;
	float x;
	float y;
	float vel_x;
	float vel_y;

	ArrayList mem = new ArrayList();

	Particule (float _x, float _y) {
		x = _x;
		y = _y;
		vel_x = 0;
		vel_y = 0;
	}

	void update(Attractor attr) {
		dst = sqrt( pow(attr.x - x, 2) + pow(attr.y - y, 2) );

		vel_x = (vel_x + (attr.x - x) / dst) ;
		vel_y = (vel_y + (attr.y - y) / dst) ;

		x = x + vel_x / 50 ;
		y = y + vel_y / 50 ;
	}

	void draw() {
		int val = (abs(vel_x) + abs(vel_y)) / 100;

		val = val * 255;
		stroke(val, val, val);
		point(x, y);
		point(x + 1, y);
		point(x - 1, y);
		point(x, y + 1);
		point(x, y - 1);
	}
}

Attractor[] attrs = new Attractor[3 * 2];
Particule[] particules = new Particule[100];

void setup() {
	size(400, 400);
	background(0);
	stroke(255, 255, 255);

	for (int i = 0; i < particules.length / 2; i++) {
		particules[i] = new Particule(
			width / 2 + (width / 3.5) * (cos(PI * 2 / (particules.length / 2) * i)),
			height / 2 + (height / 3.5) * (sin(PI * 2 / (particules.length / 2) * i))
		);
	}
	int j = 0;
	for (int i = particules.length / 2; i < particules.length; i++) {
		particules[i] = new Particule(
			width / 2 + (width / 4) * (cos(PI * 2 / (particules.length / 2) * j)),
			height / 2 + (height / 4) * (sin(PI * 2 / (particules.length / 2) * j))
		);
		j = j + 1;
	}

	for (int j = 0; j < attrs.length; j++) {
		attrs[j] = new Attractor();
	}
}

float time = 0;

void draw() {
	time += 0.1;

	background(0);
	for (int j = 0; j < attrs.length / 2; j++) {
		attrs[j].x = width / 2 +  (width / 3) * cos((PI * 2 / 360) * (time + j * (360 / attrs.length * 2)) % 360) ;
		attrs[j].y = height / 2 + (height / 3) * sin((PI * 2 / 360) * (time + j * (360 / attrs.length * 2)) % 360) ;
	}

	for (int j = attrs.length / 2; j < attrs.length; j++) {
		attrs[j].x = width / 2 +  (width / 6) * cos((PI * 2 / 360) * (time + (j + 0.5) * (360 / attrs.length * 2)) % 360) ;
		attrs[j].y = height / 2 + (height / 6) * sin((PI * 2 / 360) * (time + (j + 0.5) * (360 / attrs.length * 2)) % 360) ;
	}

	stroke(255, 255, 255);
	for (int i = 0; i < particules.length; i++) {
		float d = 100000;
		Attractor a;
		Particule p = particules[i];

		for (int j = 0; j < attrs.length; j++) {
			float dst = dist(attrs[j].x, attrs[j].y, p.x, p.y);
			if (dst < d) {
				d = dst;
				a = attrs[j];
			}
		}
		if (a)
			p.update(a);
		p.draw();
	}
}
