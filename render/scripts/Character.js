function characterPromise(item) {
	return new Promise( (res, rej) => {
		item.callback = res
		new Character(item)
	})
}

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
}

let eventTable = [
	// konva
	'mouseover',
	'mousemove',
	'mouseout',
	'mouseenter',
	'mouseleave',
	'mousedown',
	'mouseup',
	'wheel',
	'click',
	'dblclick',
	'touchstart',
	'touchmove',
	'touchend',
	'tap',
	'dbltap',
	'dragstart',
	'dragmove',
	'dragend',

	// adebray
	'ready',
]

class Character extends Konva.Group {
	constructor(opt) {
		super({
			lvl: opt.lvl || 1,
			strength: opt.strength || 5,
			agility: opt.agility || getRandomInt(2, 6),
			vitality: opt.vitality || 5,
			intellect: opt.intellect || 5,
			mind: opt.mind || 5,

			hp: opt.hp || 100,
			hp_max: opt.hp_max || 100,

			head: opt.head || {},
			body: opt.body || {},
			arm: opt.arm || {},
			left: opt.left || {},
			right: opt.right || {},

			rightproficiency: 1,
			leftproficiency: 1,

			weight: 1,

			job: jobs[opt.class || 'Freelancer'],
			jobpoints: 0,
			joblvls: Object.keys(jobs).reduce((p, e) => {
				p[e] = 1
				return p
			}, {}),

			ready: false,

			x: opt.x,
			_x: opt.x,
			y: opt.y,
			_y: opt.y
		})

		this.lock = false
		this.add( this.selectionRect = new Konva.Rect({
			width: 64,
			height: 64,
			stroke: 'black'
		}) )
		this.selectionRect.hide()

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

		this.manaJauge = new Jauge({
			color: 'darkgreen',
			y: 76
		})
		this.manaJauge.addTo(this)
		this.manaJauge.max()

		eventTable.forEach( (e) => {
			if (opt[e])
				this.on(e, opt[e](this))
		})

		makeImage( opt ).then( (e) => {
			e.x(0)
			e.y(0)
			this.add(e)
			this.character = e
			opt.callback(this)
		})
	}

	update(incr) {
		this.actionJauge.fromNumber( this.actionJauge.toNumber() + incr * this.attrs.agility)

		if ( this.actionJauge.toNumber() > 60 ) {
			this.attrs.ready = true
			this.actionJauge.fromNumber(60)
			this.fire('ready')
		}
	}

	joblvl() {
		return this.attrs.joblvls[this.attrs.job.name]
	}

	attack() {
		let a = 1

		if (this.attrs.left.attack)
			a += this.attrs.left.attack
		if (this.attrs.right.attack)
			a += this.attrs.right.attack

		return a
	}
	defense() {
		let a = 1

		if (this.attrs.left.defense)
			a += this.attrs.left.defense
		if (this.attrs.right.defense)
			a += this.attrs.right.defense
		if (this.attrs.head.defense)
			a += this.attrs.head.defense
		if (this.attrs.body.defense)
			a += this.attrs.body.defense
		if (this.attrs.arm.defense)
			a += this.attrs.arm.defense

		return a
	}
	magic_defense() {
		let a = 1

		if (this.attrs.left.magic_defense)
			a += this.attrs.left.magic_defense
		if (this.attrs.right.magic_defense)
			a += this.attrs.right.magic_defense
		if (this.attrs.head.magic_defense)
			a += this.attrs.head.magic_defense
		if (this.attrs.body.magic_defense)
			a += this.attrs.body.magic_defense
		if (this.attrs.arm.magic_defense)
			a += this.attrs.arm.magic_defense

		return a
	}

	life(value) {
		this.attrs.hp -= value

		this.lifeJauge.fromPercent( this.attrs.hp / this.attrs.hp_max )
		if (this.attrs.hp < 0)
			this.destroy()
	}

	replace() {
		this.x(this.attrs._x)
		this.y(this.attrs._y)
	}
}
