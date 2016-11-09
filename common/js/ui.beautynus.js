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
		src = bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
	
		var image = document.createElement('img');
		image.src = src;
		image.addEventListener('load', function () {
			// console.log('video poster LOADED!');
			var posterImg = that.poster.querySelector('.img');
			console.dir(posterImg.style);
			posterImg.style.backgroundImage = 'url("' + posterImg.dataset.bg + '");';
		}, false);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzM5Y2NiN2M5NmFkOGRjOWVhNTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiY29tbW9uIiwiZW1wdHlMaW5rRnVuYyIsImFsbEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYVRhZyIsImhyZWYiLCJpIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCIkIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwicGFyZW50cyIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlUHJlbG9hZGVyIiwiaW1hZ2VzIiwiYXJndW1lbnRzIiwiSW1hZ2UiLCJzcmMiLCJqIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJxdWVyeVNlbGVjdG9yIiwidmlkZW8iLCJsb3dSZXMiLCJnZXQiLCJoaWdoUmVzIiwicGxheUZsYWciLCJjdXJUaW1lIiwiY29udHJvbFRpbWVyIiwicG9zdGVyIiwiY29udHJvbCIsImJnIiwicGxheUJ0biIsInBhdXNlQnRuIiwidmlkZW9UaW1lIiwidGltZWxpbmUiLCJmdWxsQnRuIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInNlZWtiYXIiLCJidG5Hcm91cCIsImFjdGl2ZUJ0biIsInBvc3RlckxvYWRlZCIsImdldER1cmF0aW9uIiwiX2luaXQiLCJwcm90b3R5cGUiLCJ0aGF0IiwiX3BsYXkiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsInBsYXlQYXVzZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBhdXNlIiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwiZHVyYXRpb24iLCJzIiwibSIsInRvU3RyaW5nIiwiaW5uZXJUZXh0IiwiY2xlYXJJbnRlcnZhbCIsImFsbG9jYXRlU2l6ZSIsInYiLCJzdHlsZSIsImhlaWdodCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwic2xpZGVyIiwicmFuZ2UiLCJzbGlkZSIsImV2ZW50IiwicGF1c2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsImNoYW5nZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJhdHRyIiwicGFyc2VJbnQiLCJ2YWx1ZSIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZWwiLCJkYXRhc2V0IiwiaW1hZ2UiLCJjcmVhdGVFbGVtZW50IiwicG9zdGVySW1nIiwiZGlyIiwiYmFja2dyb3VuZEltYWdlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDckNBOztBQUE4QjtBQUM5QjtBQUNBOzs7QUFLQSxLQUFJQSxNQUFNQyxNQUFWO0FBQUEsS0FDQ0MsTUFBTUMsUUFEUDs7QUFHQTtBQUNBSCxLQUFJSSxFQUFKLEdBQVNILE9BQU9HLEVBQVAsSUFBYTs7QUFFckI7QUFDQUMsUUFBTTtBQUNMO0FBQ0FDLGtCQUFlLHlCQUFVLENBQUU7O0FBRTNCO0FBSkssS0FLSkMsTUFBTSxjQUFVQyxHQUFWLEVBQWdCO0FBQ3RCLFFBQUlBLE9BQU8sSUFBUCxJQUFlLE9BQU9BLEdBQVAsSUFBYyxXQUFqQyxFQUE4QyxPQUFPLEVBQVA7QUFDOUMsV0FBT0EsSUFBSUMsT0FBSixDQUFZLFlBQVosRUFBMEIsRUFBMUIsQ0FBUDtBQUNBLElBUkk7QUFTTEMsYUFBVSxvQkFBVTtBQUNuQjtBQUNBLFFBQUlD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QUNBakIsUUFBTWlCLEdBQUczRixPQUFILENBQVcseUJBQVgsRUFBc0MsSUFBdEMsQ0FBTjs7QUFFQSxNQUFJZ0wsUUFBUXRMLFNBQVN1TCxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQUQsUUFBTXRHLEdBQU4sR0FBWUEsR0FBWjtBQUNBc0csUUFBTXBHLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFlBQVk7QUFDMUM7QUFDQSxPQUFJc0csWUFBWXhFLEtBQUtqQixNQUFMLENBQVlSLGFBQVosQ0FBMEIsTUFBMUIsQ0FBaEI7QUFDQUosV0FBUXNHLEdBQVIsQ0FBWUQsVUFBVW5DLEtBQXRCO0FBQ0FtQyxhQUFVbkMsS0FBVixDQUFnQnFDLGVBQWhCLEdBQWtDLFVBQVVGLFVBQVVILE9BQVYsQ0FBa0JwRixFQUE1QixHQUFpQyxLQUFuRTtBQUNBLEdBTEQsRUFLRyxLQUxIO0FBTUEsRUFqQkQsQzs7Ozs7O0FDOWNBLDBDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMzOWNjYjdjOTZhZDhkYzllYTUzXG4gKiovIiwiXG5pbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG4vLyBpbXBvcnQgU3dpcGVyIGZyb20gJy4vc3dpcGVyLmpxdWVyeS51bWQubWluLmpzJzsgLy9zd2lwZXIganF1ZXJ5IHBsdWdpblxuLy8gaW1wb3J0IGRldiwgeyBtZW51TGlzdCB9IGZyb20gJy4vZGV2LmpzJzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcblxuXG5cblxudmFyIHdpbiA9IHdpbmRvdyxcblx0ZG9jID0gZG9jdW1lbnQ7XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cblx0Ly/snKDti7gg66mU7ISc65OcXG5cdHV0aWw6IHtcblx0XHQvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG5cdFx0Y29tbW9uTm90aGluZzogZnVuY3Rpb24oKXt9XG5cblx0XHQvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuXHRcdCx0cmltOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9XG5cdCxpc0RldmljZTogZnVuY3Rpb24oKXtcblx0ICAvL+uqqOuwlOydvCBVQVxuXHQgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdCAgcmV0dXJuIHtcblx0XHRjaGVjazogZnVuY3Rpb24oKSB7XG5cdFx0ICBpZiAoIHRoaXMuYW5kcm9pZCApIHtcblx0XHRcdFx0aWYgKCB0aGlzLmdpbmdlcmJyZWFkICkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG5cdFx0XHRcdGVsc2UgcmV0dXJuICdhbmRyb2lkJztcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5pb3MgKSByZXR1cm4gJ2lvcyc7XG5cdFx0XHRpZiAoICF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zICkgcmV0dXJuICduby1tb2JpbGUnO1xuXHRcdH0sXG5cdFx0aW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0YW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2Vcblx0ICB9XG5cdH1cblx0fVxuXG5cdC8vIOqzte2GtSDrqZTshJzrk5xcblx0LGNvbW1vbjoge1xuXG5cdFx0Ly8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG5cdFx0ZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuXHRcdFx0dmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLCBhVGFnID0gbnVsbCwgaHJlZiA9IG51bGw7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGFUYWcgPSBhbGxBW2ldO1xuXHRcdFx0XHRocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKCB1aS51dGlsLnRyaW0oIGhyZWYgKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsIClcblx0XHRcdFx0XHRhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuXHRcdCx0b2dnbGVjbGFzczogZnVuY3Rpb24oKXtcblxuXHRcdH1cblxuXHRcdC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuXHRcdCx0YWJsZUZhZGU6IGZ1bmN0aW9uKCl7XG5cdCAgdmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuXHQgIGlmICggX3Njb3BlLmxlbmd0aCA8PSAwICkgcmV0dXJuO1xuXHRcdFx0JCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0aWYoICggX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkgKXtcblx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH0gIGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdC8vIOq3uOujuSDthqDquIBcblx0LHRvZ2dsZUdyb3VwIDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpe1xuXHQgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHQkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0ICB9KTtcblx0fVxuXHR9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKXtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIHV0aWwgPSB1aS51dGlsLFxuXHQgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICB2YXIgY2FyZE5ld3MgPSB7XG5cdF9zY29wZTogJydcblxuXHQsZGVmYXVsdE9wdGlvbnM6IHtcblx0ICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcblx0ICBsb29wOiB0cnVlLFxuXHQgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuXHQgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG5cdH1cblxuXHQsaW5pdDogZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpe1xuXHQgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG5cdCAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuXHQgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4Bcblx0ICB0aGlzLnN3aXBlcihvcHRpb25zKTtcblx0fVxuXG5cdCxzd2lwZXI6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHQgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG5cdH1cblxuXHQsbWFuYWdlcjogZnVuY3Rpb24oKXtcblx0ICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuXHR9XG5cbiAgfTtcbiAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgdmFyIGFjY29yZGlhbiA9IHtcblx0X3Njb3BlOiAnJ1xuXHQsaW5pdDogZnVuY3Rpb24gKCBfc2NvcGUgKXtcblx0XHRpZiAoIHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcgKVxuXHRcdFx0dGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG5cdFx0ZWxzZSBcblx0XHRcdHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuXHRcdHRoaXMuY2xpY2soKTtcblx0fVxuXHQsY2xpY2s6IGZ1bmN0aW9uICggICkge1xuXHRcdCQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcblx0XHRcdGlmICggaXRlbS5oYXNDbGFzcygnYWN0aXZlJykgKVxuXHRcdFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0aXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCggaXRlbS5wb3NpdGlvbigpLnRvcCApO1xuXHRcdH0pO1xuXHR9XG4gIH07XG4gIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKXtcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uLFxuXHQgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG5cdGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG5cdGNvbW1vbi50YWJsZUZhZGUoKTtcblx0JCgnYm9keScpLmFkZENsYXNzKCBpc0RldmljZS5jaGVjaygpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEgKSB7XG5cdFx0ZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG5cdFx0ZGV2LmFwcGVuZE1lbnVCdG4oKTtcblx0fVxufSk7XG5cbi8qXG4qXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaW1hZ2VzID0gW10sXG5cdFx0aSA9IDA7XG5cdGZvciAoIDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrPTEgKSB7XG5cdFx0aW1hZ2VzW2ldID0gbmV3IEltYWdlKCk7XG5cdFx0aW1hZ2VzW2ldLnNyYyA9IGFyZ3VtZW50c1tpXTtcblx0fVxuXHRmb3IgKCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrPTEgKSB7XG5cdFx0KGZ1bmN0aW9uKGope1xuXHRcdFx0aW1hZ2VzW2pdLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygrK2ogKyAn67KI7Ke4IOydtOuvuOyngCDroZzrk5wg7JmE66OMJyk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fSkoaSlcblx0fVxufTtcblxuLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24od3JhcHBlcikge1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gMDtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLmdldER1cmF0aW9uKCk7XG5cdHRoaXMuX2luaXQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQgIHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gIGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0ICB0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdCAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0ICBpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdCAgdGhhdC5fb25QbGF5KCk7XG5cdCAgdGhhdC5fb25QYXVzZSgpO1xuXHQgIHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHQgIHRoYXQuX2NsaWNrKCk7XG5cdCAgdGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0ICB0aGF0Ll9wYXVzZSgpO1xuXHQgIHRoYXQubWFrZVNlZWtiYXIoKTtcblx0ICB0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHQgIHRoYXQuZGltbUNsaWNrKCk7XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHQkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuXHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5zaG93KCk7XG5cdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHRpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuXHRcdFx0XHRzID0gJycsXG5cdFx0XHRcdG0gPSAnJztcblx0XHRcdHMgPSAoZHVyYXRpb24gJSA2MCkudG9TdHJpbmcoKSxcblx0XHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXHRcdH1cblx0XHR0aGF0LmFsbG9jYXRlU2l6ZSh2aWRlbyk7XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0aWYgKCB0aGF0LnZpZGVvLnBhdXNlZCApIHJldHVybjtcblx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgY29uc29sZS5sb2codGhhdC52aWRlbyk7XG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdCAgdGhhdC52aWRlby5wYXVzZSgpO1xuXHQgIHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0ICB0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0ICB0aGF0LnZpZGVvLnBsYXkoKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0Y29uc29sZS5sb2codik7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdC8vIGVsc2UgaWYgKHYubW96UmVxdWVzdEZ1bGxTY3JlZW4pXG5cdC8vICB2Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQoaGlnaFJlcykuc2hvdygpLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2ID0gJCgndmlkZW86dmlzaWJsZScpLmdldCgwKTtcblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcbiAgdmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuICBpZiAoIGN0IDwgNjAgKSB7XG5cdG0gPSAnMDAnO1xuXHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuICB9IGVsc2Uge1xuXHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcbiAgfVxuICB0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgaWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHQgIHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdH0pO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdiA9IHRoaXMudmlkZW87XG5cdGlmICggdi5wYXVzZWQgKSB2LnBsYXkoKTtcblx0ZWxzZSB2LnBhdXNlKCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdC8vIGJnID0gZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cdHNyYyA9IGJnLnJlcGxhY2UoL3VybFxcKFsnXCJdPyguKj8pWydcIl0/XFwpL2ksIFwiJDFcIik7XG5cblx0dmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdGltYWdlLnNyYyA9IHNyYztcblx0aW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBjb25zb2xlLmxvZygndmlkZW8gcG9zdGVyIExPQURFRCEnKTtcblx0XHR2YXIgcG9zdGVySW1nID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpO1xuXHRcdGNvbnNvbGUuZGlyKHBvc3RlckltZy5zdHlsZSk7XG5cdFx0cG9zdGVySW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCInICsgcG9zdGVySW1nLmRhdGFzZXQuYmcgKyAnXCIpOyc7XG5cdH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=