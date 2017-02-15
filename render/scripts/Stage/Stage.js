class StackElem {
	constructor(opt) {
		this.fun = opt.fun
		this.node = opt.node
		this.parent = opt.parent
		this.text = opt.text
	}

	update(frame) {
		this.fun(frame)
	}

	destroy() {
		if (this.node) {
			this.node.destroy()
		}

		this.parent.stack.splice( this.parent.stack.indexOf(this), 1)
		if (this.parent.notifyStack) {
			this.parent.notifyStack()
		}
	}

	toString() {
		return this.text
	}
}

class AdebrayStage {
	constructor (opt) {
		this.stage = opt.stage
		this.layer = opt.layer

		this.boolean = true
		this.stack = []
	}

	toggle() {
		this.boolean = !this.boolean
	}

	run() {
		this.loop = new Konva.Animation( (frame) => {
			if (this.boolean) {
				this.stack.forEach( (e) => {
					e.update(frame)
				})
				return true
			}
		}, this.layer)

		this.loop.start()
	}

	add(stackelem) {
		// console.log('add', stackelem)
		if (stackelem.node)
			this.layer.add(stackelem.node)

		stackelem.parent = this

		stackelem.time = 0
		this.stack.push(stackelem)
		if (this.notifyStack) {
			this.notifyStack()
		}
	}

	destroy() {
		this.stack.forEach( se => se.destroy() )
		this.loop.stop()
	}
}
