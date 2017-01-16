class StackElem {
	constructor(opt) {
		this.fun = opt.fun
		this.node = opt.node
		this.parent = opt.parent
	}

	destroy() {
		if (this.node) {
			this.node.destroy()
		}
		this.parent.splice( this.parent.indexOf(this), 1)
	}
}

class AdebrayStage {
	constructor (opt) {
		this.layer = opt.layer

		this.boolean = true
		this.stack = []
	}

	toggle() {
		this.boolean = !this.boolean
	}

	run() {
		let loop = new Konva.Animation( (frame) => {
			if (this.boolean) {
				this.stack.forEach( (e) => e.fun(frame))
				return true
			}
		}, this.layer)

		loop.start()
	}

	add(stackelem) {
		if (stackelem.node)
			this.layer.add(stackelem.node)

		stackelem.time = 0
		stackelem.parent = this.stack
		this.stack.push(stackelem)
	}
}
