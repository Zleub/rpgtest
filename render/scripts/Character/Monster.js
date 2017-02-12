var __cmp = 0

class Monster extends Abstract_Character {
	constructor(opt) {
		super(opt)

		this.attrs.attack = Number(opt.attack)
		this.attrs.defense = Number(opt.defense)
		this.attrs.magic_defense = 1

		this.attrs.id = (__cmp++)

		this.attrs.rightproficiency = 1,
		this.attrs.leftproficiency = 1

		this.attrs.weight = 1

		this.attrs.xp = Number(opt.xp)

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

		opt.image = 'LPC/body/male/orc.png'
		opt.position = 'left'

		makeImage( opt ).then( (e) => {
			e.x(0)
			e.y(0)
			this.add(e)
			this.character = e

			if (opt.callback)
				opt.callback(this)
		})
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
		console.log(this.attrs.attack)
		return this.attrs.attack
	}

	defense() {
		return this.attrs.defense
	}

	joblvl() {
		return this.attrs.lvl
	}
}
