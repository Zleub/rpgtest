let test_data = [
	(x, y) => Math.cos(x * x + y * y),
	// (x, y) => Math.sin(x * x + y * y),
	// (x, y) => Math.tan(x * x + y * y),
	// (x, y) => Math.sin(x ^ 2 + y),
]

let test = function (imageData) {
	let res = 10
	let {width, height, data} = imageData
	let f = test_data[Math.floor(Math.random() * test_data.length)]

	let w = width * 2
	let h = height * 2
	for (var x = -w; x < w; x += 4 * res) {
		for (var y = -h; y < h; y += 4 * res) {
			let c = Math.round( f(x, y) )
			if (c > 0) {
				for (var i = 0; i < res * 4; i += 4) {
					for (var j = 0; j < res * 4; j += 4) {
						let _x = x + i + w
						let _y = (y + j + h) * width

						console.log(Math.atan( y / x ))
						console.log(one.color(`hsla(${Math.atan( y / x )}, 75%, 75%, .1)`).red())
						data[_x + _y] = 0
						data[_x + _y + 1] = 0
						data[_x + _y + 2] = 0
						data[_x + _y + 3] = 255
					}
				}
			}
		}
	}
}
