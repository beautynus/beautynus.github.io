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
			console.log('page move');
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
			if (that.video == null) that.resolutionChoice();
	
			v = that.video;
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
				console.log('onloadstart'.v.networkState);
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
		console.log(condition);
		choice(condition);
	
		// if ( ua.indexOf('android 4.2') > -1 || ua.indexOf('android 4.3') > -1 ) {
		// 	$(that.video).append('<source src=""></source>');
		// 	$(that.video).find('source').attr('src', $(that.video).data('src'));
		// }
	
		that.video.load();
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
	
		console.log('111111111');
	
		if (v.paused) {
			if (that.curTime) {
				try {
					v.currentTime = that.curTime;
				} catch (e) {
					console.log('이어보기 기능이 제공되지 않는 안드로이드 버전 입니다.');
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
		if (target.className.indexOf(klass) > -1) return;
		target.className += ' ' + klass;
	};
	
	VideoPlayer.prototype.removeKlass = function (target, klass) {
		var regexp = new RegExp(klass);
		target.className = ui.util.trim(target.className.replace(regexp, ""));
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzdiMmE1NjI3YzcxOWY5M2MwZGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJjbG9zZUJ1dHRvbkNsaWNrRnVuYyIsIm9rQnV0dG9uVGV4dCIsIm9rQnV0dG9uQ2xpY2tGdW5jIiwiZG9tIiwiY29uZmlybUxheWVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiZXZlbnRFeGVjdXRlIiwiYnV0dG9ucyIsIm1hcCIsImMiLCJpbmRleCIsImFycmF5IiwicmVtb3ZlQ2hpbGQiLCJhbGVydCIsImpvaW4iLCJsb2NhdGlvbiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsInNyYyIsInFzYSIsInFzIiwicyIsImRvbUFsbCIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJpcCIsImljIiwibWVudVRyaWdnZXIiLCJjdHJsQ2xhc3MiLCJjb25kaXRpb24iLCJhZGQiLCJhSFJFRiIsImRpbW0iLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJlbmRlZENhbGxiYWNrIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiIsIk51bWJlciIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJtb2JpbGVOZXR3b3JrIiwiYWxlcnRNb2JpbGUiLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInB1c2hUaW1lIiwidGltZXVwZGF0ZUNhbGxiYWNrIiwicG9zdGVyTG9hZGVkIiwiX3VubG9hZCIsIl9zaXplIiwiX2luaXQiLCJwcm90b3R5cGUiLCJhZGRLbGFzcyIsImJ0biIsInJlbW92ZUtsYXNzIiwibW9iaWxlTmV0d29ya0NoZWNrIiwiX3BsYXkiLCJ3IiwiTWF0aCIsInJvdW5kIiwiaCIsInN0eWxlIiwiaGVpZ2h0Iiwib251bmxvYWQiLCJ2IiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsIndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuIiwiZW5kZWQiLCJzZXRUaW1lb3V0IiwicGxheVBhdXNlIiwib25jdWVjaGFuZ2UiLCJvbnBsYXkiLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbmNhbnBsYXkiLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwicHYiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwidG9Mb3dlckNhc2UiLCJzdHlsZXMiLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJjaG9pY2UiLCJzaG93RWwiLCJoaWRlRWwiLCJkaXIiLCJsb2FkIiwidmVyaWZ5aW5nIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImUiLCJjYW52YXNUYWciLCJpZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwidGltZW91dCIsImludGVydmFsIiwiYWEiLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFGOEI7QUFLOUIsS0FBSUEsSUFBSUMsT0FBT0QsQ0FBZixDLENBSmdCOztBQUtoQixLQUFJRSxNQUFNRCxNQUFWO0FBQUEsS0FDSUUsTUFBTUMsUUFEVjs7QUFHQUgsUUFBT0ksS0FBUCxHQUFlLFVBQVNDLEdBQVQsRUFBYztBQUN6QixZQUFPQyxRQUFRQyxHQUFSLENBQVlGLEdBQVosQ0FBUDtBQUNILEVBRkQ7O0FBSUE7QUFDQUosS0FBSU8sRUFBSixHQUFTUixPQUFPUSxFQUFQLElBQWE7O0FBRWxCO0FBQ0FDLFdBQU07QUFDRjtBQUNBQyx3QkFBZSx5QkFBVyxDQUFFOztBQUU1Qjs7QUFKRSxXQU1GQyxNQUFNLGNBQVNDLEdBQVQsRUFBYztBQUNoQixpQkFBSUEsT0FBTyxJQUFQLElBQWUsT0FBT0EsR0FBUCxJQUFjLFdBQWpDLEVBQThDLE9BQU8sRUFBUDtBQUM5QyxvQkFBT0EsSUFBSUMsT0FBSixDQUFZLFlBQVosRUFBMEIsRUFBMUIsQ0FBUDtBQUNILFVBVEM7QUFVRkMsaUJBQVEsU0FBU0MsTUFBVCxDQUFnQkgsR0FBaEIsRUFBcUJJLEtBQXJCLEVBQTJCO0FBQy9CLGlCQUFJQyxZQUFZLENBQWhCO0FBQUEsaUJBQ0lDLFdBQVcsRUFEZjtBQUFBLGlCQUVJQyxXQUFXLEVBRmY7QUFBQSxpQkFHSUMsSUFISjtBQUFBLGlCQUdVQyxFQUhWOztBQUtBLGtCQUFLQyxJQUFJLENBQVQsRUFBWUEsSUFBSVYsSUFBSVcsTUFBcEIsRUFBNEJELEdBQTVCLEVBQWdDO0FBQzVCRix3QkFBT1IsSUFBSVksVUFBSixDQUFlRixDQUFmLENBQVAsRUFDQUQsS0FBS1QsSUFBSWEsTUFBSixDQUFXSCxDQUFYLEVBQWEsQ0FBYixFQUFnQkksV0FBaEIsRUFETDtBQUVBUCw0QkFBV1AsSUFBSWEsTUFBSixDQUFXSCxDQUFYLEVBQWEsQ0FBYixDQUFYO0FBQ0FGLHdCQUFPTyxTQUFTUCxJQUFULENBQVA7O0FBRUEscUJBQUksQ0FBQ0MsS0FBSyxHQUFMLElBQVlBLEtBQUssR0FBbEIsTUFBMkJBLEtBQUssR0FBTCxJQUFZQSxLQUFLLEdBQTVDLE1BQXNERCxPQUFPLEdBQVIsSUFBaUJBLE9BQU8sQ0FBN0UsQ0FBSixFQUNJSCxZQUFZQSxZQUFZLENBQXhCLENBREosQ0FDK0I7QUFEL0Isc0JBR0lBLFlBQVlBLFlBQVksQ0FBeEI7O0FBRUoscUJBQUdBLFlBQVVELEtBQWIsRUFBb0I7QUFDaEIsMkJBREosS0FFS0UsV0FBV0EsV0FBU0MsUUFBcEIsQ0FidUIsQ0FhTztBQUN0QztBQUNELG9CQUFPRCxRQUFQO0FBQ0gsVUFoQ0M7QUFpQ0ZVLG1CQUFVLG9CQUFXO0FBQ2pCO0FBQ0EsaUJBQUlDLEtBQUtDLFVBQVVDLFNBQW5CO0FBQ0Esb0JBQU87QUFDSEMsd0JBQU8saUJBQVc7QUFDZCx5QkFBSSxLQUFLQyxPQUFULEVBQWtCO0FBQ2QsNkJBQUksS0FBS0MsV0FBVCxFQUFzQixPQUFPLGFBQVAsQ0FBdEIsS0FDSyxPQUFPLFNBQVA7QUFDUjtBQUNELHlCQUFJLEtBQUtDLEdBQVQsRUFBYyxPQUFPLEtBQVA7QUFDZCx5QkFBSSxDQUFDLEtBQUtGLE9BQU4sSUFBaUIsQ0FBQyxLQUFLRSxHQUEzQixFQUFnQyxPQUFPLFdBQVA7QUFDbkMsa0JBUkU7QUFTSEEsc0JBQUtOLEdBQUdPLEtBQUgsQ0FBUyxRQUFULElBQXFCLElBQXJCLEdBQTRCLEtBVDlCO0FBVUhILDBCQUFTSixHQUFHTyxLQUFILENBQVMsU0FBVCxJQUFzQixJQUF0QixHQUE2QixLQVZuQztBQVdIRiw4QkFBYUwsR0FBR08sS0FBSCxDQUFTLGFBQVQsSUFBMEIsSUFBMUIsR0FBaUM7QUFYM0MsY0FBUDtBQWFILFVBakRDO0FBa0RGQyxxQkFBWSxpQkFBaUJyQyxPQUFPc0M7QUFsRGxDOztBQXFETjs7QUF4RGtCLE9BMERsQkMsUUFBUTs7QUFFSjtBQUNBQyx3QkFBZSx5QkFBVztBQUN0QjtBQUNBLGlCQUFJQyxPQUFPdkMsSUFBSXdDLGdCQUFKLENBQXFCLEdBQXJCLENBQVg7QUFBQSxpQkFDSUMsT0FBTyxJQURYO0FBQUEsaUJBRUlDLE9BQU8sSUFGWDtBQUdBLGtCQUFLLElBQUl0QixJQUFJLENBQVIsRUFBV0MsU0FBU2tCLEtBQUtsQixNQUE5QixFQUFzQ0QsSUFBSUMsTUFBMUMsRUFBa0RELEdBQWxELEVBQXVEO0FBQ25EcUIsd0JBQU9GLEtBQUtuQixDQUFMLENBQVA7QUFDQXNCLHdCQUFPRCxLQUFLRSxZQUFMLENBQWtCLE1BQWxCLENBQVA7QUFDQSxxQkFBSXJDLEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFhaUMsSUFBYixLQUFzQixHQUF0QixJQUE2QkEsUUFBUSxJQUF6QyxFQUNJRCxLQUFLRyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLHFDQUExQjtBQUNQO0FBQ0o7O0FBRUQ7O0FBaEJJLFdBa0JKQyxhQUFhLHVCQUFXLENBRXZCOztBQUVEOztBQXRCSSxXQXdCSkMsV0FBVyxxQkFBVztBQUNsQixpQkFBSUMsU0FBUy9DLElBQUl3QyxnQkFBSixDQUFxQixpQkFBckIsQ0FBYjtBQUNBLGlCQUFJTyxPQUFPMUIsTUFBUCxJQUFpQixDQUFyQixFQUF3QjtBQUN4QjBCLG9CQUFPQyxPQUFQLENBQWUsVUFBU0MsRUFBVCxFQUFhN0IsQ0FBYixFQUFlO0FBQzFCNkIsb0JBQUdDLGFBQUgsQ0FBaUIsbUJBQWpCLEVBQXNDQyxnQkFBdEMsQ0FBdUQsUUFBdkQsRUFBaUUsVUFBVUMsS0FBVixFQUFpQjtBQUM5RSx5QkFBSUMsVUFBVUQsTUFBTUUsTUFBTixJQUFnQnhELE9BQU9zRCxLQUFQLENBQWFFLE1BQTNDO0FBQ0EseUJBQUtELFFBQVFFLFdBQVIsR0FBc0JGLFFBQVFHLFdBQS9CLElBQWdESCxRQUFRSSxVQUFSLEdBQXFCLEVBQXpFLEVBQThFO0FBQzFFckQsaUNBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0E0Qyw0QkFBR1MsU0FBSCxHQUFlVCxHQUFHUyxTQUFILENBQWEvQyxPQUFiLENBQXFCLFNBQXJCLEVBQWdDLEVBQWhDLENBQWY7QUFDSCxzQkFIRCxNQUdPO0FBQ0hQLGlDQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBNEMsNEJBQUdTLFNBQUgsR0FBaUJULEdBQUdTLFNBQUgsQ0FBYXJDLE1BQWIsR0FBc0IsQ0FBeEIsR0FBOEIsSUFBOUIsR0FDTzRCLEdBQUdTLFNBQUgsQ0FBYUMsT0FBYixDQUFxQixJQUFyQixLQUE4QixDQUFDLENBQWpDLEdBQXVDVixHQUFHUyxTQUFILEdBQWUsS0FBdEQsR0FBOERULEdBQUdTLFNBRHJGO0FBRUg7QUFDSixrQkFWRCxFQVVHLEtBVkg7QUFXSCxjQVpEO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEOztBQXJESSxXQXVESkUsaUJBQWlCLHlCQUFTQyxRQUFULEVBQW1CO0FBQ2hDL0Qsb0JBQU9xRCxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFXO0FBQ3ZDVyxnQ0FBZSxvQ0FBZixFQUFxRCxVQUFTQyxHQUFULEVBQWM7QUFDL0RBLHlCQUFJTCxTQUFKLEdBQWdCLHFCQUFoQjtBQUNBLHlCQUFJLE9BQU9HLFFBQVAsSUFBbUIsVUFBdkIsRUFBbUNBO0FBQ25DaEUsdUJBQUVHLElBQUlnRSxJQUFOLEVBQVlDLElBQVosR0FBbUJDLE9BQW5CLENBQTJCLEVBQUVDLFNBQVMsQ0FBWCxFQUEzQixFQUEyQyxHQUEzQyxFQUFnRCxZQUFXLENBQUUsQ0FBN0Q7QUFDSCxrQkFKRDtBQUtILGNBTkQsRUFNRyxLQU5IO0FBT0g7O0FBRUQ7O0FBakVJLFdBbUVKQyxhQUFhLHFCQUFTQyxLQUFULEVBQWdCQyxPQUFoQixFQUF5QjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQXpFLGVBQUV3RSxLQUFGLEVBQVNFLElBQVQsQ0FBY0QsT0FBZCxFQUF1QkUsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBVztBQUMxQzNFLG1CQUFFd0UsS0FBRixFQUFTRSxJQUFULENBQWNELE9BQWQsRUFBdUJHLFdBQXZCLENBQW1DLFFBQW5DO0FBQ0E1RSxtQkFBRSxJQUFGLEVBQVE2RSxRQUFSLENBQWlCLFFBQWpCO0FBQ0gsY0FIRDtBQUlIOztBQUVEOztBQWhGSSxXQWtGSkMsWUFBWSxzQkFBWTtBQUNwQixpQkFBSUMsUUFBUS9FLEVBQUUsUUFBRixDQUFaO0FBQ0EsaUJBQUsrRSxNQUFNdkQsTUFBTixHQUFlLENBQXBCLEVBQXdCO0FBQ3BCLHNCQUFLLElBQUlELElBQUUsQ0FBTixFQUFTQyxTQUFPdUQsTUFBTXZELE1BQTNCLEVBQW1DRCxJQUFFQyxNQUFyQyxFQUE2Q0QsS0FBRyxDQUFoRCxFQUFvRDtBQUNoRCxzQkFBQyxVQUFTeUQsQ0FBVCxFQUFXO0FBQ1JELCtCQUFNRSxFQUFOLENBQVNELENBQVQsRUFBWU4sSUFBWixDQUFpQixZQUFqQixFQUErQkMsRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBVTtBQUNqRDNFLCtCQUFFLElBQUYsRUFBUWtGLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEJDLE1BQTFCO0FBQ0gsMEJBRkQ7QUFHSCxzQkFKRCxFQUlHNUQsQ0FKSDtBQUtIO0FBQ0o7QUFDSixVQTdGRzs7QUErRko2RCxxQkFBWSxzQkFBVTtBQUNsQnBGLGVBQUUsbUJBQUYsRUFBdUJxRixJQUF2QixDQUE0QixVQUFTQyxJQUFULEVBQWVDLEtBQWYsRUFBcUI7QUFDN0MscUJBQUlDLFNBQVN4RixFQUFFLElBQUYsRUFBUTBFLElBQVIsQ0FBYSxRQUFiLENBQWI7QUFBQSxxQkFDSWUsUUFBUXpGLEVBQUUsSUFBRixFQUFRMEUsSUFBUixDQUFhLE9BQWIsQ0FEWjtBQUVBYyx3QkFBT2IsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBVTtBQUMxQix5QkFBSWUsT0FBTzFGLEVBQUUsSUFBRixFQUFRMkYsR0FBUixDQUFZLENBQVosQ0FBWDtBQUFBLHlCQUNJQyxPQUFPRixLQUFLRyxPQUFMLENBQWFILEtBQUtJLGFBQWxCLEVBQWlDRixJQUQ1QztBQUVBSCwyQkFBTUcsSUFBTixDQUFZQSxJQUFaO0FBQ0gsa0JBSkQsRUFJR0csT0FKSCxDQUlXLFFBSlg7QUFLSCxjQVJEO0FBU0g7O0FBekdHO0FBMURVLEVBQXRCOztBQTJLQTs7O0FBR0EsRUFBQyxVQUFTL0YsQ0FBVCxFQUFZO0FBQ1Q7O0FBRUEsU0FBSVUsT0FBT0QsR0FBR0MsSUFBZDtBQUFBLFNBQ0k4QixTQUFTL0IsR0FBRytCLE1BRGhCOztBQUdBLFNBQUl3RCxZQUFZQSxhQUFhLEVBQTdCOztBQUVBO0FBQ0EsU0FBSUMsV0FBVztBQUNYL0MsaUJBQVEsRUFERzs7QUFHWGdELHlCQUFnQjtBQUNaQyx3QkFBVyxZQURDO0FBRVpDLG1CQUFNLElBRk07QUFHWkMseUJBQVksb0JBSEE7QUFJWkMsNkJBQWdCO0FBSkosVUFITDs7QUFVWEMsZUFBTSxjQUFTQyxLQUFULEVBQWdCWCxPQUFoQixFQUF5QjtBQUMzQixrQkFBSzNDLE1BQUwsR0FBY3NELEtBQWQ7QUFDQSxpQkFBSUMsU0FBVSxPQUFPQyxPQUFPRCxNQUFkLElBQXdCLFdBQXpCLEdBQXdDekcsRUFBRTJHLE1BQTFDLEdBQW1ERCxPQUFPRCxNQUF2RSxDQUYyQixDQUVvRDtBQUMvRVosdUJBQVcsT0FBT0EsT0FBUCxJQUFrQixXQUFuQixHQUFrQyxLQUFLSyxjQUF2QyxHQUF3RE8sT0FBTyxFQUFQLEVBQVcsS0FBS1AsY0FBaEIsRUFBZ0NMLE9BQWhDLENBQWxFLENBSDJCLENBR2lGO0FBQzVHLGtCQUFLZSxNQUFMLENBQVlmLE9BQVo7QUFDSCxVQWZVOztBQWlCWGUsaUJBQVEsZ0JBQVNmLE9BQVQsRUFBa0I7QUFDdEI3RixlQUFFLEtBQUtrRCxNQUFQLEVBQWUyRCxJQUFmLENBQW9CLFNBQXBCLEVBQStCLElBQUlDLE1BQUosQ0FBVyxLQUFLNUQsTUFBaEIsRUFBd0IyQyxPQUF4QixDQUEvQjtBQUNILFVBbkJVOztBQXFCWGtCLGtCQUFTLG1CQUFXO0FBQ2hCLG9CQUFPL0csRUFBRSxLQUFLa0QsTUFBUCxFQUFlMkQsSUFBZixDQUFvQixTQUFwQixDQUFQO0FBQ0g7O0FBdkJVLE1BQWY7QUEwQkFiLGVBQVVDLFFBQVYsR0FBcUJBLFFBQXJCOztBQUVBLFNBQUllLFlBQVk7QUFDWjlELGlCQUFRLEVBREk7QUFFWnFELGVBQU0sY0FBU3JELE1BQVQsRUFBaUI7QUFDbkIsaUJBQUksT0FBT0EsTUFBUCxJQUFpQixXQUFyQixFQUNJLEtBQUtBLE1BQUwsR0FBYyxZQUFkLENBREosS0FHSSxLQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSixrQkFBSytELEtBQUw7QUFDSCxVQVJXO0FBU1pBLGdCQUFPLGlCQUFXO0FBQ2RqSCxlQUFFLEtBQUtrRCxNQUFQLEVBQWV5QixFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFVBQTNCLEVBQXVDLFlBQVc7QUFDOUMscUJBQUlXLE9BQU90RixFQUFFLElBQUYsRUFBUWtGLE9BQVIsQ0FBZ0IsT0FBaEIsQ0FBWDtBQUNBLHFCQUFJSSxLQUFLNEIsUUFBTCxDQUFjLFFBQWQsQ0FBSixFQUNJNUIsS0FBS1YsV0FBTCxDQUFpQixRQUFqQixFQURKLEtBR0lVLEtBQUtULFFBQUwsQ0FBYyxRQUFkLEVBQXdCc0MsUUFBeEIsQ0FBaUMsT0FBakMsRUFBMEN2QyxXQUExQyxDQUFzRCxRQUF0RDtBQUNKNUUsbUJBQUVDLE1BQUYsRUFBVW1ILFNBQVYsQ0FBb0I5QixLQUFLK0IsUUFBTCxHQUFnQkMsR0FBcEM7QUFDSCxjQVBEO0FBUUg7QUFsQlcsTUFBaEI7QUFvQkF0QixlQUFVZ0IsU0FBVixHQUFzQkEsU0FBdEI7O0FBRUE7QUFDQSxTQUFJTyxVQUFVO0FBQ1ZoQixlQUFNLGNBQVdWLE9BQVgsRUFBcUI7QUFDdkIsa0JBQUsyQixPQUFMLENBQWUzQixPQUFmO0FBQ0gsVUFIUztBQUlWMkIsa0JBQVMsaUJBQVczQixPQUFYLEVBQXFCO0FBQUEsaUJBRWxCNEIsS0FGa0IsR0FRbEI1QixPQVJrQixDQUVsQjRCLEtBRmtCO0FBQUEsaUJBR2xCbkgsR0FIa0IsR0FRbEJ1RixPQVJrQixDQUdsQnZGLEdBSGtCO0FBQUEsaUJBSWxCb0gsZUFKa0IsR0FRbEI3QixPQVJrQixDQUlsQjZCLGVBSmtCO0FBQUEsaUJBS2xCQyxvQkFMa0IsR0FRbEI5QixPQVJrQixDQUtsQjhCLG9CQUxrQjtBQUFBLGlCQU1sQkMsWUFOa0IsR0FRbEIvQixPQVJrQixDQU1sQitCLFlBTmtCO0FBQUEsaUJBT2xCQyxpQkFQa0IsR0FRbEJoQyxPQVJrQixDQU9sQmdDLGlCQVBrQjs7QUFTMUIsaUJBQUlDLHFHQUVzQkwsS0FGdEIscUVBSUVuSCxXQUFTQSxHQUFULEtBSkYsMkhBTzBDb0gsa0JBQWtCQSxlQUFsQixHQUFvQyxJQVA5RSwwRUFRdUNFLGVBQWVBLFlBQWYsR0FBOEIsSUFSckUsMkxBQUo7QUFlQSxpQkFBSXpELE9BQU9oRSxJQUFJa0QsYUFBSixDQUFrQixNQUFsQixDQUFYO0FBQUEsaUJBQ0kwRSxlQUFlNUgsSUFBSTZILGFBQUosQ0FBa0IsS0FBbEIsQ0FEbkI7QUFFQUQsMEJBQWFoRixZQUFiLENBQTBCLE9BQTFCLEVBQW1DLGVBQW5DO0FBQ0FnRiwwQkFBYUUsU0FBYixHQUF5QkgsR0FBekI7QUFDQTNELGtCQUFLK0QsV0FBTCxDQUFtQkgsWUFBbkI7QUFDQSxrQkFBS3ZCLEtBQUwsR0FBYXBHLFNBQVNpRCxhQUFULENBQXVCLGdCQUF2QixDQUFiO0FBQ0Esa0JBQUs4RSxZQUFMLENBQW1CTixpQkFBbkIsRUFBc0NGLG9CQUF0QztBQUNILFVBbkNTO0FBb0NWUSx1QkFBYyxzQkFBVU4saUJBQVYsRUFBNkJGLG9CQUE3QixFQUFtRDtBQUM3RCxpQkFBSW5CLFFBQVEsS0FBS0EsS0FBakI7QUFBQSxpQkFDSTRCLFVBQVUsQ0FBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixXQUFoQixFQUE2QkMsR0FBN0IsQ0FBa0MsVUFBQ0MsQ0FBRDtBQUFBLHdCQUFPOUIsTUFBTW5ELGFBQU4sT0FBd0JpRixDQUF4QixDQUFQO0FBQUEsY0FBbEMsQ0FEZDtBQUVBRixxQkFBUWpGLE9BQVIsQ0FBZ0IsVUFBU3NCLE9BQVQsRUFBa0I4RCxLQUFsQixFQUF5QkMsS0FBekIsRUFBK0I7QUFDM0MvRCx5QkFBUW5CLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFlBQVU7QUFDeEMseUJBQUksS0FBS08sU0FBTCxDQUFlQyxPQUFmLENBQXVCLElBQXZCLElBQStCLENBQUMsQ0FBaEMsSUFBcUMsT0FBTytELGlCQUFQLElBQTRCLFVBQXJFLEVBQWlGO0FBQzdFQTtBQUNIO0FBQ0QseUJBQUksS0FBS2hFLFNBQUwsQ0FBZUMsT0FBZixDQUF1QixPQUF2QixJQUFrQyxDQUFDLENBQW5DLElBQXdDeUUsU0FBUyxDQUFqRCxJQUFzRCxPQUFPWixvQkFBUCxJQUErQixVQUF6RixFQUFxRztBQUNqR0E7QUFDSDtBQUNEeEgseUJBQUlnRSxJQUFKLENBQVNzRSxXQUFULENBQXNCakMsS0FBdEI7QUFDSCxrQkFSRCxFQVFHLEtBUkg7QUFTSCxjQVZEO0FBV0g7QUFsRFMsTUFBZDs7QUFxREFSLGVBQVV1QixPQUFWLEdBQW9CQSxPQUFwQjs7QUFFQSxTQUFJbUIsUUFBUTtBQUNSbkMsZUFBTSxjQUFXVixPQUFYLEVBQXFCO0FBQ3ZCLGtCQUFLMkIsT0FBTCxDQUFjM0IsT0FBZDtBQUNILFVBSE87QUFJUjJCLGtCQUFTLGlCQUFVM0IsT0FBVixFQUFvQjtBQUFBLGlCQUVqQjRCLEtBRmlCLEdBTWpCNUIsT0FOaUIsQ0FFakI0QixLQUZpQjtBQUFBLGlCQUdqQm5ILEdBSGlCLEdBTWpCdUYsT0FOaUIsQ0FHakJ2RixHQUhpQjtBQUFBLGlCQUlqQnNILFlBSmlCLEdBTWpCL0IsT0FOaUIsQ0FJakIrQixZQUppQjtBQUFBLGlCQUtqQkMsaUJBTGlCLEdBTWpCaEMsT0FOaUIsQ0FLakJnQyxpQkFMaUI7O0FBT3pCLGlCQUFJQyw2RkFFa0JMLEtBRmxCLDZEQUlGbkgsV0FBU0EsR0FBVCxLQUpFLGdJQU91RHNILGVBQWVBLFlBQWYsR0FBOEIsSUFQckYsbUtBQUo7QUFjQSxpQkFBSXpELE9BQU9oRSxJQUFJa0QsYUFBSixDQUFrQixNQUFsQixDQUFYO0FBQUEsaUJBQ0kwRSxlQUFlNUgsSUFBSTZILGFBQUosQ0FBa0IsS0FBbEIsQ0FEbkI7QUFFQUQsMEJBQWFoRixZQUFiLENBQTBCLE9BQTFCLEVBQW1DLGFBQW5DO0FBQ0FnRiwwQkFBYUUsU0FBYixHQUF5QkgsR0FBekI7QUFDQTNELGtCQUFLK0QsV0FBTCxDQUFrQkgsWUFBbEI7QUFDQSxrQkFBS3ZCLEtBQUwsR0FBYXBHLFNBQVNpRCxhQUFULENBQXVCLGNBQXZCLENBQWI7QUFDQSxrQkFBSzhFLFlBQUwsQ0FBbUJOLGlCQUFuQjtBQUNILFVBaENPO0FBaUNSTSx1QkFBYyxzQkFBVU4saUJBQVYsRUFBNkI7QUFDdkN0SCxxQkFBUUMsR0FBUixDQUFZSixTQUFTaUQsYUFBVCxDQUF1QixNQUF2QixDQUFaO0FBQ0EsaUJBQUltRCxRQUFRLEtBQUtBLEtBQWpCOztBQUVBLGNBQUMsSUFBRCxFQUFPLFdBQVAsRUFBb0I2QixHQUFwQixDQUF5QixVQUFDQyxDQUFEO0FBQUEsd0JBQU85QixNQUFNbkQsYUFBTixPQUF3QmlGLENBQXhCLENBQVA7QUFBQSxjQUF6QixFQUNDbkYsT0FERCxDQUNTLFVBQVNzQixPQUFULEVBQWtCOEQsS0FBbEIsRUFBeUJDLEtBQXpCLEVBQStCO0FBQ3BDL0QseUJBQVFuQixnQkFBUixDQUF5QixPQUF6QixFQUFrQyxZQUFVO0FBQ3hDLHlCQUFJLEtBQUtPLFNBQUwsQ0FBZUMsT0FBZixDQUF1QixJQUF2QixJQUErQixDQUFDLENBQWhDLElBQXFDLE9BQU8rRCxpQkFBUCxJQUE0QixVQUFyRSxFQUFpRjtBQUM3RUE7QUFDSDtBQUNEMUgseUJBQUlnRSxJQUFKLENBQVNzRSxXQUFULENBQXNCakMsS0FBdEI7QUFDSCxrQkFMRCxFQUtHLEtBTEg7QUFNSCxjQVJEO0FBU0g7QUE5Q08sTUFBWjs7QUFpREFSLGVBQVUwQyxLQUFWLEdBQWtCQSxLQUFsQjs7QUFFQXpJLFlBQU8rRixTQUFQLEdBQW1CQSxTQUFuQjtBQUVILEVBeEtELEVBd0tHaEcsQ0F4S0g7O0FBMktBO0FBQ0FBLEdBQUUsWUFBVzs7QUFFVCxTQUFJVSxPQUFPRCxHQUFHQyxJQUFkO0FBQUEsU0FDSThCLFNBQVMvQixHQUFHK0IsTUFEaEI7QUFBQSxTQUVJWCxXQUFXbkIsS0FBS21CLFFBQUwsRUFGZjs7QUFJQVcsWUFBT0MsYUFBUDtBQUNBRCxZQUFPUyxTQUFQOztBQUVBakQsT0FBRSxNQUFGLEVBQVU2RSxRQUFWLENBQW1CLENBQUNoRCxTQUFTSSxLQUFULEVBQUQsRUFBbUJ2QixLQUFLNEIsVUFBeEIsRUFBb0NxRyxJQUFwQyxDQUF5QyxHQUF6QyxDQUFuQjs7QUFFQTNDLGVBQVVnQixTQUFWLENBQW9CVCxJQUFwQixDQUF5QixZQUF6Qjs7QUFFQS9ELFlBQU91QixlQUFQLENBQXVCLFlBQVc7QUFDOUI7QUFDSCxNQUZEOztBQUlBO0FBQ0EsU0FBSTZFLFNBQVMvRixJQUFULENBQWNpQixPQUFkLENBQXNCLE1BQXRCLElBQWdDLENBQUMsQ0FBckMsRUFBd0M7QUFDcEMrRSxhQUFJQyxjQUFKO0FBQ0FELGFBQUlFLGFBQUo7QUFDSDtBQUNKLEVBdEJEOztBQXdCQTs7O0FBR0E5SSxRQUFPZ0UsY0FBUCxHQUF3QixVQUFTQyxHQUFULEVBQWNGLFFBQWQsRUFBd0I7QUFDNUMsU0FBSWdGLFNBQVM1SSxTQUFTNEgsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0FnQixZQUFPQyxHQUFQLEdBQWEvRSxHQUFiOztBQUVBOEUsWUFBTzFGLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQVc7QUFDdkMsYUFBSSxPQUFPVSxRQUFQLElBQW1CLFVBQXZCLEVBQW1DQSxTQUFTZ0YsTUFBVDtBQUN0QyxNQUZELEVBRUcsS0FGSDtBQUdILEVBUEQsQzs7Ozs7O0FDbllBLDBDOzs7Ozs7Ozs7Ozs7O0tDQU85SSxHLEdBQXNCRCxNO0tBQWpCRSxHLEdBQXlCQyxRO0tBQXBCOEksRyxHQUE4QixrQjtLQUF6QkMsRSxHQUE2QyxlOzs7QUFFbkUsS0FDQ3JCLE1BQU8sU0FBUEEsR0FBTztBQUFBLFNBQUsxSCxTQUFTK0ksRUFBVCxFQUFhQyxDQUFiLENBQUw7QUFBQSxFQURSO0FBQUEsS0FFQ0MsU0FBVSxTQUFWQSxNQUFVO0FBQUEsU0FBS2pKLFNBQVM4SSxHQUFULEVBQWNFLENBQWQsQ0FBTDtBQUFBLEVBRlg7QUFBQSxLQUdDNUIsVUFBVSxTQUFWQSxPQUFVLENBQUM0QixDQUFELEVBQUlFLElBQUosRUFBYTtBQUN0QixNQUFJeEIsTUFBTTFILFNBQVM0SCxhQUFULENBQXVCb0IsQ0FBdkIsQ0FBVjtBQUNBLE1BQUssUUFBT0UsSUFBUCx5Q0FBT0EsSUFBUCxNQUFlLFFBQWYsSUFBMkI1QyxPQUFPNkMsSUFBUCxDQUFZRCxJQUFaLEVBQWtCOUgsTUFBbEIsR0FBMkIsQ0FBM0QsRUFDQyxLQUFNLElBQUlELENBQVYsSUFBZStILElBQWY7QUFDQ3hCLE9BQUkvRSxZQUFKLENBQWlCeEIsQ0FBakIsRUFBb0IrSCxLQUFLL0gsQ0FBTCxDQUFwQjtBQURELEdBRUQsT0FBT3VHLEdBQVA7QUFDQSxFQVRGO0FBQUEsS0FVQzBCLFVBQVUsU0FBVkEsT0FBVTtBQUFBLFNBQUtwSixTQUFTcUosY0FBVCxDQUF3QkwsQ0FBeEIsQ0FBTDtBQUFBLEVBVlg7QUFBQSxLQVdDTSxVQUFVLFNBQVZBLE9BQVUsQ0FBQ3BFLElBQUQsRUFBTzdCLE1BQVA7QUFBQSxTQUFrQkEsT0FBT2tHLFlBQVAsQ0FBb0JyRSxJQUFwQixFQUEwQjdCLE9BQU9tRyxVQUFQLENBQWtCLENBQWxCLENBQTFCLENBQWxCO0FBQUEsRUFYWDtBQUFBLEtBWUNDLFNBQVUsU0FBVkEsTUFBVSxDQUFDdkUsSUFBRCxFQUFPN0IsTUFBUDtBQUFBLFNBQWtCQSxPQUFPeUUsV0FBUCxDQUFtQjVDLElBQW5CLENBQWxCO0FBQUEsRUFaWDs7QUFjQSxLQUFNd0UsV0FBVyxDQUNoQjtBQUNDQyxVQUFRLElBRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDeEMsVUFBTyxJQURSO0FBRUM1RSxTQUFNLHlCQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FETSxFQU1OO0FBQ0N6QyxVQUFPLFVBRFI7QUFFQzVFLFNBQU0sNEJBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQU5NLEVBV047QUFDQ3pDLFVBQU8sZ0JBRFI7QUFFQzVFLFNBQU0sNENBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQVhNO0FBSFIsRUFEZ0IsRUF1QmhCO0FBQ0NILFVBQVEsT0FEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0N4QyxVQUFPLE1BRFI7QUFFQzVFLFNBQU0sc0NBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ3pDLFVBQU8sZUFEUjtBQUVDNUUsU0FBTSw2QkFGUDtBQUdDcUgsYUFBVTtBQUhYLEdBTk07QUFIUixFQXZCZ0IsRUF1Q2hCO0FBQ0NILFVBQVEsRUFEVDtBQUVDQyxVQUFRLFFBRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0N4QyxVQUFPLElBRFI7QUFFQzVFLFNBQU0scUNBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQURNO0FBSFIsRUF2Q2dCLEVBa0RoQjtBQUNDSCxVQUFRLEtBRFQ7QUFFQ0MsVUFBUSxNQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDeEMsVUFBTyxvQkFEUjtBQUVDNUUsU0FBTSxnREFGUDtBQUdDcUgsYUFBVTtBQUhYLEdBRE0sRUFNTjtBQUNDekMsVUFBTyxxQkFEUjtBQUVDNUUsU0FBTSwyREFGUDtBQUdDcUgsYUFBVTtBQUhYLEdBTk0sRUFXTjtBQUNDekMsVUFBTyxjQURSO0FBRUM1RSxTQUFNLHNEQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FYTTtBQUhSLEVBbERnQixFQXVFaEI7QUFDQ0gsVUFBUSxRQURUO0FBRUNDLFVBQVEsVUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ3hDLFVBQU8sU0FEUjtBQUVDNUUsU0FBTSwrQkFGUDtBQUdDcUgsYUFBVTtBQUhYLEdBRE0sRUFNTjtBQUNDekMsVUFBTyxjQURSO0FBRUM1RSxTQUFNLG1DQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FOTSxFQVdOO0FBQ0N6QyxVQUFPLGtCQURSO0FBRUM1RSxTQUFNLGdEQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FYTSxFQWdCTjtBQUNDekMsVUFBTyxrQkFEUjtBQUVDNUUsU0FBTSwrQ0FGUDtBQUdDcUgsYUFBVTtBQUhYLEdBaEJNLEVBcUJOO0FBQ0N6QyxVQUFPLFdBRFI7QUFFQzVFLFNBQU0sMkNBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQXJCTSxFQTBCTjtBQUNDekMsVUFBTyxnQkFEUjtBQUVDNUUsU0FBTSwwQ0FGUDtBQUdDcUgsYUFBVTtBQUhYLEdBMUJNLEVBK0JOO0FBQ0N6QyxVQUFPLHVCQURSO0FBRUM1RSxTQUFNLHdDQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0EvQk07QUFIUixFQXZFZ0IsRUFnSGhCO0FBQ0NILFVBQVEsS0FEVDtBQUVDQyxVQUFRLEVBRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0N4QyxVQUFPLElBRFI7QUFFQzVFLFNBQU0sOEJBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQURNO0FBSFIsRUFoSGdCLEVBMkhoQjtBQUNDSCxVQUFRLE9BRFQ7QUFFQ0MsVUFBUSxJQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDeEMsVUFBTyxXQURSO0FBRUM1RSxTQUFNLG1DQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FETSxFQU1OO0FBQ0N6QyxVQUFPLFVBRFI7QUFFQzVFLFNBQU0sb0NBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQU5NO0FBSFIsRUEzSGdCLEVBMkloQjtBQUNDSCxVQUFRLE1BRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDeEMsVUFBTyxPQURSO0FBRUM1RSxTQUFNLDZCQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FETTtBQUhSLEVBM0lnQixFQXNKaEI7QUFDQ0gsVUFBUSxPQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ3hDLFVBQU8sTUFEUjtBQUVDNUUsU0FBTSwrQkFGUDtBQUdDcUgsYUFBVTtBQUhYLEdBRE07QUFIUixFQXRKZ0IsRUFpS2hCO0FBQ0NILFVBQVEsTUFEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0N4QyxVQUFPLFNBRFI7QUFFQzVFLFNBQU0sMkJBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQURNO0FBSFIsRUFqS2dCLEVBNEtoQjtBQUNDSCxVQUFRLEtBRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDeEMsVUFBTyxJQURSO0FBRUM1RSxTQUFNLDBCQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FETTtBQUhSLEVBNUtnQixFQXVMaEI7QUFDQ0gsVUFBTyxPQURSO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ3hDLFVBQU8sT0FEUjtBQUVDNUUsU0FBTSwrQkFGUDtBQUdDcUgsYUFBVTtBQUhYLEdBRE0sRUFNTjtBQUNDekMsVUFBTyxXQURSO0FBRUM1RSxTQUFNLHFDQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FOTSxFQVdOO0FBQ0N6QyxVQUFPLE9BRFI7QUFFQzVFLFNBQU0sZ0NBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQVhNLEVBZ0JOO0FBQ0N6QyxVQUFPLGNBRFI7QUFFQzVFLFNBQU0seUNBRlA7QUFHQ3FILGFBQVU7QUFIWCxHQWhCTSxFQXFCTjtBQUNDekMsVUFBTyxjQURSO0FBRUM1RSxTQUFNLGtDQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FyQk0sRUEwQk47QUFDQ3pDLFVBQU8sTUFEUjtBQUVDNUUsU0FBTSwyQ0FGUDtBQUdDcUgsYUFBVTtBQUhYLEdBMUJNO0FBSFIsRUF2TGdCLEVBMk5oQjtBQUNDSCxVQUFRLEVBRFQ7QUFFQ0MsVUFBUSxNQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDeEMsVUFBTyxlQURSO0FBRUM1RSxTQUFNLG1DQUZQO0FBR0NxSCxhQUFVO0FBSFgsR0FETTtBQUhSLEVBM05nQixFQXNPaEI7QUFDQ0gsVUFBUSxNQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ3hDLFVBQU8sTUFEUjtBQUVDNUUsU0FBTSxtQ0FGUDtBQUdDcUgsYUFBVTtBQUhYLEdBRE07QUFIUixFQXRPZ0IsQ0FBakI7O0FBb1BBLEtBQUlDLFdBQVdMLFNBQVNNLE1BQVQsQ0FBZ0IsVUFBQ0MsQ0FBRCxFQUFJL0IsQ0FBSixFQUFVO0FBQUEsTUFDbkN5QixNQURtQyxHQUNWekIsQ0FEVSxDQUNuQ3lCLE1BRG1DO0FBQUEsTUFDM0JDLE1BRDJCLEdBQ1YxQixDQURVLENBQzNCMEIsTUFEMkI7QUFBQSxNQUNuQkMsS0FEbUIsR0FDVjNCLENBRFUsQ0FDbkIyQixLQURtQjs7QUFFeEMsVUFBVUksS0FBSyxFQUFmLGNBQ0VOLHdCQUFzQkEsTUFBdEIsc0JBREYsY0FFRUMsVUFBVSxFQUFWLEdBQWVBLE1BQWYsa0JBQXFDQSxNQUFyQyxpQkFGRixpQkFHTUMsTUFBTUcsTUFBTixDQUFhLFVBQUNFLEVBQUQsRUFBS0MsRUFBTCxFQUFZO0FBQUEsT0FDeEI5QyxLQUR3QixHQUNDOEMsRUFERCxDQUN4QjlDLEtBRHdCO0FBQUEsT0FDakI1RSxJQURpQixHQUNDMEgsRUFERCxDQUNqQjFILElBRGlCO0FBQUEsT0FDWHFILFFBRFcsR0FDQ0ssRUFERCxDQUNYTCxRQURXOztBQUU3QixXQUFVSSxNQUFNLEVBQWhCLG1CQUNJSixXQUFXLGFBQVgsR0FBMkIsRUFEL0IsbUJBQzhDckgsSUFEOUMsVUFDdUQ0RSxLQUR2RDtBQUN3RSxHQUhwRSxFQUdzRSxDQUh0RSxDQUhOO0FBU0EsRUFYYyxFQVdaLENBWFksQ0FBZjs7QUFhQTtBQUNBeEgsUUFBTzRJLEdBQVAsR0FBYTtBQUNaRSxpQkFBZSx5QkFBVTtBQUN4QixPQUFJeUIsa0dBQUo7O0FBSUMsT0FBS3hLLEVBQUUscUJBQUYsRUFBeUJ3QixNQUF6QixJQUFtQyxDQUF4QyxFQUEyQztBQUMxQ3hCLE1BQUUsT0FBRixFQUFXMEosT0FBWCxDQUFtQmMsV0FBbkI7QUFDQTs7QUFFRHhLLEtBQUUsZUFBRixFQUFtQjJFLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVk7QUFDMUMsUUFBSXdGLFdBQVduSyxFQUFFLFlBQUYsQ0FBZjtBQUFBLFFBQ0l5SyxZQUFZLFdBRGhCO0FBQUEsUUFFSUMsWUFBWVAsU0FBU2pELFFBQVQsQ0FBbUJ1RCxTQUFuQixDQUZoQjtBQUdBLFFBQUlDLFNBQUosRUFBZTtBQUNkUCxjQUFTUSxHQUFULENBQWEzSyxFQUFFLElBQUYsQ0FBYixFQUFzQjRFLFdBQXRCLENBQW1DNkYsU0FBbkM7QUFDQSxLQUZELE1BRU87QUFDTk4sY0FBU1EsR0FBVCxDQUFhM0ssRUFBRSxJQUFGLENBQWIsRUFBc0I2RSxRQUF0QixDQUFnQzRGLFNBQWhDO0FBQ0E7QUFDRCxJQVREO0FBVUQ7O0FBRUQ7QUF0QlksSUF1QlgzQixnQkFBZ0IsMEJBQVU7O0FBRTFCLE9BQUs5SSxFQUFFLE9BQUYsRUFBV3dCLE1BQVgsSUFBcUIsQ0FBMUIsRUFBOEI7QUFDN0IySSxlQUFXbkssRUFBRSxpQkFBRixFQUFxQjZKLE1BQXJCLENBQTZCN0osRUFBRSxzQ0FBRixFQUEwQzZKLE1BQTFDLENBQWtETSxRQUFsRCxDQUE3QixDQUFYO0FBQ0FuSyxNQUFFLE9BQUYsRUFBV3dCLE1BQVgsSUFBcUIsQ0FBckIsR0FBeUJ4QixFQUFFLE1BQUYsRUFBVTBKLE9BQVYsQ0FBbUJTLFFBQW5CLENBQXpCLEdBQXlEbkssRUFBRSxPQUFGLEVBQVcwSixPQUFYLENBQW9CUyxRQUFwQixDQUF6RDtBQUNBO0FBQ0RuSyxLQUFFLFlBQUYsRUFBZ0IwRSxJQUFoQixDQUFxQixHQUFyQixFQUEwQlcsSUFBMUIsQ0FBK0IsWUFBVTtBQUN4QyxRQUFJdUYsUUFBUTVLLEVBQUUsSUFBRixFQUFRc0osSUFBUixDQUFhLE1BQWIsQ0FBWjtBQUNBLFFBQUtzQixNQUFNOUcsT0FBTixDQUFjLE1BQWQsS0FBeUIsQ0FBQyxDQUEvQixFQUFtQztBQUNsQzlELE9BQUUsSUFBRixFQUFRc0osSUFBUixDQUFhLE1BQWIsRUFBcUJzQixRQUFRLE1BQTdCO0FBQ0E7QUFDRCxJQUxEO0FBTUEsR0FuQ1c7QUFvQ1hDLFFBQU0sY0FBU3ZLLEdBQVQsRUFBYTtBQUNuQkEsU0FBTUEsT0FBTyxXQUFiO0FBQ0FOLEtBQUUsTUFBRixFQUFVNkosTUFBVixDQUNDN0osRUFBRSxzQkFBRixFQUEwQjZKLE1BQTFCLENBQ0M3SixhQUFXTSxHQUFYLHVEQURELENBREQ7QUFLQU4sS0FBRSxPQUFGLEVBQVcyRSxFQUFYLENBQWMsT0FBZCxFQUF1QixRQUF2QixFQUFpQyxZQUFVO0FBQzFDM0UsTUFBRSxPQUFGLEVBQVdtRixNQUFYO0FBQ0EsSUFGRDtBQUdBO0FBOUNXLEVBQWIsQzs7Ozs7Ozs7QUNsUkE7Ozs7Ozs7Ozs7Ozs7OztBQWVBbEYsUUFBTzZLLFdBQVAsR0FBcUIsVUFBVWpGLE9BQVYsRUFBb0I7QUFDeEM7QUFDQSxNQUFLLEVBQUUsZ0JBQWdCaUYsV0FBbEIsQ0FBTCxFQUFzQyxPQUFPLElBQUlBLFdBQUosQ0FBZ0JDLE9BQWhCLEVBQXlCQyxhQUF6QixDQUFQO0FBQ3RDLE9BQUtELE9BQUwsR0FBaUIzSyxTQUFTaUQsYUFBVCxDQUF1QndDLFFBQVFrRixPQUEvQixDQUFqQjtBQUNBLE9BQUtFLGNBQUwsR0FBc0IsS0FBS0YsT0FBTCxDQUFhMUgsYUFBYixDQUEyQixzQkFBM0IsQ0FBdEIsRUFDQSxLQUFLNkgsS0FBTCxHQUFnQixJQURoQixFQUVBLEtBQUtDLE1BQUwsR0FBZ0IsS0FBS0osT0FBTCxDQUFhcEksZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsQ0FBdkMsQ0FGaEI7QUFHQSxPQUFLeUksT0FBTCxHQUFpQixLQUFLTCxPQUFMLENBQWFwSSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxDQUF2QyxDQUFqQjtBQUNBLE9BQUswSSxRQUFMLEdBQWtCLElBQWxCO0FBQ0EsT0FBS0MsT0FBTCxHQUFrQixZQUFVO0FBQzNCLE9BQUt6RixRQUFRMEYsU0FBUixJQUFxQjFGLFFBQVEyRixRQUFsQyxFQUE2QyxPQUFPLENBQVA7QUFDN0MsT0FBSUQsWUFBWTFGLFFBQVEwRixTQUFSLEdBQW9CRSxPQUFPNUYsUUFBUTBGLFNBQWYsQ0FBcEIsR0FBZ0QsQ0FBaEU7QUFDQSxVQUFPQSxTQUFQO0FBQ0EsR0FKZ0IsRUFBakI7QUFLQSxPQUFLRyxZQUFMLEdBQXFCLElBQXJCO0FBQ0EsT0FBS0MsTUFBTCxHQUFnQixLQUFLWixPQUFMLENBQWExSCxhQUFiLENBQTJCLFNBQTNCLENBQWhCO0FBQ0EsT0FBS3VJLE9BQUwsR0FBaUIsS0FBS2IsT0FBTCxDQUFhMUgsYUFBYixDQUEyQixVQUEzQixDQUFqQjtBQUNBLE9BQUt3SSxFQUFMLEdBQWEsS0FBS0QsT0FBTCxDQUFhdkksYUFBYixDQUEyQixLQUEzQixDQUFiO0FBQ0EsT0FBS3lJLE9BQUwsR0FBaUIsS0FBS0YsT0FBTCxDQUFhdkksYUFBYixDQUEyQixhQUEzQixDQUFqQjtBQUNBLE9BQUswSSxRQUFMLEdBQWtCLEtBQUtILE9BQUwsQ0FBYXZJLGFBQWIsQ0FBMkIsY0FBM0IsQ0FBbEI7QUFDQSxPQUFLMkksU0FBTCxHQUFtQixLQUFLSixPQUFMLENBQWF2SSxhQUFiLENBQTJCLGVBQTNCLENBQW5CO0FBQ0EsT0FBSzRJLFFBQUwsR0FBa0IsS0FBS0wsT0FBTCxDQUFhdkksYUFBYixDQUEyQixXQUEzQixDQUFsQjtBQUNBLE9BQUs2SSxPQUFMLEdBQWlCLEtBQUtOLE9BQUwsQ0FBYXZJLGFBQWIsQ0FBMkIsT0FBM0IsQ0FBakI7QUFDQSxPQUFLa0ksU0FBTCxHQUFtQixLQUFLVSxRQUFMLENBQWM1SSxhQUFkLENBQTRCLFVBQTVCLENBQW5CO0FBQ0EsT0FBSzhJLE9BQUwsR0FBaUIsS0FBS0YsUUFBTCxDQUFjNUksYUFBZCxDQUE0QixNQUE1QixDQUFqQjtBQUNBLE9BQUsrSSxPQUFMLEdBQWlCLEtBQUtSLE9BQUwsQ0FBYXZJLGFBQWIsQ0FBMkIsVUFBM0IsQ0FBakI7QUFDQSxPQUFLZ0osUUFBTCxHQUFrQixLQUFLVCxPQUFMLENBQWF2SSxhQUFiLENBQTJCLFlBQTNCLENBQWxCO0FBQ0EsT0FBS2lKLFNBQUwsR0FBbUIsS0FBS0QsUUFBTCxDQUFjaEosYUFBZCxDQUE0QixlQUE1QixDQUFuQjtBQUNBLE9BQUtrSixhQUFMLEdBQXFCMUcsUUFBUTBHLGFBQTdCO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixLQUFLekIsT0FBTCxDQUFhMUgsYUFBYixDQUEyQixlQUEzQixDQUFuQjtBQUNBLE9BQUtvSixhQUFMLEdBQXNCLE9BQXRCO0FBQ0EsT0FBS3pCLGFBQUwsR0FBcUIsT0FBT25GLFFBQVFtRixhQUFmLElBQWdDLFVBQWhDLEdBQTZDbkYsUUFBUW1GLGFBQXJELEdBQXFFLFlBQVc7QUFDcEd6SyxXQUFRbU0sSUFBUixDQUFhLHVDQUFiO0FBQ0EsR0FGRDtBQUdBLE9BQUtDLFFBQUwsR0FBZ0IsT0FBTzlHLFFBQVErRyxrQkFBZixJQUFxQyxVQUFyQyxHQUFrRC9HLFFBQVErRyxrQkFBMUQsR0FBK0UsWUFBVSxDQUFFLENBQTNHOztBQUVBLE9BQUtDLFlBQUw7QUFDQSxPQUFLQyxPQUFMO0FBQ0EsT0FBS0MsS0FBTDtBQUNBLE9BQUtDLEtBQUw7QUFFQSxFQXpDRDs7QUEyQ0FsQyxhQUFZbUMsU0FBWixDQUFzQkQsS0FBdEIsR0FBOEIsWUFBVztBQUN4QyxNQUFJdEgsT0FBTyxJQUFYOztBQUVBQSxPQUFLd0gsUUFBTCxDQUFleEgsS0FBS3VGLGNBQXBCLEVBQW9DLFFBQXBDOztBQUVBLEdBQUN2RixLQUFLb0csT0FBTixFQUFlcEcsS0FBS3FHLFFBQXBCLEVBQThCNUksT0FBOUIsQ0FBc0MsVUFBU2dLLEdBQVQsRUFBYzVFLEtBQWQsRUFBb0I7QUFDekQ0RSxPQUFJN0osZ0JBQUosQ0FBcUIsWUFBckIsRUFBbUMsWUFBVTtBQUM1Q29DLFNBQUt3SCxRQUFMLENBQWMsSUFBZCxFQUFvQixXQUFwQjtBQUNBLElBRkQsRUFFRyxLQUZIOztBQUlBQyxPQUFJN0osZ0JBQUosQ0FBcUIsVUFBckIsRUFBaUMsWUFBVTtBQUMxQ29DLFNBQUswSCxXQUFMLENBQWlCLElBQWpCLEVBQXVCLFdBQXZCO0FBQ0EsSUFGRCxFQUVHLEtBRkg7QUFHQSxHQVJEOztBQVVBMUgsT0FBS29HLE9BQUwsQ0FBYXhJLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQVc7O0FBRWpELE9BQUtvQyxLQUFLNkcsYUFBVixFQUEwQjtBQUN6QjdHLFNBQUs2RyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0E3RyxTQUFLMkgsa0JBQUw7QUFDQSxJQUhELE1BR087QUFDTjNILFNBQUs0SCxLQUFMO0FBQ0E7QUFDRCxHQVJELEVBUUcsS0FSSDtBQVNBLEVBeEJEOztBQTBCQXhDLGFBQVltQyxTQUFaLENBQXNCRixLQUF0QixHQUE4QixZQUFXO0FBQ3hDLE1BQUlRLElBQUlDLEtBQUtDLEtBQUwsQ0FBWSxLQUFLMUMsT0FBTCxDQUFhcEgsV0FBekIsQ0FBUjtBQUFBLE1BQ0MrSixJQUFJLENBREw7QUFFQUEsTUFBSyxJQUFJSCxDQUFMLEdBQVUsRUFBZDtBQUNBLE9BQUt4QyxPQUFMLENBQWE0QyxLQUFiLENBQW1CQyxNQUFuQixHQUE0QkosS0FBS0MsS0FBTCxDQUFXQyxDQUFYLElBQWdCLElBQTVDO0FBQ0EsRUFMRDs7QUFPQTVDLGFBQVltQyxTQUFaLENBQXNCSCxPQUF0QixHQUFnQyxZQUFZO0FBQzNDMU0sV0FBUytELElBQVQsQ0FBYzBKLFFBQWQsR0FBeUIsWUFBVTtBQUNsQ3ROLFdBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7O0FBTUFzSyxhQUFZbUMsU0FBWixDQUFzQkksa0JBQXRCLEdBQTJDLFlBQVk7QUFDdEQsTUFBSTNILE9BQU8sSUFBWDtBQUFBLE1BQ0NnRCxRQUFRaEQsS0FBSzhHLFdBRGQ7QUFFQTlHLE9BQUt3SCxRQUFMLENBQWN4RSxLQUFkLEVBQXFCLFFBQXJCO0FBQ0FoRCxPQUFLd0gsUUFBTCxDQUFleEgsS0FBS2tHLE9BQXBCLEVBQTZCLE1BQTdCO0FBQ0FsRCxRQUFNckYsYUFBTixDQUFvQixXQUFwQixFQUFpQ0MsZ0JBQWpDLENBQWtELE9BQWxELEVBQTJELFlBQVU7QUFDcEVvQyxRQUFLNEgsS0FBTDtBQUNBNUgsUUFBSzBILFdBQUwsQ0FBaUIxRSxLQUFqQixFQUF3QixRQUF4QjtBQUNBLEdBSEQsRUFHRyxLQUhIO0FBSUEsRUFURDs7QUFXQW9DLGFBQVltQyxTQUFaLENBQXNCSyxLQUF0QixHQUE4QixZQUFVO0FBQ3ZDLE1BQUk1SCxPQUFPLElBQVg7QUFBQSxNQUNDb0ksSUFBSSxJQURMOztBQUdBcEksT0FBS3dILFFBQUwsQ0FBZXhILEtBQUt1RixjQUFwQixFQUFvQyxRQUFwQzs7QUFFQSxNQUFLdkYsS0FBSzJGLFFBQVYsRUFBcUI7QUFDcEIzRixRQUFLMkYsUUFBTCxHQUFnQixLQUFoQjtBQUNBM0YsUUFBS3dILFFBQUwsQ0FBZXhILEtBQUtrRyxPQUFwQixFQUE2QixNQUE3QjtBQUNBLE9BQUtsRyxLQUFLd0YsS0FBTCxJQUFjLElBQW5CLEVBQTBCeEYsS0FBS3FJLGdCQUFMOztBQUUxQkQsT0FBSXBJLEtBQUt3RixLQUFUO0FBQ0E7O0FBRUF4RixRQUFLc0ksT0FBTDtBQUNBdEksUUFBS3VJLFFBQUw7QUFDQXZJLFFBQUt3SSxhQUFMO0FBQ0F4SSxRQUFLeUksTUFBTDtBQUNBekksUUFBSzBJLGVBQUw7QUFDQTFJLFFBQUsySSxNQUFMO0FBQ0EzSSxRQUFLNEksV0FBTDtBQUNBNUksUUFBSzZJLFlBQUw7QUFDQTdJLFFBQUs4SSxTQUFMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQVYsS0FBRVcsTUFBRixHQUFXLFlBQVU7QUFDcEJsTyxZQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQnNOLEVBQUVZLFlBQXhCO0FBQ0EsSUFGRDtBQUdBWixLQUFFYSxXQUFGLEdBQWdCLFlBQVU7QUFDekJwTyxZQUFRQyxHQUFSLENBQVksY0FBZXNOLENBQWYsQ0FBaUJZLFlBQTdCO0FBQ0EsSUFGRDtBQUdBWixLQUFFYyxZQUFGLEdBQWlCLFlBQVU7QUFDMUJyTyxZQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQnNOLEVBQUVZLFlBQTVCO0FBQ0EsSUFGRDtBQUdBWixLQUFFZSxnQkFBRixHQUFxQixZQUFVO0FBQzlCdE8sWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDc04sRUFBRVksWUFBbEM7QUFDQSxJQUZEOztBQUlBdE8sWUFBUzBPLHdCQUFULEdBQW9DLFlBQVc7QUFDOUMsUUFBSyxDQUFDaEIsRUFBRWlCLDBCQUFILElBQWlDakIsRUFBRWtCLEtBQXhDLEVBQWdEO0FBQy9Dek8sYUFBUUMsR0FBUixDQUFZLDZCQUFaO0FBQ0F5TyxnQkFBVyxZQUFVO0FBQ3BCdkosV0FBS3NGLGFBQUw7QUFDQSxNQUZELEVBRUcsSUFGSDtBQUdBO0FBQ0QsSUFQRDtBQVFBO0FBQ0R0RixPQUFLd0osU0FBTDs7QUFFQXhKLE9BQUt3RixLQUFMLENBQVdpRSxXQUFYLEdBQXlCLFlBQVU7QUFDbEM1TyxXQUFRQyxHQUFSLENBQVksV0FBWjtBQUNBLEdBRkQ7QUFJQSxFQXpERDs7QUEyREFzSyxhQUFZbUMsU0FBWixDQUFzQmUsT0FBdEIsR0FBZ0MsWUFBVTtBQUN6QyxNQUFJdEksT0FBTyxJQUFYOztBQUVBQSxPQUFLd0YsS0FBTCxDQUFXa0UsTUFBWCxHQUFvQixZQUFXO0FBQzlCMUosUUFBS3dILFFBQUwsQ0FBZXhILEtBQUtpRyxNQUFwQixFQUE0QixNQUE1QjtBQUNBLE9BQUssS0FBSzBELFdBQUwsSUFBb0IsQ0FBekIsRUFBNkIzSixLQUFLNEosZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDN0I1SixRQUFLK0csYUFBTCxHQUFxQixNQUFyQjtBQUNBbE0sV0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxHQUxEOztBQU9Ba0YsT0FBS3dGLEtBQUwsQ0FBV3FFLFNBQVgsR0FBdUIsWUFBVztBQUNqQzdKLFFBQUswSCxXQUFMLENBQWtCMUgsS0FBS3FHLFFBQXZCLEVBQWlDLE1BQWpDO0FBQ0FyRyxRQUFLd0gsUUFBTCxDQUFleEgsS0FBS29HLE9BQXBCLEVBQTZCLE1BQTdCO0FBQ0F2TCxXQUFRQyxHQUFSLENBQVksV0FBWjtBQUNBLEdBSkQ7O0FBTUFrRixPQUFLd0YsS0FBTCxDQUFXc0UsU0FBWCxHQUF1QixZQUFVO0FBQ2hDOUosUUFBSzBILFdBQUwsQ0FBaUIxSCxLQUFLdUYsY0FBdEIsRUFBc0MsUUFBdEM7QUFDQTFLLFdBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsR0FIRDtBQUlBLEVBcEJEOztBQXNCQXNLLGFBQVltQyxTQUFaLENBQXNCZ0IsUUFBdEIsR0FBaUMsWUFBVTtBQUMxQyxNQUFJdkksT0FBTyxJQUFYO0FBQUEsTUFDQ29JLElBQUlwSSxLQUFLd0YsS0FEVjtBQUVBeEYsT0FBS3dGLEtBQUwsQ0FBV3VFLE9BQVgsR0FBcUIsWUFBVztBQUMvQi9KLFFBQUswSCxXQUFMLENBQWtCMUgsS0FBS2tHLE9BQXZCLEVBQWdDLE1BQWhDO0FBQ0FsRyxRQUFLd0gsUUFBTCxDQUFleEgsS0FBS3FHLFFBQXBCLEVBQThCLE1BQTlCO0FBQ0FyRyxRQUFLMEgsV0FBTCxDQUFrQjFILEtBQUtvRyxPQUF2QixFQUFnQyxNQUFoQztBQUNBLE9BQUksS0FBS3VELFdBQUwsR0FBbUIsQ0FBdkIsRUFBMEIzSixLQUFLd0gsUUFBTCxDQUFjeEgsS0FBSzJHLFFBQW5CLEVBQTZCLE1BQTdCO0FBQzFCM0csUUFBSzRKLGdCQUFMLENBQXNCLEtBQXRCO0FBQ0EsT0FBS3hCLEVBQUVrQixLQUFQLEVBQWU7QUFDZCxRQUFLbEIsRUFBRWlCLDBCQUFQLEVBQW9DO0FBQ25DckosVUFBS3dGLEtBQUwsQ0FBVzVILGdCQUFYLENBQTRCLHFCQUE1QixFQUFtRCxZQUFVO0FBQzVELFVBQUl3SyxJQUFJcEksS0FBS3dGLEtBQWI7QUFDQXhGLFdBQUtzRixhQUFMO0FBQ0EsTUFIRCxFQUdHLEtBSEg7QUFJQTVLLGNBQVNrRCxnQkFBVCxDQUEwQixxQkFBMUIsRUFBaUQsWUFBVTtBQUMxRCxVQUFJd0ssSUFBSXBJLEtBQUt3RixLQUFiO0FBQ0F4RixXQUFLc0YsYUFBTDtBQUNBLE1BSEQsRUFHRyxLQUhIOztBQUtBLFNBQUs4QyxFQUFFNEIsY0FBUCxFQUF3QjtBQUN2Qm5QLGNBQVFDLEdBQVIsQ0FBWSxDQUFaO0FBQ0FzTixRQUFFNEIsY0FBRjtBQUNBLE1BSEQsTUFHTyxJQUFLNUIsRUFBRTZCLG9CQUFQLEVBQThCO0FBQ3BDcFAsY0FBUUMsR0FBUixDQUFZLENBQVo7QUFDQXNOLFFBQUU2QixvQkFBRjtBQUNBLE1BSE0sTUFHQSxJQUFLQyxRQUFRRixjQUFiLEVBQThCO0FBQ3BDblAsY0FBUUMsR0FBUixDQUFZLENBQVo7QUFDQW9QLGNBQVFGLGNBQVI7QUFDQSxNQUhNLE1BR0EsSUFBS0UsUUFBUUQsb0JBQWIsRUFBbUM7QUFDekNwUCxjQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBb1AsY0FBUUQsb0JBQVI7QUFDQTtBQUNELEtBdkJELE1BdUJPO0FBQ04sU0FBSzdCLEVBQUVrQixLQUFQLEVBQWV0SixLQUFLc0YsYUFBTDtBQUNmO0FBRUQ7QUFDRHpLLFdBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsR0FwQ0Q7QUFxQ0EsRUF4Q0Q7O0FBMENBc0ssYUFBWW1DLFNBQVosQ0FBc0I0QyxRQUF0QixHQUFpQyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQjtBQUNsRCxNQUFJdEssT0FBTyxJQUFYO0FBQ0EsTUFBSWpDLFNBQVMsQ0FBYjtBQUNBQSxXQUFTK0osS0FBS0MsS0FBTCxDQUFZc0MsSUFBSUMsQ0FBTCxHQUFVRixDQUFyQixDQUFUO0FBQ0EsU0FBT3JNLE1BQVA7QUFDQSxFQUxEOztBQU9BcUgsYUFBWW1DLFNBQVosQ0FBc0JnRCxXQUF0QixHQUFvQyxZQUFXO0FBQzlDLE1BQUl2SyxPQUFPLElBQVg7QUFDQSxNQUFJd0YsUUFBUWxMLEVBQUUwRixLQUFLcUYsT0FBUCxFQUFnQnJHLElBQWhCLENBQXFCLGVBQXJCLEVBQXNDTyxFQUF0QyxDQUF5QyxDQUF6QyxFQUE0Q1UsR0FBNUMsQ0FBZ0QsQ0FBaEQsQ0FBWjtBQUNBLE1BQUl1SyxRQUFRQyxZQUFZLFlBQVc7QUFDbEMsT0FBSWpGLE1BQU1rRixVQUFOLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3pCMUssU0FBSzBILFdBQUwsQ0FBa0IxSCxLQUFLdUYsY0FBdkIsRUFBdUMsUUFBdkM7QUFDQSxRQUFJTyxXQUFXZ0MsS0FBS0MsS0FBTCxDQUFXdkMsTUFBTU0sUUFBakIsQ0FBZjtBQUFBLFFBQ0NwQyxJQUFJLEVBREw7QUFBQSxRQUVDaUgsSUFBSSxFQUZMO0FBR0FqSCxRQUFJLENBQUNvQyxXQUFXLEVBQVosRUFBZ0I4RSxRQUFoQixFQUFKLEVBQ0FELElBQUksQ0FBQyxDQUFDN0UsV0FBV3BDLENBQVosSUFBaUIsRUFBbEIsRUFBc0JrSCxRQUF0QixFQURKO0FBRUFsSCxRQUFJQSxFQUFFNUgsTUFBRixHQUFXLENBQVgsR0FBZSxJQUFJNEgsQ0FBbkIsR0FBdUJBLENBQTNCO0FBQ0FpSCxRQUFJQSxFQUFFN08sTUFBRixHQUFXLENBQVgsR0FBZSxJQUFJNk8sQ0FBbkIsR0FBdUJBLENBQTNCO0FBQ0EzSyxTQUFLc0csU0FBTCxDQUFldUUsU0FBZixHQUEyQkYsSUFBSSxHQUFKLEdBQVVqSCxDQUFyQztBQUNBMUQsU0FBS3lHLE9BQUwsQ0FBYW9FLFNBQWIsR0FBeUJGLElBQUksR0FBSixHQUFVakgsQ0FBbkM7QUFDQW9ILGtCQUFjTixLQUFkO0FBQ0E7QUFDQTtBQUNELEdBZlcsRUFlVCxHQWZTLENBQVo7QUFnQkEsRUFuQkQ7O0FBcUJBcEYsYUFBWW1DLFNBQVosQ0FBc0J3RCxNQUF0QixHQUErQixVQUFVQyxTQUFWLEVBQXNCO0FBQ3BEO0FBQ0EsRUFGRDs7QUFJQTVGLGFBQVltQyxTQUFaLENBQXNCMEQsWUFBdEIsR0FBcUMsVUFBUzdDLENBQVQsRUFBVztBQUMvQyxNQUFJcEksT0FBTyxJQUFYO0FBQUEsTUFDQ3FGLFVBQVVyRixLQUFLcUYsT0FEaEI7QUFFQUEsVUFBUTRDLEtBQVIsQ0FBY0MsTUFBZCxHQUF1QmxJLEtBQUttSyxRQUFMLENBQWMvQixFQUFFOEMsVUFBaEIsRUFBNEI5QyxFQUFFK0MsV0FBOUIsRUFBMkMvQyxFQUFFbkssV0FBN0MsSUFBNEQsSUFBbkY7QUFDQSxFQUpEOztBQU1BbUgsYUFBWW1DLFNBQVosQ0FBc0JpQixhQUF0QixHQUFzQyxZQUFXO0FBQ2hELE1BQUl4SSxPQUFPLElBQVg7QUFBQSxNQUNDb0ksSUFBSXBJLEtBQUt3RixLQURWO0FBQUEsTUFFQzRGLEtBQUssQ0FGTjtBQUdBaEQsSUFBRWlELFlBQUYsR0FBaUIsWUFBVTtBQUMxQixPQUFLakQsRUFBRWtELE1BQVAsRUFBZ0I7QUFDaEJ0TCxRQUFLdUwsY0FBTCxDQUFvQixNQUFwQjtBQUNBO0FBQ0EsT0FBSUgsTUFBTXRELEtBQUtDLEtBQUwsQ0FBV0ssRUFBRXVCLFdBQWIsQ0FBTixJQUFvQzdCLEtBQUtDLEtBQUwsQ0FBV0ssRUFBRXVCLFdBQWIsSUFBNEIsQ0FBNUIsSUFBaUMsQ0FBekUsRUFBNkU7QUFDNUU7QUFDQTNKLFNBQUtpSCxRQUFMLENBQWVhLEtBQU9NLEVBQUV1QixXQUFGLEdBQWdCLENBQWpCLEdBQXNCLENBQXRCLEdBQTBCLE1BQTFCLEdBQW1DLE9BQXpDLEVBQW1EdkIsRUFBRXVCLFdBQXJELENBQWY7QUFDQXlCLFNBQUt0RCxLQUFLQyxLQUFMLENBQVdLLEVBQUV1QixXQUFiLENBQUw7QUFDQTtBQUNELEdBVEQ7QUFVQSxFQWREOztBQWdCQXZFLGFBQVltQyxTQUFaLENBQXNCa0IsTUFBdEIsR0FBK0IsWUFBVTtBQUN4QyxNQUFJekksT0FBTyxJQUFYO0FBQ0FBLE9BQUt3RixLQUFMLENBQVc1SCxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFNO0FBQzFDb0MsUUFBS3dILFFBQUwsQ0FBZXhILEtBQUsyRyxRQUFwQixFQUE4QixNQUE5QjtBQUNBM0csUUFBSzBILFdBQUwsQ0FBa0IxSCxLQUFLdUcsUUFBdkIsRUFBaUMsTUFBakM7QUFDQXZHLFFBQUt3SCxRQUFMLENBQWV4SCxLQUFLa0csT0FBcEIsRUFBNkIsYUFBN0I7QUFDQWxHLFFBQUswSCxXQUFMLENBQWtCMUgsS0FBS2tHLE9BQXZCLEVBQWdDLE1BQWhDO0FBQ0FsRyxRQUFLNEosZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDQSxHQU5ELEVBTUcsS0FOSDtBQU9BLEVBVEQ7O0FBV0F4RSxhQUFZbUMsU0FBWixDQUFzQm9CLE1BQXRCLEdBQStCLFlBQVc7QUFDekMsTUFBSTNJLE9BQU8sSUFBWDtBQUNBQSxPQUFLcUcsUUFBTCxDQUFjekksZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBTTtBQUM3Q29DLFFBQUs0RixPQUFMLEdBQWU1RixLQUFLd0YsS0FBTCxDQUFXbUUsV0FBMUI7QUFDQTNKLFFBQUt3SixTQUFMO0FBQ0F4SixRQUFLMEgsV0FBTCxDQUFrQjFILEtBQUtvRyxPQUF2QixFQUFnQyxNQUFoQztBQUNBcEcsUUFBS3dILFFBQUwsQ0FBZXhILEtBQUtxRyxRQUFwQixFQUE4QixNQUE5QjtBQUNBckcsUUFBSytHLGFBQUwsR0FBcUIsT0FBckI7QUFDQSxHQU5EO0FBT0EsRUFURDs7QUFXQTNCLGFBQVltQyxTQUFaLENBQXNCdUIsU0FBdEIsR0FBa0MsWUFBVztBQUMzQyxNQUFJOUksT0FBTyxJQUFYO0FBQ0RBLE9BQUttRyxFQUFMLENBQVF2SSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxZQUFNO0FBQ3ZDb0MsUUFBSzRKLGdCQUFMLENBQXNCLEtBQXRCO0FBQ0E1SixRQUFLd0gsUUFBTCxDQUFleEgsS0FBS2tHLE9BQXBCLEVBQTZCLE1BQTdCO0FBQ0EsR0FIRCxFQUdHLEtBSEg7QUFJQSxFQU5EOztBQVFBZCxhQUFZbUMsU0FBWixDQUFzQnNCLFlBQXRCLEdBQXFDLFlBQVc7QUFDOUMsTUFBSTdJLE9BQU8sSUFBWDtBQUNBMUYsSUFBRTBGLEtBQUtrRyxPQUFQLEVBQWdCakgsRUFBaEIsQ0FBbUI7QUFDcEIsMEJBQXVCLDhCQUFXO0FBQ2pDO0FBQ0EsSUFIbUI7QUFJcEIsbUNBQWdDLHNDQUFXO0FBQ3pDO0FBQ0Q7QUFObUIsR0FBbkI7QUFRRCxFQVZEOztBQVlBbUcsYUFBWW1DLFNBQVosQ0FBc0JxQixXQUF0QixHQUFvQyxZQUFXO0FBQzlDLE1BQUk1SSxPQUFPLElBQVg7QUFBQSxNQUNDb0ksSUFBSXBJLEtBQUt3RixLQURWOztBQUdDbEwsSUFBRTBGLEtBQUtxRixPQUFMLENBQWExSCxhQUFiLENBQTJCLFVBQTNCLENBQUYsRUFBMEM2TixNQUExQyxDQUFpRDtBQUNsREMsVUFBTyxLQUQyQztBQUVsRDtBQUNBQyxVQUFPLGVBQVc3TixLQUFYLEVBQWtCOUMsRUFBbEIsRUFBdUI7QUFDN0JxTixNQUFFdUQsS0FBRjtBQUNBLElBTGlEO0FBTWxEQyxVQUFPLGVBQVUvTixLQUFWLEVBQWlCOUMsRUFBakIsRUFBc0I7QUFDNUJpRixTQUFLdUwsY0FBTDtBQUNBdkwsU0FBSzZMLGlCQUFMLENBQXVCOVEsRUFBdkI7QUFDQSxJQVRpRDtBQVVsRCtRLFdBQVEsZ0JBQVNqTyxLQUFULEVBQWdCOUMsRUFBaEIsRUFBb0IsQ0FDM0IsQ0FYaUQ7QUFZbEQyRCxTQUFNLGNBQVNiLEtBQVQsRUFBZ0I5QyxFQUFoQixFQUFvQjtBQUN6QmlGLFNBQUs0SixnQkFBTCxDQUFzQixJQUF0QjtBQUNBNUosU0FBSzZMLGlCQUFMLENBQXVCOVEsRUFBdkI7O0FBRUEsUUFBS2lGLEtBQUsrRyxhQUFMLElBQXNCLE1BQTNCLEVBQW9DO0FBQ25DcUIsT0FBRTJELElBQUY7QUFDQSxLQUZELE1BRU87QUFDTjNELE9BQUV1RCxLQUFGO0FBQ0E7QUFDRDtBQXJCaUQsR0FBakQ7QUF1QkQsRUEzQkQ7O0FBNkJBdkcsYUFBWW1DLFNBQVosQ0FBc0JtQixlQUF0QixHQUF3QyxZQUFVO0FBQ2hELE1BQUkxSSxPQUFPLElBQVg7QUFBQSxNQUNDb0ksSUFBSXBJLEtBQUt3RixLQURWO0FBRUFsTCxJQUFFMEYsS0FBS3dHLE9BQVAsRUFBZ0J2SCxFQUFoQixDQUFtQixPQUFuQixFQUE0QixZQUFVO0FBQ3ZDLE9BQUtsRSxHQUFHQyxJQUFILENBQVFtQixRQUFSLEdBQW1CTyxHQUF4QixFQUE4QjtBQUM1QixRQUFLLE9BQU8wTCxFQUFFNEQsaUJBQVQsS0FBK0IsV0FBL0IsSUFBOEM1RCxFQUFFNEQsaUJBQUYsSUFBdUIsSUFBMUUsRUFDRDVELEVBQUU0RCxpQkFBRixHQUFzQixLQUF0QjtBQUNDLFFBQUssT0FBTzVELEVBQUU2RCxXQUFULEtBQXlCLFdBQXpCLElBQXdDN0QsRUFBRThELFdBQUYsSUFBaUIsSUFBOUQsRUFDRDlELEVBQUU2RCxXQUFGLEdBQWdCLElBQWhCLENBREMsS0FFSyxJQUFLLE9BQU83RCxFQUFFNEQsaUJBQVQsS0FBK0IsV0FBL0IsSUFBOEM1RCxFQUFFK0QsaUJBQUYsSUFBdUIsSUFBMUUsRUFDTi9ELEVBQUU0RCxpQkFBRixHQUFzQixJQUF0QjtBQUNBO0FBQ0QsT0FBSTVELEVBQUVnRSxpQkFBTixFQUNFaEUsRUFBRWdFLGlCQUFGLEdBREYsS0FFSyxJQUFJaEUsRUFBRWlFLHVCQUFOLEVBQ0hqRSxFQUFFaUUsdUJBQUYsR0FERyxLQUVBLElBQUtqRSxFQUFFa0UscUJBQVAsRUFDSGxFLEVBQUVrRSxxQkFBRjtBQUNBLEdBZkQ7QUFnQkQsRUFuQkQ7O0FBcUJBbEgsYUFBWW1DLFNBQVosQ0FBc0JjLGdCQUF0QixHQUF5QyxZQUFXO0FBQ25ELE1BQUlySSxPQUFTLElBQWI7QUFBQSxNQUNDMkcsV0FBWSxLQUFLQSxRQURsQjtBQUFBLE1BRUNsQixTQUFXLEtBQUtBLE1BRmpCO0FBQUEsTUFHQ0MsVUFBVyxLQUFLQSxPQUhqQjtBQUFBLE1BSUN0SixLQUFRQyxVQUFVQyxTQUFWLENBQW9CaVEsV0FBcEIsRUFKVDtBQUFBLE1BS0NDLFNBQVU7QUFDVEMsU0FBTSxDQUFDLEVBQUNDLFNBQVMsT0FBVixFQUFtQjlOLFNBQVMsQ0FBNUIsRUFBRCxDQURHO0FBRVQrTixTQUFNLENBQUMsRUFBQ0QsU0FBUyxNQUFWLEVBQWtCOU4sU0FBUyxDQUEzQixFQUFEO0FBRkcsR0FMWDtBQUFBLE1BU0NnTyxTQUFTLFNBQVRBLE1BQVMsQ0FBRWxQLEVBQUYsRUFBVTtBQUNsQixPQUFJbVAsTUFBSixFQUFZQyxNQUFaO0FBQ0EsT0FBS3BQLE1BQU0sS0FBWCxFQUNDbVAsU0FBU3BILE1BQVQsRUFBaUJxSCxTQUFTcEgsT0FBMUIsQ0FERCxLQUVLLElBQUtoSSxNQUFNLE1BQVgsRUFDSm9QLFNBQVNySCxNQUFULEVBQWlCb0gsU0FBU25ILE9BQTFCOztBQUVEO0FBQ0E7QUFDQTtBQUNBN0ssV0FBUWtTLEdBQVIsQ0FBWXRILE1BQVo7O0FBRUErRyxVQUFPQyxJQUFQLENBQVloUCxPQUFaLENBQW9CLFVBQUNtRixDQUFELEVBQUkvRyxDQUFKLEVBQVU7QUFDN0JnUixXQUFPNUUsS0FBUCxDQUFhakgsT0FBTzZDLElBQVAsQ0FBWWpCLENBQVosRUFBZSxDQUFmLENBQWIsSUFBa0NBLEVBQUU1QixPQUFPNkMsSUFBUCxDQUFZakIsQ0FBWixFQUFlLENBQWYsQ0FBRixDQUFsQztBQUNBLElBRkQ7QUFHQWlLLFVBQU94UCxZQUFQLENBQW9CLFdBQXBCLEVBQWlDLE1BQWpDO0FBQ0F3UCxVQUFPeFAsWUFBUCxDQUFvQixLQUFwQixFQUEyQndQLE9BQU96UCxZQUFQLENBQW9CLFVBQXBCLENBQTNCOztBQUVBb1AsVUFBT0csSUFBUCxDQUFZbFAsT0FBWixDQUFvQixVQUFDbUYsQ0FBRCxFQUFJL0csQ0FBSixFQUFVO0FBQzdCaVIsV0FBTzdFLEtBQVAsQ0FBYWpILE9BQU82QyxJQUFQLENBQVlqQixDQUFaLENBQWIsSUFBK0JBLEVBQUU1QixPQUFPNkMsSUFBUCxDQUFZakIsQ0FBWixDQUFGLENBQS9CO0FBQ0EsSUFGRDtBQUdBa0ssVUFBT3pQLFlBQVAsQ0FBb0IsV0FBcEIsRUFBaUMsT0FBakM7O0FBRUEyQyxRQUFLd0YsS0FBTCxHQUFhcUgsTUFBYjtBQUNBLEdBakNGO0FBQUEsTUFrQ0M3SCxZQUFZMkIsU0FBU2hKLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0NRLFNBQXhDLENBQWtEQyxPQUFsRCxDQUEwRCxLQUExRCxJQUFtRSxDQUFDLENBQXBFLEdBQXdFLEtBQXhFLEdBQWdGLE1BbEM3RjtBQW1DRHZELFVBQVFDLEdBQVIsQ0FBWWtLLFNBQVo7QUFDQzRILFNBQVE1SCxTQUFSOztBQUVDO0FBQ0E7QUFDQTtBQUNBOztBQUVEaEYsT0FBS3dGLEtBQUwsQ0FBV3dILElBQVg7QUFDQTtBQUNBLEVBOUNEOztBQWdEQTVILGFBQVltQyxTQUFaLENBQXNCMEYsU0FBdEIsR0FBa0MsVUFBVzdFLENBQVgsRUFBZTtBQUNoRHZOLFVBQVFDLEdBQVIsQ0FBWXNOLEVBQUVZLFlBQWQ7QUFDQSxFQUZEOztBQUlBNUQsYUFBWW1DLFNBQVosQ0FBc0JzRSxpQkFBdEIsR0FBMEMsVUFBUzlRLEVBQVQsRUFBYTtBQUN0RCxNQUFJaUYsT0FBTyxJQUFYO0FBQUEsTUFDQ29JLElBQUlwSSxLQUFLd0YsS0FEVjtBQUFBLE1BRUNtRixDQUZEO0FBQUEsTUFFSWpILENBRko7O0FBSUEwRSxJQUFFdUIsV0FBRixHQUFnQnpOLFNBQVNrTSxFQUFFdEMsUUFBRixJQUFjL0ssR0FBRzhFLEtBQUgsR0FBVyxHQUF6QixDQUFULEVBQXdDLEVBQXhDLENBQWhCO0FBQ0FHLE9BQUs0RixPQUFMLEdBQWV3QyxFQUFFdUIsV0FBakI7QUFDQWdCLE1BQU03QyxLQUFLQyxLQUFMLENBQVdLLEVBQUV1QixXQUFGLEdBQWdCLEVBQTNCLENBQUYsQ0FBbUNpQixRQUFuQyxFQUFKO0FBQ0FsSCxNQUFNb0UsS0FBS0MsS0FBTCxDQUFXSyxFQUFFdUIsV0FBRixHQUFnQixFQUEzQixDQUFGLENBQW1DaUIsUUFBbkMsRUFBSjtBQUNBNUssT0FBSzZGLFNBQUwsQ0FBZWdGLFNBQWYsR0FBMkIsQ0FBQ0YsRUFBRTdPLE1BQUYsR0FBVyxDQUFYLEdBQWUsTUFBTTZPLENBQXJCLEdBQXlCQSxDQUExQixJQUFnQyxHQUFoQyxJQUF1Q2pILEVBQUU1SCxNQUFGLEdBQVcsQ0FBWCxHQUFlLE1BQU00SCxDQUFyQixHQUF5QkEsQ0FBaEUsQ0FBM0I7QUFDQTFELE9BQUs0SixnQkFBTCxDQUFzQixLQUF0QjtBQUNBLEVBWEQ7O0FBYUF4RSxhQUFZbUMsU0FBWixDQUFzQmdFLGNBQXRCLEdBQXVDLFVBQVUyQixJQUFWLEVBQWdCO0FBQ3RELE1BQUlsTixPQUFPLElBQVg7QUFBQSxNQUNBd0YsUUFBUXhGLEtBQUt3RixLQURiO0FBRUEsTUFBSTlCLENBQUo7QUFBQSxNQUFPaUgsQ0FBUDtBQUFBLE1BQVV3QyxLQUFLckYsS0FBS0MsS0FBTCxDQUFXdkMsTUFBTW1FLFdBQWpCLENBQWY7QUFBQSxNQUE4Q3lELE1BQU10RixLQUFLQyxLQUFMLENBQVd2QyxNQUFNTSxRQUFqQixDQUFwRDtBQUNBLE1BQUtxSCxLQUFLLEVBQVYsRUFBZTtBQUNkeEMsT0FBSSxJQUFKO0FBQ0FqSCxPQUFJeUosR0FBR3ZDLFFBQUgsR0FBYzlPLE1BQWQsR0FBdUIsQ0FBdkIsR0FBMkIsTUFBTXFSLEdBQUd2QyxRQUFILEVBQWpDLEdBQWlEdUMsRUFBckQ7QUFDQSxHQUhELE1BR087QUFDTnpKLE9BQUl4SCxTQUFVaVIsS0FBSyxFQUFmLENBQUosRUFDQXhDLElBQUl6TyxTQUFVLENBQUNpUixLQUFLekosQ0FBTixJQUFXLEVBQXJCLENBREo7QUFFQUEsT0FBSUEsRUFBRWtILFFBQUYsR0FBYTlPLE1BQWIsR0FBc0IsQ0FBdEIsR0FBMEIsTUFBTTRILENBQWhDLEdBQW9DQSxDQUF4QztBQUNBaUgsT0FBSUEsRUFBRUMsUUFBRixHQUFhOU8sTUFBYixHQUFzQixDQUF0QixHQUEwQixNQUFNNk8sQ0FBaEMsR0FBb0NBLENBQXhDO0FBQ0E7QUFDRDNLLE9BQUs2RixTQUFMLENBQWVnRixTQUFmLEdBQTJCRixJQUFJLEdBQUosR0FBVWpILENBQXJDO0FBQ0EsTUFBS3dKLFFBQVEsTUFBYixFQUFzQjtBQUNyQjVTLEtBQUUsVUFBRixFQUFja1IsTUFBZCxDQUFxQjtBQUNwQjNMLFdBQU8zRCxTQUFXLE1BQU1rUixHQUFQLEdBQWNELEVBQXhCO0FBRGEsSUFBckI7QUFHQTtBQUNELEVBbkJEOztBQXFCQS9ILGFBQVltQyxTQUFaLENBQXNCcUMsZ0JBQXRCLEdBQXlDLFVBQVN5RCxJQUFULEVBQWM7QUFDckQsTUFBSXJOLE9BQU8sSUFBWDtBQUNBc04sZUFBYXROLEtBQUtnRyxZQUFsQjtBQUNBLE1BQUlxSCxJQUFKLEVBQVU7QUFDWHJOLFFBQUtnRyxZQUFMLEdBQW9CdUQsV0FBVyxZQUFXO0FBQ3pDdkosU0FBS3dILFFBQUwsQ0FBZXhILEtBQUtrRyxPQUFwQixFQUE2QixNQUE3QjtBQUNBLElBRm1CLEVBRWpCLElBRmlCLENBQXBCO0FBR0UsR0FKRCxNQUlPO0FBQ1JvSCxnQkFBYXROLEtBQUtnRyxZQUFsQjtBQUNBaEcsUUFBSzBILFdBQUwsQ0FBa0IxSCxLQUFLa0csT0FBdkIsRUFBZ0MsTUFBaEM7QUFDRTtBQUNGLEVBWEQ7O0FBYUFkLGFBQVltQyxTQUFaLENBQXNCaUMsU0FBdEIsR0FBa0MsWUFBVztBQUM1QyxNQUFJeEosT0FBUSxJQUFaO0FBQUEsTUFDQ29JLElBQU1wSSxLQUFLd0YsS0FEWjs7QUFHQTNLLFVBQVFDLEdBQVIsQ0FBWSxXQUFaOztBQUVBLE1BQUtzTixFQUFFa0QsTUFBUCxFQUFnQjtBQUNmLE9BQUd0TCxLQUFLNEYsT0FBUixFQUFpQjtBQUNoQixRQUFJO0FBQ0h3QyxPQUFFdUIsV0FBRixHQUFnQjNKLEtBQUs0RixPQUFyQjtBQUNBLEtBRkQsQ0FFRSxPQUFPMkgsQ0FBUCxFQUFVO0FBQ1gxUyxhQUFRQyxHQUFSLENBQVksZ0NBQVo7QUFDQTtBQUNEO0FBQ0RzTixLQUFFMkQsSUFBRjtBQUNBLEdBVEQsTUFTTztBQUNOM0QsS0FBRXVELEtBQUY7QUFDQTtBQUNELEVBbEJEOztBQW9CQXZHLGFBQVltQyxTQUFaLENBQXNCSixZQUF0QixHQUFxQyxZQUFXO0FBQy9DLE1BQUluSCxPQUFPLElBQVg7QUFBQSxNQUNDbUcsS0FBSyxFQUROO0FBQUEsTUFFQ3pJLEtBQUtzQyxLQUFLaUcsTUFBTCxDQUFZdEksYUFBWixDQUEwQixNQUExQixDQUZOO0FBQUEsTUFHQzRGLE1BQU0sRUFIUDtBQUlBNEMsT0FBS3pJLEdBQUdOLFlBQUgsQ0FBZ0IsU0FBaEIsQ0FBTDs7QUFFQSxNQUFJb1EsWUFBWTlTLFNBQVM0SCxhQUFULENBQXVCLFFBQXZCLENBQWhCO0FBQ0FrTCxZQUFVQyxFQUFWLEdBQWUsYUFBZjtBQUNBek4sT0FBS2lHLE1BQUwsQ0FBWXpELFdBQVosQ0FBeUJnTCxTQUF6QjtBQUNBeE4sT0FBS3VLLFdBQUw7QUFDQWhNLGlCQUFlNEgsRUFBZixFQUFtQixZQUFZO0FBQzlCLE9BQUtuRyxLQUFLdUYsY0FBVixFQUEyQjtBQUMxQnZGLFNBQUswSCxXQUFMLENBQWtCMUgsS0FBS3VGLGNBQXZCLEVBQXVDLFFBQXZDO0FBQ0E7QUFDRCxPQUFJbUksU0FBU2hULFNBQVNpVCxjQUFULENBQXdCLGFBQXhCLENBQWI7QUFBQSxPQUNDQyxVQUFVRixPQUFPRyxVQUFQLENBQWtCLElBQWxCLENBRFg7QUFBQSxPQUVDclAsTUFBTSxJQUFJc1AsS0FBSixFQUZQO0FBQUEsT0FHQ0MsT0FBTyxDQUhSO0FBQUEsT0FJQ0MsT0FBTyxDQUpSO0FBQUEsT0FLQ0MsT0FMRDtBQUFBLE9BTUNDLFFBTkQ7QUFPQSxPQUFJQyxLQUFLLENBQVQ7QUFDQTNQLE9BQUkrRSxHQUFKLEdBQVU0QyxFQUFWO0FBQ0F5SCxXQUFRUSxXQUFSLEdBQXNCLENBQXRCOztBQUVBVixVQUFPekYsS0FBUCxDQUFhb0csS0FBYixHQUFxQixNQUFyQjtBQUNBWCxVQUFPekYsS0FBUCxDQUFhQyxNQUFiLEdBQXNCLE1BQXRCO0FBQ0E7O0FBRUE2RixVQUFPL04sS0FBS3FGLE9BQUwsQ0FBYXBILFdBQWIsR0FBMkIsR0FBbEM7QUFDQStQLFVBQVNsRyxLQUFLQyxLQUFMLENBQVd2SixJQUFJOFAsYUFBZixJQUFnQyxDQUFsQyxHQUF3QyxFQUEvQztBQUNBTixVQUFPbEcsS0FBS0MsS0FBTCxDQUFZaUcsSUFBWixJQUFxQixHQUE1QjtBQUNBOztBQUVBQyxhQUFVMUUsV0FBVyxZQUFVO0FBQzlCMkUsZUFBV3pELFlBQVksWUFBVTtBQUNoQyxTQUFNbUQsUUFBUVEsV0FBVCxDQUFzQkcsT0FBdEIsQ0FBOEIsQ0FBOUIsSUFBbUMsQ0FBeEMsRUFBNEM7QUFDM0NSLGNBQVNBLE9BQUssS0FBZDtBQUNBQyxjQUFTQSxPQUFLLEtBQWQ7QUFDQUosY0FBUVEsV0FBUixJQUF1QixJQUF2QjtBQUNBUixjQUFRWSxTQUFSLENBQWtCaFEsR0FBbEIsRUFBdUJrUCxPQUFPVyxLQUFQLEdBQWEsQ0FBYixHQUFpQk4sT0FBSyxDQUE3QyxFQUFnREwsT0FBT3hGLE1BQVAsR0FBYyxDQUFkLEdBQWtCOEYsT0FBSyxDQUF2RSxFQUEwRUQsSUFBMUUsRUFBZ0ZDLElBQWhGO0FBQ0EsTUFMRCxNQUtPO0FBQ05WLG1CQUFhWSxRQUFiO0FBQ0E7QUFDRCxLQVRVLEVBU1IsT0FBSyxFQVRHLENBQVg7QUFVQSxJQVhTLEVBV1AsR0FYTyxDQUFWO0FBYUEsR0FyQ0Q7QUFzQ0EsRUFqREQ7O0FBbURBOUksYUFBWW1DLFNBQVosQ0FBc0JDLFFBQXRCLEdBQWlDLFVBQVd6SixNQUFYLEVBQW1CMFEsS0FBbkIsRUFBMkI7QUFDM0QsTUFBSzFRLE9BQU9JLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCcVEsS0FBekIsSUFBa0MsQ0FBQyxDQUF4QyxFQUE0QztBQUM1QzFRLFNBQU9JLFNBQVAsSUFBb0IsTUFBTXNRLEtBQTFCO0FBQ0EsRUFIRDs7QUFLQXJKLGFBQVltQyxTQUFaLENBQXNCRyxXQUF0QixHQUFvQyxVQUFXM0osTUFBWCxFQUFtQjBRLEtBQW5CLEVBQTJCO0FBQzlELE1BQUlDLFNBQVMsSUFBSUMsTUFBSixDQUFXRixLQUFYLENBQWI7QUFDQTFRLFNBQU9JLFNBQVAsR0FBbUJwRCxHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBYzZDLE9BQU9JLFNBQVAsQ0FBaUIvQyxPQUFqQixDQUEwQnNULE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzdiMmE1NjI3YzcxOWY5M2MwZGRcbiAqKi8iLCJpbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG5pbXBvcnQgJy4vZGV2JzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcbmltcG9ydCAnLi92aWRlby1wbGF5ZXInO1xuXG5cbnZhciAkID0gd2luZG93LiQ7XG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgICByZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cbiAgICAvL+ycoO2LuCDrqZTshJzrk5xcbiAgICB1dGlsOiB7XG4gICAgICAgIC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4BcbiAgICAgICAgY29tbW9uTm90aGluZzogZnVuY3Rpb24oKSB7fVxuXG4gICAgICAgIC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG4gICAgICAgICxcbiAgICAgICAgdHJpbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgICBjdXRzdHI6IGZ1bmN0aW9uIGN1dFN0cihzdHIsIGxpbWl0KXsgICAgXG4gICAgICAgICAgICB2YXIgc3RyTGVuZ3RoID0gMCxcbiAgICAgICAgICAgICAgICBzdHJUaXRsZSA9IFwiXCIsXG4gICAgICAgICAgICAgICAgc3RyUGllY2UgPSBcIlwiLFxuICAgICAgICAgICAgICAgIGNvZGUsIGNoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSksXG4gICAgICAgICAgICAgICAgY2ggPSBzdHIuc3Vic3RyKGksMSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBzdHJQaWVjZSA9IHN0ci5zdWJzdHIoaSwxKVxuICAgICAgICAgICAgICAgIGNvZGUgPSBwYXJzZUludChjb2RlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoKGNoIDwgXCIwXCIgfHwgY2ggPiBcIjlcIikgJiYgKGNoIDwgXCJBXCIgfHwgY2ggPiBcIlpcIikgJiYgKChjb2RlID4gMjU1KSB8fCAoY29kZSA8IDApKSlcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMzsgLy9VVEYtOCAzYnl0ZSDroZwg6rOE7IKwXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdHJMZW5ndGggPSBzdHJMZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHN0ckxlbmd0aD5saW1pdCkgLy/soJztlZwg6ri47J20IO2ZleyduFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBlbHNlIHN0clRpdGxlID0gc3RyVGl0bGUrc3RyUGllY2U7IC8v7KCc7ZWc6ri47J20IOuztOuLpCDsnpHsnLzrqbQg7J6Q66W4IOusuOyekOulvCDrtpnsl6zspIDri6QuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyVGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRGV2aWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdpbmdlcmJyZWFkKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pb3MpIHJldHVybiAnaW9zJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zKSByZXR1cm4gJ25vLW1vYmlsZSc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgfVxuXG4gICAgLy8g6rO17Ya1IOuplOyEnOuTnFxuICAgICxcbiAgICBjb21tb246IHtcblxuICAgICAgICAvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcbiAgICAgICAgZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuICAgICAgICAgICAgdmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLFxuICAgICAgICAgICAgICAgIGFUYWcgPSBudWxsLFxuICAgICAgICAgICAgICAgIGhyZWYgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhVGFnID0gYWxsQVtpXTtcbiAgICAgICAgICAgICAgICBocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBpZiAodWkudXRpbC50cmltKGhyZWYpID09ICcjJyB8fCBocmVmID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2dnbGVDbGFzcyBjdXN0b21cbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVjbGFzczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuICAgICAgICAsXG4gICAgICAgIHRhYmxlRmFkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3Njb3BlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mYWRlaW4td3JhcCcpO1xuICAgICAgICAgICAgaWYgKF9zY29wZS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgX3Njb3BlLmZvckVhY2goZnVuY3Rpb24oZWwsIGkpe1xuICAgICAgICAgICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1mYWRlaW4tc2Nyb2xsJykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IHdpbmRvdy5ldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZmYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9vbnxcXHNvbi8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgPSAoIGVsLmNsYXNzTmFtZS5sZW5ndGggPCAxICkgPyAnb24nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBlbC5jbGFzc05hbWUuaW5kZXhPZignb24nKSA8PSAtMSApID8gZWwuY2xhc3NOYW1lICsgJyBvbicgOiBlbC5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICQoJy5qcy1mYWRlaW4td3JhcCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIC8vICAgICAkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb2FkaW5nIG1hc2tcbiAgICAgICAgLFxuICAgICAgICBsb2FkaW5nQ29tcGxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2xvYWRpbmctY2lyY3VsYXIuZ2lmJywgZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc05hbWUgPSBcInZpZGVvLWxvYWRpbmctaW1hZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvYy5ib2R5KS5zdG9wKCkuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMjAwLCBmdW5jdGlvbigpIHt9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOq3uOujuSDthqDquIBcbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVHcm91cDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGRvYy5xdWVyeVNlbGVjdG9yKGAke2dyb3VwfSAke2VsZW1lbnR9YCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpKTtcbiAgICAgICAgICAgIC8vICAgICAkKCcnKVxuICAgICAgICAgICAgLy8gICAgIHRoaXMucXVlcnlTZWxlY3RvciggZWxlbWVudCApLmNsYXNzTmFtZSA9IHRoaXMucXVlcnlTZWxlY3RvciggZWxlbWVudCApLmNsYXNzTmFtZS5yZXBsYWNlKCAvYWN0aWV2ZXxcXHNhY3RpdmUvLCBcIlwiICk7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgLy8gfSwgZmFsc2UpOyBcbiAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExheWVyIHBvcHVwXG4gICAgICAgICxcbiAgICAgICAgcG9wdXBDbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBvcHVwID0gJCgnLnBvcHVwJyk7XG4gICAgICAgICAgICBpZiAoIHBvcHVwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaT0wLCBsZW5ndGg9cG9wdXAubGVuZ3RoOyBpPGxlbmd0aDsgaSs9MSApIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGope1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuZXEoaikuZmluZCgnLmJ0bi1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcucG9wdXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KShpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmFrZVNlbGVjdDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5zZWxlY3Qtd3JhcC5mYWtlJykuZWFjaChmdW5jdGlvbihpdGVtLCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcykuZmluZCgnc2VsZWN0JyksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gJCh0aGlzKS5maW5kKCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmdldCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0aGF0Lm9wdGlvbnNbdGhhdC5zZWxlY3RlZEluZGV4XS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC50ZXh0KCB0ZXh0ICk7XG4gICAgICAgICAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0YmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gICAgdmFyIGNhcmROZXdzID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuXG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG4gICAgICAgICAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG4gICAgICAgICAgICB0aGlzLnN3aXBlcihvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzd2lwZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGJlYXV0eW51cy5jYXJkTmV3cyA9IGNhcmROZXdzO1xuXG4gICAgdmFyIGFjY29yZGlhbiA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oX3Njb3BlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29wZSA9IF9zY29wZTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKGl0ZW0ucG9zaXRpb24oKS50b3ApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgICAvLyBkb20gY29uZmlybSBsYXllclxuICAgIHZhciBjb25maXJtID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VEb20gKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ha2VEb206IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgICAgICB2YXIge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbXNnLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uQ2xpY2tGdW5jLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jXG4gICAgICAgICAgICAgICAgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgZG9tID0gYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImRlc2NcIj5cbiAgICAgICAgICAgICAgICAke21zZyA/IGAke21zZ31gIDogYGB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gY2xvc2VcIj4ke2Nsb3NlQnV0dG9uVGV4dCA/IGNsb3NlQnV0dG9uVGV4dCA6IFwi64ur6riwXCJ9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIj4ke29rQnV0dG9uVGV4dCA/IG9rQnV0dG9uVGV4dCA6IFwi7ZmV7J24XCJ9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibGluZFwiPuuLq+q4sDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1MYXllciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbmZpcm0tbGF5ZXInKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5pbm5lckhUTUwgPSBkb207XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCAgY29uZmlybUxheWVyICk7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbGF5ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlKCBva0J1dHRvbkNsaWNrRnVuYywgY2xvc2VCdXR0b25DbGlja0Z1bmMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXZlbnRFeGVjdXRlOiBmdW5jdGlvbiggb2tCdXR0b25DbGlja0Z1bmMsIGNsb3NlQnV0dG9uQ2xpY2tGdW5jICl7XG4gICAgICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLnNjb3BlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnMgPSBbJ29rJywgJ2Nsb3NlJywgJ2J0bi1jbG9zZSddLm1hcCggKGMpID0+IHNjb3BlLnF1ZXJ5U2VsZWN0b3IoYC4ke2N9YCkgKTtcbiAgICAgICAgICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignb2snKSA+IC0xICYmIHR5cGVvZiBva0J1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdjbG9zZScpID4gLTEgJiYgaW5kZXggPT0gMSAmJiB0eXBlb2YgY2xvc2VCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25DbGlja0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBiZWF1dHludXMuY29uZmlybSA9IGNvbmZpcm07XG5cbiAgICB2YXIgYWxlcnQgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHRoaXMubWFrZURvbSggb3B0aW9ucyApO1xuICAgICAgICB9LFxuICAgICAgICBtYWtlRG9tOiBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHZhciB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmNcbiAgICAgICAgICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29uZmlybVwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgICAgIDxwIGNsYXNzPVwiZGVzY1wiPlxuICAgICAgICAgICAgJHttc2cgPyBgJHttc2d9YCA6IGBgfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIG9rXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsaW5kXCI+64ur6riwPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PmA7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG4gICAgICAgICAgICAgICAgY29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWxlcnQtbGF5ZXInKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5pbm5lckhUTUwgPSBkb207XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCBjb25maXJtTGF5ZXIgKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtbGF5ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlKCBva0J1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYyApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpKTtcbiAgICAgICAgICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFsnb2snLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignb2snKSA+IC0xICYmIHR5cGVvZiBva0J1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKCBzY29wZSApO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmVhdXR5bnVzLmFsZXJ0ID0gYWxlcnQ7XG5cbiAgICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb24sXG4gICAgICAgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG4gICAgY29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcbiAgICBjb21tb24udGFibGVGYWRlKCk7XG5cbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpKTtcblxuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG4gICAgY29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jYWxsYmFja3NcbiAgICB9KTtcblxuICAgIC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6TtlolcbiAgICBpZiAobG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSkge1xuICAgICAgICBkZXYuYXBwZW5kTWVudUxpc3QoKTtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVCdG4oKTtcbiAgICB9XG59KTtcblxuLypcbiAqXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuICovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlcy5zcmMgPSBpbWc7XG5cbiAgICBpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgW3dpbiwgZG9jLCBxc2EsIHFzXSA9IFt3aW5kb3csIGRvY3VtZW50LCAncXVlcnlTZWxlY3RvckFsbCcsICdxdWVyeVNlbGVjdG9yJ107XG5cbmNvbnN0XG5cdGRvbSBcdD0gcyA9PiBkb2N1bWVudFtxc10ocyksXG5cdGRvbUFsbCBcdD0gcyA9PiBkb2N1bWVudFtxc2FdKHMpLFxuXHRtYWtlRG9tID0gKHMsIGF0dHIpID0+IHtcblx0XHR2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChzKVxuXHRcdGlmICggdHlwZW9mIGF0dHIgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMoYXR0cikubGVuZ3RoID4gMCApXG5cdFx0XHRmb3IgKCBsZXQgaSBpbiBhdHRyIClcblx0XHRcdFx0ZG9tLnNldEF0dHJpYnV0ZShpLCBhdHRyW2ldKTtcblx0XHRyZXR1cm4gZG9tO1xuXHR9LFxuXHRwdXRUZXh0ID0gcyA9PiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKSxcblx0cHJlcGVuZCA9IChpdGVtLCB0YXJnZXQpID0+IHRhcmdldC5pbnNlcnRCZWZvcmUoaXRlbSwgdGFyZ2V0LmNoaWxkTm9kZXNbMF0pLFxuXHRhcHBlbmQgXHQ9IChpdGVtLCB0YXJnZXQpID0+IHRhcmdldC5hcHBlbmRDaGlsZChpdGVtKTtcblxuY29uc3QgbWVudURhdGEgPSBbXG5cdHtcblx0XHRkZXB0aDE6IFwi6rO17Ya1XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMk+q4gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgrTsmqnsnbQg7JeG7J2EIOuVjFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9uby1yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJjb25maXJtLCBhbGVydFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbmZpZy9sb2NhdGlvblNlcnZpY2VBZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu4jOuenOuTnOuplOyduFwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXsoJXrs7RcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrp6TsnqXshozsi51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUluZm8vc3RvcmVOZXdzLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuwse2ZlOygkO2WieyCrChTYW1wbGUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVFdmVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXrsKnrrLjtm4TquLBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC92aXNpdG9yc0Jvb2tEZXRhaWwuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogZmFsc2Vcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi66mk67KE7Im9XCIsXG5cdFx0ZGVwdGgyOiBcIuydtOyaqeyVveq0gFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyEnOu5hOyKpCDsnbTsmqnslb3qtIAgKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3NlcnZpY2UuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rCc7J247KCV67O0IOyymOumrOuwqey5qCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuychOy5mOq4sOuwmOyEnOu5hOyKpCDsnbTsmqnslb3qtIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuydtOuypO2KuCbtlonsgqxcIixcblx0XHRkZXB0aDI6IFwi7KeE7ZaJ7KSR7J24IOydtOuypO2KuFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIOydvOuwmFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDtl6TrnbzrqZTsnbTtgazsl4Xsh7xcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdIZXJhLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfc2luZ2xlU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g67O17IiY7ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfbXVsdGlTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsmYTro4wpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbENvbXBsZXRlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JiI7JW9IOyLnCAtIOqwnOyduOygleuztCDsiJjsp5Eg67CPIOydtOyaqeyViOuCtFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L3Jlc2VydmF0aW9uL2FncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuy/oO2PsOu2gVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb3Vwb25Cb29rL2RldGFpbC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu3sO2LsOy7qO2FkOy4oFwiLFxuXHRcdGRlcHRoMjogXCLrqqnroZ1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo7Lm065Oc64m07Iqk7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvY2FyZFR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjrj5nsmIHsg4HtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9tb3ZpZVR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKI7KCV67O0XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0SW5mby92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0UmV2aWV3L3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLqs6DqsJ3shLzthLBcIixcblx0XHRkZXB0aDI6IFwi6rO17KeA7IKs7ZWtXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66qp66GdICsg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3Mvbm90aWNlL2xpc3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrj4Tsm4Drp5BcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66mU7J24XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3MvaGVscC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOlwi66eI7J207Y6Y7J207KeAXCIgLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg65Ox6riJXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2dyYWRlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67iM656c65Oc67OEIOunpOyepeyEoO2DnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9zZWxlY3RTdG9yZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDsv6Dtj7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOuwqeusuO2bhOq4sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy92aXNpdG9yc0Jvb2suaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqtIDsi6zsg4HtkohcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHJvZHVjdE9mSW50ZXJlc3QvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi6rWs66ek7ZiE7ZmpXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66as7Iqk7Yq4KHBvcHVwIO2PrO2VqClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHVyY2hhc2UvcGVyaW9kLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7JeU7KCk7Yah7YahXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMgO2ZlO2ZlOuptFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2VuZ2VsVGFsay90YWxrX2lucXVpcnkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9XG5cdFx0XVxuXHR9XG5cbl07XG5cbnZhciBtZW51TGlzdCA9IG1lbnVEYXRhLnJlZHVjZSgocCwgYykgPT4ge1xuXHRsZXQge2RlcHRoMSwgZGVwdGgyLCBsaW5rc30gPSBjO1xuXHRyZXR1cm4gYCR7cCB8fCAnJ31cblx0JHtkZXB0aDEgPyBgPGgyPjxzcGFuPiR7ZGVwdGgxfTwvc3Bhbj48L2gyPmAgOiBgYH1cblx0JHtkZXB0aDIgPT0gJycgPyBkZXB0aDIgOiBgPGgzPjxzcGFuPiR7ZGVwdGgyfTwvc3Bhbj48L2gzPmB9XG5cdDx1bD4ke2xpbmtzLnJlZHVjZSgoaXAsIGljKSA9PiB7XG5cdFx0XHRsZXQge3RpdGxlLCBocmVmLCBjb21wbGV0ZX0gPSBpYztcblx0XHRcdHJldHVybiBgJHtpcCB8fCBcIlwifVxuXHRcdDxsaSR7Y29tcGxldGUgPyAnIGNsYXNzPVwiY3BcIicgOiBcIlwifT48YSBocmVmPVwiJHtocmVmfVwiPiR7dGl0bGV9PC9hPjwvbGk+YH0sIDApfVxuXHQ8L3VsPlxuXHRgXG59LCAwKTtcblxuLy8g66mU64m0IOuyhO2KvCDsgr3snoVcbndpbmRvdy5kZXYgPSB7XG5cdGFwcGVuZE1lbnVCdG46IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1lbnVUcmlnZ2VyID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdDxzcGFuPnRvZ2dsZSBtZW51PC9zcGFuPlxuPC9idXR0b24+YDtcblx0XG5cdFx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCkge1xuXHRcdFx0XHQkKCcjbWVudScpLnByZXBlbmQobWVudVRyaWdnZXIpO1xuXHRcdFx0fVxuXHRcblx0XHRcdCQoJy5tZW51LXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBtZW51TGlzdCA9ICQoJyNtZW51LWxpc3QnKSxcblx0XHRcdFx0ICAgIGN0cmxDbGFzcyA9ICdpcy1hY3RpdmUnLFxuXHRcdFx0XHQgICAgY29uZGl0aW9uID0gbWVudUxpc3QuaGFzQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHRpZiAoY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLnJlbW92ZUNsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8vIOuplOuJtCDrpqzsiqTtirgg7IK97J6FXG5cdCxhcHBlbmRNZW51TGlzdDogZnVuY3Rpb24oKXtcblxuXHRcdGlmICggJCgnI21lbnUnKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdG1lbnVMaXN0ID0gJCgnPGRpdiBpZD1tZW51IC8+JykuYXBwZW5kKCAkKCc8ZGl2IGlkPW1lbnUtbGlzdCBjbGFzcz1vdmVydGhyb3cgLz4nKS5hcHBlbmQoIG1lbnVMaXN0ICkgKTtcblx0XHRcdCQoJyN3cmFwJykubGVuZ3RoIDw9IDAgPyAkKCdib2R5JykucHJlcGVuZCggbWVudUxpc3QgKSA6ICQoJyN3cmFwJykucHJlcGVuZCggbWVudUxpc3QgKTtcblx0XHR9XG5cdFx0JCgnI21lbnUtbGlzdCcpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYUhSRUYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdGlmICggYUhSRUYuaW5kZXhPZignP2RldicpIDw9IC0xICkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBhSFJFRiArICc/ZGV2Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LGRpbW06IGZ1bmN0aW9uKG1zZyl7XG5cdFx0bXNnID0gbXNnIHx8ICfrgrTsmqnsnbQg7JeG7Iq164uI64ukLic7XG5cdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdCQoJzxkaXYgY2xhc3M9XCJkaW1tXCIgLz4nKS5hcHBlbmQoXG5cdFx0XHRcdCQoYDxzcGFuPiR7bXNnfTxzcGFuLz48YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj5b64ur6riwXTwvc3Bhbj48L2J1dHRvbj5gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdFx0JCgnLmRpbW0nKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5kaW1tJykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Rldi5qc1xuICoqLyIsIi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKlx0bmV0d29ya1N0YXRlIHsgbnVtYmVyIH1cbiogXHQwID0gTkVUV09SS19FTVBUWSAtIGF1ZGlvL3ZpZGVvIGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWRcbipcdDEgPSBORVRXT1JLX0lETEUgLSBhdWRpby92aWRlbyBpcyBhY3RpdmUgYW5kIGhhcyBzZWxlY3RlZCBhIHJlc291cmNlLCBidXQgaXMgbm90IHVzaW5nIHRoZSBuZXR3b3JrXG4qXHQyID0gTkVUV09SS19MT0FESU5HIC0gYnJvd3NlciBpcyBkb3dubG9hZGluZyBkYXRhXG4qXHQzID0gTkVUV09SS19OT19TT1VSQ0UgLSBubyBhdWRpby92aWRlbyBzb3VyY2UgZm91bmRcbipcbipcdHJlYXN5U3RhdGUgeyBudW12ZXIgfVxuKlx0MCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVx0XG4qXHQxID0gSEFWRV9NRVRBREFUQSAtIG1ldGFkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbipcdDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcbipcdDMgPSBIQVZFX0ZVVFVSRV9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgYW5kIGF0IGxlYXN0IHRoZSBuZXh0IGZyYW1lIGlzIGF2YWlsYWJsZVxuKlx0NCA9IEhBVkVfRU5PVUdIX0RBVEEgLSBlbm91Z2ggZGF0YSBhdmFpbGFibGUgdG8gc3RhcnQgcGxheWluZ1xuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHQvL3dyYXBwZXIsIGVuZGVkQ2FsbGJhY2tcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBWaWRlb1BsYXllcikgKSByZXR1cm4gbmV3IFZpZGVvUGxheWVyKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spO1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLndyYXBwZXIpO1xuXHR0aGlzLmxvYWRpbmdFbGVtZW50XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbG9hZGluZy1pbWFnZScpLFxuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJylbMF07XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVsxXTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gKGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCBvcHRpb25zLnN0YXJ0VGltZSA+PSBvcHRpb25zLmR1cmF0aW9uICkgcmV0dXJuIDA7XG5cdFx0dmFyIHN0YXJ0VGltZSA9IG9wdGlvbnMuc3RhcnRUaW1lID8gTnVtYmVyKG9wdGlvbnMuc3RhcnRUaW1lKSA6IDA7XG5cdFx0cmV0dXJuIHN0YXJ0VGltZTtcblx0fSkoKTtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5tb2JpbGVOZXR3b3JrXHQ9IG9wdGlvbnMubW9iaWxlTmV0d29yaztcblx0dGhpcy5hbGVydE1vYmlsZVx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1vYmlsZScpO1xuXHR0aGlzLnBsYXlQYXVzZUZsYWcgXHQ9ICdwYXVzZSc7XG5cdHRoaXMuZW5kZWRDYWxsYmFjayA9IHR5cGVvZiBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXHR0aGlzLnB1c2hUaW1lID0gdHlwZW9mIG9wdGlvbnMudGltZXVwZGF0ZUNhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA6IGZ1bmN0aW9uKCl7fTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLl91bmxvYWQoKTtcblx0dGhpcy5fc2l6ZSgpO1xuXHR0aGlzLl9pbml0KCk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0W3RoYXQucGxheUJ0biwgdGhhdC5wYXVzZUJ0bl0uZm9yRWFjaChmdW5jdGlvbihidG4sIGluZGV4KXtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0LmFkZEtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9KTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuXHRcdGlmICggdGhhdC5tb2JpbGVOZXR3b3JrICkge1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrID0gZmFsc2U7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmtDaGVjaygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3NpemUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHcgPSBNYXRoLnJvdW5kKCB0aGlzLndyYXBwZXIuY2xpZW50V2lkdGggKSxcblx0XHRoID0gMDtcblx0aCA9ICg5ICogdykgLyAxNjtcblx0dGhpcy53cmFwcGVyLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl91bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmJvZHkub251bmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIG1vdmUnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tb2JpbGVOZXR3b3JrQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRhbGVydCA9IHRoYXQuYWxlcnRNb2JpbGU7XG5cdHRoYXQuYWRkS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0YWxlcnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm9rJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gbnVsbDtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHRcdC8vIGlmICggdGhhdC5jdXJUaW1lICkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTsgXG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0XHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHRcdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZygnYWFhYWFhJyk7XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cblx0XHRkb2N1bWVudC5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gJiYgdi5lbmRlZCApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gY2hhbmdlIDogem9vbSBpbicpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXG5cdHRoYXQudmlkZW8ub25jdWVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdjdWVjaGFuZ2UnKTtcblx0fTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC52aWRlby5vbnBsYXkgPSBmdW5jdGlvbigpIHtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LnBvc3RlciwgJ2hpZGUnICk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdvbnBsYXknKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9uY2FucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQucGF1c2VCdG4sICdoaWRlJyApO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQucGxheUJ0biwgJ2hpZGUnICk7XG5cdFx0Y29uc29sZS5sb2coJ29uY2FucGxheScpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25wbGF5aW5nID0gZnVuY3Rpb24oKXtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHRcdGNvbnNvbGUubG9nKCdvbnBsYXlpbmcnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LnBhdXNlQnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LnBsYXlCdG4sICdoaWRlJyApO1xuXHRcdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5hZGRLbGFzcyh0aGF0LmJ0bkdyb3VwLCAnaGlkZScpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdFx0aWYgKCB2LmVuZGVkICkge1xuXHRcdFx0aWYgKCB2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICkge1xuXHRcdFx0XHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR2YXIgdiA9IHRoYXQudmlkZW87XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0XHRpZiAoIHYuZXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMSk7XG5cdFx0XHRcdFx0di5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDIpO1xuXHRcdFx0XHRcdHYud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygzKTtcblx0XHRcdFx0XHRkb2N1bWV0LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4gKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyg0KTtcblx0XHRcdFx0XHRkb2N1bWV0LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICggdi5lbmRlZCApIHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKCdvbnBhdXNlJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpOyBcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24oIGVycm9yVHlwZSApIHtcblx0Ly8gaWYgKCBuZXR3b3JrU3RhdGUgPT0gIClcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbyxcblx0XHRwdiA9IDA7XG5cdHYub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0XHRpZiAoIHYucGF1c2VkICkgcmV0dXJuO1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcblx0XHQvLyA17LSI66eI64ukIOyLnOqwhOyytO2BrFxuXHRcdGlmIChwdiAhPSBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpICYmICBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpICUgNSA9PSAwICkge1xuXHRcdFx0Ly8g7ZiE7J6s7Iuc6rCE7J2EIDXroZwg64KY64iE7Ja0IOuCmOuouOyngOulvCDqtaztlZjqs6Ag6re4IOuCmOuouOyngOqwgCA167O064ukIOyekeycvOuptCDsmKzrprwsIOqwmeqxsOuCmCDtgazrqbQg67KE66a8XG5cdFx0XHR0aGF0LnB1c2hUaW1lKCBNYXRoWyAodi5jdXJyZW50VGltZSAlIDUpIDwgNSA/ICdjZWlsJyA6ICdmbG9vcicgXSh2LmN1cnJlbnRUaW1lKcKgKTtcblx0XHRcdHB2ID0gTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKTtcblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuYnRuR3JvdXAsICdoaWRlJyApO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQudGltZWxpbmUsICdoaWRlJyApO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ3JlbW92ZS10aW1lJyApO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC5wYXVzZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0aGF0LmN1clRpbWUgPSB0aGF0LnZpZGVvLmN1cnJlbnRUaW1lO1xuXHRcdHRoYXQucGxheVBhdXNlKCk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5wbGF5QnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LnBhdXNlQnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LmJnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdFx0PSB0aGlzLFxuXHRcdGJ0bkdyb3VwIFx0PSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyBcdFx0PSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzIFx0PSB0aGlzLmhpZ2hSZXMsXG5cdFx0dWEgXHRcdFx0PSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksXG5cdFx0c3R5bGVzXHRcdD0ge1xuXHRcdFx0c2hvdzogW3tkaXNwbGF5OiAnYmxvY2snLCBvcGFjaXR5OiAxfV0sXG5cdFx0XHRoaWRlOiBbe2Rpc3BsYXk6ICdub25lJywgb3BhY2l0eTogMH1dXG5cdFx0fSxcblx0XHRjaG9pY2UgPSAoIGVsICkgPT4ge1xuXHRcdFx0dmFyIHNob3dFbCwgaGlkZUVsO1xuXHRcdFx0aWYgKCBlbCA9PSAnbG93JyApXG5cdFx0XHRcdHNob3dFbCA9IGxvd1JlcywgaGlkZUVsID0gaGlnaFJlcztcblx0XHRcdGVsc2UgaWYgKCBlbCA9PSAnaGlnaCcgKVxuXHRcdFx0XHRoaWRlRWwgPSBsb3dSZXMsIHNob3dFbCA9IGhpZ2hSZXM7XG5cblx0XHRcdC8vIGZvciAoIHZhciB2aSBpbiBsb3dSZXMgKSB7XG5cdFx0XHQvLyBcdGNvbnNvbGUubG9nKHZpKTtcblx0XHRcdC8vIH1cblx0XHRcdGNvbnNvbGUuZGlyKGxvd1Jlcyk7XG5cblx0XHRcdHN0eWxlcy5zaG93LmZvckVhY2goKGMsIGkpID0+IHtcblx0XHRcdFx0c2hvd0VsLnN0eWxlW09iamVjdC5rZXlzKGMpWzFdXSA9IGNbT2JqZWN0LmtleXMoYylbMV1dO1xuXHRcdFx0fSk7XG5cdFx0XHRzaG93RWwuc2V0QXR0cmlidXRlKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdFx0c2hvd0VsLnNldEF0dHJpYnV0ZSgnc3JjJywgc2hvd0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cblx0XHRcdHN0eWxlcy5oaWRlLmZvckVhY2goKGMsIGkpID0+IHtcblx0XHRcdFx0aGlkZUVsLnN0eWxlW09iamVjdC5rZXlzKGMpXSA9IGNbT2JqZWN0LmtleXMoYyldO1xuXHRcdFx0fSk7XG5cdFx0XHRoaWRlRWwuc2V0QXR0cmlidXRlKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHRcdFxuXHRcdFx0dGhhdC52aWRlbyA9IHNob3dFbDtcblx0XHR9LFxuXHRcdGNvbmRpdGlvbiA9IGJ0bkdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hY3RpdmUnKS5jbGFzc05hbWUuaW5kZXhPZignbG93JykgPiAtMSA/ICdsb3cnIDogJ2hpZ2gnO1xuY29uc29sZS5sb2coY29uZGl0aW9uKTtcblx0Y2hvaWNlKCBjb25kaXRpb24gKTtcblxuXHQgLy8gaWYgKCB1YS5pbmRleE9mKCdhbmRyb2lkIDQuMicpID4gLTEgfHwgdWEuaW5kZXhPZignYW5kcm9pZCA0LjMnKSA+IC0xICkge1xuXHQgLy8gXHQkKHRoYXQudmlkZW8pLmFwcGVuZCgnPHNvdXJjZSBzcmM9XCJcIj48L3NvdXJjZT4nKTtcblx0IC8vIFx0JCh0aGF0LnZpZGVvKS5maW5kKCdzb3VyY2UnKS5hdHRyKCdzcmMnLCAkKHRoYXQudmlkZW8pLmRhdGEoJ3NyYycpKTtcblx0IC8vIH1cblxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcblx0Ly8gdGhhdC52ZXJpZnlpbmcoIHRoYXQudmlkZW8gKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS52ZXJpZnlpbmcgPSBmdW5jdGlvbiAoIHYgKSB7XG5cdGNvbnNvbGUubG9nKHYubmV0d29ya1N0YXRlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbyxcblx0XHRtLCBzO1xuXG5cdHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xuXHR0aGF0LmN1clRpbWUgPSB2LmN1cnJlbnRUaW1lO1xuXHRtID0gKCBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUgLyA2MCkgKS50b1N0cmluZygpO1xuXHRzID0gKCBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUgJSA2MCkgKS50b1N0cmluZygpO1xuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSAobS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG0pICArICc6JyArIChzLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcyk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcblx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdD0gdGhpcyxcblx0XHR2IFx0XHQ9IHRoYXQudmlkZW87XG5cblx0Y29uc29sZS5sb2coJzExMTExMTExMScpO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0aWYodGhhdC5jdXJUaW1lKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygn7J207Ja067O06riwIOq4sOuKpeydtCDsoJzqs7XrkJjsp4Ag7JWK64qUIOyViOuTnOuhnOydtOuTnCDrsoTsoIQg7J6F64uI64ukLicpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1iZycpO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdFx0aW1nVyAtPSAoaW1nVyowLjAyNSk7XG5cdFx0XHRcdFx0aW1nSCAtPSAoaW1nSCowLjAyNSk7XG5cdFx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgMTAwMC82MClcblx0XHR9LCAzMDApO1xuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==