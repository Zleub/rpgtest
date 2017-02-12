function characterPromise(item) {
	return new Promise( (res, rej) => {
		item.callback = res
		new Character(item)
	})
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
	'update',
	'ready',
	'death'
]

class Character extends Abstract_Character {
	constructor(opt) {
		super(opt)

		this.attrs.experience = opt.experience || 0
		this.attrs.experience_max = Level_table[opt.lvl - 1 || 0]

		this.attrs.head = opt.head || {}
		this.attrs.body = opt.body || {}
		this.attrs.arm = opt.arm || {}
		this.attrs.left = opt.left || {}
		this.attrs.right = opt.right || {}

		this.attrs.rightproficiency = 1
		this.attrs.leftproficiency = 1

		this.attrs.weight = 1

		this.attrs.job = jobs[opt.class || 'Freelancer']
		this.attrs.jobpoints = Object.keys(jobs).reduce((p, e) => {
			p[e] = 0
			return p
		}, {})
		this.attrs.joblvls = Object.keys(jobs).reduce((p, e) => {
			p[e] = 1
			return p
		}, {})

		this.attrs.ready = false

		this.attrs.seed = new Seed({ size: 128 })
		this.attrs.tree = new Tree({ chance: opt.name })

		this.attrs.commands = Object.keys(jobs).reduce((p, e) => {
			return p
		}, {})


		/* -- */

		this.updateStats()
		window[opt.name] = this

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

		eventTable.forEach( (e) => {
			if (opt[e])
				this.on(e, opt[e](this))
		})

		opt.image = this.attrs.job.image
		makeImage( opt ).then( (e) => {
			e.x(0)
			e.y(0)
			this.add(e)
			this.character = e
			opt.callback(this)
		})
	}

	attachEventTable(et) {
		eventTable.forEach( (e) => {
			if (et[e]) {
				console.log('attaching ' + e)
				this.on(e, et[e](this))
			}
		})
	}

	changejob(jobname, callback) {
		this.attrs.job = jobs[jobname]
		console.log(this.attrs.job.image)
		makeImage({
			x: 0,
			y: 0,
			image: this.attrs.job.image,
			position: this.character.attrs._position
		}).then((e) => {
			e.x(0)
			e.y(0)
			this.character.destroy()
			this.add(e)
			this.character = e
			this.updateStats()
			if (callback)
				callback(this)
		})
	}

	update(incr) {
		this.actionJauge.fromNumber( this.actionJauge.toNumber() + incr * this.attrs.agility)

		if ( this.actionJauge.toNumber() > 60 ) {
			this.attrs.ready = true
			this.actionJauge.fromNumber(60)
			this.fire('ready')
		}

		// this.actionJauge.draw()
	}

	jobpoints(n) {
		if (n) {
			if ( (this.attrs.jobpoints[this.attrs.job.name] += n) > 99) {
				if ( (this.attrs.joblvls[this.attrs.job.name] += 1) > 99 )
					this.attrs.joblvls[this.attrs.job.name] = 99
				this.attrs.jobpoints[this.attrs.job.name] = 0
				this.updateStats()
			}
			this.fire('update')
		}
		else
			return this.attrs.jobpoints[this.attrs.job.name]
	}

	experience(n) {
		if (n) {
			if ( (this.attrs.experience += n) > this.attrs.experience_max ) {
				this.attrs.lvl += 1
				this.updateStats()
				this.attrs.experience = 0
				this.attrs.experience_max = Level_table[this.attrs.lvl - 1]
			}
			this.fire('update')
		}
		else
			return this.attrs.experience
	}

	purgeEvents() {
		eventTable.forEach((e) => {
			this.off(e)
		})
	}

	updateStats() {
			let lvl = this.attrs.lvl
			let stat = jobs[this.attrs.job.name].stats

			if (stat[lvl]){
				this.attrs.strength = stat[lvl][0]
				this.attrs.agility = stat[lvl][1]
				this.attrs.vitality = stat[lvl][2]
				this.attrs.intellect = stat[lvl][3]
				this.attrs.mind = stat[lvl][4]
			}
			else {
				let i = 1
				Object.keys(stat).reduce( (p, k) => {
					if (Number(k) < p)
						i = Number(k)
					return p
				}, lvl)
				this.attrs.strength = stat[i][0]
				this.attrs.agility = stat[i][1]
				this.attrs.vitality = stat[i][2]
				this.attrs.intellect = stat[i][3]
				this.attrs.mind = stat[i][4]
			}

			if (jobs[this.attrs.job.name].mps) {
				let lvl = this.attrs.joblvls[this.attrs.job.name]
				let mp = jobs[this.attrs.job.name].mps

				if (mp[lvl]) {
					this.attrs.mp = mp[lvl].map( x => x )
				}
				else {
					let i = 1
					Object.keys(stat).reduce( (p, k) => {
						if (Number(k) < p)
							i = Number(k)
						return p
					}, lvl)
					this.attrs.mp = mp[i].map( x => x )
				}
			}
			else {
				this.attrs.mp = undefined
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
}
