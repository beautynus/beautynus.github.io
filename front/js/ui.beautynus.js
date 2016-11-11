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
	window.VideoPlayer = function (wrapper, endedCallback) {
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
		this.endedCallback = typeof endedCallback == 'function' ? endedCallback : function () {
			console.warn('endedCallback type is not a function.');
		};
	
		this.getDuration();
		this._init();
		console.log('video player call');
	};
	
	VideoPlayer.prototype._init = function () {
		var that = this;
	
		// that.lowRes.setAttribute('src', that.lowRes.dataset.src);
		// that.highRes.setAttribute('src', that.highRes.dataset.src);
		$(that.lowRes).attr('src', $(that.lowRes).data('src'));
		$(that.highRes).attr('src', $(that.highRes).data('src'));
	
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
			if (that.video.onwebkitfullscreenchange) {
				that.video.onwebkitfullscreenchange = function () {
					console.log('aaaaaa');
				};
			}
	
			that.video.addEventListener('webkitbeginfullscreen', function () {
				console.log('fullscreen bigin');
			}, false);
			that.video.addEventListener('webkitendfullscreen', function () {
				console.log('fullscreen end');
				if (this.ended) {
					setTimeout(function () {
						if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?')) {
							alert('확인');
						} else {
							alert('취소');
						}
					}, 500);
				}
			}, false);
		}
		that.playPause();
	
		// that.video.oncuechange = function(){
		// 	console.log('cuechange');
		// };
		// that.video.onchange = function () {
		// 	console.log('onchange');
		// };
		// if ( that.video.fullscreenchange )
		// 	that.video.fullscreenchange();
	
		// if ( that.video.onwebkitfullscreenchange ) {
		// 	that.video.onwebkitfullscreenchange = function(){
		// 		if ( this.ended ) {
		// 			setTimeout(function(){
		// 				if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?') ) {
		// 					alert('확인');
		// 				} else {
		// 					alert('취소');
		// 				}
		// 			}, 500);
		// 		}
		// 	}
		// } else if () {
		// 	that.video.onwebkitfullscreenchange = function(){
		// 		if ( this.ended ) {
		// 			setTimeout(function(){
		// 				if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?') ) {
		// 					alert('확인');
		// 				} else {
		// 					alert('취소');
		// 				}
		// 			}, 500);
		// 		}
		// 	}
		// }
	
		// document.addEventListener('webkitfullscreenchange', function(){
		// 	endFull();
		// }, false);
		// document.addEventListener('fullscreenchange', function(){
		// 	endFull();
		// }, false);
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
		var that = this,
		    v = that.video;
		that.video.onpause = function () {
			$(that.control).show();
			$(that.pauseBtn).hide();
			$(that.playBtn).show();
			if (this.currentTime > 0) that.btnGroup.hide();
			that.controlVisibling(false);
			if (v.ended) {
				if (v.exitFullscreen) v.exitFullscreen();else if (v.webkitExitFullscreen) v.webkitExitFullscreen();
				// if ( this.ended ) {
	
				// }
			}
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
				v.pause();
			},
			slide: function slide(event, ui) {
				that.getCurrentTime();
			},
			change: function change(event, ui) {},
			stop: function stop(event, ui) {
				console.log('slider stop : ', that.playPauseFlag);
				that.controlVisibling(true);
				that.changeCurrentTime(ui);
				if (that.playPauseFlag == 'play') {
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
			if (ui.util.isDevice().ios) {
				if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysInline == true) v.webkitPlaysInline = false;
				if (typeof v.playsInline !== 'undefined' && v.playsinline == true) v.playsInline = true;else if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysinline == true) v.webkitPlaysInline = true;
			}
			if (v.requestFullscreen) v.requestFullscreen();else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
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
		var v = that.video;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGE5OWE2ZGEyY2RjMzE0NmZlMTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsImVuZGVkQ2FsbGJhY2siLCJxdWVyeVNlbGVjdG9yIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImdldCIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwicGxheVBhdXNlRmxhZyIsIndhcm4iLCJnZXREdXJhdGlvbiIsIl9pbml0IiwicHJvdG90eXBlIiwidGhhdCIsImF0dHIiLCJhZGRLbGFzcyIsIl9wbGF5IiwiaGlkZSIsInJlc29sdXRpb25DaG9pY2UiLCJfb25QbGF5IiwiX29uUGF1c2UiLCJfb25UaW1lVXBkYXRlIiwiX2NsaWNrIiwiX2Z1bGxzY3JyZW5Nb2RlIiwiX3BhdXNlIiwibWFrZVNlZWtiYXIiLCJjb250cm9sRXZlbnQiLCJkaW1tQ2xpY2siLCJvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UiLCJlbmRlZCIsInNldFRpbWVvdXQiLCJjb25maXJtIiwiYWxlcnQiLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wbGF5aW5nIiwicmVtb3ZlS2xhc3MiLCJ2Iiwib25wYXVzZSIsImV4aXRGdWxsc2NyZWVuIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsIk1hdGgiLCJyb3VuZCIsImVxIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJkdXJhdGlvbiIsInMiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwicG9zdGVyTG9hZGVkIiwiYWxsb2NhdGVTaXplIiwic3R5bGUiLCJoZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsImRpciIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJldmVudCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJjc3MiLCJsb2FkIiwicGFyc2VJbnQiLCJ2YWx1ZSIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJlbCIsImRhdGFzZXQiLCJjYW52YXNUYWciLCJpZCIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVC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bUJ1TCxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0F2TCxTQUFPVyxTQUFQLEdBQW1CaEQsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWNrQyxPQUFPVyxTQUFQLENBQWlCM0MsT0FBakIsQ0FBMEJ3TixNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDOzs7Ozs7QUNub0JBLDBDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGRhOTlhNmRhMmNkYzMxNDZmZTEwXG4gKiovIiwiXG5pbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG4vLyBpbXBvcnQgU3dpcGVyIGZyb20gJy4vc3dpcGVyLmpxdWVyeS51bWQubWluLmpzJzsgLy9zd2lwZXIganF1ZXJ5IHBsdWdpblxuLy8gaW1wb3J0IGRldiwgeyBtZW51TGlzdCB9IGZyb20gJy4vZGV2LmpzJzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcblxuXG5cblxudmFyIHdpbiA9IHdpbmRvdyxcblx0ZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKCBtc2cgKXtcblx0cmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG5cdC8v7Jyg7Yu4IOuplOyEnOuTnFxuXHR1dGlsOiB7XG5cdFx0Ly8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuXHRcdGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCl7fVxuXG5cdFx0Ly8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcblx0XHQsdHJpbTogZnVuY3Rpb24oIHN0ciApIHtcblx0XHRcdGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0fVxuXHRcdCxpc0RldmljZTogZnVuY3Rpb24oKXtcblx0XHRcdC8v66qo67CU7J28IFVBXG5cdFx0XHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hlY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5hbmRyb2lkICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLmdpbmdlcmJyZWFkICkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG5cdFx0XHRcdFx0XHRlbHNlIHJldHVybiAnYW5kcm9pZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggdGhpcy5pb3MgKSByZXR1cm4gJ2lvcyc7XG5cdFx0XHRcdFx0aWYgKCAhdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcyApIHJldHVybiAnbm8tbW9iaWxlJztcblx0XHRcdFx0fSxcblx0XHRcdFx0aW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0XHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcblx0XHRcdGlmICggX3Njb3BlLmxlbmd0aCA8PSAwICkgcmV0dXJuO1xuXHRcdFx0JCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0aWYoICggX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkgKXtcblx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH0gIGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vbG9hZGluZyBtYXNrXG5cdFx0LGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZyl7XG5cdFx0XHRcdFx0aW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicgKSBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIDIwMCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Ly8g6re466O5IO2GoOq4gFxuXHRcdCx0b2dnbGVHcm91cCA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KXtcblx0XHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0JChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcblx0X3Njb3BlOiAnJ1xuXG5cdCxkZWZhdWx0T3B0aW9uczoge1xuXHQgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHQgIGxvb3A6IHRydWUsXG5cdCAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG5cdCAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcblx0fVxuXG5cdCxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG5cdCAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblx0ICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG5cdCAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHQgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuXHR9XG5cblx0LHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdCAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0fVxuXG5cdCxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuXHQgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG5cdH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuXHRfc2NvcGU6ICcnXG5cdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG5cdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcblx0XHRlbHNlIFxuXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG5cdFx0dGhpcy5jbGljaygpO1xuXHR9XG5cdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG5cdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG5cdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb24sXG5cdCAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXG5cdCQoJ2JvZHknKS5hZGRDbGFzcyggW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Y29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpe1xuXHRcdC8vY2FsbGJhY2tzXG5cdH0pO1xuXG5cdC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6Ttlolcblx0aWYgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xICkge1xuXHRcdGRldi5hcHBlbmRNZW51TGlzdCgpO1xuXHRcdGRldi5hcHBlbmRNZW51QnRuKCk7XG5cdH1cbn0pO1xuXG4vKlxuKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG5cdHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0aW1hZ2VzLnNyYyA9IGltZztcblxuXHRpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyApIGNhbGxiYWNrKGltYWdlcyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spIHtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IDA7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblx0dGhpcy5lbmRlZENhbGxiYWNrID0gdHlwZW9mIGVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IGVuZGVkQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblxuXHR0aGlzLmdldER1cmF0aW9uKCk7XG5cdHRoaXMuX2luaXQoKTtcblx0Y29uc29sZS5sb2coJ3ZpZGVvIHBsYXllciBjYWxsJyk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdC8vIHRoYXQubG93UmVzLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhhdC5sb3dSZXMuZGF0YXNldC5zcmMpO1xuXHQvLyB0aGF0LmhpZ2hSZXMuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGF0LmhpZ2hSZXMuZGF0YXNldC5zcmMpO1xuXHQkKHRoYXQubG93UmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQubG93UmVzKS5kYXRhKCdzcmMnKSApO1xuXHQkKHRoYXQuaGlnaFJlcykuYXR0cignc3JjJywgJCh0aGF0LmhpZ2hSZXMpLmRhdGEoJ3NyYycpICk7XG5cblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHR0aGF0Ll9wbGF5KCk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0XHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0dGhhdC52aWRlby5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRiZWdpbmZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGJpZ2luJyk7XG5cdFx0fSwgZmFsc2UpO1xuXHRcdHRoYXQudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBlbmQnKTtcblx0XHRcdGlmICggdGhpcy5lbmRlZCApIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGlmIChjb25maXJtKCfqs6DqsJ3ri5jsnYQg7JyE7ZWcIOq5nOynnSDsv6Dtj7DsnbQg67Cc6riJ65CY7JeI7Iq164uI64ukLiAk7L+g7Y+w66qFJCDsv6Dtj7DsnYQg67Cc6riJ67Cb7Jy87Iuc6rKg7Iq164uI6rmMPycpICkge1xuXHRcdFx0XHRcdFx0YWxlcnQoJ+2ZleyduCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydCgn7Leo7IaMJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCA1MDApO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlKTtcblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXG5cdC8vIHRoYXQudmlkZW8ub25jdWVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQvLyBcdGNvbnNvbGUubG9nKCdjdWVjaGFuZ2UnKTtcblx0Ly8gfTtcblx0Ly8gdGhhdC52aWRlby5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0Ly8gXHRjb25zb2xlLmxvZygnb25jaGFuZ2UnKTtcblx0Ly8gfTtcblx0Ly8gaWYgKCB0aGF0LnZpZGVvLmZ1bGxzY3JlZW5jaGFuZ2UgKVxuXHQvLyBcdHRoYXQudmlkZW8uZnVsbHNjcmVlbmNoYW5nZSgpO1xuXG5cdC8vIGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQvLyBcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHQvLyBcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRcdFx0aWYgKGNvbmZpcm0oJ+qzoOqwneuLmOydhCDsnITtlZwg6rmc7KedIOy/oO2PsOydtCDrsJzquInrkJjsl4jsirXri4jri6QuICTsv6Dtj7DrqoUkIOy/oO2PsOydhCDrsJzquInrsJvsnLzsi5zqsqDsirXri4jquYw/JykgKSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7ZmV7J24Jyk7XG5cdC8vIFx0XHRcdFx0fSBlbHNlIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCfst6jshownKTtcblx0Ly8gXHRcdFx0XHR9XG5cdC8vIFx0XHRcdH0sIDUwMCk7XG5cdC8vIFx0XHR9XG5cdC8vIFx0fVxuXHQvLyB9IGVsc2UgaWYgKCkge1xuXHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRcdGlmICggdGhpcy5lbmRlZCApIHtcblx0Ly8gXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0XHRcdGlmIChjb25maXJtKCfqs6DqsJ3ri5jsnYQg7JyE7ZWcIOq5nOynnSDsv6Dtj7DsnbQg67Cc6riJ65CY7JeI7Iq164uI64ukLiAk7L+g7Y+w66qFJCDsv6Dtj7DsnYQg67Cc6riJ67Cb7Jy87Iuc6rKg7Iq164uI6rmMPycpICkge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+2ZleyduCcpO1xuXHQvLyBcdFx0XHRcdH0gZWxzZSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7Leo7IaMJyk7XG5cdC8vIFx0XHRcdFx0fVxuXHQvLyBcdFx0XHR9LCA1MDApO1xuXHQvLyBcdFx0fVxuXHQvLyBcdH1cblx0Ly8gfVxuXG5cdC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHQvLyBcdGVuZEZ1bGwoKTtcblx0Ly8gfSwgZmFsc2UpO1xuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgZnVuY3Rpb24oKXtcblx0Ly8gXHRlbmRGdWxsKCk7XG5cdC8vIH0sIGZhbHNlKTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC52aWRlby5vbnBsYXkgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLmhpZGUoKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdFx0Y29uc29sZS5sb2coJ29ucGxheScsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGF1c2UgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdHRoYXQudmlkZW8ub25wYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHRcdCQodGhhdC5jb250cm9sKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0XHRpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdFx0aWYgKCB2LmVuZGVkICkge1xuXHRcdFx0aWYgKCB2LmV4aXRGdWxsc2NyZWVuICkgdi5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0ZWxzZSBpZiAoIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB2LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHQvLyBpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdFx0XHRcdFxuXHRcdFx0Ly8gfVxuXHRcdH1cblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRSYXRpbyA9IGZ1bmN0aW9uKHgsIHksIGwpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdGFyZ2V0ID0gMDtcblx0dGFyZ2V0ID0gTWF0aC5yb3VuZCgoeSAqIGwpIC8geCk7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdmlkZW8gPSAkKHRoYXQud3JhcHBlcikuZmluZCgndmlkZW86dmlzaWJsZScpLmVxKDApLmdldCgwKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cdFx0XHR0aGF0LnBvc3RlckxvYWRlZCgpO1xuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuXHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG5cdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdGNvbnNvbGUubG9nKCdwYXVzZSBidXR0b24nLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcbiAgY29uc29sZS5kaXIodik7XG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RhcnQgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0b3AgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JChoaWdoUmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG5cdFx0XHRpbWcgPSBuZXcgSW1hZ2UoKSxcblx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0aW1nSCA9IDAsXG5cdFx0XHR0aW1lcjtcblx0XHRpbWcuc3JjID0gYmc7XG5cdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDA7XG5cblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0Ly8gY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcblxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGgsXG5cdFx0aW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRpbWdXICs9IDE7XG5cdFx0XHRcdGltZ0ggKz0gMTtcblx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdH1cblx0XHR9LCAzMDAvMzApXG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==