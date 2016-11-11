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
	
	
		// if ( document.exitFullscreen)
		// 	document.exitFullscreen();
		// if ( document.webkitExitFullscreen )
		// 	document.webkitExitFullscreen();
	
		function endFull() {
			if (this.ended) {
				setTimeout(function () {
					if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?')) {
						alert('확인');
					} else {
						alert('취소');
					}
				}, 500);
			}
		}
	
		document.addEventListener('webkitfullscreenchange', function () {
			endFull();
		}, false);
		document.addEventListener('fullscreenchange', function () {
			endFull();
		}, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDc5ZDMxOTlkMTRlNWQ3YWI4NDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsIiQiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJqb2luIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiaW1hZ2VzIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiZ2V0IiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJwbGF5UGF1c2VGbGFnIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJkYXRhc2V0IiwiYWRkS2xhc3MiLCJfcGxheSIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwicGxheVBhdXNlIiwiZW5kRnVsbCIsImVuZGVkIiwic2V0VGltZW91dCIsImNvbmZpcm0iLCJhbGVydCIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJyZW1vdmVLbGFzcyIsIm9ucGF1c2UiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsIk1hdGgiLCJyb3VuZCIsImVxIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJkdXJhdGlvbiIsInMiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwicG9zdGVyTG9hZGVkIiwiYWxsb2NhdGVTaXplIiwidiIsInN0eWxlIiwiaGVpZ2h0IiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwib250aW1ldXBkYXRlIiwicGF1c2VkIiwiZ2V0Q3VycmVudFRpbWUiLCJkaXIiLCJzbGlkZXIiLCJyYW5nZSIsInN0YXJ0IiwiZXZlbnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwiYXR0ciIsImxvYWQiLCJwYXJzZUludCIsInZhbHVlIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImVsIiwiY2FudmFzVGFnIiwiaWQiLCJhcHBlbmRDaGlsZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ0b0ZpeGVkIiwiZHJhd0ltYWdlIiwia2xhc3MiLCJyZWdleHAiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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SixPQUFPUSxLQUFQLEdBQWEsQ0FBYixHQUFpQkgsT0FBSyxDQUE3QyxFQUFnREwsT0FBT3JDLE1BQVAsR0FBYyxDQUFkLEdBQWtCMkMsT0FBSyxDQUF2RSxFQUEwRUQsSUFBMUUsRUFBZ0ZDLElBQWhGO0FBQ0EsS0FMRCxNQUtPO0FBQ05YLGtCQUFhN0MsS0FBYjtBQUNBO0FBQ0QsSUFUTyxFQVNMLE1BQUksRUFUQyxDQUFSO0FBV0EsR0EvQkQ7QUFnQ0EsRUEzQ0Q7O0FBNkNBaEUsYUFBWTJCLFNBQVosQ0FBc0JHLFFBQXRCLEdBQWlDLFVBQVduRixNQUFYLEVBQW1Cb0wsS0FBbkIsRUFBMkI7QUFDM0QsTUFBS3BMLE9BQU9XLFNBQVAsQ0FBaUJtQyxPQUFqQixDQUF5QnNJLEtBQXpCLElBQWtDLENBQUMsQ0FBeEMsRUFBNEM7QUFDNUNwTCxTQUFPVyxTQUFQLElBQW9CLE1BQU15SyxLQUExQjtBQUNBLEVBSEQ7O0FBS0EvSCxhQUFZMkIsU0FBWixDQUFzQjRCLFdBQXRCLEdBQW9DLFVBQVc1RyxNQUFYLEVBQW1Cb0wsS0FBbkIsRUFBMkI7QUFDOUQsTUFBSUMsU0FBUyxJQUFJQyxNQUFKLENBQVdGLEtBQVgsQ0FBYjtBQUNBcEwsU0FBT1csU0FBUCxHQUFtQmhELEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFja0MsT0FBT1csU0FBUCxDQUFpQjNDLE9BQWpCLENBQTBCcU4sTUFBMUIsRUFBa0MsRUFBbEMsQ0FBZCxDQUFuQjtBQUNBLEVBSEQsQzs7Ozs7O0FDNW1CQSwwQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NzlkMzE5OWQxNGU1ZDdhYjg0OVxuICoqLyIsIlxuaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuLy8gaW1wb3J0IFN3aXBlciBmcm9tICcuL3N3aXBlci5qcXVlcnkudW1kLm1pbi5qcyc7IC8vc3dpcGVyIGpxdWVyeSBwbHVnaW5cbi8vIGltcG9ydCBkZXYsIHsgbWVudUxpc3QgfSBmcm9tICcuL2Rldi5qcyc7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5cblxuXG5cbnZhciB3aW4gPSB3aW5kb3csXG5cdGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbiggbXNnICl7XG5cdHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xufTtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuXHQvL+ycoO2LuCDrqZTshJzrk5xcblx0dXRpbDoge1xuXHRcdC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4Bcblx0XHRjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpe31cblxuXHRcdC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG5cdFx0LHRyaW06IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHRcdH1cblx0XHQsaXNEZXZpY2U6IGZ1bmN0aW9uKCl7XG5cdFx0XHQvL+uqqOuwlOydvCBVQVxuXHRcdFx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoZWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMuYW5kcm9pZCApIHtcblx0XHRcdFx0XHRcdGlmICggdGhpcy5naW5nZXJicmVhZCApIHJldHVybiAnZ2luZ2VyYnJlYWQnO1xuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIHRoaXMuaW9zICkgcmV0dXJuICdpb3MnO1xuXHRcdFx0XHRcdGlmICggIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MgKSByZXR1cm4gJ25vLW1vYmlsZSc7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlvczogdWEubWF0Y2goJ2lQaG9uZScpID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2Vcblx0XHRcdH1cblx0XHR9XG5cdFx0LGRldmljZVNpemU6ICdkZXZpY2Utc2l6ZS0nICsgd2luZG93LmlubmVyV2lkdGhcblx0fVxuXG5cdC8vIOqzte2GtSDrqZTshJzrk5xcblx0LGNvbW1vbjoge1xuXG5cdFx0Ly8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG5cdFx0ZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuXHRcdFx0dmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLCBhVGFnID0gbnVsbCwgaHJlZiA9IG51bGw7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGFUYWcgPSBhbGxBW2ldO1xuXHRcdFx0XHRocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKCB1aS51dGlsLnRyaW0oIGhyZWYgKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsIClcblx0XHRcdFx0XHRhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuXHRcdCx0b2dnbGVjbGFzczogZnVuY3Rpb24oKXtcblxuXHRcdH1cblxuXHRcdC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuXHRcdCx0YWJsZUZhZGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG5cdFx0XHRpZiAoIF9zY29wZS5sZW5ndGggPD0gMCApIHJldHVybjtcblx0XHRcdCQoJy5qcy1mYWRlaW4td3JhcCcpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0JHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdGlmKCAoIF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApICl7XG5cdFx0XHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9ICBlbHNlIHtcblx0XHRcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvL2xvYWRpbmcgbWFza1xuXHRcdCxsb2FkaW5nQ29tcGxldGU6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0aW1hZ2VQcmVsb2FkZXIoJy9mcm9udC9pbWFnZXMvbG9hZGluZy1jaXJjdWxhci5naWYnLCBmdW5jdGlvbihpbWcpe1xuXHRcdFx0XHRcdGltZy5jbGFzc05hbWUgPSBcInZpZGVvLWxvYWRpbmctaW1hZ2VcIjtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nICkgY2FsbGJhY2soKTtcblx0XHRcdFx0XHQkKCdib2R5Jykuc3RvcCgpLmFuaW1hdGUoe29wYWNpdHk6IDF9LCAyMDAsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdC8vIOq3uOujuSDthqDquIBcblx0XHQsdG9nZ2xlR3JvdXAgOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCl7XG5cdFx0XHQkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKXtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIHV0aWwgPSB1aS51dGlsLFxuXHQgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICB2YXIgY2FyZE5ld3MgPSB7XG5cdF9zY29wZTogJydcblxuXHQsZGVmYXVsdE9wdGlvbnM6IHtcblx0ICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcblx0ICBsb29wOiB0cnVlLFxuXHQgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuXHQgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG5cdH1cblxuXHQsaW5pdDogZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpe1xuXHQgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG5cdCAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuXHQgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4Bcblx0ICB0aGlzLnN3aXBlcihvcHRpb25zKTtcblx0fVxuXG5cdCxzd2lwZXI6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHQgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG5cdH1cblxuXHQsbWFuYWdlcjogZnVuY3Rpb24oKXtcblx0ICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuXHR9XG5cbiAgfTtcbiAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgdmFyIGFjY29yZGlhbiA9IHtcblx0X3Njb3BlOiAnJ1xuXHQsaW5pdDogZnVuY3Rpb24gKCBfc2NvcGUgKXtcblx0XHRpZiAoIHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcgKVxuXHRcdFx0dGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG5cdFx0ZWxzZSBcblx0XHRcdHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuXHRcdHRoaXMuY2xpY2soKTtcblx0fVxuXHQsY2xpY2s6IGZ1bmN0aW9uICggICkge1xuXHRcdCQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcblx0XHRcdGlmICggaXRlbS5oYXNDbGFzcygnYWN0aXZlJykgKVxuXHRcdFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0aXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCggaXRlbS5wb3NpdGlvbigpLnRvcCApO1xuXHRcdH0pO1xuXHR9XG4gIH07XG4gIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKXtcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdCAgY29tbW9uID0gdWkuY29tbW9uLFxuXHQgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG5cdGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG5cdGNvbW1vbi50YWJsZUZhZGUoKTtcblxuXHQkKCdib2R5JykuYWRkQ2xhc3MoIFtpc0RldmljZS5jaGVjaygpLCB1dGlsLmRldmljZVNpemVdLmpvaW4oJyAnKSApO1xuXG5cdGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG5cdGNvbW1vbi5sb2FkaW5nQ29tcGxldGUoZnVuY3Rpb24oKXtcblx0XHQvL2NhbGxiYWNrc1xuXHR9KTtcblxuXHQvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG5cdGlmICggbG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSApIHtcblx0XHRkZXYuYXBwZW5kTWVudUxpc3QoKTtcblx0XHRkZXYuYXBwZW5kTWVudUJ0bigpO1xuXHR9XG59KTtcblxuLypcbipcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4qL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oaW1nLCBjYWxsYmFjaykge1xuXHR2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdGltYWdlcy5zcmMgPSBpbWc7XG5cblx0aW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpe1xuXHRcdGlmICggdHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicgKSBjYWxsYmFjayhpbWFnZXMpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG4vKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTYuMTFcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbih3cmFwcGVyKSB7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdyYXBwZXIpO1xuXHR0aGlzLmxvYWRpbmdFbGVtZW50XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbG9hZGluZy1pbWFnZScpLFxuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9bG93XScpLmdldCgwKTtcblx0dGhpcy5oaWdoUmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWhpZ2hdJykuZ2V0KDApO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAwO1xuXHR0aGlzLmNvbnRyb2xUaW1lciBcdD0gbnVsbDtcblx0dGhpcy5wb3N0ZXIgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5wb3N0ZXInKTtcblx0dGhpcy5jb250cm9sIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpO1xuXHR0aGlzLmJnIFx0XHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5iZycpO1xuXHR0aGlzLnBsYXlCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wbGF5Jyk7XG5cdHRoaXMucGF1c2VCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wYXVzZScpO1xuXHR0aGlzLnZpZGVvVGltZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnJ1bm5pbmctdGltZScpO1xuXHR0aGlzLnRpbWVsaW5lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcblx0dGhpcy5mdWxsQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuZnVsbCcpO1xuXHR0aGlzLnN0YXJ0VGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50Jyk7XG5cdHRoaXMuZW5kVGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5lbmQnKTtcblx0dGhpcy5zZWVrYmFyIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpO1xuXHR0aGlzLmJ0bkdyb3VwIFx0XHQ9ICQodGhpcy5jb250cm9sKS5maW5kKCcuYnRuLWdyb3VwJyk7XG5cdHRoaXMuYWN0aXZlQnRuIFx0XHQ9IHRoaXMuYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpO1xuXHR0aGlzLnBsYXlQYXVzZUZsYWcgXHQ9ICdwYXVzZSc7XG5cblx0dGhpcy5nZXREdXJhdGlvbigpO1xuXHR0aGlzLl9pbml0KCk7XG5cdGNvbnNvbGUubG9nKCd2aWRlbyBwbGF5ZXIgY2FsbCcpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0Lmxvd1Jlcy5zcmMgPSB0aGF0Lmxvd1Jlcy5kYXRhc2V0LnNyYztcblx0dGhhdC5oaWdoUmVzLnNyYyA9IHRoYXQuaGlnaFJlcy5kYXRhc2V0LnNyYztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHR0aGF0Ll9wbGF5KCk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0XHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdC8vIHRoYXQudmlkZW8ub25jdWVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQvLyBcdGNvbnNvbGUubG9nKCdjdWVjaGFuZ2UnKTtcblx0Ly8gfTtcblx0Ly8gdGhhdC52aWRlby5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0Ly8gXHRjb25zb2xlLmxvZygnb25jaGFuZ2UnKTtcblx0Ly8gfTtcblx0Ly8gaWYgKCB0aGF0LnZpZGVvLmZ1bGxzY3JlZW5jaGFuZ2UgKVxuXHQvLyBcdHRoYXQudmlkZW8uZnVsbHNjcmVlbmNoYW5nZSgpO1xuXG5cblx0XHRcdC8vIGlmICggZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pXG5cdFx0XHQvLyBcdGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHQvLyBpZiAoIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuIClcblx0XHRcdC8vIFx0ZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblxuXHRcdFx0ZnVuY3Rpb24gZW5kRnVsbCgpIHtcblx0XHRcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGlmIChjb25maXJtKCfqs6DqsJ3ri5jsnYQg7JyE7ZWcIOq5nOynnSDsv6Dtj7DsnbQg67Cc6riJ65CY7JeI7Iq164uI64ukLiAk7L+g7Y+w66qFJCDsv6Dtj7DsnYQg67Cc6riJ67Cb7Jy87Iuc6rKg7Iq164uI6rmMPycpICkge1xuXHRcdFx0XHRcdFx0XHRhbGVydCgn7ZmV7J24Jyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRhbGVydCgn7Leo7IaMJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0ZW5kRnVsbCgpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGVuZEZ1bGwoKTtcblx0XHRcdH0sIGZhbHNlKTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC52aWRlby5vbnBsYXkgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLmhpZGUoKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdFx0Y29uc29sZS5sb2coJ29ucGxheScsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGF1c2UgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQudmlkZW8ub25wYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHRcdCQodGhhdC5jb250cm9sKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0XHRpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXHRcdFx0dGhhdC5wb3N0ZXJMb2FkZWQoKTtcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0aWYgKCB0aGF0LnZpZGVvLnBhdXNlZCApIHJldHVybjtcblx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHRjb25zb2xlLmxvZygncGF1c2UgYnV0dG9uJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmJnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmNvbnRyb2wpLm9uKHtcblx0J21vdXNkb3duIHRvdWNoc3RhcnQnOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9LFxuXHQnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuXHQgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tYWtlU2Vla2JhciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG4gIGNvbnNvbGUuZGlyKHYpO1xuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0YXJ0IDogJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0XHQvLyBpZiAoIHYucGF1c2VkICkge1xuXHRcdC8vIFx0Y29uc29sZS5sb2coJ3BhdXNlIHRydWUnKTtcblx0XHQvLyBcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdFx0Ly8gfSBlbHNlIHtcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdwYXVzZSBmYWxzZScpO1xuXHRcdC8vIFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdC8vIH1cblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHQvLyBpZiAoIHYucGF1c2VkICYmIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGF1c2UnICkge1xuXHRcdC8vIFx0di5wYXVzZSgpO1xuXHRcdC8vIH0gZWxzZSB7XG5cdFx0Ly8gXHR2LnBsYXkoKTtcblx0XHQvLyB9XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RvcCA6ICcsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXHRcdGlmICggdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwbGF5JyApIHtcblx0XHRcdGNvbnNvbGUubG9nKCdwbGF5PycpO1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKHYpO1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHQvLyBlbHNlIGlmICh2Lm1velJlcXVlc3RGdWxsU2NyZWVuKVxuXHQvLyAgdi5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzID0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyA9IHRoaXMuaGlnaFJlcztcblx0aWYgKGJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKS5oYXNDbGFzcygnbG93JykpIHtcblx0XHQkKGxvd1Jlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuXHR9IGVsc2Uge1xuXHRcdCQobG93UmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKGhpZ2hSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG5cdHRoYXQudmlkZW8ubG9hZCgpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNoYW5nZUN1cnJlbnRUaW1lID0gZnVuY3Rpb24odWkpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdiA9ICQoJ3ZpZGVvOnZpc2libGUnKS5nZXQoMCk7XG5cdHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHR2aWRlbyA9IHRoYXQudmlkZW87XG5cdHZhciBzLCBtLCBjdCA9IE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUpLCBkdXIgPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKTtcblx0aWYgKCBjdCA8IDYwICkge1xuXHRcdG0gPSAnMDAnO1xuXHRcdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHBhcnNlSW50KCBjdCAlIDYwICksXG5cdFx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdFx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdFx0bSA9IG0udG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG07XG5cdH1cblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdGlmICggc2VlayA9PSAnc2VlaycgKSB7XG5cdFx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHRcdFx0dmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0XHR9KTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xWaXNpYmxpbmcgPSBmdW5jdGlvbihjdHJsKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0fSwgMjAwMCk7XG4gIH0gZWxzZSB7XG5cdGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0di5wbGF5KCk7XG5cdH0gZWxzZSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdGJnID0gZWwuZGF0YXNldC5iZztcblxuXHR2YXIgY2FudmFzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzVGFnLmlkID0gXCJ2aWRlb1Bvc3RlclwiO1xuXHR0aGF0LnBvc3Rlci5hcHBlbmRDaGlsZCggY2FudmFzVGFnICk7XG5cblx0aW1hZ2VQcmVsb2FkZXIoYmcsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIHRoYXQubG9hZGluZ0VsZW1lbnQgKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR0aGF0LmNvbnRyb2wuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0fVxuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9Qb3N0ZXInKSxcblx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcblx0XHRcdGltZyA9IG5ldyBJbWFnZSgpLFxuXHRcdFx0aW1nVyA9IDAsXG5cdFx0XHRpbWdIID0gMCxcblx0XHRcdHRpbWVyO1xuXHRcdGltZy5zcmMgPSBiZztcblx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMDtcblxuXHRcdGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHRcdGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHQvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuXG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCxcblx0XHRpbWdIID0gdGhhdC5nZXRSYXRpbyhpbWcubmF0dXJhbFdpZHRoLCBpbWcubmF0dXJhbEhlaWdodCwgaW1nVyk7XG5cdFx0dGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdGltZ1cgKz0gMTtcblx0XHRcdFx0aW1nSCArPSAxO1xuXHRcdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhICs9IDAuMDU7XG5cdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdFx0fVxuXHRcdH0sIDMwMC8zMClcblx0XHRcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWRkS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdGlmICggdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoa2xhc3MpO1xuXHR0YXJnZXQuY2xhc3NOYW1lID0gdWkudXRpbC50cmltKCB0YXJnZXQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlZ2V4cCwgXCJcIiApICk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9