function Convolution(opt) {
	this.matrix = opt.matrix
	this.src = opt.src
	this.offset = opt.offset
	this.divisor = opt.divisor

	this.m = Math.floor(this.matrix.length / 2)

	this.apply = function () {
		let matrix = this.matrix
		let divisor = this.divisor
		let offset = this.offset
		let m = Math.floor(this.matrix.length / 2)

		let d = []
		let f = function (imageData) {
			let {width, height, data} = imageData

			for (var y = 0; y < height * 4; y += 4) {
				for (var x = 0; x < width * 4; x += 4) {

					let r = 0
					let g = 0
					let b = 0
					let a = 0
					matrix.forEach( (e, h) => {
						e.forEach( (e, w) => {
							let _x = x + (w - m) * 4
							let _y = (y * width + (h - m) * 4)

							r += (data[_x + _y + 0]) * e
							g += (data[_x + _y + 1]) * e
							b += (data[_x + _y + 2]) * e
						})
					})

					let _x = x
					let _y = y * width
					//

					d[_x + _y + 0] = (r / divisor) + offset
					d[_x + _y + 1] = (g / divisor) + offset
					d[_x + _y + 2] = (b / divisor) + offset
					d[_x + _y + 3] = 255
				}
			}
			// console.log(d)

			d.forEach( (e, i) => {
				data[i] = e
			})
		}

		this.layer.cache()
		this.layer.filters([f])
		this.layer.draw()
	}

	this.toImage = function () {
		return new Promise( (res, rej) => {
			this.stage.toImage({ callback: res })
		})
	}
}
