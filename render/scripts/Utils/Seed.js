class Seed {
	constructor(opt) {
		this.size = opt.size || 1024

		this.seed = []

		for (let i = 0; i < this.size; i++) {
			this.seed.push([])
			for (let j = 0; j < this.size; j++) {
				this.seed[i].push(Math.random())
			}
		}
	}

	seed(x, y) {
		x = Math.abs(x)
		y = Math.abs(y)
		return this.seed[x % this.size][y % this.size]
	}
}
