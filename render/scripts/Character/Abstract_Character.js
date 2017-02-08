class Abstract_Character extends Konva.Group {
	constructor(opt) {
		super(opt)
	}

	changeImage(name) {
		let c = this.character
		let i = this.character.remove()

		this.character = new Konva.Image({
			_position: name,
			x: c.x(),
			y: c.y(),
			images: c.attrs.images,
			image: c.attrs.images[name]
		})
		this.add(this.character)
	}
}
