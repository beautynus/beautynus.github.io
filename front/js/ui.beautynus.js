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
					imagePreloader('/front/images/loading-circular.gif', function (img) {
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
		// that.video.oncuechange = function(){
		// 	console.log('cuechange');
		// };
		// that.video.onchange = function () {
		// 	console.log('onchange');
		// };
	};
	
	VideoPlayer.prototype._onPlay = function () {
		var that = this;
	
		that.video.onplay = function () {
			$(that.poster).hide();
			$(that.pauseBtn).show();
			$(that.playBtn).hide();
			if (this.currentTime != 0) that.controlVisibling(true);
			that.playPauseFlag = 'play';
			console.log('onplay', that.playPauseFlag);
		};
	
		that.video.onplaying = function () {
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
			that.playPauseFlag = 'pause';
			console.log('pause button', that.playPauseFlag);
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
				// if ( v.paused ) {
				// 	console.log('pause true');
				// 	that.playPauseFlag = 'pause';
				// } else {
				// 	console.log('pause false');
				// 	that.playPauseFlag = 'play';
				// }
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
				that.removeKlass(that.loadingElement, "active");
				that.control.style.opacity = 1;
			}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTUxOTZhYTVjMDg3YmQwY2FlOWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiZ2V0IiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJwbGF5UGF1c2VGbGFnIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJkYXRhc2V0IiwiYWRkS2xhc3MiLCJfcGxheSIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwicGxheVBhdXNlIiwib25wbGF5Iiwic2hvdyIsImN1cnJlbnRUaW1lIiwiY29udHJvbFZpc2libGluZyIsIm9ucGxheWluZyIsInJlbW92ZUtsYXNzIiwib25wYXVzZSIsImdldFJhdGlvIiwieCIsInkiLCJsIiwiTWF0aCIsInJvdW5kIiwiZXEiLCJ0aW1lciIsInNldEludGVydmFsIiwicmVhZHlTdGF0ZSIsImR1cmF0aW9uIiwicyIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJwb3N0ZXJMb2FkZWQiLCJhbGxvY2F0ZVNpemUiLCJ2Iiwic3R5bGUiLCJoZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsImRpciIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJldmVudCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJjc3MiLCJhdHRyIiwibG9hZCIsInBhcnNlSW50IiwidmFsdWUiLCJzZWVrIiwiY3QiLCJkdXIiLCJjdHJsIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImVsIiwiY2FudmFzVGFnIiwiaWQiLCJhcHBlbmRDaGlsZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ0b0ZpeGVkIiwiZHJhd0ltYWdlIiwia2xhc3MiLCJyZWdleHAiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNyQ0E7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LElBQVIsQ0FBY2tDLE9BQU9XLFNBQVAsQ0FBaUIzQyxPQUFqQixDQUEwQmdOLE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEM7Ozs7OztBQzNrQkEsMEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYTUxOTZhYTVjMDg3YmQwY2FlOWJcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuXHRkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24oIG1zZyApe1xuXHRyZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cblx0Ly/snKDti7gg66mU7ISc65OcXG5cdHV0aWw6IHtcblx0XHQvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG5cdFx0Y29tbW9uTm90aGluZzogZnVuY3Rpb24oKXt9XG5cblx0XHQvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuXHRcdCx0cmltOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9XG5cdFx0LGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuXHRcdFx0Ly/rqqjrsJTsnbwgVUFcblx0XHRcdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGVjazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmFuZHJvaWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcblx0XHRcdFx0XHRcdGVsc2UgcmV0dXJuICdhbmRyb2lkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcblx0XHRcdFx0XHRpZiAoICF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zICkgcmV0dXJuICduby1tb2JpbGUnO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0YW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0Z2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdCxkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG5cdH1cblxuXHQvLyDqs7XthrUg66mU7ISc65OcXG5cdCxjb21tb246IHtcblxuXHRcdC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuXHRcdGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcblx0XHRcdHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSwgYVRhZyA9IG51bGwsIGhyZWYgPSBudWxsO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRhVGFnID0gYWxsQVtpXTtcblx0XHRcdFx0aHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmICggdWkudXRpbC50cmltKCBocmVmICkgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbCApXG5cdFx0XHRcdFx0YVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyB0b2dnbGVDbGFzcyBjdXN0b21cblx0XHQsdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCl7XG5cblx0XHR9XG5cblx0XHQvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcblx0XHQsdGFibGVGYWRlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuXHRcdFx0aWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly9sb2FkaW5nIG1hc2tcblx0XHQsbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2xvYWRpbmctY2lyY3VsYXIuZ2lmJywgZnVuY3Rpb24oaW1nKXtcblx0XHRcdFx0XHRpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyApIGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0JCgnYm9keScpLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgMjAwLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHQvLyDqt7jro7kg7Yag6riAXG5cdFx0LHRvZ2dsZUdyb3VwIDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpe1xuXHRcdFx0JChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0XHQkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fVxufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0YmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCl7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgdmFyIGNhcmROZXdzID0ge1xuXHRfc2NvcGU6ICcnXG5cblx0LGRlZmF1bHRPcHRpb25zOiB7XG5cdCAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG5cdCAgbG9vcDogdHJ1ZSxcblx0ICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcblx0ICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuXHR9XG5cblx0LGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKXtcblx0ICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuXHQgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcblx0ICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG5cdCAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG5cdH1cblxuXHQsc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKXtcblx0ICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuXHR9XG5cblx0LG1hbmFnZXI6IGZ1bmN0aW9uKCl7XG5cdCAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcblx0fVxuXG4gIH07XG4gIGJlYXV0eW51cy5jYXJkTmV3cyA9IGNhcmROZXdzO1xuXG4gIHZhciBhY2NvcmRpYW4gPSB7XG5cdF9zY29wZTogJydcblx0LGluaXQ6IGZ1bmN0aW9uICggX3Njb3BlICl7XG5cdFx0aWYgKCB0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnIClcblx0XHRcdHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuXHRcdGVsc2UgXG5cdFx0XHR0aGlzLl9zY29wZSA9IF9zY29wZTtcblx0XHR0aGlzLmNsaWNrKCk7XG5cdH1cblx0LGNsaWNrOiBmdW5jdGlvbiAoICApIHtcblx0XHQkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG5cdFx0XHRpZiAoIGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpIClcblx0XHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQod2luZG93KS5zY3JvbGxUb3AoIGl0ZW0ucG9zaXRpb24oKS50b3AgKTtcblx0XHR9KTtcblx0fVxuICB9O1xuICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDrj5nsg4Hsg4HtmJVcblxuICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIHV0aWwgPSB1aS51dGlsLFxuXHQgIGNvbW1vbiA9IHVpLmNvbW1vbixcblx0ICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuXHRjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuXHRjb21tb24udGFibGVGYWRlKCk7XG5cblx0JCgnYm9keScpLmFkZENsYXNzKCBbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykgKTtcblxuXHRiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuXHRjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCl7XG5cdFx0Ly9jYWxsYmFja3Ncblx0fSk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEgKSB7XG5cdFx0ZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG5cdFx0ZGV2LmFwcGVuZE1lbnVCdG4oKTtcblx0fVxufSk7XG5cbi8qXG4qXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcblx0dmFyIGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRpbWFnZXMuc3JjID0gaW1nO1xuXG5cdGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKXtcblx0XHRpZiAoIHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nICkgY2FsbGJhY2soaW1hZ2VzKTtcblx0fSwgZmFsc2UpO1xufTtcblxuLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24od3JhcHBlcikge1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcblx0dGhpcy5sb2FkaW5nRWxlbWVudFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvLWxvYWRpbmctaW1hZ2UnKSxcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gMDtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXG5cdHRoaXMuZ2V0RHVyYXRpb24oKTtcblx0dGhpcy5faW5pdCgpO1xuXHRjb25zb2xlLmxvZygndmlkZW8gcGxheWVyIGNhbGwnKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5sb3dSZXMuc3JjID0gdGhhdC5sb3dSZXMuZGF0YXNldC5zcmM7XG5cdHRoYXQuaGlnaFJlcy5zcmMgPSB0aGF0LmhpZ2hSZXMuZGF0YXNldC5zcmM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5fcGxheSgpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0aWYgKCB0aGF0LnBsYXlGbGFnICkge1xuXHRcdHRoYXQucGxheUZsYWcgPSBmYWxzZTtcblx0XHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHRcdGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXHQvLyB0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIHRoYXQudmlkZW8ub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ29uY2hhbmdlJyk7XG5cdC8vIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdCQodGhhdC5wb3N0ZXIpLmhpZGUoKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLnNob3coKTtcblx0XHQkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHRjb25zb2xlLmxvZygnb25wbGF5JywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLmhpZGUoKTtcblx0XHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHRcdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRSYXRpbyA9IGZ1bmN0aW9uKHgsIHksIGwpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdGFyZ2V0ID0gMDtcblx0dGFyZ2V0ID0gTWF0aC5yb3VuZCgoeSAqIGwpIC8geCk7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdmlkZW8gPSAkKHRoYXQud3JhcHBlcikuZmluZCgndmlkZW86dmlzaWJsZScpLmVxKDApLmdldCgwKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cdFx0XHR0aGF0LnBvc3RlckxvYWRlZCgpO1xuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuXHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG5cdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdGNvbnNvbGUubG9nKCdwYXVzZSBidXR0b24nLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcbiAgY29uc29sZS5kaXIodik7XG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RhcnQgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdC8vIGlmICggdi5wYXVzZWQgKSB7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZygncGF1c2UgdHJ1ZScpO1xuXHRcdC8vIFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0Y29uc29sZS5sb2coJ3BhdXNlIGZhbHNlJyk7XG5cdFx0Ly8gXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdFx0Ly8gfVxuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdC8vIGlmICggdi5wYXVzZWQgJiYgdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwYXVzZScgKSB7XG5cdFx0Ly8gXHR2LnBhdXNlKCk7XG5cdFx0Ly8gfSBlbHNlIHtcblx0XHQvLyBcdHYucGxheSgpO1xuXHRcdC8vIH1cblx0fSxcblx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NsaWRlciBzdG9wIDogJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0Y29uc29sZS5sb2coJ3BsYXk/Jyk7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0Y29uc29sZS5sb2codik7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdC8vIGVsc2UgaWYgKHYubW96UmVxdWVzdEZ1bGxTY3JlZW4pXG5cdC8vICB2Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQoaGlnaFJlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0dGhhdC52aWRlbyA9ICQobG93UmVzKS5nZXQoMCk7XG5cdH0gZWxzZSB7XG5cdFx0JChsb3dSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQoaGlnaFJlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHR0aGF0LnZpZGVvID0gJChoaWdoUmVzKS5nZXQoMCk7XG5cdH1cblx0dGhhdC52aWRlby5sb2FkKCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2ID0gJCgndmlkZW86dmlzaWJsZScpLmdldCgwKTtcblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdD0gdGhpcyxcblx0XHR2IFx0XHQ9IHRoYXQudmlkZW87XG5cblx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5kYXRhc2V0LmJnO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblxuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHRoYXQuY29udHJvbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZXI7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cblx0XHRpbWdXID0gdGhhdC53cmFwcGVyLmNsaWVudFdpZHRoLFxuXHRcdGltZ0ggPSB0aGF0LmdldFJhdGlvKGltZy5uYXR1cmFsV2lkdGgsIGltZy5uYXR1cmFsSGVpZ2h0LCBpbWdXKTtcblx0XHR0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoIChjb250ZXh0Lmdsb2JhbEFscGhhKS50b0ZpeGVkKDEpIDwgMSApIHtcblx0XHRcdFx0aW1nVyArPSAxO1xuXHRcdFx0XHRpbWdIICs9IDE7XG5cdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoaW1nLCBjYW52YXMud2lkdGgvMiAtIGltZ1cvMiwgY2FudmFzLmhlaWdodC8yIC0gaW1nSC8yLCBpbWdXLCBpbWdIKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHR9XG5cdFx0fSwgMzAwLzMwKVxuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=