class Abstract_Character extends Konva.Group {
	constructor(opt) {
		super(opt)
	}

	changeImage(name) {
		let i = this.character.remove()
		console.log(i)
		this.character = new Konva.Image({
			_position: name,
			x: i.x(),
			y: i.y(),
			images: i.attrs.images,
			image: i.attrs.images[name]
		})
		this.add(this.character)
	}
}
