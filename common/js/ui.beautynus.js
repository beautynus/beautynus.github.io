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
	* VideoPlayer (c) yikl100@gmail.com, 2016
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
		bg = el.style.backgroundImage;
		src = bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
	
		var image = document.createElement('img');
		image.src = src;
		image.onload = function () {
			alert('Loaded!');
		};
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTEyYzZmMTEyMDdkM2Y0YTBlNmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiY29tbW9uIiwiZW1wdHlMaW5rRnVuYyIsImFsbEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYVRhZyIsImhyZWYiLCJpIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCIkIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwicGFyZW50cyIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJ2aWRlbyIsImxvd1JlcyIsImdldCIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwicG9zdGVyTG9hZGVkIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJhZGRFdmVudExpc3RlbmVyIiwiX3BsYXkiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsInBsYXlQYXVzZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBhdXNlIiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwiZHVyYXRpb24iLCJzIiwibSIsInRvU3RyaW5nIiwiaW5uZXJUZXh0IiwiY2xlYXJJbnRlcnZhbCIsImFsbG9jYXRlU2l6ZSIsInYiLCJzdHlsZSIsImhlaWdodCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwiY29uc29sZSIsImxvZyIsInNsaWRlciIsInJhbmdlIiwic2xpZGUiLCJldmVudCIsInBhdXNlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiYXR0ciIsInBhcnNlSW50IiwidmFsdWUiLCJzZWVrIiwiY3QiLCJkdXIiLCJjdHJsIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImVsIiwic3JjIiwiYmFja2dyb3VuZEltYWdlIiwiaW1hZ2UiLCJjcmVhdGVFbGVtZW50Iiwib25sb2FkIiwiYWxlcnQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNyQ0E7O0FBQThCO0FBQzlCO0FBQ0E7OztBQUtBLEtBQUlBLE1BQU1DLE1BQVY7QUFBQSxLQUNDQyxNQUFNQyxRQURQOztBQUdBO0FBQ0FILEtBQUlJLEVBQUosR0FBU0gsT0FBT0csRUFBUCxJQUFhOztBQUVyQjtBQUNBQyxRQUFNO0FBQ0w7QUFDQUMsa0JBQWUseUJBQVUsQ0FBRTs7QUFFM0I7QUFKSyxLQUtKQyxNQUFNLGNBQVVDLEdBQVYsRUFBZ0I7QUFDdEIsUUFBSUEsT0FBTyxJQUFQLElBQWUsT0FBT0EsR0FBUCxJQUFjLFdBQWpDLEVBQThDLE9BQU8sRUFBUDtBQUM5QyxXQUFPQSxJQUFJQyxPQUFKLENBQVksWUFBWixFQUEwQixFQUExQixDQUFQO0FBQ0EsSUFSSTtBQVNMQyxhQUFVLG9CQUFVO0FBQ25CO0FBQ0EsUUFBSUMsS0FBS0MsVUFBVUMsU0FBbkI7QUFDQSxXQUFPO0FBQ1JDLFlBQU8saUJBQVc7QUFDaEIsVUFBSyxLQUFL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LFNBQVosQ0FBc0JlLFNBQXRCLEdBQWtDLFlBQVc7QUFDNUMsTUFBSXVCLElBQUksS0FBSzdELEtBQWI7QUFDQSxNQUFLNkQsRUFBRU0sTUFBUCxFQUFnQk4sRUFBRWlCLElBQUYsR0FBaEIsS0FDS2pCLEVBQUVjLEtBQUY7QUFDTCxFQUpEOztBQU1BOUUsYUFBWTBCLFNBQVosQ0FBc0JILFlBQXRCLEdBQXFDLFlBQVc7QUFDL0MsTUFBSUksT0FBTyxJQUFYO0FBQUEsTUFDQ2YsS0FBSyxFQUROO0FBQUEsTUFFQ3NGLEtBQUt2RSxLQUFLakIsTUFBTCxDQUFZUixhQUFaLENBQTBCLE1BQTFCLENBRk47QUFBQSxNQUdDaUcsTUFBTSxFQUhQO0FBSUF2RixPQUFLc0YsR0FBR2pDLEtBQUgsQ0FBU21DLGVBQWQ7QUFDQUQsUUFBTXZGLEdBQUdsRixPQUFILENBQVcseUJBQVgsRUFBc0MsSUFBdEMsQ0FBTjs7QUFFQSxNQUFJMkssUUFBUWpMLFNBQVNrTCxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQUQsUUFBTUYsR0FBTixHQUFZQSxHQUFaO0FBQ0FFLFFBQU1FLE1BQU4sR0FBZSxZQUFZO0FBQzFCQyxTQUFNLFNBQU47QUFDQSxHQUZEO0FBR0EsRUFiRCxDOzs7Ozs7QUMzYkEsMEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTEyYzZmMTEyMDdkM2Y0YTBlNmNcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuXHRkb2MgPSBkb2N1bWVudDtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuXHQvL+ycoO2LuCDrqZTshJzrk5xcblx0dXRpbDoge1xuXHRcdC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4Bcblx0XHRjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpe31cblxuXHRcdC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG5cdFx0LHRyaW06IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHRcdH1cblx0LGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuXHQgIC8v66qo67CU7J28IFVBXG5cdCAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0ICByZXR1cm4ge1xuXHRcdGNoZWNrOiBmdW5jdGlvbigpIHtcblx0XHQgIGlmICggdGhpcy5hbmRyb2lkICkge1xuXHRcdFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcblx0XHRcdFx0ZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcblx0XHRcdGlmICggIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MgKSByZXR1cm4gJ25vLW1vYmlsZSc7XG5cdFx0fSxcblx0XHRpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuXHQgIH1cblx0fVxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0XHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcblx0ICB2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG5cdCAgaWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0Ly8g6re466O5IO2GoOq4gFxuXHQsdG9nZ2xlR3JvdXAgOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCl7XG5cdCAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHQgIH0pO1xuXHR9XG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcblx0X3Njb3BlOiAnJ1xuXG5cdCxkZWZhdWx0T3B0aW9uczoge1xuXHQgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHQgIGxvb3A6IHRydWUsXG5cdCAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG5cdCAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcblx0fVxuXG5cdCxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG5cdCAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblx0ICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG5cdCAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHQgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuXHR9XG5cblx0LHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdCAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0fVxuXG5cdCxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuXHQgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG5cdH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuXHRfc2NvcGU6ICcnXG5cdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG5cdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcblx0XHRlbHNlIFxuXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG5cdFx0dGhpcy5jbGljaygpO1xuXHR9XG5cdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG5cdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG5cdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb24sXG5cdCAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXHQkKCdib2R5JykuYWRkQ2xhc3MoIGlzRGV2aWNlLmNoZWNrKCkgKTtcblxuXHRiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuXHQvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG5cdGlmICggbG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSApIHtcblx0XHRkZXYuYXBwZW5kTWVudUxpc3QoKTtcblx0XHRkZXYuYXBwZW5kTWVudUJ0bigpO1xuXHR9XG59KTtcblxuLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2XG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24od3JhcHBlcikge1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gMDtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLmdldER1cmF0aW9uKCk7XG5cdHRoaXMuX2luaXQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQgIHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gIGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0ICB0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdCAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0ICBpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdCAgdGhhdC5fb25QbGF5KCk7XG5cdCAgdGhhdC5fb25QYXVzZSgpO1xuXHQgIHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHQgIHRoYXQuX2NsaWNrKCk7XG5cdCAgdGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0ICB0aGF0Ll9wYXVzZSgpO1xuXHQgIHRoYXQubWFrZVNlZWtiYXIoKTtcblx0ICB0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHQgIHRoYXQuZGltbUNsaWNrKCk7XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHQkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuXHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5zaG93KCk7XG5cdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHRpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuXHRcdFx0XHRzID0gJycsXG5cdFx0XHRcdG0gPSAnJztcblx0XHRcdHMgPSAoZHVyYXRpb24gJSA2MCkudG9TdHJpbmcoKSxcblx0XHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXHRcdH1cblx0XHR0aGF0LmFsbG9jYXRlU2l6ZSh2aWRlbyk7XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0aWYgKCB0aGF0LnZpZGVvLnBhdXNlZCApIHJldHVybjtcblx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgY29uc29sZS5sb2codGhhdC52aWRlbyk7XG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdCAgdGhhdC52aWRlby5wYXVzZSgpO1xuXHQgIHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0ICB0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0ICB0aGF0LnZpZGVvLnBsYXkoKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0Y29uc29sZS5sb2codik7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdC8vIGVsc2UgaWYgKHYubW96UmVxdWVzdEZ1bGxTY3JlZW4pXG5cdC8vICB2Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQoaGlnaFJlcykuc2hvdygpLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2ID0gJCgndmlkZW86dmlzaWJsZScpLmdldCgwKTtcblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcbiAgdmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuICBpZiAoIGN0IDwgNjAgKSB7XG5cdG0gPSAnMDAnO1xuXHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuICB9IGVsc2Uge1xuXHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcbiAgfVxuICB0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgaWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHQgIHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdH0pO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdiA9IHRoaXMudmlkZW87XG5cdGlmICggdi5wYXVzZWQgKSB2LnBsYXkoKTtcblx0ZWxzZSB2LnBhdXNlKCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdGJnID0gZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlO1xuXHRzcmMgPSBiZy5yZXBsYWNlKC91cmxcXChbJ1wiXT8oLio/KVsnXCJdP1xcKS9pLCBcIiQxXCIpO1xuXG5cdHZhciBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRpbWFnZS5zcmMgPSBzcmM7XG5cdGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRhbGVydCgnTG9hZGVkIScpO1xuXHR9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==