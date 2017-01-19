class Monster extends Konva.Group {
	constructor(opt) {
		super({
			x: opt.x,
			y: opt.y,
			_x: opt.x,
			_y: opt.y,

			lvl: opt.level || 1,
			strength: opt.strength || 5,
			agility: opt.agility || 5,
			vitality: opt.vitality || 5,
			intellect: opt.intellect || 5,
			mind: opt.mind || 5,

			hp: opt.hp,
			hp_max: opt.hp,

			attack: opt.attack,
			defense: opt.defense,
			magic_defense: 1,

			rightproficiency: 1,
			leftproficiency: 1,

			weight: 1,
		})

		this.actionJauge = new Jauge({
			color: 'darkblue',
			border: 'grey'
		})
		this.actionJauge.addTo(this)

		this.lifeJauge = new Jauge({
			color: 'darkred',
			y: 72
		})
		this.lifeJauge.addTo(this)
		this.lifeJauge.max()

		this.add(new Konva.Text({
			text: opt.name
		}))

		opt.image = './images2/combat_dummy/' + opt.name.toLowerCase() + '.png'
		opt.position = 2

		makeImage( opt ).then( (e) => {
			e.x(0)
			e.y(0)
			this.add(e)
			this.character = e

			if (opt.callback)
				opt.callback(this)
		})

	}

	replace() {
		this.x(this.attrs._x)
		this.y(this.attrs._y)
	}

	update(incr) {
		this.actionJauge.fromNumber( this.actionJauge.toNumber() + incr * this.attrs.agility )

		if ( this.actionJauge.toNumber() > 60 ) {
			this.attrs.ready = true
			this.actionJauge.fromNumber(60)
			this.fire('ready')
		}
	}

	attack() {
		return this.attrs.attack
	}

	defense() {
		return this.attrs.defense
	}

	joblvl() {
		return this.attrs.lvl
	}

	life(value) {
		if (value) {
			this.attrs.hp -= value

			this.lifeJauge.fromPercent( this.attrs.hp / this.attrs.hp_max )
			if (this.attrs.hp < 0) {
				this.fire('death')
				this.se.destroy()
				this.destroy()
			}

			this.fire('update')
		}
		else
			return this.attrs.hp
	}

}
