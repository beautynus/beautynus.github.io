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
	
	            var dom = '<div class="wrapper">\n        <div class="confirm">\n            <h3 class="title"><span>' + title + '</span></h3>\n            <p class="desc">\n                ' + (msg ? '' + msg : '') + '\n            </p>\n            <div class="btn-group">\n                <button type="button" class="btn close">' + (closeButtonText ? closeButtonText : "닫기") + '</button>\n                <button type="button" class="btn ok">' + (okButtonText ? okButtonText : "확인") + '</button>\n            </div>\n            <button type="button" class="btn-close">\n                <span class="blind">닫기</span>\n            </button>\n        </div>\n    </div>';
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
	
	            var dom = '<div class="wrapper">\n    <div class="confirm">\n        <h3 class="title"><span>' + title + '</span></h3>\n        <p class="desc">\n            ' + (msg ? '' + msg : '') + '\n        </p>\n        <div class="btn-group">\n            <button type="button" class="btn ok" style="width: 100%">' + (okButtonText ? okButtonText : "확인") + '</button>\n        </div>\n        <button type="button" class="btn-close">\n            <span class="blind">닫기</span>\n        </button>\n    </div>\n</div>';
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
		this.curTime = function (_) {
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
		this.endedCallback = typeof options.endedCallback == 'function' ? options.endedCallback : function (_) {
			console.warn('endedCallback type is not a function.');
		};
		this.pushTime = typeof options.timeupdateCallback == 'function' ? options.timeupdateCallback : function (_) {};
	
		this.posterLoaded();
		this._unload();
		this._size();
		this._init();
	};
	
	VideoPlayer.prototype._init = function (_) {
		var that = undefined;
	
		that.addKlass(that.loadingElement, "active");
	
		[that.playBtn, that.pauseBtn].forEach(function (btn, index) {
			btn.addEventListener('touchstart', function (_) {
				that.addKlass(undefined, 'mousedown');
			}, false);
	
			btn.addEventListener('touchend', function (_) {
				that.removeKlass(undefined, 'mousedown');
			}, false);
		});
	
		that.playBtn.addEventListener('click', function (_) {
	
			if (that.mobileNetwork) {
				that.mobileNetwork = false;
				that.mobileNetworkCheck();
			} else {
				that._play();
			}
		}, false);
	};
	
	VideoPlayer.prototype._size = function (_) {
		var w = Math.round(undefined.wrapper.clientWidth),
		    h = 0;
		h = 9 * w / 16;
		undefined.wrapper.style.height = Math.round(h) + 'px';
	};
	
	VideoPlayer.prototype._unload = function (_) {
		document.body.onunload = function (_) {
			console.log('page move');
		};
	};
	
	VideoPlayer.prototype.mobileNetworkCheck = function (_) {
		var that = undefined,
		    alert = that.alertMobile;
		that.addKlass(alert, 'active');
		that.addKlass(that.control, 'hide');
		alert.querySelector('button.ok').addEventListener('click', function (_) {
			that._play();
			that.removeKlass(alert, 'active');
		}, false);
	};
	
	VideoPlayer.prototype._play = function (_) {
		var that = undefined,
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
	
			v.onload = function (_) {
				console.log('onload', v.networkState);
			};
			v.onloadstart = function (_) {
				console.log('onloadstart'.v);
			};
			v.onloadeddata = function (_) {
				console.log('loadeddata', v.networkState);
			};
			v.onloadedmetadata = function (_) {
				console.log('onloadedmetadata', v.networkState);
			};
	
			document.onwebkitfullscreenchange = function (_) {
				if (!v.webkitDisplayingFullscreen && v.ended) {
					console.log('fullscreen change : zoom in');
					setTimeout(function (_) {
						that.endedCallback();
					}, 1000);
				}
			};
		}
		that.playPause();
	
		that.video.oncuechange = function (_) {
			console.log('cuechange');
		};
	};
	
	VideoPlayer.prototype._onPlay = function (_) {
		var that = undefined;
	
		that.video.onplay = function (_) {
			that.addKlass(that.poster, 'hide');
			if (undefined.currentTime != 0) that.controlVisibling(true);
			that.playPauseFlag = 'play';
			console.log('onplay');
		};
	
		that.video.oncanplay = function (_) {
			that.removeKlass(that.pauseBtn, 'hide');
			that.addKlass(that.playBtn, 'hide');
			console.log('oncanplay');
		};
	
		that.video.onplaying = function (_) {
			that.removeKlass(that.loadingElement, "active");
			console.log('onplaying');
		};
	};
	
	VideoPlayer.prototype._onPause = function (_) {
		var that = undefined,
		    v = that.video;
		that.video.onpause = function (_) {
			that.removeKlass(that.control, 'hide');
			that.addKlass(that.pauseBtn, 'hide');
			that.removeKlass(that.playBtn, 'hide');
			if (undefined.currentTime > 0) that.addKlass(that.btnGroup, 'hide');
			that.controlVisibling(false);
			if (v.ended) {
				if (v.webkitDisplayingFullscreen) {
					that.video.addEventListener('webkitendfullscreen', function (_) {
						var v = that.video;
						that.endedCallback();
					}, false);
					document.addEventListener('webkitendfullscreen', function (_) {
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
		var that = undefined;
		var target = 0;
		target = Math.round(y * l / x);
		return target;
	};
	
	VideoPlayer.prototype.getDuration = function (_) {
		var that = undefined;
		var video = $(that.wrapper).find('video:visible').eq(0).get(0);
		var timer = setInterval(function (_) {
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
		var that = undefined,
		    wrapper = that.wrapper;
		wrapper.style.height = that.getRatio(v.videoWidth, v.videoHeight, v.clientWidth) + 'px';
	};
	
	VideoPlayer.prototype._onTimeUpdate = function (_) {
		var that = undefined,
		    v = that.video,
		    pv = 0;
		v.ontimeupdate = function (_) {
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
	
	VideoPlayer.prototype._click = function (_) {
		var that = undefined;
		that.video.addEventListener('click', function () {
			that.addKlass(that.btnGroup, 'hide');
			that.removeKlass(that.timeline, 'hide');
			that.addKlass(that.control, 'remove-time');
			that.removeKlass(that.control, 'hide');
			that.controlVisibling(true);
		}, false);
	};
	
	VideoPlayer.prototype._pause = function (_) {
		var that = undefined;
		that.pauseBtn.addEventListener('click', function () {
			that.curTime = that.video.currentTime;
			that.playPause();
			that.removeKlass(that.playBtn, 'hide');
			that.addKlass(that.pauseBtn, 'hide');
			that.playPauseFlag = 'pause';
		});
	};
	
	VideoPlayer.prototype.dimmClick = function (_) {
		var that = undefined;
		that.bg.addEventListener('click', function () {
			that.controlVisibling(false);
			that.addKlass(that.control, 'hide');
		}, false);
	};
	
	VideoPlayer.prototype.controlEvent = function (_) {
		var that = undefined;
		$(that.control).on({
			'mousdown touchstart': function mousdownTouchstart(_) {
				// that.controlVisibling(false);
			},
			'mouseup touchend touchcancel': function mouseupTouchendTouchcancel(_) {
				// that.controlVisibling(true);
			}
		});
	};
	
	VideoPlayer.prototype.makeSeekbar = function (_) {
		var that = undefined,
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
	
	VideoPlayer.prototype._fullscrrenMode = function (_) {
		var that = undefined,
		    v = that.video;
		$(that.fullBtn).on('click', function (_) {
			if (ui.util.isDevice().ios) {
				if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysInline == true) v.webkitPlaysInline = false;
				if (typeof v.playsInline !== 'undefined' && v.playsinline == true) v.playsInline = true;else if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysinline == true) v.webkitPlaysInline = true;
			}
			if (v.requestFullscreen) v.requestFullscreen();else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
		});
	};
	
	VideoPlayer.prototype.resolutionChoice = function (_) {
		var that = undefined,
		    btnGroup = undefined.btnGroup,
		    lowRes = undefined.lowRes,
		    highRes = undefined.highRes,
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
		var that = undefined,
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
		var that = undefined,
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
		var that = undefined;
		clearTimeout(that.controlTimer);
		if (ctrl) {
			that.controlTimer = setTimeout(function (_) {
				that.addKlass(that.control, 'hide');
			}, 2000);
		} else {
			clearTimeout(that.controlTimer);
			that.removeKlass(that.control, 'hide');
		}
	};
	
	VideoPlayer.prototype.playPause = function (_) {
		var that = undefined,
		    v = that.video;
	
		console.log('=======', v.currentTime);
	
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
	
	VideoPlayer.prototype.posterLoaded = function (_) {
		var that = undefined,
		    bg = "",
		    el = that.poster.querySelector('.img'),
		    src = '';
		bg = el.getAttribute('data-bg');
	
		var canvasTag = document.createElement('canvas');
		canvasTag.id = "videoPoster";
		that.poster.appendChild(canvasTag);
		that.getDuration();
		imagePreloader(bg, function (_) {
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
	
			timeout = setTimeout(function (_) {
				interval = setInterval(function (_) {
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
		if (target.className.indexOf(klass) > -1) return;
		target.className += ' ' + klass;
	};
	
	VideoPlayer.prototype.removeKlass = function (target, klass) {
		var regexp = new RegExp(klass);
		target.className = ui.util.trim(target.className.replace(regexp, ""));
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTZmNzJiZmY1ZDViMGZiYTg0YmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJjbG9zZUJ1dHRvbkNsaWNrRnVuYyIsIm9rQnV0dG9uVGV4dCIsIm9rQnV0dG9uQ2xpY2tGdW5jIiwiZG9tIiwiY29uZmlybUxheWVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiZXZlbnRFeGVjdXRlIiwiYnV0dG9ucyIsIm1hcCIsImMiLCJpbmRleCIsImFycmF5IiwicmVtb3ZlQ2hpbGQiLCJhbGVydCIsImpvaW4iLCJsb2NhdGlvbiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsInNyYyIsInFzYSIsInFzIiwicyIsImRvbUFsbCIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJpcCIsImljIiwibWVudVRyaWdnZXIiLCJjdHJsQ2xhc3MiLCJjb25kaXRpb24iLCJhZGQiLCJhSFJFRiIsImRpbW0iLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJlbmRlZENhbGxiYWNrIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiIsIk51bWJlciIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJtb2JpbGVOZXR3b3JrIiwiYWxlcnRNb2JpbGUiLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInB1c2hUaW1lIiwidGltZXVwZGF0ZUNhbGxiYWNrIiwicG9zdGVyTG9hZGVkIiwiX3VubG9hZCIsIl9zaXplIiwiX2luaXQiLCJwcm90b3R5cGUiLCJhZGRLbGFzcyIsImJ0biIsInJlbW92ZUtsYXNzIiwibW9iaWxlTmV0d29ya0NoZWNrIiwiX3BsYXkiLCJ3IiwiTWF0aCIsInJvdW5kIiwiaCIsInN0eWxlIiwiaGVpZ2h0Iiwib251bmxvYWQiLCJ2IiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsIndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuIiwiZW5kZWQiLCJzZXRUaW1lb3V0IiwicGxheVBhdXNlIiwib25jdWVjaGFuZ2UiLCJvbnBsYXkiLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbmNhbnBsYXkiLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwicHYiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwidG9Mb3dlckNhc2UiLCJzdHlsZXMiLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJjaG9pY2UiLCJzaG93RWwiLCJoaWRlRWwiLCJkaXIiLCJ2ZXJpZnlpbmciLCJjdCIsImR1ciIsInNlZWsiLCJjbGVhclRpbWVvdXQiLCJjdHJsIiwidmkiLCJlIiwiY2FudmFzVGFnIiwiaWQiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiSW1hZ2UiLCJpbWdXIiwiaW1nSCIsInRpbWVvdXQiLCJpbnRlcnZhbCIsImFhIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ0b0ZpeGVkIiwiZHJhd0ltYWdlIiwia2xhc3MiLCJyZWdleHAiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7O0FBQ0E7O0FBRjhCO0FBSzlCLEtBQUlBLElBQUlDLE9BQU9ELENBQWYsQyxDQUpnQjs7QUFLaEIsS0FBSUUsTUFBTUQsTUFBVjtBQUFBLEtBQ0lFLE1BQU1DLFFBRFY7O0FBR0FILFFBQU9JLEtBQVAsR0FBZSxVQUFTQyxHQUFULEVBQWM7QUFDekIsWUFBT0MsUUFBUUMsR0FBUixDQUFZRixHQUFaLENBQVA7QUFDSCxFQUZEOztBQUlBO0FBQ0FKLEtBQUlPLEVBQUosR0FBU1IsT0FBT1EsRUFBUCxJQUFhOztBQUVsQjtBQUNBQyxXQUFNO0FBQ0Y7QUFDQUMsd0JBQWUseUJBQVcsQ0FBRTs7QUFFNUI7O0FBSkUsV0FNRkMsTUFBTSxjQUFTQyxHQUFULEVBQWM7QUFDaEIsaUJBQUlBLE9BQU8sSUFBUCxJQUFlLE9BQU9BLEdBQVAsSUFBYyxXQUFqQyxFQUE4QyxPQUFPLEVBQVA7QUFDOUMsb0JBQU9BLElBQUlDLE9BQUosQ0FBWSxZQUFaLEVBQTBCLEVBQTFCLENBQVA7QUFDSCxVQVRDO0FBVUZDLGlCQUFRLFNBQVNDLE1BQVQsQ0FBZ0JILEdBQWhCLEVBQXFCSSxLQUFyQixFQUEyQjtBQUMvQixpQkFBSUMsWUFBWSxDQUFoQjtBQUFBLGlCQUNJQyxXQUFXLEVBRGY7QUFBQSxpQkFFSUMsV0FBVyxFQUZmO0FBQUEsaUJBR0lDLElBSEo7QUFBQSxpQkFHVUMsRUFIVjs7QUFLQSxrQkFBS0Ms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TUFMRCxNQUtPO0FBQ05aLG1CQUFhYyxRQUFiO0FBQ0E7QUFDRCxLQVRVLEVBU1IsT0FBSyxFQVRHLENBQVg7QUFVQSxJQVhTLEVBV1AsR0FYTyxDQUFWO0FBYUEsR0FyQ0Q7QUFzQ0EsRUFqREQ7O0FBbURBN0ksYUFBWW1DLFNBQVosQ0FBc0JDLFFBQXRCLEdBQWlDLFVBQUV6SixNQUFGLEVBQVV5USxLQUFWLEVBQXFCO0FBQ3JELE1BQUt6USxPQUFPSSxTQUFQLENBQWlCQyxPQUFqQixDQUF5Qm9RLEtBQXpCLElBQWtDLENBQUMsQ0FBeEMsRUFBNEM7QUFDNUN6USxTQUFPSSxTQUFQLElBQW9CLE1BQU1xUSxLQUExQjtBQUNBLEVBSEQ7O0FBS0FwSixhQUFZbUMsU0FBWixDQUFzQkcsV0FBdEIsR0FBb0MsVUFBRTNKLE1BQUYsRUFBVXlRLEtBQVYsRUFBcUI7QUFDeEQsTUFBSUMsU0FBUyxJQUFJQyxNQUFKLENBQVdGLEtBQVgsQ0FBYjtBQUNBelEsU0FBT0ksU0FBUCxHQUFtQnBELEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFjNkMsT0FBT0ksU0FBUCxDQUFpQi9DLE9BQWpCLENBQTBCcVQsTUFBMUIsRUFBa0MsRUFBbEMsQ0FBZCxDQUFuQjtBQUNBLEVBSEQsQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NmY3MmJmZjVkNWIwZmJhODRiY1xuICoqLyIsImltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbmltcG9ydCAnLi9kZXYnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuaW1wb3J0ICcuL3ZpZGVvLXBsYXllcic7XG5cblxudmFyICQgPSB3aW5kb3cuJDtcbnZhciB3aW4gPSB3aW5kb3csXG4gICAgZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKG1zZykge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xufTtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuICAgIC8v7Jyg7Yu4IOuplOyEnOuTnFxuICAgIHV0aWw6IHtcbiAgICAgICAgLy8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuICAgICAgICBjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpIHt9XG5cbiAgICAgICAgLy8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcbiAgICAgICAgLFxuICAgICAgICB0cmltOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGN1dHN0cjogZnVuY3Rpb24gY3V0U3RyKHN0ciwgbGltaXQpeyAgICBcbiAgICAgICAgICAgIHZhciBzdHJMZW5ndGggPSAwLFxuICAgICAgICAgICAgICAgIHN0clRpdGxlID0gXCJcIixcbiAgICAgICAgICAgICAgICBzdHJQaWVjZSA9IFwiXCIsXG4gICAgICAgICAgICAgICAgY29kZSwgY2g7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKSxcbiAgICAgICAgICAgICAgICBjaCA9IHN0ci5zdWJzdHIoaSwxKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHN0clBpZWNlID0gc3RyLnN1YnN0cihpLDEpXG4gICAgICAgICAgICAgICAgY29kZSA9IHBhcnNlSW50KGNvZGUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgoY2ggPCBcIjBcIiB8fCBjaCA+IFwiOVwiKSAmJiAoY2ggPCBcIkFcIiB8fCBjaCA+IFwiWlwiKSAmJiAoKGNvZGUgPiAyNTUpIHx8IChjb2RlIDwgMCkpKVxuICAgICAgICAgICAgICAgICAgICBzdHJMZW5ndGggPSBzdHJMZW5ndGggKyAzOyAvL1VURi04IDNieXRlIOuhnCDqs4TsgrBcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHN0ckxlbmd0aCA9IHN0ckxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoc3RyTGVuZ3RoPmxpbWl0KSAvL+ygnO2VnCDquLjsnbQg7ZmV7J24XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGVsc2Ugc3RyVGl0bGUgPSBzdHJUaXRsZStzdHJQaWVjZTsgLy/soJztlZzquLjsnbQg67O064ukIOyekeycvOuptCDsnpDrpbgg66y47J6Q66W8IOu2meyXrOykgOuLpC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHJUaXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNEZXZpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy/rqqjrsJTsnbwgVUFcbiAgICAgICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2luZ2VyYnJlYWQpIHJldHVybiAnZ2luZ2VyYnJlYWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlvcykgcmV0dXJuICdpb3MnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MpIHJldHVybiAnbm8tbW9iaWxlJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlvczogdWEubWF0Y2goJ2lQaG9uZScpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZ2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRldmljZVNpemU6ICdkZXZpY2Utc2l6ZS0nICsgd2luZG93LmlubmVyV2lkdGhcbiAgICB9XG5cbiAgICAvLyDqs7XthrUg66mU7ISc65OcXG4gICAgLFxuICAgIGNvbW1vbjoge1xuXG4gICAgICAgIC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuICAgICAgICBlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG4gICAgICAgICAgICB2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksXG4gICAgICAgICAgICAgICAgYVRhZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgaHJlZiA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGFUYWcgPSBhbGxBW2ldO1xuICAgICAgICAgICAgICAgIGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICAgIGlmICh1aS51dGlsLnRyaW0oaHJlZikgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgYVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG4gICAgICAgICxcbiAgICAgICAgdGFibGVGYWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBfc2NvcGUgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZhZGVpbi13cmFwJyk7XG4gICAgICAgICAgICBpZiAoX3Njb3BlLmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgICAgICBfc2NvcGUuZm9yRWFjaChmdW5jdGlvbihlbCwgaSl7XG4gICAgICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcignLmpzLWZhZGVpbi1zY3JvbGwnKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90YXJnZXQgPSBldmVudC50YXJnZXQgfHwgd2luZG93LmV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29mZicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoL29ufFxcc29uLywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9ICggZWwuY2xhc3NOYW1lLmxlbmd0aCA8IDEgKSA/ICdvbicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIGVsLmNsYXNzTmFtZS5pbmRleE9mKCdvbicpIDw9IC0xICkgPyBlbC5jbGFzc05hbWUgKyAnIG9uJyA6IGVsLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gJCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgLy8gICAgICR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdmFyIF90YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKChfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvYWRpbmcgbWFza1xuICAgICAgICAsXG4gICAgICAgIGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VQcmVsb2FkZXIoJy9mcm9udC9pbWFnZXMvbG9hZGluZy1jaXJjdWxhci5naWYnLCBmdW5jdGlvbihpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jLmJvZHkpLnN0b3AoKS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6re466O5IO2GoOq4gFxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZUdyb3VwOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gZG9jLnF1ZXJ5U2VsZWN0b3IoYCR7Z3JvdXB9ICR7ZWxlbWVudH1gKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkpO1xuICAgICAgICAgICAgLy8gICAgICQoJycpXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCBlbGVtZW50ICkuY2xhc3NOYW1lID0gdGhpcy5xdWVyeVNlbGVjdG9yKCBlbGVtZW50ICkuY2xhc3NOYW1lLnJlcGxhY2UoIC9hY3RpZXZlfFxcc2FjdGl2ZS8sIFwiXCIgKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAvLyB9LCBmYWxzZSk7IFxuICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGF5ZXIgcG9wdXBcbiAgICAgICAgLFxuICAgICAgICBwb3B1cENsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcG9wdXAgPSAkKCcucG9wdXAnKTtcbiAgICAgICAgICAgIGlmICggcG9wdXAubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTAsIGxlbmd0aD1wb3B1cC5sZW5ndGg7IGk8bGVuZ3RoOyBpKz0xICkge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oail7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5lcShqKS5maW5kKCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5wb3B1cCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmYWtlU2VsZWN0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLnNlbGVjdC13cmFwLmZha2UnKS5lYWNoKGZ1bmN0aW9uKGl0ZW0sIHZhbHVlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSAkKHRoaXMpLmZpbmQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZ2V0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRoYXQub3B0aW9uc1t0aGF0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnRleHQoIHRleHQgKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICAgIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgICAgIF9zY29wZTogJycsXG5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcbiAgICAgICAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4BcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgICB2YXIgYWNjb3JkaWFuID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuICAgICAgICBpbml0OiBmdW5jdGlvbihfc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICB9LFxuICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoaXRlbS5wb3NpdGlvbigpLnRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAgIC8vIGRvbSBjb25maXJtIGxheWVyXG4gICAgdmFyIGNvbmZpcm0gPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHRoaXMubWFrZURvbSAoIG9wdGlvbnMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZURvbTogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgICAgIHZhciB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25DbGlja0Z1bmMsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmNcbiAgICAgICAgICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpcm1cIj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInRpdGxlXCI+PHNwYW4+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVzY1wiPlxuICAgICAgICAgICAgICAgICR7bXNnID8gYCR7bXNnfWAgOiBgYH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBjbG9zZVwiPiR7Y2xvc2VCdXR0b25UZXh0ID8gY2xvc2VCdXR0b25UZXh0IDogXCLri6vquLBcIn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBva1wiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsaW5kXCI+64ur6riwPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG4gICAgICAgICAgICAgICAgY29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1sYXllcicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoICBjb25maXJtTGF5ZXIgKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1sYXllcicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jLCBjbG9zZUJ1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYywgY2xvc2VCdXR0b25DbGlja0Z1bmMgKXtcbiAgICAgICAgICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICAgICAgYnV0dG9ucyA9IFsnb2snLCAnY2xvc2UnLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApO1xuICAgICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdvaycpID4gLTEgJiYgdHlwZW9mIG9rQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ2Nsb3NlJykgPiAtMSAmJiBpbmRleCA9PSAxICYmIHR5cGVvZiBjbG9zZUJ1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKCBzY29wZSApO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGJlYXV0eW51cy5jb25maXJtID0gY29uZmlybTtcblxuICAgIHZhciBhbGVydCA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRG9tKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ha2VEb206IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdmFyIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuY1xuICAgICAgICAgICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cInRpdGxlXCI+PHNwYW4+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgICAgPHAgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICAke21zZyA/IGAke21zZ31gIDogYGB9XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+JHtva0J1dHRvblRleHQgPyBva0J1dHRvblRleHQgOiBcIu2ZleyduFwifTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxpbmRcIj7ri6vquLA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+YDtcbiAgICAgICAgICAgIHZhciBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICBjb25maXJtTGF5ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbGVydC1sYXllcicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbmZpcm1MYXllciApO1xuICAgICAgICAgICAgdGhpcy5zY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1sYXllcicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jICk7XG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50RXhlY3V0ZTogZnVuY3Rpb24oIG9rQnV0dG9uQ2xpY2tGdW5jICl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykpO1xuICAgICAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgWydvaycsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApIClcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdvaycpID4gLTEgJiYgdHlwZW9mIG9rQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiZWF1dHludXMuYWxlcnQgPSBhbGVydDtcblxuICAgIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgICAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cbiAgICBjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuICAgIGNvbW1vbi50YWJsZUZhZGUoKTtcblxuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykpO1xuXG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cbiAgICAvLyBjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAvL2NhbGxiYWNrc1xuICAgIC8vIH0pO1xuXG4gICAgLy/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuICAgIGlmIChsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xKSB7XG4gICAgICAgIGRldi5hcHBlbmRNZW51TGlzdCgpO1xuICAgICAgICBkZXYuYXBwZW5kTWVudUJ0bigpO1xuICAgIH1cbn0pO1xuXG4vKlxuICpcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4gKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VzLnNyYyA9IGltZztcblxuICAgIGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBbd2luLCBkb2MsIHFzYSwgcXNdID0gW3dpbmRvdywgZG9jdW1lbnQsICdxdWVyeVNlbGVjdG9yQWxsJywgJ3F1ZXJ5U2VsZWN0b3InXTtcblxuY29uc3Rcblx0ZG9tIFx0PSBzID0+IGRvY3VtZW50W3FzXShzKSxcblx0ZG9tQWxsIFx0PSBzID0+IGRvY3VtZW50W3FzYV0ocyksXG5cdG1ha2VEb20gPSAocywgYXR0cikgPT4ge1xuXHRcdHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHMpXG5cdFx0aWYgKCB0eXBlb2YgYXR0ciA9PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhhdHRyKS5sZW5ndGggPiAwIClcblx0XHRcdGZvciAoIGxldCBpIGluIGF0dHIgKVxuXHRcdFx0XHRkb20uc2V0QXR0cmlidXRlKGksIGF0dHJbaV0pO1xuXHRcdHJldHVybiBkb207XG5cdH0sXG5cdHB1dFRleHQgPSBzID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpLFxuXHRwcmVwZW5kID0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0Lmluc2VydEJlZm9yZShpdGVtLCB0YXJnZXQuY2hpbGROb2Rlc1swXSksXG5cdGFwcGVuZCBcdD0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0LmFwcGVuZENoaWxkKGl0ZW0pO1xuXG5jb25zdCBtZW51RGF0YSA9IFtcblx0e1xuXHRcdGRlcHRoMTogXCLqs7XthrVcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yT6riAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL3JlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCtOyaqeydtCDsl4bsnYQg65WMXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL25vLXJlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcImNvbmZpcm0sIGFsZXJ0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29uZmlnL2xvY2F0aW9uU2VydmljZUFncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67iM656c65Oc66mU7J24XCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeygleuztFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuunpOyepeyGjOyLnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlSW5mby9zdG9yZU5ld3MuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67Cx7ZmU7KCQ7ZaJ7IKsKFNhbXBsZSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUV2ZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeuwqeusuO2bhOq4sFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3Zpc2l0b3JzQm9va0RldGFpbC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiBmYWxzZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvc2VydmljZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9tYXRpb24uaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7J2067Kk7Yq4Ju2WieyCrFwiLFxuXHRcdGRlcHRoMjogXCLsp4TtlonspJHsnbgg7J2067Kk7Yq4XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7J2867CYXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDri6jsnbzshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyZhOujjClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsooXro4wg7ZuEIO2ZleyduClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX2ZpbmlzaC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsmIjslb0g7IucIC0g6rCc7J247KCV67O0IOyImOynkSDrsI8g7J207Jqp7JWI64K0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvcmVzZXJ2YXRpb24vYWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7L+g7Y+w67aBXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvdXBvbkJvb2svZGV0YWlsLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67ew7Yuw7Luo7YWQ7LigXCIsXG5cdFx0ZGVwdGgyOiBcIuuqqeuhnVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjsubTrk5zribTsiqTtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4HtkojsoJXrs7RcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RJbmZvL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzoOqwneyEvO2EsFwiLFxuXHRcdGRlcHRoMjogXCLqs7Xsp4Dsgqztla1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqqnroZ0gKyDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9ub3RpY2UvbGlzdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuPhOybgOunkFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqZTsnbhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9oZWxwL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6XCLrp4jsnbTtjpjsnbTsp4BcIiAsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrk7HquIlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvZ3JhZGUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOy/oO2PsFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9jb3Vwb24vaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g67Cp66y47ZuE6riwXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L3Zpc2l0b3JzQm9vay5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq0gOyLrOyDge2SiFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wcm9kdWN0T2ZJbnRlcmVzdC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLqtazrp6TtmITtmalcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrpqzsiqTtirgocG9wdXAg7Y+s7ZWoKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wdXJjaGFzZS9wZXJpb2QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yA7ZmU7ZmU66m0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQke2RlcHRoMSA/IGA8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+YCA6IGBgfVxuXHQke2RlcHRoMiA9PSAnJyA/IGRlcHRoMiA6IGA8aDM+PHNwYW4+JHtkZXB0aDJ9PC9zcGFuPjwvaDM+YH1cblx0PHVsPiR7bGlua3MucmVkdWNlKChpcCwgaWMpID0+IHtcblx0XHRcdGxldCB7dGl0bGUsIGhyZWYsIGNvbXBsZXRlfSA9IGljO1xuXHRcdFx0cmV0dXJuIGAke2lwIHx8IFwiXCJ9XG5cdFx0PGxpJHtjb21wbGV0ZSA/ICcgY2xhc3M9XCJjcFwiJyA6IFwiXCJ9PjxhIGhyZWY9XCIke2hyZWZ9XCI+JHt0aXRsZX08L2E+PC9saT5gfSwgMCl9XG5cdDwvdWw+XG5cdGBcbn0sIDApO1xuXG4vLyDrqZTribQg67KE7Yq8IOyCveyehVxud2luZG93LmRldiA9IHtcblx0YXBwZW5kTWVudUJ0bjogZnVuY3Rpb24oKXtcblx0XHR2YXIgbWVudVRyaWdnZXIgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZW51LXRyaWdnZXJcIj5cblx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG48L2J1dHRvbj5gO1xuXHRcblx0XHRcdGlmICggJCgnYnV0dG9uLm1lbnUtdHJpZ2dlcicpLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0XHR9XG5cdFxuXHRcdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG1lbnVMaXN0ID0gJCgnI21lbnUtbGlzdCcpLFxuXHRcdFx0XHQgICAgY3RybENsYXNzID0gJ2lzLWFjdGl2ZScsXG5cdFx0XHRcdCAgICBjb25kaXRpb24gPSBtZW51TGlzdC5oYXNDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdGlmIChjb25kaXRpb24pIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5hZGRDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IGNsYXNzPW92ZXJ0aHJvdyAvPicpLmFwcGVuZCggbWVudUxpc3QgKSApO1xuXHRcdFx0JCgnI3dyYXAnKS5sZW5ndGggPD0gMCA/ICQoJ2JvZHknKS5wcmVwZW5kKCBtZW51TGlzdCApIDogJCgnI3dyYXAnKS5wcmVwZW5kKCBtZW51TGlzdCApO1xuXHRcdH1cblx0XHQkKCcjbWVudS1saXN0JykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhSFJFRiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0aWYgKCBhSFJFRi5pbmRleE9mKCc/ZGV2JykgPD0gLTEgKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGFIUkVGICsgJz9kZXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHQsZGltbTogZnVuY3Rpb24obXNnKXtcblx0XHRtc2cgPSBtc2cgfHwgJ+uCtOyaqeydtCDsl4bsirXri4jri6QuJztcblx0XHQkKCdib2R5JykuYXBwZW5kKFxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImRpbW1cIiAvPicpLmFwcGVuZChcblx0XHRcdFx0JChgPHNwYW4+JHttc2d9PHNwYW4vPjxidXR0b24gY2xhc3M9XCJjbG9zZVwiPlvri6vquLBdPC9zcGFuPjwvYnV0dG9uPmApXG5cdFx0XHQpXG5cdFx0KTtcblx0XHQkKCcuZGltbScpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmRpbW0nKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZGV2LmpzXG4gKiovIiwiLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qXHRuZXR3b3JrU3RhdGUgeyBudW1iZXIgfVxuKiBcdDAgPSBORVRXT1JLX0VNUFRZIC0gYXVkaW8vdmlkZW8gaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZFxuKlx0MSA9IE5FVFdPUktfSURMRSAtIGF1ZGlvL3ZpZGVvIGlzIGFjdGl2ZSBhbmQgaGFzIHNlbGVjdGVkIGEgcmVzb3VyY2UsIGJ1dCBpcyBub3QgdXNpbmcgdGhlIG5ldHdvcmtcbipcdDIgPSBORVRXT1JLX0xPQURJTkcgLSBicm93c2VyIGlzIGRvd25sb2FkaW5nIGRhdGFcbipcdDMgPSBORVRXT1JLX05PX1NPVVJDRSAtIG5vIGF1ZGlvL3ZpZGVvIHNvdXJjZSBmb3VuZFxuKlxuKlx0cmVhc3lTdGF0ZSB7IG51bXZlciB9XG4qXHQwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XHRcbipcdDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuKlx0MiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuKlx0MyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4qXHQ0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuXHQvL3dyYXBwZXIsIGVuZGVkQ2FsbGJhY2tcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBWaWRlb1BsYXllcikgKSByZXR1cm4gbmV3IFZpZGVvUGxheWVyKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spO1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLndyYXBwZXIpO1xuXHR0aGlzLmxvYWRpbmdFbGVtZW50XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbG9hZGluZy1pbWFnZScpLFxuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJylbMF07XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVsxXTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gKF8gPT4ge1xuXHRcdGlmICggb3B0aW9ucy5zdGFydFRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbiApIHJldHVybiAwO1xuXHRcdHZhciBzdGFydFRpbWUgPSBvcHRpb25zLnN0YXJ0VGltZSA/IE51bWJlcihvcHRpb25zLnN0YXJ0VGltZSkgOiAwO1xuXHRcdHJldHVybiBzdGFydFRpbWU7XG5cdH0pKCk7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMubW9iaWxlTmV0d29ya1x0PSBvcHRpb25zLm1vYmlsZU5ldHdvcms7XG5cdHRoaXMuYWxlcnRNb2JpbGVcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tb2JpbGUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2Ygb3B0aW9ucy5lbmRlZENhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgOiBfID0+IHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblx0dGhpcy5wdXNoVGltZSA9IHR5cGVvZiBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50aW1ldXBkYXRlQ2FsbGJhY2sgOiBfID0+IHt9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX3VubG9hZCgpO1xuXHR0aGlzLl9zaXplKCk7XG5cdHRoaXMuX2luaXQoKTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gXyA9PiB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRbdGhhdC5wbGF5QnRuLCB0aGF0LnBhdXNlQnRuXS5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBfID0+IHtcblx0XHRcdHRoYXQuYWRkS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblxuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIF8gPT4ge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9KTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfID0+IHtcblxuXHRcdGlmICggdGhhdC5tb2JpbGVOZXR3b3JrICkge1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrID0gZmFsc2U7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmtDaGVjaygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3NpemUgPSBfID0+IHtcblx0dmFyIHcgPSBNYXRoLnJvdW5kKCB0aGlzLndyYXBwZXIuY2xpZW50V2lkdGggKSxcblx0XHRoID0gMDtcblx0aCA9ICg5ICogdykgLyAxNjtcblx0dGhpcy53cmFwcGVyLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl91bmxvYWQgPSBfID0+IHtcblx0ZG9jdW1lbnQuYm9keS5vbnVubG9hZCA9IF8gPT4ge1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIG1vdmUnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tb2JpbGVOZXR3b3JrQ2hlY2sgPSBfID0+IHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGFsZXJ0ID0gdGhhdC5hbGVydE1vYmlsZTtcblx0dGhhdC5hZGRLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRhbGVydC5xdWVyeVNlbGVjdG9yKCdidXR0b24ub2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IF8gPT4ge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IG51bGw7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0aWYgKCB0aGF0LnBsYXlGbGFnICkge1xuXHRcdHRoYXQucGxheUZsYWcgPSBmYWxzZTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgXG5cdFx0XHR2ID0gdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cblx0XHQvLyBpZiAoIHRoYXQuY3VyVGltZSApIHYuY3VycmVudFRpbWUgPSB0aGF0LmN1clRpbWU7IFxuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdFx0Ly8gaWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0XHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHQvLyBcdFx0Y29uc29sZS5sb2coJ2FhYWFhYScpO1xuXHRcdC8vIFx0fTtcblx0XHQvLyB9XG5cblx0XHR2Lm9ubG9hZCA9IF8gPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZCcsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2Fkc3RhcnQgPSBfID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZGRhdGEgPSBfID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gXyA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkZWRtZXRhZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXG5cdFx0ZG9jdW1lbnQub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gXyA9PiB7XG5cdFx0XHRpZiAoICF2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICYmIHYuZW5kZWQgKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGNoYW5nZSA6IHpvb20gaW4nKTtcblx0XHRcdFx0c2V0VGltZW91dChfID0+IHtcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cblx0dGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IF8gPT4ge1xuXHRcdGNvbnNvbGUubG9nKCdjdWVjaGFuZ2UnKTtcblx0fTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBfID0+IHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gXyA9PiB7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wb3N0ZXIsICdoaWRlJyApO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHRjb25zb2xlLmxvZygnb25wbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbmNhbnBsYXkgPSBfID0+IHtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LnBhdXNlQnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LnBsYXlCdG4sICdoaWRlJyApO1xuXHRcdGNvbnNvbGUubG9nKCdvbmNhbnBsYXknKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IF8gPT57XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0XHRjb25zb2xlLmxvZygnb25wbGF5aW5nJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGF1c2UgPSBfID0+e1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdHRoYXQudmlkZW8ub25wYXVzZSA9IF8gPT4ge1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wYXVzZUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5wbGF5QnRuLCAnaGlkZScgKTtcblx0XHRpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYWRkS2xhc3ModGhhdC5idG5Hcm91cCwgJ2hpZGUnKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGlmICggdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiApIHtcblx0XHRcdFx0dGhhdC52aWRlby5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgXyA9PiB7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBfID0+IHtcblx0XHRcdFx0XHR2YXIgdiA9IHRoYXQudmlkZW87XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0XHRpZiAoIHYuZXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMSk7XG5cdFx0XHRcdFx0di5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDIpO1xuXHRcdFx0XHRcdHYud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygzKTtcblx0XHRcdFx0XHRkb2N1bWV0LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4gKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyg0KTtcblx0XHRcdFx0XHRkb2N1bWV0LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICggdi5lbmRlZCApIHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKCdvbnBhdXNlJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSAoeCwgeSwgbCkgPT4ge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IF8gPT4ge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCggXyA9PiB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBlcnJvclR5cGUgPT4ge1xuXHQvLyBpZiAoIG5ldHdvcmtTdGF0ZSA9PSAgKVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IHYgPT4ge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0d3JhcHBlciA9IHRoYXQud3JhcHBlcjtcblx0d3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHYudmlkZW9XaWR0aCwgdi52aWRlb0hlaWdodCwgdi5jbGllbnRXaWR0aCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblRpbWVVcGRhdGUgPSBfID0+IHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvLFxuXHRcdHB2ID0gMDtcblx0di5vbnRpbWV1cGRhdGUgPSBfID0+IHtcblx0XHRpZiAoIHYucGF1c2VkICkgcmV0dXJuO1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcblx0XHQvLyA17LSI66eI64ukIOyLnOqwhOyytO2BrFxuXHRcdGlmIChwdiAhPSBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpICYmICBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpICUgNSA9PSAwICkge1xuXHRcdFx0Ly8g7ZiE7J6s7Iuc6rCE7J2EIDXroZwg64KY64iE7Ja0IOuCmOuouOyngOulvCDqtaztlZjqs6Ag6re4IOuCmOuouOyngOqwgCA167O064ukIOyekeycvOuptCDsmKzrprwsIOqwmeqxsOuCmCDtgazrqbQg67KE66a8XG5cdFx0XHR0aGF0LnB1c2hUaW1lKCBNYXRoWyAodi5jdXJyZW50VGltZSAlIDUpIDwgNSA/ICdjZWlsJyA6ICdmbG9vcicgXSh2LmN1cnJlbnRUaW1lKcKgKTtcblx0XHRcdHB2ID0gTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKTtcblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gXyA9PiB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC52aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmJ0bkdyb3VwLCAnaGlkZScgKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LnRpbWVsaW5lLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdyZW1vdmUtdGltZScgKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IF8gPT4ge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQucGF1c2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0XHR0aGF0LnBsYXlQYXVzZSgpO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQucGxheUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wYXVzZUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gXyA9PiB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC5iZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBfID0+IHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IF8gPT4ge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogXyA9PiB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gXyA9PiB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblxuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiAoIGV2ZW50LCB1aSApID0+IHtcblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiAoIGV2ZW50LCB1aSApID0+IHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdH0sXG5cdGNoYW5nZTogKGV2ZW50LCB1aSkgPT4ge1xuXHR9LFxuXHRzdG9wOiAoZXZlbnQsIHVpKSA9PiB7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gXyA9PiB7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBfID0+IHtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IF8gPT4ge1xuXHR2YXIgdGhhdCBcdFx0PSB0aGlzLFxuXHRcdGJ0bkdyb3VwIFx0PSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyBcdFx0PSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzIFx0PSB0aGlzLmhpZ2hSZXMsXG5cdFx0dWEgXHRcdFx0PSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksXG5cdFx0c3R5bGVzXHRcdD0ge1xuXHRcdFx0c2hvdzogW3tkaXNwbGF5OiAnYmxvY2snLCBvcGFjaXR5OiAxfV0sXG5cdFx0XHRoaWRlOiBbe2Rpc3BsYXk6ICdub25lJywgb3BhY2l0eTogMH1dXG5cdFx0fSxcblx0XHRjaG9pY2UgPSAoIGVsICkgPT4ge1xuXHRcdFx0dmFyIHNob3dFbCwgaGlkZUVsO1xuXHRcdFx0aWYgKCBlbCA9PSAnbG93JyApXG5cdFx0XHRcdHNob3dFbCA9IGxvd1JlcywgaGlkZUVsID0gaGlnaFJlcztcblx0XHRcdGVsc2UgaWYgKCBlbCA9PSAnaGlnaCcgKVxuXHRcdFx0XHRoaWRlRWwgPSBsb3dSZXMsIHNob3dFbCA9IGhpZ2hSZXM7XG5cblx0XHRcdC8vIGZvciAoIHZhciB2aSBpbiBsb3dSZXMgKSB7XG5cdFx0XHQvLyBcdGNvbnNvbGUubG9nKHZpKTtcblx0XHRcdC8vIH1cblx0XHRcdGNvbnNvbGUuZGlyKGxvd1Jlcyk7XG5cblx0XHRcdHN0eWxlcy5zaG93LmZvckVhY2goKGMsIGkpID0+IHtcblx0XHRcdFx0c2hvd0VsLnN0eWxlW09iamVjdC5rZXlzKGMpWzFdXSA9IGNbT2JqZWN0LmtleXMoYylbMV1dO1xuXHRcdFx0fSk7XG5cdFx0XHRzaG93RWwuc2V0QXR0cmlidXRlKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdFx0c2hvd0VsLnNldEF0dHJpYnV0ZSgnc3JjJywgc2hvd0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cblx0XHRcdHN0eWxlcy5oaWRlLmZvckVhY2goKGMsIGkpID0+IHtcblx0XHRcdFx0aGlkZUVsLnN0eWxlW09iamVjdC5rZXlzKGMpXSA9IGNbT2JqZWN0LmtleXMoYyldO1xuXHRcdFx0fSk7XG5cdFx0XHRoaWRlRWwuc2V0QXR0cmlidXRlKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHRcdFxuXHRcdFx0dGhhdC52aWRlbyA9IHNob3dFbDtcblx0XHR9LFxuXHRcblx0Y29uZGl0aW9uID0gYnRuR3JvdXAucXVlcnlTZWxlY3RvcignYnV0dG9uLmFjdGl2ZScpLmNsYXNzTmFtZS5pbmRleE9mKCdsb3cnKSA+IC0xID8gJ2xvdycgOiAnaGlnaCc7XG5cdGNob2ljZSggY29uZGl0aW9uICk7XG5cblx0IC8vIGlmICggdWEuaW5kZXhPZignYW5kcm9pZCA0LjInKSA+IC0xIHx8IHVhLmluZGV4T2YoJ2FuZHJvaWQgNC4zJykgPiAtMSApIHtcblx0IC8vIFx0JCh0aGF0LnZpZGVvKS5hcHBlbmQoJzxzb3VyY2Ugc3JjPVwiXCI+PC9zb3VyY2U+Jyk7XG5cdCAvLyBcdCQodGhhdC52aWRlbykuZmluZCgnc291cmNlJykuYXR0cignc3JjJywgJCh0aGF0LnZpZGVvKS5kYXRhKCdzcmMnKSk7XG5cdCAvLyB9XG5cblx0cmV0dXJuIHRoYXQudmlkZW87XG5cdC8vIHRoYXQudmVyaWZ5aW5nKCB0aGF0LnZpZGVvICk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUudmVyaWZ5aW5nID0gdiA9PiB7XG5cdGNvbnNvbGUubG9nKHYubmV0d29ya1N0YXRlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IHVpID0+IHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvLFxuXHRcdG0sIHM7XG5cblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY3VyVGltZSA9IHYuY3VycmVudFRpbWU7XG5cdG0gPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAvIDYwKSApLnRvU3RyaW5nKCk7XG5cdHMgPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAlIDYwKSApLnRvU3RyaW5nKCk7XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IChtLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbSkgICsgJzonICsgKHMubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IHNlZWsgPT4ge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGN0cmwgPT4ge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dCggXyA9PiB7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0fSwgMjAwMCk7XG4gIH0gZWxzZSB7XG5cdGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG5cdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBfID0+IHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGNvbnNvbGUubG9nKCc9PT09PT09Jywgdi5jdXJyZW50VGltZSk7XG5cblx0Zm9yICggdmFyIHZpIGluIHYgKSB7XG5cdFx0Y29uc29sZS5sb2codmkpO1xuXHR9XG5cblx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHRpZih0aGF0LmN1clRpbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHYuY3VycmVudFRpbWUgPSB0aGF0LmN1clRpbWU7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHYuc3RhcnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBfID0+IHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmcnKTtcblxuXHR2YXIgY2FudmFzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzVGFnLmlkID0gXCJ2aWRlb1Bvc3RlclwiO1xuXHR0aGF0LnBvc3Rlci5hcHBlbmRDaGlsZCggY2FudmFzVGFnICk7XG5cdHRoYXQuZ2V0RHVyYXRpb24oKTtcblx0aW1hZ2VQcmVsb2FkZXIoYmcsIF8gPT4ge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoXyA9PiB7XG5cdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKF8gPT4ge1xuXHRcdFx0XHRpZiAoIChjb250ZXh0Lmdsb2JhbEFscGhhKS50b0ZpeGVkKDEpIDwgMSApIHtcblx0XHRcdFx0XHRpbWdXIC09IChpbWdXKjAuMDI1KTtcblx0XHRcdFx0XHRpbWdIIC09IChpbWdIKjAuMDI1KTtcblx0XHRcdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhICs9IDAuMDU7XG5cdFx0XHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoaW1nLCBjYW52YXMud2lkdGgvMiAtIGltZ1cvMiwgY2FudmFzLmhlaWdodC8yIC0gaW1nSC8yLCBpbWdXLCBpbWdIKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAxMDAwLzYwKVxuXHRcdH0sIDMwMCk7XG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gKCB0YXJnZXQsIGtsYXNzICkgPT4ge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSAoIHRhcmdldCwga2xhc3MgKSA9PiB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy92aWRlby1wbGF5ZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9