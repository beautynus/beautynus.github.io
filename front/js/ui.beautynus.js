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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; //style
	//개발용 스크립트 프로덕션시 삭제
	
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	var $ = window.$;
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
			cutstr: function cutStr(str, limit) {
				var strLength = 0,
				    strTitle = "",
				    strPiece = "",
				    code,
				    ch;
	
				for (i = 0; i < str.length; i++) {
					code = str.charCodeAt(i), ch = str.substr(i, 1).toUpperCase();
					strPiece = str.substr(i, 1);
					code = parseInt(code);
	
					if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && (code > 255 || code < 0)) strLength = strLength + 3; //UTF-8 3byte 로 계산
					else strLength = strLength + 1;
	
					if (strLength > limit) //제한 길이 확인
						break;else strTitle = strTitle + strPiece; //제한길이 보다 작으면 자른 문자를 붙여준다.
				}
				return strTitle;
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
				var _scope = doc.querySelectorAll('.js-fadein-wrap');
				if (_scope.length <= 0) return;
				_scope.forEach(function (el, i) {
					el.querySelector('.js-fadein-scroll').addEventListener('scroll', function (event) {
						var _target = event.target || window.event.target;
						if (_target.scrollWidth - _target.clientWidth <= _target.scrollLeft + 20) {
							console.log('off');
							el.className = el.className.replace(/on|\son/, "");
						} else {
							console.log('on');
							el.className = el.className.length < 1 ? 'on' : el.className.indexOf('on') <= -1 ? el.className + ' on' : el.className;
						}
					}, false);
				});
				// $('.js-fadein-wrap').each(function() {
				//     var $this = $(this);
				//     $this.find('.js-fadein-scroll').on('scroll', function(e) {
				//         var _target = e.target;
				//         if ((_target.scrollWidth - _target.clientWidth) <= (_target.scrollLeft + 20)) {
				//             $this.removeClass('on');
				//         } else {
				//             $this.addClass('on');
				//         }
				//     });
				// });
			}
	
			//loading mask
	
			, loadingComplete: function loadingComplete(callback) {
				window.addEventListener('load', function () {
					imagePreloader('/front/images/loading-circular.gif', function (img) {
						img.className = "video-loading-image";
						if (typeof callback == 'function') callback();
						$(doc.body).stop().animate({ opacity: 1 }, 200, function () {});
					});
				}, false);
			}
	
			// 그룹 토글
	
			, toggleGroup: function toggleGroup(group, element) {
				// doc.querySelector(`${group} ${element}`).addEventListener('click', function(){
				//     console.log(this.parentNode.querySelector(element));
				//     $('')
				//     this.querySelector( element ).className = this.querySelector( element ).className.replace( /actieve|\sactive/, "" );
				//     this.className += ' active';
				// }, false); 
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
	
		// dom confirm layer
		var confirm = {
			init: function init(options) {
				this.makeDom(options);
			},
			makeDom: function makeDom(options) {
				var title = options.title;
				var msg = options.msg;
				var closeButtonText = options.closeButtonText;
				var closeButtonClickFunc = options.closeButtonClickFunc;
				var okButtonText = options.okButtonText;
				var okButtonClickFunc = options.okButtonClickFunc;
	
				var dom = '<div class="wrapper">\n\t\t<div class="confirm">\n\t\t\t<h3 class="title"><span>' + title + '</span></h3>\n\t\t\t<p class="desc">\n\t\t\t\t' + (msg ? '' + msg : '') + '\n\t\t\t</p>\n\t\t\t<div class="btn-group">\n\t\t\t\t<button type="button" class="btn close">' + (closeButtonText ? closeButtonText : "닫기") + '</button>\n\t\t\t\t<button type="button" class="btn ok">' + (okButtonText ? okButtonText : "확인") + '</button>\n\t\t\t</div>\n\t\t\t<button type="button" class="btn-close">\n\t\t\t\t<span class="blind">닫기</span>\n\t\t\t</button>\n\t\t</div>\n\t</div>';
				var body = doc.querySelector('body'),
				    confirmLayer = doc.createElement('div');
				confirmLayer.setAttribute('class', 'confirm-layer');
				confirmLayer.innerHTML = dom;
				body.appendChild(confirmLayer);
				this.scope = document.querySelector('.confirm-layer');
				this.eventExecute(okButtonClickFunc, closeButtonClickFunc);
			},
			eventExecute: function eventExecute(okButtonClickFunc, closeButtonClickFunc) {
				var scope = this.scope,
				    buttons = ['ok', 'close', 'btn-close'].map(function (c) {
					return scope.querySelector('.' + c);
				});
				buttons.forEach(function (element, index, array) {
					element.addEventListener('click', function () {
						if (this.className.indexOf('ok') > -1 && typeof okButtonClickFunc == 'function') {
							okButtonClickFunc();
						}
						if (this.className.indexOf('close') > -1 && index == 1 && typeof closeButtonClickFunc == 'function') {
							closeButtonClickFunc();
						}
						doc.body.removeChild(scope);
					}, false);
				});
			}
		};
	
		beautynus.confirm = confirm;
	
		var alert = {
			init: function init(options) {
				this.makeDom(options);
			},
			makeDom: function makeDom(options) {
				var title = options.title;
				var msg = options.msg;
				var okButtonText = options.okButtonText;
				var okButtonClickFunc = options.okButtonClickFunc;
	
				var dom = '<div class="wrapper">\n\t<div class="confirm">\n\t\t<h3 class="title"><span>' + title + '</span></h3>\n\t\t<p class="desc">\n\t\t\t' + (msg ? '' + msg : '') + '\n\t\t</p>\n\t\t<div class="btn-group">\n\t\t\t<button type="button" class="btn ok" style="width: 100%">' + (okButtonText ? okButtonText : "확인") + '</button>\n\t\t</div>\n\t\t<button type="button" class="btn-close">\n\t\t\t<span class="blind">닫기</span>\n\t\t</button>\n\t</div>\n</div>';
				var body = doc.querySelector('body'),
				    confirmLayer = doc.createElement('div');
				confirmLayer.setAttribute('class', 'alert-layer');
				confirmLayer.innerHTML = dom;
				body.appendChild(confirmLayer);
				this.scope = document.querySelector('.alert-layer');
				this.eventExecute(okButtonClickFunc);
			},
			eventExecute: function eventExecute(okButtonClickFunc) {
				console.log(document.querySelector('body'));
				var scope = this.scope;
	
				['ok', 'btn-close'].map(function (c) {
					return scope.querySelector('.' + c);
				}).forEach(function (element, index, array) {
					element.addEventListener('click', function () {
						if (this.className.indexOf('ok') > -1 && typeof okButtonClickFunc == 'function') {
							okButtonClickFunc();
						}
						doc.body.removeChild(scope);
					}, false);
				});
			}
		};
	
		beautynus.alert = alert;
	
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
	
		// common.loadingComplete(function() {
		//     //callbacks
		// });
	
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
	
		var count = 0;
	
		if (Array.isArray(img) && (typeof img === 'undefined' ? 'undefined' : _typeof(img))) {
	
			img.forEach(function (el, index) {
				var images = document.createElement('img');
				images.src = img;
				images.addEventListener('load', function () {
					count++;
					if (typeof callback == 'function' && count == img.length) callback(images);
				}, false);
			});
		} else if (typeof img == 'string') {
			var images = document.createElement('img');
			images.src = img;
			images.addEventListener('load', function () {
				if (typeof callback == 'function') callback(images);
			}, false);
		}
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
	var doc = document;
	var qsa = 'querySelectorAll';
	var qs = 'querySelector';
	
	
	var dom = function dom(s) {
		return document[qs](s);
	},
	    domAll = function domAll(s) {
		return document[qsa](s);
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
		}, {
			title: "confirm, alert",
			href: "/html/config/locationServiceAgreement.html",
			complete: true
		}]
	}, {
		depth1: "브랜드메인",
		depth2: "매장정보",
		links: [{
			title: "매장소식",
			href: "/html/brand/storeInfo/storeNews.html",
			complete: true
		}, {
			title: "백화점행사(Sample)",
			href: "/html/brand/storeEvent.html",
			complete: true
		}]
	}, {
		depth1: "",
		depth2: "매장방문후기",
		links: [{
			title: "상세",
			href: "/html/brand/visitorsBookDetail.html",
			complete: false
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
		}, {
			title: "예약 시 - 개인정보 수집 및 이용안내",
			href: "/html/event/reservation/agreement.html",
			complete: true
		}]
	}, {
		depth1: "쿠폰북",
		depth2: "",
		links: [{
			title: "상세",
			href: "/html/couponBook/detail.html",
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
			complete: true
		}]
	}, {
		depth1: "",
		depth2: "구매현황",
		links: [{
			title: "리스트(popup 포함)",
			href: "/html/myPage/purchase/period.html",
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
	window.VideoPlayer = function (options) {
		//wrapper, endedCallback
		if (!(this instanceof VideoPlayer)) return new VideoPlayer(wrapper, endedCallback);
		this.wrapper = document.querySelector(options.wrapper);
		this.loadingElement = this.wrapper.querySelector('.video-loading-image'), this.video = null, this.lowRes = this.wrapper.querySelectorAll('video')[0];
		this.highRes = this.wrapper.querySelectorAll('video')[1];
		this.playFlag = true;
		this.curTime = function () {
			if (options.startTime >= options.duration) return 0;
			var startTime = options.startTime ? Number(options.startTime) : 0;
			return startTime;
		}();
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
		this.btnGroup = this.control.querySelector('.btn-group');
		this.activeBtn = this.btnGroup.querySelector('button.active');
		this.mobileNetwork = options.mobileNetwork;
		this.alertMobile = this.wrapper.querySelector('.alert-mobile');
		this.playPauseFlag = 'pause';
		this.endedCallback = typeof options.endedCallback == 'function' ? options.endedCallback : function () {
			console.warn('endedCallback type is not a function.');
		};
		this.pushTime = typeof options.timeupdateCallback == 'function' ? options.timeupdateCallback : function () {};
	
		this.posterLoaded();
		this._unload();
		this._size();
		this._init();
	};
	
	VideoPlayer.prototype._init = function () {
		var that = this;
	
		that.addKlass(that.loadingElement, "active");
		that.addKlass(that.control, 'hide');
	
		[that.playBtn, that.pauseBtn].forEach(function (btn, index) {
			btn.addEventListener('touchstart', function () {
				that.addKlass(this, 'mousedown');
			}, false);
	
			btn.addEventListener('touchend', function () {
				that.removeKlass(this, 'mousedown');
			}, false);
		});
	
		that.playBtn.addEventListener('click', function () {
	
			if (that.mobileNetwork) {
				that.mobileNetwork = false;
				that.mobileNetworkCheck();
			} else {
				that._play();
			}
		}, false);
	};
	
	VideoPlayer.prototype._size = function () {
		var w = Math.round(this.wrapper.clientWidth),
		    h = 0;
		h = 9 * w / 16;
		this.wrapper.style.height = Math.round(h) + 'px';
	};
	
	VideoPlayer.prototype._unload = function () {
		document.body.onunload = function () {
			// console.log('page move');
		};
	};
	
	VideoPlayer.prototype.mobileNetworkCheck = function () {
		var that = this,
		    alert = that.alertMobile;
		that.addKlass(alert, 'active');
		that.addKlass(that.control, 'hide');
		alert.querySelector('button.ok').addEventListener('click', function () {
			that._play();
			that.removeKlass(alert, 'active');
		}, false);
	};
	
	VideoPlayer.prototype._play = function () {
		var that = this,
		    v = null;
	
		that.addKlass(that.loadingElement, "active");
	
		if (that.playFlag) {
			that.playFlag = false;
			that.addKlass(that.control, 'hide');
			if (that.video == null) v = that.resolutionChoice();
	
			// if ( that.curTime ) v.currentTime = that.curTime; 
	
			that._onPlay();
			that._onPause();
			that._onTimeUpdate();
			that._click();
			that._fullscrrenMode();
			that._pause();
			that.makeSeekbar();
			that.controlEvent();
			that.dimmClick();
			// if ( that.video.onwebkitfullscreenchange ) {
			// 	that.video.onwebkitfullscreenchange = function(){
			// 		console.log('aaaaaa');
			// 	};
			// }
	
			v.onload = function () {
				console.log('onload', v.networkState);
			};
			v.onloadstart = function () {
				console.log('onloadstart'.v);
			};
			v.onloadeddata = function () {
				console.log('loadeddata', v.networkState);
			};
			v.onloadedmetadata = function () {
				console.log('onloadedmetadata', v.networkState);
			};
	
			document.onwebkitfullscreenchange = function () {
				if (!v.webkitDisplayingFullscreen && v.ended) {
					console.log('fullscreen change : zoom in');
					setTimeout(function () {
						that.endedCallback();
					}, 1000);
				}
			};
		}
		that.playPause();
	
		that.video.oncuechange = function () {
			console.log('cuechange');
		};
	};
	
	VideoPlayer.prototype._onPlay = function () {
		var that = this;
	
		that.video.onplay = function () {
			that.addKlass(that.poster, 'hide');
			if (this.currentTime != 0) that.controlVisibling(true);
			that.playPauseFlag = 'play';
			console.log('onplay');
		};
	
		that.video.oncanplay = function () {
			that.removeKlass(that.pauseBtn, 'hide');
			that.addKlass(that.playBtn, 'hide');
			console.log('oncanplay');
		};
	
		that.video.onplaying = function () {
			that.removeKlass(that.loadingElement, "active");
			console.log('onplaying');
		};
	};
	
	VideoPlayer.prototype._onPause = function () {
		var that = this,
		    v = that.video;
		that.video.onpause = function () {
			that.removeKlass(that.control, 'hide');
			that.addKlass(that.pauseBtn, 'hide');
			that.removeKlass(that.playBtn, 'hide');
			if (this.currentTime > 0) that.addKlass(that.btnGroup, 'hide');
			that.controlVisibling(false);
			if (v.ended) {
				if (v.webkitDisplayingFullscreen) {
					that.video.addEventListener('webkitendfullscreen', function () {
						var v = that.video;
						that.endedCallback();
					}, false);
					document.addEventListener('webkitendfullscreen', function () {
						var v = that.video;
						that.endedCallback();
					}, false);
	
					if (v.exitFullscreen) {
						console.log(1);
						v.exitFullscreen();
					} else if (v.webkitExitFullscreen) {
						console.log(2);
						v.webkitExitFullscreen();
					} else if (documet.exitFullscreen) {
						console.log(3);
						documet.exitFullscreen();
					} else if (documet.webkitExitFullscreen) {
						console.log(4);
						documet.webkitExitFullscreen();
					}
				} else {
					if (v.ended) that.endedCallback();
				}
			}
			console.log('onpause');
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
				// that.allocateSize(video);
			}
		}, 500);
	};
	
	VideoPlayer.prototype._error = function (errorType) {
		// if ( networkState ==  )
	};
	
	VideoPlayer.prototype.allocateSize = function (v) {
		var that = this,
		    wrapper = that.wrapper;
		wrapper.style.height = that.getRatio(v.videoWidth, v.videoHeight, v.clientWidth) + 'px';
	};
	
	VideoPlayer.prototype._onTimeUpdate = function () {
		var that = this,
		    v = that.video,
		    pv = 0;
		v.ontimeupdate = function () {
			if (v.paused) return;
			that.getCurrentTime('seek');
			// 5초마다 시간체크
			if (pv != Math.round(v.currentTime) && Math.round(v.currentTime) % 5 == 0) {
				// 현재시간을 5로 나누어 나머지를 구하고 그 나머지가 5보다 작으면 올림, 같거나 크면 버림
				that.pushTime(Math[v.currentTime % 5 < 5 ? 'ceil' : 'floor'](v.currentTime));
				pv = Math.round(v.currentTime);
			}
		};
	};
	
	VideoPlayer.prototype._click = function () {
		var that = this;
		that.video.addEventListener('click', function () {
			that.addKlass(that.btnGroup, 'hide');
			that.removeKlass(that.timeline, 'hide');
			that.addKlass(that.control, 'remove-time');
			that.removeKlass(that.control, 'hide');
			that.controlVisibling(true);
		}, false);
	};
	
	VideoPlayer.prototype._pause = function () {
		var that = this;
		that.pauseBtn.addEventListener('click', function () {
			that.curTime = that.video.currentTime;
			that.playPause();
			that.removeKlass(that.playBtn, 'hide');
			that.addKlass(that.pauseBtn, 'hide');
			that.playPauseFlag = 'pause';
		});
	};
	
	VideoPlayer.prototype.dimmClick = function () {
		var that = this;
		that.bg.addEventListener('click', function () {
			that.controlVisibling(false);
			that.addKlass(that.control, 'hide');
		}, false);
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
	
		$(that.wrapper.querySelector('.seekbar')).slider({
			range: 'min',
			// max: duration,
			start: function start(event, ui) {
				v.pause();
			},
			slide: function slide(event, ui) {
				that.getCurrentTime();
				that.changeCurrentTime(ui);
			},
			change: function change(event, ui) {},
			stop: function stop(event, ui) {
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
		    highRes = this.highRes,
		    ua = navigator.userAgent.toLowerCase(),
		    styles = {
			show: [{ display: 'block', opacity: 1 }],
			hide: [{ display: 'none', opacity: 0 }]
		},
		    choice = function choice(el) {
			var showEl, hideEl;
			if (el == 'low') showEl = lowRes, hideEl = highRes;else if (el == 'high') hideEl = lowRes, showEl = highRes;
	
			// for ( var vi in lowRes ) {
			// 	console.log(vi);
			// }
			console.dir(lowRes);
	
			styles.show.forEach(function (c, i) {
				showEl.style[Object.keys(c)[1]] = c[Object.keys(c)[1]];
			});
			showEl.setAttribute('data-play', 'true');
			showEl.setAttribute('src', showEl.getAttribute('data-src'));
	
			styles.hide.forEach(function (c, i) {
				hideEl.style[Object.keys(c)] = c[Object.keys(c)];
			});
			hideEl.setAttribute('data-play', 'false');
	
			that.video = showEl;
		},
		    condition = btnGroup.querySelector('button.active').className.indexOf('low') > -1 ? 'low' : 'high';
		choice(condition);
	
		// if ( ua.indexOf('android 4.2') > -1 || ua.indexOf('android 4.3') > -1 ) {
		// 	$(that.video).append('<source src=""></source>');
		// 	$(that.video).find('source').attr('src', $(that.video).data('src'));
		// }
	
		return that.video;
		// that.verifying( that.video );
	};
	
	VideoPlayer.prototype.verifying = function (v) {
		console.log(v.networkState);
	};
	
	VideoPlayer.prototype.changeCurrentTime = function (ui) {
		var that = this,
		    v = that.video,
		    m,
		    s;
	
		v.currentTime = parseInt(v.duration * (ui.value / 100), 10);
		that.curTime = v.currentTime;
		m = Math.round(v.currentTime / 60).toString();
		s = Math.round(v.currentTime % 60).toString();
		that.startTime.innerText = (m.length < 2 ? '0' + m : m) + ':' + (s.length < 2 ? '0' + s : s);
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
		clearTimeout(that.controlTimer);
		if (ctrl) {
			that.controlTimer = setTimeout(function () {
				that.addKlass(that.control, 'hide');
			}, 2000);
		} else {
			clearTimeout(that.controlTimer);
			that.removeKlass(that.control, 'hide');
		}
	};
	
	VideoPlayer.prototype.playPause = function () {
		var that = this,
		    v = that.video;
	
		console.log("currentTime", v.currentTime);
	
		for (var vi in v) {
			console.log(vi);
		}
	
		if (v.paused) {
			if (that.curTime) {
				try {
					v.currentTime = that.curTime;
				} catch (e) {
					v.startTime = that.curTime;
				}
			}
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
		bg = el.getAttribute('data-bg');
	
		var canvasTag = document.createElement('canvas');
		canvasTag.id = "videoPoster";
		that.poster.appendChild(canvasTag);
		that.getDuration();
		imagePreloader('/front/images/ico/ico_fullscreen.png'); //전체화면 버튼 이미지 로더
		imagePreloader(bg, function () {
			if (that.loadingElement) {
				that.removeKlass(that.loadingElement, "active");
			}
			var canvas = document.getElementById('videoPoster'),
			    context = canvas.getContext('2d'),
			    img = new Image(),
			    imgW = 0,
			    imgH = 0,
			    timeout,
			    interval;
			var aa = 0;
			img.src = bg;
			context.globalAlpha = 0;
	
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			// canvas.style.height = "100px";
	
			imgW = that.wrapper.clientWidth * 1.5;
			imgH = Math.round(img.naturalHeight) * 9 / 16;
			imgH = Math.round(imgH) * 1.5;
			// imgH = that.getRatio(img.naturalWidth, img.naturalHeight, imgW);
	
			timeout = setTimeout(function () {
				that.removeKlass(that.control, 'hide');
				interval = setInterval(function () {
					if (context.globalAlpha.toFixed(1) < 1) {
						imgW -= imgW * 0.025;
						imgH -= imgH * 0.025;
						context.globalAlpha += 0.05;
						context.drawImage(img, canvas.width / 2 - imgW / 2, canvas.height / 2 - imgH / 2, imgW, imgH);
					} else {
						clearTimeout(interval);
					}
				}, 1000 / 60);
			}, 300);
		});
	};
	
	VideoPlayer.prototype.addKlass = function (target, klass) {
		if (target.className.toString().indexOf(klass) > -1) return;
		target.className += ' ' + klass;
	};
	
	VideoPlayer.prototype.removeKlass = function (target, klass) {
		var regexp = new RegExp(klass);
		target.className = ui.util.trim(target.className.toString().replace(regexp, ""));
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODFhMmQ0MjRjYWFlNWRhYTMzY2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJjbG9zZUJ1dHRvbkNsaWNrRnVuYyIsIm9rQnV0dG9uVGV4dCIsIm9rQnV0dG9uQ2xpY2tGdW5jIiwiZG9tIiwiY29uZmlybUxheWVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiZXZlbnRFeGVjdXRlIiwiYnV0dG9ucyIsIm1hcCIsImMiLCJpbmRleCIsImFycmF5IiwicmVtb3ZlQ2hpbGQiLCJhbGVydCIsImpvaW4iLCJsb2NhdGlvbiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImNvdW50IiwiQXJyYXkiLCJpc0FycmF5IiwiaW1hZ2VzIiwic3JjIiwicXNhIiwicXMiLCJzIiwiZG9tQWxsIiwiYXR0ciIsImtleXMiLCJwdXRUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJwcmVwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFwcGVuZCIsIm1lbnVEYXRhIiwiZGVwdGgxIiwiZGVwdGgyIiwibGlua3MiLCJjb21wbGV0ZSIsIm1lbnVMaXN0IiwicmVkdWNlIiwicCIsImlwIiwiaWMiLCJtZW51VHJpZ2dlciIsImN0cmxDbGFzcyIsImNvbmRpdGlvbiIsImFkZCIsImFIUkVGIiwiZGltbSIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsImVuZGVkQ2FsbGJhY2siLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsInN0YXJ0VGltZSIsImR1cmF0aW9uIiwiTnVtYmVyIiwiY29udHJvbFRpbWVyIiwicG9zdGVyIiwiY29udHJvbCIsImJnIiwicGxheUJ0biIsInBhdXNlQnRuIiwidmlkZW9UaW1lIiwidGltZWxpbmUiLCJmdWxsQnRuIiwiZW5kVGltZSIsInNlZWtiYXIiLCJidG5Hcm91cCIsImFjdGl2ZUJ0biIsIm1vYmlsZU5ldHdvcmsiLCJhbGVydE1vYmlsZSIsInBsYXlQYXVzZUZsYWciLCJ3YXJuIiwicHVzaFRpbWUiLCJ0aW1ldXBkYXRlQ2FsbGJhY2siLCJwb3N0ZXJMb2FkZWQiLCJfdW5sb2FkIiwiX3NpemUiLCJfaW5pdCIsInByb3RvdHlwZSIsImFkZEtsYXNzIiwiYnRuIiwicmVtb3ZlS2xhc3MiLCJtb2JpbGVOZXR3b3JrQ2hlY2siLCJfcGxheSIsInciLCJNYXRoIiwicm91bmQiLCJoIiwic3R5bGUiLCJoZWlnaHQiLCJvbnVubG9hZCIsInYiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwib25sb2FkIiwibmV0d29ya1N0YXRlIiwib25sb2Fkc3RhcnQiLCJvbmxvYWRlZGRhdGEiLCJvbmxvYWRlZG1ldGFkYXRhIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbmN1ZWNoYW5nZSIsIm9ucGxheSIsImN1cnJlbnRUaW1lIiwiY29udHJvbFZpc2libGluZyIsIm9uY2FucGxheSIsIm9ucGxheWluZyIsIm9ucGF1c2UiLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwiZG9jdW1ldCIsImdldFJhdGlvIiwieCIsInkiLCJsIiwiZ2V0RHVyYXRpb24iLCJ0aW1lciIsInNldEludGVydmFsIiwicmVhZHlTdGF0ZSIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJfZXJyb3IiLCJlcnJvclR5cGUiLCJhbGxvY2F0ZVNpemUiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJwdiIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwic2xpZGVyIiwicmFuZ2UiLCJzdGFydCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2VDdXJyZW50VGltZSIsImNoYW5nZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJ0b0xvd2VyQ2FzZSIsInN0eWxlcyIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImNob2ljZSIsInNob3dFbCIsImhpZGVFbCIsImRpciIsInZlcmlmeWluZyIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJ2aSIsImUiLCJjYW52YXNUYWciLCJpZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwidGltZW91dCIsImludGVydmFsIiwiYWEiLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OzttUEN0QzhCO0FBQ2Q7OztBQURoQjs7QUFDQTs7QUFDQTs7QUFHQSxLQUFJQSxJQUFJQyxPQUFPRCxDQUFmO0FBQ0EsS0FBSUUsTUFBTUQsTUFBVjtBQUFBLEtBQ0NFLE1BQU1DLFFBRFA7O0FBR0FILFFBQU9JLEtBQVAsR0FBZSxVQUFTQyxHQUFULEVBQWM7QUFDNUIsU0FBT0MsUUFBUUMsR0FBUixDQUFZRixHQUFaLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0FKLEtBQUlPLEVBQUosR0FBU1IsT0FBT1EsRUFBUCxJQUFhOztBQUVyQjtBQUNBQyxRQUFNO0FBQ0w7QUFDQUMsa0JBQWUseUJBQVcsQ0FBRTs7QUFFNUI7O0FBSkssS0FNTEMsTUFBTSxjQUFTQyxHQUFULEVBQWM7QUFDbkIsUUFBSUEsT0FBTyxJQUFQLElBQWUsT0FBT0EsR0FBUCxJQUFjLFdBQWpDLEVBQThDLE9BQU8sRUFBUDtBQUM5QyxXQUFPQSxJQUFJQyxPQUFKLENBQVksWUFBWixFQUEwQixFQUExQixDQUFQO0FBQ0EsSUFUSTtBQVVMQyxXQUFRLFNBQVNDLE1BQVQsQ0FBZ0JILEdBQWhCLEVBQXFCSSxLQUFyQixFQUEyQjtBQUNsQyxRQUFJQyxZQUFZLENBQWhCO0FBQUEsUUFDQ0MsV0FBVyxFQURaO0FBQUEsUUFFQ0MsV0FBVyxFQUZaO0FBQUEsUUFHQ0MsSUFIRDtB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QyxDQUFuRCxFQUF1RDtBQUN2RDdRLFNBQU9JLFNBQVAsSUFBb0IsTUFBTXlRLEtBQTFCO0FBQ0EsRUFIRDs7QUFLQXJKLGFBQVltQyxTQUFaLENBQXNCRyxXQUF0QixHQUFvQyxVQUFVOUosTUFBVixFQUFrQjZRLEtBQWxCLEVBQTBCO0FBQzdELE1BQUlDLFNBQVMsSUFBSUMsTUFBSixDQUFXRixLQUFYLENBQWI7QUFDQTdRLFNBQU9JLFNBQVAsR0FBbUJwRCxHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBYzZDLE9BQU9JLFNBQVAsQ0FBaUI0TSxRQUFqQixHQUE0QjNQLE9BQTVCLENBQXFDeVQsTUFBckMsRUFBNkMsRUFBN0MsQ0FBZCxDQUFuQjtBQUNBLEVBSEQsQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4MWEyZDQyNGNhYWU1ZGFhMzNjZFxuICoqLyIsImltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbmltcG9ydCAnLi9kZXYnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuaW1wb3J0ICcuL3ZpZGVvLXBsYXllcic7XG5cblxudmFyICQgPSB3aW5kb3cuJDtcbnZhciB3aW4gPSB3aW5kb3csXG5cdGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbihtc2cpIHtcblx0cmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG5cdC8v7Jyg7Yu4IOuplOyEnOuTnFxuXHR1dGlsOiB7XG5cdFx0Ly8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuXHRcdGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCkge31cblxuXHRcdC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG5cdFx0LFxuXHRcdHRyaW06IGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9LFxuXHRcdGN1dHN0cjogZnVuY3Rpb24gY3V0U3RyKHN0ciwgbGltaXQpeyAgICBcblx0XHRcdHZhciBzdHJMZW5ndGggPSAwLFxuXHRcdFx0XHRzdHJUaXRsZSA9IFwiXCIsXG5cdFx0XHRcdHN0clBpZWNlID0gXCJcIixcblx0XHRcdFx0Y29kZSwgY2g7XG5cdFx0XHRcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSksXG5cdFx0XHRcdGNoID0gc3RyLnN1YnN0cihpLDEpLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdHN0clBpZWNlID0gc3RyLnN1YnN0cihpLDEpXG5cdFx0XHRcdGNvZGUgPSBwYXJzZUludChjb2RlKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmICgoY2ggPCBcIjBcIiB8fCBjaCA+IFwiOVwiKSAmJiAoY2ggPCBcIkFcIiB8fCBjaCA+IFwiWlwiKSAmJiAoKGNvZGUgPiAyNTUpIHx8IChjb2RlIDwgMCkpKVxuXHRcdFx0XHRcdHN0ckxlbmd0aCA9IHN0ckxlbmd0aCArIDM7IC8vVVRGLTggM2J5dGUg66GcIOqzhOyCsFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0c3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKHN0ckxlbmd0aD5saW1pdCkgLy/soJztlZwg6ri47J20IO2ZleyduFxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRlbHNlIHN0clRpdGxlID0gc3RyVGl0bGUrc3RyUGllY2U7IC8v7KCc7ZWc6ri47J20IOuztOuLpCDsnpHsnLzrqbQg7J6Q66W4IOusuOyekOulvCDrtpnsl6zspIDri6QuXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyVGl0bGU7XG5cdFx0fSxcblx0XHRpc0RldmljZTogZnVuY3Rpb24oKSB7XG5cdFx0XHQvL+uqqOuwlOydvCBVQVxuXHRcdFx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoZWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5hbmRyb2lkKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5naW5nZXJicmVhZCkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG5cdFx0XHRcdFx0XHRlbHNlIHJldHVybiAnYW5kcm9pZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLmlvcykgcmV0dXJuICdpb3MnO1xuXHRcdFx0XHRcdGlmICghdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcykgcmV0dXJuICduby1tb2JpbGUnO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0YW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0Z2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG5cdH1cblxuXHQvLyDqs7XthrUg66mU7ISc65OcXG5cdCxcblx0Y29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0XHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksXG5cdFx0XHRcdGFUYWcgPSBudWxsLFxuXHRcdFx0XHRocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFUYWcgPSBhbGxBW2ldO1xuXHRcdFx0XHRocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKHVpLnV0aWwudHJpbShocmVmKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LFxuXHRcdHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpIHtcblxuXHRcdH1cblxuXHRcdC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuXHRcdCxcblx0XHR0YWJsZUZhZGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIF9zY29wZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZmFkZWluLXdyYXAnKTtcblx0XHRcdGlmIChfc2NvcGUubGVuZ3RoIDw9IDApIHJldHVybjtcblx0XHRcdF9zY29wZS5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpKXtcblx0XHRcdFx0ZWwucXVlcnlTZWxlY3RvcignLmpzLWZhZGVpbi1zY3JvbGwnKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiggZXZlbnQgKXtcblx0XHRcdFx0XHR2YXIgX3RhcmdldCA9IGV2ZW50LnRhcmdldCB8fCB3aW5kb3cuZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHRcdGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdvZmYnKTtcblx0XHRcdFx0XHRcdGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9vbnxcXHNvbi8sIFwiXCIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnb24nKTtcblx0XHRcdFx0XHRcdGVsLmNsYXNzTmFtZSA9ICggZWwuY2xhc3NOYW1lLmxlbmd0aCA8IDEgKSA/ICdvbicgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCggZWwuY2xhc3NOYW1lLmluZGV4T2YoJ29uJykgPD0gLTEgKSA/IGVsLmNsYXNzTmFtZSArICcgb24nIDogZWwuY2xhc3NOYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHQvLyAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0Ly8gICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0Ly8gICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG5cdFx0XHQvLyAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcblx0XHRcdC8vICAgICAgICAgfSBlbHNlIHtcblx0XHRcdC8vICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuXHRcdFx0Ly8gICAgICAgICB9XG5cdFx0XHQvLyAgICAgfSk7XG5cdFx0XHQvLyB9KTtcblx0XHR9XG5cblx0XHQvL2xvYWRpbmcgbWFza1xuXHRcdCxcblx0XHRsb2FkaW5nQ29tcGxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuXHRcdFx0XHRcdGltZy5jbGFzc05hbWUgPSBcInZpZGVvLWxvYWRpbmctaW1hZ2VcIjtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0JChkb2MuYm9keSkuc3RvcCgpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdC8vIOq3uOujuSDthqDquIBcblx0XHQsXG5cdFx0dG9nZ2xlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KSB7XG5cdFx0XHQvLyBkb2MucXVlcnlTZWxlY3RvcihgJHtncm91cH0gJHtlbGVtZW50fWApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdC8vICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihlbGVtZW50KSk7XG5cdFx0XHQvLyAgICAgJCgnJylcblx0XHRcdC8vICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUucmVwbGFjZSggL2FjdGlldmV8XFxzYWN0aXZlLywgXCJcIiApO1xuXHRcdFx0Ly8gICAgIHRoaXMuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcblx0XHRcdC8vIH0sIGZhbHNlKTsgXG5cdFx0XHQkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBMYXllciBwb3B1cFxuXHRcdCxcblx0XHRwb3B1cENsb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgcG9wdXAgPSAkKCcucG9wdXAnKTtcblx0XHRcdGlmICggcG9wdXAubGVuZ3RoID4gMCApIHtcblx0XHRcdFx0Zm9yKCB2YXIgaT0wLCBsZW5ndGg9cG9wdXAubGVuZ3RoOyBpPGxlbmd0aDsgaSs9MSApIHtcblx0XHRcdFx0XHQoZnVuY3Rpb24oail7XG5cdFx0XHRcdFx0XHRwb3B1cC5lcShqKS5maW5kKCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcucG9wdXAnKS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGZha2VTZWxlY3Q6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuc2VsZWN0LXdyYXAuZmFrZScpLmVhY2goZnVuY3Rpb24oaXRlbSwgdmFsdWUpe1xuXHRcdFx0XHR2YXIgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKSxcblx0XHRcdFx0XHRsYWJlbCA9ICQodGhpcykuZmluZCgnbGFiZWwnKTtcblx0XHRcdFx0c2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciB0aGF0ID0gJCh0aGlzKS5nZXQoMCksXG5cdFx0XHRcdFx0XHR0ZXh0ID0gdGhhdC5vcHRpb25zW3RoYXQuc2VsZWN0ZWRJbmRleF0udGV4dDtcblx0XHRcdFx0XHRsYWJlbC50ZXh0KCB0ZXh0ICk7XG5cdFx0XHRcdH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcblx0J3VzZSBzdHJpY3QnXG5cblx0dmFyIHV0aWwgPSB1aS51dGlsLFxuXHRcdGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuXHR2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cblx0Ly8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuXHR2YXIgY2FyZE5ld3MgPSB7XG5cdFx0X3Njb3BlOiAnJyxcblxuXHRcdGRlZmF1bHRPcHRpb25zOiB7XG5cdFx0XHRkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcblx0XHRcdGxvb3A6IHRydWUsXG5cdFx0XHRwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcblx0XHRcdHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG5cdFx0fSxcblxuXHRcdGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG5cdFx0XHR0aGlzLl9zY29wZSA9IHNjb3BlO1xuXHRcdFx0dmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuXHRcdFx0b3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuXHRcdFx0dGhpcy5zd2lwZXIob3B0aW9ucyk7XG5cdFx0fSxcblxuXHRcdHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0JCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcblx0XHR9LFxuXG5cdFx0bWFuYWdlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuXHRcdH1cblxuXHR9O1xuXHRiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuXHR2YXIgYWNjb3JkaWFuID0ge1xuXHRcdF9zY29wZTogJycsXG5cdFx0aW5pdDogZnVuY3Rpb24oX3Njb3BlKSB7XG5cdFx0XHRpZiAodHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJylcblx0XHRcdFx0dGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuXHRcdFx0dGhpcy5jbGljaygpO1xuXHRcdH0sXG5cdFx0Y2xpY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpXG5cdFx0XHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQod2luZG93KS5zY3JvbGxUb3AoaXRlbS5wb3NpdGlvbigpLnRvcCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cblx0Ly8gZG9tIGNvbmZpcm0gbGF5ZXJcblx0dmFyIGNvbmZpcm0gPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXHRcdFx0dGhpcy5tYWtlRG9tICggb3B0aW9ucyApO1xuXHRcdH0sXG5cdFx0bWFrZURvbTogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXHRcdFx0XHR2YXIge1xuXHRcdFx0XHRcdHRpdGxlLFxuXHRcdFx0XHRcdG1zZyxcblx0XHRcdFx0XHRjbG9zZUJ1dHRvblRleHQsXG5cdFx0XHRcdFx0Y2xvc2VCdXR0b25DbGlja0Z1bmMsXG5cdFx0XHRcdFx0b2tCdXR0b25UZXh0LFxuXHRcdFx0XHRcdG9rQnV0dG9uQ2xpY2tGdW5jXG5cdFx0XHRcdH0gPSBvcHRpb25zO1xuXHRcdFx0dmFyIGRvbSA9IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuXHRcdDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG5cdFx0XHQ8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG5cdFx0XHQ8cCBjbGFzcz1cImRlc2NcIj5cblx0XHRcdFx0JHttc2cgPyBgJHttc2d9YCA6IGBgfVxuXHRcdFx0PC9wPlxuXHRcdFx0PGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBjbG9zZVwiPiR7Y2xvc2VCdXR0b25UZXh0ID8gY2xvc2VCdXR0b25UZXh0IDogXCLri6vquLBcIn08L2J1dHRvbj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIj4ke29rQnV0dG9uVGV4dCA/IG9rQnV0dG9uVGV4dCA6IFwi7ZmV7J24XCJ9PC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiYmxpbmRcIj7ri6vquLA8L3NwYW4+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+YDtcblx0XHRcdHZhciBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcblx0XHRcdFx0Y29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0Y29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1sYXllcicpO1xuXHRcdFx0Y29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcblx0XHRcdGJvZHkuYXBwZW5kQ2hpbGQoICBjb25maXJtTGF5ZXIgKTtcblx0XHRcdHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1sYXllcicpO1xuXHRcdFx0dGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jLCBjbG9zZUJ1dHRvbkNsaWNrRnVuYyApO1xuXHRcdH0sXG5cdFx0ZXZlbnRFeGVjdXRlOiBmdW5jdGlvbiggb2tCdXR0b25DbGlja0Z1bmMsIGNsb3NlQnV0dG9uQ2xpY2tGdW5jICl7XG5cdFx0XHR2YXIgc2NvcGUgPSB0aGlzLnNjb3BlLFxuXHRcdFx0XHRidXR0b25zID0gWydvaycsICdjbG9zZScsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApICk7XG5cdFx0XHRidXR0b25zLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KXtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0aWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ29rJykgPiAtMSAmJiB0eXBlb2Ygb2tCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuXHRcdFx0XHRcdFx0b2tCdXR0b25DbGlja0Z1bmMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ2Nsb3NlJykgPiAtMSAmJiBpbmRleCA9PSAxICYmIHR5cGVvZiBjbG9zZUJ1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG5cdFx0XHRcdFx0XHRjbG9zZUJ1dHRvbkNsaWNrRnVuYygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdGJlYXV0eW51cy5jb25maXJtID0gY29uZmlybTtcblxuXHR2YXIgYWxlcnQgPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXHRcdFx0dGhpcy5tYWtlRG9tKCBvcHRpb25zICk7XG5cdFx0fSxcblx0XHRtYWtlRG9tOiBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0XHRcdHZhciB7XG5cdFx0XHRcdFx0dGl0bGUsXG5cdFx0XHRcdFx0bXNnLFxuXHRcdFx0XHRcdG9rQnV0dG9uVGV4dCxcblx0XHRcdFx0XHRva0J1dHRvbkNsaWNrRnVuY1xuXHRcdFx0XHR9ID0gb3B0aW9ucztcblx0XHRcdHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cblx0PGRpdiBjbGFzcz1cImNvbmZpcm1cIj5cblx0XHQ8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG5cdFx0PHAgY2xhc3M9XCJkZXNjXCI+XG5cdFx0XHQke21zZyA/IGAke21zZ31gIDogYGB9XG5cdFx0PC9wPlxuXHRcdDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIG9rXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cblx0XHQ8L2Rpdj5cblx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1jbG9zZVwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJibGluZFwiPuuLq+q4sDwvc3Bhbj5cblx0XHQ8L2J1dHRvbj5cblx0PC9kaXY+XG48L2Rpdj5gO1xuXHRcdFx0dmFyIGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpLFxuXHRcdFx0XHRjb25maXJtTGF5ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb25maXJtTGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbGVydC1sYXllcicpO1xuXHRcdFx0Y29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcblx0XHRcdGJvZHkuYXBwZW5kQ2hpbGQoIGNvbmZpcm1MYXllciApO1xuXHRcdFx0dGhpcy5zY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1sYXllcicpO1xuXHRcdFx0dGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jICk7XG5cdFx0fSxcblx0XHRldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYyApe1xuXHRcdFx0Y29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpKTtcblx0XHRcdHZhciBzY29wZSA9IHRoaXMuc2NvcGU7XG5cdFx0XHRcblx0XHRcdFsnb2snLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpe1xuXHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignb2snKSA+IC0xICYmIHR5cGVvZiBva0J1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG5cdFx0XHRcdFx0XHRva0J1dHRvbkNsaWNrRnVuYygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmVhdXR5bnVzLmFsZXJ0ID0gYWxlcnQ7XG5cblx0d2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpIHtcblxuXHR2YXIgdXRpbCA9IHVpLnV0aWwsXG5cdFx0Y29tbW9uID0gdWkuY29tbW9uLFxuXHRcdGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG5cdGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG5cdGNvbW1vbi50YWJsZUZhZGUoKTtcblxuXHQkKCdib2R5JykuYWRkQ2xhc3MoW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpKTtcblxuXHRiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuXHQvLyBjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCkge1xuXHQvLyAgICAgLy9jYWxsYmFja3Ncblx0Ly8gfSk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAobG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSkge1xuXHRcdGRldi5hcHBlbmRNZW51TGlzdCgpO1xuXHRcdGRldi5hcHBlbmRNZW51QnRuKCk7XG5cdH1cbn0pO1xuXG4vKlxuICpcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4gKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcblxuXHR2YXIgY291bnQgPSAwO1xuXG5cdGlmICggQXJyYXkuaXNBcnJheSggaW1nICkgJiYgdHlwZW9mIGltZyApIHtcblxuXHRcdGltZy5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpbmRleCl7XG5cdFx0XHR2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0XHRpbWFnZXMuc3JjID0gaW1nO1xuXHRcdFx0aW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nICYmIGNvdW50ID09IGltZy5sZW5ndGgpIGNhbGxiYWNrKGltYWdlcyk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICggdHlwZW9mIGltZyA9PSAnc3RyaW5nJyApIHtcblx0XHR2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1hZ2VzLnNyYyA9IGltZztcblx0XHRpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhpbWFnZXMpO1xuXHRcdH0sIGZhbHNlKTtcblx0fVxuXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IFt3aW4sIGRvYywgcXNhLCBxc10gPSBbd2luZG93LCBkb2N1bWVudCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnLCAncXVlcnlTZWxlY3RvciddO1xuXG5jb25zdFxuXHRkb20gXHQ9IHMgPT4gZG9jdW1lbnRbcXNdKHMpLFxuXHRkb21BbGwgXHQ9IHMgPT4gZG9jdW1lbnRbcXNhXShzKSxcblx0bWFrZURvbSA9IChzLCBhdHRyKSA9PiB7XG5cdFx0dmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocylcblx0XHRpZiAoIHR5cGVvZiBhdHRyID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA+IDAgKVxuXHRcdFx0Zm9yICggbGV0IGkgaW4gYXR0ciApXG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoaSwgYXR0cltpXSk7XG5cdFx0cmV0dXJuIGRvbTtcblx0fSxcblx0cHV0VGV4dCA9IHMgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyksXG5cdHByZXBlbmQgPSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRhcmdldC5jaGlsZE5vZGVzWzBdKSxcblx0YXBwZW5kIFx0PSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzte2GtVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64K07Jqp7J20IOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vbm8tcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwiY29uZmlybSwgYWxlcnRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb25maWcvbG9jYXRpb25TZXJ2aWNlQWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLruIzrnpzrk5zrqZTsnbhcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l7KCV67O0XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66ek7J6l7IaM7IudXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVJbmZvL3N0b3JlTmV3cy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrsLHtmZTsoJDtlonsgqwoU2FtcGxlKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlRXZlbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l67Cp66y47ZuE6riwXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvdmlzaXRvcnNCb29rRGV0YWlsLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuppOuyhOyJvVwiLFxuXHRcdGRlcHRoMjogXCLsnbTsmqnslb3qtIBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLshJzruYTsiqQg7J207Jqp7JW96rSAICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9zZXJ2aWNlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuqwnOyduOygleuztCDsspjrpqzrsKnsuaggKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3BlcnNvbmFsSW5mb21hdGlvbi5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsnITsuZjquLDrsJjshJzruYTsiqQg7J207Jqp7JW96rSAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L2xvY2F0aW9uQmFzZWQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsnbTrsqTtirgm7ZaJ7IKsXCIsXG5cdFx0ZGVwdGgyOiBcIuynhO2WieykkeyduCDsnbTrsqTtirhcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDsnbzrsJhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7Zek652866mU7J207YGs7JeF7Ie8XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3SGVyYS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuLqOydvOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX3NpbmdsZVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuzteyImOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX211bHRpU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7JmE66OMKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxDb21wbGV0ZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyiheujjCDtm4Qg7ZmV7J24KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfZmluaXNoLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyYiOyVvSDsi5wgLSDqsJzsnbjsoJXrs7Qg7IiY7KeRIOuwjyDsnbTsmqnslYjrgrRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9yZXNlcnZhdGlvbi9hZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsv6Dtj7DrtoFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY291cG9uQm9vay9kZXRhaWwuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrt7Dti7Dsu6jthZDsuKBcIixcblx0XHRkZXB0aDI6IFwi66qp66GdXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L2NhcmRUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo64+Z7JiB7IOB7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvbW92aWVUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiOygleuztFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdEluZm8vdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdFJldmlldy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi6rOg6rCd7IS87YSwXCIsXG5cdFx0ZGVwdGgyOiBcIuqzteyngOyCrO2VrVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuqqeuhnSArIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL25vdGljZS9saXN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi64+E7JuA66eQXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuplOyduFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL2hlbHAvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTpcIuuniOydtO2OmOydtOyngFwiICxcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOuTseq4iVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9ncmFkZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuu4jOuenOuTnOuzhCDrp6TsnqXshKDtg51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2Uvc2VsZWN0U3RvcmUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg7L+g7Y+wXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2NvdXBvbi9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7AgLSDrsKnrrLjtm4TquLBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvdmlzaXRvcnNCb29rLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7AgLSDsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rSA7Ius7IOB7ZKIXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3Byb2R1Y3RPZkludGVyZXN0L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuq1rOunpO2YhO2ZqVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuumrOyKpO2KuChwb3B1cCDtj6ztlagpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3B1cmNoYXNlL3BlcmlvZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyXlOygpO2Goe2GoVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjIDtmZTtmZTrqbRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9lbmdlbFRhbGsvdGFsa19pbnF1aXJ5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fVxuXHRcdF1cblx0fVxuXG5dO1xuXG52YXIgbWVudUxpc3QgPSBtZW51RGF0YS5yZWR1Y2UoKHAsIGMpID0+IHtcblx0bGV0IHtkZXB0aDEsIGRlcHRoMiwgbGlua3N9ID0gYztcblx0cmV0dXJuIGAke3AgfHwgJyd9XG5cdCR7ZGVwdGgxID8gYDxoMj48c3Bhbj4ke2RlcHRoMX08L3NwYW4+PC9oMj5gIDogYGB9XG5cdCR7ZGVwdGgyID09ICcnID8gZGVwdGgyIDogYDxoMz48c3Bhbj4ke2RlcHRoMn08L3NwYW4+PC9oMz5gfVxuXHQ8dWw+JHtsaW5rcy5yZWR1Y2UoKGlwLCBpYykgPT4ge1xuXHRcdFx0bGV0IHt0aXRsZSwgaHJlZiwgY29tcGxldGV9ID0gaWM7XG5cdFx0XHRyZXR1cm4gYCR7aXAgfHwgXCJcIn1cblx0XHQ8bGkke2NvbXBsZXRlID8gJyBjbGFzcz1cImNwXCInIDogXCJcIn0+PGEgaHJlZj1cIiR7aHJlZn1cIj4ke3RpdGxlfTwvYT48L2xpPmB9LCAwKX1cblx0PC91bD5cblx0YFxufSwgMCk7XG5cbi8vIOuplOuJtCDrsoTtirwg7IK97J6FXG53aW5kb3cuZGV2ID0ge1xuXHRhcHBlbmRNZW51QnRuOiBmdW5jdGlvbigpe1xuXHRcdHZhciBtZW51VHJpZ2dlciA9IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1lbnUtdHJpZ2dlclwiPlxuXHQ8c3Bhbj50b2dnbGUgbWVudTwvc3Bhbj5cbjwvYnV0dG9uPmA7XG5cdFxuXHRcdFx0aWYgKCAkKCdidXR0b24ubWVudS10cmlnZ2VyJykubGVuZ3RoIDw9IDApIHtcblx0XHRcdFx0JCgnI21lbnUnKS5wcmVwZW5kKG1lbnVUcmlnZ2VyKTtcblx0XHRcdH1cblx0XG5cdFx0XHQkKCcubWVudS10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgbWVudUxpc3QgPSAkKCcjbWVudS1saXN0JyksXG5cdFx0XHRcdCAgICBjdHJsQ2xhc3MgPSAnaXMtYWN0aXZlJyxcblx0XHRcdFx0ICAgIGNvbmRpdGlvbiA9IG1lbnVMaXN0Lmhhc0NsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0aWYgKGNvbmRpdGlvbikge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5yZW1vdmVDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLmFkZENsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvLyDrqZTribQg66as7Iqk7Yq4IOyCveyehVxuXHQsYXBwZW5kTWVudUxpc3Q6IGZ1bmN0aW9uKCl7XG5cblx0XHRpZiAoICQoJyNtZW51JykubGVuZ3RoIDw9IDAgKSB7XG5cdFx0XHRtZW51TGlzdCA9ICQoJzxkaXYgaWQ9bWVudSAvPicpLmFwcGVuZCggJCgnPGRpdiBpZD1tZW51LWxpc3QgY2xhc3M9b3ZlcnRocm93IC8+JykuYXBwZW5kKCBtZW51TGlzdCApICk7XG5cdFx0XHQkKCcjd3JhcCcpLmxlbmd0aCA8PSAwID8gJCgnYm9keScpLnByZXBlbmQoIG1lbnVMaXN0ICkgOiAkKCcjd3JhcCcpLnByZXBlbmQoIG1lbnVMaXN0ICk7XG5cdFx0fVxuXHRcdCQoJyNtZW51LWxpc3QnKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFIUkVGID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cdFx0XHRpZiAoIGFIUkVGLmluZGV4T2YoJz9kZXYnKSA8PSAtMSApIHtcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdocmVmJywgYUhSRUYgKyAnP2RldicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdCxkaW1tOiBmdW5jdGlvbihtc2cpe1xuXHRcdG1zZyA9IG1zZyB8fCAn64K07Jqp7J20IOyXhuyKteuLiOuLpC4nO1xuXHRcdCQoJ2JvZHknKS5hcHBlbmQoXG5cdFx0XHQkKCc8ZGl2IGNsYXNzPVwiZGltbVwiIC8+JykuYXBwZW5kKFxuXHRcdFx0XHQkKGA8c3Bhbj4ke21zZ308c3Bhbi8+PGJ1dHRvbiBjbGFzcz1cImNsb3NlXCI+W+uLq+q4sF08L3NwYW4+PC9idXR0b24+YClcblx0XHRcdClcblx0XHQpO1xuXHRcdCQoJy5kaW1tJykub24oJ2NsaWNrJywgJy5jbG9zZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZGltbScpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9kZXYuanNcbiAqKi8iLCIvKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTYuMTFcbipcdG5ldHdvcmtTdGF0ZSB7IG51bWJlciB9XG4qIFx0MCA9IE5FVFdPUktfRU1QVFkgLSBhdWRpby92aWRlbyBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkXG4qXHQxID0gTkVUV09SS19JRExFIC0gYXVkaW8vdmlkZW8gaXMgYWN0aXZlIGFuZCBoYXMgc2VsZWN0ZWQgYSByZXNvdXJjZSwgYnV0IGlzIG5vdCB1c2luZyB0aGUgbmV0d29ya1xuKlx0MiA9IE5FVFdPUktfTE9BRElORyAtIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgZGF0YVxuKlx0MyA9IE5FVFdPUktfTk9fU09VUkNFIC0gbm8gYXVkaW8vdmlkZW8gc291cmNlIGZvdW5kXG4qXG4qXHRyZWFzeVN0YXRlIHsgbnVtdmVyIH1cbipcdDAgPSBIQVZFX05PVEhJTkcgLSBubyBpbmZvcm1hdGlvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcdFxuKlx0MSA9IEhBVkVfTUVUQURBVEEgLSBtZXRhZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG4qXHQyID0gSEFWRV9DVVJSRU5UX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpcyBhdmFpbGFibGUsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lL21pbGxpc2Vjb25kXG4qXHQzID0gSEFWRV9GVVRVUkVfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IGFuZCBhdCBsZWFzdCB0aGUgbmV4dCBmcmFtZSBpcyBhdmFpbGFibGVcbipcdDQgPSBIQVZFX0VOT1VHSF9EQVRBIC0gZW5vdWdoIGRhdGEgYXZhaWxhYmxlIHRvIHN0YXJ0IHBsYXlpbmdcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG5cdC8vd3JhcHBlciwgZW5kZWRDYWxsYmFja1xuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIFZpZGVvUGxheWVyKSApIHJldHVybiBuZXcgVmlkZW9QbGF5ZXIod3JhcHBlciwgZW5kZWRDYWxsYmFjayk7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMud3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVswXTtcblx0dGhpcy5oaWdoUmVzIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpWzFdO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAoIGZ1bmN0aW9uKCkge1xuXHRcdGlmICggb3B0aW9ucy5zdGFydFRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbiApIHJldHVybiAwO1xuXHRcdHZhciBzdGFydFRpbWUgPSBvcHRpb25zLnN0YXJ0VGltZSA/IE51bWJlcihvcHRpb25zLnN0YXJ0VGltZSkgOiAwO1xuXHRcdHJldHVybiBzdGFydFRpbWU7XG5cdH0pKCk7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMubW9iaWxlTmV0d29ya1x0PSBvcHRpb25zLm1vYmlsZU5ldHdvcms7XG5cdHRoaXMuYWxlcnRNb2JpbGVcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tb2JpbGUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2Ygb3B0aW9ucy5lbmRlZENhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblx0dGhpcy5wdXNoVGltZSA9IHR5cGVvZiBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50aW1ldXBkYXRlQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHt9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX3VubG9hZCgpO1xuXHR0aGlzLl9zaXplKCk7XG5cdHRoaXMuX2luaXQoKTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblxuXHRbdGhhdC5wbGF5QnRuLCB0aGF0LnBhdXNlQnRuXS5mb3JFYWNoKCBmdW5jdGlvbihidG4sIGluZGV4KSB7XG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGF0LmFkZEtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSk7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cblx0XHRpZiAoIHRoYXQubW9iaWxlTmV0d29yayApIHtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29yayA9IGZhbHNlO1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrQ2hlY2soKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhhdC5fcGxheSgpO1xuXHRcdH1cblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9zaXplID0gZnVuY3Rpb24oKSB7XG5cdHZhciB3ID0gTWF0aC5yb3VuZCggdGhpcy53cmFwcGVyLmNsaWVudFdpZHRoICksXG5cdFx0aCA9IDA7XG5cdGggPSAoOSAqIHcpIC8gMTY7XG5cdHRoaXMud3JhcHBlci5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fdW5sb2FkID0gZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LmJvZHkub251bmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZygncGFnZSBtb3ZlJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubW9iaWxlTmV0d29ya0NoZWNrID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRhbGVydCA9IHRoYXQuYWxlcnRNb2JpbGU7XG5cdHRoYXQuYWRkS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0YWxlcnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm9rJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSBudWxsO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIFxuXHRcdFx0diA9IHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0Ly8gaWYgKCB0aGF0LmN1clRpbWUgKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lOyBcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdC8vIGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0di5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2Fkc3RhcnQnLiB2KTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9hZGVkZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRtZXRhZGF0YSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZGVkbWV0YWRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblxuXHRcdGRvY3VtZW50Lm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiAmJiB2LmVuZGVkICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBjaGFuZ2UgOiB6b29tIGluJyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXG5cdHRoYXQudmlkZW8ub25jdWVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdH07XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQucG9zdGVyLCAnaGlkZScgKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdFx0Y29uc29sZS5sb2coJ29ucGxheScpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25jYW5wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5wYXVzZUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wbGF5QnRuLCAnaGlkZScgKTtcblx0XHRjb25zb2xlLmxvZygnb25jYW5wbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdFx0Y29uc29sZS5sb2coJ29ucGxheWluZycpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQucGF1c2VCdG4sICdoaWRlJyApO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQucGxheUJ0biwgJ2hpZGUnICk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmFkZEtsYXNzKHRoYXQuYnRuR3JvdXAsICdoaWRlJyk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHRpZiAoIHYuZW5kZWQgKSB7XG5cdFx0XHRpZiAoIHYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdHRoYXQudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cblx0XHRcdFx0aWYgKCB2LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDEpO1xuXHRcdFx0XHRcdHYuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggdi53ZWJraXRFeGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygyKTtcblx0XHRcdFx0XHR2LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMyk7XG5cdFx0XHRcdFx0ZG9jdW1ldC5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LndlYmtpdEV4aXRGdWxsc2NyZWVuICl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coNCk7XG5cdFx0XHRcdFx0ZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIHYuZW5kZWQgKSB0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdH1cblxuXHRcdH1cblx0XHRjb25zb2xlLmxvZygnb25wYXVzZScpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbihlcnJvclR5cGUpIHtcblx0Ly8gaWYgKCBuZXR3b3JrU3RhdGUgPT0gIClcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0cHYgPSAwO1xuXHR2Lm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggdi5wYXVzZWQgKSByZXR1cm47XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuXHRcdC8vIDXstIjrp4jri6Qg7Iuc6rCE7LK07YGsXG5cdFx0aWYgKHB2ICE9IE1hdGgucm91bmQodi5jdXJyZW50VGltZSkgJiYgIE1hdGgucm91bmQodi5jdXJyZW50VGltZSkgJSA1ID09IDAgKSB7XG5cdFx0XHQvLyDtmITsnqzsi5zqsITsnYQgNeuhnCDrgpjriITslrQg64KY66i47KeA66W8IOq1rO2VmOqzoCDqt7gg64KY66i47KeA6rCAIDXrs7Tri6Qg7J6R7Jy866m0IOyYrOumvCwg6rCZ6rGw64KYIO2BrOuptCDrsoTrprxcblx0XHRcdHRoYXQucHVzaFRpbWUoIE1hdGhbICh2LmN1cnJlbnRUaW1lICUgNSkgPCA1ID8gJ2NlaWwnIDogJ2Zsb29yJyBdKHYuY3VycmVudFRpbWUpwqApO1xuXHRcdFx0cHYgPSBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpO1xuXHRcdH1cblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuYnRuR3JvdXAsICdoaWRlJyApO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQudGltZWxpbmUsICdoaWRlJyApO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ3JlbW92ZS10aW1lJyApO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC5wYXVzZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0aGF0LmN1clRpbWUgPSB0aGF0LnZpZGVvLmN1cnJlbnRUaW1lO1xuXHRcdHRoYXQucGxheVBhdXNlKCk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5wbGF5QnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LnBhdXNlQnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LmJnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6ICggZXZlbnQsIHVpICkgPT4ge1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6ICggZXZlbnQsIHVpICkgPT4ge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiAoZXZlbnQsIHVpKSA9PiB7XG5cdH0sXG5cdHN0b3A6IChldmVudCwgdWkpID0+IHtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0XHQ9IHRoaXMsXG5cdFx0YnRuR3JvdXAgXHQ9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzIFx0XHQ9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgXHQ9IHRoaXMuaGlnaFJlcyxcblx0XHR1YSBcdFx0XHQ9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxcblx0XHRzdHlsZXNcdFx0PSB7XG5cdFx0XHRzaG93OiBbe2Rpc3BsYXk6ICdibG9jaycsIG9wYWNpdHk6IDF9XSxcblx0XHRcdGhpZGU6IFt7ZGlzcGxheTogJ25vbmUnLCBvcGFjaXR5OiAwfV1cblx0XHR9LFxuXHRcdGNob2ljZSA9ICggZWwgKSA9PiB7XG5cdFx0XHR2YXIgc2hvd0VsLCBoaWRlRWw7XG5cdFx0XHRpZiAoIGVsID09ICdsb3cnIClcblx0XHRcdFx0c2hvd0VsID0gbG93UmVzLCBoaWRlRWwgPSBoaWdoUmVzO1xuXHRcdFx0ZWxzZSBpZiAoIGVsID09ICdoaWdoJyApXG5cdFx0XHRcdGhpZGVFbCA9IGxvd1Jlcywgc2hvd0VsID0gaGlnaFJlcztcblxuXHRcdFx0Ly8gZm9yICggdmFyIHZpIGluIGxvd1JlcyApIHtcblx0XHRcdC8vIFx0Y29uc29sZS5sb2codmkpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Y29uc29sZS5kaXIobG93UmVzKTtcblxuXHRcdFx0c3R5bGVzLnNob3cuZm9yRWFjaCgoYywgaSkgPT4ge1xuXHRcdFx0XHRzaG93RWwuc3R5bGVbT2JqZWN0LmtleXMoYylbMV1dID0gY1tPYmplY3Qua2V5cyhjKVsxXV07XG5cdFx0XHR9KTtcblx0XHRcdHNob3dFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0XHRzaG93RWwuc2V0QXR0cmlidXRlKCdzcmMnLCBzaG93RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcblxuXHRcdFx0c3R5bGVzLmhpZGUuZm9yRWFjaCgoYywgaSkgPT4ge1xuXHRcdFx0XHRoaWRlRWwuc3R5bGVbT2JqZWN0LmtleXMoYyldID0gY1tPYmplY3Qua2V5cyhjKV07XG5cdFx0XHR9KTtcblx0XHRcdGhpZGVFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdFx0XG5cdFx0XHR0aGF0LnZpZGVvID0gc2hvd0VsO1xuXHRcdH0sXG5cdFxuXHRjb25kaXRpb24gPSBidG5Hcm91cC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aXZlJykuY2xhc3NOYW1lLmluZGV4T2YoJ2xvdycpID4gLTEgPyAnbG93JyA6ICdoaWdoJztcblx0Y2hvaWNlKCBjb25kaXRpb24gKTtcblxuXHQgLy8gaWYgKCB1YS5pbmRleE9mKCdhbmRyb2lkIDQuMicpID4gLTEgfHwgdWEuaW5kZXhPZignYW5kcm9pZCA0LjMnKSA+IC0xICkge1xuXHQgLy8gXHQkKHRoYXQudmlkZW8pLmFwcGVuZCgnPHNvdXJjZSBzcmM9XCJcIj48L3NvdXJjZT4nKTtcblx0IC8vIFx0JCh0aGF0LnZpZGVvKS5maW5kKCdzb3VyY2UnKS5hdHRyKCdzcmMnLCAkKHRoYXQudmlkZW8pLmRhdGEoJ3NyYycpKTtcblx0IC8vIH1cblxuXHRyZXR1cm4gdGhhdC52aWRlbztcblx0Ly8gdGhhdC52ZXJpZnlpbmcoIHRoYXQudmlkZW8gKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS52ZXJpZnlpbmcgPSBmdW5jdGlvbih2KSB7XG5cdGNvbnNvbGUubG9nKHYubmV0d29ya1N0YXRlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uICh1aSkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0bSwgcztcblxuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jdXJUaW1lID0gdi5jdXJyZW50VGltZTtcblx0bSA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lIC8gNjApICkudG9TdHJpbmcoKTtcblx0cyA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lICUgNjApICkudG9TdHJpbmcoKTtcblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gKG0ubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtKSAgKyAnOicgKyAocy5sZW5ndGggPCAyID8gJzAnICsgcyA6IHMpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oc2Vlaykge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuXHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRjb25zb2xlLmxvZyhcImN1cnJlbnRUaW1lXCIsIHYuY3VycmVudFRpbWUpO1xuXG5cdGZvciAoIHZhciB2aSBpbiB2ICkge1xuXHRcdGNvbnNvbGUubG9nKHZpKTtcblx0fVxuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0aWYodGhhdC5jdXJUaW1lKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHR2LnN0YXJ0VGltZSA9IHRoYXQuY3VyVGltZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0di5wbGF5KCk7XG5cdH0gZWxzZSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdGJnID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJnJyk7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXHR0aGF0LmdldER1cmF0aW9uKCk7XG5cdGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2ljby9pY29fZnVsbHNjcmVlbi5wbmcnKTsgLy/soITssrTtmZTrqbQg67KE7Yq8IOydtOuvuOyngCDroZzrjZRcblx0aW1hZ2VQcmVsb2FkZXIoYmcsIGZ1bmN0aW9uKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdFx0aW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdFx0aW1nVyAtPSAoaW1nVyowLjAyNSk7XG5cdFx0XHRcdFx0aW1nSCAtPSAoaW1nSCowLjAyNSk7XG5cdFx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgMTAwMC82MClcblx0XHR9LCAzMDApO1xuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUudG9TdHJpbmcoKS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUudG9TdHJpbmcoKS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy92aWRlby1wbGF5ZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9