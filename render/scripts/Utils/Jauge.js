class Jauge {
	constructor(opt) {
		if (opt.border)
			this.border = new Konva.Rect({
				x: (opt.x || 0) + 0,
				y: (opt.y || 0) + -8,
				width: 64,
				height: 8,
				fill: opt.border
			})
		this.background = new Konva.Rect({
			x: (opt.x || 0) + 2,
			y: (opt.y || 0) + -6,
			width: 60,
			height: 4,
			fill: 'white'
		})
		this.jauge = new Konva.Rect({
			x: (opt.x || 0) + 2,
			y: (opt.y || 0) + -6,
			width: 0,
			height: 4,
			fill: opt.color || 'black'
		})
	}

	addTo(group) {
		if (this.border)
			group.add(this.border)
		group.add(this.background)
		group.add(this.jauge)
	}

	reset() {
		this.jauge.width(0)
	}
	max() {
		this.jauge.width(60)
	}
	toNumber() {
		return this.jauge.width()
	}
	fromNumber(n) {
		this.jauge.width(n)
	}
	fromPercent(p) {
		this.jauge.width(p * 60)
	}

	draw() {
		this.jauge.draw()
	}
}
