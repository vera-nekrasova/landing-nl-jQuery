function changeBgSlider(arrBg, classActive) {
	arrBg.each(function (i, el){
		let $el = $(el);
		if ($el.hasClass(classActive)) {
			if (i == (arrBg.length - 1)) {
				updateTransition($el, $(arrBg[0]), classActive);
				return false;
			} else {
				updateTransition($el, $(arrBg[i + 1]), classActive);
				return false;
			}
		};
	});
}
	
function updateTransition(act, disact, classActive) {
	act.removeClass(classActive);
	disact.addClass(classActive);
}

export { changeBgSlider }