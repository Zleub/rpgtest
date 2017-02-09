class Abstract_Character extends Konva.Group {
	constructor(opt) {
		super({
			lvl: opt.lvl || 1,
			strength: opt.strength || 5,
			agility: opt.agility || 5,
			vitality: opt.vitality || 5,
			intellect: opt.intellect || 5,
			mind: opt.mind || 5,

			x: opt.x,
			y: opt.y,
			_x: opt.x,
			_y: opt.y,
		})
	}

	changeImage(name) {
		let c = this.character
		let i = this.character.remove()

		this.character = new Konva.Image({
			_position: name,
			x: c.x(),
			y: c.y(),
			images: c.attrs.images,
			image: c.attrs.images[name]
		})
		this.add(this.character)
	}

	replace() {
		this.x(this.attrs._x)
		this.y(this.attrs._y)
	}
}
