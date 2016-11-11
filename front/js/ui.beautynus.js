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
	
		console.log('init');
	
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
		var that = this,
		    v = null;
	
		that.addKlass(that.loadingElement, "active");
	
		if (that.playFlag) {
			that.playFlag = false;
			$(that.control).hide();
			if (that.video == null) that.resolutionChoice();
	
			v = that.video;
	
			console.log('===========', v.networkState, v.readyState);
	
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
	
			v.addEventListener('webkitbeginfullscreen', function () {
				console.log('fullscreen bigin');
			}, false);
	
			v.addEventListener('webkitendfullscreen', function () {
				console.log('fullscreen end');
				if (this.ended) {
					setTimeout(function () {
						that.endedCallback();
					}, 50);
				}
			}, false);
	
			v.onload = function () {
				console.log('onload', v.networkState);
			};
			v.onloadstart = function () {
				console.log('onloadstart'.v.networkState);
			};
			v.onloadeddata = function () {
				console.log('loadeddata', v.networkState);
			};
			v.onloadedmetadata = function () {
				console.log('onloadedmetadata', v.networkState);
			};
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
		console.log('get duration');
		var that = this;
		var video = $(that.wrapper).find('video:visible').eq(0).get(0);
		var timer = setInterval(function () {
			console.log('get duration setInterval', 'readyState: ' + video.readyState);
			if (video.readyState > 0) {
				console.log('get duration setInterval if');
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
				// that.allocateSize(video);
			}
		}, 500);
	};
	
	VideoPlayer.prototype._error = function (errorType) {
		// if ( readyStateFlag ==  )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTA3MWVkNGU1MTYzYTBkOWMxYzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsImVuZGVkQ2FsbGJhY2siLCJxdWVyeVNlbGVjdG9yIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImdldCIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwicGxheVBhdXNlRmxhZyIsIndhcm4iLCJnZXREdXJhdGlvbiIsIl9pbml0IiwicHJvdG90eXBlIiwidGhhdCIsImF0dHIiLCJhZGRLbGFzcyIsIl9wbGF5IiwidiIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwibmV0d29ya1N0YXRlIiwicmVhZHlTdGF0ZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsImVuZGVkIiwic2V0VGltZW91dCIsIm9ubG9hZCIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsInBsYXlQYXVzZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJyZW1vdmVLbGFzcyIsIm9ucGF1c2UiLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJkdXJhdGlvbiIsInMiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwic3R5bGUiLCJoZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsImRpciIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJldmVudCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJjc3MiLCJsb2FkIiwicGFyc2VJbnQiLCJ2YWx1ZSIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJwb3N0ZXJMb2FkZWQiLCJlbCIsImRhdGFzZXQiLCJjYW52YXNUYWciLCJpZCIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJl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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTA3MWVkNGU1MTYzYTBkOWMxYzhcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuXHRkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24oIG1zZyApe1xuXHRyZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cblx0Ly/snKDti7gg66mU7ISc65OcXG5cdHV0aWw6IHtcblx0XHQvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG5cdFx0Y29tbW9uTm90aGluZzogZnVuY3Rpb24oKXt9XG5cblx0XHQvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuXHRcdCx0cmltOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9XG5cdFx0LGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuXHRcdFx0Ly/rqqjrsJTsnbwgVUFcblx0XHRcdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGVjazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmFuZHJvaWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcblx0XHRcdFx0XHRcdGVsc2UgcmV0dXJuICdhbmRyb2lkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcblx0XHRcdFx0XHRpZiAoICF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zICkgcmV0dXJuICduby1tb2JpbGUnO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0YW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0Z2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdCxkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG5cdH1cblxuXHQvLyDqs7XthrUg66mU7ISc65OcXG5cdCxjb21tb246IHtcblxuXHRcdC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuXHRcdGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcblx0XHRcdHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSwgYVRhZyA9IG51bGwsIGhyZWYgPSBudWxsO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRhVGFnID0gYWxsQVtpXTtcblx0XHRcdFx0aHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmICggdWkudXRpbC50cmltKCBocmVmICkgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbCApXG5cdFx0XHRcdFx0YVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyB0b2dnbGVDbGFzcyBjdXN0b21cblx0XHQsdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCl7XG5cblx0XHR9XG5cblx0XHQvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcblx0XHQsdGFibGVGYWRlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuXHRcdFx0aWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly9sb2FkaW5nIG1hc2tcblx0XHQsbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2xvYWRpbmctY2lyY3VsYXIuZ2lmJywgZnVuY3Rpb24oaW1nKXtcblx0XHRcdFx0XHRpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyApIGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0JCgnYm9keScpLnN0b3AoKS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgMjAwLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHQvLyDqt7jro7kg7Yag6riAXG5cdFx0LHRvZ2dsZUdyb3VwIDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpe1xuXHRcdFx0JChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0XHQkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fVxufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0YmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCl7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgdmFyIGNhcmROZXdzID0ge1xuXHRfc2NvcGU6ICcnXG5cblx0LGRlZmF1bHRPcHRpb25zOiB7XG5cdCAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG5cdCAgbG9vcDogdHJ1ZSxcblx0ICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcblx0ICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuXHR9XG5cblx0LGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKXtcblx0ICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuXHQgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcblx0ICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG5cdCAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG5cdH1cblxuXHQsc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKXtcblx0ICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuXHR9XG5cblx0LG1hbmFnZXI6IGZ1bmN0aW9uKCl7XG5cdCAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcblx0fVxuXG4gIH07XG4gIGJlYXV0eW51cy5jYXJkTmV3cyA9IGNhcmROZXdzO1xuXG4gIHZhciBhY2NvcmRpYW4gPSB7XG5cdF9zY29wZTogJydcblx0LGluaXQ6IGZ1bmN0aW9uICggX3Njb3BlICl7XG5cdFx0aWYgKCB0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnIClcblx0XHRcdHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuXHRcdGVsc2UgXG5cdFx0XHR0aGlzLl9zY29wZSA9IF9zY29wZTtcblx0XHR0aGlzLmNsaWNrKCk7XG5cdH1cblx0LGNsaWNrOiBmdW5jdGlvbiAoICApIHtcblx0XHQkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG5cdFx0XHRpZiAoIGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpIClcblx0XHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQod2luZG93KS5zY3JvbGxUb3AoIGl0ZW0ucG9zaXRpb24oKS50b3AgKTtcblx0XHR9KTtcblx0fVxuICB9O1xuICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDrj5nsg4Hsg4HtmJVcblxuICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIHV0aWwgPSB1aS51dGlsLFxuXHQgIGNvbW1vbiA9IHVpLmNvbW1vbixcblx0ICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuXHRjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuXHRjb21tb24udGFibGVGYWRlKCk7XG5cblx0JCgnYm9keScpLmFkZENsYXNzKCBbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykgKTtcblxuXHRiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuXHRjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCl7XG5cdFx0Ly9jYWxsYmFja3Ncblx0fSk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEgKSB7XG5cdFx0ZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG5cdFx0ZGV2LmFwcGVuZE1lbnVCdG4oKTtcblx0fVxufSk7XG5cbi8qXG4qXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcblx0dmFyIGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRpbWFnZXMuc3JjID0gaW1nO1xuXG5cdGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKXtcblx0XHRpZiAoIHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nICkgY2FsbGJhY2soaW1hZ2VzKTtcblx0fSwgZmFsc2UpO1xufTtcblxuLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24od3JhcHBlciwgZW5kZWRDYWxsYmFjaykge1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcblx0dGhpcy5sb2FkaW5nRWxlbWVudFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvLWxvYWRpbmctaW1hZ2UnKSxcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gMDtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2YgZW5kZWRDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXG5cdHRoaXMuZ2V0RHVyYXRpb24oKTtcblx0dGhpcy5faW5pdCgpO1xuXHRjb25zb2xlLmxvZygndmlkZW8gcGxheWVyIGNhbGwnKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0Y29uc29sZS5sb2coJ2luaXQnKTtcblxuXHQvLyB0aGF0Lmxvd1Jlcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoYXQubG93UmVzLmRhdGFzZXQuc3JjKTtcblx0Ly8gdGhhdC5oaWdoUmVzLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhhdC5oaWdoUmVzLmRhdGFzZXQuc3JjKTtcblx0JCh0aGF0Lmxvd1JlcykuYXR0cignc3JjJywgJCh0aGF0Lmxvd1JlcykuZGF0YSgnc3JjJykgKTtcblx0JCh0aGF0LmhpZ2hSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5oaWdoUmVzKS5kYXRhKCdzcmMnKSApO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSBudWxsO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0diA9IHRoYXQudmlkZW87XG5cblx0XHRjb25zb2xlLmxvZygnPT09PT09PT09PT0nLCB2Lm5ldHdvcmtTdGF0ZSwgdi5yZWFkeVN0YXRlKTtcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0XHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0di5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRiZWdpbmZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gYmlnaW4nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHR2LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gZW5kJyk7XG5cdFx0XHRpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgNTApO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlKTtcblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHQvLyB0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIHRoYXQudmlkZW8ub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ29uY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIGlmICggdGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlIClcblx0Ly8gXHR0aGF0LnZpZGVvLmZ1bGxzY3JlZW5jaGFuZ2UoKTtcblxuXHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRcdGlmICggdGhpcy5lbmRlZCApIHtcblx0Ly8gXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0XHRcdGlmIChjb25maXJtKCfqs6DqsJ3ri5jsnYQg7JyE7ZWcIOq5nOynnSDsv6Dtj7DsnbQg67Cc6riJ65CY7JeI7Iq164uI64ukLiAk7L+g7Y+w66qFJCDsv6Dtj7DsnYQg67Cc6riJ67Cb7Jy87Iuc6rKg7Iq164uI6rmMPycpICkge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+2ZleyduCcpO1xuXHQvLyBcdFx0XHRcdH0gZWxzZSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7Leo7IaMJyk7XG5cdC8vIFx0XHRcdFx0fVxuXHQvLyBcdFx0XHR9LCA1MDApO1xuXHQvLyBcdFx0fVxuXHQvLyBcdH1cblx0Ly8gfSBlbHNlIGlmICgpIHtcblx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdC8vIFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0Ly8gXHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCftmZXsnbgnKTtcblx0Ly8gXHRcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSwgNTAwKTtcblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIH1cblxuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVuY3Rpb24oKXtcblx0Ly8gXHRlbmRGdWxsKCk7XG5cdC8vIH0sIGZhbHNlKTtcblx0Ly8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdC8vIFx0ZW5kRnVsbCgpO1xuXHQvLyB9LCBmYWxzZSk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdvbnBsYXknLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25wbGF5aW5nID0gZnVuY3Rpb24oKXtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHYuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkgdi53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0Ly8gaWYgKCB0aGlzLmVuZGVkICkge1xuXHRcdFx0XHRcblx0XHRcdC8vIH1cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdnZXQgZHVyYXRpb24nKTtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdmlkZW8gPSAkKHRoYXQud3JhcHBlcikuZmluZCgndmlkZW86dmlzaWJsZScpLmVxKDApLmdldCgwKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2dldCBkdXJhdGlvbiBzZXRJbnRlcnZhbCcsICdyZWFkeVN0YXRlOiAnICsgdmlkZW8ucmVhZHlTdGF0ZSwgKTtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdGNvbnNvbGUubG9nKCdnZXQgZHVyYXRpb24gc2V0SW50ZXJ2YWwgaWYnKTtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuXHRcdFx0XHRzID0gJycsXG5cdFx0XHRcdG0gPSAnJztcblx0XHRcdHMgPSAoZHVyYXRpb24gJSA2MCkudG9TdHJpbmcoKSxcblx0XHRcdG0gPSAoKGR1cmF0aW9uIC0gcykgLyA2MCkudG9TdHJpbmcoKTtcblx0XHRcdHMgPSBzLmxlbmd0aCA8IDIgPyAwICsgcyA6IHM7XG5cdFx0XHRtID0gbS5sZW5ndGggPCAyID8gMCArIG0gOiBtO1xuXHRcdFx0dGhhdC52aWRlb1RpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHR0aGF0LmVuZFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTsgXG5cdFx0XHQvLyB0aGF0LmFsbG9jYXRlU2l6ZSh2aWRlbyk7XG5cdFx0fVxuXHR9LCA1MDApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uKCBlcnJvclR5cGUgKSB7XG5cdC8vIGlmICggcmVhZHlTdGF0ZUZsYWcgPT0gIClcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuXHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG5cdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdGNvbnNvbGUubG9nKCdwYXVzZSBidXR0b24nLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcbiAgY29uc29sZS5kaXIodik7XG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RhcnQgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0b3AgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JChoaWdoUmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG5cdFx0XHRpbWcgPSBuZXcgSW1hZ2UoKSxcblx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0aW1nSCA9IDAsXG5cdFx0XHR0aW1lcjtcblx0XHRpbWcuc3JjID0gYmc7XG5cdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDA7XG5cblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0Ly8gY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcblxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGgsXG5cdFx0aW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRpbWdXICs9IDE7XG5cdFx0XHRcdGltZ0ggKz0gMTtcblx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdH1cblx0XHR9LCAzMDAvMzApXG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==