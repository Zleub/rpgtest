class AdebrayStage {
	constructor (opt) {
		this.stack = []
	}

	run() {
		let loop = new Konva.Animation( (frame) => {
			this.stack.forEach( (f) => f(frame))
			return true
		}, this.layer)

		loop.start()
	}

}
