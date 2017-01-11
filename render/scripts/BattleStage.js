let Player_conf = {
	mouseenter : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		group.children[0].show()
		// console.log('mouseenter', group )
	},

	mouseleave : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		if (group.lock == false)
			group.children[0].hide()
		// console.log('mouseleave', group )
	},

	click : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')

		if (menu.selected.attrs) {
			menu.selected.lock = false
			menu.selected.children[0].hide()
		}

		menu.selected = group
		menu.selected.children[0].show()

		group.lock = true
	},

	ready : (group) => (e) => {
		let menu = document.querySelector('adebray-work')

		if (menu.selected == e.target) {
			menu.$.fight.disabled = false
			menu.$.item.disabled = false
		}

		let rand = getRandomInt(3, 5)
		let enemy = this.layer.children[rand]
		makeAttack(this.layer, group, enemy)
	}
}

let IA_conf = {
	ready : (group) => (e) => {
		e.cancelBubble = true

		group.attrs.ready = false
		group.resetAction()

		let rand = getRandomInt(1, 3)
		let enemy = this.layer.children[rand]
		makeAttack(this.layer, group, enemy)
	},
	click : (group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')
		if (menu.$.fight.focused && menu.selected.attrs.ready)
			makeAttack(this.layer, menu.selected, group)
	}
}

class BattleStage {
	constructor (opt) {
		this.layer = opt.layer

		this.teamA = opt.teamA
		this.teamB = opt.teamB

		var cmp = 0
		var step = 60
		var w = this.layer.width() / 2 - step
		var h = this.layer.height() / 2 + step
		var promises = []

		for (var i = 0; i < 8; i++) {
			if (this.teamA[i]) {
				this.teamA[i].x = w - cmp * step
				this.teamA[i].y = h + cmp * step

				Object.keys(Player_conf).forEach( k => {
					this.teamA[i][k] = Player_conf[k]
				})

				promises.push( make( this.teamA[i] ) )
			}

			cmp += 1
			if ( h + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w -= 120
			}
		}

		var cmp = 0
		var step = 60
		var w = this.layer.width() / 2 + step
		var h = this.layer.height() / 2 + step

		for (var i = 0; i < 8; i++) {

			if (this.teamB[i]) {
				this.teamB[i].x = w + cmp * step
				this.teamB[i].y = h + cmp * step

				Object.keys(IA_conf).forEach( k => {
					this.teamB[i][k] = IA_conf[k]
				})

				promises.push( make( this.teamB[i] ) )
			}

			cmp += 1
			if ( h + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w += 120
			}
		}

		this._time = {
			ticks: 0,
			time: 0
		}

		this.stack = [
			(_time) => _time.ticks += 1
		]

		let divisor = 10

		Promise.all(promises).then( _ => {
			_.forEach( e => this.layer.add(e) )

			this.stack.extend( this.layer.children.map( (e) => (_time) => {
				if (e.nodeType == 'Group') {
					e.update(1 / divisor)
					this.layer.draw()
				}
			}))

			this.stack.extend([(_time) => {
				if (parseInt(_time.ticks / divisor) > _time.time)
					_time.time = parseInt(_time.ticks / divisor)
			}])

			this.layer.draw()
			opt.callback(this)
		})
	}

	update() {
		this.stack.forEach( (f) => f(this._time))
	}
}
