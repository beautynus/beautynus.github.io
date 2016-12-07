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
	
		if (v.paused) {
			if (that.curTime) v.currentTime = that.curTime;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzM4MWVhN2VjOTdjOThmOTQ3YzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJjbG9zZUJ1dHRvbkNsaWNrRnVuYyIsIm9rQnV0dG9uVGV4dCIsIm9rQnV0dG9uQ2xpY2tGdW5jIiwiZG9tIiwiY29uZmlybUxheWVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiZXZlbnRFeGVjdXRlIiwiYnV0dG9ucyIsIm1hcCIsImMiLCJpbmRleCIsImFycmF5IiwicmVtb3ZlQ2hpbGQiLCJhbGVydCIsImpvaW4iLCJsb2NhdGlvbiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsInNyYyIsInFzYSIsInFzIiwicyIsImRvbUFsbCIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJpcCIsImljIiwibWVudVRyaWdnZXIiLCJjdHJsQ2xhc3MiLCJjb25kaXRpb24iLCJhZGQiLCJhSFJFRiIsImRpbW0iLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJlbmRlZENhbGxiYWNrIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiIsIk51bWJlciIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJtb2JpbGVOZXR3b3JrIiwiYWxlcnRNb2JpbGUiLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInB1c2hUaW1lIiwidGltZXVwZGF0ZUNhbGxiYWNrIiwicG9zdGVyTG9hZGVkIiwiX3VubG9hZCIsIl9zaXplIiwiX2luaXQiLCJwcm90b3R5cGUiLCJhZGRLbGFzcyIsImJ0biIsInJlbW92ZUtsYXNzIiwibW9iaWxlTmV0d29ya0NoZWNrIiwiX3BsYXkiLCJ3IiwiTWF0aCIsInJvdW5kIiwiaCIsInN0eWxlIiwiaGVpZ2h0Iiwib251bmxvYWQiLCJ2IiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsIndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuIiwiZW5kZWQiLCJzZXRUaW1lb3V0IiwicGxheVBhdXNlIiwib25jdWVjaGFuZ2UiLCJvbnBsYXkiLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbmNhbnBsYXkiLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwicHYiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwidG9Mb3dlckNhc2UiLCJzdHlsZXMiLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJjaG9pY2UiLCJzaG93RWwiLCJoaWRlRWwiLCJkaXIiLCJsb2FkIiwidmVyaWZ5aW5nIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImNhbnZhc1RhZyIsImlkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJhYSIsImdsb2JhbEFscGhhIiwid2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwidG9GaXhlZCIsImRyYXdJbWFnZSIsImtsYXNzIiwicmVnZXhwIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUY4QjtBQUs5QixLQUFJQSxJQUFJQyxPQUFPRCxDQUFmLEMsQ0FKZ0I7O0FBS2hCLEtBQUlFLE1BQU1ELE1BQVY7QUFBQSxLQUNJRSxNQUFNQyxRQURWOztBQUdBSCxRQUFPSSxLQUFQLEdBQWUsVUFBU0MsR0FBVCxFQUFjO0FBQ3pCLFlBQU9DLFFBQVFDLEdBQVIsQ0FBWUYsR0FBWixDQUFQO0FBQ0gsRUFGRDs7QUFJQTtBQUNBSixLQUFJTyxFQUFKLEdBQVNSLE9BQU9RLEVBQVAsSUFBYTs7QUFFbEI7QUFDQUMsV0FBTTtBQUNGO0FBQ0FDLHdCQUFlLHlCQUFXLENBQUU7O0FBRTVCOztBQUpFLFdBTUZDLE1BQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2hCLGlCQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLG9CQUFPQSxJQUFJQyxPQUFKLENBQVksWUFBWixFQUEwQixFQUExQixDQUFQO0FBQ0gsVUFUQztBQVVGQyxpQkFBUSxTQUFTQyxNQUFULENBQWdCSCxHQUFoQixFQUFxQkksS0FBckIsRUFBMkI7QUFDL0IsaUJBQUlDLFlBQVksQ0FBaEI7QUFBQSxpQkFDSUMsV0FBVyxFQURmO0FBQUEsaUJBRUlDLFdBQVcsRUFGZjtBQUFBLGlCQUdJQyxJQUhKO0FBQUEsaUJBR1VDLEVBSFY7O0FB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dkYsTUFBUCxHQUFjLENBQWQsR0FBa0I2RixPQUFLLENBQXZFLEVBQTBFRCxJQUExRSxFQUFnRkMsSUFBaEY7QUFDQSxNQUxELE1BS087QUFDTlQsbUJBQWFXLFFBQWI7QUFDQTtBQUNELEtBVFUsRUFTUixPQUFLLEVBVEcsQ0FBWDtBQVVBLElBWFMsRUFXUCxHQVhPLENBQVY7QUFhQSxHQXJDRDtBQXNDQSxFQWpERDs7QUFtREE3SSxhQUFZbUMsU0FBWixDQUFzQkMsUUFBdEIsR0FBaUMsVUFBV3pKLE1BQVgsRUFBbUJ5USxLQUFuQixFQUEyQjtBQUMzRCxNQUFLelEsT0FBT0ksU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJvUSxLQUF6QixJQUFrQyxDQUFDLENBQXhDLEVBQTRDO0FBQzVDelEsU0FBT0ksU0FBUCxJQUFvQixNQUFNcVEsS0FBMUI7QUFDQSxFQUhEOztBQUtBcEosYUFBWW1DLFNBQVosQ0FBc0JHLFdBQXRCLEdBQW9DLFVBQVczSixNQUFYLEVBQW1CeVEsS0FBbkIsRUFBMkI7QUFDOUQsTUFBSUMsU0FBUyxJQUFJQyxNQUFKLENBQVdGLEtBQVgsQ0FBYjtBQUNBelEsU0FBT0ksU0FBUCxHQUFtQnBELEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFjNkMsT0FBT0ksU0FBUCxDQUFpQi9DLE9BQWpCLENBQTBCcVQsTUFBMUIsRUFBa0MsRUFBbEMsQ0FBZCxDQUFuQjtBQUNBLEVBSEQsQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3MzgxZWE3ZWM5N2M5OGY5NDdjMlxuICoqLyIsImltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbmltcG9ydCAnLi9kZXYnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuaW1wb3J0ICcuL3ZpZGVvLXBsYXllcic7XG5cblxudmFyICQgPSB3aW5kb3cuJDtcbnZhciB3aW4gPSB3aW5kb3csXG4gICAgZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKG1zZykge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xufTtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuICAgIC8v7Jyg7Yu4IOuplOyEnOuTnFxuICAgIHV0aWw6IHtcbiAgICAgICAgLy8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuICAgICAgICBjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpIHt9XG5cbiAgICAgICAgLy8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcbiAgICAgICAgLFxuICAgICAgICB0cmltOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGN1dHN0cjogZnVuY3Rpb24gY3V0U3RyKHN0ciwgbGltaXQpeyAgICBcbiAgICAgICAgICAgIHZhciBzdHJMZW5ndGggPSAwLFxuICAgICAgICAgICAgICAgIHN0clRpdGxlID0gXCJcIixcbiAgICAgICAgICAgICAgICBzdHJQaWVjZSA9IFwiXCIsXG4gICAgICAgICAgICAgICAgY29kZSwgY2g7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKSxcbiAgICAgICAgICAgICAgICBjaCA9IHN0ci5zdWJzdHIoaSwxKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHN0clBpZWNlID0gc3RyLnN1YnN0cihpLDEpXG4gICAgICAgICAgICAgICAgY29kZSA9IHBhcnNlSW50KGNvZGUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgoY2ggPCBcIjBcIiB8fCBjaCA+IFwiOVwiKSAmJiAoY2ggPCBcIkFcIiB8fCBjaCA+IFwiWlwiKSAmJiAoKGNvZGUgPiAyNTUpIHx8IChjb2RlIDwgMCkpKVxuICAgICAgICAgICAgICAgICAgICBzdHJMZW5ndGggPSBzdHJMZW5ndGggKyAzOyAvL1VURi04IDNieXRlIOuhnCDqs4TsgrBcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHN0ckxlbmd0aCA9IHN0ckxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoc3RyTGVuZ3RoPmxpbWl0KSAvL+ygnO2VnCDquLjsnbQg7ZmV7J24XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGVsc2Ugc3RyVGl0bGUgPSBzdHJUaXRsZStzdHJQaWVjZTsgLy/soJztlZzquLjsnbQg67O064ukIOyekeycvOuptCDsnpDrpbgg66y47J6Q66W8IOu2meyXrOykgOuLpC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHJUaXRsZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNEZXZpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy/rqqjrsJTsnbwgVUFcbiAgICAgICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2luZ2VyYnJlYWQpIHJldHVybiAnZ2luZ2VyYnJlYWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlvcykgcmV0dXJuICdpb3MnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MpIHJldHVybiAnbm8tbW9iaWxlJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlvczogdWEubWF0Y2goJ2lQaG9uZScpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZ2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRldmljZVNpemU6ICdkZXZpY2Utc2l6ZS0nICsgd2luZG93LmlubmVyV2lkdGhcbiAgICB9XG5cbiAgICAvLyDqs7XthrUg66mU7ISc65OcXG4gICAgLFxuICAgIGNvbW1vbjoge1xuXG4gICAgICAgIC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuICAgICAgICBlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG4gICAgICAgICAgICB2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksXG4gICAgICAgICAgICAgICAgYVRhZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgaHJlZiA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGFUYWcgPSBhbGxBW2ldO1xuICAgICAgICAgICAgICAgIGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICAgIGlmICh1aS51dGlsLnRyaW0oaHJlZikgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgYVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG4gICAgICAgICxcbiAgICAgICAgdGFibGVGYWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBfc2NvcGUgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZhZGVpbi13cmFwJyk7XG4gICAgICAgICAgICBpZiAoX3Njb3BlLmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgICAgICBfc2NvcGUuZm9yRWFjaChmdW5jdGlvbihlbCwgaSl7XG4gICAgICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcignLmpzLWZhZGVpbi1zY3JvbGwnKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiggZXZlbnQgKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF90YXJnZXQgPSBldmVudC50YXJnZXQgfHwgd2luZG93LmV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29mZicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoL29ufFxcc29uLywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9ICggZWwuY2xhc3NOYW1lLmxlbmd0aCA8IDEgKSA/ICdvbicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIGVsLmNsYXNzTmFtZS5pbmRleE9mKCdvbicpIDw9IC0xICkgPyBlbC5jbGFzc05hbWUgKyAnIG9uJyA6IGVsLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gJCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgLy8gICAgICR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdmFyIF90YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKChfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvYWRpbmcgbWFza1xuICAgICAgICAsXG4gICAgICAgIGxvYWRpbmdDb21wbGV0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VQcmVsb2FkZXIoJy9mcm9udC9pbWFnZXMvbG9hZGluZy1jaXJjdWxhci5naWYnLCBmdW5jdGlvbihpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9IFwidmlkZW8tbG9hZGluZy1pbWFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jLmJvZHkpLnN0b3AoKS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6re466O5IO2GoOq4gFxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZUdyb3VwOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gZG9jLnF1ZXJ5U2VsZWN0b3IoYCR7Z3JvdXB9ICR7ZWxlbWVudH1gKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkpO1xuICAgICAgICAgICAgLy8gICAgICQoJycpXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCBlbGVtZW50ICkuY2xhc3NOYW1lID0gdGhpcy5xdWVyeVNlbGVjdG9yKCBlbGVtZW50ICkuY2xhc3NOYW1lLnJlcGxhY2UoIC9hY3RpZXZlfFxcc2FjdGl2ZS8sIFwiXCIgKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAvLyB9LCBmYWxzZSk7IFxuICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGF5ZXIgcG9wdXBcbiAgICAgICAgLFxuICAgICAgICBwb3B1cENsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcG9wdXAgPSAkKCcucG9wdXAnKTtcbiAgICAgICAgICAgIGlmICggcG9wdXAubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTAsIGxlbmd0aD1wb3B1cC5sZW5ndGg7IGk8bGVuZ3RoOyBpKz0xICkge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oail7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5lcShqKS5maW5kKCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5wb3B1cCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmYWtlU2VsZWN0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLnNlbGVjdC13cmFwLmZha2UnKS5lYWNoKGZ1bmN0aW9uKGl0ZW0sIHZhbHVlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSAkKHRoaXMpLmZpbmQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZ2V0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRoYXQub3B0aW9uc1t0aGF0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnRleHQoIHRleHQgKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICAgIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgICAgIF9zY29wZTogJycsXG5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcbiAgICAgICAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4BcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgICB2YXIgYWNjb3JkaWFuID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuICAgICAgICBpbml0OiBmdW5jdGlvbihfc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICB9LFxuICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoaXRlbS5wb3NpdGlvbigpLnRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAgIC8vIGRvbSBjb25maXJtIGxheWVyXG4gICAgdmFyIGNvbmZpcm0gPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHRoaXMubWFrZURvbSAoIG9wdGlvbnMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZURvbTogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgICAgIHZhciB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25DbGlja0Z1bmMsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmNcbiAgICAgICAgICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpcm1cIj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInRpdGxlXCI+PHNwYW4+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVzY1wiPlxuICAgICAgICAgICAgICAgICR7bXNnID8gYCR7bXNnfWAgOiBgYH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBjbG9zZVwiPiR7Y2xvc2VCdXR0b25UZXh0ID8gY2xvc2VCdXR0b25UZXh0IDogXCLri6vquLBcIn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBva1wiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsaW5kXCI+64ur6riwPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG4gICAgICAgICAgICAgICAgY29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1sYXllcicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoICBjb25maXJtTGF5ZXIgKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1sYXllcicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jLCBjbG9zZUJ1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYywgY2xvc2VCdXR0b25DbGlja0Z1bmMgKXtcbiAgICAgICAgICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICAgICAgYnV0dG9ucyA9IFsnb2snLCAnY2xvc2UnLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApO1xuICAgICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdvaycpID4gLTEgJiYgdHlwZW9mIG9rQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ2Nsb3NlJykgPiAtMSAmJiBpbmRleCA9PSAxICYmIHR5cGVvZiBjbG9zZUJ1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKCBzY29wZSApO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGJlYXV0eW51cy5jb25maXJtID0gY29uZmlybTtcblxuICAgIHZhciBhbGVydCA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRG9tKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ha2VEb206IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdmFyIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuY1xuICAgICAgICAgICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cInRpdGxlXCI+PHNwYW4+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgICAgPHAgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICAke21zZyA/IGAke21zZ31gIDogYGB9XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+JHtva0J1dHRvblRleHQgPyBva0J1dHRvblRleHQgOiBcIu2ZleyduFwifTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxpbmRcIj7ri6vquLA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+YDtcbiAgICAgICAgICAgIHZhciBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICBjb25maXJtTGF5ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbGVydC1sYXllcicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbmZpcm1MYXllciApO1xuICAgICAgICAgICAgdGhpcy5zY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1sYXllcicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jICk7XG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50RXhlY3V0ZTogZnVuY3Rpb24oIG9rQnV0dG9uQ2xpY2tGdW5jICl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykpO1xuICAgICAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgWydvaycsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApIClcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdvaycpID4gLTEgJiYgdHlwZW9mIG9rQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiZWF1dHludXMuYWxlcnQgPSBhbGVydDtcblxuICAgIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgICAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cbiAgICBjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuICAgIGNvbW1vbi50YWJsZUZhZGUoKTtcblxuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykpO1xuXG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cbiAgICBjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NhbGxiYWNrc1xuICAgIH0pO1xuXG4gICAgLy/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuICAgIGlmIChsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xKSB7XG4gICAgICAgIGRldi5hcHBlbmRNZW51TGlzdCgpO1xuICAgICAgICBkZXYuYXBwZW5kTWVudUJ0bigpO1xuICAgIH1cbn0pO1xuXG4vKlxuICpcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4gKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VzLnNyYyA9IGltZztcblxuICAgIGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBbd2luLCBkb2MsIHFzYSwgcXNdID0gW3dpbmRvdywgZG9jdW1lbnQsICdxdWVyeVNlbGVjdG9yQWxsJywgJ3F1ZXJ5U2VsZWN0b3InXTtcblxuY29uc3Rcblx0ZG9tIFx0PSBzID0+IGRvY3VtZW50W3FzXShzKSxcblx0ZG9tQWxsIFx0PSBzID0+IGRvY3VtZW50W3FzYV0ocyksXG5cdG1ha2VEb20gPSAocywgYXR0cikgPT4ge1xuXHRcdHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHMpXG5cdFx0aWYgKCB0eXBlb2YgYXR0ciA9PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhhdHRyKS5sZW5ndGggPiAwIClcblx0XHRcdGZvciAoIGxldCBpIGluIGF0dHIgKVxuXHRcdFx0XHRkb20uc2V0QXR0cmlidXRlKGksIGF0dHJbaV0pO1xuXHRcdHJldHVybiBkb207XG5cdH0sXG5cdHB1dFRleHQgPSBzID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpLFxuXHRwcmVwZW5kID0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0Lmluc2VydEJlZm9yZShpdGVtLCB0YXJnZXQuY2hpbGROb2Rlc1swXSksXG5cdGFwcGVuZCBcdD0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0LmFwcGVuZENoaWxkKGl0ZW0pO1xuXG5jb25zdCBtZW51RGF0YSA9IFtcblx0e1xuXHRcdGRlcHRoMTogXCLqs7XthrVcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yT6riAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL3JlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCtOyaqeydtCDsl4bsnYQg65WMXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL25vLXJlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcImNvbmZpcm0sIGFsZXJ0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29uZmlnL2xvY2F0aW9uU2VydmljZUFncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67iM656c65Oc66mU7J24XCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeygleuztFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuunpOyepeyGjOyLnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlSW5mby9zdG9yZU5ld3MuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67Cx7ZmU7KCQ7ZaJ7IKsKFNhbXBsZSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUV2ZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeuwqeusuO2bhOq4sFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3Zpc2l0b3JzQm9va0RldGFpbC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiBmYWxzZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvc2VydmljZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9tYXRpb24uaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7J2067Kk7Yq4Ju2WieyCrFwiLFxuXHRcdGRlcHRoMjogXCLsp4TtlonspJHsnbgg7J2067Kk7Yq4XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7J2867CYXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDri6jsnbzshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyZhOujjClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsooXro4wg7ZuEIO2ZleyduClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX2ZpbmlzaC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsmIjslb0g7IucIC0g6rCc7J247KCV67O0IOyImOynkSDrsI8g7J207Jqp7JWI64K0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvcmVzZXJ2YXRpb24vYWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7L+g7Y+w67aBXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvdXBvbkJvb2svZGV0YWlsLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67ew7Yuw7Luo7YWQ7LigXCIsXG5cdFx0ZGVwdGgyOiBcIuuqqeuhnVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjsubTrk5zribTsiqTtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4HtkojsoJXrs7RcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RJbmZvL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzoOqwneyEvO2EsFwiLFxuXHRcdGRlcHRoMjogXCLqs7Xsp4Dsgqztla1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqqnroZ0gKyDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9ub3RpY2UvbGlzdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuPhOybgOunkFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqZTsnbhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9oZWxwL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6XCLrp4jsnbTtjpjsnbTsp4BcIiAsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrk7HquIlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvZ3JhZGUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOy/oO2PsFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9jb3Vwb24vaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g67Cp66y47ZuE6riwXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L3Zpc2l0b3JzQm9vay5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq0gOyLrOyDge2SiFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wcm9kdWN0T2ZJbnRlcmVzdC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLqtazrp6TtmITtmalcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrpqzsiqTtirgocG9wdXAg7Y+s7ZWoKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wdXJjaGFzZS9wZXJpb2QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yA7ZmU7ZmU66m0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQke2RlcHRoMSA/IGA8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+YCA6IGBgfVxuXHQke2RlcHRoMiA9PSAnJyA/IGRlcHRoMiA6IGA8aDM+PHNwYW4+JHtkZXB0aDJ9PC9zcGFuPjwvaDM+YH1cblx0PHVsPiR7bGlua3MucmVkdWNlKChpcCwgaWMpID0+IHtcblx0XHRcdGxldCB7dGl0bGUsIGhyZWYsIGNvbXBsZXRlfSA9IGljO1xuXHRcdFx0cmV0dXJuIGAke2lwIHx8IFwiXCJ9XG5cdFx0PGxpJHtjb21wbGV0ZSA/ICcgY2xhc3M9XCJjcFwiJyA6IFwiXCJ9PjxhIGhyZWY9XCIke2hyZWZ9XCI+JHt0aXRsZX08L2E+PC9saT5gfSwgMCl9XG5cdDwvdWw+XG5cdGBcbn0sIDApO1xuXG4vLyDrqZTribQg67KE7Yq8IOyCveyehVxud2luZG93LmRldiA9IHtcblx0YXBwZW5kTWVudUJ0bjogZnVuY3Rpb24oKXtcblx0XHR2YXIgbWVudVRyaWdnZXIgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZW51LXRyaWdnZXJcIj5cblx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG48L2J1dHRvbj5gO1xuXHRcblx0XHRcdGlmICggJCgnYnV0dG9uLm1lbnUtdHJpZ2dlcicpLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0XHR9XG5cdFxuXHRcdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG1lbnVMaXN0ID0gJCgnI21lbnUtbGlzdCcpLFxuXHRcdFx0XHQgICAgY3RybENsYXNzID0gJ2lzLWFjdGl2ZScsXG5cdFx0XHRcdCAgICBjb25kaXRpb24gPSBtZW51TGlzdC5oYXNDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdGlmIChjb25kaXRpb24pIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5hZGRDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IGNsYXNzPW92ZXJ0aHJvdyAvPicpLmFwcGVuZCggbWVudUxpc3QgKSApO1xuXHRcdFx0JCgnI3dyYXAnKS5sZW5ndGggPD0gMCA/ICQoJ2JvZHknKS5wcmVwZW5kKCBtZW51TGlzdCApIDogJCgnI3dyYXAnKS5wcmVwZW5kKCBtZW51TGlzdCApO1xuXHRcdH1cblx0XHQkKCcjbWVudS1saXN0JykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhSFJFRiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0aWYgKCBhSFJFRi5pbmRleE9mKCc/ZGV2JykgPD0gLTEgKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGFIUkVGICsgJz9kZXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHQsZGltbTogZnVuY3Rpb24obXNnKXtcblx0XHRtc2cgPSBtc2cgfHwgJ+uCtOyaqeydtCDsl4bsirXri4jri6QuJztcblx0XHQkKCdib2R5JykuYXBwZW5kKFxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImRpbW1cIiAvPicpLmFwcGVuZChcblx0XHRcdFx0JChgPHNwYW4+JHttc2d9PHNwYW4vPjxidXR0b24gY2xhc3M9XCJjbG9zZVwiPlvri6vquLBdPC9zcGFuPjwvYnV0dG9uPmApXG5cdFx0XHQpXG5cdFx0KTtcblx0XHQkKCcuZGltbScpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmRpbW0nKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZGV2LmpzXG4gKiovIiwiLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qXHRuZXR3b3JrU3RhdGUgeyBudW1iZXIgfVxuKiBcdDAgPSBORVRXT1JLX0VNUFRZIC0gYXVkaW8vdmlkZW8gaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZFxuKlx0MSA9IE5FVFdPUktfSURMRSAtIGF1ZGlvL3ZpZGVvIGlzIGFjdGl2ZSBhbmQgaGFzIHNlbGVjdGVkIGEgcmVzb3VyY2UsIGJ1dCBpcyBub3QgdXNpbmcgdGhlIG5ldHdvcmtcbipcdDIgPSBORVRXT1JLX0xPQURJTkcgLSBicm93c2VyIGlzIGRvd25sb2FkaW5nIGRhdGFcbipcdDMgPSBORVRXT1JLX05PX1NPVVJDRSAtIG5vIGF1ZGlvL3ZpZGVvIHNvdXJjZSBmb3VuZFxuKlxuKlx0cmVhc3lTdGF0ZSB7IG51bXZlciB9XG4qXHQwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XHRcbipcdDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuKlx0MiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuKlx0MyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4qXHQ0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdC8vd3JhcHBlciwgZW5kZWRDYWxsYmFja1xuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIFZpZGVvUGxheWVyKSApIHJldHVybiBuZXcgVmlkZW9QbGF5ZXIod3JhcHBlciwgZW5kZWRDYWxsYmFjayk7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMud3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVswXTtcblx0dGhpcy5oaWdoUmVzIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpWzFdO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAoZnVuY3Rpb24oKXtcblx0XHRpZiAoIG9wdGlvbnMuc3RhcnRUaW1lID49IG9wdGlvbnMuZHVyYXRpb24gKSByZXR1cm4gMDtcblx0XHR2YXIgc3RhcnRUaW1lID0gb3B0aW9ucy5zdGFydFRpbWUgPyBOdW1iZXIob3B0aW9ucy5zdGFydFRpbWUpIDogMDtcblx0XHRyZXR1cm4gc3RhcnRUaW1lO1xuXHR9KSgpO1xuXHR0aGlzLmNvbnRyb2xUaW1lciBcdD0gbnVsbDtcblx0dGhpcy5wb3N0ZXIgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5wb3N0ZXInKTtcblx0dGhpcy5jb250cm9sIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpO1xuXHR0aGlzLmJnIFx0XHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5iZycpO1xuXHR0aGlzLnBsYXlCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wbGF5Jyk7XG5cdHRoaXMucGF1c2VCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wYXVzZScpO1xuXHR0aGlzLnZpZGVvVGltZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnJ1bm5pbmctdGltZScpO1xuXHR0aGlzLnRpbWVsaW5lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcblx0dGhpcy5mdWxsQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuZnVsbCcpO1xuXHR0aGlzLnN0YXJ0VGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50Jyk7XG5cdHRoaXMuZW5kVGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5lbmQnKTtcblx0dGhpcy5zZWVrYmFyIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpO1xuXHR0aGlzLmJ0bkdyb3VwIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYnRuLWdyb3VwJyk7XG5cdHRoaXMuYWN0aXZlQnRuIFx0XHQ9IHRoaXMuYnRuR3JvdXAucXVlcnlTZWxlY3RvcignYnV0dG9uLmFjdGl2ZScpO1xuXHR0aGlzLm1vYmlsZU5ldHdvcmtcdD0gb3B0aW9ucy5tb2JpbGVOZXR3b3JrO1xuXHR0aGlzLmFsZXJ0TW9iaWxlXHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtbW9iaWxlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblx0dGhpcy5lbmRlZENhbGxiYWNrID0gdHlwZW9mIG9wdGlvbnMuZW5kZWRDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5lbmRlZENhbGxiYWNrIDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS53YXJuKCdlbmRlZENhbGxiYWNrIHR5cGUgaXMgbm90IGEgZnVuY3Rpb24uJyk7XG5cdH07XG5cdHRoaXMucHVzaFRpbWUgPSB0eXBlb2Ygb3B0aW9ucy50aW1ldXBkYXRlQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMudGltZXVwZGF0ZUNhbGxiYWNrIDogZnVuY3Rpb24oKXt9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX3VubG9hZCgpO1xuXHR0aGlzLl9zaXplKCk7XG5cdHRoaXMuX2luaXQoKTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRbdGhhdC5wbGF5QnRuLCB0aGF0LnBhdXNlQnRuXS5mb3JFYWNoKGZ1bmN0aW9uKGJ0biwgaW5kZXgpe1xuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKXtcblx0XHRcdHRoYXQuYWRkS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblxuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cdH0pO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0aWYgKCB0aGF0Lm1vYmlsZU5ldHdvcmsgKSB7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmsgPSBmYWxzZTtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29ya0NoZWNrKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoYXQuX3BsYXkoKTtcblx0XHR9XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdyA9IE1hdGgucm91bmQoIHRoaXMud3JhcHBlci5jbGllbnRXaWR0aCApLFxuXHRcdGggPSAwO1xuXHRoID0gKDkgKiB3KSAvIDE2O1xuXHR0aGlzLndyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3VubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnQuYm9keS5vbnVubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ3BhZ2UgbW92ZScpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1vYmlsZU5ldHdvcmtDaGVjayA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGFsZXJ0ID0gdGhhdC5hbGVydE1vYmlsZTtcblx0dGhhdC5hZGRLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRhbGVydC5xdWVyeVNlbGVjdG9yKCdidXR0b24ub2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5fcGxheSgpO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSBudWxsO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdFx0Ly8gaWYgKCB0aGF0LmN1clRpbWUgKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lOyBcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdC8vIGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0di5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZCcsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2Fkc3RhcnQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZHN0YXJ0Jy4gdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZGRhdGEgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvYWRlZGRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZGVkbWV0YWRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblxuXHRcdGRvY3VtZW50Lm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiAmJiB2LmVuZGVkICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBjaGFuZ2UgOiB6b29tIGluJyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cblx0dGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHR9O1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQucG9zdGVyLCAnaGlkZScgKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdFx0Y29uc29sZS5sb2coJ29ucGxheScpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25jYW5wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5wYXVzZUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wbGF5QnRuLCAnaGlkZScgKTtcblx0XHRjb25zb2xlLmxvZygnb25jYW5wbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdFx0Y29uc29sZS5sb2coJ29ucGxheWluZycpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQucGF1c2VCdG4sICdoaWRlJyApO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQucGxheUJ0biwgJ2hpZGUnICk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmFkZEtsYXNzKHRoYXQuYnRuR3JvdXAsICdoaWRlJyk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHRpZiAoIHYuZW5kZWQgKSB7XG5cdFx0XHRpZiAoIHYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdHRoYXQudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXG5cdFx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygxKTtcblx0XHRcdFx0XHR2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMik7XG5cdFx0XHRcdFx0di53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDMpO1xuXHRcdFx0XHRcdGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbiApe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDQpO1xuXHRcdFx0XHRcdGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCB2LmVuZGVkICkgdGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cdFx0Y29uc29sZS5sb2coJ29ucGF1c2UnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRSYXRpbyA9IGZ1bmN0aW9uKHgsIHksIGwpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdGFyZ2V0ID0gMDtcblx0dGFyZ2V0ID0gTWF0aC5yb3VuZCgoeSAqIGwpIC8geCk7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdmlkZW8gPSAkKHRoYXQud3JhcHBlcikuZmluZCgndmlkZW86dmlzaWJsZScpLmVxKDApLmdldCgwKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiggZXJyb3JUeXBlICkge1xuXHQvLyBpZiAoIG5ldHdvcmtTdGF0ZSA9PSAgKVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IGZ1bmN0aW9uKHYpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0d3JhcHBlciA9IHRoYXQud3JhcHBlcjtcblx0d3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHYudmlkZW9XaWR0aCwgdi52aWRlb0hlaWdodCwgdi5jbGllbnRXaWR0aCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblRpbWVVcGRhdGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvLFxuXHRcdHB2ID0gMDtcblx0di5vbnRpbWV1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHRcdGlmICggdi5wYXVzZWQgKSByZXR1cm47XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgnc2VlaycpO1xuXHRcdC8vIDXstIjrp4jri6Qg7Iuc6rCE7LK07YGsXG5cdFx0aWYgKHB2ICE9IE1hdGgucm91bmQodi5jdXJyZW50VGltZSkgJiYgIE1hdGgucm91bmQodi5jdXJyZW50VGltZSkgJSA1ID09IDAgKSB7XG5cdFx0XHQvLyDtmITsnqzsi5zqsITsnYQgNeuhnCDrgpjriITslrQg64KY66i47KeA66W8IOq1rO2VmOqzoCDqt7gg64KY66i47KeA6rCAIDXrs7Tri6Qg7J6R7Jy866m0IOyYrOumvCwg6rCZ6rGw64KYIO2BrOuptCDrsoTrprxcblx0XHRcdHRoYXQucHVzaFRpbWUoIE1hdGhbICh2LmN1cnJlbnRUaW1lICUgNSkgPCA1ID8gJ2NlaWwnIDogJ2Zsb29yJyBdKHYuY3VycmVudFRpbWUpwqApO1xuXHRcdFx0cHYgPSBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpO1xuXHRcdH1cblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5idG5Hcm91cCwgJ2hpZGUnICk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC50aW1lbGluZSwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAncmVtb3ZlLXRpbWUnICk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR0aGF0LnBhdXNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdFx0dGhhdC5wbGF5UGF1c2UoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LnBsYXlCdG4sICdoaWRlJyApO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQucGF1c2VCdG4sICdoaWRlJyApO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQuYmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmNvbnRyb2wpLm9uKHtcblx0J21vdXNkb3duIHRvdWNoc3RhcnQnOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9LFxuXHQnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuXHQgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tYWtlU2Vla2JhciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzdGFydDogZnVuY3Rpb24gKCBldmVudCwgdWkgKSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9LFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblxuXHRcdGlmICggdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwbGF5JyApIHtcblx0XHRcdHYucGxheSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2LnBhdXNlKCk7XG5cdFx0fVxuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0XHQ9IHRoaXMsXG5cdFx0YnRuR3JvdXAgXHQ9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzIFx0XHQ9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgXHQ9IHRoaXMuaGlnaFJlcyxcblx0XHR1YSBcdFx0XHQ9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxcblx0XHRzdHlsZXNcdFx0PSB7XG5cdFx0XHRzaG93OiBbe2Rpc3BsYXk6ICdibG9jaycsIG9wYWNpdHk6IDF9XSxcblx0XHRcdGhpZGU6IFt7ZGlzcGxheTogJ25vbmUnLCBvcGFjaXR5OiAwfV1cblx0XHR9LFxuXHRcdGNob2ljZSA9ICggZWwgKSA9PiB7XG5cdFx0XHR2YXIgc2hvd0VsLCBoaWRlRWw7XG5cdFx0XHRpZiAoIGVsID09ICdsb3cnIClcblx0XHRcdFx0c2hvd0VsID0gbG93UmVzLCBoaWRlRWwgPSBoaWdoUmVzO1xuXHRcdFx0ZWxzZSBpZiAoIGVsID09ICdoaWdoJyApXG5cdFx0XHRcdGhpZGVFbCA9IGxvd1Jlcywgc2hvd0VsID0gaGlnaFJlcztcblxuXHRcdFx0Ly8gZm9yICggdmFyIHZpIGluIGxvd1JlcyApIHtcblx0XHRcdC8vIFx0Y29uc29sZS5sb2codmkpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Y29uc29sZS5kaXIobG93UmVzKTtcblxuXHRcdFx0c3R5bGVzLnNob3cuZm9yRWFjaCgoYywgaSkgPT4ge1xuXHRcdFx0XHRzaG93RWwuc3R5bGVbT2JqZWN0LmtleXMoYylbMV1dID0gY1tPYmplY3Qua2V5cyhjKVsxXV07XG5cdFx0XHR9KTtcblx0XHRcdHNob3dFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0XHRzaG93RWwuc2V0QXR0cmlidXRlKCdzcmMnLCBzaG93RWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcblxuXHRcdFx0c3R5bGVzLmhpZGUuZm9yRWFjaCgoYywgaSkgPT4ge1xuXHRcdFx0XHRoaWRlRWwuc3R5bGVbT2JqZWN0LmtleXMoYyldID0gY1tPYmplY3Qua2V5cyhjKV07XG5cdFx0XHR9KTtcblx0XHRcdGhpZGVFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdFx0XG5cdFx0XHR0aGF0LnZpZGVvID0gc2hvd0VsO1xuXHRcdH0sXG5cdFx0Y29uZGl0aW9uID0gYnRuR3JvdXAucXVlcnlTZWxlY3RvcignYnV0dG9uLmFjdGl2ZScpLmNsYXNzTmFtZS5pbmRleE9mKCdsb3cnKSA+IC0xID8gJ2xvdycgOiAnaGlnaCc7XG5jb25zb2xlLmxvZyhjb25kaXRpb24pO1xuXHRjaG9pY2UoIGNvbmRpdGlvbiApO1xuXG5cdCAvLyBpZiAoIHVhLmluZGV4T2YoJ2FuZHJvaWQgNC4yJykgPiAtMSB8fCB1YS5pbmRleE9mKCdhbmRyb2lkIDQuMycpID4gLTEgKSB7XG5cdCAvLyBcdCQodGhhdC52aWRlbykuYXBwZW5kKCc8c291cmNlIHNyYz1cIlwiPjwvc291cmNlPicpO1xuXHQgLy8gXHQkKHRoYXQudmlkZW8pLmZpbmQoJ3NvdXJjZScpLmF0dHIoJ3NyYycsICQodGhhdC52aWRlbykuZGF0YSgnc3JjJykpO1xuXHQgLy8gfVxuXG5cdHRoYXQudmlkZW8ubG9hZCgpO1xuXHQvLyB0aGF0LnZlcmlmeWluZyggdGhhdC52aWRlbyApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnZlcmlmeWluZyA9IGZ1bmN0aW9uICggdiApIHtcblx0Y29uc29sZS5sb2codi5uZXR3b3JrU3RhdGUpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNoYW5nZUN1cnJlbnRUaW1lID0gZnVuY3Rpb24odWkpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvLFxuXHRcdG0sIHM7XG5cblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY3VyVGltZSA9IHYuY3VycmVudFRpbWU7XG5cdG0gPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAvIDYwKSApLnRvU3RyaW5nKCk7XG5cdHMgPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAlIDYwKSApLnRvU3RyaW5nKCk7XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IChtLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbSkgICsgJzonICsgKHMubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgY2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuXHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdGlmKHRoYXQuY3VyVGltZSkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTtcblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmcnKTtcblxuXHR2YXIgY2FudmFzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzVGFnLmlkID0gXCJ2aWRlb1Bvc3RlclwiO1xuXHR0aGF0LnBvc3Rlci5hcHBlbmRDaGlsZCggY2FudmFzVGFnICk7XG5cdHRoYXQuZ2V0RHVyYXRpb24oKTtcblx0aW1hZ2VQcmVsb2FkZXIoYmcsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIHRoYXQubG9hZGluZ0VsZW1lbnQgKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0fVxuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9Qb3N0ZXInKSxcblx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcblx0XHRcdGltZyA9IG5ldyBJbWFnZSgpLFxuXHRcdFx0aW1nVyA9IDAsXG5cdFx0XHRpbWdIID0gMCxcblx0XHRcdHRpbWVvdXQsXG5cdFx0XHRpbnRlcnZhbDtcblx0XHR2YXIgYWEgPSAwO1xuXHRcdGltZy5zcmMgPSBiZztcblx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMDtcblxuXHRcdGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHRcdGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHQvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuXHRcdFxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGggKiAxLjU7XG5cdFx0aW1nSCA9ICggTWF0aC5yb3VuZChpbWcubmF0dXJhbEhlaWdodCkgKiA5ICkgLyAxNjtcblx0XHRpbWdIID0gTWF0aC5yb3VuZCggaW1nSCApICogMS41O1xuXHRcdC8vIGltZ0ggPSB0aGF0LmdldFJhdGlvKGltZy5uYXR1cmFsV2lkdGgsIGltZy5uYXR1cmFsSGVpZ2h0LCBpbWdXKTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRcdGltZ1cgLT0gKGltZ1cqMC4wMjUpO1xuXHRcdFx0XHRcdGltZ0ggLT0gKGltZ0gqMC4wMjUpO1xuXHRcdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChpbnRlcnZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDEwMDAvNjApXG5cdFx0fSwgMzAwKTtcblx0XHRcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWRkS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdGlmICggdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoa2xhc3MpO1xuXHR0YXJnZXQuY2xhc3NOYW1lID0gdWkudXRpbC50cmltKCB0YXJnZXQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlZ2V4cCwgXCJcIiApICk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3ZpZGVvLXBsYXllci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=