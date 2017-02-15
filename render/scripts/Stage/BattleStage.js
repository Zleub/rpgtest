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

		let targets = {
			'Ally': (battlestage.teamA.indexOf(group) != -1 ? battlestage.teamA : battlestage.teamB),
			'Foe': (battlestage.teamA.indexOf(group) == -1 ? battlestage.teamA : battlestage.teamB),
			'Any': battlestage.teamA.concat(battlestage.teamB),
			'Self': [group],
			'Party Leader': undefined
		}

		let res
		let g = group.attrs.gambits.find( e => {

			let m = e.condition.match(/highest\s*(\w+)/)
			if (m && m[1]) {
				targets[e.target].forEach( e => {
					if (!res)
						res = e
					else if (res.attrs[m[1]] < e.attrs[m[1]])
						res = e
				})
				if (res)
					return true
			}

			m = e.condition.match(/lowest\s*(\w+)/)
			if (m && m[1]) {
				targets[e.target].forEach( e => {
					if (!res)
						res = e
					else if (res.attrs[m[1]] > e.attrs[m[1]])
						res = e
				})
				if (res)
					return true
			}

			m = e.condition.match(/(\w+)\s*<\s*(\w+)/)
			if (m && m[1] && m[2]) {
				res = targets[e.target].find( e => {
					if ( (e.attrs[m[1]] / e.attrs[`${m[1]}_max`]) * 100 <= m[2])
						return true
				})
				if (res)
					return true
			}

			m = e.condition.match(/(\w+)\s*>\s*(\w+)/)
			if (m && m[1] && m[2]) {
				res = targets[e.target].find( e => {
					if ( (e.attrs[m[1]] / e.attrs[`${m[1]}_max`]) * 100 >= m[2])
						return true
				})
				if (res)
					return true
			}
		})

		if (!g) {
			console.log('no Gambit')
			return
		}

		// console.log(g, res)

		if (res && g.action == 'Attack')
			makeAttack(battlestage, group, res)

		if ( res && isHealingMagic(g.action) )
		{
			let m = isHealingMagic(g.action)
			makeHealingMagic(battlestage, group, res, g.action)
		}
		if ( res && isOffensiveMagic(g.action) )
		{
			let m = isOffensiveMagic(g.action)
			makeOffensiveMagic(battlestage, group, res, g.action)
		}

		// battlestage.boolean = false
		// let rand = getRandomInt(battlestage.players + 1, battlestage.players + 2)
		// let enemy = battlestage.layer.children[rand]
		// if (enemy instanceof Monster)
	},

	death : (battlestage, group) => (e) => {
		console.log(battlestage.teamA.length)
		console.log(battlestage.teamA.indexOf(group))
		battlestage.teamA.splice(battlestage.teamA.indexOf(group), 1)
		if (battlestage.teamA.length <= 0) {
			// battlestage.teamA.forEach( e => {
				// console.log('BattleEnd')
			// })
			battlestage.report()
		}
	}
}

let IA_conf = {
	ready : (battlestage, group) => (e) => {
		e.cancelBubble = true

		group.attrs.ready = false
		group.actionJauge.reset()

		let rand = Math.floor( Math.abs(Math.random() * battlestage.teamA.length - 1))
		// console.log(rand)
		let enemy = battlestage.teamA[rand]
		console.log(rand, enemy)
		makeAttack(battlestage, group, enemy)
	},
	click : (battlestage, group) => (e) => {
		e.evt.preventDefault()
		e.evt.stopPropagation()
		e.cancelBubble = true

		let menu = document.querySelector('adebray-work')
		console.log('got something to work on')
		// if (menu.$.fight.focused && menu.selected.attrs.ready)
			// makeAttack(battlestage, menu.selected, group)
	},
	death : (battlestage, group) => (e) => {
		battlestage.teamB.splice(battlestage.teamB.indexOf(group), 1)
		battlestage.teamA.forEach( _ => _.experience(e.target.attrs.xp))
		if (battlestage.teamB.length <= 0) {
			// battlestage.teamA.forEach( e => {
				// console.log('BattleEnd')
			// })
			battlestage.report()
		}
	}
}

class BattleStage extends AdebrayStage {
	constructor (opt) {
		super(opt)

		this.teamA = opt.teamA
		this.teamB = opt.teamB

		this.report = () => {
			opt.report.addEventListener('iron-overlay-closed', () => {
				this.teamA.forEach(e => {
					e.remove()
					e.purgeEvents()
				})
				this.destroy()
				opt.callback_end()
			})
			if (document.querySelector('#autofight').checked)
				setTimeout( () => opt.report.toggle(), 1000)
			opt.report.toggle()
		}

		this.notifyStack = opt.notifyStack

		var cmp = 0
		var step = 50
		var w = this.layer.width() / 2 - step
		var h = this.layer.height() / 2 + step
		var promises = []

		this.players = 0
		for (var i = 0; i < 8; i++) {
			if (this.teamA[i]) {
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
			if (e instanceof Abstract_Character) {
				let se = new StackElem({
					text: `update ${e.attrs.name} + ${e.attrs.id}`,
					fun: (frame) => {
						if (e.nodeType == 'Group') {
							e.update(frame.timeDiff / 300)
						}
					}
				})
				e.se = se
				this.add( se )
			}
		})

		// 	console.log(this.stack.length)

		this.layer.draw()
		opt.callback(this)
		// })
	}
}
