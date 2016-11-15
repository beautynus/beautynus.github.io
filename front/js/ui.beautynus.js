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
	
	        // Layer popup
	
	        , popupClose: function popupClose() {
	            var popup = $('.popup');
	            if (popup.length > 0) {
	                for (var i = 0, length = popup.length; i < length; i += 1) {
	                    (function (j) {
	                        popup.eq(j).find('.btn-close').on('click', function () {
	                            $(this).parents('.popup').remove();
	                        });
	                    })(i);
	                }
	            }
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

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var win = window;
	var dox = document;
	var qsa = 'querySelectorAll';
	var qs = 'querySelector';
	
	
	var dom = function dom(s) {
		return document.querySelector(s);
	},
	    domAll = function domAll(s) {
		return document.querySelectorAll(s);
	},
	    makeDom = function makeDom(s, attr) {
		var dom = document.createElement(s);
		if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) == 'object' && Object.keys(attr).length > 0) for (var i in attr) {
			dom.setAttribute(i, attr[i]);
		}return dom;
	},
	    putText = function putText(s) {
		return document.createTextNode(s);
	},
	    prepend = function prepend(item, target) {
		return target.insertBefore(item, target.childNodes[0]);
	},
	    append = function append(item, target) {
		return target.appendChild(item);
	};
	
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
		}, {
			title: "관심상품",
			href: "/html/myPage/productOfInterest/index.html",
			complete: false
		}]
	}, {
		depth1: "",
		depth2: "구매현황",
		links: [{
			title: "리스트(popup 포함)",
			href: "/html/myPage/purchase/period.html",
			complete: true
		}, {
			title: "구매현황 리스트가 없을 때",
			href: "/html/myPage/purchase/no-content.html",
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
	
		return (p || '') + '\n\t' + (depth1 ? '<h2><span>' + depth1 + '</span></h2>' : '') + '\n\t' + (depth2 == '' ? depth2 : '<h3><span>' + depth2 + '</span></h3>') + '\n\t<ul>' + links.reduce(function (ip, ic) {
			var title = ic.title;
			var href = ic.href;
			var complete = ic.complete;
	
			return (ip || "") + '\n\t\t<li' + (complete ? ' class="cp"' : "") + '><a href="' + href + '">' + title + '</a></li>';
		}, 0) + '\n\t</ul>\n\t';
	}, 0);
	
	// 메뉴 버튼 삽입
	window.dev = {
		appendMenuBtn: function appendMenuBtn() {
			var menuTrigger = makeDom('button', { type: 'button', class: 'menu-trigger' }),
			    menuTriggerSpan = makeDom('span');
			menuTriggerSpan.appendChild(putText('toggle menu'));
			menuTrigger.appendChild(menuTriggerSpan);
	
			if (domAll('button.menu-trigger').length <= 0) {
				prepend(menuTrigger, dom('#menu'));
			}
	
			menuTrigger.addEventListener('click', function () {
				var menuListDom = dom('#menu-list'),
				    ctrlClass = 'is-active',
				    condition = menuListDom.className.indexOf(ctrlClass) > -1;
				if (condition) {
					menuListDom.className = menuListDom.className.replace(new RegExp(ctrlClass), "").trim();
					this.className = this.className.replace(new RegExp(ctrlClass), "").trim();
				} else {
					menuListDom.className += ' ' + ctrlClass;
					this.className += ' ' + ctrlClass;
				}
			}, false);
		}
	
		// 메뉴 리스트 삽입
		, appendMenuList: function appendMenuList() {
	
			if (domAll('#menu').length <= 0) {
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
			$('body').append($('<div class="dimm" />').append($('<span>' + msg + '<span/><button class="close">[닫기]</span></button>')));
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
		if (!(this instanceof VideoPlayer)) return new VideoPlayer(wrapper, endedCallback);
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
	
			document.addEventListener('webkitbeginfullscreen', function () {
				console.log('fullscreen bigin');
			}, false);
	
			document.addEventListener('webkitendfullscreen', function () {
				console.log('fullscreen end');
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
				if (this.ended) {
					if (v.webkitDisplayingFullscreen) {
						setTimeout(function () {
							that.endedCallback();
						}, 500);
					} else {
						that.endedCallback();
					}
				}
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
			$(that.lowRes).attr('src', $(that.lowRes).data('src'));
			that.video = $(lowRes).get(0);
		} else {
			$(lowRes).css({ opacity: 0 }).hide().attr('data-play', 'false');
			$(highRes).show().css({ opacity: 1 }).attr('data-play', 'true');
			$(that.highRes).attr('src', $(that.highRes).data('src'));
			that.video = $(highRes).get(0);
		}
		that.video.load();
		// that.verifying( that.video );
	};
	
	VideoPlayer.prototype.verifying = function (v) {
		// function ajax() {
		//  		var req = new XMLHttpRequest();
		// 	req.onreadystatechange = function () {
		// 		if ( req.readyState === req.DONE ) {
		// 			if ( req.status == 200 ) {
		// 				document.getElementById("myDiv").innerHTML = req.responseText;
		// 			}
		// 		}
		// 	};
		// }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjdkMjYzZTBiMmMwODM5ZGQ5YjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsb2FkaW5nQ29tcGxldGUiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbWFnZVByZWxvYWRlciIsImltZyIsImNsYXNzTmFtZSIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInRvZ2dsZUdyb3VwIiwiZ3JvdXAiLCJlbGVtZW50IiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwiaGFzQ2xhc3MiLCJzaWJsaW5ncyIsInNjcm9sbFRvcCIsInBvc2l0aW9uIiwidG9wIiwiam9pbiIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJkb3giLCJxc2EiLCJxcyIsImRvbSIsInF1ZXJ5U2VsZWN0b3IiLCJzIiwiZG9tQWxsIiwibWFrZURvbSIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJhcHBlbmRDaGlsZCIsIm1lbnVEYXRhIiwiZGVwdGgxIiwiZGVwdGgyIiwibGlua3MiLCJ0aXRsZSIsImNvbXBsZXRlIiwibWVudUxpc3QiLCJyZWR1Y2UiLCJwIiwiYyIsImlwIiwiaWMiLCJtZW51VHJpZ2dlciIsInR5cGUiLCJjbGFzcyIsIm1lbnVUcmlnZ2VyU3BhbiIsIm1lbnVMaXN0RG9tIiwiY3RybENsYXNzIiwiY29uZGl0aW9uIiwiUmVnRXhwIiwiYUhSRUYiLCJkaW1tIiwiVmlkZW9QbGF5ZXIiLCJ3cmFwcGVyIiwiZW5kZWRDYWxsYmFjayIsImxvYWRpbmdFbGVtZW50IiwidmlkZW8iLCJsb3dSZXMiLCJnZXQiLCJoaWdoUmVzIiwicGxheUZsYWciLCJjdXJUaW1lIiwiY29udHJvbFRpbWVyIiwicG9zdGVyIiwiY29udHJvbCIsImJnIiwicGxheUJ0biIsInBhdXNlQnRuIiwidmlkZW9UaW1lIiwidGltZWxpbmUiLCJmdWxsQnRuIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInNlZWtiYXIiLCJidG5Hcm91cCIsImFjdGl2ZUJ0biIsInBsYXlQYXVzZUZsYWciLCJ3YXJuIiwicG9zdGVyTG9hZGVkIiwiX2luaXQiLCJwcm90b3R5cGUiLCJ0aGF0IiwiYWRkS2xhc3MiLCJfcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIm5ldHdvcmtTdGF0ZSIsInJlYWR5U3RhdGUiLCJfb25QbGF5IiwiX29uUGF1c2UiLCJfb25UaW1lVXBkYXRlIiwiX2NsaWNrIiwiX2Z1bGxzY3JyZW5Nb2RlIiwiX3BhdXNlIiwibWFrZVNlZWtiYXIiLCJjb250cm9sRXZlbnQiLCJkaW1tQ2xpY2siLCJvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UiLCJvbmxvYWQiLCJvbmxvYWRzdGFydCIsIm9ubG9hZGVkZGF0YSIsIm9ubG9hZGVkbWV0YWRhdGEiLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wbGF5aW5nIiwicmVtb3ZlS2xhc3MiLCJvbnBhdXNlIiwiZW5kZWQiLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJzZXRUaW1lb3V0IiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJnZXREdXJhdGlvbiIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJkdXJhdGlvbiIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJfZXJyb3IiLCJlcnJvclR5cGUiLCJhbGxvY2F0ZVNpemUiLCJzdHlsZSIsImhlaWdodCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwiZGlyIiwic2xpZGVyIiwicmFuZ2UiLCJzdGFydCIsImV2ZW50IiwicGF1c2UiLCJzbGlkZSIsImNoYW5nZSIsImNoYW5nZUN1cnJlbnRUaW1lIiwicGxheSIsIndlYmtpdFBsYXlzSW5saW5lIiwicGxheXNJbmxpbmUiLCJwbGF5c2lubGluZSIsIndlYmtpdFBsYXlzaW5saW5lIiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdEVudGVyRnVsbHNjcmVlbiIsImNzcyIsImxvYWQiLCJ2ZXJpZnlpbmciLCJwYXJzZUludCIsInZhbHVlIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImVsIiwiZGF0YXNldCIsImNhbnZhc1RhZyIsImlkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFGOEI7QUFLOUIsS0FBSUEsSUFBSUMsT0FBT0QsQ0FBZixDLENBSmdCOztBQUtoQixLQUFJRSxNQUFNRCxNQUFWO0FBQUEsS0FDSUUsTUFBTUMsUUFEVjs7QUFHQUgsUUFBT0ksS0FBUCxHQUFlLFVBQVNDLEdBQVQsRUFBYztBQUN6QixZQUFPQyxRQUFRQyxHQUFSLENBQVlGLEdBQVosQ0FBUDtBQUNILEVBRkQ7O0FBSUE7QUFDQUosS0FBSU8sRUFBSixHQUFTUixPQUFPUSxFQUFQLElBQWE7O0FBRWxCO0FBQ0FDLFdB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QyxPQUFLLENBQXZFLEVBQTBFRCxJQUExRSxFQUFnRkMsSUFBaEY7QUFDQSxLQUxELE1BS087QUFDTlgsa0JBQWEzQyxLQUFiO0FBQ0E7QUFDRCxJQVRPLEVBU0wsTUFBSSxFQVRDLENBQVI7QUFXQSxHQS9CRDtBQWdDQSxFQTNDRDs7QUE2Q0F2RSxhQUFZNEIsU0FBWixDQUFzQkUsUUFBdEIsR0FBaUMsVUFBVy9ILE1BQVgsRUFBbUJxTyxLQUFuQixFQUEyQjtBQUMzRCxNQUFLck8sT0FBT1csU0FBUCxDQUFpQndDLE9BQWpCLENBQXlCa0wsS0FBekIsSUFBa0MsQ0FBQyxDQUF4QyxFQUE0QztBQUM1Q3JPLFNBQU9XLFNBQVAsSUFBb0IsTUFBTTBOLEtBQTFCO0FBQ0EsRUFIRDs7QUFLQXBJLGFBQVk0QixTQUFaLENBQXNCNkIsV0FBdEIsR0FBb0MsVUFBVzFKLE1BQVgsRUFBbUJxTyxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUl4SSxNQUFKLENBQVd1SSxLQUFYLENBQWI7QUFDQXJPLFNBQU9XLFNBQVAsR0FBbUIvQyxHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBY2lDLE9BQU9XLFNBQVAsQ0FBaUIxQyxPQUFqQixDQUEwQnFRLE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYjdkMjYzZTBiMmMwODM5ZGQ5YjNcbiAqKi8iLCJpbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG5pbXBvcnQgJy4vZGV2JzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcbmltcG9ydCAnLi92aWRlby1wbGF5ZXInO1xuXG5cbnZhciAkID0gd2luZG93LiQ7XG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgICByZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cbiAgICAvL+ycoO2LuCDrqZTshJzrk5xcbiAgICB1dGlsOiB7XG4gICAgICAgIC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4BcbiAgICAgICAgY29tbW9uTm90aGluZzogZnVuY3Rpb24oKSB7fVxuXG4gICAgICAgIC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG4gICAgICAgICxcbiAgICAgICAgdHJpbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgICBpc0RldmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL+uqqOuwlOydvCBVQVxuICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5naW5nZXJicmVhZCkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW9zKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcykgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIH1cblxuICAgIC8vIOqzte2GtSDrqZTshJzrk5xcbiAgICAsXG4gICAgY29tbW9uOiB7XG5cbiAgICAgICAgLy8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG4gICAgICAgIGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcbiAgICAgICAgICAgIHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSxcbiAgICAgICAgICAgICAgICBhVGFnID0gbnVsbCxcbiAgICAgICAgICAgICAgICBocmVmID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVRhZyA9IGFsbEFbaV07XG4gICAgICAgICAgICAgICAgaHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgaWYgKHVpLnV0aWwudHJpbShocmVmKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcbiAgICAgICAgLFxuICAgICAgICB0YWJsZUZhZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuICAgICAgICAgICAgaWYgKF9zY29wZS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvYWRpbmcgbWFza1xuICAgICAgICAsXG4gICAgICAgIGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VQcmVsb2FkZXIoJy9mcm9udC9pbWFnZXMvbG9hZGluZy1jaXJjdWxhci5naWYnLCBmdW5jdGlvbihpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMjAwLCBmdW5jdGlvbigpIHt9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOq3uOujuSDthqDquIBcbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVHcm91cDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExheWVyIHBvcHVwXG4gICAgICAgICxcbiAgICAgICAgcG9wdXBDbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBvcHVwID0gJCgnLnBvcHVwJyk7XG4gICAgICAgICAgICBpZiAoIHBvcHVwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaT0wLCBsZW5ndGg9cG9wdXAubGVuZ3RoOyBpPGxlbmd0aDsgaSs9MSApIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGope1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuZXEoaikuZmluZCgnLmJ0bi1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcucG9wdXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KShpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gICAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICAgIHZhciBjYXJkTmV3cyA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcblxuICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICAgIHZhciBhY2NvcmRpYW4gPSB7XG4gICAgICAgIF9zY29wZTogJycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKF9zY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChpdGVtLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gICAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpIHtcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uLFxuICAgICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuICAgIGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG4gICAgY29tbW9uLnRhYmxlRmFkZSgpO1xuXG4gICAgJCgnYm9keScpLmFkZENsYXNzKFtpc0RldmljZS5jaGVjaygpLCB1dGlsLmRldmljZVNpemVdLmpvaW4oJyAnKSk7XG5cbiAgICBiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuICAgIGNvbW1vbi5sb2FkaW5nQ29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY2FsbGJhY2tzXG4gICAgfSk7XG5cbiAgICAvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG4gICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEpIHtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG4gICAgICAgIGRldi5hcHBlbmRNZW51QnRuKCk7XG4gICAgfVxufSk7XG5cbi8qXG4gKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiAqL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oaW1nLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZXMuc3JjID0gaW1nO1xuXG4gICAgaW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhpbWFnZXMpO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IFt3aW4sIGRveCwgcXNhLCBxc10gPSBbd2luZG93LCBkb2N1bWVudCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnLCAncXVlcnlTZWxlY3RvciddO1xuXG5jb25zdFxuXHRkb20gXHQ9IHMgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzKSxcblx0ZG9tQWxsIFx0PSBzID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocyksXG5cdG1ha2VEb20gPSAocywgYXR0cikgPT4ge1xuXHRcdHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHMpXG5cdFx0aWYgKCB0eXBlb2YgYXR0ciA9PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhhdHRyKS5sZW5ndGggPiAwIClcblx0XHRcdGZvciAoIGxldCBpIGluIGF0dHIgKVxuXHRcdFx0XHRkb20uc2V0QXR0cmlidXRlKGksIGF0dHJbaV0pO1xuXHRcdHJldHVybiBkb207XG5cdH0sXG5cdHB1dFRleHQgPSBzID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpLFxuXHRwcmVwZW5kID0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0Lmluc2VydEJlZm9yZShpdGVtLCB0YXJnZXQuY2hpbGROb2Rlc1swXSksXG5cdGFwcGVuZCBcdD0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0LmFwcGVuZENoaWxkKGl0ZW0pO1xuXG5jb25zdCBtZW51RGF0YSA9IFtcblx0e1xuXHRcdGRlcHRoMTogXCLqs7XthrVcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yT6riAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL3JlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCtOyaqeydtCDsl4bsnYQg65WMXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL25vLXJlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67iM656c65OcXCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeygleuztFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuunpOyepeyGjOyLnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlSW5mby9zdG9yZU5ld3MuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvc2VydmljZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9tYXRpb24uaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7J2067Kk7Yq4Ju2WieyCrFwiLFxuXHRcdGRlcHRoMjogXCLsp4TtlonspJHsnbgg7J2067Kk7Yq4XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7J2867CYXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDri6jsnbzshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyZhOujjClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsooXro4wg7ZuEIO2ZleyduClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX2ZpbmlzaC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu3sO2LsOy7qO2FkOy4oFwiLFxuXHRcdGRlcHRoMjogXCLrqqnroZ1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo7Lm065Oc64m07Iqk7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvY2FyZFR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjrj5nsmIHsg4HtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9tb3ZpZVR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKI7KCV67O0XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0SW5mby92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0UmV2aWV3L3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLqs6DqsJ3shLzthLBcIixcblx0XHRkZXB0aDI6IFwi6rO17KeA7IKs7ZWtXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66qp66GdICsg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3Mvbm90aWNlL2xpc3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrj4Tsm4Drp5BcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66mU7J24XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3MvaGVscC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOlwi66eI7J207Y6Y7J207KeAXCIgLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg65Ox6riJXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2dyYWRlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67iM656c65Oc67OEIOunpOyepeyEoO2DnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9zZWxlY3RTdG9yZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDsv6Dtj7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqtIDsi6zsg4HtkohcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHJvZHVjdE9mSW50ZXJlc3QvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogZmFsc2Vcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuq1rOunpO2YhO2ZqVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuumrOyKpO2KuChwb3B1cCDtj6ztlagpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3B1cmNoYXNlL3BlcmlvZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqtazrp6TtmITtmakg66as7Iqk7Yq46rCAIOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHVyY2hhc2Uvbm8tY29udGVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyXlOygpO2Goe2GoVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjIDtmZTtmZTrqbRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9lbmdlbFRhbGsvdGFsa19pbnF1aXJ5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fVxuXHRcdF1cblx0fVxuXG5dO1xuXG52YXIgbWVudUxpc3QgPSBtZW51RGF0YS5yZWR1Y2UoKHAsIGMpID0+IHtcblx0bGV0IHtkZXB0aDEsIGRlcHRoMiwgbGlua3N9ID0gYztcblx0cmV0dXJuIGAke3AgfHwgJyd9XG5cdCR7ZGVwdGgxID8gYDxoMj48c3Bhbj4ke2RlcHRoMX08L3NwYW4+PC9oMj5gIDogYGB9XG5cdCR7ZGVwdGgyID09ICcnID8gZGVwdGgyIDogYDxoMz48c3Bhbj4ke2RlcHRoMn08L3NwYW4+PC9oMz5gfVxuXHQ8dWw+JHtsaW5rcy5yZWR1Y2UoKGlwLCBpYykgPT4ge1xuXHRcdFx0bGV0IHt0aXRsZSwgaHJlZiwgY29tcGxldGV9ID0gaWM7XG5cdFx0XHRyZXR1cm4gYCR7aXAgfHwgXCJcIn1cblx0XHQ8bGkke2NvbXBsZXRlID8gJyBjbGFzcz1cImNwXCInIDogXCJcIn0+PGEgaHJlZj1cIiR7aHJlZn1cIj4ke3RpdGxlfTwvYT48L2xpPmB9LCAwKX1cblx0PC91bD5cblx0YFxufSwgMCk7XG5cbi8vIOuplOuJtCDrsoTtirwg7IK97J6FXG53aW5kb3cuZGV2ID0ge1xuXHRhcHBlbmRNZW51QnRuOiBmdW5jdGlvbigpe1xuXHRcdHZhciBtZW51VHJpZ2dlciA9IG1ha2VEb20oJ2J1dHRvbicsIHt0eXBlOiAnYnV0dG9uJywgY2xhc3M6ICdtZW51LXRyaWdnZXInfSksXG5cdFx0XHRtZW51VHJpZ2dlclNwYW4gPSBtYWtlRG9tKCdzcGFuJyk7XG5cdFx0bWVudVRyaWdnZXJTcGFuLmFwcGVuZENoaWxkKCBwdXRUZXh0KCd0b2dnbGUgbWVudScpICk7XG5cdFx0bWVudVRyaWdnZXIuYXBwZW5kQ2hpbGQoIG1lbnVUcmlnZ2VyU3BhbiApO1xuXG5cdFx0aWYgKCBkb21BbGwoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdHByZXBlbmQoIG1lbnVUcmlnZ2VyLCBkb20oJyNtZW51JykgKTtcblx0XHR9XG5cblx0XHRtZW51VHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbWVudUxpc3REb20gPSBkb20oJyNtZW51LWxpc3QnKSxcblx0XHRcdFx0Y3RybENsYXNzID0gJ2lzLWFjdGl2ZScsXG5cdFx0XHRcdGNvbmRpdGlvbiA9IG1lbnVMaXN0RG9tLmNsYXNzTmFtZS5pbmRleE9mKCBjdHJsQ2xhc3MgKSA+IC0xO1xuXHRcdFx0aWYgKCBjb25kaXRpb24gKSB7XG5cdFx0XHRcdG1lbnVMaXN0RG9tLmNsYXNzTmFtZSA9IG1lbnVMaXN0RG9tLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoY3RybENsYXNzKSwgXCJcIikudHJpbSgpO1xuXHRcdFx0XHR0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChjdHJsQ2xhc3MpLCBcIlwiKS50cmltKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZW51TGlzdERvbS5jbGFzc05hbWUgKz0gJyAnICsgY3RybENsYXNzO1xuXHRcdFx0XHR0aGlzLmNsYXNzTmFtZSArPSAnICcgKyBjdHJsQ2xhc3M7XG5cdFx0XHR9XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCBkb21BbGwoJyNtZW51JykubGVuZ3RoIDw9IDAgKSB7XG5cdFx0XHRtZW51TGlzdCA9ICQoJzxkaXYgaWQ9bWVudSAvPicpLmFwcGVuZCggJCgnPGRpdiBpZD1tZW51LWxpc3QgY2xhc3M9b3ZlcnRocm93IC8+JykuYXBwZW5kKCBtZW51TGlzdCApICk7XG5cdFx0XHQkKCcjd3JhcCcpLmxlbmd0aCA8PSAwID8gJCgnYm9keScpLnByZXBlbmQoIG1lbnVMaXN0ICkgOiAkKCcjd3JhcCcpLnByZXBlbmQoIG1lbnVMaXN0ICk7XG5cdFx0fVxuXHRcdCQoJyNtZW51LWxpc3QnKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFIUkVGID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cdFx0XHRpZiAoIGFIUkVGLmluZGV4T2YoJz9kZXYnKSA8PSAtMSApIHtcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdocmVmJywgYUhSRUYgKyAnP2RldicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdCxkaW1tOiBmdW5jdGlvbihtc2cpe1xuXHRcdG1zZyA9IG1zZyB8fCAn64K07Jqp7J20IOyXhuyKteuLiOuLpC4nO1xuXHRcdCQoJ2JvZHknKS5hcHBlbmQoXG5cdFx0XHQkKCc8ZGl2IGNsYXNzPVwiZGltbVwiIC8+JykuYXBwZW5kKFxuXHRcdFx0XHQkKGA8c3Bhbj4ke21zZ308c3Bhbi8+PGJ1dHRvbiBjbGFzcz1cImNsb3NlXCI+W+uLq+q4sF08L3NwYW4+PC9idXR0b24+YClcblx0XHRcdClcblx0XHQpO1xuXHRcdCQoJy5kaW1tJykub24oJ2NsaWNrJywgJy5jbG9zZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZGltbScpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9kZXYuanNcbiAqKi8iLCIvKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTYuMTFcbipcdG5ldHdvcmtTdGF0ZSB7IG51bWJlciB9XG4qIFx0MCA9IE5FVFdPUktfRU1QVFkgLSBhdWRpby92aWRlbyBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkXG4qXHQxID0gTkVUV09SS19JRExFIC0gYXVkaW8vdmlkZW8gaXMgYWN0aXZlIGFuZCBoYXMgc2VsZWN0ZWQgYSByZXNvdXJjZSwgYnV0IGlzIG5vdCB1c2luZyB0aGUgbmV0d29ya1xuKlx0MiA9IE5FVFdPUktfTE9BRElORyAtIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgZGF0YVxuKlx0MyA9IE5FVFdPUktfTk9fU09VUkNFIC0gbm8gYXVkaW8vdmlkZW8gc291cmNlIGZvdW5kXG4qXG4qXHRyZWFzeVN0YXRlIHsgbnVtdmVyIH1cbipcdDAgPSBIQVZFX05PVEhJTkcgLSBubyBpbmZvcm1hdGlvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcdFxuKlx0MSA9IEhBVkVfTUVUQURBVEEgLSBtZXRhZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG4qXHQyID0gSEFWRV9DVVJSRU5UX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpcyBhdmFpbGFibGUsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lL21pbGxpc2Vjb25kXG4qXHQzID0gSEFWRV9GVVRVUkVfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IGFuZCBhdCBsZWFzdCB0aGUgbmV4dCBmcmFtZSBpcyBhdmFpbGFibGVcbipcdDQgPSBIQVZFX0VOT1VHSF9EQVRBIC0gZW5vdWdoIGRhdGEgYXZhaWxhYmxlIHRvIHN0YXJ0IHBsYXlpbmdcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbih3cmFwcGVyLCBlbmRlZENhbGxiYWNrKSB7XG5cdGlmICggISh0aGlzIGluc3RhbmNlb2YgVmlkZW9QbGF5ZXIpICkgcmV0dXJuIG5ldyBWaWRlb1BsYXllcih3cmFwcGVyLCBlbmRlZENhbGxiYWNrKTtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IDA7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblx0dGhpcy5lbmRlZENhbGxiYWNrID0gdHlwZW9mIGVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IGVuZGVkQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLl9pbml0KCk7XG5cdGNvbnNvbGUubG9nKCd2aWRlbyBwbGF5ZXIgY2FsbCcpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHRjb25zb2xlLmxvZygnaW5pdCcpO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSBudWxsO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0diA9IHRoYXQudmlkZW87XG5cblx0XHRjb25zb2xlLmxvZygnPT09PT09PT09PT0nLCB2Lm5ldHdvcmtTdGF0ZSwgdi5yZWFkeVN0YXRlKTtcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0XHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0YmVnaW5mdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGJpZ2luJyk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBlbmQnKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHR2Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnb25sb2Fkc3RhcnQnLiB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9hZGVkZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRtZXRhZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkZWRtZXRhZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHR9XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cblx0Ly8gdGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyB0aGF0LnZpZGVvLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHQvLyBcdGNvbnNvbGUubG9nKCdvbmNoYW5nZScpO1xuXHQvLyB9O1xuXHQvLyBpZiAoIHRoYXQudmlkZW8uZnVsbHNjcmVlbmNoYW5nZSApXG5cdC8vIFx0dGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlKCk7XG5cblx0Ly8gaWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdC8vIFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0Ly8gXHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCftmZXsnbgnKTtcblx0Ly8gXHRcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSwgNTAwKTtcblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIH0gZWxzZSBpZiAoKSB7XG5cdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQvLyBcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHQvLyBcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRcdFx0aWYgKGNvbmZpcm0oJ+qzoOqwneuLmOydhCDsnITtlZwg6rmc7KedIOy/oO2PsOydtCDrsJzquInrkJjsl4jsirXri4jri6QuICTsv6Dtj7DrqoUkIOy/oO2PsOydhCDrsJzquInrsJvsnLzsi5zqsqDsirXri4jquYw/JykgKSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7ZmV7J24Jyk7XG5cdC8vIFx0XHRcdFx0fSBlbHNlIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCfst6jshownKTtcblx0Ly8gXHRcdFx0XHR9XG5cdC8vIFx0XHRcdH0sIDUwMCk7XG5cdC8vIFx0XHR9XG5cdC8vIFx0fVxuXHQvLyB9XG5cblx0Ly8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdC8vIFx0ZW5kRnVsbCgpO1xuXHQvLyB9LCBmYWxzZSk7XG5cdC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHQvLyBcdGVuZEZ1bGwoKTtcblx0Ly8gfSwgZmFsc2UpO1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdCQodGhhdC5wb3N0ZXIpLmhpZGUoKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLnNob3coKTtcblx0XHQkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHRjb25zb2xlLmxvZygnb25wbGF5JywgdGhhdC5wbGF5UGF1c2VGbGFnKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLmhpZGUoKTtcblx0XHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHRcdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHRpZiAoIHYuZW5kZWQgKSB7XG5cdFx0XHRpZiAoIHYuZXhpdEZ1bGxzY3JlZW4gKSB2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRlbHNlIGlmICggdi53ZWJraXRFeGl0RnVsbHNjcmVlbiApIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdGlmICggdGhpcy5lbmRlZCApIHtcblx0XHRcdFx0aWYgKCB2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdnZXQgZHVyYXRpb24nKTtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdmlkZW8gPSAkKHRoYXQud3JhcHBlcikuZmluZCgndmlkZW86dmlzaWJsZScpLmVxKDApLmdldCgwKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2dldCBkdXJhdGlvbiBzZXRJbnRlcnZhbCcsICdyZWFkeVN0YXRlOiAnICsgdmlkZW8ucmVhZHlTdGF0ZSwgKTtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdGNvbnNvbGUubG9nKCdnZXQgZHVyYXRpb24gc2V0SW50ZXJ2YWwgaWYnKTtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuXHRcdFx0XHRzID0gJycsXG5cdFx0XHRcdG0gPSAnJztcblx0XHRcdHMgPSAoZHVyYXRpb24gJSA2MCkudG9TdHJpbmcoKSxcblx0XHRcdG0gPSAoKGR1cmF0aW9uIC0gcykgLyA2MCkudG9TdHJpbmcoKTtcblx0XHRcdHMgPSBzLmxlbmd0aCA8IDIgPyAwICsgcyA6IHM7XG5cdFx0XHRtID0gbS5sZW5ndGggPCAyID8gMCArIG0gOiBtO1xuXHRcdFx0dGhhdC52aWRlb1RpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHR0aGF0LmVuZFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTsgXG5cdFx0XHQvLyB0aGF0LmFsbG9jYXRlU2l6ZSh2aWRlbyk7XG5cdFx0fVxuXHR9LCA1MDApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uKCBlcnJvclR5cGUgKSB7XG5cdC8vIGlmICggcmVhZHlTdGF0ZUZsYWcgPT0gIClcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdGhhdC52aWRlby5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuXHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG5cdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdGNvbnNvbGUubG9nKCdwYXVzZSBidXR0b24nLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcbiAgY29uc29sZS5kaXIodik7XG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RhcnQgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHRjb25zb2xlLmxvZygnc2xpZGVyIHN0b3AgOiAnLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JChoaWdoUmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKHRoYXQubG93UmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQubG93UmVzKS5kYXRhKCdzcmMnKSk7XG5cdFx0dGhhdC52aWRlbyA9ICQobG93UmVzKS5nZXQoMCk7XG5cdH0gZWxzZSB7XG5cdFx0JChsb3dSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQoaGlnaFJlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKHRoYXQuaGlnaFJlcykuYXR0cignc3JjJywgJCh0aGF0LmhpZ2hSZXMpLmRhdGEoJ3NyYycpKTtcblx0XHR0aGF0LnZpZGVvID0gJChoaWdoUmVzKS5nZXQoMCk7XG5cdH1cblx0dGhhdC52aWRlby5sb2FkKCk7XG5cdC8vIHRoYXQudmVyaWZ5aW5nKCB0aGF0LnZpZGVvICk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUudmVyaWZ5aW5nID0gZnVuY3Rpb24gKCB2ICkge1xuXHQvLyBmdW5jdGlvbiBhamF4KCkge1xuIC8vICBcdFx0dmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHQvLyBcdHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIFx0XHRpZiAoIHJlcS5yZWFkeVN0YXRlID09PSByZXEuRE9ORSApIHtcblx0Ly8gXHRcdFx0aWYgKCByZXEuc3RhdHVzID09IDIwMCApIHtcblx0Ly8gXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RGl2XCIpLmlubmVySFRNTCA9IHJlcS5yZXNwb25zZVRleHQ7XG5cdC8vIFx0XHRcdH1cblx0Ly8gXHRcdH1cblx0Ly8gXHR9O1xuXHQvLyB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2ID0gdGhhdC52aWRlbztcblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdD0gdGhpcyxcblx0XHR2IFx0XHQ9IHRoYXQudmlkZW87XG5cblx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5kYXRhc2V0LmJnO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHRoYXQuY29udHJvbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZXI7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cblx0XHRpbWdXID0gdGhhdC53cmFwcGVyLmNsaWVudFdpZHRoLFxuXHRcdGltZ0ggPSB0aGF0LmdldFJhdGlvKGltZy5uYXR1cmFsV2lkdGgsIGltZy5uYXR1cmFsSGVpZ2h0LCBpbWdXKTtcblx0XHR0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoIChjb250ZXh0Lmdsb2JhbEFscGhhKS50b0ZpeGVkKDEpIDwgMSApIHtcblx0XHRcdFx0aW1nVyArPSAxO1xuXHRcdFx0XHRpbWdIICs9IDE7XG5cdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoaW1nLCBjYW52YXMud2lkdGgvMiAtIGltZ1cvMiwgY2FudmFzLmhlaWdodC8yIC0gaW1nSC8yLCBpbWdXLCBpbWdIKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHR9XG5cdFx0fSwgMzAwLzMwKVxuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==