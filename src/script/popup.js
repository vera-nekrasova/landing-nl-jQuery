class Popup {
	constructor(block) {
		this.block = block;
	}

	open () {
		this.block.addClass('active-popup');
		$('body').addClass('lock');
	}

	close() {
		this.block.removeClass('active-popup');
		$('body').removeClass('lock');
	}
}

export { Popup }