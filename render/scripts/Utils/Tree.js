let c_table = {
	0: 60,
	1: 35,
	2: 5
}
if ( Object.keys(c_table).reduce( (p, k) => {
	return (p += c_table[k])
}, 0) != 100)
	console.error('wrong space')

let tmp_table = {}
let j = parseInt( Object.keys(c_table)[0] )
for (let i = 0; i < 100; i++) {
	tmp_table[i] = j
	c_table[j] -= 1
	if (c_table[j] == 0)
		j += 1
}

let flatted = (o) => Object.keys(o).map( k => Object.keys(o[k]).map( e => {
	// k = k.match(/\w+/)[0]
	// e = e.toLowerCase()
	return {
		category: k,
		command: e
	}
}))

let skills = flatted(Magic).concat( flatted({
	"Combat": {
		// "Bare Hands": null,
		// "Harp": null,
		"Bow": null,
		"Other": null
	}
}))

skills = [].concat.apply([], skills)
let harmonizer = new Harmonizer()
let p = []
for (let i = 0; i < 360; i += 360 / skills.length) {
	p.push( parseInt(i) )
}

let h = harmonizer.harmonize('#c820f1', p)
// let colors = Object.keys(Magic).concat(['Combat']).map( e => {

let colors = skills.map( (e, i) => {
	let dot = document.createElement('color-dot')
	dot.customStyle['--custom-color'] = h[i]
	dot.text = e
	// this.$.head.appendChild(dot)
	return {
		text: e,
		color: dot.customStyle['--custom-color']
	}
})

let makeSkills = (o, i) => Object.keys(o).concat().reduce( (p, k) => {
   p[k] = Object.keys(o[k]).reduce((p, e) => {
		if (o[k][e])
			p[e] = Object.keys(o[k][e])
		else
			p[e] = null
	   return p
   }, {})
   return p
}, i || {})

let __bonus = {
	'Combat': {
		'Bow': [ 'Strength', 'Agility' ],
		'Other': [ 'Strength' ],
	},
	'Healing Magic': {
		'Summon': [ 'Mind', 'Intellect' ],
		'White Magic': [ 'Mind', 'Intellect' ]
	},
	'Offensive Magic': {
		'Black Magic': [ 'Mind', 'Intellect' ],
		'Summon': [ 'Mind', 'Intellect' ],
		'White Magic': [ 'Mind', 'Intellect' ]
	}
}

let treeTemplate = (category, command, bonus, color, size) => {
	if (color == 'lightgrey')
		return `
				<paper-item>[${category}] ${command}</paper-item>
				<paper-item>Bonus: ${bonus}</paper-item>
				<paper-icon-button id='${size}' icon=add></paper-icon-button>
			`
	else
		return `
			<paper-item>[${category}] ${command}</paper-item>
			<paper-item>Bonus: ${bonus}</paper-item>
		`

}

class Tree extends Konva.Group {
	constructor(opt) {
		super(opt)

		this.level = -1
		this.size = 32
		this.stack = []

		this.skills = makeSkills(Magic, makeSkills({
			"Combat": {
				// "Bare Hands": null,
				// "Harp": null,
				"Bow": null,
				"Other": null
			}
		}))

		if (opt)
			this.chance = new Chance(opt.chance)
		else
			this.chance = new Chance()

		this.dialog = opt.dialog

		let r = new Konva.Rect({
			x: 0,
			y: 0,
			offsetX: this.size / 2,
			offsetY: this.size / 2,
			width: this.size,
			height: this.size,
			fill: 'black'
		})

		r.on('click', (e) => {
			this.dialog.innerHTML = `<paper-item>Core [${this.level + 1}]</paper-item>
				<paper-icon-button id=coreup icon=add></paper-icon-button>
			`
		})

		this.add(r)
		this.populate(0, 0)
		this.levelup()
	}

	colorize(id) {
		this.children.forEach( e => {
			if (e._id == id) {
				e.fill(e.attrs.info.color)
				console.dir(e)
				e.off('click')
				e.on('click', () => {
					this.dialog.bonus = {
						category: e.attrs.info.category,
						command: e.attrs.info.command,
						bonus: e.attrs.bonus,
						node: e._id
					}
					this.dialog.innerHTML = treeTemplate(e.attrs.info.category, e.attrs.info.command, e.attrs.bonus)
				})
			}
		})
		this.draw()
	}

	populate(x, y, prev_size) {
		[
			{
				x: (prev_size || this.size) * 2,
				y: 0
			},
			{
				x: -(prev_size || this.size) * 2,
				y: 0
			},
			{
				x: 0,
				y: (prev_size || this.size) * 2
			},
			{
				x: 0,
				y: -(prev_size || this.size) * 2
			}
		].forEach( ({x : _x, y : _y}) => {
			let size = tmp_table[ this.chance.integer({min: 0, max: 99}) ] * this.size

			let c = x + _x
			let s = y + _y
			let pred = (_) => c == _.attrs.x && s == _.attrs.y
			if ( (this.children.filter( pred ).length == 0 && this.stack.filter( pred ).length == 0) ) {
				let cl = colors[ this.chance.integer({min:0, max: colors.length - 1}) ]
				let {category, command} = cl.text

				let bonus = ''
				let __size
				if (size == this.size * 2) {
					__size = 'bigup'
					if( this.skills[category][command] )
						bonus += this.skills[category][command].shift()
					else {
						let r = Math.abs( Math.round(Math.random() * (__bonus[category][command].length - 1)) )
						bonus += __bonus[category][command][r]
					}
				}
				else if (size == this.size * 1) {
					__size = 'treeup'
					let r = Math.abs( Math.round(Math.random() * (__bonus[category][command].length - 1)) )
					bonus += __bonus[category][command][r]
				}

				let r = new Konva.Rect({
					x: c,
					y: s,
					offsetX: size / 2,
					offsetY: size / 2,
					width: size,
					height: size,
					fill: 'lightgrey',
					info: {
						category: category,
						command: command,
						size: __size,
						color: cl.color
					},
					bonus: bonus
				})
				r.on('click', (e) => {
					this.dialog.bonus = {
						category: e.target.attrs.info.category,
						command: e.target.attrs.info.command,
						bonus: e.target.attrs.bonus || '__UNDEFINED__',
						node: e.target._id
					}

					this.dialog.innerHTML = treeTemplate(
						e.target.attrs.info.category,
						e.target.attrs.info.command,
						e.target.attrs.bonus,
						e.target.attrs.fill,
						e.target.attrs.info.size
					)
				})

				this.stack.push(r)

				this.stack.push(new Konva.Line({
					points: [x, y, c, s],
					stroke: 'black',
					tension: 1
				}))
			}
		})
	}

	levelup() {
		this.level += 1

		let s = this.stack
		this.stack = []

		s.forEach( e => {
			this.add(e)
		})

		s.forEach( e => {
			if (e instanceof Konva.Line)
				e.moveToBottom()
			else if (e instanceof Konva.Rect)
				this.populate(e.attrs.x, e.attrs.y, e.attrs.width)
		})
	}
}
