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

		vel_x = (vel_x + (attr.x - x) / dst) * 0.999;
		vel_y = (vel_y + (attr.y - y) / dst) * 0.999;

		// x = x + vel_x / 8;
		// y = y + vel_y / 8;

		x = x + vel_x / 10 ; // - vel_y / 180;
		y = y + vel_y / 10 ; // + vel_x / 180;
	}

	void draw() {
		float d = dst / 250;
		stroke(255 / d, 255 * d, 0);
		point(x, y);
	}
}

Attractor[] attrs = new Attractor[3];
Particule[] particules = new Particule[5000];

void setup() {
	size(800, 800);
	background(0);
	stroke(255, 255, 255);

	for (int i = 0; i < particules.length; i++) {
		particules[i] = new Particule(random(width), random(height));
	}
	// for (int i = 0; i < particules.length / 2; i++) {
	// 	particules[i] = new Particule(
	// 		width / 2 + 100 * (cos(PI * 2 / (particules.length / 2) * i)),
	// 		height / 2 + 100 * (sin(PI * 2 / (particules.length / 2) * i))
	// 	);
	// }
	// int j = 0;
	// for (int i = particules.length / 2; i < particules.length; i++) {
	// 	particules[i] = new Particule(
	// 		width / 2 + 200 * (cos(PI * 2 / (particules.length / 2) * j)),
	// 		height / 2 + 200 * (sin(PI * 2 / (particules.length / 2) * j))
	// 	);
	// 	j = j + 1;
	// }

	for (int j = 0; j < attrs.length; j++) {
		attrs[j] = new Attractor();
	}
	// attrs[1] = new Attractor(width - 100, height - 100);
	// attrs[2] = new Attractor(width / 2, height / 2);
}

float time = 0;

void draw() {
	attrs[0] = new Attractor(mouseX, mouseY);

	// time += 0.1;
	//
	// if (time > 1) {
	// 	time = 0;
		background(0);
	// }
	// for (int j = 0; j < attrs.length; j++) {
	// 	attrs[j].x = width / 2 +  ( 300 * ( 1 + sin(time / 1000) / 2 ) ) * cos((PI * 2 / 360) * (time + j * (360 / attrs.length)) % 360) ;
	// 	attrs[j].y = height / 2 + ( 300 * ( 1 + sin(time / 1000) / 2 ) ) * sin((PI * 2 / 360) * (time + j * (360 / attrs.length)) % 360) ;
	//
	// 	attrs[j].draw();
	// }


	for (int i = 0; i < particules.length; i++) {
		// for (int j = 0; j < attrs.length; j++)
			particules[i].update(attrs[0]);
		particules[i].draw();
	}
}
