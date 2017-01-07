class Character {
	constructor (opt) {
		let callback = opt.callback

		makeImage( opt.item ).then( (e) => {
			let group = new Konva.Group({
				lvl: 1,
				strength: 5,
				agility: 5,
				vitality: 5,
				intellect: 5,
				mind: 5,

				x: e.x(),
				y: e.y()
			})
			e.x(0)
			e.y(0)

			group.add(e)
			group.add(new Konva.Rect({
				y: -8,
				width: 64,
				height: 8,
				fill: 'grey'
			}))
			group.add(new Konva.Rect({
				x: 2,
				y: -6,
				width: 60,
				height: 4,
				fill: 'white'
			}))

			let jauge = new Konva.Rect({
				x: 2,
				y: -6,
				width: 0,
				height: 4,
				fill: 'darkred'
			})

			group.add(jauge)

			group.update = (incr) => {
				group.children[3].width( group.children[3].width() + incr * group.attrs.agility)
				if ( group.children[3].width() > 60 )
					group.children[3].width(60)
			}

			if (opt.item.click)
				group.on('click', opt.item.click(group))

			callback(group)
		})
	}
}
