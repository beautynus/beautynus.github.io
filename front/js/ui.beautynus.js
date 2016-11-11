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
			console.log(this.ended);
			if (this.currentTime == this.duration) {
	
				// if ( document.exitFullscreen)
				// 	document.exitFullscreen();
				// if ( document.webkitExitFullscreen )
				// 	document.webkitExitFullscreen();
	
				document.addEventListener('webkitfullscreenchange', function () {
					console.log('webkit');
				}, false);
				document.addEventListener('fullscreenchange', function () {
					console.log('base');
				}, false);
	
				setTimeout(function () {
					if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?')) {
						alert('확인');
					} else {
						alert('취소');
					}
				}, 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjdjNDgyNzU4NmE5NDFhMWQ2NmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiZ2V0IiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJwbGF5UGF1c2VGbGFnIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJkYXRhc2V0IiwiYWRkS2xhc3MiLCJfcGxheSIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwicGxheVBhdXNlIiwib25wbGF5Iiwic2hvdyIsImN1cnJlbnRUaW1lIiwiY29udHJvbFZpc2libGluZyIsIm9ucGxheWluZyIsInJlbW92ZUtsYXNzIiwib25wYXVzZSIsImVuZGVkIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0IiwiY29uZmlybSIsImFsZXJ0IiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwicyIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJwb3N0ZXJMb2FkZWQiLCJhbGxvY2F0ZVNpemUiLCJ2Iiwic3R5bGUiLCJoZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsImRpciIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJldmVudCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJjc3MiLCJhdHRyIiwibG9hZCIsInBhcnNlSW50IiwidmFsdWUiLCJzZWVrIiwiY3QiLCJkdXIiLCJjdHJsIiwiY2xlYXJUaW1lb3V0IiwiZWwiLCJjYW52YXNUYWciLCJpZCIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdB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SixhQUFRSyxXQUFSLElBQXVCLElBQXZCO0FBQ0FMLGFBQVFVLFNBQVIsQ0FBa0J4SyxHQUFsQixFQUF1QjRKLE9BQU9RLEtBQVAsR0FBYSxDQUFiLEdBQWlCSCxPQUFLLENBQTdDLEVBQWdETCxPQUFPckMsTUFBUCxHQUFjLENBQWQsR0FBa0IyQyxPQUFLLENBQXZFLEVBQTBFRCxJQUExRSxFQUFnRkMsSUFBaEY7QUFDQSxLQUxELE1BS087QUFDTlgsa0JBQWE1QyxLQUFiO0FBQ0E7QUFDRCxJQVRPLEVBU0wsTUFBSSxFQVRDLENBQVI7QUFXQSxHQS9CRDtBQWdDQSxFQTNDRDs7QUE2Q0FoRSxhQUFZMkIsU0FBWixDQUFzQkcsUUFBdEIsR0FBaUMsVUFBV25GLE1BQVgsRUFBbUJtTCxLQUFuQixFQUEyQjtBQUMzRCxNQUFLbkwsT0FBT1csU0FBUCxDQUFpQm1DLE9BQWpCLENBQXlCcUksS0FBekIsSUFBa0MsQ0FBQyxDQUF4QyxFQUE0QztBQUM1Q25MLFNBQU9XLFNBQVAsSUFBb0IsTUFBTXdLLEtBQTFCO0FBQ0EsRUFIRDs7QUFLQTlILGFBQVkyQixTQUFaLENBQXNCdUIsV0FBdEIsR0FBb0MsVUFBV3ZHLE1BQVgsRUFBbUJtTCxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0FuTCxTQUFPVyxTQUFQLEdBQW1CaEQsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWNrQyxPQUFPVyxTQUFQLENBQWlCM0MsT0FBakIsQ0FBMEJvTixNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDOzs7Ozs7QUMxbUJBLDBDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY3YzQ4Mjc1ODZhOTQxYTFkNjZiXG4gKiovIiwiXG5pbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG4vLyBpbXBvcnQgU3dpcGVyIGZyb20gJy4vc3dpcGVyLmpxdWVyeS51bWQubWluLmpzJzsgLy9zd2lwZXIganF1ZXJ5IHBsdWdpblxuLy8gaW1wb3J0IGRldiwgeyBtZW51TGlzdCB9IGZyb20gJy4vZGV2LmpzJzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcblxuXG5cblxudmFyIHdpbiA9IHdpbmRvdyxcblx0ZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKCBtc2cgKXtcblx0cmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG5cdC8v7Jyg7Yu4IOuplOyEnOuTnFxuXHR1dGlsOiB7XG5cdFx0Ly8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuXHRcdGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCl7fVxuXG5cdFx0Ly8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcblx0XHQsdHJpbTogZnVuY3Rpb24oIHN0ciApIHtcblx0XHRcdGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0fVxuXHRcdCxpc0RldmljZTogZnVuY3Rpb24oKXtcblx0XHRcdC8v66qo67CU7J28IFVBXG5cdFx0XHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hlY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5hbmRyb2lkICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLmdpbmdlcmJyZWFkICkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG5cdFx0XHRcdFx0XHRlbHNlIHJldHVybiAnYW5kcm9pZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggdGhpcy5pb3MgKSByZXR1cm4gJ2lvcyc7XG5cdFx0XHRcdFx0aWYgKCAhdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcyApIHJldHVybiAnbm8tbW9iaWxlJztcblx0XHRcdFx0fSxcblx0XHRcdFx0aW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0XHQsZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0XHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcblx0XHRcdGlmICggX3Njb3BlLmxlbmd0aCA8PSAwICkgcmV0dXJuO1xuXHRcdFx0JCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0aWYoICggX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkgKXtcblx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH0gIGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vbG9hZGluZyBtYXNrXG5cdFx0LGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZyl7XG5cdFx0XHRcdFx0aW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicgKSBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdCQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIDIwMCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Ly8g6re466O5IO2GoOq4gFxuXHRcdCx0b2dnbGVHcm91cCA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KXtcblx0XHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0JChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcblx0X3Njb3BlOiAnJ1xuXG5cdCxkZWZhdWx0T3B0aW9uczoge1xuXHQgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuXHQgIGxvb3A6IHRydWUsXG5cdCAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG5cdCAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcblx0fVxuXG5cdCxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG5cdCAgdGhpcy5fc2NvcGUgPSBzY29wZTtcblx0ICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG5cdCAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHQgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuXHR9XG5cblx0LHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdCAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0fVxuXG5cdCxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuXHQgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG5cdH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuXHRfc2NvcGU6ICcnXG5cdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG5cdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcblx0XHRlbHNlIFxuXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG5cdFx0dGhpcy5jbGljaygpO1xuXHR9XG5cdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG5cdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG5cdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcblx0ICBjb21tb24gPSB1aS5jb21tb24sXG5cdCAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXG5cdCQoJ2JvZHknKS5hZGRDbGFzcyggW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Y29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpe1xuXHRcdC8vY2FsbGJhY2tzXG5cdH0pO1xuXG5cdC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6Ttlolcblx0aWYgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xICkge1xuXHRcdGRldi5hcHBlbmRNZW51TGlzdCgpO1xuXHRcdGRldi5hcHBlbmRNZW51QnRuKCk7XG5cdH1cbn0pO1xuXG4vKlxuKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG5cdHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0aW1hZ2VzLnNyYyA9IGltZztcblxuXHRpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyApIGNhbGxiYWNrKGltYWdlcyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cbi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKHdyYXBwZXIpIHtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IDA7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblxuXHR0aGlzLmdldER1cmF0aW9uKCk7XG5cdHRoaXMuX2luaXQoKTtcblx0Y29uc29sZS5sb2coJ3ZpZGVvIHBsYXllciBjYWxsJyk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQubG93UmVzLnNyYyA9IHRoYXQubG93UmVzLmRhdGFzZXQuc3JjO1xuXHR0aGF0LmhpZ2hSZXMuc3JjID0gdGhhdC5oaWdoUmVzLmRhdGFzZXQuc3JjO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0XHRcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2FhYWFhYScpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0Ly8gdGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyB0aGF0LnZpZGVvLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHQvLyBcdGNvbnNvbGUubG9nKCdvbmNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyBpZiAoIHRoYXQudmlkZW8uZnVsbHNjcmVlbmNoYW5nZSApXG5cdC8vIFx0dGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlKCk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdvbnBsYXknLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25wbGF5aW5nID0gZnVuY3Rpb24oKXtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuZW5kZWQpO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSA9PSB0aGlzLmR1cmF0aW9uICkge1xuXG5cdFx0XHQvLyBpZiAoIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKVxuXHRcdFx0Ly8gXHRkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0Ly8gaWYgKCBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbiApXG5cdFx0XHQvLyBcdGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygnd2Via2l0Jyk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Jhc2UnKTtcblx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0XHRcdFx0XHRhbGVydCgn7ZmV7J24Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCA1MDApXG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuXHRcdFx0XHRzID0gJycsXG5cdFx0XHRcdG0gPSAnJztcblx0XHRcdHMgPSAoZHVyYXRpb24gJSA2MCkudG9TdHJpbmcoKSxcblx0XHRcdG0gPSAoKGR1cmF0aW9uIC0gcykgLyA2MCkudG9TdHJpbmcoKTtcblx0XHRcdHMgPSBzLmxlbmd0aCA8IDIgPyAwICsgcyA6IHM7XG5cdFx0XHRtID0gbS5sZW5ndGggPCAyID8gMCArIG0gOiBtO1xuXHRcdFx0dGhhdC52aWRlb1RpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHR0aGF0LmVuZFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcblx0XHRcdHRoYXQucG9zdGVyTG9hZGVkKCk7XG5cdFx0XHQvLyB0aGF0LmFsbG9jYXRlU2l6ZSh2aWRlbyk7XG5cdFx0fVxuXHR9LCA1MDApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IGZ1bmN0aW9uKHYpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0d3JhcHBlciA9IHRoYXQud3JhcHBlcjtcblx0d3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHYudmlkZW9XaWR0aCwgdi52aWRlb0hlaWdodCwgdi5jbGllbnRXaWR0aCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblRpbWVVcGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdGlmICggdGhhdC52aWRlby5wYXVzZWQgKSByZXR1cm47XG5cdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcbiAgfTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC52aWRlbykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHQkKHRoYXQudGltZWxpbmUpLnNob3coKTtcblx0JCh0aGF0LmNvbnRyb2wpLmFkZENsYXNzKCdyZW1vdmUtdGltZScpLnNob3coKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQucGF1c2VCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmN1clRpbWUgPSB0aGF0LnZpZGVvLmN1cnJlbnRUaW1lO1xuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHQkKHRoaXMpLmhpZGUoKTtcblx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcblx0Y29uc29sZS5sb2coJ3BhdXNlIGJ1dHRvbicsIHRoYXQucGxheVBhdXNlRmxhZyk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuICBjb25zb2xlLmRpcih2KTtcbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzdGFydDogZnVuY3Rpb24gKCBldmVudCwgdWkgKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NsaWRlciBzdGFydCA6ICcsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdFx0Ly8gaWYgKCB2LnBhdXNlZCApIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdwYXVzZSB0cnVlJyk7XG5cdFx0Ly8gXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHRcdC8vIH0gZWxzZSB7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZygncGF1c2UgZmFsc2UnKTtcblx0XHQvLyBcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHQvLyB9XG5cdFx0di5wYXVzZSgpO1xuXHR9LFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0Ly8gaWYgKCB2LnBhdXNlZCAmJiB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BhdXNlJyApIHtcblx0XHQvLyBcdHYucGF1c2UoKTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0di5wbGF5KCk7XG5cdFx0Ly8gfVxuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0b3AgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncGxheT8nKTtcblx0XHRcdHYucGxheSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2LnBhdXNlKCk7XG5cdFx0fVxuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRjb25zb2xlLmxvZyh2KTtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0Ly8gZWxzZSBpZiAodi5tb3pSZXF1ZXN0RnVsbFNjcmVlbilcblx0Ly8gIHYubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JChoaWdoUmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHYgPSAkKCd2aWRlbzp2aXNpYmxlJykuZ2V0KDApO1xuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG5cdFx0XHRpbWcgPSBuZXcgSW1hZ2UoKSxcblx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0aW1nSCA9IDAsXG5cdFx0XHR0aW1lcjtcblx0XHRpbWcuc3JjID0gYmc7XG5cdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDA7XG5cblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0Ly8gY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcblxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGgsXG5cdFx0aW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRpbWdXICs9IDE7XG5cdFx0XHRcdGltZ0ggKz0gMTtcblx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdH1cblx0XHR9LCAzMDAvMzApXG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==