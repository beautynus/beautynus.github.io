/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	//style
	// import Swiper from './swiper.jquery.umd.min.js'; //swiper jquery plugin
	// import dev, { menuList } from './dev.js'; //개발용 스크립트 프로덕션시 삭제
	
	
	var win = window,
	    doc = document;
	
	//ui 관련 공통 스크립트
	win.ui = window.ui || {
	
		//유틸 메서드
		util: {
			// 빈 함수 클릭시 오류 방지
			commonNothing: function commonNothing() {}
	
			// 양쪽 여백 제거
			, trim: function trim(str) {
				if (str == null || typeof str == 'undefined') return "";
				return str.replace(/^\s+|\s+$/g, "");
			},
			isDevice: function isDevice() {
				//모바일 UA
				var ua = navigator.userAgent;
				return {
					check: function check() {
						if (this.android) {
							if (this.gingerbread) return 'gingerbread';else return 'android';
						}
						if (this.ios) return 'ios';
						if (!this.android && !this.ios) return 'no-mobile';
					},
					ios: ua.match('iPhone') ? true : false,
					android: ua.match('Android') ? true : false,
					gingerbread: ua.match('Android 2.3') ? true : false
				};
			}
		}
	
		// 공통 메서드
		, common: {
	
			// a태그의 href 값이 # 일경우 commonNothing()으로 대체
			emptyLinkFunc: function emptyLinkFunc() {
				//a태그 href에 더미 함수 삽입
				var allA = doc.querySelectorAll('a'),
				    aTag = null,
				    href = null;
				for (var i = 0, length = allA.length; i < length; i++) {
					aTag = allA[i];
					href = aTag.getAttribute('href');
					if (ui.util.trim(href) == '#' || href == null) aTag.setAttribute('href', 'javascript:ui.util.commonNothing();');
				}
			}
	
			// toggleClass custom
			, toggleclass: function toggleclass() {}
	
			// 테이블 스크롤 시 양쪽 어느쪽이든 한쪽 끝에 도달 할 경우 bg생성
			, tableFade: function tableFade() {
				var _scope = $('.js-fadein-wrap');
				if (_scope.length <= 0) return;
				$('.js-fadein-wrap').each(function () {
					var $this = $(this);
					$this.find('.js-fadein-scroll').on('scroll', function (e) {
						var _target = e.target;
						if (_target.scrollWidth - _target.clientWidth <= _target.scrollLeft + 20) {
							$this.removeClass('on');
						} else {
							$this.addClass('on');
						}
					});
				});
			}
	
			// 그룹 토글
			, toggleGroup: function toggleGroup(group, element) {
				$(group).find(element).on('click', function () {
					$(group).find(element).removeClass('active');
					$(this).addClass('active');
				});
			}
		}
	};
	
	/*************************************************
		beautynus method group
	**************************************************/
	(function ($) {
		'use strict';
	
		var util = ui.util,
		    common = ui.common;
	
		var beautynus = beautynus || {};
	
		// 뷰티컨텐츠 카드뉴스형
		var cardNews = {
			_scope: '',
	
			defaultOptions: {
				direction: 'horizontal',
				loop: true,
				pagination: '.swiper-pagination',
				paginationType: 'fraction'
			},
	
			init: function init(scope, options) {
				this._scope = scope;
				var assign = typeof Object.assign == 'undefined' ? $.extend : Object.assign; //assign 함수 존재 여부 체크, 없으면 $.extend로 대체
				options = typeof options == 'undefined' ? this.defaultOptions : assign({}, this.defaultOptions, options); //options 매개변수가 undefined 일 경우를 체크하여 오류 방지
				this.swiper(options);
			},
	
			swiper: function swiper(options) {
				$(this._scope).data('manager', new Swiper(this._scope, options));
			},
	
			manager: function manager() {
				return $(this._scope).data('manager');
			}
	
		};
		beautynus.cardNews = cardNews;
	
		var accordian = {
			_scope: '',
			init: function init(_scope) {
				if (typeof _scope == 'undefined') this._scope = '.accordian';else this._scope = _scope;
				this.click();
			},
			click: function click() {
				$(this._scope).on('click', '.title a', function () {
					var item = $(this).parents('.item');
					if (item.hasClass('active')) item.removeClass('active');else item.addClass('active').siblings('.item').removeClass('active');
					$(window).scrollTop(item.position().top);
				});
			}
		};
		beautynus.accordian = accordian;
	
		// 뷰티컨텐츠 동상상형
	
		window.beautynus = beautynus;
	})($);
	
	//DOM 로드후 실행
	$(function () {
	
		var util = ui.util,
		    common = ui.common,
		    isDevice = util.isDevice();
	
		common.emptyLinkFunc();
		common.tableFade();
		$('body').addClass(isDevice.check());
	
		beautynus.accordian.init('.accordian');
	
		//개발용 메서드 실행
		if (location.href.indexOf('?dev') > -1) {
			dev.appendMenuList();
			dev.appendMenuBtn();
		}
	});
	
	/*
	*	Image preloader (c) yikl1004@gmail.com, 2016.11
	*/
	window.imagePreloader = function () {
		var images = [],
		    i = 0;
		for (; i < arguments.length; i += 1) {
			images[i] = new Image();
			images[i].src = arguments[i];
		}
		for (i = 0; i < images.length; i += 1) {
			(function (j) {
				images[j].addEventListener('load', function () {
					console.log(++j + '번째 이미지 로드 완료');
				}, false);
			})(i);
		}
	};
	
	/*
	* VideoPlayer (c) yikl100@gmail.com, 2016.11
	*/
	window.VideoPlayer = function (wrapper) {
		this.wrapper = document.querySelector(wrapper);
		this.video = null, this.lowRes = $(wrapper).find('[data-res=low]').get(0);
		this.highRes = $(wrapper).find('[data-res=high]').get(0);
		this.playFlag = true;
		this.curTime = 0;
		this.controlTimer = null;
		this.poster = this.wrapper.querySelector('.poster');
		this.control = this.wrapper.querySelector('.control');
		this.bg = this.control.querySelector('.bg');
		this.playBtn = this.control.querySelector('button.play');
		this.pauseBtn = this.control.querySelector('button.pause');
		this.videoTime = this.control.querySelector('.running-time');
		this.timeline = this.control.querySelector('.timeline');
		this.fullBtn = this.control.querySelector('.full');
		this.startTime = this.timeline.querySelector('.current');
		this.endTime = this.timeline.querySelector('.end');
		this.seekbar = this.control.querySelector('.seekbar');
		this.btnGroup = $(this.control).find('.btn-group');
		this.activeBtn = this.btnGroup.find('button.active');
	
		this.posterLoaded();
		this.getDuration();
		this._init();
	};
	
	VideoPlayer.prototype._init = function () {
		var that = this;
		that.playBtn.addEventListener('click', function () {
			that._play();
		}, false);
	};
	
	VideoPlayer.prototype._play = function () {
		var that = this;
	
		if (that.playFlag) {
			that.playFlag = false;
			$(that.control).hide();
			if (that.video == null) that.resolutionChoice();
	
			that._onPlay();
			that._onPause();
			that._onTimeUpdate();
			that._click();
			that._fullscrrenMode();
			that._pause();
			that.makeSeekbar();
			that.controlEvent();
			that.dimmClick();
		}
		that.playPause();
	};
	
	VideoPlayer.prototype._onPlay = function () {
		var that = this;
		that.video.onplay = function () {
			$(that.poster).hide();
			$(that.pauseBtn).show();
			$(that.playBtn).hide();
			if (this.currentTime != 0) that.controlVisibling(true);
		};
	};
	
	VideoPlayer.prototype._onPause = function () {
		var that = this;
		that.video.onpause = function () {
			$(that.control).show();
			$(that.pauseBtn).hide();
			$(that.playBtn).show();
			if (this.currentTime > 0) that.btnGroup.hide();
			that.controlVisibling(false);
		};
	};
	
	VideoPlayer.prototype.getRatio = function (x, y, l) {
		var that = this;
		var target = 0;
		target = Math.round(y * l / x);
		return target;
	};
	
	VideoPlayer.prototype.getDuration = function () {
		var that = this;
		var video = $(that.wrapper).find('video:visible').eq(0).get(0);
		var timer = setInterval(function () {
			if (video.readyState > 0) {
				var duration = Math.round(video.duration),
				    s = '',
				    m = '';
				s = (duration % 60).toString(), m = ((duration - s) / 60).toString();
				s = s.length < 2 ? 0 + s : s;
				m = m.length < 2 ? 0 + m : m;
				that.videoTime.innerText = m + ':' + s;
				that.endTime.innerText = m + ':' + s;
				clearInterval(timer);
			}
			that.allocateSize(video);
		}, 500);
	};
	
	VideoPlayer.prototype.allocateSize = function (v) {
		var that = this,
		    wrapper = that.wrapper;
		wrapper.style.height = that.getRatio(v.videoWidth, v.videoHeight, v.clientWidth) + 'px';
	};
	
	VideoPlayer.prototype._onTimeUpdate = function () {
		var that = this;
		that.video.ontimeupdate = function () {
			if (that.video.paused) return;
			that.getCurrentTime('seek');
		};
	};
	
	VideoPlayer.prototype._click = function () {
		var that = this;
		$(that.video).on('click', function () {
			that.btnGroup.hide();
			$(that.timeline).show();
			$(that.control).addClass('remove-time').show();
			that.controlVisibling(true);
		});
	};
	
	VideoPlayer.prototype._pause = function () {
		var that = this;
		$(that.pauseBtn).on('click', function () {
			that.curTime = that.video.currentTime;
			that.playPause();
			$(that.playBtn).show();
			$(this).hide();
		});
	};
	
	VideoPlayer.prototype.dimmClick = function () {
		var that = this;
		$(that.bg).on('click', function () {
			$(that.control).hide();
			that.controlVisibling(false);
		});
	};
	
	VideoPlayer.prototype.controlEvent = function () {
		var that = this;
		$(that.control).on({
			'mousdown touchstart': function mousdownTouchstart() {
				// that.controlVisibling(false);
			},
			'mouseup touchend touchcancel': function mouseupTouchendTouchcancel() {
				// that.controlVisibling(true);
			}
		});
	};
	
	VideoPlayer.prototype.makeSeekbar = function () {
		var that = this;
		console.log(that.video);
		$(that.wrapper.querySelector('.seekbar')).slider({
			range: 'min',
			// max: duration,
			slide: function slide(event, ui) {
				that.video.pause();
				that.getCurrentTime();
				that.changeCurrentTime(ui);
			},
			change: function change(event, ui) {
				that.video.play();
			}
		});
	};
	
	VideoPlayer.prototype._fullscrrenMode = function () {
		var that = this,
		    v = that.video;
		$(that.fullBtn).on('click', function () {
			console.log(v);
			if (ui.util.isDevice().ios) {
				if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysInline == true) v.webkitPlaysInline = false;
				if (typeof v.playsInline !== 'undefined' && v.playsinline == true) v.playsInline = true;else if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysinline == true) v.webkitPlaysInline = true;
			}
			if (v.requestFullscreen) v.requestFullscreen();
			// else if (v.mozRequestFullScreen)
			//  v.mozRequestFullScreen();
			else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
		});
	};
	
	VideoPlayer.prototype.resolutionChoice = function () {
		var that = this,
		    btnGroup = this.btnGroup,
		    lowRes = this.lowRes,
		    highRes = this.highRes;
		if (btnGroup.find('button.active').hasClass('low')) {
			$(lowRes).show().attr('data-play', 'true');
			$(highRes).hide().attr('data-play', 'false');
			that.video = $(lowRes).get(0);
		} else {
			$(lowRes).hide().attr('data-play', 'false');
			$(highRes).show().attr('data-play', 'true');
			that.video = $(highRes).get(0);
		}
	};
	
	VideoPlayer.prototype.changeCurrentTime = function (ui) {
		var that = this;
		var v = $('video:visible').get(0);
		v.currentTime = parseInt(v.duration * (ui.value / 100), 10);
	};
	
	VideoPlayer.prototype.getCurrentTime = function (seek) {
		var that = this,
		    video = that.video;
		var s,
		    m,
		    ct = Math.round(video.currentTime),
		    dur = Math.round(video.duration);
		if (ct < 60) {
			m = '00';
			s = ct.toString().length < 2 ? '0' + ct.toString() : ct;
		} else {
			s = parseInt(ct % 60), m = parseInt((ct - s) / 60);
			s = s.toString().length < 2 ? '0' + s : s;
			m = m.toString().length < 2 ? '0' + m : m;
		}
		that.startTime.innerText = m + ':' + s;
		if (seek == 'seek') {
			$('.seekbar').slider({
				value: parseInt(100 / dur * ct)
			});
		}
	};
	
	VideoPlayer.prototype.controlVisibling = function (ctrl) {
		var that = this;
		if (ctrl) {
			that.controlTimer = setTimeout(function () {
				$(that.control).hide();
			}, 2000);
		} else {
			clearTimeout(that.controlTimer);
		}
	};
	
	VideoPlayer.prototype.playPause = function () {
		var v = this.video;
		if (v.paused) v.play();else v.pause();
	};
	
	VideoPlayer.prototype.posterLoaded = function () {
		var that = this,
		    bg = "",
		    el = that.poster.querySelector('.img'),
		    src = '';
		// bg = el.style.backgroundImage;
		bg = el.dataset.bg;
		// src = bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
	
		var image = document.createElement('img');
		image.src = bg;
		image.addEventListener('load', function () {
			el.setAttribute('style', "background-image: url(" + bg + ");");
			el.className += ' active';
		}, false);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGIyZGFhYTY3MDVmN2M4ZTE0YWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiY29tbW9uIiwiZW1wdHlMaW5rRnVuYyIsImFsbEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYVRhZyIsImhyZWYiLCJpIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCIkIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwicGFyZW50cyIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlUHJlbG9hZGVyIiwiaW1hZ2VzIiwiYXJndW1lbnRzIiwiSW1hZ2UiLCJzcmMiLCJqIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJxdWVyeVNlbGVjdG9yIiwidmlkZW8iLCJsb3dSZXMiLCJnZXQiLCJoaWdoUmVzIiwicGxheUZsYWciLCJjdXJUaW1lIiwiY29udHJvbFRpbWVyIiwicG9zdGVyIiwiY29udHJvbCIsImJnIiwicGxheUJ0biIsInBhdXNlQnRuIiwidmlkZW9UaW1lIiwidGltZWxpbmUiLCJmdWxsQnRuIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInNlZWtiYXIiLCJidG5Hcm91cCIsImFjdGl2ZUJ0biIsInBvc3RlckxvYWRlZCIsImdldER1cmF0aW9uIiwiX2luaXQiLCJwcm90b3R5cGUiLCJ0aGF0IiwiX3BsYXkiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsInBsYXlQYXVzZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBhdXNlIiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwiZHVyYXRpb24iLCJzIiwibSIsInRvU3RyaW5nIiwiaW5uZXJUZXh0IiwiY2xlYXJJbnRlcnZhbCIsImFsbG9jYXRlU2l6ZSIsInYiLCJzdHlsZSIsImhlaWdodCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwic2xpZGVyIiwicmFuZ2UiLCJzbGlkZSIsImV2ZW50IiwicGF1c2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsImNoYW5nZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJhdHRyIiwicGFyc2VJbnQiLCJ2YWx1ZSIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZWwiLCJkYXRhc2V0IiwiaW1hZ2UiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDckNBOztBQUE4QjtBQUM5QjtBQUNBOzs7QUFLQSxLQUFJQSxNQUFNQyxNQUFWO0FBQUEsS0FDQ0MsTUFBTUMsUUFEUDs7QUFHQTtBQUNBSCxLQUFJSSxFQUFKLEdBQVNILE9BQU9HLEVBQVAsSUFBYTs7QUFFckI7QUFDQUMsUUFBTTtBQUNMO0FBQ0FDLGtCQUFlLHlCQUFVLENBQUU7O0FBRTNCO0FBSkssS0FLSkMsTUFBTSxjQUFVQyxHQUFWLEVBQWdCO0FBQ3RCLFFBQUlBLE9BQU8sSUFBUCxJQUFlLE9BQU9BLEdBQVAsSUFBYyxXQUFqQyxFQUE4QyxPQUFPLEVBQVA7QUFDOUMsV0FBT0EsSUFBSUMsT0FBSixDQUFZLFlBQVosRUFBMEIsRUFBMUIsQ0FBUDtBQUNBLElBUkk7QUFTTEMsYUFBVSxvQkFBVTtBQUNuQjtBQUNBLFFBQUlDLEtBQUtDLFVBQVVDLFNBQW5CO0FBQ0Es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U0FBU3VMLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBRCxRQUFNdEcsR0FBTixHQUFZaUIsRUFBWjtBQUNBcUYsUUFBTXBHLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFlBQVk7QUFDMUNrRyxNQUFHM0osWUFBSCxDQUFnQixPQUFoQixFQUF5QiwyQkFBMkJ3RSxFQUEzQixHQUFnQyxJQUF6RDtBQUNBbUYsTUFBR0ksU0FBSCxJQUFnQixTQUFoQjtBQUNBLEdBSEQsRUFHRyxLQUhIO0FBSUEsRUFmRCxDOzs7Ozs7QUM5Y0EsMEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZGIyZGFhYTY3MDVmN2M4ZTE0YWNcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuXHRkb2MgPSBkb2N1bWVudDtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuXHQvL+ycoO2LuCDrqZTshJzrk5xcblx0dXRpbDoge1xuXHRcdC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4Bcblx0XHRjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpe31cblxuXHRcdC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG5cdFx0LHRyaW06IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHRcdH1cblx0LGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuXHQgIC8v66qo67CU7J28IFVBXG5cdCAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0ICByZXR1cm4ge1xuXHRcdGNoZWNrOiBmdW5jdGlvbigpIHtcblx0XHQgIGlmICggdGhpcy5hbmRyb2lkICkge1xuXHRcdFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcblx0XHRcdFx0ZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcblx0XHRcdGlmICggIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MgKSByZXR1cm4gJ25vLW1vYmlsZSc7XG5cdFx0fSxcblx0XHRpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuXHQgIH1cblx0fVxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0XHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcblx0ICB2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG5cdCAgaWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0Ly8g6re466O5IO2GoOq4gFxuXHQsdG9nZ2xlR3JvdXAgOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCl7XG5cdCAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHQgIH0pO1xuXHR9XG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcblx0X3Njb3BlOiAnJ1xuXG5cdCxkZWZhdWx0T3B0aW9uczoge1xuXHQgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHQgIGxvb3A6IHRydWUsXG5cdCAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG5cdCAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcblx0fVxuXG5cdCxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG5cdCAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblx0ICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG5cdCAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHQgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuXHR9XG5cblx0LHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdCAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0fVxuXG5cdCxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuXHQgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG5cdH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuXHRfc2NvcGU6ICcnXG5cdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG5cdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcblx0XHRlbHNlIFxuXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG5cdFx0dGhpcy5jbGljaygpO1xuXHR9XG5cdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG5cdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG5cdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb24sXG5cdCAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXHQkKCdib2R5JykuYWRkQ2xhc3MoIGlzRGV2aWNlLmNoZWNrKCkgKTtcblxuXHRiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuXHQvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG5cdGlmICggbG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSApIHtcblx0XHRkZXYuYXBwZW5kTWVudUxpc3QoKTtcblx0XHRkZXYuYXBwZW5kTWVudUJ0bigpO1xuXHR9XG59KTtcblxuLypcbipcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4qL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBpbWFnZXMgPSBbXSxcblx0XHRpID0gMDtcblx0Zm9yICggOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSs9MSApIHtcblx0XHRpbWFnZXNbaV0gPSBuZXcgSW1hZ2UoKTtcblx0XHRpbWFnZXNbaV0uc3JjID0gYXJndW1lbnRzW2ldO1xuXHR9XG5cdGZvciAoIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSs9MSApIHtcblx0XHQoZnVuY3Rpb24oail7XG5cdFx0XHRpbWFnZXNbal0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCsraiArICfrsojsp7gg7J2066+47KeAIOuhnOuTnCDsmYTro4wnKTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9KShpKVxuXHR9XG59O1xuXG4vKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTYuMTFcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbih3cmFwcGVyKSB7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdyYXBwZXIpO1xuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9bG93XScpLmdldCgwKTtcblx0dGhpcy5oaWdoUmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWhpZ2hdJykuZ2V0KDApO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAwO1xuXHR0aGlzLmNvbnRyb2xUaW1lciBcdD0gbnVsbDtcblx0dGhpcy5wb3N0ZXIgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5wb3N0ZXInKTtcblx0dGhpcy5jb250cm9sIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpO1xuXHR0aGlzLmJnIFx0XHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5iZycpO1xuXHR0aGlzLnBsYXlCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wbGF5Jyk7XG5cdHRoaXMucGF1c2VCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wYXVzZScpO1xuXHR0aGlzLnZpZGVvVGltZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnJ1bm5pbmctdGltZScpO1xuXHR0aGlzLnRpbWVsaW5lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcblx0dGhpcy5mdWxsQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuZnVsbCcpO1xuXHR0aGlzLnN0YXJ0VGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50Jyk7XG5cdHRoaXMuZW5kVGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5lbmQnKTtcblx0dGhpcy5zZWVrYmFyIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpO1xuXHR0aGlzLmJ0bkdyb3VwIFx0XHQ9ICQodGhpcy5jb250cm9sKS5maW5kKCcuYnRuLWdyb3VwJyk7XG5cdHRoaXMuYWN0aXZlQnRuIFx0XHQ9IHRoaXMuYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpO1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuZ2V0RHVyYXRpb24oKTtcblx0dGhpcy5faW5pdCgpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCAgdGhhdC5fcGxheSgpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgaWYgKCB0aGF0LnBsYXlGbGFnICkge1xuXHQgIHRoYXQucGxheUZsYWcgPSBmYWxzZTtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHQgIGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cblx0ICB0aGF0Ll9vblBsYXkoKTtcblx0ICB0aGF0Ll9vblBhdXNlKCk7XG5cdCAgdGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdCAgdGhhdC5fY2xpY2soKTtcblx0ICB0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHQgIHRoYXQuX3BhdXNlKCk7XG5cdCAgdGhhdC5tYWtlU2Vla2JhcigpO1xuXHQgIHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdCAgdGhhdC5kaW1tQ2xpY2soKTtcblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5wb3N0ZXIpLmhpZGUoKTtcblx0JCh0aGF0LnBhdXNlQnRuKS5zaG93KCk7XG5cdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcblx0JCh0aGF0LnBhdXNlQnRuKS5oaWRlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cdFx0fVxuXHRcdHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG4gIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuXHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjb25zb2xlLmxvZyh0aGF0LnZpZGVvKTtcbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0ICB0aGF0LnZpZGVvLnBhdXNlKCk7XG5cdCAgdGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHQgIHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHQgIHRoYXQudmlkZW8ucGxheSgpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRjb25zb2xlLmxvZyh2KTtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0Ly8gZWxzZSBpZiAodi5tb3pSZXF1ZXN0RnVsbFNjcmVlbilcblx0Ly8gIHYubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQoaGlnaFJlcykuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuXHR9IGVsc2Uge1xuXHRcdCQobG93UmVzKS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHR0aGF0LnZpZGVvID0gJChoaWdoUmVzKS5nZXQoMCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHYgPSAkKCd2aWRlbzp2aXNpYmxlJykuZ2V0KDApO1xuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuICB2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG4gIGlmICggY3QgPCA2MCApIHtcblx0bSA9ICcwMCc7XG5cdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG4gIH0gZWxzZSB7XG5cdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuICB9XG4gIHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuICBpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdCAgdmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0fSk7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB2ID0gdGhpcy52aWRlbztcblx0aWYgKCB2LnBhdXNlZCApIHYucGxheSgpO1xuXHRlbHNlIHYucGF1c2UoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0Ly8gYmcgPSBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U7XG5cdGJnID0gZWwuZGF0YXNldC5iZztcblx0Ly8gc3JjID0gYmcucmVwbGFjZSgvdXJsXFwoWydcIl0/KC4qPylbJ1wiXT9cXCkvaSwgXCIkMVwiKTtcblxuXHR2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0aW1hZ2Uuc3JjID0gYmc7XG5cdGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgYmcgKyBcIik7XCIpO1xuXHRcdGVsLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG5cdH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=