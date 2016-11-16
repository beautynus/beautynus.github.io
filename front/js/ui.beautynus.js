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
	        },
	
	        fakeSelect: function fakeSelect() {
	            $('.select-wrap.fake').each(function (item, value) {
	                var select = $(this).find('select'),
	                    label = $(this).find('label');
	                select.on('change', function () {
	                    var that = $(this).get(0),
	                        text = that.options[that.selectedIndex].text;
	                    label.text(text);
	                }).trigger('change');
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
			title: "나의 리뷰 - 방문후기",
			href: "/html/myPage/myReview/visitorsBook.html",
			complete: true
		}, {
			title: "나의 리뷰 - 상품리뷰",
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
			var menuTrigger = '<button type="button" class="menu-trigger">\n\t<span>toggle menu</span>\n</button>';
	
			if ($('button.menu-trigger').length <= 0) {
				$('#menu').prepend(menuTrigger);
			}
	
			$('.menu-trigger').on('click', function () {
				var menuList = $('#menu-list'),
				    ctrlClass = 'is-active',
				    condition = menuList.hasClass(ctrlClass);
				if (condition) {
					menuList.add($(this)).removeClass(ctrlClass);
				} else {
					menuList.add($(this)).addClass(ctrlClass);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTUxZWNiZGIxNjM2NDYyZDI5YjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsb2FkaW5nQ29tcGxldGUiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbWFnZVByZWxvYWRlciIsImltZyIsImNsYXNzTmFtZSIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInRvZ2dsZUdyb3VwIiwiZ3JvdXAiLCJlbGVtZW50IiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJpdGVtIiwidmFsdWUiLCJzZWxlY3QiLCJsYWJlbCIsInRoYXQiLCJnZXQiLCJ0ZXh0Iiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJ0cmlnZ2VyIiwiYmVhdXR5bnVzIiwiY2FyZE5ld3MiLCJkZWZhdWx0T3B0aW9ucyIsImRpcmVjdGlvbiIsImxvb3AiLCJwYWdpbmF0aW9uIiwicGFnaW5hdGlvblR5cGUiLCJpbml0Iiwic2NvcGUiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaGFzQ2xhc3MiLCJzaWJsaW5ncyIsInNjcm9sbFRvcCIsInBvc2l0aW9uIiwidG9wIiwiam9pbiIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJkb3giLCJxc2EiLCJxcyIsImRvbSIsInF1ZXJ5U2VsZWN0b3IiLCJzIiwiZG9tQWxsIiwibWFrZURvbSIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJhcHBlbmRDaGlsZCIsIm1lbnVEYXRhIiwiZGVwdGgxIiwiZGVwdGgyIiwibGlua3MiLCJ0aXRsZSIsImNvbXBsZXRlIiwibWVudUxpc3QiLCJyZWR1Y2UiLCJwIiwiYyIsImlwIiwiaWMiLCJtZW51VHJpZ2dlciIsImN0cmxDbGFzcyIsImNvbmRpdGlvbiIsImFkZCIsImFIUkVGIiwiZGltbSIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsImVuZGVkQ2FsbGJhY2siLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInBvc3RlckxvYWRlZCIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJfcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIm5ldHdvcmtTdGF0ZSIsInJlYWR5U3RhdGUiLCJfb25QbGF5IiwiX29uUGF1c2UiLCJfb25UaW1lVXBkYXRlIiwiX2NsaWNrIiwiX2Z1bGxzY3JyZW5Nb2RlIiwiX3BhdXNlIiwibWFrZVNlZWtiYXIiLCJjb250cm9sRXZlbnQiLCJkaW1tQ2xpY2siLCJvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UiLCJvbmxvYWQiLCJvbmxvYWRzdGFydCIsIm9ubG9hZGVkZGF0YSIsIm9ubG9hZGVkbWV0YWRhdGEiLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wbGF5aW5nIiwicmVtb3ZlS2xhc3MiLCJvbnBhdXNlIiwiZW5kZWQiLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJzZXRUaW1lb3V0IiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJnZXREdXJhdGlvbiIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJkdXJhdGlvbiIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJfZXJyb3IiLCJlcnJvclR5cGUiLCJhbGxvY2F0ZVNpemUiLCJzdHlsZSIsImhlaWdodCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwiZGlyIiwic2xpZGVyIiwicmFuZ2UiLCJzdGFydCIsImV2ZW50IiwicGF1c2UiLCJzbGlkZSIsImNoYW5nZSIsImNoYW5nZUN1cnJlbnRUaW1lIiwicGxheSIsIndlYmtpdFBsYXlzSW5saW5lIiwicGxheXNJbmxpbmUiLCJwbGF5c2lubGluZSIsIndlYmtpdFBsYXlzaW5saW5lIiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdEVudGVyRnVsbHNjcmVlbiIsImNzcyIsImxvYWQiLCJ2ZXJpZnlpbmciLCJwYXJzZUludCIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJlbCIsImRhdGFzZXQiLCJjYW52YXNUYWciLCJpZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ0b0ZpeGVkIiwiZHJhd0ltYWdlIiwia2xhc3MiLCJyZWdleHAiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7O0FBQ0E7O0FBRjhCO0FBSzlCLEtBQUlBLElBQUlDLE9BQU9ELENBQWYsQyxDQUpnQjs7QUFLaEIsS0FBSUUsTUFBTUQsTUFBVjtBQUFBLEtBQ0lFLE1BQU1DLFFBRFY7O0FBR0FILFFBQU9JLEtBQVAsR0FBZSxVQUFTQyxHQUFULEVBQWM7QUFDekIsWUFBT0MsUUFBUUMsR0FBUixDQUFZRixHQUFaLENBQVA7QUFDSCxFQUZEOztBQUlBO0FBQ0FKLEtBQUlPLEVBQUosR0FBU1IsT0FBT1EsRUFBUCxJQUFhOztBQUVsQjtBQUNBQyxXQUFNO0FBQ0Y7QUFDQUMsd0JBQWUseUJBQVcsQ0FBRTs7QUFFNUI7O0FBSkUsV0FNRkMsTUFBTSxjQUFTQyxHQUFULEVBQWM7QUFDaEIsaUJBQUlBLE9BQU8sSUFBUCxJQUFlLE9BQU9BLEdBQVAsSUFBYyxXQUFqQyxFQUE4QyxPQUFPLEVBQVA7QUFDOUMsb0JBQU9BLElBQUlDLE9BQUosQ0FBWSxZQUFaLEVBQTBCLEVBQTFCLENBQVA7QUFDSCxVQVRDO0FBVUZDLG1CQUFVLG9CQUFXO0FBQ2pCO0FBQ0EsaUJBQUlDLEtBQUtDLFVBQVVDLFNBQW5CO0FBQ0Esb0JBQU87QUFDSEMsd0JBQU8saUJBQVc7QUFDZCx5QkFBSSxLQUFLQyxPQUFULEVBQWtCO0FBQ2QsNkJBQUksS0FBS0MsV0FBVCxFQUFzQixPQUFPLGFBQVAsQ0FBdEIsS0FDSyxPQUFPLFNBQVA7QUFDUjtBQUNELHlCQUFJLEtBQUtDLEdBQVQsRUFBYyxPQUFPLEtBQVA7QUFDZCx5QkFBSSxDQUFDLEtBQUtGLE9BQU4sSUFBaUIsQ0FBQyxLQUFLRSxHQUEzQixFQUFnQyxPQUFPLFdBQVA7QUFDbkMsa0JBUkU7QUFTSEEsc0JBQUtOLEdBQUdPLEtBQUgsQ0FBUyxRQUFULElBQXFCLElBQXJCLEdBQTRCLEtBVDlCO0FBVUhILDBCQUFTSixHQUFHTyxLQUFILENBQVMsU0FBVCxJQUFzQixJQUF0QixHQUE2QixLQVZuQztBQVdIRiw4QkFBYUwsR0FBR08sS0FBSCxDQUFTLGFBQVQsSUFBMEIsSUFBMUIsR0FBaUM7QUFYM0MsY0FBUDtBQWFILFVBMUJDO0FBMkJGQyxxQkFBWSxpQkFBaUJ2QixPQUFPd0I7QUEzQmxDOztBQThCTjs7QUFqQ2tCLE9BbUNsQkMsUUFBUTs7QUFFSjtBQUNBQyx3QkFBZSx5QkFBVztBQUN0QjtBQUNBLGlCQUFJQyxPQUFPekIsSUFBSTBCLGdCQUFKLENBQXFCLEdBQXJCLENBQVg7QUFBQSxpQkFDSUMsT0FBTyxJQURYO0FBQUEsaUJBRUlDLE9BQU8sSUFGWDtBQUdBLGtCQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxTQUFTTCxLQUFLSyxNQUE5QixFQUFzQ0QsSUFBSUMsTUFBMUMsRUFBa0RELEdBQWxELEVBQXVEO0FBQ25ERix3QkFBT0YsS0FBS0ksQ0FBTCxDQUFQO0FBQ0FELHdCQUFPRCxLQUFLSSxZQUFMLENBQWtCLE1BQWxCLENBQVA7QUFDQSxxQkFBSXpCLEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFhbUIsSUFBYixLQUFzQixHQUF0QixJQUE2QkEsUUFBUSxJQUF6QyxFQUNJRCxLQUFLSyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLHFDQUExQjtBQUNQO0FBQ0o7O0FBRUQ7O0FBaEJJLFdBa0JKQyxhQUFhLHVCQUFXLENBRXZCOztBQUVEOztBQXRCSSxXQXdCSkMsV0FBVyxxQkFBVztBQUNsQixpQkFBSUMsU0FBU3RDLEVBQUUsaUJBQUYsQ0FBYjtBQUNBLGlCQUFJc0MsT0FBT0wsTUFBUCxJQUFpQixDQUFyQixFQUF3QjtBQUN4QmpDLGVBQUUsaUJBQUYsRUFBcUJ1QyxJQUFyQixDQUEwQixZQUFXO0FBQ2pDLHFCQUFJQyxRQUFReEMsRUFBRSxJQUFGLENBQVo7QUFDQXdDLHVCQUFNQyxJQUFOLENBQVcsbUJBQVgsRUFBZ0NDLEVBQWhDLENBQW1DLFFBQW5DLEVBQTZDLFVBQVNDLENBQVQsRUFBWTtBQUNyRCx5QkFBSUMsVUFBVUQsRUFBRUUsTUFBaEI7QUFDQSx5QkFBS0QsUUFBUUUsV0FBUixHQUFzQkYsUUFBUUcsV0FBL0IsSUFBZ0RILFFBQVFJLFVBQVIsR0FBcUIsRUFBekUsRUFBOEU7QUFDMUVSLCtCQUFNUyxXQUFOLENBQWtCLElBQWxCO0FBQ0gsc0JBRkQsTUFFTztBQUNIVCwrQkFBTVUsUUFBTixDQUFlLElBQWY7QUFDSDtBQUNKLGtCQVBEO0FBUUgsY0FWRDtBQVdIOztBQUVEOztBQXhDSSxXQTBDSkMsaUJBQWlCLHlCQUFTQyxRQUFULEVBQW1CO0FBQ2hDbkQsb0JBQU9vRCxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFXO0FBQ3ZDQyxnQ0FBZSxvQ0FBZixFQUFxRCxVQUFTQyxHQUFULEVBQWM7QUFDL0RBLHlCQUFJQyxTQUFKLEdBQWdCLHFCQUFoQjtBQUNBLHlCQUFJLE9BQU9KLFFBQVAsSUFBbUIsVUFBdkIsRUFBbUNBO0FBQ25DcEQsdUJBQUUsTUFBRixFQUFVeUQsSUFBVixHQUFpQkMsT0FBakIsQ0FBeUIsRUFBRUMsU0FBUyxDQUFYLEVBQXpCLEVBQXlDLEdBQXpDLEVBQThDLFlBQVcsQ0FBRSxDQUEzRDtBQUNILGtCQUpEO0FBS0gsY0FORCxFQU1HLEtBTkg7QUFPSDs7QUFFRDs7QUFwREksV0FzREpDLGFBQWEscUJBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ2xDOUQsZUFBRTZELEtBQUYsRUFBU3BCLElBQVQsQ0FBY3FCLE9BQWQsRUFBdUJwQixFQUF2QixDQUEwQixPQUExQixFQUFtQyxZQUFXO0FBQzFDMUMsbUJBQUU2RCxLQUFGLEVBQVNwQixJQUFULENBQWNxQixPQUFkLEVBQXVCYixXQUF2QixDQUFtQyxRQUFuQztBQUNBakQsbUJBQUUsSUFBRixFQUFRa0QsUUFBUixDQUFpQixRQUFqQjtBQUNILGNBSEQ7QUFJSDs7QUFFRDs7QUE3REksV0ErREphLFlBQVksc0JBQVk7QUFDcEIsaUJBQUlDLFFBQVFoRSxFQUFFLFFBQUYsQ0FBWjtBQUNBLGlCQUFLZ0UsTUFBTS9CLE1BQU4sR0FBZSxDQUFwQixFQUF3QjtBQUNwQixzQkFBSyxJQUFJRCxJQUFFLENBQU4sRUFBU0MsU0FBTytCLE1BQU0vQixNQUEzQixFQUFtQ0QsSUFBRUMsTUFBckMsRUFBNkNELEtBQUcsQ0FBaEQsRUFBb0Q7QUFDaEQsc0JBQUMsVUFBU2lDLENBQVQsRUFBVztBQUNSRCwrQkFBTUUsRUFBTixDQUFTRCxDQUFULEVBQVl4QixJQUFaLENBQWlCLFlBQWpCLEVBQStCQyxFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxZQUFVO0FBQ2pEMUMsK0JBQUUsSUFBRixFQUFRbUUsT0FBUixDQUFnQixRQUFoQixFQUEwQkMsTUFBMUI7QUFDSCwwQkFGRDtBQUdILHNCQUpELEVBSUdwQyxDQUpIO0FBS0g7QUFDSjtBQUNKLFVBMUVHOztBQTRFSnFDLHFCQUFZLHNCQUFVO0FBQ2xCckUsZUFBRSxtQkFBRixFQUF1QnVDLElBQXZCLENBQTRCLFVBQVMrQixJQUFULEVBQWVDLEtBQWYsRUFBcUI7QUFDN0MscUJBQUlDLFNBQVN4RSxFQUFFLElBQUYsRUFBUXlDLElBQVIsQ0FBYSxRQUFiLENBQWI7QUFBQSxxQkFDSWdDLFFBQVF6RSxFQUFFLElBQUYsRUFBUXlDLElBQVIsQ0FBYSxPQUFiLENBRFo7QUFFQStCLHdCQUFPOUIsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBVTtBQUMxQix5QkFBSWdDLE9BQU8xRSxFQUFFLElBQUYsRUFBUTJFLEdBQVIsQ0FBWSxDQUFaLENBQVg7QUFBQSx5QkFDSUMsT0FBT0YsS0FBS0csT0FBTCxDQUFhSCxLQUFLSSxhQUFsQixFQUFpQ0YsSUFENUM7QUFFQUgsMkJBQU1HLElBQU4sQ0FBWUEsSUFBWjtBQUNILGtCQUpELEVBSUdHLE9BSkgsQ0FJVyxRQUpYO0FBS0gsY0FSRDtBQVNIOztBQXRGRztBQW5DVSxFQUF0Qjs7QUFpSUE7OztBQUdBLEVBQUMsVUFBUy9FLENBQVQsRUFBWTtBQUNUOztBQUVBLFNBQUlVLE9BQU9ELEdBQUdDLElBQWQ7QUFBQSxTQUNJZ0IsU0FBU2pCLEdBQUdpQixNQURoQjs7QUFHQSxTQUFJc0QsWUFBWUEsYUFBYSxFQUE3Qjs7QUFFQTtBQUNBLFNBQUlDLFdBQVc7QUFDWDNDLGlCQUFRLEVBREc7O0FBR1g0Qyx5QkFBZ0I7QUFDWkMsd0JBQVcsWUFEQztBQUVaQyxtQkFBTSxJQUZNO0FBR1pDLHlCQUFZLG9CQUhBO0FBSVpDLDZCQUFnQjtBQUpKLFVBSEw7O0FBVVhDLGVBQU0sY0FBU0MsS0FBVCxFQUFnQlgsT0FBaEIsRUFBeUI7QUFDM0Isa0JBQUt2QyxNQUFMLEdBQWNrRCxLQUFkO0FBQ0EsaUJBQUlDLFNBQVUsT0FBT0MsT0FBT0QsTUFBZCxJQUF3QixXQUF6QixHQUF3Q3pGLEVBQUUyRixNQUExQyxHQUFtREQsT0FBT0QsTUFBdkUsQ0FGMkIsQ0FFb0Q7QUFDL0VaLHVCQUFXLE9BQU9BLE9BQVAsSUFBa0IsV0FBbkIsR0FBa0MsS0FBS0ssY0FBdkMsR0FBd0RPLE9BQU8sRUFBUCxFQUFXLEtBQUtQLGNBQWhCLEVBQWdDTCxPQUFoQyxDQUFsRSxDQUgyQixDQUdpRjtBQUM1RyxrQkFBS2UsTUFBTCxDQUFZZixPQUFaO0FBQ0gsVUFmVTs7QUFpQlhlLGlCQUFRLGdCQUFTZixPQUFULEVBQWtCO0FBQ3RCN0UsZUFBRSxLQUFLc0MsTUFBUCxFQUFldUQsSUFBZixDQUFvQixTQUFwQixFQUErQixJQUFJQyxNQUFKLENBQVcsS0FBS3hELE1BQWhCLEVBQXdCdUMsT0FBeEIsQ0FBL0I7QUFDSCxVQW5CVTs7QUFxQlhrQixrQkFBUyxtQkFBVztBQUNoQixvQkFBTy9GLEVBQUUsS0FBS3NDLE1BQVAsRUFBZXVELElBQWYsQ0FBb0IsU0FBcEIsQ0FBUDtBQUNIOztBQXZCVSxNQUFmO0FBMEJBYixlQUFVQyxRQUFWLEdBQXFCQSxRQUFyQjs7QUFFQSxTQUFJZSxZQUFZO0FBQ1oxRCxpQkFBUSxFQURJO0FBRVppRCxlQUFNLGNBQVNqRCxNQUFULEVBQWlCO0FBQ25CLGlCQUFJLE9BQU9BLE1BQVAsSUFBaUIsV0FBckIsRUFDSSxLQUFLQSxNQUFMLEdBQWMsWUFBZCxDQURKLEtBR0ksS0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0osa0JBQUsyRCxLQUFMO0FBQ0gsVUFSVztBQVNaQSxnQkFBTyxpQkFBVztBQUNkakcsZUFBRSxLQUFLc0MsTUFBUCxFQUFlSSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQTNCLEVBQXVDLFlBQVc7QUFDOUMscUJBQUk0QixPQUFPdEUsRUFBRSxJQUFGLEVBQVFtRSxPQUFSLENBQWdCLE9BQWhCLENBQVg7QUFDQSxxQkFBSUcsS0FBSzRCLFFBQUwsQ0FBYyxRQUFkLENBQUosRUFDSTVCLEtBQUtyQixXQUFMLENBQWlCLFFBQWpCLEVBREosS0FHSXFCLEtBQUtwQixRQUFMLENBQWMsUUFBZCxFQUF3QmlELFFBQXhCLENBQWlDLE9BQWpDLEVBQTBDbEQsV0FBMUMsQ0FBc0QsUUFBdEQ7QUFDSmpELG1CQUFFQyxNQUFGLEVBQVVtRyxTQUFWLENBQW9COUIsS0FBSytCLFFBQUwsR0FBZ0JDLEdBQXBDO0FBQ0gsY0FQRDtBQVFIO0FBbEJXLE1BQWhCO0FBb0JBdEIsZUFBVWdCLFNBQVYsR0FBc0JBLFNBQXRCOztBQUVBOztBQUVBL0YsWUFBTytFLFNBQVAsR0FBbUJBLFNBQW5CO0FBRUgsRUEvREQsRUErREdoRixDQS9ESDs7QUFrRUE7QUFDQUEsR0FBRSxZQUFXOztBQUVULFNBQUlVLE9BQU9ELEdBQUdDLElBQWQ7QUFBQSxTQUNJZ0IsU0FBU2pCLEdBQUdpQixNQURoQjtBQUFBLFNBRUlYLFdBQVdMLEtBQUtLLFFBQUwsRUFGZjs7QUFJQVcsWUFBT0MsYUFBUDtBQUNBRCxZQUFPVyxTQUFQOztBQUVBckMsT0FBRSxNQUFGLEVBQVVrRCxRQUFWLENBQW1CLENBQUNuQyxTQUFTSSxLQUFULEVBQUQsRUFBbUJULEtBQUtjLFVBQXhCLEVBQW9DK0UsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBbkI7O0FBRUF2QixlQUFVZ0IsU0FBVixDQUFvQlQsSUFBcEIsQ0FBeUIsWUFBekI7O0FBRUE3RCxZQUFPeUIsZUFBUCxDQUF1QixZQUFXO0FBQzlCO0FBQ0gsTUFGRDs7QUFJQTtBQUNBLFNBQUlxRCxTQUFTekUsSUFBVCxDQUFjMEUsT0FBZCxDQUFzQixNQUF0QixJQUFnQyxDQUFDLENBQXJDLEVBQXdDO0FBQ3BDQyxhQUFJQyxjQUFKO0FBQ0FELGFBQUlFLGFBQUo7QUFDSDtBQUNKLEVBdEJEOztBQXdCQTs7O0FBR0EzRyxRQUFPcUQsY0FBUCxHQUF3QixVQUFTQyxHQUFULEVBQWNILFFBQWQsRUFBd0I7QUFDNUMsU0FBSXlELFNBQVN6RyxTQUFTMEcsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0FELFlBQU9FLEdBQVAsR0FBYXhELEdBQWI7O0FBRUFzRCxZQUFPeEQsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBVztBQUN2QyxhQUFJLE9BQU9ELFFBQVAsSUFBbUIsVUFBdkIsRUFBbUNBLFNBQVN5RCxNQUFUO0FBQ3RDLE1BRkQsRUFFRyxLQUZIO0FBR0gsRUFQRCxDOzs7Ozs7QUNoUEEsMEM7Ozs7Ozs7Ozs7Ozs7S0NBTzNHLEcsR0FBc0JELE07S0FBakIrRyxHLEdBQXlCNUcsUTtLQUFwQjZHLEcsR0FBOEIsa0I7S0FBekJDLEUsR0FBNkMsZTs7O0FBRW5FLEtBQ0NDLE1BQU8sU0FBUEEsR0FBTztBQUFBLFNBQUsvRyxTQUFTZ0gsYUFBVCxDQUF1QkMsQ0FBdkIsQ0FBTDtBQUFBLEVBRFI7QUFBQSxLQUVDQyxTQUFVLFNBQVZBLE1BQVU7QUFBQSxTQUFLbEgsU0FBU3lCLGdCQUFULENBQTBCd0YsQ0FBMUIsQ0FBTDtBQUFBLEVBRlg7QUFBQSxLQUdDRSxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0YsQ0FBRCxFQUFJRyxJQUFKLEVBQWE7QUFDdEIsTUFBSUwsTUFBTS9HLFNBQVMwRyxhQUFULENBQXVCTyxDQUF2QixDQUFWO0FBQ0EsTUFBSyxRQUFPRyxJQUFQLHlDQUFPQSxJQUFQLE1BQWUsUUFBZixJQUEyQjlCLE9BQU8rQixJQUFQLENBQVlELElBQVosRUFBa0J2RixNQUFsQixHQUEyQixDQUEzRCxFQUNDLEtBQU0sSUFBSUQsQ0FBVixJQUFld0YsSUFBZjtBQUNDTCxPQUFJaEYsWUFBSixDQUFpQkgsQ0FBakIsRUFBb0J3RixLQUFLeEYsQ0FBTCxDQUFwQjtBQURELEdBRUQsT0FBT21GLEdBQVA7QUFDQSxFQVRGO0FBQUEsS0FVQ08sVUFBVSxTQUFWQSxPQUFVO0FBQUEsU0FBS3RILFNBQVN1SCxjQUFULENBQXdCTixDQUF4QixDQUFMO0FBQUEsRUFWWDtBQUFBLEtBV0NPLFVBQVUsU0FBVkEsT0FBVSxDQUFDdEQsSUFBRCxFQUFPekIsTUFBUDtBQUFBLFNBQWtCQSxPQUFPZ0YsWUFBUCxDQUFvQnZELElBQXBCLEVBQTBCekIsT0FBT2lGLFVBQVAsQ0FBa0IsQ0FBbEIsQ0FBMUIsQ0FBbEI7QUFBQSxFQVhYO0FBQUEsS0FZQ0MsU0FBVSxTQUFWQSxNQUFVLENBQUN6RCxJQUFELEVBQU96QixNQUFQO0FBQUEsU0FBa0JBLE9BQU9tRixXQUFQLENBQW1CMUQsSUFBbkIsQ0FBbEI7QUFBQSxFQVpYOztBQWNBLEtBQU0yRCxXQUFXLENBQ2hCO0FBQ0NDLFVBQVEsSUFEVDtBQUVDQyxVQUFRLEVBRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sSUFEUjtBQUVDdEcsU0FBTSx5QkFGUDtBQUdDdUcsYUFBVTtBQUhYLEdBRE0sRUFNTjtBQUNDRCxVQUFPLFVBRFI7QUFFQ3RHLFNBQU0sNEJBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQU5NO0FBSFIsRUFEZ0IsRUFpQmhCO0FBQ0NKLFVBQVEsS0FEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sTUFEUjtBQUVDdEcsU0FBTSxzQ0FGUDtBQUdDdUcsYUFBVTtBQUhYLEdBRE07QUFIUixFQWpCZ0IsRUE0QmhCO0FBQ0NKLFVBQVEsS0FEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sb0JBRFI7QUFFQ3RHLFNBQU0sZ0RBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0QsVUFBTyxxQkFEUjtBQUVDdEcsU0FBTSwyREFGUDtBQUdDdUcsYUFBVTtBQUhYLEdBTk0sRUFXTjtBQUNDRCxVQUFPLGNBRFI7QUFFQ3RHLFNBQU0sc0RBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQVhNO0FBSFIsRUE1QmdCLEVBaURoQjtBQUNDSixVQUFRLFFBRFQ7QUFFQ0MsVUFBUSxVQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLFNBRFI7QUFFQ3RHLFNBQU0sK0JBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0QsVUFBTyxjQURSO0FBRUN0RyxTQUFNLG1DQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0FOTSxFQVdOO0FBQ0NELFVBQU8sa0JBRFI7QUFFQ3RHLFNBQU0sZ0RBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQVhNLEVBZ0JOO0FBQ0NELFVBQU8sa0JBRFI7QUFFQ3RHLFNBQU0sK0NBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQWhCTSxFQXFCTjtBQUNDRCxVQUFPLFdBRFI7QUFFQ3RHLFNBQU0sMkNBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQXJCTSxFQTBCTjtBQUNDRCxVQUFPLGdCQURSO0FBRUN0RyxTQUFNLDBDQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0ExQk07QUFIUixFQWpEZ0IsRUFxRmhCO0FBQ0NKLFVBQVEsT0FEVDtBQUVDQyxVQUFRLElBRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sV0FEUjtBQUVDdEcsU0FBTSxtQ0FGUDtBQUdDdUcsYUFBVTtBQUhYLEdBRE0sRUFNTjtBQUNDRCxVQUFPLFVBRFI7QUFFQ3RHLFNBQU0sb0NBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQU5NO0FBSFIsRUFyRmdCLEVBcUdoQjtBQUNDSixVQUFRLE1BRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLE9BRFI7QUFFQ3RHLFNBQU0sNkJBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNO0FBSFIsRUFyR2dCLEVBZ0hoQjtBQUNDSixVQUFRLE9BRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLE1BRFI7QUFFQ3RHLFNBQU0sK0JBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNO0FBSFIsRUFoSGdCLEVBMkhoQjtBQUNDSixVQUFRLE1BRFQ7QUFFQ0MsVUFBUSxNQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLFNBRFI7QUFFQ3RHLFNBQU0sMkJBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNO0FBSFIsRUEzSGdCLEVBc0loQjtBQUNDSixVQUFRLEtBRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLElBRFI7QUFFQ3RHLFNBQU0sMEJBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNO0FBSFIsRUF0SWdCLEVBaUpoQjtBQUNDSixVQUFPLE9BRFI7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLE9BRFI7QUFFQ3RHLFNBQU0sK0JBRlA7QUFHQ3VHLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0QsVUFBTyxXQURSO0FBRUN0RyxTQUFNLHFDQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0FOTSxFQVdOO0FBQ0NELFVBQU8sT0FEUjtBQUVDdEcsU0FBTSxnQ0FGUDtBQUdDdUcsYUFBVTtBQUhYLEdBWE0sRUFnQk47QUFDQ0QsVUFBTyxjQURSO0FBRUN0RyxTQUFNLHlDQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0FoQk0sRUFxQk47QUFDQ0QsVUFBTyxjQURSO0FBRUN0RyxTQUFNLGtDQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0FyQk0sRUEwQk47QUFDQ0QsVUFBTyxNQURSO0FBRUN0RyxTQUFNLDJDQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0ExQk07QUFIUixFQWpKZ0IsRUFxTGhCO0FBQ0NKLFVBQVEsRUFEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sZUFEUjtBQUVDdEcsU0FBTSxtQ0FGUDtBQUdDdUcsYUFBVTtBQUhYLEdBRE0sRUFNTjtBQUNDRCxVQUFPLGdCQURSO0FBRUN0RyxTQUFNLHVDQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0FOTTtBQUhSLEVBckxnQixFQXFNaEI7QUFDQ0osVUFBUSxNQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxNQURSO0FBRUN0RyxTQUFNLG1DQUZQO0FBR0N1RyxhQUFVO0FBSFgsR0FETTtBQUhSLEVBck1nQixDQUFqQjs7QUFtTkEsS0FBSUMsV0FBV04sU0FBU08sTUFBVCxDQUFnQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUFBLE1BQ25DUixNQURtQyxHQUNWUSxDQURVLENBQ25DUixNQURtQztBQUFBLE1BQzNCQyxNQUQyQixHQUNWTyxDQURVLENBQzNCUCxNQUQyQjtBQUFBLE1BQ25CQyxLQURtQixHQUNWTSxDQURVLENBQ25CTixLQURtQjs7QUFFeEMsVUFBVUssS0FBSyxFQUFmLGNBQ0VQLHdCQUFzQkEsTUFBdEIsc0JBREYsY0FFRUMsVUFBVSxFQUFWLEdBQWVBLE1BQWYsa0JBQXFDQSxNQUFyQyxpQkFGRixpQkFHTUMsTUFBTUksTUFBTixDQUFhLFVBQUNHLEVBQUQsRUFBS0MsRUFBTCxFQUFZO0FBQUEsT0FDeEJQLEtBRHdCLEdBQ0NPLEVBREQsQ0FDeEJQLEtBRHdCO0FBQUEsT0FDakJ0RyxJQURpQixHQUNDNkcsRUFERCxDQUNqQjdHLElBRGlCO0FBQUEsT0FDWHVHLFFBRFcsR0FDQ00sRUFERCxDQUNYTixRQURXOztBQUU3QixXQUFVSyxNQUFNLEVBQWhCLG1CQUNJTCxXQUFXLGFBQVgsR0FBMkIsRUFEL0IsbUJBQzhDdkcsSUFEOUMsVUFDdURzRyxLQUR2RDtBQUN3RSxHQUhwRSxFQUdzRSxDQUh0RSxDQUhOO0FBU0EsRUFYYyxFQVdaLENBWFksQ0FBZjs7QUFhQTtBQUNBcEksUUFBT3lHLEdBQVAsR0FBYTtBQUNaRSxpQkFBZSx5QkFBVTtBQUN4QixPQUFJaUMsa0dBQUo7O0FBSUMsT0FBSzdJLEVBQUUscUJBQUYsRUFBeUJpQyxNQUF6QixJQUFtQyxDQUF4QyxFQUEyQztBQUMxQ2pDLE1BQUUsT0FBRixFQUFXNEgsT0FBWCxDQUFtQmlCLFdBQW5CO0FBQ0E7O0FBRUQ3SSxLQUFFLGVBQUYsRUFBbUIwQyxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQzFDLFFBQUk2RixXQUFXdkksRUFBRSxZQUFGLENBQWY7QUFBQSxRQUNJOEksWUFBWSxXQURoQjtBQUFBLFFBRUlDLFlBQVlSLFNBQVNyQyxRQUFULENBQW1CNEMsU0FBbkIsQ0FGaEI7QUFHQSxRQUFJQyxTQUFKLEVBQWU7QUFDZFIsY0FBU1MsR0FBVCxDQUFhaEosRUFBRSxJQUFGLENBQWIsRUFBc0JpRCxXQUF0QixDQUFtQzZGLFNBQW5DO0FBQ0EsS0FGRCxNQUVPO0FBQ05QLGNBQVNTLEdBQVQsQ0FBYWhKLEVBQUUsSUFBRixDQUFiLEVBQXNCa0QsUUFBdEIsQ0FBZ0M0RixTQUFoQztBQUNBO0FBQ0QsSUFURDtBQVVEOztBQUVEO0FBdEJZLElBdUJYbkMsZ0JBQWdCLDBCQUFVOztBQUUxQixPQUFLM0csRUFBRSxPQUFGLEVBQVdpQyxNQUFYLElBQXFCLENBQTFCLEVBQThCO0FBQzdCc0csZUFBV3ZJLEVBQUUsaUJBQUYsRUFBcUIrSCxNQUFyQixDQUE2Qi9ILEVBQUUsc0NBQUYsRUFBMEMrSCxNQUExQyxDQUFrRFEsUUFBbEQsQ0FBN0IsQ0FBWDtBQUNBdkksTUFBRSxPQUFGLEVBQVdpQyxNQUFYLElBQXFCLENBQXJCLEdBQXlCakMsRUFBRSxNQUFGLEVBQVU0SCxPQUFWLENBQW1CVyxRQUFuQixDQUF6QixHQUF5RHZJLEVBQUUsT0FBRixFQUFXNEgsT0FBWCxDQUFvQlcsUUFBcEIsQ0FBekQ7QUFDQTtBQUNEdkksS0FBRSxZQUFGLEVBQWdCeUMsSUFBaEIsQ0FBcUIsR0FBckIsRUFBMEJGLElBQTFCLENBQStCLFlBQVU7QUFDeEMsUUFBSTBHLFFBQVFqSixFQUFFLElBQUYsRUFBUXdILElBQVIsQ0FBYSxNQUFiLENBQVo7QUFDQSxRQUFLeUIsTUFBTXhDLE9BQU4sQ0FBYyxNQUFkLEtBQXlCLENBQUMsQ0FBL0IsRUFBbUM7QUFDbEN6RyxPQUFFLElBQUYsRUFBUXdILElBQVIsQ0FBYSxNQUFiLEVBQXFCeUIsUUFBUSxNQUE3QjtBQUNBO0FBQ0QsSUFMRDtBQU1BLEdBbkNXO0FBb0NYQyxRQUFNLGNBQVM1SSxHQUFULEVBQWE7QUFDbkJBLFNBQU1BLE9BQU8sV0FBYjtBQUNBTixLQUFFLE1BQUYsRUFBVStILE1BQVYsQ0FDQy9ILEVBQUUsc0JBQUYsRUFBMEIrSCxNQUExQixDQUNDL0gsYUFBV00sR0FBWCx1REFERCxDQUREO0FBS0FOLEtBQUUsT0FBRixFQUFXMEMsRUFBWCxDQUFjLE9BQWQsRUFBdUIsUUFBdkIsRUFBaUMsWUFBVTtBQUMxQzFDLE1BQUUsT0FBRixFQUFXb0UsTUFBWDtBQUNBLElBRkQ7QUFHQTtBQTlDVyxFQUFiLEM7Ozs7Ozs7O0FDalBBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQW5FLFFBQU9rSixXQUFQLEdBQXFCLFVBQVNDLE9BQVQsRUFBa0JDLGFBQWxCLEVBQWlDO0FBQ3JELE1BQUssRUFBRSxnQkFBZ0JGLFdBQWxCLENBQUwsRUFBc0MsT0FBTyxJQUFJQSxXQUFKLENBQWdCQyxPQUFoQixFQUF5QkMsYUFBekIsQ0FBUDtBQUN0QyxPQUFLRCxPQUFMLEdBQWlCaEosU0FBU2dILGFBQVQsQ0FBdUJnQyxPQUF2QixDQUFqQjtBQUNBLE9BQUtFLGNBQUwsR0FBc0IsS0FBS0YsT0FBTCxDQUFhaEMsYUFBYixDQUEyQixzQkFBM0IsQ0FBdEIsRUFDQSxLQUFLbUMsS0FBTCxHQUFnQixJQURoQixFQUVBLEtBQUtDLE1BQUwsR0FBZ0J4SixFQUFFb0osT0FBRixFQUFXM0csSUFBWCxDQUFnQixnQkFBaEIsRUFBa0NrQyxHQUFsQyxDQUFzQyxDQUF0QyxDQUZoQjtBQUdBLE9BQUs4RSxPQUFMLEdBQWlCekosRUFBRW9KLE9BQUYsRUFBVzNHLElBQVgsQ0FBZ0IsaUJBQWhCLEVBQW1Da0MsR0FBbkMsQ0FBdUMsQ0FBdkMsQ0FBakI7QUFDQSxPQUFLK0UsUUFBTCxHQUFrQixJQUFsQjtBQUNBLE9BQUtDLE9BQUwsR0FBaUIsQ0FBakI7QUFDQSxPQUFLQyxZQUFMLEdBQXFCLElBQXJCO0FBQ0EsT0FBS0MsTUFBTCxHQUFnQixLQUFLVCxPQUFMLENBQWFoQyxhQUFiLENBQTJCLFNBQTNCLENBQWhCO0FBQ0EsT0FBSzBDLE9BQUwsR0FBaUIsS0FBS1YsT0FBTCxDQUFhaEMsYUFBYixDQUEyQixVQUEzQixDQUFqQjtBQUNBLE9BQUsyQyxFQUFMLEdBQWEsS0FBS0QsT0FBTCxDQUFhMUMsYUFBYixDQUEyQixLQUEzQixDQUFiO0FBQ0EsT0FBSzRDLE9BQUwsR0FBaUIsS0FBS0YsT0FBTCxDQUFhMUMsYUFBYixDQUEyQixhQUEzQixDQUFqQjtBQUNBLE9BQUs2QyxRQUFMLEdBQWtCLEtBQUtILE9BQUwsQ0FBYTFDLGFBQWIsQ0FBMkIsY0FBM0IsQ0FBbEI7QUFDQSxPQUFLOEMsU0FBTCxHQUFtQixLQUFLSixPQUFMLENBQWExQyxhQUFiLENBQTJCLGVBQTNCLENBQW5CO0FBQ0EsT0FBSytDLFFBQUwsR0FBa0IsS0FBS0wsT0FBTCxDQUFhMUMsYUFBYixDQUEyQixXQUEzQixDQUFsQjtBQUNBLE9BQUtnRCxPQUFMLEdBQWlCLEtBQUtOLE9BQUwsQ0FBYTFDLGFBQWIsQ0FBMkIsT0FBM0IsQ0FBakI7QUFDQSxPQUFLaUQsU0FBTCxHQUFtQixLQUFLRixRQUFMLENBQWMvQyxhQUFkLENBQTRCLFVBQTVCLENBQW5CO0FBQ0EsT0FBS2tELE9BQUwsR0FBaUIsS0FBS0gsUUFBTCxDQUFjL0MsYUFBZCxDQUE0QixNQUE1QixDQUFqQjtBQUNBLE9BQUttRCxPQUFMLEdBQWlCLEtBQUtULE9BQUwsQ0FBYTFDLGFBQWIsQ0FBMkIsVUFBM0IsQ0FBakI7QUFDQSxPQUFLb0QsUUFBTCxHQUFrQnhLLEVBQUUsS0FBSzhKLE9BQVAsRUFBZ0JySCxJQUFoQixDQUFxQixZQUFyQixDQUFsQjtBQUNBLE9BQUtnSSxTQUFMLEdBQW1CLEtBQUtELFFBQUwsQ0FBYy9ILElBQWQsQ0FBbUIsZUFBbkIsQ0FBbkI7QUFDQSxPQUFLaUksYUFBTCxHQUFzQixPQUF0QjtBQUNBLE9BQUtyQixhQUFMLEdBQXFCLE9BQU9BLGFBQVAsSUFBd0IsVUFBeEIsR0FBcUNBLGFBQXJDLEdBQXFELFlBQVc7QUFDcEY5SSxXQUFRb0ssSUFBUixDQUFhLHVDQUFiO0FBQ0EsR0FGRDs7QUFJQSxPQUFLQyxZQUFMO0FBQ0EsT0FBS0MsS0FBTDtBQUNBdEssVUFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0EsRUEvQkQ7O0FBaUNBMkksYUFBWTJCLFNBQVosQ0FBc0JELEtBQXRCLEdBQThCLFlBQVc7QUFDeEMsTUFBSW5HLE9BQU8sSUFBWDs7QUFFQW5FLFVBQVFDLEdBQVIsQ0FBWSxNQUFaOztBQUVBa0UsT0FBS3FHLFFBQUwsQ0FBZXJHLEtBQUs0RSxjQUFwQixFQUFvQyxRQUFwQzs7QUFFQTVFLE9BQUtzRixPQUFMLENBQWEzRyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxZQUFXO0FBQ2pEcUIsUUFBS3NHLEtBQUw7QUFDQSxHQUZELEVBRUcsS0FGSDtBQUdBLEVBVkQ7O0FBWUE3QixhQUFZMkIsU0FBWixDQUFzQkUsS0FBdEIsR0FBOEIsWUFBVTtBQUN2QyxNQUFJdEcsT0FBTyxJQUFYO0FBQUEsTUFDQ3VHLElBQUksSUFETDs7QUFHQXZHLE9BQUtxRyxRQUFMLENBQWVyRyxLQUFLNEUsY0FBcEIsRUFBb0MsUUFBcEM7O0FBRUEsTUFBSzVFLEtBQUtnRixRQUFWLEVBQXFCO0FBQ3BCaEYsUUFBS2dGLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQTFKLEtBQUUwRSxLQUFLb0YsT0FBUCxFQUFnQm9CLElBQWhCO0FBQ0EsT0FBS3hHLEtBQUs2RSxLQUFMLElBQWMsSUFBbkIsRUFBMEI3RSxLQUFLeUcsZ0JBQUw7O0FBRTFCRixPQUFJdkcsS0FBSzZFLEtBQVQ7O0FBRUFoSixXQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQnlLLEVBQUVHLFlBQTdCLEVBQTJDSCxFQUFFSSxVQUE3Qzs7QUFFQTNHLFFBQUs0RyxPQUFMO0FBQ0E1RyxRQUFLNkcsUUFBTDtBQUNBN0csUUFBSzhHLGFBQUw7QUFDQTlHLFFBQUsrRyxNQUFMO0FBQ0EvRyxRQUFLZ0gsZUFBTDtBQUNBaEgsUUFBS2lILE1BQUw7QUFDQWpILFFBQUtrSCxXQUFMO0FBQ0FsSCxRQUFLbUgsWUFBTDtBQUNBbkgsUUFBS29ILFNBQUw7QUFDQSxPQUFLcEgsS0FBSzZFLEtBQUwsQ0FBV3dDLHdCQUFoQixFQUEyQztBQUMxQ3JILFNBQUs2RSxLQUFMLENBQVd3Qyx3QkFBWCxHQUFzQyxZQUFVO0FBQy9DeEwsYUFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxLQUZEO0FBR0E7O0FBRURKLFlBQVNpRCxnQkFBVCxDQUEwQix1QkFBMUIsRUFBbUQsWUFBVTtBQUM1RDlDLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBLElBRkQsRUFFRyxLQUZIOztBQUlBSixZQUFTaUQsZ0JBQVQsQ0FBMEIscUJBQTFCLEVBQWlELFlBQVU7QUFDMUQ5QyxZQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxJQUZELEVBRUcsS0FGSDs7QUFJQXlLLEtBQUVlLE1BQUYsR0FBVyxZQUFVO0FBQ3BCekwsWUFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0J5SyxFQUFFRyxZQUF4QjtBQUNBLElBRkQ7QUFHQUgsS0FBRWdCLFdBQUYsR0FBZ0IsWUFBVTtBQUN6QjtBQUNBLElBRkQ7QUFHQWhCLEtBQUVpQixZQUFGLEdBQWlCLFlBQVU7QUFDMUIzTCxZQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQnlLLEVBQUVHLFlBQTVCO0FBQ0EsSUFGRDtBQUdBSCxLQUFFa0IsZ0JBQUYsR0FBcUIsWUFBVTtBQUM5QjVMLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ3lLLEVBQUVHLFlBQWxDO0FBQ0EsSUFGRDtBQUdBO0FBQ0QxRyxPQUFLMEgsU0FBTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLEVBL0ZEOztBQWlHQWpELGFBQVkyQixTQUFaLENBQXNCUSxPQUF0QixHQUFnQyxZQUFVO0FBQ3pDLE1BQUk1RyxPQUFPLElBQVg7O0FBRUFBLE9BQUs2RSxLQUFMLENBQVc4QyxNQUFYLEdBQW9CLFlBQVc7QUFDOUJyTSxLQUFFMEUsS0FBS21GLE1BQVAsRUFBZXFCLElBQWY7QUFDQWxMLEtBQUUwRSxLQUFLdUYsUUFBUCxFQUFpQnFDLElBQWpCO0FBQ0F0TSxLQUFFMEUsS0FBS3NGLE9BQVAsRUFBZ0JrQixJQUFoQjtBQUNBLE9BQUssS0FBS3FCLFdBQUwsSUFBb0IsQ0FBekIsRUFBNkI3SCxLQUFLOEgsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDN0I5SCxRQUFLZ0csYUFBTCxHQUFxQixNQUFyQjtBQUNBbkssV0FBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JrRSxLQUFLZ0csYUFBM0I7QUFDQSxHQVBEOztBQVNBaEcsT0FBSzZFLEtBQUwsQ0FBV2tELFNBQVgsR0FBdUIsWUFBVTtBQUNoQy9ILFFBQUtnSSxXQUFMLENBQWlCaEksS0FBSzRFLGNBQXRCLEVBQXNDLFFBQXRDO0FBQ0EsR0FGRDtBQUdBLEVBZkQ7O0FBaUJBSCxhQUFZMkIsU0FBWixDQUFzQlMsUUFBdEIsR0FBaUMsWUFBVTtBQUMxQyxNQUFJN0csT0FBTyxJQUFYO0FBQUEsTUFDQ3VHLElBQUl2RyxLQUFLNkUsS0FEVjtBQUVBN0UsT0FBSzZFLEtBQUwsQ0FBV29ELE9BQVgsR0FBcUIsWUFBVztBQUMvQjNNLEtBQUUwRSxLQUFLb0YsT0FBUCxFQUFnQndDLElBQWhCO0FBQ0F0TSxLQUFFMEUsS0FBS3VGLFFBQVAsRUFBaUJpQixJQUFqQjtBQUNBbEwsS0FBRTBFLEtBQUtzRixPQUFQLEVBQWdCc0MsSUFBaEI7QUFDQSxPQUFJLEtBQUtDLFdBQUwsR0FBbUIsQ0FBdkIsRUFBMEI3SCxLQUFLOEYsUUFBTCxDQUFjVSxJQUFkO0FBQzFCeEcsUUFBSzhILGdCQUFMLENBQXNCLEtBQXRCO0FBQ0EsT0FBS3ZCLEVBQUUyQixLQUFQLEVBQWU7QUFDZCxRQUFLM0IsRUFBRTRCLGNBQVAsRUFBd0I1QixFQUFFNEIsY0FBRixHQUF4QixLQUNLLElBQUs1QixFQUFFNkIsb0JBQVAsRUFBOEI3QixFQUFFNkIsb0JBQUY7QUFDbkMsUUFBSyxLQUFLRixLQUFWLEVBQWtCO0FBQ2pCLFNBQUszQixFQUFFOEIsMEJBQVAsRUFBb0M7QUFDbkNDLGlCQUFXLFlBQVU7QUFDcEJ0SSxZQUFLMkUsYUFBTDtBQUNBLE9BRkQsRUFFRyxHQUZIO0FBR0EsTUFKRCxNQUlPO0FBQ04zRSxXQUFLMkUsYUFBTDtBQUNBO0FBQ0Q7QUFDRDtBQUNELEdBbkJEO0FBb0JBLEVBdkJEOztBQXlCQUYsYUFBWTJCLFNBQVosQ0FBc0JtQyxRQUF0QixHQUFpQyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQjtBQUNsRCxNQUFJMUksT0FBTyxJQUFYO0FBQ0EsTUFBSTdCLFNBQVMsQ0FBYjtBQUNBQSxXQUFTd0ssS0FBS0MsS0FBTCxDQUFZSCxJQUFJQyxDQUFMLEdBQVVGLENBQXJCLENBQVQ7QUFDQSxTQUFPckssTUFBUDtBQUNBLEVBTEQ7O0FBT0FzRyxhQUFZMkIsU0FBWixDQUFzQnlDLFdBQXRCLEdBQW9DLFlBQVc7QUFDOUNoTixVQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBLE1BQUlrRSxPQUFPLElBQVg7QUFDQSxNQUFJNkUsUUFBUXZKLEVBQUUwRSxLQUFLMEUsT0FBUCxFQUFnQjNHLElBQWhCLENBQXFCLGVBQXJCLEVBQXNDeUIsRUFBdEMsQ0FBeUMsQ0FBekMsRUFBNENTLEdBQTVDLENBQWdELENBQWhELENBQVo7QUFDQSxNQUFJNkksUUFBUUMsWUFBWSxZQUFXO0FBQ2xDbE4sV0FBUUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDLGlCQUFpQitJLE1BQU04QixVQUEvRDtBQUNBLE9BQUk5QixNQUFNOEIsVUFBTixHQUFtQixDQUF2QixFQUEwQjtBQUN6QjlLLFlBQVFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBa0UsU0FBS2dJLFdBQUwsQ0FBa0JoSSxLQUFLNEUsY0FBdkIsRUFBdUMsUUFBdkM7QUFDQSxRQUFJb0UsV0FBV0wsS0FBS0MsS0FBTCxDQUFXL0QsTUFBTW1FLFFBQWpCLENBQWY7QUFBQSxRQUNDckcsSUFBSSxFQURMO0FBQUEsUUFFQ3NHLElBQUksRUFGTDtBQUdBdEcsUUFBSSxDQUFDcUcsV0FBVyxFQUFaLEVBQWdCRSxRQUFoQixFQUFKLEVBQ0FELElBQUksQ0FBQyxDQUFDRCxXQUFXckcsQ0FBWixJQUFpQixFQUFsQixFQUFzQnVHLFFBQXRCLEVBREo7QUFFQXZHLFFBQUlBLEVBQUVwRixNQUFGLEdBQVcsQ0FBWCxHQUFlLElBQUlvRixDQUFuQixHQUF1QkEsQ0FBM0I7QUFDQXNHLFFBQUlBLEVBQUUxTCxNQUFGLEdBQVcsQ0FBWCxHQUFlLElBQUkwTCxDQUFuQixHQUF1QkEsQ0FBM0I7QUFDQWpKLFNBQUt3RixTQUFMLENBQWUyRCxTQUFmLEdBQTJCRixJQUFJLEdBQUosR0FBVXRHLENBQXJDO0FBQ0EzQyxTQUFLNEYsT0FBTCxDQUFhdUQsU0FBYixHQUF5QkYsSUFBSSxHQUFKLEdBQVV0RyxDQUFuQztBQUNBeUcsa0JBQWNOLEtBQWQ7QUFDQTtBQUNBO0FBQ0QsR0FqQlcsRUFpQlQsR0FqQlMsQ0FBWjtBQWtCQSxFQXRCRDs7QUF3QkFyRSxhQUFZMkIsU0FBWixDQUFzQmlELE1BQXRCLEdBQStCLFVBQVVDLFNBQVYsRUFBc0I7QUFDcEQ7QUFDQSxFQUZEOztBQUlBN0UsYUFBWTJCLFNBQVosQ0FBc0JtRCxZQUF0QixHQUFxQyxVQUFTaEQsQ0FBVCxFQUFXO0FBQy9DLE1BQUl2RyxPQUFPLElBQVg7QUFBQSxNQUNDMEUsVUFBVTFFLEtBQUswRSxPQURoQjtBQUVBQSxVQUFROEUsS0FBUixDQUFjQyxNQUFkLEdBQXVCekosS0FBS3VJLFFBQUwsQ0FBY2hDLEVBQUVtRCxVQUFoQixFQUE0Qm5ELEVBQUVvRCxXQUE5QixFQUEyQ3BELEVBQUVsSSxXQUE3QyxJQUE0RCxJQUFuRjtBQUNBLEVBSkQ7O0FBTUFvRyxhQUFZMkIsU0FBWixDQUFzQlUsYUFBdEIsR0FBc0MsWUFBVztBQUMvQyxNQUFJOUcsT0FBTyxJQUFYO0FBQ0FBLE9BQUs2RSxLQUFMLENBQVcrRSxZQUFYLEdBQTBCLFlBQVU7QUFDckMsT0FBSzVKLEtBQUs2RSxLQUFMLENBQVdnRixNQUFoQixFQUF5QjtBQUN6QjdKLFFBQUs4SixjQUFMLENBQW9CLE1BQXBCO0FBQ0UsR0FIRDtBQUlELEVBTkQ7O0FBUUFyRixhQUFZMkIsU0FBWixDQUFzQlcsTUFBdEIsR0FBK0IsWUFBVTtBQUN2QyxNQUFJL0csT0FBTyxJQUFYO0FBQ0ExRSxJQUFFMEUsS0FBSzZFLEtBQVAsRUFBYzdHLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUN0Q2dDLFFBQUs4RixRQUFMLENBQWNVLElBQWQ7QUFDQWxMLEtBQUUwRSxLQUFLeUYsUUFBUCxFQUFpQm1DLElBQWpCO0FBQ0F0TSxLQUFFMEUsS0FBS29GLE9BQVAsRUFBZ0I1RyxRQUFoQixDQUF5QixhQUF6QixFQUF3Q29KLElBQXhDO0FBQ0E1SCxRQUFLOEgsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDRSxHQUxEO0FBTUQsRUFSRDs7QUFVQXJELGFBQVkyQixTQUFaLENBQXNCYSxNQUF0QixHQUErQixZQUFXO0FBQ3hDLE1BQUlqSCxPQUFPLElBQVg7QUFDQTFFLElBQUUwRSxLQUFLdUYsUUFBUCxFQUFpQnZILEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFlBQVc7QUFDekNnQyxRQUFLaUYsT0FBTCxHQUFlakYsS0FBSzZFLEtBQUwsQ0FBV2dELFdBQTFCO0FBQ0E3SCxRQUFLMEgsU0FBTDtBQUNBcE0sS0FBRTBFLEtBQUtzRixPQUFQLEVBQWdCc0MsSUFBaEI7QUFDQXRNLEtBQUUsSUFBRixFQUFRa0wsSUFBUjtBQUNBeEcsUUFBS2dHLGFBQUwsR0FBcUIsT0FBckI7QUFDQW5LLFdBQVFDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCa0UsS0FBS2dHLGFBQWpDO0FBQ0UsR0FQRDtBQVFELEVBVkQ7O0FBWUF2QixhQUFZMkIsU0FBWixDQUFzQmdCLFNBQXRCLEdBQWtDLFlBQVc7QUFDM0MsTUFBSXBILE9BQU8sSUFBWDtBQUNBMUUsSUFBRTBFLEtBQUtxRixFQUFQLEVBQVdySCxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQ25DMUMsS0FBRTBFLEtBQUtvRixPQUFQLEVBQWdCb0IsSUFBaEI7QUFDQXhHLFFBQUs4SCxnQkFBTCxDQUFzQixLQUF0QjtBQUNFLEdBSEQ7QUFJRCxFQU5EOztBQVFBckQsYUFBWTJCLFNBQVosQ0FBc0JlLFlBQXRCLEdBQXFDLFlBQVc7QUFDOUMsTUFBSW5ILE9BQU8sSUFBWDtBQUNBMUUsSUFBRTBFLEtBQUtvRixPQUFQLEVBQWdCcEgsRUFBaEIsQ0FBbUI7QUFDcEIsMEJBQXVCLDhCQUFXO0FBQ2pDO0FBQ0EsSUFIbUI7QUFJcEIsbUNBQWdDLHNDQUFXO0FBQ3pDO0FBQ0Q7QUFObUIsR0FBbkI7QUFRRCxFQVZEOztBQVlBeUcsYUFBWTJCLFNBQVosQ0FBc0JjLFdBQXRCLEdBQW9DLFlBQVc7QUFDOUMsTUFBSWxILE9BQU8sSUFBWDtBQUFBLE1BQ0N1RyxJQUFJdkcsS0FBSzZFLEtBRFY7QUFFQ2hKLFVBQVFrTyxHQUFSLENBQVl4RCxDQUFaO0FBQ0FqTCxJQUFFMEUsS0FBSzBFLE9BQUwsQ0FBYWhDLGFBQWIsQ0FBMkIsVUFBM0IsQ0FBRixFQUEwQ3NILE1BQTFDLENBQWlEO0FBQ2xEQyxVQUFPLEtBRDJDO0FBRWxEO0FBQ0FDLFVBQU8sZUFBV0MsS0FBWCxFQUFrQnBPLEVBQWxCLEVBQXVCO0FBQzdCRixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JrRSxLQUFLZ0csYUFBcEM7QUFDQU8sTUFBRTZELEtBQUY7QUFDQSxJQU5pRDtBQU9sREMsVUFBTyxlQUFVRixLQUFWLEVBQWlCcE8sRUFBakIsRUFBc0I7QUFDNUJpRSxTQUFLOEosY0FBTDtBQUNBLElBVGlEO0FBVWxEUSxXQUFRLGdCQUFTSCxLQUFULEVBQWdCcE8sRUFBaEIsRUFBb0IsQ0FDM0IsQ0FYaUQ7QUFZbERnRCxTQUFNLGNBQVNvTCxLQUFULEVBQWdCcE8sRUFBaEIsRUFBb0I7QUFDekJGLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QmtFLEtBQUtnRyxhQUFuQztBQUNBaEcsU0FBSzhILGdCQUFMLENBQXNCLElBQXRCO0FBQ0E5SCxTQUFLdUssaUJBQUwsQ0FBdUJ4TyxFQUF2QjtBQUNBLFFBQUtpRSxLQUFLZ0csYUFBTCxJQUFzQixNQUEzQixFQUFvQztBQUNuQ08sT0FBRWlFLElBQUY7QUFDQSxLQUZELE1BRU87QUFDTmpFLE9BQUU2RCxLQUFGO0FBQ0E7QUFDRDtBQXJCaUQsR0FBakQ7QUF1QkQsRUEzQkQ7O0FBNkJBM0YsYUFBWTJCLFNBQVosQ0FBc0JZLGVBQXRCLEdBQXdDLFlBQVU7QUFDaEQsTUFBSWhILE9BQU8sSUFBWDtBQUFBLE1BQ0N1RyxJQUFJdkcsS0FBSzZFLEtBRFY7QUFFQXZKLElBQUUwRSxLQUFLMEYsT0FBUCxFQUFnQjFILEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVU7QUFDdkMsT0FBS2pDLEdBQUdDLElBQUgsQ0FBUUssUUFBUixHQUFtQk8sR0FBeEIsRUFBOEI7QUFDNUIsUUFBSyxPQUFPMkosRUFBRWtFLGlCQUFULEtBQStCLFdBQS9CLElBQThDbEUsRUFBRWtFLGlCQUFGLElBQXVCLElBQTFFLEVBQ0RsRSxFQUFFa0UsaUJBQUYsR0FBc0IsS0FBdEI7QUFDQyxRQUFLLE9BQU9sRSxFQUFFbUUsV0FBVCxLQUF5QixXQUF6QixJQUF3Q25FLEVBQUVvRSxXQUFGLElBQWlCLElBQTlELEVBQ0RwRSxFQUFFbUUsV0FBRixHQUFnQixJQUFoQixDQURDLEtBRUssSUFBSyxPQUFPbkUsRUFBRWtFLGlCQUFULEtBQStCLFdBQS9CLElBQThDbEUsRUFBRXFFLGlCQUFGLElBQXVCLElBQTFFLEVBQ05yRSxFQUFFa0UsaUJBQUYsR0FBc0IsSUFBdEI7QUFDQTtBQUNELE9BQUlsRSxFQUFFc0UsaUJBQU4sRUFDRXRFLEVBQUVzRSxpQkFBRixHQURGLEtBRUssSUFBSXRFLEVBQUV1RSx1QkFBTixFQUNIdkUsRUFBRXVFLHVCQUFGLEdBREcsS0FFQSxJQUFLdkUsRUFBRXdFLHFCQUFQLEVBQ0h4RSxFQUFFd0UscUJBQUY7QUFDQSxHQWZEO0FBZ0JELEVBbkJEOztBQXFCQXRHLGFBQVkyQixTQUFaLENBQXNCSyxnQkFBdEIsR0FBeUMsWUFBVztBQUNuRCxNQUFJekcsT0FBTyxJQUFYO0FBQUEsTUFDQzhGLFdBQVcsS0FBS0EsUUFEakI7QUFBQSxNQUVDaEIsU0FBUyxLQUFLQSxNQUZmO0FBQUEsTUFHQ0MsVUFBVSxLQUFLQSxPQUhoQjtBQUlBLE1BQUllLFNBQVMvSCxJQUFULENBQWMsZUFBZCxFQUErQnlELFFBQS9CLENBQXdDLEtBQXhDLENBQUosRUFBb0Q7QUFDbkRsRyxLQUFFd0osTUFBRixFQUFVOEMsSUFBVixHQUFpQm9ELEdBQWpCLENBQXFCLEVBQUUvTCxTQUFTLENBQVgsRUFBckIsRUFBcUM2RCxJQUFyQyxDQUEwQyxXQUExQyxFQUF1RCxNQUF2RDtBQUNBeEgsS0FBRXlKLE9BQUYsRUFBV2lHLEdBQVgsQ0FBZSxFQUFFL0wsU0FBUyxDQUFYLEVBQWYsRUFBK0J1SCxJQUEvQixHQUFzQzFELElBQXRDLENBQTJDLFdBQTNDLEVBQXdELE9BQXhEO0FBQ0F4SCxLQUFFMEUsS0FBSzhFLE1BQVAsRUFBZWhDLElBQWYsQ0FBb0IsS0FBcEIsRUFBMkJ4SCxFQUFFMEUsS0FBSzhFLE1BQVAsRUFBZTNELElBQWYsQ0FBb0IsS0FBcEIsQ0FBM0I7QUFDQW5CLFFBQUs2RSxLQUFMLEdBQWF2SixFQUFFd0osTUFBRixFQUFVN0UsR0FBVixDQUFjLENBQWQsQ0FBYjtBQUNBLEdBTEQsTUFLTztBQUNOM0UsS0FBRXdKLE1BQUYsRUFBVWtHLEdBQVYsQ0FBYyxFQUFFL0wsU0FBUyxDQUFYLEVBQWQsRUFBOEJ1SCxJQUE5QixHQUFxQzFELElBQXJDLENBQTBDLFdBQTFDLEVBQXVELE9BQXZEO0FBQ0F4SCxLQUFFeUosT0FBRixFQUFXNkMsSUFBWCxHQUFrQm9ELEdBQWxCLENBQXNCLEVBQUUvTCxTQUFTLENBQVgsRUFBdEIsRUFBc0M2RCxJQUF0QyxDQUEyQyxXQUEzQyxFQUF3RCxNQUF4RDtBQUNBeEgsS0FBRTBFLEtBQUsrRSxPQUFQLEVBQWdCakMsSUFBaEIsQ0FBcUIsS0FBckIsRUFBNEJ4SCxFQUFFMEUsS0FBSytFLE9BQVAsRUFBZ0I1RCxJQUFoQixDQUFxQixLQUFyQixDQUE1QjtBQUNBbkIsUUFBSzZFLEtBQUwsR0FBYXZKLEVBQUV5SixPQUFGLEVBQVc5RSxHQUFYLENBQWUsQ0FBZixDQUFiO0FBQ0E7QUFDREQsT0FBSzZFLEtBQUwsQ0FBV29HLElBQVg7QUFDQTtBQUNBLEVBbEJEOztBQW9CQXhHLGFBQVkyQixTQUFaLENBQXNCOEUsU0FBdEIsR0FBa0MsVUFBVzNFLENBQVgsRUFBZTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBWEQ7O0FBYUE5QixhQUFZMkIsU0FBWixDQUFzQm1FLGlCQUF0QixHQUEwQyxVQUFTeE8sRUFBVCxFQUFhO0FBQ3JELE1BQUlpRSxPQUFPLElBQVg7QUFDRCxNQUFJdUcsSUFBSXZHLEtBQUs2RSxLQUFiO0FBQ0EwQixJQUFFc0IsV0FBRixHQUFnQnNELFNBQVM1RSxFQUFFeUMsUUFBRixJQUFjak4sR0FBRzhELEtBQUgsR0FBVyxHQUF6QixDQUFULEVBQXdDLEVBQXhDLENBQWhCO0FBQ0FHLE9BQUs4SCxnQkFBTCxDQUFzQixLQUF0QjtBQUNBLEVBTEQ7O0FBT0FyRCxhQUFZMkIsU0FBWixDQUFzQjBELGNBQXRCLEdBQXVDLFVBQVVzQixJQUFWLEVBQWdCO0FBQ3RELE1BQUlwTCxPQUFPLElBQVg7QUFBQSxNQUNBNkUsUUFBUTdFLEtBQUs2RSxLQURiO0FBRUEsTUFBSWxDLENBQUo7QUFBQSxNQUFPc0csQ0FBUDtBQUFBLE1BQVVvQyxLQUFLMUMsS0FBS0MsS0FBTCxDQUFXL0QsTUFBTWdELFdBQWpCLENBQWY7QUFBQSxNQUE4Q3lELE1BQU0zQyxLQUFLQyxLQUFMLENBQVcvRCxNQUFNbUUsUUFBakIsQ0FBcEQ7QUFDQSxNQUFLcUMsS0FBSyxFQUFWLEVBQWU7QUFDZHBDLE9BQUksSUFBSjtBQUNBdEcsT0FBSTBJLEdBQUduQyxRQUFILEdBQWMzTCxNQUFkLEdBQXVCLENBQXZCLEdBQTJCLE1BQU04TixHQUFHbkMsUUFBSCxFQUFqQyxHQUFpRG1DLEVBQXJEO0FBQ0EsR0FIRCxNQUdPO0FBQ04xSSxPQUFJd0ksU0FBVUUsS0FBSyxFQUFmLENBQUosRUFDQXBDLElBQUlrQyxTQUFVLENBQUNFLEtBQUsxSSxDQUFOLElBQVcsRUFBckIsQ0FESjtBQUVBQSxPQUFJQSxFQUFFdUcsUUFBRixHQUFhM0wsTUFBYixHQUFzQixDQUF0QixHQUEwQixNQUFNb0YsQ0FBaEMsR0FBb0NBLENBQXhDO0FBQ0FzRyxPQUFJQSxFQUFFQyxRQUFGLEdBQWEzTCxNQUFiLEdBQXNCLENBQXRCLEdBQTBCLE1BQU0wTCxDQUFoQyxHQUFvQ0EsQ0FBeEM7QUFDQTtBQUNEakosT0FBSzJGLFNBQUwsQ0FBZXdELFNBQWYsR0FBMkJGLElBQUksR0FBSixHQUFVdEcsQ0FBckM7QUFDQSxNQUFLeUksUUFBUSxNQUFiLEVBQXNCO0FBQ3JCOVAsS0FBRSxVQUFGLEVBQWMwTyxNQUFkLENBQXFCO0FBQ3BCbkssV0FBT3NMLFNBQVcsTUFBTUcsR0FBUCxHQUFjRCxFQUF4QjtBQURhLElBQXJCO0FBR0E7QUFDRCxFQW5CRDs7QUFxQkE1RyxhQUFZMkIsU0FBWixDQUFzQjBCLGdCQUF0QixHQUF5QyxVQUFTeUQsSUFBVCxFQUFjO0FBQ3JELE1BQUl2TCxPQUFPLElBQVg7QUFDQSxNQUFJdUwsSUFBSixFQUFVO0FBQ1h2TCxRQUFLa0YsWUFBTCxHQUFvQm9ELFdBQVcsWUFBVztBQUN4Q2hOLE1BQUUwRSxLQUFLb0YsT0FBUCxFQUFnQm9CLElBQWhCO0FBQ0QsSUFGbUIsRUFFakIsSUFGaUIsQ0FBcEI7QUFHRSxHQUpELE1BSU87QUFDUmdGLGdCQUFheEwsS0FBS2tGLFlBQWxCO0FBQ0U7QUFDRixFQVREOztBQVdBVCxhQUFZMkIsU0FBWixDQUFzQnNCLFNBQXRCLEdBQWtDLFlBQVc7QUFDNUMsTUFBSTFILE9BQVEsSUFBWjtBQUFBLE1BQ0N1RyxJQUFNdkcsS0FBSzZFLEtBRFo7O0FBR0EsTUFBSzBCLEVBQUVzRCxNQUFQLEVBQWdCO0FBQ2Z0RCxLQUFFaUUsSUFBRjtBQUNBLEdBRkQsTUFFTztBQUNOakUsS0FBRTZELEtBQUY7QUFDQTtBQUNELEVBVEQ7O0FBV0EzRixhQUFZMkIsU0FBWixDQUFzQkYsWUFBdEIsR0FBcUMsWUFBVztBQUMvQyxNQUFJbEcsT0FBTyxJQUFYO0FBQUEsTUFDQ3FGLEtBQUssRUFETjtBQUFBLE1BRUNvRyxLQUFLekwsS0FBS21GLE1BQUwsQ0FBWXpDLGFBQVosQ0FBMEIsTUFBMUIsQ0FGTjtBQUFBLE1BR0NMLE1BQU0sRUFIUDtBQUlBZ0QsT0FBS29HLEdBQUdDLE9BQUgsQ0FBV3JHLEVBQWhCOztBQUVBLE1BQUlzRyxZQUFZalEsU0FBUzBHLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQXVKLFlBQVVDLEVBQVYsR0FBZSxhQUFmO0FBQ0E1TCxPQUFLbUYsTUFBTCxDQUFZN0IsV0FBWixDQUF5QnFJLFNBQXpCO0FBQ0EzTCxPQUFLNkksV0FBTDtBQUNBakssaUJBQWV5RyxFQUFmLEVBQW1CLFlBQVk7QUFDOUIsT0FBS3JGLEtBQUs0RSxjQUFWLEVBQTJCO0FBQzFCNUUsU0FBS2dJLFdBQUwsQ0FBa0JoSSxLQUFLNEUsY0FBdkIsRUFBdUMsUUFBdkM7QUFDQTVFLFNBQUtvRixPQUFMLENBQWFvRSxLQUFiLENBQW1CdkssT0FBbkIsR0FBNkIsQ0FBN0I7QUFDQTtBQUNELE9BQUk0TSxTQUFTblEsU0FBU29RLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBYjtBQUFBLE9BQ0NDLFVBQVVGLE9BQU9HLFVBQVAsQ0FBa0IsSUFBbEIsQ0FEWDtBQUFBLE9BRUNuTixNQUFNLElBQUlvTixLQUFKLEVBRlA7QUFBQSxPQUdDQyxPQUFPLENBSFI7QUFBQSxPQUlDQyxPQUFPLENBSlI7QUFBQSxPQUtDckQsS0FMRDtBQU1BakssT0FBSXdELEdBQUosR0FBVWdELEVBQVY7QUFDQTBHLFdBQVFLLFdBQVIsR0FBc0IsQ0FBdEI7O0FBRUFQLFVBQU9yQyxLQUFQLENBQWE2QyxLQUFiLEdBQXFCLE1BQXJCO0FBQ0FSLFVBQU9yQyxLQUFQLENBQWFDLE1BQWIsR0FBc0IsTUFBdEI7QUFDQTs7QUFFQXlDLFVBQU9sTSxLQUFLMEUsT0FBTCxDQUFhckcsV0FBcEIsRUFDQThOLE9BQU9uTSxLQUFLdUksUUFBTCxDQUFjMUosSUFBSXlOLFlBQWxCLEVBQWdDek4sSUFBSTBOLGFBQXBDLEVBQW1ETCxJQUFuRCxDQURQO0FBRUFwRCxXQUFRQyxZQUFZLFlBQVU7QUFDN0IsUUFBTWdELFFBQVFLLFdBQVQsQ0FBc0JJLE9BQXRCLENBQThCLENBQTlCLElBQW1DLENBQXhDLEVBQTRDO0FBQzNDTixhQUFRLENBQVI7QUFDQUMsYUFBUSxDQUFSO0FBQ0FKLGFBQVFLLFdBQVIsSUFBdUIsSUFBdkI7QUFDQUwsYUFBUVUsU0FBUixDQUFrQjVOLEdBQWxCLEVBQXVCZ04sT0FBT1EsS0FBUCxHQUFhLENBQWIsR0FBaUJILE9BQUssQ0FBN0MsRUFBZ0RMLE9BQU9wQyxNQUFQLEdBQWMsQ0FBZCxHQUFrQjBDLE9BQUssQ0FBdkUsRUFBMEVELElBQTFFLEVBQWdGQyxJQUFoRjtBQUNBLEtBTEQsTUFLTztBQUNOWCxrQkFBYTFDLEtBQWI7QUFDQTtBQUNELElBVE8sRUFTTCxNQUFJLEVBVEMsQ0FBUjtBQVdBLEdBL0JEO0FBZ0NBLEVBM0NEOztBQTZDQXJFLGFBQVkyQixTQUFaLENBQXNCQyxRQUF0QixHQUFpQyxVQUFXbEksTUFBWCxFQUFtQnVPLEtBQW5CLEVBQTJCO0FBQzNELE1BQUt2TyxPQUFPVyxTQUFQLENBQWlCaUQsT0FBakIsQ0FBeUIySyxLQUF6QixJQUFrQyxDQUFDLENBQXhDLEVBQTRDO0FBQzVDdk8sU0FBT1csU0FBUCxJQUFvQixNQUFNNE4sS0FBMUI7QUFDQSxFQUhEOztBQUtBakksYUFBWTJCLFNBQVosQ0FBc0I0QixXQUF0QixHQUFvQyxVQUFXN0osTUFBWCxFQUFtQnVPLEtBQW5CLEVBQTJCO0FBQzlELE1BQUlDLFNBQVMsSUFBSUMsTUFBSixDQUFXRixLQUFYLENBQWI7QUFDQXZPLFNBQU9XLFNBQVAsR0FBbUIvQyxHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBY2lDLE9BQU9XLFNBQVAsQ0FBaUIxQyxPQUFqQixDQUEwQnVRLE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTUxZWNiZGIxNjM2NDYyZDI5YjNcbiAqKi8iLCJpbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG5pbXBvcnQgJy4vZGV2JzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcbmltcG9ydCAnLi92aWRlby1wbGF5ZXInO1xuXG5cbnZhciAkID0gd2luZG93LiQ7XG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgICByZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cbiAgICAvL+ycoO2LuCDrqZTshJzrk5xcbiAgICB1dGlsOiB7XG4gICAgICAgIC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4BcbiAgICAgICAgY29tbW9uTm90aGluZzogZnVuY3Rpb24oKSB7fVxuXG4gICAgICAgIC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG4gICAgICAgICxcbiAgICAgICAgdHJpbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgICBpc0RldmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL+uqqOuwlOydvCBVQVxuICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5naW5nZXJicmVhZCkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW9zKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcykgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIH1cblxuICAgIC8vIOqzte2GtSDrqZTshJzrk5xcbiAgICAsXG4gICAgY29tbW9uOiB7XG5cbiAgICAgICAgLy8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG4gICAgICAgIGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcbiAgICAgICAgICAgIHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSxcbiAgICAgICAgICAgICAgICBhVGFnID0gbnVsbCxcbiAgICAgICAgICAgICAgICBocmVmID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVRhZyA9IGFsbEFbaV07XG4gICAgICAgICAgICAgICAgaHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgaWYgKHVpLnV0aWwudHJpbShocmVmKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcbiAgICAgICAgLFxuICAgICAgICB0YWJsZUZhZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuICAgICAgICAgICAgaWYgKF9zY29wZS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvYWRpbmcgbWFza1xuICAgICAgICAsXG4gICAgICAgIGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VQcmVsb2FkZXIoJy9mcm9udC9pbWFnZXMvbG9hZGluZy1jaXJjdWxhci5naWYnLCBmdW5jdGlvbihpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5zdG9wKCkuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMjAwLCBmdW5jdGlvbigpIHt9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOq3uOujuSDthqDquIBcbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVHcm91cDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExheWVyIHBvcHVwXG4gICAgICAgICxcbiAgICAgICAgcG9wdXBDbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBvcHVwID0gJCgnLnBvcHVwJyk7XG4gICAgICAgICAgICBpZiAoIHBvcHVwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaT0wLCBsZW5ndGg9cG9wdXAubGVuZ3RoOyBpPGxlbmd0aDsgaSs9MSApIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGope1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuZXEoaikuZmluZCgnLmJ0bi1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcucG9wdXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KShpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmFrZVNlbGVjdDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5zZWxlY3Qtd3JhcC5mYWtlJykuZWFjaChmdW5jdGlvbihpdGVtLCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcykuZmluZCgnc2VsZWN0JyksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gJCh0aGlzKS5maW5kKCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmdldCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0aGF0Lm9wdGlvbnNbdGhhdC5zZWxlY3RlZEluZGV4XS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC50ZXh0KCB0ZXh0ICk7XG4gICAgICAgICAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0YmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gICAgdmFyIGNhcmROZXdzID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuXG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG4gICAgICAgICAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG4gICAgICAgICAgICB0aGlzLnN3aXBlcihvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzd2lwZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGJlYXV0eW51cy5jYXJkTmV3cyA9IGNhcmROZXdzO1xuXG4gICAgdmFyIGFjY29yZGlhbiA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oX3Njb3BlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29wZSA9IF9zY29wZTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKGl0ZW0ucG9zaXRpb24oKS50b3ApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb24sXG4gICAgICAgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG4gICAgY29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcbiAgICBjb21tb24udGFibGVGYWRlKCk7XG5cbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpKTtcblxuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG4gICAgY29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jYWxsYmFja3NcbiAgICB9KTtcblxuICAgIC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6TtlolcbiAgICBpZiAobG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSkge1xuICAgICAgICBkZXYuYXBwZW5kTWVudUxpc3QoKTtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVCdG4oKTtcbiAgICB9XG59KTtcblxuLypcbiAqXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuICovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlcy5zcmMgPSBpbWc7XG5cbiAgICBpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgW3dpbiwgZG94LCBxc2EsIHFzXSA9IFt3aW5kb3csIGRvY3VtZW50LCAncXVlcnlTZWxlY3RvckFsbCcsICdxdWVyeVNlbGVjdG9yJ107XG5cbmNvbnN0XG5cdGRvbSBcdD0gcyA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHMpLFxuXHRkb21BbGwgXHQ9IHMgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzKSxcblx0bWFrZURvbSA9IChzLCBhdHRyKSA9PiB7XG5cdFx0dmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocylcblx0XHRpZiAoIHR5cGVvZiBhdHRyID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA+IDAgKVxuXHRcdFx0Zm9yICggbGV0IGkgaW4gYXR0ciApXG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoaSwgYXR0cltpXSk7XG5cdFx0cmV0dXJuIGRvbTtcblx0fSxcblx0cHV0VGV4dCA9IHMgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyksXG5cdHByZXBlbmQgPSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRhcmdldC5jaGlsZE5vZGVzWzBdKSxcblx0YXBwZW5kIFx0PSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzte2GtVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64K07Jqp7J20IOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vbm8tcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLruIzrnpzrk5xcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l7KCV67O0XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66ek7J6l7IaM7IudXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVJbmZvL3N0b3JlTmV3cy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuppOuyhOyJvVwiLFxuXHRcdGRlcHRoMjogXCLsnbTsmqnslb3qtIBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLshJzruYTsiqQg7J207Jqp7JW96rSAICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9zZXJ2aWNlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuqwnOyduOygleuztCDsspjrpqzrsKnsuaggKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3BlcnNvbmFsSW5mb21hdGlvbi5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsnITsuZjquLDrsJjshJzruYTsiqQg7J207Jqp7JW96rSAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L2xvY2F0aW9uQmFzZWQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsnbTrsqTtirgm7ZaJ7IKsXCIsXG5cdFx0ZGVwdGgyOiBcIuynhO2WieykkeyduCDsnbTrsqTtirhcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDsnbzrsJhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7Zek652866mU7J207YGs7JeF7Ie8XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3SGVyYS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuLqOydvOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX3NpbmdsZVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuzteyImOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX211bHRpU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7JmE66OMKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxDb21wbGV0ZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyiheujjCDtm4Qg7ZmV7J24KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfZmluaXNoLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67ew7Yuw7Luo7YWQ7LigXCIsXG5cdFx0ZGVwdGgyOiBcIuuqqeuhnVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjsubTrk5zribTsiqTtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4HtkojsoJXrs7RcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RJbmZvL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzoOqwneyEvO2EsFwiLFxuXHRcdGRlcHRoMjogXCLqs7Xsp4Dsgqztla1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqqnroZ0gKyDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9ub3RpY2UvbGlzdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuPhOybgOunkFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqZTsnbhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9oZWxwL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6XCLrp4jsnbTtjpjsnbTsp4BcIiAsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrk7HquIlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvZ3JhZGUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOy/oO2PsFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9jb3Vwb24vaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g67Cp66y47ZuE6riwXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L3Zpc2l0b3JzQm9vay5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq0gOyLrOyDge2SiFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wcm9kdWN0T2ZJbnRlcmVzdC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiBmYWxzZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi6rWs66ek7ZiE7ZmpXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66as7Iqk7Yq4KHBvcHVwIO2PrO2VqClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHVyY2hhc2UvcGVyaW9kLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq1rOunpO2YhO2ZqSDrpqzsiqTtirjqsIAg7JeG7J2EIOuVjFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wdXJjaGFzZS9uby1jb250ZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7JeU7KCk7Yah7YahXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMgO2ZlO2ZlOuptFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2VuZ2VsVGFsay90YWxrX2lucXVpcnkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9XG5cdFx0XVxuXHR9XG5cbl07XG5cbnZhciBtZW51TGlzdCA9IG1lbnVEYXRhLnJlZHVjZSgocCwgYykgPT4ge1xuXHRsZXQge2RlcHRoMSwgZGVwdGgyLCBsaW5rc30gPSBjO1xuXHRyZXR1cm4gYCR7cCB8fCAnJ31cblx0JHtkZXB0aDEgPyBgPGgyPjxzcGFuPiR7ZGVwdGgxfTwvc3Bhbj48L2gyPmAgOiBgYH1cblx0JHtkZXB0aDIgPT0gJycgPyBkZXB0aDIgOiBgPGgzPjxzcGFuPiR7ZGVwdGgyfTwvc3Bhbj48L2gzPmB9XG5cdDx1bD4ke2xpbmtzLnJlZHVjZSgoaXAsIGljKSA9PiB7XG5cdFx0XHRsZXQge3RpdGxlLCBocmVmLCBjb21wbGV0ZX0gPSBpYztcblx0XHRcdHJldHVybiBgJHtpcCB8fCBcIlwifVxuXHRcdDxsaSR7Y29tcGxldGUgPyAnIGNsYXNzPVwiY3BcIicgOiBcIlwifT48YSBocmVmPVwiJHtocmVmfVwiPiR7dGl0bGV9PC9hPjwvbGk+YH0sIDApfVxuXHQ8L3VsPlxuXHRgXG59LCAwKTtcblxuLy8g66mU64m0IOuyhO2KvCDsgr3snoVcbndpbmRvdy5kZXYgPSB7XG5cdGFwcGVuZE1lbnVCdG46IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1lbnVUcmlnZ2VyID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdDxzcGFuPnRvZ2dsZSBtZW51PC9zcGFuPlxuPC9idXR0b24+YDtcblx0XG5cdFx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCkge1xuXHRcdFx0XHQkKCcjbWVudScpLnByZXBlbmQobWVudVRyaWdnZXIpO1xuXHRcdFx0fVxuXHRcblx0XHRcdCQoJy5tZW51LXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBtZW51TGlzdCA9ICQoJyNtZW51LWxpc3QnKSxcblx0XHRcdFx0ICAgIGN0cmxDbGFzcyA9ICdpcy1hY3RpdmUnLFxuXHRcdFx0XHQgICAgY29uZGl0aW9uID0gbWVudUxpc3QuaGFzQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHRpZiAoY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLnJlbW92ZUNsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8vIOuplOuJtCDrpqzsiqTtirgg7IK97J6FXG5cdCxhcHBlbmRNZW51TGlzdDogZnVuY3Rpb24oKXtcblxuXHRcdGlmICggJCgnI21lbnUnKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdG1lbnVMaXN0ID0gJCgnPGRpdiBpZD1tZW51IC8+JykuYXBwZW5kKCAkKCc8ZGl2IGlkPW1lbnUtbGlzdCBjbGFzcz1vdmVydGhyb3cgLz4nKS5hcHBlbmQoIG1lbnVMaXN0ICkgKTtcblx0XHRcdCQoJyN3cmFwJykubGVuZ3RoIDw9IDAgPyAkKCdib2R5JykucHJlcGVuZCggbWVudUxpc3QgKSA6ICQoJyN3cmFwJykucHJlcGVuZCggbWVudUxpc3QgKTtcblx0XHR9XG5cdFx0JCgnI21lbnUtbGlzdCcpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYUhSRUYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdGlmICggYUhSRUYuaW5kZXhPZignP2RldicpIDw9IC0xICkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBhSFJFRiArICc/ZGV2Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LGRpbW06IGZ1bmN0aW9uKG1zZyl7XG5cdFx0bXNnID0gbXNnIHx8ICfrgrTsmqnsnbQg7JeG7Iq164uI64ukLic7XG5cdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdCQoJzxkaXYgY2xhc3M9XCJkaW1tXCIgLz4nKS5hcHBlbmQoXG5cdFx0XHRcdCQoYDxzcGFuPiR7bXNnfTxzcGFuLz48YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj5b64ur6riwXTwvc3Bhbj48L2J1dHRvbj5gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdFx0JCgnLmRpbW0nKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5kaW1tJykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Rldi5qc1xuICoqLyIsIi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKlx0bmV0d29ya1N0YXRlIHsgbnVtYmVyIH1cbiogXHQwID0gTkVUV09SS19FTVBUWSAtIGF1ZGlvL3ZpZGVvIGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWRcbipcdDEgPSBORVRXT1JLX0lETEUgLSBhdWRpby92aWRlbyBpcyBhY3RpdmUgYW5kIGhhcyBzZWxlY3RlZCBhIHJlc291cmNlLCBidXQgaXMgbm90IHVzaW5nIHRoZSBuZXR3b3JrXG4qXHQyID0gTkVUV09SS19MT0FESU5HIC0gYnJvd3NlciBpcyBkb3dubG9hZGluZyBkYXRhXG4qXHQzID0gTkVUV09SS19OT19TT1VSQ0UgLSBubyBhdWRpby92aWRlbyBzb3VyY2UgZm91bmRcbipcbipcdHJlYXN5U3RhdGUgeyBudW12ZXIgfVxuKlx0MCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVx0XG4qXHQxID0gSEFWRV9NRVRBREFUQSAtIG1ldGFkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbipcdDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcbipcdDMgPSBIQVZFX0ZVVFVSRV9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgYW5kIGF0IGxlYXN0IHRoZSBuZXh0IGZyYW1lIGlzIGF2YWlsYWJsZVxuKlx0NCA9IEhBVkVfRU5PVUdIX0RBVEEgLSBlbm91Z2ggZGF0YSBhdmFpbGFibGUgdG8gc3RhcnQgcGxheWluZ1xuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spIHtcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBWaWRlb1BsYXllcikgKSByZXR1cm4gbmV3IFZpZGVvUGxheWVyKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spO1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcblx0dGhpcy5sb2FkaW5nRWxlbWVudFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvLWxvYWRpbmctaW1hZ2UnKSxcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gMDtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2YgZW5kZWRDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX2luaXQoKTtcblx0Y29uc29sZS5sb2coJ3ZpZGVvIHBsYXllciBjYWxsJyk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdGNvbnNvbGUubG9nKCdpbml0Jyk7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5fcGxheSgpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IG51bGw7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0aWYgKCB0aGF0LnBsYXlGbGFnICkge1xuXHRcdHRoYXQucGxheUZsYWcgPSBmYWxzZTtcblx0XHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHRcdGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cblx0XHR2ID0gdGhhdC52aWRlbztcblxuXHRcdGNvbnNvbGUubG9nKCc9PT09PT09PT09PScsIHYubmV0d29ya1N0YXRlLCB2LnJlYWR5U3RhdGUpO1xuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0XHRcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2FhYWFhYScpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRiZWdpbmZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gYmlnaW4nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGVuZCcpO1xuXHRcdH0sIGZhbHNlKTtcblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHQvLyB0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIHRoYXQudmlkZW8ub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ29uY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIGlmICggdGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlIClcblx0Ly8gXHR0aGF0LnZpZGVvLmZ1bGxzY3JlZW5jaGFuZ2UoKTtcblxuXHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRcdGlmICggdGhpcy5lbmRlZCApIHtcblx0Ly8gXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0XHRcdGlmIChjb25maXJtKCfqs6DqsJ3ri5jsnYQg7JyE7ZWcIOq5nOynnSDsv6Dtj7DsnbQg67Cc6riJ65CY7JeI7Iq164uI64ukLiAk7L+g7Y+w66qFJCDsv6Dtj7DsnYQg67Cc6riJ67Cb7Jy87Iuc6rKg7Iq164uI6rmMPycpICkge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+2ZleyduCcpO1xuXHQvLyBcdFx0XHRcdH0gZWxzZSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7Leo7IaMJyk7XG5cdC8vIFx0XHRcdFx0fVxuXHQvLyBcdFx0XHR9LCA1MDApO1xuXHQvLyBcdFx0fVxuXHQvLyBcdH1cblx0Ly8gfSBlbHNlIGlmICgpIHtcblx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdC8vIFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0Ly8gXHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCftmZXsnbgnKTtcblx0Ly8gXHRcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSwgNTAwKTtcblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIH1cblxuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVuY3Rpb24oKXtcblx0Ly8gXHRlbmRGdWxsKCk7XG5cdC8vIH0sIGZhbHNlKTtcblx0Ly8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdC8vIFx0ZW5kRnVsbCgpO1xuXHQvLyB9LCBmYWxzZSk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdvbnBsYXknLCB0aGF0LnBsYXlQYXVzZUZsYWcpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25wbGF5aW5nID0gZnVuY3Rpb24oKXtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHYuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkgdi53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHRcdFx0XHRpZiAoIHYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRSYXRpbyA9IGZ1bmN0aW9uKHgsIHksIGwpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdGFyZ2V0ID0gMDtcblx0dGFyZ2V0ID0gTWF0aC5yb3VuZCgoeSAqIGwpIC8geCk7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ2dldCBkdXJhdGlvbicpO1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnZ2V0IGR1cmF0aW9uIHNldEludGVydmFsJywgJ3JlYWR5U3RhdGU6ICcgKyB2aWRlby5yZWFkeVN0YXRlLCApO1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ2dldCBkdXJhdGlvbiBzZXRJbnRlcnZhbCBpZicpO1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpOyBcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24oIGVycm9yVHlwZSApIHtcblx0Ly8gaWYgKCByZWFkeVN0YXRlRmxhZyA9PSAgKVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IGZ1bmN0aW9uKHYpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0d3JhcHBlciA9IHRoYXQud3JhcHBlcjtcblx0d3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHYudmlkZW9XaWR0aCwgdi52aWRlb0hlaWdodCwgdi5jbGllbnRXaWR0aCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblRpbWVVcGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdGlmICggdGhhdC52aWRlby5wYXVzZWQgKSByZXR1cm47XG5cdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcbiAgfTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC52aWRlbykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHQkKHRoYXQudGltZWxpbmUpLnNob3coKTtcblx0JCh0aGF0LmNvbnRyb2wpLmFkZENsYXNzKCdyZW1vdmUtdGltZScpLnNob3coKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQucGF1c2VCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmN1clRpbWUgPSB0aGF0LnZpZGVvLmN1cnJlbnRUaW1lO1xuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHQkKHRoaXMpLmhpZGUoKTtcblx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcblx0Y29uc29sZS5sb2coJ3BhdXNlIGJ1dHRvbicsIHRoYXQucGxheVBhdXNlRmxhZyk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuICBjb25zb2xlLmRpcih2KTtcbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzdGFydDogZnVuY3Rpb24gKCBldmVudCwgdWkgKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NsaWRlciBzdGFydCA6ICcsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdFx0di5wYXVzZSgpO1xuXHR9LFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdGNvbnNvbGUubG9nKCdzbGlkZXIgc3RvcCA6ICcsIHRoYXQucGxheVBhdXNlRmxhZyk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXHRcdGlmICggdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwbGF5JyApIHtcblx0XHRcdHYucGxheSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2LnBhdXNlKCk7XG5cdFx0fVxuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzID0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyA9IHRoaXMuaGlnaFJlcztcblx0aWYgKGJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKS5oYXNDbGFzcygnbG93JykpIHtcblx0XHQkKGxvd1Jlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQodGhhdC5sb3dSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5sb3dSZXMpLmRhdGEoJ3NyYycpKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQodGhhdC5oaWdoUmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQuaGlnaFJlcykuZGF0YSgnc3JjJykpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcblx0Ly8gdGhhdC52ZXJpZnlpbmcoIHRoYXQudmlkZW8gKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS52ZXJpZnlpbmcgPSBmdW5jdGlvbiAoIHYgKSB7XG5cdC8vIGZ1bmN0aW9uIGFqYXgoKSB7XG4gLy8gIFx0XHR2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdC8vIFx0cmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0Ly8gXHRcdGlmICggcmVxLnJlYWR5U3RhdGUgPT09IHJlcS5ET05FICkge1xuXHQvLyBcdFx0XHRpZiAoIHJlcS5zdGF0dXMgPT0gMjAwICkge1xuXHQvLyBcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlEaXZcIikuaW5uZXJIVE1MID0gcmVxLnJlc3BvbnNlVGV4dDtcblx0Ly8gXHRcdFx0fVxuXHQvLyBcdFx0fVxuXHQvLyBcdH07XG5cdC8vIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXHR0aGF0LmdldER1cmF0aW9uKCk7XG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG5cdFx0XHRpbWcgPSBuZXcgSW1hZ2UoKSxcblx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0aW1nSCA9IDAsXG5cdFx0XHR0aW1lcjtcblx0XHRpbWcuc3JjID0gYmc7XG5cdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDA7XG5cblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0Ly8gY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcblxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGgsXG5cdFx0aW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRpbWdXICs9IDE7XG5cdFx0XHRcdGltZ0ggKz0gMTtcblx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdH1cblx0XHR9LCAzMDAvMzApXG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy92aWRlby1wbGF5ZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9