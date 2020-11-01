import { changeBgSlider } from './changeBgSlider';
import { Popup } from './popup';
import { validateForm } from './validateForm';
import '@babel/polyfill';

$(function () {
	// ---------burger-menu--------------
	let $burger = $('.site-header_menu-burger');
	let $nav = $('.site-header_nav');
	let $headerLink = $('.site-header_link');

	$burger.on('click touchend', function (e) {
		e.preventDefault();
		$burger.toggleClass('active');
		$nav.toggleClass('active');
		$('body').toggleClass('lock');
	});

	$headerLink.on('click touchend', function (e) {
		e.preventDefault();
		$burger.removeClass('active');
		$nav.removeClass('active');
		$('body').removeClass('lock');
	});

	// ------------change-bg-------------
	let $mainBg = $('.main_bg');
	let $firstScreenBg = $('.first-screen_bg');
	let timeBgChange = 5000;

	window.setInterval(() => changeBgSlider($mainBg, 'bg-active'), timeBgChange);
	window.setInterval(() => changeBgSlider($firstScreenBg, 'bg-active'), timeBgChange);

	//-------------header top-------------
	let $window = $(window);
	let $header = $('.header');
	$window.on('scroll', function() {
		if ($window.scrollTop() > 30) {
			$header.addClass('sticky-header');
		} else {
			$header.removeClass('sticky-header');
		}
	});

	// ------------smooth-nav-------------

	let $arrDown = $('.main_arr');
	let $nextSection = $('#what-is-ed');
	let timeScroll = 500;
	let $links = $('.navLink');

	$arrDown.on('click touchend', function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: $nextSection.offset().top
		}, timeScroll);
	});

	$links.on('click touchend', function(e) {
		e.preventDefault();
		let $target = $($(this).attr('href'));

		if ($target.length > 0) {
			$('html,body').animate({
				scrollTop: $target.offset().top
			}, timeScroll);
		}
	});
	// --------------slider-----------
	$('.slider-stars_main').owlCarousel({
		loop: true,
		nav: true,
		items: 1,
		autoHeight:true
	});

	// ------ popup-------------------
	let $btnForm = $('.main_btn');
	let $popup = $('.popup');
	let $popupOut = $('.popup_window');
	let formPopup = new Popup($popup);
	let $formBtn = $('.form_btn');
	let $form = $('.form');
	let $inputs = $('.form_line__input');
	let $btnClose = $('.popup_close');

// блокировка формы
	let newForm = false;

	function disableForm() {
		$formBtn.val('Заявка принята!');
		$formBtn.addClass('btn-disabled');
	}

	function updateForm() {
		if (newForm) {
			$formBtn.removeClass('btn-disabled');
			$formBtn.val('Хочу похудеть');
			newForm = false;
		}
	}
	
//открыть
	$btnForm.on('click touchend', function (e) {
		e.preventDefault();
		formPopup.open();
	});

//закрыть
	$popupOut.on('click touchend', function (e) {
		if ($(e.target).hasClass(this.className)) {
			formPopup.close();
			$inputs.val('').removeClass('err');
		}
	});

	$btnClose.on('click touchend', function (e) {
		if ($(e.target).hasClass(this.className)) {
			formPopup.close();
			$inputs.val('').removeClass('err');
		}
	});

//проверка
	$form.on('submit', function (e) {
		e.preventDefault();
		let result = validateForm($inputs);
		if (!result) {
			$inputs.val('');
			disableForm();
			setTimeout(() => {
				formPopup.close();
				newForm = true;
				updateForm();
			}, 800);
		}
	});

	$inputs.on('focusin', function() {
		$(this).removeClass('err');
	});

//события клавиатуры
	$popup.on('keydown', (e) => {
		if (e.key === 'Escape') {
			formPopup.close();
			$inputs.val('').removeClass('err');
		}
	})
	// ------ popup-------------------
});

