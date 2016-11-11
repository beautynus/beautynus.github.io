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
			if (that.video.onwebkitfullscreenchange) {
				that.video.onwebkitfullscreenchange = function () {
					console.log('aaaaaa');
				};
			}
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
	
			if (this.ended) {
				(function () {
	
					// if ( document.exitFullscreen)
					// 	document.exitFullscreen();
					// if ( document.webkitExitFullscreen )
					// 	document.webkitExitFullscreen();
	
					var endFull = function endFull() {
						setTimeout(function () {
							if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?')) {
								alert('확인');
							} else {
								alert('취소');
							}
						}, 500);
					};
	
					document.addEventListener('webkitfullscreenchange', function () {
						endFull();
					}, false);
					document.addEventListener('fullscreenchange', function () {
						endFull();
					}, false);
				})();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ2ZDg5MWU5ZDI3YzhkMjczOTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiZ2V0IiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJwbGF5UGF1c2VGbGFnIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJkYXRhc2V0IiwiYWRkS2xhc3MiLCJfcGxheSIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwicGxheVBhdXNlIiwib25wbGF5Iiwic2hvdyIsImN1cnJlbnRUaW1lIiwiY29udHJvbFZpc2libGluZyIsIm9ucGxheWluZyIsInJlbW92ZUtsYXNzIiwib25wYXVzZSIsImVuZGVkIiwiZW5kRnVsbCIsInNldFRpbWVvdXQiLCJjb25maXJtIiwiYWxlcnQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsIk1hdGgiLCJyb3VuZCIsImVxIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJkdXJhdGlvbiIsInMiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwicG9zdGVyTG9hZGVkIiwiYWxsb2NhdGVTaXplIiwidiIsInN0eWxlIiwiaGVpZ2h0IiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwib250aW1ldXBkYXRlIiwicGF1c2VkIiwiZ2V0Q3VycmVudFRpbWUiLCJkaXIiLCJzbGlkZXIiLCJyYW5nZSIsInN0YXJ0IiwiZXZlbnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwiYXR0ciIsImxvYWQiLCJwYXJzZUludCIsInZhbHVlIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImVsIiwiY2FudmFzVGFnIiwiaWQiLCJhcHBlbmRDaGlsZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ0b0ZpeGVkIiwiZHJhd0ltYWdlIiwia2xhc3MiLCJyZWdleHAiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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LElBQXZCO0FBQ0FMLGFBQVFVLFNBQVIsQ0FBa0J6SyxHQUFsQixFQUF1QjZKLE9BQU9RLEtBQVAsR0FBYSxDQUFiLEdBQWlCSCxPQUFLLENBQTdDLEVBQWdETCxPQUFPckMsTUFBUCxHQUFjLENBQWQsR0FBa0IyQyxPQUFLLENBQXZFLEVBQTBFRCxJQUExRSxFQUFnRkMsSUFBaEY7QUFDQSxLQUxELE1BS087QUFDTlgsa0JBQWE3QyxLQUFiO0FBQ0E7QUFDRCxJQVRPLEVBU0wsTUFBSSxFQVRDLENBQVI7QUFXQSxHQS9CRDtBQWdDQSxFQTNDRDs7QUE2Q0FoRSxhQUFZMkIsU0FBWixDQUFzQkcsUUFBdEIsR0FBaUMsVUFBV25GLE1BQVgsRUFBbUJvTCxLQUFuQixFQUEyQjtBQUMzRCxNQUFLcEwsT0FBT1csU0FBUCxDQUFpQm1DLE9BQWpCLENBQXlCc0ksS0FBekIsSUFBa0MsQ0FBQyxDQUF4QyxFQUE0QztBQUM1Q3BMLFNBQU9XLFNBQVAsSUFBb0IsTUFBTXlLLEtBQTFCO0FBQ0EsRUFIRDs7QUFLQS9ILGFBQVkyQixTQUFaLENBQXNCdUIsV0FBdEIsR0FBb0MsVUFBV3ZHLE1BQVgsRUFBbUJvTCxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0FwTCxTQUFPVyxTQUFQLEdBQW1CaEQsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWNrQyxPQUFPVyxTQUFQLENBQWlCM0MsT0FBakIsQ0FBMEJxTixNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDOzs7Ozs7QUM3bUJBLDBDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDg0NmQ4OTFlOWQyN2M4ZDI3Mzk5XG4gKiovIiwiXG5pbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG4vLyBpbXBvcnQgU3dpcGVyIGZyb20gJy4vc3dpcGVyLmpxdWVyeS51bWQubWluLmpzJzsgLy9zd2lwZXIganF1ZXJ5IHBsdWdpblxuLy8gaW1wb3J0IGRldiwgeyBtZW51TGlzdCB9IGZyb20gJy4vZGV2LmpzJzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcblxuXG5cblxudmFyIHdpbiA9IHdpbmRvdyxcblx0ZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKCBtc2cgKXtcblx0cmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG5cdC8v7Jyg7Yu4IOuplOyEnOuTnFxuXHR1dGlsOiB7XG5cdFx0Ly8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuXHRcdGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCl7fVxuXG5cdFx0Ly8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcblx0XHQsdHJpbTogZnVuY3Rpb24oIHN0ciApIHtcblx0XHRcdGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0fVxuXHRcdCxpc0RldmljZTogZnVuY3Rpb24oKXtcblx0XHRcdC8v66qo67CU7J28IFVBXG5cdFx0XHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hlY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5hbmRyb2lkICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLmdpbmdlcmJyZWFkICkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG5cdFx0XHRcdFx0XHRlbHNlIHJldHVybiAnYW5kcm9pZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggdGhpcy5pb3MgKSByZXR1cm4gJ2lvcyc7XG5cdFx0XHRcdFx0aWYgKCAhdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcyApIHJldHVybiAnbm8tbW9iaWxlJztcblx0XHRcdFx0fSxcblx0XHRcdFx0aW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0XHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcblx0XHRcdGlmICggX3Njb3BlLmxlbmd0aCA8PSAwICkgcmV0dXJuO1xuXHRcdFx0JCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0aWYoICggX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkgKXtcblx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH0gIGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vbG9hZGluZyBtYXNrXG5cdFx0LGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZyl7XG5cdFx0XHRcdFx0aW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicgKSBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIDIwMCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Ly8g6re466O5IO2GoOq4gFxuXHRcdCx0b2dnbGVHcm91cCA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KXtcblx0XHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0JChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcblx0X3Njb3BlOiAnJ1xuXG5cdCxkZWZhdWx0T3B0aW9uczoge1xuXHQgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHQgIGxvb3A6IHRydWUsXG5cdCAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG5cdCAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcblx0fVxuXG5cdCxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG5cdCAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblx0ICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG5cdCAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHQgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuXHR9XG5cblx0LHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdCAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0fVxuXG5cdCxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuXHQgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG5cdH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuXHRfc2NvcGU6ICcnXG5cdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG5cdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcblx0XHRlbHNlIFxuXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG5cdFx0dGhpcy5jbGljaygpO1xuXHR9XG5cdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG5cdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG5cdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb24sXG5cdCAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXG5cdCQoJ2JvZHknKS5hZGRDbGFzcyggW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Y29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpe1xuXHRcdC8vY2FsbGJhY2tzXG5cdH0pO1xuXG5cdC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6Ttlolcblx0aWYgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xICkge1xuXHRcdGRldi5hcHBlbmRNZW51TGlzdCgpO1xuXHRcdGRldi5hcHBlbmRNZW51QnRuKCk7XG5cdH1cbn0pO1xuXG4vKlxuKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG5cdHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0aW1hZ2VzLnNyYyA9IGltZztcblxuXHRpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyApIGNhbGxiYWNrKGltYWdlcyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKHdyYXBwZXIpIHtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IDA7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblxuXHR0aGlzLmdldER1cmF0aW9uKCk7XG5cdHRoaXMuX2luaXQoKTtcblx0Y29uc29sZS5sb2coJ3ZpZGVvIHBsYXllciBjYWxsJyk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQubG93UmVzLnNyYyA9IHRoYXQubG93UmVzLmRhdGFzZXQuc3JjO1xuXHR0aGF0LmhpZ2hSZXMuc3JjID0gdGhhdC5oaWdoUmVzLmRhdGFzZXQuc3JjO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0XHRcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2FhYWFhYScpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0Ly8gdGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyB0aGF0LnZpZGVvLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHQvLyBcdGNvbnNvbGUubG9nKCdvbmNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyBpZiAoIHRoYXQudmlkZW8uZnVsbHNjcmVlbmNoYW5nZSApXG5cdC8vIFx0dGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlKCk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdvbnBsYXknLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25wbGF5aW5nID0gZnVuY3Rpb24oKXtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXG5cdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXG5cdFx0XHQvLyBpZiAoIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKVxuXHRcdFx0Ly8gXHRkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0Ly8gaWYgKCBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbiApXG5cdFx0XHQvLyBcdGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cblx0XHRcdGZ1bmN0aW9uIGVuZEZ1bGwoKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0XHRcdFx0XHRcdGFsZXJ0KCftmZXsnbgnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdH1cblxuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGVuZEZ1bGwoKTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRlbmRGdWxsKCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXHRcdFx0dGhhdC5wb3N0ZXJMb2FkZWQoKTtcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0aWYgKCB0aGF0LnZpZGVvLnBhdXNlZCApIHJldHVybjtcblx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHRjb25zb2xlLmxvZygncGF1c2UgYnV0dG9uJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmJnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmNvbnRyb2wpLm9uKHtcblx0J21vdXNkb3duIHRvdWNoc3RhcnQnOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9LFxuXHQnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuXHQgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tYWtlU2Vla2JhciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG4gIGNvbnNvbGUuZGlyKHYpO1xuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0YXJ0IDogJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0XHQvLyBpZiAoIHYucGF1c2VkICkge1xuXHRcdC8vIFx0Y29uc29sZS5sb2coJ3BhdXNlIHRydWUnKTtcblx0XHQvLyBcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdFx0Ly8gfSBlbHNlIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdwYXVzZSBmYWxzZScpO1xuXHRcdC8vIFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdC8vIH1cblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHQvLyBpZiAoIHYucGF1c2VkICYmIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGF1c2UnICkge1xuXHRcdC8vIFx0di5wYXVzZSgpO1xuXHRcdC8vIH0gZWxzZSB7XG5cdFx0Ly8gXHR2LnBsYXkoKTtcblx0XHQvLyB9XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RvcCA6ICcsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXHRcdGlmICggdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwbGF5JyApIHtcblx0XHRcdGNvbnNvbGUubG9nKCdwbGF5PycpO1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKHYpO1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHQvLyBlbHNlIGlmICh2Lm1velJlcXVlc3RGdWxsU2NyZWVuKVxuXHQvLyAgdi5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzID0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyA9IHRoaXMuaGlnaFJlcztcblx0aWYgKGJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKS5oYXNDbGFzcygnbG93JykpIHtcblx0XHQkKGxvd1Jlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuXHR9IGVsc2Uge1xuXHRcdCQobG93UmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKGhpZ2hSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG5cdHRoYXQudmlkZW8ubG9hZCgpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNoYW5nZUN1cnJlbnRUaW1lID0gZnVuY3Rpb24odWkpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdiA9ICQoJ3ZpZGVvOnZpc2libGUnKS5nZXQoMCk7XG5cdHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHR2aWRlbyA9IHRoYXQudmlkZW87XG5cdHZhciBzLCBtLCBjdCA9IE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUpLCBkdXIgPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKTtcblx0aWYgKCBjdCA8IDYwICkge1xuXHRcdG0gPSAnMDAnO1xuXHRcdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHBhcnNlSW50KCBjdCAlIDYwICksXG5cdFx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdFx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdFx0bSA9IG0udG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG07XG5cdH1cblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdGlmICggc2VlayA9PSAnc2VlaycgKSB7XG5cdFx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHRcdFx0dmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0XHR9KTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xWaXNpYmxpbmcgPSBmdW5jdGlvbihjdHJsKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0fSwgMjAwMCk7XG4gIH0gZWxzZSB7XG5cdGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0di5wbGF5KCk7XG5cdH0gZWxzZSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdGJnID0gZWwuZGF0YXNldC5iZztcblxuXHR2YXIgY2FudmFzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzVGFnLmlkID0gXCJ2aWRlb1Bvc3RlclwiO1xuXHR0aGF0LnBvc3Rlci5hcHBlbmRDaGlsZCggY2FudmFzVGFnICk7XG5cblx0aW1hZ2VQcmVsb2FkZXIoYmcsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIHRoYXQubG9hZGluZ0VsZW1lbnQgKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR0aGF0LmNvbnRyb2wuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0fVxuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9Qb3N0ZXInKSxcblx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcblx0XHRcdGltZyA9IG5ldyBJbWFnZSgpLFxuXHRcdFx0aW1nVyA9IDAsXG5cdFx0XHRpbWdIID0gMCxcblx0XHRcdHRpbWVyO1xuXHRcdGltZy5zcmMgPSBiZztcblx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMDtcblxuXHRcdGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHRcdGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHQvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuXG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCxcblx0XHRpbWdIID0gdGhhdC5nZXRSYXRpbyhpbWcubmF0dXJhbFdpZHRoLCBpbWcubmF0dXJhbEhlaWdodCwgaW1nVyk7XG5cdFx0dGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdGltZ1cgKz0gMTtcblx0XHRcdFx0aW1nSCArPSAxO1xuXHRcdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhICs9IDAuMDU7XG5cdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdFx0fVxuXHRcdH0sIDMwMC8zMClcblx0XHRcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWRkS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdGlmICggdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoa2xhc3MpO1xuXHR0YXJnZXQuY2xhc3NOYW1lID0gdWkudXRpbC50cmltKCB0YXJnZXQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlZ2V4cCwgXCJcIiApICk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9