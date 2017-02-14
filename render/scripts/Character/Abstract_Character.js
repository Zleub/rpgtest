class Statistic {
	constructor(value) {
		this.value = value
		this.bonus = 0
	}

	set(value) {
		this.value = value
	}

	add(value) {
		this.bonus += value
	}
}

class Abstract_Character extends Konva.Group {
	constructor(opt) {
		super({
			name: opt.name,

			gambits: [],
			lvl: opt.lvl || 1,

			hp : Number(opt.hp) || 100,
			hp_max : Number(opt.hp) || 100,

			strength: new Statistic(opt.strength || 5),
			agility: new Statistic(opt.agility || 5),
			vitality: new Statistic(opt.vitality || 5),
			intellect: new Statistic(opt.intellect || 5),
			mind: new Statistic(opt.mind || 5),

			x: opt.x,
			y: opt.y,
			_x: opt.x,
			_y: opt.y,
		})
	}

	strength() { return this.attrs.strength.value + this.attrs.strength.bonus }
	agility() { return this.attrs.agility.value + this.attrs.agility.bonus }
	vitality() { return this.attrs.vitality.value + this.attrs.vitality.bonus }
	intellect() { return this.attrs.intellect.value + this.attrs.intellect.bonus }
	mind() { return this.attrs.mind.value + this.attrs.mind.bonus }

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
				return
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
