class FX {
	constructor(layer, model, fun, quantity) {
		this.layer = layer
		this.fun = fun
		this.quantity = quantity
		this.stack = []
		for (var i = 0; i < quantity; i++) {
			let c = model.clone()
			this.stack.push(c)
			this.layer.add(c)
		}
	}

	update(frame) {
		this.stack.forEach(this.fun(frame, this.quantity))
	}
}

class FXPlayer {
	constructor(layer, model) {
		this.layer = layer
		this.stack = []
		this.model = model
	}

	create(quantity, fun) {
		this.stack.push( new FX(this.layer, this.model.clone(), fun, quantity))
	}

	update(frame) {
		this.stack.forEach( e => e.update(frame) )
	}
}
