class Abstract_Character extends Konva.Group {
	constructor(opt) {
		super({
			lvl: opt.lvl || 1,

			hp : Number(opt.hp) || 100,
			hp_max : Number(opt.hp) || 100,

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

	life(value) {
		if (value) {
			this.attrs.hp += value

			if (this.attrs.hp < 0) {
				this.fire('death')
				this.se.destroy()
				this.destroy()
			}
			if (this.attrs.hp > this.attrs.hp_max) {
				this.attrs.hp = this.attrs.hp_max
			}
			this.lifeJauge.fromPercent( this.attrs.hp / this.attrs.hp_max )

			this.fire('update')
		}
		else
			return this.attrs.hp
	}
}
