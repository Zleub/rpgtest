let Map = (f) => (x, y, width, height) => {
	let m = []

	for (var i = x - width / 2; i < x + width / 2; i++) {
		for (var j = y - height / 2; j < y + height / 2; j++) {
			let x = Math.abs(i / width)
			let y = Math.abs(j / height)
			m.push( f(x, y) )
		}
	}

	console.log(m)
	return (x, y) => m[x % width + (y % height) * height]
}
