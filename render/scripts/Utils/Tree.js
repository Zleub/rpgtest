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
	k = k.match(/\w+/)[0]
	e = e.toLowerCase()
	return `${k}.${e}`
}))
let test = flatted(Magic).concat( flatted({
	"Combat": {
		// "Bare Hands": null,
		// "Harp": null,
		"Bow": null,
		"Other": null
	}
}))

test = [].concat.apply([], test)
console.log(test.length)
let harmonizer = new Harmonizer()
let p = []
for (let i = 0; i < 360; i += 360 / test.length) {
	p.push( parseInt(i) )
}
console.log(p)
let h = harmonizer.harmonize('#c820f1', p)
// let colors = Object.keys(Magic).concat(['Combat']).map( e => {
let colors = test.map( (e, i) => {
	let dot = document.createElement('color-dot')
	dot.customStyle['--custom-color'] = h[i]
	dot.text = e
	// this.$.head.appendChild(dot)
	return {
		text: e,
		color: dot.customStyle['--custom-color']
	}
})

console.log('toto')
class Tree extends Konva.Group {
	constructor(opt) {
		super(opt)

		this.size = 32
		this.stack = []
		this.chance = new Chance(opt.chance);
		this.add( new Konva.Rect({
			x: 0,
			y: 0,
			offsetX: this.size / 2,
			offsetY: this.size / 2,
			width: this.size,
			height: this.size,
			fill: 'black'
		}))

		this.populate(0, 0)
	}

	populate(x, y, prev_size) {
		for (var i = 0; i < 4; i++) {
			let p = (Math.PI * 2) / 4 * i

			let size = tmp_table[ this.chance.integer({min: 0, max: 99}) ] * this.size

			let sub_size = (Math.max(size, prev_size))
			let _size
			if (sub_size)
				_size = sub_size * 2
			else
				_size = this.size * 2

			let c = x + Math.round( Math.cos(p) * _size)
			let s = y - Math.round( Math.sin(p) * _size)
			if (this.children.filter( _ => c == _.x() && s == _.y()).length == 0
				&& this.stack.filter( _ => c == _.x() && s == _.y()).length == 0) {
				let cl = colors[ chance.integer({min:0, max: colors.length - 1}) ]

				this.stack.push(new Konva.Rect({
					x: c,
					y: s,
					offsetX: (size) / 2,
					offsetY: (size) / 2,
					width: size,
					height: size,
					fill: cl.color || 'blue'
				}))
				this.stack.push(new Konva.Line({
					points: [x, y, c, s],
					stroke: 'black',
					tension: 1
				}))
			}
		}
	}

	levelup() {
		let s = this.stack
		this.stack = []

		s.forEach( e => {
			this.add(e)
			if (e instanceof Konva.Line)
				e.moveToBottom()
			this.populate(e.x(), e.y(), e.width())
		})
	}
}
