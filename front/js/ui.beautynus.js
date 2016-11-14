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
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	//style
	var $ = window.$; //개발용 스크립트 프로덕션시 삭제
	
	console.log($);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var menuData = [{
		depth1: "공통",
		depth2: "",
		links: [{
			title: "댓글",
			href: "/html/common/reply.html",
			complete: true
		}, {
			title: "내용이 없을 때",
			href: "/html/common/no-reply.html",
			complete: true
		}]
	}, {
		depth1: "브랜드",
		depth2: "매장정보",
		links: [{
			title: "매장소식",
			href: "/html/brand/storeInfo/storeNews.html",
			complete: true
		}]
	}, {
		depth1: "멤버쉽",
		depth2: "이용약관",
		links: [{
			title: "서비스 이용약관 (뷰티포인트 웹)",
			href: "/html/membership/serviceAgreement/service.html",
			complete: true
		}, {
			title: "개인정보 처리방침 (뷰티포인트 웹)",
			href: "/html/membership/serviceAgreement/personalInfomation.html",
			complete: true
		}, {
			title: "위치기반서비스 이용약관",
			href: "/html/membership/serviceAgreement/locationBased.html",
			complete: true
		}]
	}, {
		depth1: "이벤트&행사",
		depth2: "진행중인 이벤트",
		links: [{
			title: "상세 - 일반",
			href: "/html/event/ongoing/view.html",
			complete: true
		}, {
			title: "상세 - 헤라메이크업쇼",
			href: "/html/event/ongoing/viewHera.html",
			complete: true
		}, {
			title: "상세 (투표하기 - 단일선택)",
			href: "/html/event/ongoing/viewPoll_singleSelect.html",
			complete: true
		}, {
			title: "상세 (투표하기 - 복수선택)",
			href: "/html/event/ongoing/viewPoll_multiSelect.html",
			complete: true
		}, {
			title: "상세 (투표완료)",
			href: "/html/event/ongoing/viewPollComplete.html",
			complete: true
		}, {
			title: "상세 (투표종료 후 확인)",
			href: "/html/event/ongoing/viewPoll_finish.html",
			complete: true
		}]
	}, {
		depth1: "뷰티컨텐츠",
		depth2: "목록",
		links: [{
			title: "상세(카드뉴스형)",
			href: "/html/beautyContent/cardType.html",
			complete: true
		}, {
			title: "상세(동영상형)",
			href: "/html/beautyContent/movieType.html",
			complete: true
		}]
	}, {
		depth1: "상품정보",
		depth2: "",
		links: [{
			title: "상품 상세",
			href: "/html/productInfo/view.html",
			complete: true
		}]
	}, {
		depth1: "상품 상세",
		depth2: "",
		links: [{
			title: "상품리뷰",
			href: "/html/productReview/view.html",
			complete: true
		}]
	}, {
		depth1: "고객센터",
		depth2: "공지사항",
		links: [{
			title: "목록 + 상세",
			href: "/html/cs/notice/list.html",
			complete: true
		}]
	}, {
		depth1: "도움말",
		depth2: "",
		links: [{
			title: "메인",
			href: "/html/cs/help/index.html",
			complete: true
		}]
	}, {
		depth1: "마이페이지",
		depth2: "",
		links: [{
			title: "나의 등급",
			href: "/html/myPage/grade/index.html",
			complete: true
		}, {
			title: "브랜드별 매장선택",
			href: "/html/myPage/selectStore/index.html",
			complete: true
		}, {
			title: "나의 쿠폰",
			href: "/html/myPage/coupon/index.html",
			complete: true
		}, {
			title: "나의 리뷰",
			href: "/html/myPage/myReview/index.html",
			complete: true
		}]
	}, {
		depth1: "엔젤톡톡",
		depth2: "",
		links: [{
			title: "대화화면",
			href: "/html/engelTalk/talk_inquiry.html",
			complete: true
		}]
	}];
	
	var menuList = menuData.reduce(function (p, c) {
		var depth1 = c.depth1;
		var depth2 = c.depth2;
		var links = c.links;
	
		return (p || '') + "\n\t<h2><span>" + depth1 + "</span></h2>\n\t" + (depth2 == '' ? depth2 : "<h3><span>" + depth2 + "</span></h3>") + "\n\t<ul>" + links.reduce(function (ip, ic) {
			var title = ic.title;
			var href = ic.href;
			var complete = ic.complete;
	
			return (ip || "") + "\n\t\t<li" + (complete ? ' class="cp"' : "") + "><a href=\"" + href + "\">" + title + "</a></li>";
		}, 0) + "\n\t</ul>\n\t";
	}, 0);
	
	// 메뉴 버튼 삽입
	window.dev = {
		appendMenuBtn: function appendMenuBtn() {
			var menuTrigger = "<button class=\"menu-trigger\">\n\t\t\t\t\t\t\t\t<span>toggle menu</span>\n\t\t\t\t\t\t\t</button>";
	
			if ($('button.menu-trigger').length <= 0) {
				$('#menu').prepend(menuTrigger);
			}
	
			$('.menu-trigger').off('click').on('click', function () {
				var condition = $('#menu-list').hasClass('is-active');
				if (condition) {
					$('#menu-list').add($(this)).removeClass('is-active');
				} else {
					$('#menu-list').add($(this)).addClass('is-active');
				}
			});
		}
	
		// 메뉴 리스트 삽입
		, appendMenuList: function appendMenuList() {
	
			if ($('#menu').length <= 0) {
				menuList = $('<div id=menu />').append($('<div id=menu-list class=overthrow />').append(menuList));
				$('#wrap').length <= 0 ? $('body').prepend(menuList) : $('#wrap').prepend(menuList);
			}
			$('#menu-list').find('a').each(function () {
				var aHREF = $(this).attr('href');
				if (aHREF.indexOf('?dev') <= -1) {
					$(this).attr('href', aHREF + '?dev');
				}
			});
		},
		dimm: function dimm(msg) {
			msg = msg || '내용이 없습니다.';
			$('body').append($('<div class="dimm" />').append($("<span>" + msg + "<span/><button class=\"close\">[닫기]</span></button>")));
			$('.dimm').on('click', '.close', function () {
				$('.dimm').remove();
			});
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	* VideoPlayer (c) yikl100@gmail.com, 2016.11
	*	networkState { number }
	* 	0 = NETWORK_EMPTY - audio/video has not yet been initialized
	*	1 = NETWORK_IDLE - audio/video is active and has selected a resource, but is not using the network
	*	2 = NETWORK_LOADING - browser is downloading data
	*	3 = NETWORK_NO_SOURCE - no audio/video source found
	*
	*	reasyState { numver }
	*	0 = HAVE_NOTHING - no information whether or not the audio/video is ready	
	*	1 = HAVE_METADATA - metadata for the audio/video is ready
	*	2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
	*	3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
	*	4 = HAVE_ENOUGH_DATA - enough data available to start playing
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
	
		this.posterLoaded();
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
				// console.log('onloadstart'. v.networkState);
			};
			v.onloadeddata = function () {
				console.log('loadeddata', v.networkState);
			};
			v.onloadedmetadata = function () {
				console.log('onloadedmetadata', v.networkState);
			};
	
			document.webkitbeginfullscreen = function () {
				console.log('begin fullscreen');
			};
			document.webkitendfullscreen = function () {
				console.log('end fullscreen');
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
		that.getDuration();
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzU4NGQ5M2M1ZTVhY2U5YTQwYjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJ3aW4iLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsb2FkaW5nQ29tcGxldGUiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbWFnZVByZWxvYWRlciIsImltZyIsImNsYXNzTmFtZSIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInRvZ2dsZUdyb3VwIiwiZ3JvdXAiLCJlbGVtZW50IiwiYmVhdXR5bnVzIiwiY2FyZE5ld3MiLCJkZWZhdWx0T3B0aW9ucyIsImRpcmVjdGlvbiIsImxvb3AiLCJwYWdpbmF0aW9uIiwicGFnaW5hdGlvblR5cGUiLCJpbml0Iiwic2NvcGUiLCJvcHRpb25zIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsIml0ZW0iLCJwYXJlbnRzIiwiaGFzQ2xhc3MiLCJzaWJsaW5ncyIsInNjcm9sbFRvcCIsInBvc2l0aW9uIiwidG9wIiwiam9pbiIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwidGl0bGUiLCJjb21wbGV0ZSIsIm1lbnVMaXN0IiwicmVkdWNlIiwicCIsImMiLCJpcCIsImljIiwibWVudVRyaWdnZXIiLCJwcmVwZW5kIiwib2ZmIiwiY29uZGl0aW9uIiwiYWRkIiwiYXBwZW5kIiwiYUhSRUYiLCJhdHRyIiwiZGltbSIsInJlbW92ZSIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsImVuZGVkQ2FsbGJhY2siLCJxdWVyeVNlbGVjdG9yIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImdldCIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwicGxheVBhdXNlRmxhZyIsIndhcm4iLCJwb3N0ZXJMb2FkZWQiLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJhZGRLbGFzcyIsIl9wbGF5IiwidiIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwibmV0d29ya1N0YXRlIiwicmVhZHlTdGF0ZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsImVuZGVkIiwic2V0VGltZW91dCIsIm9ubG9hZCIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIndlYmtpdGJlZ2luZnVsbHNjcmVlbiIsIndlYmtpdGVuZGZ1bGxzY3JlZW4iLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wbGF5aW5nIiwicmVtb3ZlS2xhc3MiLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImdldFJhdGlvIiwieCIsInkiLCJsIiwiTWF0aCIsInJvdW5kIiwiZ2V0RHVyYXRpb24iLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJkdXJhdGlvbiIsInMiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwic3R5bGUiLCJoZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsImRpciIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJldmVudCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJjc3MiLCJsb2FkIiwicGFyc2VJbnQiLCJ2YWx1ZSIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJlbCIsImRhdGFzZXQiLCJjYW52YXNUYWciLCJpZCIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFGOEI7QUFLOUIsS0FBSUEsSUFBSUMsT0FBT0QsQ0FBZixDLENBSmdCOztBQUtoQkUsU0FBUUMsR0FBUixDQUFZSCxDQUFaOztBQUVBLEtBQUlJLE1BQU1ILE1BQVY7QUFBQSxLQUNJSSxNQUFNQyxRQURWOztBQUdBTCxRQUFPTSxLQUFQLEdBQWUsVUFBU0MsR0FBVCxFQUFjO0FBQ3pCLFlBQU9OLFFBQVFDLEdBQVIsQ0FBWUssR0FBWixDQUFQO0FBQ0gsRUFGRDs7QUFJQTtBQUNBSixLQUFJSyxFQUFKLEdBQVNSLE9BQU9RLEVBQVAsSUFBYTs7QUFFbEI7QUFDQUMsV0FBTTtBQUNGO0FBQ0FDLHdCQUFlLHlCQUFXLENBQUU7O0FBRTVCOztBQUpFLFdBTUZDLE1BQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2hCLGlCQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlD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SUFBSCxDQUFRRSxJQUFSLENBQWNpQyxPQUFPVyxTQUFQLENBQWlCMUMsT0FBakIsQ0FBMEJtUCxNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc1ODRkOTNjNWU1YWNlOWE0MGIxXG4gKiovIiwiaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuaW1wb3J0ICcuL2Rldic7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5pbXBvcnQgJy4vdmlkZW8tcGxheWVyJztcblxuXG52YXIgJCA9IHdpbmRvdy4kO1xuY29uc29sZS5sb2coJCk7XG5cbnZhciB3aW4gPSB3aW5kb3csXG4gICAgZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKG1zZykge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xufTtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuICAgIC8v7Jyg7Yu4IOuplOyEnOuTnFxuICAgIHV0aWw6IHtcbiAgICAgICAgLy8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuICAgICAgICBjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpIHt9XG5cbiAgICAgICAgLy8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcbiAgICAgICAgLFxuICAgICAgICB0cmltOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRGV2aWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdpbmdlcmJyZWFkKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pb3MpIHJldHVybiAnaW9zJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zKSByZXR1cm4gJ25vLW1vYmlsZSc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgfVxuXG4gICAgLy8g6rO17Ya1IOuplOyEnOuTnFxuICAgICxcbiAgICBjb21tb246IHtcblxuICAgICAgICAvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcbiAgICAgICAgZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuICAgICAgICAgICAgdmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLFxuICAgICAgICAgICAgICAgIGFUYWcgPSBudWxsLFxuICAgICAgICAgICAgICAgIGhyZWYgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhVGFnID0gYWxsQVtpXTtcbiAgICAgICAgICAgICAgICBocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBpZiAodWkudXRpbC50cmltKGhyZWYpID09ICcjJyB8fCBocmVmID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2dnbGVDbGFzcyBjdXN0b21cbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVjbGFzczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuICAgICAgICAsXG4gICAgICAgIHRhYmxlRmFkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG4gICAgICAgICAgICBpZiAoX3Njb3BlLmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9hZGluZyBtYXNrXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnN0b3AoKS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6re466O5IO2GoOq4gFxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZUdyb3VwOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICAgIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgICAgIF9zY29wZTogJycsXG5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcbiAgICAgICAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4BcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgICB2YXIgYWNjb3JkaWFuID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuICAgICAgICBpbml0OiBmdW5jdGlvbihfc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICB9LFxuICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoaXRlbS5wb3NpdGlvbigpLnRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDrj5nsg4Hsg4HtmJVcblxuICAgIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgICAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cbiAgICBjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuICAgIGNvbW1vbi50YWJsZUZhZGUoKTtcblxuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykpO1xuXG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cbiAgICBjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NhbGxiYWNrc1xuICAgIH0pO1xuXG4gICAgLy/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuICAgIGlmIChsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xKSB7XG4gICAgICAgIGRldi5hcHBlbmRNZW51TGlzdCgpO1xuICAgICAgICBkZXYuYXBwZW5kTWVudUJ0bigpO1xuICAgIH1cbn0pO1xuXG4vKlxuICpcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4gKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VzLnNyYyA9IGltZztcblxuICAgIGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgbWVudURhdGEgPSBbXG5cdHtcblx0XHRkZXB0aDE6IFwi6rO17Ya1XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMk+q4gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgrTsmqnsnbQg7JeG7J2EIOuVjFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9uby1yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu4jOuenOuTnFwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXsoJXrs7RcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrp6TsnqXshozsi51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUluZm8vc3RvcmVOZXdzLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi66mk67KE7Im9XCIsXG5cdFx0ZGVwdGgyOiBcIuydtOyaqeyVveq0gFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyEnOu5hOyKpCDsnbTsmqnslb3qtIAgKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3NlcnZpY2UuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rCc7J247KCV67O0IOyymOumrOuwqey5qCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuychOy5mOq4sOuwmOyEnOu5hOyKpCDsnbTsmqnslb3qtIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuydtOuypO2KuCbtlonsgqxcIixcblx0XHRkZXB0aDI6IFwi7KeE7ZaJ7KSR7J24IOydtOuypO2KuFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIOydvOuwmFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDtl6TrnbzrqZTsnbTtgazsl4Xsh7xcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdIZXJhLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfc2luZ2xlU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g67O17IiY7ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfbXVsdGlTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsmYTro4wpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbENvbXBsZXRlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrt7Dti7Dsu6jthZDsuKBcIixcblx0XHRkZXB0aDI6IFwi66qp66GdXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L2NhcmRUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo64+Z7JiB7IOB7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvbW92aWVUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiOygleuztFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdEluZm8vdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdFJldmlldy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi6rOg6rCd7IS87YSwXCIsXG5cdFx0ZGVwdGgyOiBcIuqzteyngOyCrO2VrVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuqqeuhnSArIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL25vdGljZS9saXN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi64+E7JuA66eQXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuplOyduFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL2hlbHAvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTpcIuuniOydtO2OmOydtOyngFwiICxcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOuTseq4iVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9ncmFkZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuu4jOuenOuTnOuzhCDrp6TsnqXshKDtg51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2Uvc2VsZWN0U3RvcmUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg7L+g7Y+wXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2NvdXBvbi9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yA7ZmU7ZmU66m0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQ8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+XG5cdCR7ZGVwdGgyID09ICcnID8gZGVwdGgyIDogYDxoMz48c3Bhbj4ke2RlcHRoMn08L3NwYW4+PC9oMz5gfVxuXHQ8dWw+JHtsaW5rcy5yZWR1Y2UoKGlwLCBpYykgPT4ge1xuXHRcdFx0bGV0IHt0aXRsZSwgaHJlZiwgY29tcGxldGV9ID0gaWM7XG5cdFx0XHRyZXR1cm4gYCR7aXAgfHwgXCJcIn1cblx0XHQ8bGkke2NvbXBsZXRlID8gJyBjbGFzcz1cImNwXCInIDogXCJcIn0+PGEgaHJlZj1cIiR7aHJlZn1cIj4ke3RpdGxlfTwvYT48L2xpPmB9LCAwKX1cblx0PC91bD5cblx0YFxufSwgMCk7XG5cbi8vIOuplOuJtCDrsoTtirwg7IK97J6FXG53aW5kb3cuZGV2ID0ge1xuXHRhcHBlbmRNZW51QnRuOiBmdW5jdGlvbigpe1xuXHRcdHZhciBtZW51VHJpZ2dlciA9IGA8YnV0dG9uIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPmA7XG5cblx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0fVxuXG5cdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGNvbmRpdGlvbiA9ICQoJyNtZW51LWxpc3QnKS5oYXNDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHRpZiAoIGNvbmRpdGlvbiApIHtcblx0XHRcdFx0JCgnI21lbnUtbGlzdCcpLmFkZCgkKHRoaXMpKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJyNtZW51LWxpc3QnKS5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IGNsYXNzPW92ZXJ0aHJvdyAvPicpLmFwcGVuZCggbWVudUxpc3QgKSApO1xuXHRcdFx0JCgnI3dyYXAnKS5sZW5ndGggPD0gMCA/ICQoJ2JvZHknKS5wcmVwZW5kKCBtZW51TGlzdCApIDogJCgnI3dyYXAnKS5wcmVwZW5kKCBtZW51TGlzdCApO1xuXHRcdH1cblx0XHQkKCcjbWVudS1saXN0JykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhSFJFRiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0aWYgKCBhSFJFRi5pbmRleE9mKCc/ZGV2JykgPD0gLTEgKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGFIUkVGICsgJz9kZXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHQsZGltbTogZnVuY3Rpb24obXNnKXtcblx0XHRtc2cgPSBtc2cgfHwgJ+uCtOyaqeydtCDsl4bsirXri4jri6QuJztcblx0XHQkKCdib2R5JykuYXBwZW5kKFxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImRpbW1cIiAvPicpLmFwcGVuZChcblx0XHRcdFx0JChgPHNwYW4+JHttc2d9PHNwYW4vPjxidXR0b24gY2xhc3M9XCJjbG9zZVwiPlvri6vquLBdPC9zcGFuPjwvYnV0dG9uPmApXG5cdFx0XHQpXG5cdFx0KTtcblx0XHQkKCcuZGltbScpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmRpbW0nKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZGV2LmpzXG4gKiovIiwiLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qXHRuZXR3b3JrU3RhdGUgeyBudW1iZXIgfVxuKiBcdDAgPSBORVRXT1JLX0VNUFRZIC0gYXVkaW8vdmlkZW8gaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZFxuKlx0MSA9IE5FVFdPUktfSURMRSAtIGF1ZGlvL3ZpZGVvIGlzIGFjdGl2ZSBhbmQgaGFzIHNlbGVjdGVkIGEgcmVzb3VyY2UsIGJ1dCBpcyBub3QgdXNpbmcgdGhlIG5ldHdvcmtcbipcdDIgPSBORVRXT1JLX0xPQURJTkcgLSBicm93c2VyIGlzIGRvd25sb2FkaW5nIGRhdGFcbipcdDMgPSBORVRXT1JLX05PX1NPVVJDRSAtIG5vIGF1ZGlvL3ZpZGVvIHNvdXJjZSBmb3VuZFxuKlxuKlx0cmVhc3lTdGF0ZSB7IG51bXZlciB9XG4qXHQwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XHRcbipcdDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuKlx0MiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuKlx0MyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4qXHQ0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24od3JhcHBlciwgZW5kZWRDYWxsYmFjaykge1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcblx0dGhpcy5sb2FkaW5nRWxlbWVudFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvLWxvYWRpbmctaW1hZ2UnKSxcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gMDtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2YgZW5kZWRDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX2luaXQoKTtcblx0Y29uc29sZS5sb2coJ3ZpZGVvIHBsYXllciBjYWxsJyk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdGNvbnNvbGUubG9nKCdpbml0Jyk7XG5cblx0Ly8gdGhhdC5sb3dSZXMuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGF0Lmxvd1Jlcy5kYXRhc2V0LnNyYyk7XG5cdC8vIHRoYXQuaGlnaFJlcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoYXQuaGlnaFJlcy5kYXRhc2V0LnNyYyk7XG5cdCQodGhhdC5sb3dSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5sb3dSZXMpLmRhdGEoJ3NyYycpICk7XG5cdCQodGhhdC5oaWdoUmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQuaGlnaFJlcykuZGF0YSgnc3JjJykgKTtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHR0aGF0Ll9wbGF5KCk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gbnVsbDtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXG5cdFx0Y29uc29sZS5sb2coJz09PT09PT09PT09Jywgdi5uZXR3b3JrU3RhdGUsIHYucmVhZHlTdGF0ZSk7XG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0XHRpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHRcdFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygnYWFhYWFhJyk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHYuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0YmVnaW5mdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGJpZ2luJyk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0di5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGVuZCcpO1xuXHRcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIDUwKTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cblx0XHR2Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnb25sb2Fkc3RhcnQnLiB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9hZGVkZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRtZXRhZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkZWRtZXRhZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXG5cdFx0ZG9jdW1lbnQud2Via2l0YmVnaW5mdWxsc2NyZWVuID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdiZWdpbiBmdWxsc2NyZWVuJyk7XG5cdFx0fTtcblx0XHRkb2N1bWVudC53ZWJraXRlbmRmdWxsc2NyZWVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnZW5kIGZ1bGxzY3JlZW4nKTtcblx0XHR9O1xuXHR9XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cblx0Ly8gdGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyB0aGF0LnZpZGVvLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHQvLyBcdGNvbnNvbGUubG9nKCdvbmNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyBpZiAoIHRoYXQudmlkZW8uZnVsbHNjcmVlbmNoYW5nZSApXG5cdC8vIFx0dGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlKCk7XG5cblx0Ly8gaWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdC8vIFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0Ly8gXHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCftmZXsnbgnKTtcblx0Ly8gXHRcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSwgNTAwKTtcblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIH0gZWxzZSBpZiAoKSB7XG5cdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQvLyBcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHQvLyBcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRcdFx0aWYgKGNvbmZpcm0oJ+qzoOqwneuLmOydhCDsnITtlZwg6rmc7KedIOy/oO2PsOydtCDrsJzquInrkJjsl4jsirXri4jri6QuICTsv6Dtj7DrqoUkIOy/oO2PsOydhCDrsJzquInrsJvsnLzsi5zqsqDsirXri4jquYw/JykgKSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7ZmV7J24Jyk7XG5cdC8vIFx0XHRcdFx0fSBlbHNlIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCfst6jshownKTtcblx0Ly8gXHRcdFx0XHR9XG5cdC8vIFx0XHRcdH0sIDUwMCk7XG5cdC8vIFx0XHR9XG5cdC8vIFx0fVxuXHQvLyB9XG5cblx0Ly8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdC8vIFx0ZW5kRnVsbCgpO1xuXHQvLyB9LCBmYWxzZSk7XG5cdC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHQvLyBcdGVuZEZ1bGwoKTtcblx0Ly8gfSwgZmFsc2UpO1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdCQodGhhdC5wb3N0ZXIpLmhpZGUoKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLnNob3coKTtcblx0XHQkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHRjb25zb2xlLmxvZygnb25wbGF5JywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLmhpZGUoKTtcblx0XHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHRcdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHRpZiAoIHYuZW5kZWQgKSB7XG5cdFx0XHRpZiAoIHYuZXhpdEZ1bGxzY3JlZW4gKSB2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRlbHNlIGlmICggdi53ZWJraXRFeGl0RnVsbHNjcmVlbiApIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdC8vIGlmICggdGhpcy5lbmRlZCApIHtcblx0XHRcdFx0XG5cdFx0XHQvLyB9XG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnZ2V0IGR1cmF0aW9uJyk7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdnZXQgZHVyYXRpb24gc2V0SW50ZXJ2YWwnLCAncmVhZHlTdGF0ZTogJyArIHZpZGVvLnJlYWR5U3RhdGUsICk7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnZ2V0IGR1cmF0aW9uIHNldEludGVydmFsIGlmJyk7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiggZXJyb3JUeXBlICkge1xuXHQvLyBpZiAoIHJlYWR5U3RhdGVGbGFnID09ICApXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0aWYgKCB0aGF0LnZpZGVvLnBhdXNlZCApIHJldHVybjtcblx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHRjb25zb2xlLmxvZygncGF1c2UgYnV0dG9uJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmJnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmNvbnRyb2wpLm9uKHtcblx0J21vdXNkb3duIHRvdWNoc3RhcnQnOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9LFxuXHQnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuXHQgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tYWtlU2Vla2JhciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG4gIGNvbnNvbGUuZGlyKHYpO1xuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0YXJ0IDogJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NsaWRlciBzdG9wIDogJywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQoaGlnaFJlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0dGhhdC52aWRlbyA9ICQobG93UmVzKS5nZXQoMCk7XG5cdH0gZWxzZSB7XG5cdFx0JChsb3dSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQoaGlnaFJlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHR0aGF0LnZpZGVvID0gJChoaWdoUmVzKS5nZXQoMCk7XG5cdH1cblx0dGhhdC52aWRlby5sb2FkKCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2ID0gdGhhdC52aWRlbztcblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdD0gdGhpcyxcblx0XHR2IFx0XHQ9IHRoYXQudmlkZW87XG5cblx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5kYXRhc2V0LmJnO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHRoYXQuY29udHJvbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZXI7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cblx0XHRpbWdXID0gdGhhdC53cmFwcGVyLmNsaWVudFdpZHRoLFxuXHRcdGltZ0ggPSB0aGF0LmdldFJhdGlvKGltZy5uYXR1cmFsV2lkdGgsIGltZy5uYXR1cmFsSGVpZ2h0LCBpbWdXKTtcblx0XHR0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoIChjb250ZXh0Lmdsb2JhbEFscGhhKS50b0ZpeGVkKDEpIDwgMSApIHtcblx0XHRcdFx0aW1nVyArPSAxO1xuXHRcdFx0XHRpbWdIICs9IDE7XG5cdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoaW1nLCBjYW52YXMud2lkdGgvMiAtIGltZ1cvMiwgY2FudmFzLmhlaWdodC8yIC0gaW1nSC8yLCBpbWdXLCBpbWdIKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHR9XG5cdFx0fSwgMzAwLzMwKVxuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==