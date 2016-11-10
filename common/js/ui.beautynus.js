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
	
	window.cslog = function (msg) {
		return console.log(msg);
	};
	
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
			},
			deviceSize: 'device-size-' + window.innerWidth
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
	
			//loading mask
			, loadingComplete: function loadingComplete(callback) {
				window.addEventListener('load', function () {
					imagePreloader('/common/images/loading-circular.gif', function (img) {
						img.className = "video-loading-image";
						if (typeof callback == 'function') callback();
						$('body').stop().animate({ opacity: 1 }, 200, function () {});
					});
				}, false);
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
	
		$('body').addClass([isDevice.check(), util.deviceSize].join(' '));
	
		beautynus.accordian.init('.accordian');
	
		common.loadingComplete(function () {
			//callbacks
		});
	
		//개발용 메서드 실행
		if (location.href.indexOf('?dev') > -1) {
			dev.appendMenuList();
			dev.appendMenuBtn();
		}
	});
	
	/*
	*	Image preloader (c) yikl1004@gmail.com, 2016.11
	*/
	window.imagePreloader = function (img, callback) {
		var images = document.createElement('img');
		images.src = img;
	
		images.addEventListener('load', function () {
			if (typeof callback == 'function') callback(images);
		}, false);
	};
	
	/*
	* VideoPlayer (c) yikl100@gmail.com, 2016.11
	*/
	window.VideoPlayer = function (wrapper) {
		this.wrapper = document.querySelector(wrapper);
		this.loadingElement = this.wrapper.querySelector('.video-loading-image'), this.video = null, this.lowRes = $(wrapper).find('[data-res=low]').get(0);
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
		this.playPauseFlag = 'pause';
	
		this.getDuration();
		this._init();
		console.log('video player call');
	};
	
	VideoPlayer.prototype._init = function () {
		var that = this;
	
		that.lowRes.src = that.lowRes.dataset.src;
		that.highRes.src = that.highRes.dataset.src;
	
		that.addKlass(that.loadingElement, "active");
	
		that.playBtn.addEventListener('click', function () {
			that._play();
		}, false);
	};
	
	VideoPlayer.prototype._play = function () {
		var that = this;
	
		that.addKlass(that.loadingElement, "active");
	
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
		that.video.oncuechange = function () {
			console.log('cuechange');
		};
		that.video.onchange = function () {
			console.log('onchange');
		};
	};
	
	VideoPlayer.prototype._onPlay = function () {
		var that = this;
	
		that.video.onplay = function () {
			$(that.poster).hide();
			$(that.pauseBtn).show();
			$(that.playBtn).hide();
			if (this.currentTime != 0) that.controlVisibling(true);
		};
	
		that.video.onplaying = function () {
			that.playPauseFlag = 'play';
			console.log('playing', that.playPauseFlag);
			that.removeKlass(that.loadingElement, "active");
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
				console.log('readyState');
				that.removeKlass(that.loadingElement, "active");
				var duration = Math.round(video.duration),
				    s = '',
				    m = '';
				s = (duration % 60).toString(), m = ((duration - s) / 60).toString();
				s = s.length < 2 ? 0 + s : s;
				m = m.length < 2 ? 0 + m : m;
				that.videoTime.innerText = m + ':' + s;
				that.endTime.innerText = m + ':' + s;
				clearInterval(timer);
				that.posterLoaded();
				// that.allocateSize(video);
			}
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
		var that = this,
		    v = that.video;
		console.dir(v);
		$(that.wrapper.querySelector('.seekbar')).slider({
			range: 'min',
			// max: duration,
			start: function start(event, ui) {
				console.log('slider start : ', that.playPauseFlag);
				if (v.paused) {
					console.log('pause true');
					that.playPauseFlag = 'pause';
				} else {
					console.log('pause false');
					that.playPauseFlag = 'play';
				}
				v.pause();
			},
			slide: function slide(event, ui) {
				that.getCurrentTime();
			},
			change: function change(event, ui) {
				// if ( v.paused && that.playPauseFlag == 'pause' ) {
				// 	v.pause();
				// } else {
				// 	v.play();
				// }
			},
			stop: function stop(event, ui) {
				console.log('slider stop : ', that.playPauseFlag);
				that.controlVisibling(true);
				that.changeCurrentTime(ui);
				if (that.playPauseFlag == 'play') {
					console.log('play?');
					v.play();
				} else {
					v.pause();
				}
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
			$(lowRes).show().css({ opacity: 1 }).attr('data-play', 'true');
			$(highRes).css({ opacity: 0 }).hide().attr('data-play', 'false');
			that.video = $(lowRes).get(0);
		} else {
			$(lowRes).css({ opacity: 0 }).hide().attr('data-play', 'false');
			$(highRes).show().css({ opacity: 1 }).attr('data-play', 'true');
			that.video = $(highRes).get(0);
		}
		that.video.load();
	};
	
	VideoPlayer.prototype.changeCurrentTime = function (ui) {
		var that = this;
		var v = $('video:visible').get(0);
		v.currentTime = parseInt(v.duration * (ui.value / 100), 10);
		that.controlVisibling(false);
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
		var that = this,
		    v = that.video;
	
		if (v.paused) {
			v.play();
		} else {
			v.pause();
		}
	};
	
	VideoPlayer.prototype.posterLoaded = function () {
		var that = this,
		    bg = "",
		    el = that.poster.querySelector('.img'),
		    src = '';
		bg = el.dataset.bg;
	
		var canvasTag = document.createElement('canvas');
		canvasTag.id = "videoPoster";
		that.poster.appendChild(canvasTag);
	
		imagePreloader(bg, function () {
			if (that.loadingElement) {
				console.log(11);
				that.removeKlass(that.loadingElement, "active");
				that.control.style.opacity = 1;
			}
			console.log('settimeout');
			var canvas = document.getElementById('videoPoster'),
			    context = canvas.getContext('2d'),
			    img = new Image(),
			    imgW = 0,
			    imgH = 0,
			    timer;
			img.src = bg;
			context.globalAlpha = 0;
	
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			// canvas.style.height = "100px";
	
			imgW = that.wrapper.clientWidth, imgH = that.getRatio(img.naturalWidth, img.naturalHeight, imgW);
			timer = setInterval(function () {
				if (context.globalAlpha.toFixed(1) < 1) {
					imgW += 1;
					imgH += 1;
					context.globalAlpha += 0.05;
					context.drawImage(img, canvas.width / 2 - imgW / 2, canvas.height / 2 - imgH / 2, imgW, imgH);
				} else {
					clearTimeout(timer);
				}
			}, 300 / 30);
		});
	};
	
	VideoPlayer.prototype.addKlass = function (target, klass) {
		if (target.className.indexOf(klass) > -1) return;
		target.className += ' ' + klass;
	};
	
	VideoPlayer.prototype.removeKlass = function (target, klass) {
		var regexp = new RegExp(klass);
		target.className = ui.util.trim(target.className.replace(regexp, ""));
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjM3YzdhNjBhYzA0YWI3M2Q4MDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiZ2V0IiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJwbGF5UGF1c2VGbGFnIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJkYXRhc2V0IiwiYWRkS2xhc3MiLCJfcGxheSIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwicGxheVBhdXNlIiwib25jdWVjaGFuZ2UiLCJvbmNoYW5nZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJyZW1vdmVLbGFzcyIsIm9ucGF1c2UiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsIk1hdGgiLCJyb3VuZCIsImVxIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJkdXJhdGlvbiIsInMiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwicG9zdGVyTG9hZGVkIiwiYWxsb2NhdGVTaXplIiwidiIsInN0eWxlIiwiaGVpZ2h0IiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwib250aW1ldXBkYXRlIiwicGF1c2VkIiwiZ2V0Q3VycmVudFRpbWUiLCJkaXIiLCJzbGlkZXIiLCJyYW5nZSIsInN0YXJ0IiwiZXZlbnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwiYXR0ciIsImxvYWQiLCJwYXJzZUludCIsInZhbHVlIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJlbCIsImNhbnZhc1RhZyIsImlkIiwiYXBwZW5kQ2hpbGQiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiSW1hZ2UiLCJpbWdXIiwiaW1nSCIsImdsb2JhbEFscGhhIiwid2lkdGgiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwidG9GaXhlZCIsImRyYXdJbWFnZSIsImtsYXNzIiwicmVnZXhwIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDckNBOztBQUE4QjtBQUM5QjtBQUNBOzs7QUFLQSxLQUFJQSxNQUFNQyxNQUFWO0FBQUEsS0FDQ0MsTUFBTUMsUUFEUDs7QUFHQUYsUUFBT0csS0FBUCxHQUFlLFVBQVVDLEdBQVYsRUFBZTtBQUM3QixTQUFPQyxRQUFRQyxHQUFSLENBQVlGLEdBQVosQ0FBUDtBQUNBLEVBRkQ7O0FBSUE7QUFDQUwsS0FBSVEsRUFBSixHQUFTUCxPQUFPTyxFQUFQLElBQWE7O0FBRXJCO0FBQ0FDLFFBQU07QUFDTDtBQUNBQyxrQkFBZSx5QkFBVSxDQUFFOztBQUUzQjtBQUpLLEtBS0pDLE1BQU0sY0FBVUMsR0FBVixFQUFnQjtBQUN0QixRQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLFdBQU9BLElBQUlDLE9BQUosQ0FBWSxZQUFaLEVBQTBCLEVBQTFCLENBQVA7QUFDQSxJQVJJO0FBU0pDLGFBQVUsb0JBQVU7QUFDcEI7QUFDQSxRQUFJQyxLQUFLQyxVQUFVQyxTQUFuQjtBQUNBLFdBQU87QUFDTkMsWUFBTyxpQkFBVztBQUNqQixVQUFLLEtBQUtDLE9BQVYsRUFBb0I7QUFDbkIsV0FBSyxLQUFLQyxXQUFWLEVBQXdCLE9BQU8sYUFBUCxDQUF4QixLQUNLLE9BQU8sU0FBUDtBQUNMO0FBQ0QsVUFBSyxLQUFLQyxHQUFWLEVBQWdCLE9BQU8sS0FBUDtBQUNoQixVQUFLLENBQUMsS0FBS0YsT0FBTixJQUFpQixDQUFDLEtBQUtFLEdBQTVCLEVBQWtDLE9BQU8sV0FBUDtBQUNsQyxNQVJLO0FBU05BLFVBQUtOLEdBQUdPLEtBQUgsQ0FBUyxRQUFULElBQXFCLElBQXJCLEdBQTRCLEtBVDNCO0FBVU5ILGNBQVNKLEdBQUdPLEtBQUgsQ0FBUyxTQUFULElBQXNCLElBQXRCLEdBQTZCLEtBVmhDO0FBV05GLGtCQUFhTCxHQUFHTyxLQUFILENBQVMsYUFBVCxJQUEwQixJQUExQixHQUFpQztBQVh4QyxLQUFQO0FBYUEsSUF6Qkk7QUEwQkpDLGVBQVksaUJBQWlCdEIsT0FBT3VCO0FBMUJoQzs7QUE2Qk47QUFoQ3FCLElBaUNwQkMsUUFBUTs7QUFFUjtBQUNBQyxrQkFBZSx5QkFBVztBQUN6QjtBQUNBLFFBQUlDLE9BQU96QixJQUFJMEIsZ0JBQUosQ0FBcUIsR0FBckIsQ0FBWDtBQUFBLFFBQXNDQyxPQUFPLElBQTdDO0FBQUEsUUFBbURDLE9BQU8sSUFBMUQ7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxTQUFTTCxLQUFLSyxNQUE5QixFQUFzQ0QsSUFBSUMsTUFBMUMsRUFBa0RELEdBQWxELEVBQXNEO0FBQ3JERixZQUFPRixLQUFLSSxDQUFMLENBQVA7QUFDQUQsWUFBT0QsS0FBS0ksWUFBTCxDQUFrQixNQUFsQixDQUFQO0FBQ0EsU0FBS3pCLEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFjbUIsSUFBZCxLQUF3QixHQUF4QixJQUErQkEsUUFBUSxJQUE1QyxFQUNDRCxLQUFLSyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLHFDQUExQjtBQUNEO0FBQ0Q7O0FBRUQ7QUFkUSxLQWVQQyxhQUFhLHVCQUFVLENBRXZCOztBQUVEO0FBbkJRLEtBb0JQQyxXQUFXLHFCQUFVO0FBQ3JCLFFBQUlDLFNBQVNDLEVBQUUsaUJBQUYsQ0FBYjtBQUNBLFFBQUtELE9BQU9MLE1BQVAsSUFBaUIsQ0FBdEIsRUFBMEI7QUFDMUJNLE1BQUUsaUJBQUYsRUFBcUJDLElBQXJCLENBQTBCLFlBQVU7QUFDbkMsU0FBSUMsUUFBUUYsRUFBRSxJQUFGLENBQVo7QUFDQUUsV0FBTUMsSUFBTixDQUFXLG1CQUFYLEVBQWdDQyxFQUFoQyxDQUFtQyxRQUFuQyxFQUE0QyxVQUFTQyxDQUFULEVBQVc7QUFDdEQsVUFBSUMsVUFBVUQsRUFBRUUsTUFBaEI7QUFDQSxVQUFNRCxRQUFRRSxXQUFSLEdBQXNCRixRQUFRRyxXQUFoQyxJQUFpREgsUUFBUUksVUFBUixHQUFxQixFQUExRSxFQUErRTtBQUM5RVIsYUFBTVMsV0FBTixDQUFrQixJQUFsQjtBQUNBLE9BRkQsTUFFUTtBQUNQVCxhQUFNVSxRQUFOLENBQWUsSUFBZjtBQUNBO0FBQ0QsTUFQRDtBQVFBLEtBVkQ7QUFXQTs7QUFFRDtBQXBDUSxLQXFDUEMsaUJBQWlCLHlCQUFVQyxRQUFWLEVBQXFCO0FBQ3RDbkQsV0FBT29ELGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQVU7QUFDekNDLG9CQUFlLHFDQUFmLEVBQXNELFVBQVNDLEdBQVQsRUFBYTtBQUNsRUEsVUFBSUMsU0FBSixHQUFnQixxQkFBaEI7QUFDQSxVQUFLLE9BQU9KLFFBQVAsSUFBbUIsVUFBeEIsRUFBcUNBO0FBQ3JDZCxRQUFFLE1BQUYsRUFBVW1CLElBQVYsR0FBaUJDLE9BQWpCLENBQXlCLEVBQUNDLFNBQVMsQ0FBVixFQUF6QixFQUF1QyxHQUF2QyxFQUE0QyxZQUFVLENBQ3JELENBREQ7QUFFQSxNQUxEO0FBTUEsS0FQRCxFQU9HLEtBUEg7QUFRQTs7QUFFRDtBQWhEUSxLQWlEUEMsYUFBYyxxQkFBU0MsS0FBVCxFQUFnQkMsT0FBaEIsRUFBd0I7QUFDdEN4QixNQUFFdUIsS0FBRixFQUFTcEIsSUFBVCxDQUFjcUIsT0FBZCxFQUF1QnBCLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVU7QUFDNUNKLE9BQUV1QixLQUFGLEVBQVNwQixJQUFULENBQWNxQixPQUFkLEVBQXVCYixXQUF2QixDQUFtQyxRQUFuQztBQUNBWCxPQUFFLElBQUYsRUFBUVksUUFBUixDQUFpQixRQUFqQjtBQUNBLEtBSEQ7QUFJQTs7QUF0RE87QUFqQ1ksRUFBdEI7O0FBK0ZBOzs7QUFHQSxFQUFDLFVBQVNaLENBQVQsRUFBVztBQUNWOztBQUVBLE1BQUk3QixPQUFPRCxHQUFHQyxJQUFkO0FBQUEsTUFDQ2dCLFNBQVNqQixHQUFHaUIsTUFEYjs7QUFHQSxNQUFJc0MsWUFBWUEsYUFBYSxFQUE3Qjs7QUFFQTtBQUNBLE1BQUlDLFdBQVc7QUFDaEIzQixXQUFRLEVBRFE7O0FBR2Y0QixtQkFBZ0I7QUFDZkMsZUFBVyxZQURJO0FBRWZDLFVBQU0sSUFGUztBQUdmQyxnQkFBWSxvQkFIRztBQUlmQyxvQkFBZ0I7QUFKRCxJQUhEOztBQVVmQyxTQUFNLGNBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXdCO0FBQzdCLFNBQUtuQyxNQUFMLEdBQWNrQyxLQUFkO0FBQ0EsUUFBSUUsU0FBVSxPQUFPQyxPQUFPRCxNQUFkLElBQXdCLFdBQXpCLEdBQXdDbkMsRUFBRXFDLE1BQTFDLEdBQW1ERCxPQUFPRCxNQUF2RSxDQUY2QixDQUVrRDtBQUMvRUQsY0FBVyxPQUFPQSxPQUFQLElBQWtCLFdBQW5CLEdBQWtDLEtBQUtQLGNBQXZDLEdBQXdEUSxPQUFPLEVBQVAsRUFBVyxLQUFLUixjQUFoQixFQUFnQ08sT0FBaEMsQ0FBbEUsQ0FINkIsQ0FHK0U7QUFDNUcsU0FBS0ksTUFBTCxDQUFZSixPQUFaO0FBQ0QsSUFmZTs7QUFpQmZJLFdBQVEsZ0JBQVNKLE9BQVQsRUFBaUI7QUFDeEJsQyxNQUFFLEtBQUtELE1BQVAsRUFBZXdDLElBQWYsQ0FBb0IsU0FBcEIsRUFBK0IsSUFBSUMsTUFBSixDQUFXLEtBQUt6QyxNQUFoQixFQUF3Qm1DLE9BQXhCLENBQS9CO0FBQ0QsSUFuQmU7O0FBcUJmTyxZQUFTLG1CQUFVO0FBQ2xCLFdBQU96QyxFQUFFLEtBQUtELE1BQVAsRUFBZXdDLElBQWYsQ0FBb0IsU0FBcEIsQ0FBUDtBQUNEOztBQXZCZSxHQUFmO0FBMEJBZCxZQUFVQyxRQUFWLEdBQXFCQSxRQUFyQjs7QUFFQSxNQUFJZ0IsWUFBWTtBQUNqQjNDLFdBQVEsRUFEUztBQUVoQmlDLFNBQU0sY0FBV2pDLE1BQVgsRUFBbUI7QUFDekIsUUFBSyxPQUFPQSxNQUFQLElBQWlCLFdBQXRCLEVBQ0MsS0FBS0EsTUFBTCxHQUFjLFlBQWQsQ0FERCxLQUdDLEtBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNELFNBQUs0QyxLQUFMO0FBQ0EsSUFSZ0I7QUFTaEJBLFVBQU8saUJBQWM7QUFDckIzQyxNQUFFLEtBQUtELE1BQVAsRUFBZUssRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUEzQixFQUF1QyxZQUFVO0FBQ2hELFNBQUl3QyxPQUFPNUMsRUFBRSxJQUFGLEVBQVE2QyxPQUFSLENBQWdCLE9BQWhCLENBQVg7QUFDQSxTQUFLRCxLQUFLRSxRQUFMLENBQWMsUUFBZCxDQUFMLEVBQ0NGLEtBQUtqQyxXQUFMLENBQWlCLFFBQWpCLEVBREQsS0FHQ2lDLEtBQUtoQyxRQUFMLENBQWMsUUFBZCxFQUF3Qm1DLFFBQXhCLENBQWlDLE9BQWpDLEVBQTBDcEMsV0FBMUMsQ0FBc0QsUUFBdEQ7QUFDRFgsT0FBRXJDLE1BQUYsRUFBVXFGLFNBQVYsQ0FBcUJKLEtBQUtLLFFBQUwsR0FBZ0JDLEdBQXJDO0FBQ0EsS0FQRDtBQVFBO0FBbEJnQixHQUFoQjtBQW9CQXpCLFlBQVVpQixTQUFWLEdBQXNCQSxTQUF0Qjs7QUFFQTs7QUFFQS9FLFNBQU84RCxTQUFQLEdBQW1CQSxTQUFuQjtBQUVELEVBL0RELEVBK0RHekIsQ0EvREg7O0FBa0VBO0FBQ0FBLEdBQUUsWUFBVTs7QUFFVixNQUFJN0IsT0FBT0QsR0FBR0MsSUFBZDtBQUFBLE1BQ0NnQixTQUFTakIsR0FBR2lCLE1BRGI7QUFBQSxNQUVDWCxXQUFXTCxLQUFLSyxRQUFMLEVBRlo7O0FBSURXLFNBQU9DLGFBQVA7QUFDQUQsU0FBT1csU0FBUDs7QUFFQUUsSUFBRSxNQUFGLEVBQVVZLFFBQVYsQ0FBb0IsQ0FBQ3BDLFNBQVNJLEtBQVQsRUFBRCxFQUFtQlQsS0FBS2MsVUFBeEIsRUFBb0NrRSxJQUFwQyxDQUF5QyxHQUF6QyxDQUFwQjs7QUFFQTFCLFlBQVVpQixTQUFWLENBQW9CVixJQUFwQixDQUF5QixZQUF6Qjs7QUFFQTdDLFNBQU8wQixlQUFQLENBQXVCLFlBQVU7QUFDaEM7QUFDQSxHQUZEOztBQUlBO0FBQ0EsTUFBS3VDLFNBQVM1RCxJQUFULENBQWM2RCxPQUFkLENBQXNCLE1BQXRCLElBQWdDLENBQUMsQ0FBdEMsRUFBMEM7QUFDekNDLE9BQUlDLGNBQUo7QUFDQUQsT0FBSUUsYUFBSjtBQUNBO0FBQ0QsRUF0QkQ7O0FBd0JBOzs7QUFHQTdGLFFBQU9xRCxjQUFQLEdBQXdCLFVBQVNDLEdBQVQsRUFBY0gsUUFBZCxFQUF3QjtBQUMvQyxNQUFJMkMsU0FBUzVGLFNBQVM2RixhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQUQsU0FBT0UsR0FBUCxHQUFhMUMsR0FBYjs7QUFFQXdDLFNBQU8xQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFVO0FBQ3pDLE9BQUssT0FBT0QsUUFBUCxJQUFtQixVQUF4QixFQUFxQ0EsU0FBUzJDLE1BQVQ7QUFDckMsR0FGRCxFQUVHLEtBRkg7QUFHQSxFQVBEOztBQVNBOzs7QUFHQTlGLFFBQU9pRyxXQUFQLEdBQXFCLFVBQVNDLE9BQVQsRUFBa0I7QUFDdEMsT0FBS0EsT0FBTCxHQUFpQmhHLFNBQVNpRyxhQUFULENBQXVCRCxPQUF2QixDQUFqQjtBQUNBLE9BQUtFLGNBQUwsR0FBc0IsS0FBS0YsT0FBTCxDQUFhQyxhQUFiLENBQTJCLHNCQUEzQixDQUF0QixFQUNBLEtBQUtFLEtBQUwsR0FBZ0IsSUFEaEIsRUFFQSxLQUFLQyxNQUFMLEdBQWdCakUsRUFBRTZELE9BQUYsRUFBVzFELElBQVgsQ0FBZ0IsZ0JBQWhCLEVBQWtDK0QsR0FBbEMsQ0FBc0MsQ0FBdEMsQ0FGaEI7QUFHQSxPQUFLQyxPQUFMLEdBQWlCbkUsRUFBRTZELE9BQUYsRUFBVzFELElBQVgsQ0FBZ0IsaUJBQWhCLEVBQW1DK0QsR0FBbkMsQ0FBdUMsQ0FBdkMsQ0FBakI7QUFDQSxPQUFLRSxRQUFMLEdBQWtCLElBQWxCO0FBQ0EsT0FBS0MsT0FBTCxHQUFpQixDQUFqQjtBQUNBLE9BQUtDLFlBQUwsR0FBcUIsSUFBckI7QUFDQSxPQUFLQyxNQUFMLEdBQWdCLEtBQUtWLE9BQUwsQ0FBYUMsYUFBYixDQUEyQixTQUEzQixDQUFoQjtBQUNBLE9BQUtVLE9BQUwsR0FBaUIsS0FBS1gsT0FBTCxDQUFhQyxhQUFiLENBQTJCLFVBQTNCLENBQWpCO0FBQ0EsT0FBS1csRUFBTCxHQUFhLEtBQUtELE9BQUwsQ0FBYVYsYUFBYixDQUEyQixLQUEzQixDQUFiO0FBQ0EsT0FBS1ksT0FBTCxHQUFpQixLQUFLRixPQUFMLENBQWFWLGFBQWIsQ0FBMkIsYUFBM0IsQ0FBakI7QUFDQSxPQUFLYSxRQUFMLEdBQWtCLEtBQUtILE9BQUwsQ0FBYVYsYUFBYixDQUEyQixjQUEzQixDQUFsQjtBQUNBLE9BQUtjLFNBQUwsR0FBbUIsS0FBS0osT0FBTCxDQUFhVixhQUFiLENBQTJCLGVBQTNCLENBQW5CO0FBQ0EsT0FBS2UsUUFBTCxHQUFrQixLQUFLTCxPQUFMLENBQWFWLGFBQWIsQ0FBMkIsV0FBM0IsQ0FBbEI7QUFDQSxPQUFLZ0IsT0FBTCxHQUFpQixLQUFLTixPQUFMLENBQWFWLGFBQWIsQ0FBMkIsT0FBM0IsQ0FBakI7QUFDQSxPQUFLaUIsU0FBTCxHQUFtQixLQUFLRixRQUFMLENBQWNmLGFBQWQsQ0FBNEIsVUFBNUIsQ0FBbkI7QUFDQSxPQUFLa0IsT0FBTCxHQUFpQixLQUFLSCxRQUFMLENBQWNmLGFBQWQsQ0FBNEIsTUFBNUIsQ0FBakI7QUFDQSxPQUFLbUIsT0FBTCxHQUFpQixLQUFLVCxPQUFMLENBQWFWLGFBQWIsQ0FBMkIsVUFBM0IsQ0FBakI7QUFDQSxPQUFLb0IsUUFBTCxHQUFrQmxGLEVBQUUsS0FBS3dFLE9BQVAsRUFBZ0JyRSxJQUFoQixDQUFxQixZQUFyQixDQUFsQjtBQUNBLE9BQUtnRixTQUFMLEdBQW1CLEtBQUtELFFBQUwsQ0FBYy9FLElBQWQsQ0FBbUIsZUFBbkIsQ0FBbkI7QUFDQSxPQUFLaUYsYUFBTCxHQUFzQixPQUF0Qjs7QUFFQSxPQUFLQyxXQUFMO0FBQ0EsT0FBS0MsS0FBTDtBQUNBdEgsVUFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0EsRUEzQkQ7O0FBNkJBMkYsYUFBWTJCLFNBQVosQ0FBc0JELEtBQXRCLEdBQThCLFlBQVc7QUFDeEMsTUFBSUUsT0FBTyxJQUFYOztBQUVBQSxPQUFLdkIsTUFBTCxDQUFZTixHQUFaLEdBQWtCNkIsS0FBS3ZCLE1BQUwsQ0FBWXdCLE9BQVosQ0FBb0I5QixHQUF0QztBQUNBNkIsT0FBS3JCLE9BQUwsQ0FBYVIsR0FBYixHQUFtQjZCLEtBQUtyQixPQUFMLENBQWFzQixPQUFiLENBQXFCOUIsR0FBeEM7O0FBRUE2QixPQUFLRSxRQUFMLENBQWVGLEtBQUt6QixjQUFwQixFQUFvQyxRQUFwQzs7QUFFQXlCLE9BQUtkLE9BQUwsQ0FBYTNELGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQVc7QUFDakR5RSxRQUFLRyxLQUFMO0FBQ0EsR0FGRCxFQUVHLEtBRkg7QUFHQSxFQVhEOztBQWFBL0IsYUFBWTJCLFNBQVosQ0FBc0JJLEtBQXRCLEdBQThCLFlBQVU7QUFDdkMsTUFBSUgsT0FBTyxJQUFYOztBQUVBQSxPQUFLRSxRQUFMLENBQWVGLEtBQUt6QixjQUFwQixFQUFvQyxRQUFwQzs7QUFFQSxNQUFLeUIsS0FBS3BCLFFBQVYsRUFBcUI7QUFDcEJvQixRQUFLcEIsUUFBTCxHQUFnQixLQUFoQjtBQUNBcEUsS0FBRXdGLEtBQUtoQixPQUFQLEVBQWdCb0IsSUFBaEI7QUFDQSxPQUFLSixLQUFLeEIsS0FBTCxJQUFjLElBQW5CLEVBQTBCd0IsS0FBS0ssZ0JBQUw7O0FBRTFCTCxRQUFLTSxPQUFMO0FBQ0FOLFFBQUtPLFFBQUw7QUFDQVAsUUFBS1EsYUFBTDtBQUNBUixRQUFLUyxNQUFMO0FBQ0FULFFBQUtVLGVBQUw7QUFDQVYsUUFBS1csTUFBTDtBQUNBWCxRQUFLWSxXQUFMO0FBQ0FaLFFBQUthLFlBQUw7QUFDQWIsUUFBS2MsU0FBTDtBQUNBO0FBQ0RkLE9BQUtlLFNBQUw7QUFDQWYsT0FBS3hCLEtBQUwsQ0FBV3dDLFdBQVgsR0FBeUIsWUFBVTtBQUNsQ3hJLFdBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsR0FGRDtBQUdBdUgsT0FBS3hCLEtBQUwsQ0FBV3lDLFFBQVgsR0FBc0IsWUFBWTtBQUNqQ3pJLFdBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsR0FGRDtBQUdBLEVBM0JEOztBQTZCQTJGLGFBQVkyQixTQUFaLENBQXNCTyxPQUF0QixHQUFnQyxZQUFVO0FBQ3pDLE1BQUlOLE9BQU8sSUFBWDs7QUFFQUEsT0FBS3hCLEtBQUwsQ0FBVzBDLE1BQVgsR0FBb0IsWUFBVztBQUM5QjFHLEtBQUV3RixLQUFLakIsTUFBUCxFQUFlcUIsSUFBZjtBQUNBNUYsS0FBRXdGLEtBQUtiLFFBQVAsRUFBaUJnQyxJQUFqQjtBQUNBM0csS0FBRXdGLEtBQUtkLE9BQVAsRUFBZ0JrQixJQUFoQjtBQUNBLE9BQUssS0FBS2dCLFdBQUwsSUFBb0IsQ0FBekIsRUFBNkJwQixLQUFLcUIsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDN0IsR0FMRDs7QUFPQXJCLE9BQUt4QixLQUFMLENBQVc4QyxTQUFYLEdBQXVCLFlBQVU7QUFDaEN0QixRQUFLSixhQUFMLEdBQXFCLE1BQXJCO0FBQ0FwSCxXQUFRQyxHQUFSLENBQVksU0FBWixFQUF1QnVILEtBQUtKLGFBQTVCO0FBQ0FJLFFBQUt1QixXQUFMLENBQWlCdkIsS0FBS3pCLGNBQXRCLEVBQXNDLFFBQXRDO0FBQ0EsR0FKRDtBQUtBLEVBZkQ7O0FBaUJBSCxhQUFZMkIsU0FBWixDQUFzQlEsUUFBdEIsR0FBaUMsWUFBVTtBQUMxQyxNQUFJUCxPQUFPLElBQVg7QUFDQUEsT0FBS3hCLEtBQUwsQ0FBV2dELE9BQVgsR0FBcUIsWUFBVztBQUMvQmhILEtBQUV3RixLQUFLaEIsT0FBUCxFQUFnQm1DLElBQWhCO0FBQ0EzRyxLQUFFd0YsS0FBS2IsUUFBUCxFQUFpQmlCLElBQWpCO0FBQ0E1RixLQUFFd0YsS0FBS2QsT0FBUCxFQUFnQmlDLElBQWhCO0FBQ0EsT0FBSSxLQUFLQyxXQUFMLEdBQW1CLENBQXZCLEVBQTBCcEIsS0FBS04sUUFBTCxDQUFjVSxJQUFkO0FBQzFCSixRQUFLcUIsZ0JBQUwsQ0FBc0IsS0FBdEI7QUFDQSxHQU5EO0FBT0EsRUFURDs7QUFXQWpELGFBQVkyQixTQUFaLENBQXNCMEIsUUFBdEIsR0FBaUMsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFDbEQsTUFBSTVCLE9BQU8sSUFBWDtBQUNBLE1BQUlqRixTQUFTLENBQWI7QUFDQUEsV0FBUzhHLEtBQUtDLEtBQUwsQ0FBWUgsSUFBSUMsQ0FBTCxHQUFVRixDQUFyQixDQUFUO0FBQ0EsU0FBTzNHLE1BQVA7QUFDQSxFQUxEOztBQU9BcUQsYUFBWTJCLFNBQVosQ0FBc0JGLFdBQXRCLEdBQW9DLFlBQVc7QUFDOUMsTUFBSUcsT0FBTyxJQUFYO0FBQ0EsTUFBSXhCLFFBQVFoRSxFQUFFd0YsS0FBSzNCLE9BQVAsRUFBZ0IxRCxJQUFoQixDQUFxQixlQUFyQixFQUFzQ29ILEVBQXRDLENBQXlDLENBQXpDLEVBQTRDckQsR0FBNUMsQ0FBZ0QsQ0FBaEQsQ0FBWjtBQUNBLE1BQUlzRCxRQUFRQyxZQUFZLFlBQVc7QUFDbEMsT0FBSXpELE1BQU0wRCxVQUFOLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3pCMUosWUFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQXVILFNBQUt1QixXQUFMLENBQWtCdkIsS0FBS3pCLGNBQXZCLEVBQXVDLFFBQXZDO0FBQ0EsUUFBSTRELFdBQVdOLEtBQUtDLEtBQUwsQ0FBV3RELE1BQU0yRCxRQUFqQixDQUFmO0FBQUEsUUFDQ0MsSUFBSSxFQURMO0FBQUEsUUFFQ0MsSUFBSSxFQUZMO0FBR0FELFFBQUksQ0FBQ0QsV0FBVyxFQUFaLEVBQWdCRyxRQUFoQixFQUFKLEVBQ0FELElBQUksQ0FBQyxDQUFDRixXQUFXQyxDQUFaLElBQWlCLEVBQWxCLEVBQXNCRSxRQUF0QixFQURKO0FBRUFGLFFBQUlBLEVBQUVsSSxNQUFGLEdBQVcsQ0FBWCxHQUFlLElBQUlrSSxDQUFuQixHQUF1QkEsQ0FBM0I7QUFDQUMsUUFBSUEsRUFBRW5JLE1BQUYsR0FBVyxDQUFYLEdBQWUsSUFBSW1JLENBQW5CLEdBQXVCQSxDQUEzQjtBQUNBckMsU0FBS1osU0FBTCxDQUFlbUQsU0FBZixHQUEyQkYsSUFBSSxHQUFKLEdBQVVELENBQXJDO0FBQ0FwQyxTQUFLUixPQUFMLENBQWErQyxTQUFiLEdBQXlCRixJQUFJLEdBQUosR0FBVUQsQ0FBbkM7QUFDQUksa0JBQWNSLEtBQWQ7QUFDQWhDLFNBQUt5QyxZQUFMO0FBQ0E7QUFDQTtBQUNELEdBakJXLEVBaUJULEdBakJTLENBQVo7QUFrQkEsRUFyQkQ7O0FBdUJBckUsYUFBWTJCLFNBQVosQ0FBc0IyQyxZQUF0QixHQUFxQyxVQUFTQyxDQUFULEVBQVc7QUFDL0MsTUFBSTNDLE9BQU8sSUFBWDtBQUFBLE1BQ0MzQixVQUFVMkIsS0FBSzNCLE9BRGhCO0FBRUFBLFVBQVF1RSxLQUFSLENBQWNDLE1BQWQsR0FBdUI3QyxLQUFLeUIsUUFBTCxDQUFja0IsRUFBRUcsVUFBaEIsRUFBNEJILEVBQUVJLFdBQTlCLEVBQTJDSixFQUFFMUgsV0FBN0MsSUFBNEQsSUFBbkY7QUFDQSxFQUpEOztBQU1BbUQsYUFBWTJCLFNBQVosQ0FBc0JTLGFBQXRCLEdBQXNDLFlBQVc7QUFDL0MsTUFBSVIsT0FBTyxJQUFYO0FBQ0FBLE9BQUt4QixLQUFMLENBQVd3RSxZQUFYLEdBQTBCLFlBQVU7QUFDckMsT0FBS2hELEtBQUt4QixLQUFMLENBQVd5RSxNQUFoQixFQUF5QjtBQUN6QmpELFFBQUtrRCxjQUFMLENBQW9CLE1BQXBCO0FBQ0UsR0FIRDtBQUlELEVBTkQ7O0FBUUE5RSxhQUFZMkIsU0FBWixDQUFzQlUsTUFBdEIsR0FBK0IsWUFBVTtBQUN2QyxNQUFJVCxPQUFPLElBQVg7QUFDQXhGLElBQUV3RixLQUFLeEIsS0FBUCxFQUFjNUQsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFXO0FBQ3RDb0YsUUFBS04sUUFBTCxDQUFjVSxJQUFkO0FBQ0E1RixLQUFFd0YsS0FBS1gsUUFBUCxFQUFpQjhCLElBQWpCO0FBQ0EzRyxLQUFFd0YsS0FBS2hCLE9BQVAsRUFBZ0I1RCxRQUFoQixDQUF5QixhQUF6QixFQUF3QytGLElBQXhDO0FBQ0FuQixRQUFLcUIsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDRSxHQUxEO0FBTUQsRUFSRDs7QUFVQWpELGFBQVkyQixTQUFaLENBQXNCWSxNQUF0QixHQUErQixZQUFXO0FBQ3hDLE1BQUlYLE9BQU8sSUFBWDtBQUNBeEYsSUFBRXdGLEtBQUtiLFFBQVAsRUFBaUJ2RSxFQUFqQixDQUFvQixPQUFwQixFQUE2QixZQUFXO0FBQ3pDb0YsUUFBS25CLE9BQUwsR0FBZW1CLEtBQUt4QixLQUFMLENBQVc0QyxXQUExQjtBQUNBcEIsUUFBS2UsU0FBTDtBQUNBdkcsS0FBRXdGLEtBQUtkLE9BQVAsRUFBZ0JpQyxJQUFoQjtBQUNBM0csS0FBRSxJQUFGLEVBQVE0RixJQUFSO0FBQ0UsR0FMRDtBQU1ELEVBUkQ7O0FBVUFoQyxhQUFZMkIsU0FBWixDQUFzQmUsU0FBdEIsR0FBa0MsWUFBVztBQUMzQyxNQUFJZCxPQUFPLElBQVg7QUFDQXhGLElBQUV3RixLQUFLZixFQUFQLEVBQVdyRSxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQ25DSixLQUFFd0YsS0FBS2hCLE9BQVAsRUFBZ0JvQixJQUFoQjtBQUNBSixRQUFLcUIsZ0JBQUwsQ0FBc0IsS0FBdEI7QUFDRSxHQUhEO0FBSUQsRUFORDs7QUFRQWpELGFBQVkyQixTQUFaLENBQXNCYyxZQUF0QixHQUFxQyxZQUFXO0FBQzlDLE1BQUliLE9BQU8sSUFBWDtBQUNBeEYsSUFBRXdGLEtBQUtoQixPQUFQLEVBQWdCcEUsRUFBaEIsQ0FBbUI7QUFDcEIsMEJBQXVCLDhCQUFXO0FBQ2pDO0FBQ0EsSUFIbUI7QUFJcEIsbUNBQWdDLHNDQUFXO0FBQ3pDO0FBQ0Q7QUFObUIsR0FBbkI7QUFRRCxFQVZEOztBQVlBd0QsYUFBWTJCLFNBQVosQ0FBc0JhLFdBQXRCLEdBQW9DLFlBQVc7QUFDOUMsTUFBSVosT0FBTyxJQUFYO0FBQUEsTUFDQzJDLElBQUkzQyxLQUFLeEIsS0FEVjtBQUVDaEcsVUFBUTJLLEdBQVIsQ0FBWVIsQ0FBWjtBQUNBbkksSUFBRXdGLEtBQUszQixPQUFMLENBQWFDLGFBQWIsQ0FBMkIsVUFBM0IsQ0FBRixFQUEwQzhFLE1BQTFDLENBQWlEO0FBQ2xEQyxVQUFPLEtBRDJDO0FBRWxEO0FBQ0FDLFVBQU8sZUFBV0MsS0FBWCxFQUFrQjdLLEVBQWxCLEVBQXVCO0FBQzdCRixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0J1SCxLQUFLSixhQUFwQztBQUNBLFFBQUsrQyxFQUFFTSxNQUFQLEVBQWdCO0FBQ2Z6SyxhQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBdUgsVUFBS0osYUFBTCxHQUFxQixPQUFyQjtBQUNBLEtBSEQsTUFHTztBQUNOcEgsYUFBUUMsR0FBUixDQUFZLGFBQVo7QUFDQXVILFVBQUtKLGFBQUwsR0FBcUIsTUFBckI7QUFDQTtBQUNEK0MsTUFBRWEsS0FBRjtBQUNBLElBYmlEO0FBY2xEQyxVQUFPLGVBQVVGLEtBQVYsRUFBaUI3SyxFQUFqQixFQUFzQjtBQUM1QnNILFNBQUtrRCxjQUFMO0FBQ0EsSUFoQmlEO0FBaUJsRFEsV0FBUSxnQkFBU0gsS0FBVCxFQUFnQjdLLEVBQWhCLEVBQW9CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQXZCaUQ7QUF3QmxEaUQsU0FBTSxjQUFTNEgsS0FBVCxFQUFnQjdLLEVBQWhCLEVBQW9CO0FBQ3pCRixZQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEJ1SCxLQUFLSixhQUFuQztBQUNBSSxTQUFLcUIsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDQXJCLFNBQUsyRCxpQkFBTCxDQUF1QmpMLEVBQXZCO0FBQ0EsUUFBS3NILEtBQUtKLGFBQUwsSUFBc0IsTUFBM0IsRUFBb0M7QUFDbkNwSCxhQUFRQyxHQUFSLENBQVksT0FBWjtBQUNBa0ssT0FBRWlCLElBQUY7QUFDQSxLQUhELE1BR087QUFDTmpCLE9BQUVhLEtBQUY7QUFDQTtBQUNEO0FBbENpRCxHQUFqRDtBQW9DRCxFQXhDRDs7QUEwQ0FwRixhQUFZMkIsU0FBWixDQUFzQlcsZUFBdEIsR0FBd0MsWUFBVTtBQUNoRCxNQUFJVixPQUFPLElBQVg7QUFBQSxNQUNDMkMsSUFBSTNDLEtBQUt4QixLQURWO0FBRUFoRSxJQUFFd0YsS0FBS1YsT0FBUCxFQUFnQjFFLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVU7QUFDdkNwQyxXQUFRQyxHQUFSLENBQVlrSyxDQUFaO0FBQ0EsT0FBS2pLLEdBQUdDLElBQUgsQ0FBUUssUUFBUixHQUFtQk8sR0FBeEIsRUFBOEI7QUFDNUIsUUFBSyxPQUFPb0osRUFBRWtCLGlCQUFULEtBQStCLFdBQS9CLElBQThDbEIsRUFBRWtCLGlCQUFGLElBQXVCLElBQTFFLEVBQ0RsQixFQUFFa0IsaUJBQUYsR0FBc0IsS0FBdEI7QUFDQyxRQUFLLE9BQU9sQixFQUFFbUIsV0FBVCxLQUF5QixXQUF6QixJQUF3Q25CLEVBQUVvQixXQUFGLElBQWlCLElBQTlELEVBQ0RwQixFQUFFbUIsV0FBRixHQUFnQixJQUFoQixDQURDLEtBRUssSUFBSyxPQUFPbkIsRUFBRWtCLGlCQUFULEtBQStCLFdBQS9CLElBQThDbEIsRUFBRXFCLGlCQUFGLElBQXVCLElBQTFFLEVBQ05yQixFQUFFa0IsaUJBQUYsR0FBc0IsSUFBdEI7QUFDQTtBQUNELE9BQUlsQixFQUFFc0IsaUJBQU4sRUFDRXRCLEVBQUVzQixpQkFBRjtBQUNGO0FBQ0E7QUFIQSxRQUlLLElBQUl0QixFQUFFdUIsdUJBQU4sRUFDSHZCLEVBQUV1Qix1QkFBRixHQURHLEtBRUEsSUFBS3ZCLEVBQUV3QixxQkFBUCxFQUNIeEIsRUFBRXdCLHFCQUFGO0FBQ0EsR0FsQkQ7QUFtQkQsRUF0QkQ7O0FBd0JBL0YsYUFBWTJCLFNBQVosQ0FBc0JNLGdCQUF0QixHQUF5QyxZQUFXO0FBQ25ELE1BQUlMLE9BQU8sSUFBWDtBQUFBLE1BQ0NOLFdBQVcsS0FBS0EsUUFEakI7QUFBQSxNQUVDakIsU0FBUyxLQUFLQSxNQUZmO0FBQUEsTUFHQ0UsVUFBVSxLQUFLQSxPQUhoQjtBQUlBLE1BQUllLFNBQVMvRSxJQUFULENBQWMsZUFBZCxFQUErQjJDLFFBQS9CLENBQXdDLEtBQXhDLENBQUosRUFBb0Q7QUFDbkQ5QyxLQUFFaUUsTUFBRixFQUFVMEMsSUFBVixHQUFpQmlELEdBQWpCLENBQXFCLEVBQUV2SSxTQUFTLENBQVgsRUFBckIsRUFBcUN3SSxJQUFyQyxDQUEwQyxXQUExQyxFQUF1RCxNQUF2RDtBQUNBN0osS0FBRW1FLE9BQUYsRUFBV3lGLEdBQVgsQ0FBZSxFQUFFdkksU0FBUyxDQUFYLEVBQWYsRUFBK0J1RSxJQUEvQixHQUFzQ2lFLElBQXRDLENBQTJDLFdBQTNDLEVBQXdELE9BQXhEO0FBQ0FyRSxRQUFLeEIsS0FBTCxHQUFhaEUsRUFBRWlFLE1BQUYsRUFBVUMsR0FBVixDQUFjLENBQWQsQ0FBYjtBQUNBLEdBSkQsTUFJTztBQUNObEUsS0FBRWlFLE1BQUYsRUFBVTJGLEdBQVYsQ0FBYyxFQUFFdkksU0FBUyxDQUFYLEVBQWQsRUFBOEJ1RSxJQUE5QixHQUFxQ2lFLElBQXJDLENBQTBDLFdBQTFDLEVBQXVELE9BQXZEO0FBQ0E3SixLQUFFbUUsT0FBRixFQUFXd0MsSUFBWCxHQUFrQmlELEdBQWxCLENBQXNCLEVBQUV2SSxTQUFTLENBQVgsRUFBdEIsRUFBc0N3SSxJQUF0QyxDQUEyQyxXQUEzQyxFQUF3RCxNQUF4RDtBQUNBckUsUUFBS3hCLEtBQUwsR0FBYWhFLEVBQUVtRSxPQUFGLEVBQVdELEdBQVgsQ0FBZSxDQUFmLENBQWI7QUFDQTtBQUNEc0IsT0FBS3hCLEtBQUwsQ0FBVzhGLElBQVg7QUFDQSxFQWZEOztBQWlCQWxHLGFBQVkyQixTQUFaLENBQXNCNEQsaUJBQXRCLEdBQTBDLFVBQVNqTCxFQUFULEVBQWE7QUFDckQsTUFBSXNILE9BQU8sSUFBWDtBQUNELE1BQUkyQyxJQUFJbkksRUFBRSxlQUFGLEVBQW1Ca0UsR0FBbkIsQ0FBdUIsQ0FBdkIsQ0FBUjtBQUNBaUUsSUFBRXZCLFdBQUYsR0FBZ0JtRCxTQUFTNUIsRUFBRVIsUUFBRixJQUFjekosR0FBRzhMLEtBQUgsR0FBVyxHQUF6QixDQUFULEVBQXdDLEVBQXhDLENBQWhCO0FBQ0F4RSxPQUFLcUIsZ0JBQUwsQ0FBc0IsS0FBdEI7QUFDQSxFQUxEOztBQU9BakQsYUFBWTJCLFNBQVosQ0FBc0JtRCxjQUF0QixHQUF1QyxVQUFVdUIsSUFBVixFQUFnQjtBQUN0RCxNQUFJekUsT0FBTyxJQUFYO0FBQUEsTUFDQXhCLFFBQVF3QixLQUFLeEIsS0FEYjtBQUVBLE1BQUk0RCxDQUFKO0FBQUEsTUFBT0MsQ0FBUDtBQUFBLE1BQVVxQyxLQUFLN0MsS0FBS0MsS0FBTCxDQUFXdEQsTUFBTTRDLFdBQWpCLENBQWY7QUFBQSxNQUE4Q3VELE1BQU05QyxLQUFLQyxLQUFMLENBQVd0RCxNQUFNMkQsUUFBakIsQ0FBcEQ7QUFDQSxNQUFLdUMsS0FBSyxFQUFWLEVBQWU7QUFDZHJDLE9BQUksSUFBSjtBQUNBRCxPQUFJc0MsR0FBR3BDLFFBQUgsR0FBY3BJLE1BQWQsR0FBdUIsQ0FBdkIsR0FBMkIsTUFBTXdLLEdBQUdwQyxRQUFILEVBQWpDLEdBQWlEb0MsRUFBckQ7QUFDQSxHQUhELE1BR087QUFDTnRDLE9BQUltQyxTQUFVRyxLQUFLLEVBQWYsQ0FBSixFQUNBckMsSUFBSWtDLFNBQVUsQ0FBQ0csS0FBS3RDLENBQU4sSUFBVyxFQUFyQixDQURKO0FBRUFBLE9BQUlBLEVBQUVFLFFBQUYsR0FBYXBJLE1BQWIsR0FBc0IsQ0FBdEIsR0FBMEIsTUFBTWtJLENBQWhDLEdBQW9DQSxDQUF4QztBQUNBQyxPQUFJQSxFQUFFQyxRQUFGLEdBQWFwSSxNQUFiLEdBQXNCLENBQXRCLEdBQTBCLE1BQU1tSSxDQUFoQyxHQUFvQ0EsQ0FBeEM7QUFDQTtBQUNEckMsT0FBS1QsU0FBTCxDQUFlZ0QsU0FBZixHQUEyQkYsSUFBSSxHQUFKLEdBQVVELENBQXJDO0FBQ0EsTUFBS3FDLFFBQVEsTUFBYixFQUFzQjtBQUNyQmpLLEtBQUUsVUFBRixFQUFjNEksTUFBZCxDQUFxQjtBQUNwQm9CLFdBQU9ELFNBQVcsTUFBTUksR0FBUCxHQUFjRCxFQUF4QjtBQURhLElBQXJCO0FBR0E7QUFDRCxFQW5CRDs7QUFxQkF0RyxhQUFZMkIsU0FBWixDQUFzQnNCLGdCQUF0QixHQUF5QyxVQUFTdUQsSUFBVCxFQUFjO0FBQ3JELE1BQUk1RSxPQUFPLElBQVg7QUFDQSxNQUFJNEUsSUFBSixFQUFVO0FBQ1g1RSxRQUFLbEIsWUFBTCxHQUFvQitGLFdBQVcsWUFBVztBQUN4Q3JLLE1BQUV3RixLQUFLaEIsT0FBUCxFQUFnQm9CLElBQWhCO0FBQ0QsSUFGbUIsRUFFakIsSUFGaUIsQ0FBcEI7QUFHRSxHQUpELE1BSU87QUFDUjBFLGdCQUFhOUUsS0FBS2xCLFlBQWxCO0FBQ0U7QUFDRixFQVREOztBQVdBVixhQUFZMkIsU0FBWixDQUFzQmdCLFNBQXRCLEdBQWtDLFlBQVc7QUFDNUMsTUFBSWYsT0FBUSxJQUFaO0FBQUEsTUFDQzJDLElBQU0zQyxLQUFLeEIsS0FEWjs7QUFHQSxNQUFLbUUsRUFBRU0sTUFBUCxFQUFnQjtBQUNmTixLQUFFaUIsSUFBRjtBQUNBLEdBRkQsTUFFTztBQUNOakIsS0FBRWEsS0FBRjtBQUNBO0FBQ0QsRUFURDs7QUFXQXBGLGFBQVkyQixTQUFaLENBQXNCMEMsWUFBdEIsR0FBcUMsWUFBVztBQUMvQyxNQUFJekMsT0FBTyxJQUFYO0FBQUEsTUFDQ2YsS0FBSyxFQUROO0FBQUEsTUFFQzhGLEtBQUsvRSxLQUFLakIsTUFBTCxDQUFZVCxhQUFaLENBQTBCLE1BQTFCLENBRk47QUFBQSxNQUdDSCxNQUFNLEVBSFA7QUFJQWMsT0FBSzhGLEdBQUc5RSxPQUFILENBQVdoQixFQUFoQjs7QUFFQSxNQUFJK0YsWUFBWTNNLFNBQVM2RixhQUFULENBQXVCLFFBQXZCLENBQWhCO0FBQ0E4RyxZQUFVQyxFQUFWLEdBQWUsYUFBZjtBQUNBakYsT0FBS2pCLE1BQUwsQ0FBWW1HLFdBQVosQ0FBeUJGLFNBQXpCOztBQUVBeEosaUJBQWV5RCxFQUFmLEVBQW1CLFlBQVk7QUFDOUIsT0FBS2UsS0FBS3pCLGNBQVYsRUFBMkI7QUFDMUIvRixZQUFRQyxHQUFSLENBQVksRUFBWjtBQUNBdUgsU0FBS3VCLFdBQUwsQ0FBa0J2QixLQUFLekIsY0FBdkIsRUFBdUMsUUFBdkM7QUFDQXlCLFNBQUtoQixPQUFMLENBQWE0RCxLQUFiLENBQW1CL0csT0FBbkIsR0FBNkIsQ0FBN0I7QUFDQTtBQUNBckQsV0FBUUMsR0FBUixDQUFZLFlBQVo7QUFDQSxPQUFJME0sU0FBUzlNLFNBQVMrTSxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFBQSxPQUNDQyxVQUFVRixPQUFPRyxVQUFQLENBQWtCLElBQWxCLENBRFg7QUFBQSxPQUVDN0osTUFBTSxJQUFJOEosS0FBSixFQUZQO0FBQUEsT0FHQ0MsT0FBTyxDQUhSO0FBQUEsT0FJQ0MsT0FBTyxDQUpSO0FBQUEsT0FLQ3pELEtBTEQ7QUFNQXZHLE9BQUkwQyxHQUFKLEdBQVVjLEVBQVY7QUFDQW9HLFdBQVFLLFdBQVIsR0FBc0IsQ0FBdEI7O0FBRUFQLFVBQU92QyxLQUFQLENBQWErQyxLQUFiLEdBQXFCLE1BQXJCO0FBQ0FSLFVBQU92QyxLQUFQLENBQWFDLE1BQWIsR0FBc0IsTUFBdEI7QUFDQTs7QUFFQTJDLFVBQU94RixLQUFLM0IsT0FBTCxDQUFhcEQsV0FBcEIsRUFDQXdLLE9BQU96RixLQUFLeUIsUUFBTCxDQUFjaEcsSUFBSW1LLFlBQWxCLEVBQWdDbkssSUFBSW9LLGFBQXBDLEVBQW1ETCxJQUFuRCxDQURQO0FBRUF4RCxXQUFRQyxZQUFZLFlBQVU7QUFDN0IsUUFBTW9ELFFBQVFLLFdBQVQsQ0FBc0JJLE9BQXRCLENBQThCLENBQTlCLElBQW1DLENBQXhDLEVBQTRDO0FBQzNDTixhQUFRLENBQVI7QUFDQUMsYUFBUSxDQUFSO0FBQ0FKLGFBQVFLLFdBQVIsSUFBdUIsSUFBdkI7QUFDQUwsYUFBUVUsU0FBUixDQUFrQnRLLEdBQWxCLEVBQXVCMEosT0FBT1EsS0FBUCxHQUFhLENBQWIsR0FBaUJILE9BQUssQ0FBN0MsRUFBZ0RMLE9BQU90QyxNQUFQLEdBQWMsQ0FBZCxHQUFrQjRDLE9BQUssQ0FBdkUsRUFBMEVELElBQTFFLEVBQWdGQyxJQUFoRjtBQUNBLEtBTEQsTUFLTztBQUNOWCxrQkFBYTlDLEtBQWI7QUFDQTtBQUNELElBVE8sRUFTTCxNQUFJLEVBVEMsQ0FBUjtBQVdELEdBakNEO0FBa0NBLEVBN0NEOztBQStDQTVELGFBQVkyQixTQUFaLENBQXNCRyxRQUF0QixHQUFpQyxVQUFXbkYsTUFBWCxFQUFtQmlMLEtBQW5CLEVBQTJCO0FBQzNELE1BQUtqTCxPQUFPVyxTQUFQLENBQWlCbUMsT0FBakIsQ0FBeUJtSSxLQUF6QixJQUFrQyxDQUFDLENBQXhDLEVBQTRDO0FBQzVDakwsU0FBT1csU0FBUCxJQUFvQixNQUFNc0ssS0FBMUI7QUFDQSxFQUhEOztBQUtBNUgsYUFBWTJCLFNBQVosQ0FBc0J3QixXQUF0QixHQUFvQyxVQUFXeEcsTUFBWCxFQUFtQmlMLEtBQW5CLEVBQTJCO0FBQzlELE1BQUlDLFNBQVMsSUFBSUMsTUFBSixDQUFXRixLQUFYLENBQWI7QUFDQWpMLFNBQU9XLFNBQVAsR0FBbUJoRCxHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBY2tDLE9BQU9XLFNBQVAsQ0FBaUIzQyxPQUFqQixDQUEwQmtOLE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEM7Ozs7OztBQzVrQkEsMEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjM3YzdhNjBhYzA0YWI3M2Q4MDNcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuXHRkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24oIG1zZyApe1xuXHRyZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cblx0Ly/snKDti7gg66mU7ISc65OcXG5cdHV0aWw6IHtcblx0XHQvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG5cdFx0Y29tbW9uTm90aGluZzogZnVuY3Rpb24oKXt9XG5cblx0XHQvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuXHRcdCx0cmltOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9XG5cdFx0LGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuXHRcdFx0Ly/rqqjrsJTsnbwgVUFcblx0XHRcdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGVjazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmFuZHJvaWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcblx0XHRcdFx0XHRcdGVsc2UgcmV0dXJuICdhbmRyb2lkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcblx0XHRcdFx0XHRpZiAoICF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zICkgcmV0dXJuICduby1tb2JpbGUnO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0YW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0Z2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdCxkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG5cdH1cblxuXHQvLyDqs7XthrUg66mU7ISc65OcXG5cdCxjb21tb246IHtcblxuXHRcdC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuXHRcdGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcblx0XHRcdHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSwgYVRhZyA9IG51bGwsIGhyZWYgPSBudWxsO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRhVGFnID0gYWxsQVtpXTtcblx0XHRcdFx0aHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmICggdWkudXRpbC50cmltKCBocmVmICkgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbCApXG5cdFx0XHRcdFx0YVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyB0b2dnbGVDbGFzcyBjdXN0b21cblx0XHQsdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCl7XG5cblx0XHR9XG5cblx0XHQvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcblx0XHQsdGFibGVGYWRlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuXHRcdFx0aWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly9sb2FkaW5nIG1hc2tcblx0XHQsbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGltYWdlUHJlbG9hZGVyKCcvY29tbW9uL2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZyl7XG5cdFx0XHRcdFx0aW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicgKSBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIDIwMCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Ly8g6re466O5IO2GoOq4gFxuXHRcdCx0b2dnbGVHcm91cCA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KXtcblx0XHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0JChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcblx0X3Njb3BlOiAnJ1xuXG5cdCxkZWZhdWx0T3B0aW9uczoge1xuXHQgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHQgIGxvb3A6IHRydWUsXG5cdCAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG5cdCAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcblx0fVxuXG5cdCxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG5cdCAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblx0ICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG5cdCAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHQgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuXHR9XG5cblx0LHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdCAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0fVxuXG5cdCxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuXHQgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG5cdH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuXHRfc2NvcGU6ICcnXG5cdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG5cdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcblx0XHRlbHNlIFxuXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG5cdFx0dGhpcy5jbGljaygpO1xuXHR9XG5cdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG5cdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG5cdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb24sXG5cdCAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXG5cdCQoJ2JvZHknKS5hZGRDbGFzcyggW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Y29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpe1xuXHRcdC8vY2FsbGJhY2tzXG5cdH0pO1xuXG5cdC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6Ttlolcblx0aWYgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xICkge1xuXHRcdGRldi5hcHBlbmRNZW51TGlzdCgpO1xuXHRcdGRldi5hcHBlbmRNZW51QnRuKCk7XG5cdH1cbn0pO1xuXG4vKlxuKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG5cdHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0aW1hZ2VzLnNyYyA9IGltZztcblxuXHRpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyApIGNhbGxiYWNrKGltYWdlcyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKHdyYXBwZXIpIHtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IDA7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblxuXHR0aGlzLmdldER1cmF0aW9uKCk7XG5cdHRoaXMuX2luaXQoKTtcblx0Y29uc29sZS5sb2coJ3ZpZGVvIHBsYXllciBjYWxsJyk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQubG93UmVzLnNyYyA9IHRoYXQubG93UmVzLmRhdGFzZXQuc3JjO1xuXHR0aGF0LmhpZ2hSZXMuc3JjID0gdGhhdC5oaWdoUmVzLmRhdGFzZXQuc3JjO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0dGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHR9O1xuXHR0aGF0LnZpZGVvLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdvbmNoYW5nZScpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC52aWRlby5vbnBsYXkgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLmhpZGUoKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdwbGF5aW5nJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdGNvbnNvbGUubG9nKCdyZWFkeVN0YXRlJyk7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cdFx0XHR0aGF0LnBvc3RlckxvYWRlZCgpO1xuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuXHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuICBjb25zb2xlLmRpcih2KTtcbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzdGFydDogZnVuY3Rpb24gKCBldmVudCwgdWkgKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NsaWRlciBzdGFydCA6ICcsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdFx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHRcdGNvbnNvbGUubG9nKCdwYXVzZSB0cnVlJyk7XG5cdFx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZygncGF1c2UgZmFsc2UnKTtcblx0XHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHR9XG5cdFx0di5wYXVzZSgpO1xuXHR9LFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0Ly8gaWYgKCB2LnBhdXNlZCAmJiB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BhdXNlJyApIHtcblx0XHQvLyBcdHYucGF1c2UoKTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0di5wbGF5KCk7XG5cdFx0Ly8gfVxuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0b3AgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncGxheT8nKTtcblx0XHRcdHYucGxheSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2LnBhdXNlKCk7XG5cdFx0fVxuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRjb25zb2xlLmxvZyh2KTtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0Ly8gZWxzZSBpZiAodi5tb3pSZXF1ZXN0RnVsbFNjcmVlbilcblx0Ly8gIHYubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JChoaWdoUmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHYgPSAkKCd2aWRlbzp2aXNpYmxlJykuZ2V0KDApO1xuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0Y29uc29sZS5sb2coMTEpO1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKCdzZXR0aW1lb3V0Jyk7XG5cdFx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcblx0XHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0XHRpbWdIID0gMCxcblx0XHRcdFx0dGltZXI7XG5cdFx0XHRpbWcuc3JjID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMDtcblxuXHRcdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0XHQvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuXG5cdFx0XHRpbWdXID0gdGhhdC53cmFwcGVyLmNsaWVudFdpZHRoLFxuXHRcdFx0aW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXHRcdFx0dGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoIChjb250ZXh0Lmdsb2JhbEFscGhhKS50b0ZpeGVkKDEpIDwgMSApIHtcblx0XHRcdFx0XHRpbWdXICs9IDE7XG5cdFx0XHRcdFx0aW1nSCArPSAxO1xuXHRcdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDMwMC8zMClcblx0XHRcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWRkS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdGlmICggdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoa2xhc3MpO1xuXHR0YXJnZXQuY2xhc3NOYW1lID0gdWkudXRpbC50cmltKCB0YXJnZXQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlZ2V4cCwgXCJcIiApICk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9