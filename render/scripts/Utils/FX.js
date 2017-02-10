class FX {
	constructor(parent, layer, model, fun, quantity, duration) {
		this.duration = duration
		this.time = 0
		this.layer = layer
		this.fun = fun
		this.quantity = quantity
		this.stack = []
		this.parent = parent

		for (var i = 0; i < quantity; i++) {
			let c = model.clone()
			this.stack.push(c)
			this.layer.add(c)
		}
	}

	update(frame) {
		this.stack.forEach( this.fun(frame, this) )
		this.time += frame.timeDiff
		if (this.time > this.duration)
			this.destroy()
	}

	destroy() {
		this.stack.forEach( e => e.destroy() )
		this.parent.remove(this)
	}

	zero() {
		this.update({time: 0, timeDiff: 0})
		this.layer.draw()
	}
}

class FXPlayer {
	constructor(layer, model) {
		this.layer = layer
		this.stack = []
		this.model = model
	}

	create(quantity, model, fun) {
		this.stack.push( new FX(this, this.layer, model || this.model.clone(), fun, quantity))
	}

	remove(e) {
		if (this.stack.indexOf(e) != -1)
			this.stack.splice(this.stack.indexOf(e), 1)
	}

	update(frame) {
		this.stack.forEach( e => e.update(frame) )
	}

	zero() {
		this.update({time: 0, timeDiff: 0})
		this.layer.draw()
	}
}
