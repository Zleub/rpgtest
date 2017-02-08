let Player_conf = {
	mouseenter : (battlestage, group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		group.selectionRect.show()
		group.getParent().draw()
		// console.log('mouseenter', group )
	},

	mouseleave : (battlestage, group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		if (group.lock == false)
			group.selectionRect.hide()
		group.getParent().draw()
		// console.log('mouseleave', group )
	},

	click : (battlestage, group) => (e) => {
		console.log('test')
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')

		if (menu.selected.attrs) {
			menu.selected.lock = false
			menu.selected.selectionRect.hide()
			group.getParent().draw()
		}

		menu.selected = group
		menu.selected.selectionRect.show()
		group.getParent().draw()

		group.lock = true
	},

	update: (battlestage, group) => (e) => {
		if (document.querySelector('adebray-work').selected === group)
		{
			document.querySelector('adebray-work').set('selected', {})
			document.querySelector('adebray-work').set('selected', group)
		}
	},

	ready : (battlestage, group) => (e) => {
		let menu = document.querySelector('adebray-work')

		if (!menu)
			return

		if (menu.selected == e.target) {
			// menu.$.fight.disabled = false
			// menu.$.item.disabled = false
		}

		let rand = getRandomInt(battlestage.players + 1, battlestage.players + 2)
		let enemy = battlestage.layer.children[rand]
		if (enemy instanceof Monster)
			makeAttack(battlestage, group, enemy)
	},

	death : (battlestage, group) => (e) => {
		console.log(battlestage.teamB.length)
		console.log(battlestage.teamB.indexOf(group))
	}
}

let IA_conf = {
	ready : (battlestage, group) => (e) => {
		e.cancelBubble = true

		group.attrs.ready = false
		group.actionJauge.reset()

		let rand = getRandomInt(1, battlestage.players)
		let enemy = battlestage.layer.children[rand]
		makeAttack(battlestage, group, enemy)
	},
	click : (battlestage, group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')
		if (menu.$.fight.focused && menu.selected.attrs.ready)
			makeAttack(battlestage, menu.selected, group)
	},
	death : (battlestage, group) => (e) => {
		battlestage.teamB.splice(battlestage.teamB.indexOf(group), 1)
		battlestage.teamA.forEach( e => e.experience(3) )
		if (battlestage.teamB.length <= 0) {
			battlestage.teamA.forEach( e => {
				console.log('BattleEnd')
			})
			battlestage.report()
			// setTimeout(battlestage.end, 700)
		}
	}
}

class BattleStage extends AdebrayStage {
	constructor (opt) {
		super(opt)

		this.teamA = opt.teamA
		this.teamB = opt.teamB

		this.end = () => {
			this.teamA.forEach(e => e.purgeEvents())
			this.destroy()
			opt.callback_end()
		}

		this.report = () => {
			opt.report.addEventListener('iron-overlay-closed', () => {
				this.end()
			})
			opt.report.toggle()
		}

		var cmp = 0
		var step = 50
		var w = this.layer.width() / 2 - step
		var h = this.layer.height() / 2 + step
		var promises = []

		this.players = 0
		for (var i = 0; i < 8; i++) {
			if (this.teamA[i]) {
				console.log(this.teamA[i])
				this.teamA[i].x(w - cmp * step)
				this.teamA[i].y(h + cmp * step)


				this.teamA[i].attrs._x = w - cmp * step
				this.teamA[i].attrs._y = h + cmp * step

				Object.keys(Player_conf).map( k => {
					this.teamA[i].on(k, Player_conf[k](this, this.teamA[i]))
				})
				this.players += 1
			}

			cmp += 1
			if ( h + 32 + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w -= 120
			}
		}

		var cmp = 0
		var step = 50
		var w = this.layer.width() / 2 + step
		var h = this.layer.height() / 2 + step

		for (var i = 0; i < 8; i++) {

			if (this.teamB[i]) {
				this.teamB[i].x(w + cmp * step)
				this.teamB[i].y(h + cmp * step)

				this.teamB[i].attrs._x = w + cmp * step
				this.teamB[i].attrs._y = h + cmp * step

				Object.keys(IA_conf).map( k => this.teamB[i].on(k, IA_conf[k](this, this.teamB[i])))
			}

			cmp += 1
			if ( h + 32 + (cmp + 1) * step > this.layer.height() ) {
				cmp = 0
				w += 120
			}
		}

		this._time = {
			ticks: 0,
			time: 0
		}

		let divisor = 20

		// Promise.all(promises).then( _ => {
		this.teamA.forEach( e => {
			this.layer.add(e)
		})
		this.teamB.forEach( e => {
			this.layer.add(e)
		})

		this.layer.children.forEach( (e) => {
			let se = new StackElem({
				fun: (frame) => {
					if (e.nodeType == 'Group') {
						e.update(frame.timeDiff / 300)
					}
				}
			})
			e.se = se
			this.add( se )
		})

		// 	console.log(this.stack.length)

		this.layer.draw()
		opt.callback(this)
		// })
	}
}
