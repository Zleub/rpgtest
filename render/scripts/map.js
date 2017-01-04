function dot(a, b) {
	return ((a.x * b.x) + (a.y * b.y) + (a.z * b.z));
}

function cross(a, b) {
    return {
        x: 0,
        y: 0,
        z: (a.x * b.y) - (b.x * a.y)
    };
}

let SinInterpolate = (x1, y1) => (x2, y2) => (x) => {
	var mu2 = ( 1 - Math.cos(x * Math.PI) ) / 2;
	return y1 * (1 - mu2) + y2 * mu2;
}

let Map = function (options) {
	this.noise = options.noise

	this.get = (x, y) => this.noise.get2DNoise(x, y)
	this.getNearest = (depth) => (x, y) => {
		let center = this.noise.get2DNoise(x, y)
		for (var i = 0; i < depth; i++) {
			center *= this.noise.get2DNoise(x - i, y)
			center *= this.noise.get2DNoise(x + i, y)
			center *= this.noise.get2DNoise(x, y - i)
			center *= this.noise.get2DNoise(x, y + i)
		}

		return center
	}
	this.getSinInterpolate = (depth) => (x, y) => {
		let A = {x, y, z: this.get(x, y) }
		let B = {x: x - 1, y, z: this.get(x - 1, y) }
		let C = {x: x + 1, y, z: this.get(x + 1, y) }
		let D = {x, y: y - 1, z: this.get(x, y - 1) }
		let E = {x, y: y + 1, z: this.get(x, y + 1) }

		let AB = SinInterpolate
	}
}

//   D
// B A C
//   E

// x_{d}=(x-x_{0})/(x_{1}-x_{0})
// y_{d}=(y-y_{0})/(y_{1}-y_{0})
// z_{d}=(z-z_{0})/(z_{1}-z_{0})
