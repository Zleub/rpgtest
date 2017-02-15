class FX {
	constructor(opt) {
		let {duration, layer, model, quantity, fun} = opt

		this.duration = duration
		this.time = 0
		this.fun = fun
		this.stack = []
		this.quantity = quantity
		this.model = model

		for (var i = 0; i < quantity; i++) {
			let c = this.model.clone()
			c.offsetX( -(opt.x) + opt.offsetX)
			c.offsetY( -(opt.y) + opt.offsetY)
			this.stack.push(c)
			layer.add(c)
		}

	}

	destroy() {
		this.stack.forEach( e => e.destroy() )
		this.parent.stack.splice( this.parent.stack.indexOf(this), 1)
	}

	update(frame) {
		this.stack.forEach( this.fun(frame, this) )
		this.time += frame.timeDiff
		if (this.time > this.duration)
			this.destroy()
	}

}
