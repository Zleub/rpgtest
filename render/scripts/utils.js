function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.extend = function (other_array) {
    other_array.forEach( (v) => this.push(v) )
}

cropImage = function (e, index, name) {
	return new Promise( (res, rej) => {
		let container = document.createElement('div')
		let layer = new Konva.Layer()
		let stage = new Konva.Stage({
			container: container,
			width: 64,
			height: 64
		})

		stage.add(layer)
		layer.add( new Konva.Image({
			x: 0, y: 0,
			crop: {
				x: index * 64,
				y: 0,
				width: 512,
				height: 64
			},
			image: e.target
		}) )
		layer.draw()

		stage.toImage({
			callback: (e) => {
				localStorage.setItem(name, e.src)
				res(e)
			}
		})
	})
}

makeImage = function (item) {
	return new Promise( (res, rej) => {
		let imageObj = new Image();
		imageObj.onload = ((x, y) => (e) => {

			let name = e.target.src
			let array = []
			for (var i = 0; i < 8; i++) {

				let n = name.match('\\w://([\\w_/]+)')[1] + '/' + i
				if (!localStorage.getItem(n)) {
					array.push( this.cropImage(e, i, n) )
				}
				else {
					array.push( new Promise( (res, rej) => {
						let i = new Image()
						i.onload = (e) => res(e.target)
						i.src = localStorage.getItem(n)
					}))
				}

			}

			Promise.all(array).then( (_) => {
				let i = new Konva.Image({
					pos: item.position,
					x: x - _[item.position].width / 2,
					y: y - _[item.position].height / 2 - 32,
					images: _,
					image: _[item.position]
				})
				res(i)
			})

		})(item.x, item.y)

		imageObj.src = item.image
	})
}

make = function (item) {
	return new Promise( (res, rej) => {
		new Character({
			item,
			callback: res
		})

	})
}

makeAttack = function (layer, attacker, defender) {
	let player = attacker
	let target = defender
	let hits = config.Number_of_Hits(player).left
	let hit_rate = config.Hit_Rate(player, target)
	let damages = config.Basic_Damage(player, target).left

	let time = 0
	for (var i = 0; i < hits; i++) {
		setTimeout(() => {

			setTimeout( () => {
				// console.log('anim end')
				player.attackAnimation.stop()
				player.replace()
			}, 200)

			let t_config = {
			  x: target.x() + 32,
			  y: target.y() - 42,
			  text: damages,
			  fontSize: 30,
			  fontFamily: 'Calibri',
			  fill: 'green'
			}
			if ( hit_rate > getRandomInt(0, 100) ) {
				target.loseLife(damages)
				t_config.text = String(damages)
				if (damages <= 0)
					t_config.fill = 'grey'
				else
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

			layer.add(text)
			// console.log('anim start')
			player.attackAnimation.start()

		}, time)
		time += 300
	}

	// setTimeout( () => {
		player.attrs.ready = false
		player.resetAction()
	// }, 100)
}
