Array.prototype.extend = function (other_array) {
    other_array.forEach( (v) => this.push(v) )
}

cropImage = function (index, name) {
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
					array.push( this.cropImage(i, n) )
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
