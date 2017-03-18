let harmonizer = new Harmonizer()
let divizer = []
for (let i = 0; i < 360; i += 10) {
	divizer.push(i)
}
let colors = harmonizer.harmonize('#801515', divizer)

let test_data = [
	(x, y) => Math.cos(x * x + y * y),
	(x, y) => Math.sin(x * x + y * y),
	// (x, y) => Math.tan(x * x + y * y),

	(x, y) => Math.cos(x * x - y * y),
	(x, y) => Math.sin(x * x - y * y),
	// (x, y) => Math.tan(x * x - y * y),

	// (x, y) => Math.cos(x * x * y * y),
	// (x, y) => Math.sin(x * x * y * y),
	// (x, y) => Math.tan(x * x * y * y),

	// (x, y) => Math.cos((x * x) / (y * y)),
	// (x, y) => Math.sin((x * x) / (y * y)),
	// (x, y) => Math.tan((x * x) / (y * y)),

	// (x, y) => Math.cos(x * y + x * y),
	// (x, y) => Math.sin(x * y + y * x),
	// (x, y) => Math.tan(x * y + y * x),

	// (x, y) => Math.cos(x * y - y * x),
	// (x, y) => Math.sin(x * y - y * x),
	// (x, y) => Math.tan(x * y - y * x),

	// (x, y) => Math.cos(x * y * y * x),
	// (x, y) => Math.sin(x * y * y * x),
	// (x, y) => Math.tan(x * y * y * x),

	// (x, y) => Math.cos((x * y) / (y * x)),
	// (x, y) => Math.sin((x * y) / (y * x)),
	// (x, y) => Math.tan((x * y) / (y * x)),
	// (x, y) =>
]

let get_color = (old) => {
	var color = colors[ Math.floor(Math.random() * colors.length) ]
	if (color == old)
		return get_color(old)
	else
		return color
}

Konva.Filters.Adebray = function (imageData) {
	var {width, height, data} = imageData
	var res = width / 10
	var f = test_data[Math.floor(Math.random() * test_data.length)]
	var color = get_color()
	var r = one.color(color).red() * 255
	var g = one.color(color).green() * 255
	var b = one.color(color).blue() * 255

	var w = width * 2
	var h = height * 2
	for (var x = -w; x < w; x += 4 * res) {
		for (var y = -h; y < h; y += 4 * res) {
			let c = Math.round( f(x + res * 2, y + res * 2) )
			for (var i = 0; i < res * 4; i += 4) {
				for (var j = 0; j < res * 4; j += 4) {
					let _x = x + i + w
					let _y = (y + j + h) * width

					data[_x + _y + 0] = r
					data[_x + _y + 1] = g
					data[_x + _y + 2] = b
					data[_x + _y + 3] = Math.abs(c * 255)
				}
			}
		}
	}

	var res = res / 4
	var {width, height, data} = imageData
	var f = test_data[Math.floor(Math.random() * test_data.length)]
	var color = get_color(color)
	var r = one.color(color).red() * 255
	var g = one.color(color).green() * 255
	var b = one.color(color).blue() * 255

	var w = width * 2
	var h = height * 2
	for (var x = -w; x < w; x += 4 * res) {
		for (var y = -h; y < h; y += 4 * res) {
			let c = Math.round( f(x + res * 2, y + res * 2) )
			for (var i = 0; i < res * 4; i += 4) {
				for (var j = 0; j < res * 4; j += 4) {
					let _x = x + i + w
					let _y = (y + j + h) * width

					if (data[_x + _y + 3] == 0) {
						data[_x + _y + 0] = r
						data[_x + _y + 1] = g
						data[_x + _y + 2] = b
						data[_x + _y + 3] = data[_x + _y + 3]
					}
				}
			}
		}
	}
}
