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
				this.teamA[i].click = (group) => (e) => {
					// this.
					e.evt.preventDefault()
					e.evt.stopPropagation()
					e.cancelBubble = true
					// console.log('click')
					let menu = document.querySelector('adebray-work')
					menu.selected = group
				// 	menu.hidden = false
				// 	menu.x = e.evt.clientX
				// 	menu.y = 0e.evt.clientY
				}
				this.teamA[i].ready = (group) => (e) => {
					// this.
					// e.evt.preventDefault()
					// e.evt.stopPropagation()
					// e.cancelBubble = true
					// console.log('ready')
					e.target.attrs.ready = true
					let menu = document.querySelector('adebray-work')
					if (menu.selected == e.target) {
						menu.$.fight.disabled = false
						menu.$.item.disabled = false
					}
					// menu.selected = group
				// 	menu.hidden = false
				// 	menu.x = e.evt.clientX
				// 	menu.y = 0e.evt.clientY
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
				this.teamB[i].click = (group) => (e) => {
					// this.
					e.evt.preventDefault()
					e.evt.stopPropagation()
					e.cancelBubble = true
					// console.log('click')
					let menu = document.querySelector('adebray-work')

					if (menu.$.fight.focused && menu.selected.attrs.ready) {
						let player = menu.selected
						let hits = config.Number_of_Hits(menu.selected).left
						let hit_rate = config.Hit_Rate(menu.selected, group)
						let damages = config.Basic_Damage(menu.selected, group).left
						// console.log('hit_rate', hit_rate)

						let time = 0
						for (var i = 0; i < hits; i++) {
							setTimeout(() => {

								setTimeout( () => {
									// console.log('anim end')
									player.attackAnimation.stop()
									player.replace()
								}, 200)

								let t_config = {
								  x: group.x() + 32,
								  y: group.y() - 42,
								  text: damages,
								  fontSize: 30,
								  fontFamily: 'Calibri',
								  fill: 'green'
								}
								if ( hit_rate > getRandomInt(0, 100) ) {
									group.loseLife(damages)
									t_config.text = damages
									t_config.fill = 'green'
								}
								else {
									t_config.text = 'miss'
									t_config.fill = 'red'

								}

								var text = new Konva.Text(t_config)

								setTimeout( () => {
									text.destroy()
								}, 200)

								this.layer.add(text)


								// console.log('anim start')
								player.attackAnimation.start()

							}, time)
							time += 300
						}
						setTimeout( () => {
							player.attrs.ready = false
							player.resetAction()
						}, time)


					}
					// menu.selected = group
					// 	menu.hidden = false
					// 	menu.x = e.evt.clientX
					// 	menu.y = 0e.evt.clientY
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

		Promise.all(promises).then( _ => {
			_.forEach( e => this.layer.add(e) )

			this.stack.extend( this.layer.children.map( (e) => (_time) => {
				if (e.nodeType == 'Group') {
					e.update(1 / 60)
					this.layer.draw()
				}
			}))

			this.stack.extend([(_time) => {
				if (parseInt(_time.ticks / 60) > _time.time)
					_time.time = parseInt(_time.ticks / 60)
			}])

			this.layer.draw()
			opt.callback(this)
		})
	}

	update() {
		this.stack.forEach( (f) => f(this._time))
	}
}
