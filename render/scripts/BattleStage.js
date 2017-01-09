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
				this.teamA[i].mouseenter = (group) => (e) => {
					e.evt.preventDefault()
					e.evt.stopPropagation()
					e.cancelBubble = true

					group.children[0].show()
					// console.log('mouseenter', group )
				}
				this.teamA[i].mouseleave = (group) => (e) => {
					e.evt.preventDefault()
					e.evt.stopPropagation()
					e.cancelBubble = true

					if (group.lock == false)
						group.children[0].hide()
					// console.log('mouseleave', group )
				}
				this.teamA[i].click = (group) => (e) => {
					// this.
					e.evt.preventDefault()
					e.evt.stopPropagation()
					e.cancelBubble = true
					// console.log('click')
					let menu = document.querySelector('adebray-work')

					if (menu.selected.attrs) {
						menu.selected.lock = false
						menu.selected.children[0].hide()
					}

					menu.selected = group

					group.lock = true
				}
				this.teamA[i].ready = (group) => (e) => {
					let menu = document.querySelector('adebray-work')
					if (menu.selected == e.target) {
						menu.$.fight.disabled = false
						menu.$.item.disabled = false
					}
				}
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
				this.teamB[i].ready = (group) => (e) => {
					e.cancelBubble = true
					group.attrs.ready = false
					group.resetAction()
					if (this.layer.children.length > 3)
						makeAttack(this.layer, group, this.layer.children[getRandomInt(1, this.layer.children.length - 2)])
				}
				this.teamB[i].click = (group) => (e) => {
					// this.
					e.evt.preventDefault()
					e.evt.stopPropagation()
					e.cancelBubble = true
					// console.log('click')
					let menu = document.querySelector('adebray-work')

					if (menu.$.fight.focused && menu.selected.attrs.ready)
						makeAttack(this.layer, menu.selected, group)

				}
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
