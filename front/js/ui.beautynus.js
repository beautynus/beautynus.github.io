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
				// console.log('onloadstart'. v.networkState);
			};
			v.onloadeddata = function () {
				// console.log('loadeddata', v.networkState);
			};
			v.onloadedmetadata = function () {
				// console.log('onloadedmetadata', v.networkState);
			};
	
			$('body').on('transitionend', function () {
				// console.log('transitionend');
			});
			// that.video.onwebkittransitionend = function() {
	
			// };
	
			that.video.onanimationend = function () {
				// console.log('onwebkitanimationend');
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
			console.log('play');
		};
	
		that.video.oncanplay = function () {
			that.removeKlass(that.pauseBtn, 'hide');
			that.addKlass(that.playBtn, 'hide');
			console.log('oncanplay');
		};
	
		that.video.onplaying = function () {
			that.removeKlass(that.loadingElement, "active");
			console.log('playing');
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
	
			for (var vi in lowRes) {
				console.log(vi);
			}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWExZGI3OWViZjg1ZGY2ZGE4Y2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJjbG9zZUJ1dHRvbkNsaWNrRnVuYyIsIm9rQnV0dG9uVGV4dCIsIm9rQnV0dG9uQ2xpY2tGdW5jIiwiZG9tIiwiY29uZmlybUxheWVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiZXZlbnRFeGVjdXRlIiwiYnV0dG9ucyIsIm1hcCIsImMiLCJpbmRleCIsImFycmF5IiwicmVtb3ZlQ2hpbGQiLCJhbGVydCIsImpvaW4iLCJsb2NhdGlvbiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsInNyYyIsInFzYSIsInFzIiwicyIsImRvbUFsbCIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJpcCIsImljIiwibWVudVRyaWdnZXIiLCJjdHJsQ2xhc3MiLCJjb25kaXRpb24iLCJhZGQiLCJhSFJFRiIsImRpbW0iLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJlbmRlZENhbGxiYWNrIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiIsIk51bWJlciIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJtb2JpbGVOZXR3b3JrIiwiYWxlcnRNb2JpbGUiLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInB1c2hUaW1lIiwidGltZXVwZGF0ZUNhbGxiYWNrIiwicG9zdGVyTG9hZGVkIiwiX3VubG9hZCIsIl9zaXplIiwiX2luaXQiLCJwcm90b3R5cGUiLCJhZGRLbGFzcyIsImJ0biIsInJlbW92ZUtsYXNzIiwibW9iaWxlTmV0d29ya0NoZWNrIiwiX3BsYXkiLCJ3IiwiTWF0aCIsInJvdW5kIiwiaCIsInN0eWxlIiwiaGVpZ2h0Iiwib251bmxvYWQiLCJ2IiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbmN1ZWNoYW5nZSIsIm9ucGxheSIsImN1cnJlbnRUaW1lIiwiY29udHJvbFZpc2libGluZyIsIm9uY2FucGxheSIsIm9ucGxheWluZyIsIm9ucGF1c2UiLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwiZG9jdW1ldCIsImdldFJhdGlvIiwieCIsInkiLCJsIiwiZ2V0RHVyYXRpb24iLCJ0aW1lciIsInNldEludGVydmFsIiwicmVhZHlTdGF0ZSIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJfZXJyb3IiLCJlcnJvclR5cGUiLCJhbGxvY2F0ZVNpemUiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJwdiIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwic2xpZGVyIiwicmFuZ2UiLCJzdGFydCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2VDdXJyZW50VGltZSIsImNoYW5nZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJ0b0xvd2VyQ2FzZSIsInN0eWxlcyIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImNob2ljZSIsInNob3dFbCIsImhpZGVFbCIsInZpIiwiZGlyIiwibG9hZCIsInZlcmlmeWluZyIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJjYW52YXNUYWciLCJpZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwidGltZW91dCIsImludGVydmFsIiwiYWEiLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFGOEI7QUFLOUIsS0FBSUEsSUFBSUMsT0FBT0QsQ0FBZixDLENBSmdCOztBQUtoQixLQUFJRSxNQUFNRCxNQUFWO0FBQUEsS0FDSUUsTUFBTUMsUUFEVjs7QUFHQUgsUUFBT0ksS0FBUCxHQUFlLFVBQVNDLEdBQVQsRUFBYztBQUN6QixZQUFPQyxRQUFRQyxHQUFSLENBQVlGLEdBQVosQ0FBUDtBQUNILEVBRkQ7O0FBSUE7QUFDQUosS0FBSU8sRUFBSixHQUFTUixPQUFPUSxFQUFQLElBQWE7O0FBRWxCO0FBQ0FDLFdBQU07QUFDRjtBQUNBQyx3QkFBZSx5QkFBVyxDQUFFOztBQUU1Qjs7QUFKRSxXQU1GQyxNQUFNLGNBQVNDLEdBQVQsRUFBYztBQUNoQixpQkFBSUEsT0FBTyxJQUFQLElBQWUsT0FBT0EsR0FBUCxJQUFjLFdBQWpDLEVBQThDLE9BQU8sRUFBUDtBQUM5QyxvQkFBT0EsSUFBSUMsT0FBSixDQUFZLFlBQVosRUFBMEIsRUFBMUIsQ0FBUDtBQUNILFVBVEM7QUFVRkMsaUJBQVEsU0FBU0MsTUFBVCxDQUFnQkgsR0FBaEIsRUFBcUJJLEtBQXJCLEVBQTJCO0FBQy9CLGlCQUFJQyxZQUFZLENBQWhCO0FBQUEsaUJBQ0lDLFdBQVcsRUFEZjtBQUFBLGlCQUVJQyxXQUFXLEVBRmY7QUFBQSxpQkFHSUMsSUFI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QWxCLEVBQXVCbVAsT0FBT1csS0FBUCxHQUFhLENBQWIsR0FBaUJOLE9BQUssQ0FBN0MsRUFBZ0RMLE9BQU96RixNQUFQLEdBQWMsQ0FBZCxHQUFrQitGLE9BQUssQ0FBdkUsRUFBMEVELElBQTFFLEVBQWdGQyxJQUFoRjtBQUNBLE1BTEQsTUFLTztBQUNOVCxtQkFBYVcsUUFBYjtBQUNBO0FBQ0QsS0FUVSxFQVNSLE9BQUssRUFURyxDQUFYO0FBVUEsSUFYUyxFQVdQLEdBWE8sQ0FBVjtBQWFBLEdBckNEO0FBc0NBLEVBakREOztBQW1EQS9JLGFBQVltQyxTQUFaLENBQXNCQyxRQUF0QixHQUFpQyxVQUFXekosTUFBWCxFQUFtQjJRLEtBQW5CLEVBQTJCO0FBQzNELE1BQUszUSxPQUFPSSxTQUFQLENBQWlCQyxPQUFqQixDQUF5QnNRLEtBQXpCLElBQWtDLENBQUMsQ0FBeEMsRUFBNEM7QUFDNUMzUSxTQUFPSSxTQUFQLElBQW9CLE1BQU11USxLQUExQjtBQUNBLEVBSEQ7O0FBS0F0SixhQUFZbUMsU0FBWixDQUFzQkcsV0FBdEIsR0FBb0MsVUFBVzNKLE1BQVgsRUFBbUIyUSxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0EzUSxTQUFPSSxTQUFQLEdBQW1CcEQsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWM2QyxPQUFPSSxTQUFQLENBQWlCL0MsT0FBakIsQ0FBMEJ1VCxNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDlhMWRiNzllYmY4NWRmNmRhOGNkXG4gKiovIiwiaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuaW1wb3J0ICcuL2Rldic7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5pbXBvcnQgJy4vdmlkZW8tcGxheWVyJztcblxuXG52YXIgJCA9IHdpbmRvdy4kO1xudmFyIHdpbiA9IHdpbmRvdyxcbiAgICBkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG4gICAgLy/snKDti7gg66mU7ISc65OcXG4gICAgdXRpbDoge1xuICAgICAgICAvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG4gICAgICAgIGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCkge31cblxuICAgICAgICAvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuICAgICAgICAsXG4gICAgICAgIHRyaW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3V0c3RyOiBmdW5jdGlvbiBjdXRTdHIoc3RyLCBsaW1pdCl7ICAgIFxuICAgICAgICAgICAgdmFyIHN0ckxlbmd0aCA9IDAsXG4gICAgICAgICAgICAgICAgc3RyVGl0bGUgPSBcIlwiLFxuICAgICAgICAgICAgICAgIHN0clBpZWNlID0gXCJcIixcbiAgICAgICAgICAgICAgICBjb2RlLCBjaDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpLFxuICAgICAgICAgICAgICAgIGNoID0gc3RyLnN1YnN0cihpLDEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgc3RyUGllY2UgPSBzdHIuc3Vic3RyKGksMSlcbiAgICAgICAgICAgICAgICBjb2RlID0gcGFyc2VJbnQoY29kZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChjaCA8IFwiMFwiIHx8IGNoID4gXCI5XCIpICYmIChjaCA8IFwiQVwiIHx8IGNoID4gXCJaXCIpICYmICgoY29kZSA+IDI1NSkgfHwgKGNvZGUgPCAwKSkpXG4gICAgICAgICAgICAgICAgICAgIHN0ckxlbmd0aCA9IHN0ckxlbmd0aCArIDM7IC8vVVRGLTggM2J5dGUg66GcIOqzhOyCsFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihzdHJMZW5ndGg+bGltaXQpIC8v7KCc7ZWcIOq4uOydtCDtmZXsnbhcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZWxzZSBzdHJUaXRsZSA9IHN0clRpdGxlK3N0clBpZWNlOyAvL+ygnO2VnOq4uOydtCDrs7Tri6Qg7J6R7Jy866m0IOyekOuluCDrrLjsnpDrpbwg67aZ7Jes7KSA64ukLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0clRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBpc0RldmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL+uqqOuwlOydvCBVQVxuICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5naW5nZXJicmVhZCkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW9zKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcykgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIH1cblxuICAgIC8vIOqzte2GtSDrqZTshJzrk5xcbiAgICAsXG4gICAgY29tbW9uOiB7XG5cbiAgICAgICAgLy8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG4gICAgICAgIGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcbiAgICAgICAgICAgIHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSxcbiAgICAgICAgICAgICAgICBhVGFnID0gbnVsbCxcbiAgICAgICAgICAgICAgICBocmVmID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVRhZyA9IGFsbEFbaV07XG4gICAgICAgICAgICAgICAgaHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgaWYgKHVpLnV0aWwudHJpbShocmVmKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcbiAgICAgICAgLFxuICAgICAgICB0YWJsZUZhZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9zY29wZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgICAgICAgIGlmIChfc2NvcGUubGVuZ3RoIDw9IDApIHJldHVybjtcbiAgICAgICAgICAgIF9zY29wZS5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpKXtcbiAgICAgICAgICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKCcuanMtZmFkZWluLXNjcm9sbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGV2ZW50LnRhcmdldCB8fCB3aW5kb3cuZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2ZmJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgvb258XFxzb24vLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gKCBlbC5jbGFzc05hbWUubGVuZ3RoIDwgMSApID8gJ29uJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggZWwuY2xhc3NOYW1lLmluZGV4T2YoJ29uJykgPD0gLTEgKSA/IGVsLmNsYXNzTmFtZSArICcgb24nIDogZWwuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAvLyAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9hZGluZyBtYXNrXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2MuYm9keSkuc3RvcCgpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBkb2MucXVlcnlTZWxlY3RvcihgJHtncm91cH0gJHtlbGVtZW50fWApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihlbGVtZW50KSk7XG4gICAgICAgICAgICAvLyAgICAgJCgnJylcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUucmVwbGFjZSggL2FjdGlldmV8XFxzYWN0aXZlLywgXCJcIiApO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgIC8vIH0sIGZhbHNlKTsgXG4gICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMYXllciBwb3B1cFxuICAgICAgICAsXG4gICAgICAgIHBvcHVwQ2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwb3B1cCA9ICQoJy5wb3B1cCcpO1xuICAgICAgICAgICAgaWYgKCBwb3B1cC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGk9MCwgbGVuZ3RoPXBvcHVwLmxlbmd0aDsgaTxsZW5ndGg7IGkrPTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLmVxKGopLmZpbmQoJy5idG4tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnBvcHVwJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZha2VTZWxlY3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LXdyYXAuZmFrZScpLmVhY2goZnVuY3Rpb24oaXRlbSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICQodGhpcykuZmluZCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhhdC5vcHRpb25zW3RoYXQuc2VsZWN0ZWRJbmRleF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwudGV4dCggdGV4dCApO1xuICAgICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gICAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICAgIHZhciBjYXJkTmV3cyA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcblxuICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICAgIHZhciBhY2NvcmRpYW4gPSB7XG4gICAgICAgIF9zY29wZTogJycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKF9zY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChpdGVtLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gICAgLy8gZG9tIGNvbmZpcm0gbGF5ZXJcbiAgICB2YXIgY29uZmlybSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRG9tICggb3B0aW9ucyApO1xuICAgICAgICB9LFxuICAgICAgICBtYWtlRG9tOiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkNsaWNrRnVuYyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuY1xuICAgICAgICAgICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlybVwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwidGl0bGVcIj48c3Bhbj4ke3RpdGxlfTwvc3Bhbj48L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICAgICAgJHttc2cgPyBgJHttc2d9YCA6IGBgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGNsb3NlXCI+JHtjbG9zZUJ1dHRvblRleHQgPyBjbG9zZUJ1dHRvblRleHQgOiBcIuuLq+q4sFwifTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIG9rXCI+JHtva0J1dHRvblRleHQgPyBva0J1dHRvblRleHQgOiBcIu2ZleyduFwifTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1jbG9zZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxpbmRcIj7ri6vquLA8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgICAgIHZhciBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICBjb25maXJtTGF5ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb25maXJtLWxheWVyJyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuaW5uZXJIVE1MID0gZG9tO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCggIGNvbmZpcm1MYXllciApO1xuICAgICAgICAgICAgdGhpcy5zY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWxheWVyJyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZSggb2tCdXR0b25DbGlja0Z1bmMsIGNsb3NlQnV0dG9uQ2xpY2tGdW5jICk7XG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50RXhlY3V0ZTogZnVuY3Rpb24oIG9rQnV0dG9uQ2xpY2tGdW5jLCBjbG9zZUJ1dHRvbkNsaWNrRnVuYyApe1xuICAgICAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZSxcbiAgICAgICAgICAgICAgICBidXR0b25zID0gWydvaycsICdjbG9zZScsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApICk7XG4gICAgICAgICAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ29rJykgPiAtMSAmJiB0eXBlb2Ygb2tCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignY2xvc2UnKSA+IC0xICYmIGluZGV4ID09IDEgJiYgdHlwZW9mIGNsb3NlQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYmVhdXR5bnVzLmNvbmZpcm0gPSBjb25maXJtO1xuXG4gICAgdmFyIGFsZXJ0ID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VEb20oIG9wdGlvbnMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZURvbTogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICB2YXIge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbXNnLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jXG4gICAgICAgICAgICAgICAgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgZG9tID0gYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbmZpcm1cIj5cbiAgICAgICAgPGgzIGNsYXNzPVwidGl0bGVcIj48c3Bhbj4ke3RpdGxlfTwvc3Bhbj48L2gzPlxuICAgICAgICA8cCBjbGFzcz1cImRlc2NcIj5cbiAgICAgICAgICAgICR7bXNnID8gYCR7bXNnfWAgOiBgYH1cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBva1wiIHN0eWxlPVwid2lkdGg6IDEwMCVcIj4ke29rQnV0dG9uVGV4dCA/IG9rQnV0dG9uVGV4dCA6IFwi7ZmV7J24XCJ9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1jbG9zZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibGluZFwiPuuLq+q4sDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG48L2Rpdj5gO1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1MYXllciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FsZXJ0LWxheWVyJyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuaW5uZXJIVE1MID0gZG9tO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCggY29uZmlybUxheWVyICk7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0LWxheWVyJyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZSggb2tCdXR0b25DbGlja0Z1bmMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXZlbnRFeGVjdXRlOiBmdW5jdGlvbiggb2tCdXR0b25DbGlja0Z1bmMgKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSk7XG4gICAgICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLnNjb3BlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbJ29rJywgJ2J0bi1jbG9zZSddLm1hcCggKGMpID0+IHNjb3BlLnF1ZXJ5U2VsZWN0b3IoYC4ke2N9YCkgKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ29rJykgPiAtMSAmJiB0eXBlb2Ygb2tCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJlYXV0eW51cy5hbGVydCA9IGFsZXJ0O1xuXG4gICAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpIHtcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uLFxuICAgICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuICAgIGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG4gICAgY29tbW9uLnRhYmxlRmFkZSgpO1xuXG4gICAgJCgnYm9keScpLmFkZENsYXNzKFtpc0RldmljZS5jaGVjaygpLCB1dGlsLmRldmljZVNpemVdLmpvaW4oJyAnKSk7XG5cbiAgICBiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuICAgIGNvbW1vbi5sb2FkaW5nQ29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY2FsbGJhY2tzXG4gICAgfSk7XG5cbiAgICAvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG4gICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEpIHtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG4gICAgICAgIGRldi5hcHBlbmRNZW51QnRuKCk7XG4gICAgfVxufSk7XG5cbi8qXG4gKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiAqL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oaW1nLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZXMuc3JjID0gaW1nO1xuXG4gICAgaW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhpbWFnZXMpO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IFt3aW4sIGRvYywgcXNhLCBxc10gPSBbd2luZG93LCBkb2N1bWVudCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnLCAncXVlcnlTZWxlY3RvciddO1xuXG5jb25zdFxuXHRkb20gXHQ9IHMgPT4gZG9jdW1lbnRbcXNdKHMpLFxuXHRkb21BbGwgXHQ9IHMgPT4gZG9jdW1lbnRbcXNhXShzKSxcblx0bWFrZURvbSA9IChzLCBhdHRyKSA9PiB7XG5cdFx0dmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocylcblx0XHRpZiAoIHR5cGVvZiBhdHRyID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA+IDAgKVxuXHRcdFx0Zm9yICggbGV0IGkgaW4gYXR0ciApXG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoaSwgYXR0cltpXSk7XG5cdFx0cmV0dXJuIGRvbTtcblx0fSxcblx0cHV0VGV4dCA9IHMgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyksXG5cdHByZXBlbmQgPSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRhcmdldC5jaGlsZE5vZGVzWzBdKSxcblx0YXBwZW5kIFx0PSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzte2GtVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64K07Jqp7J20IOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vbm8tcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwiY29uZmlybSwgYWxlcnRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb25maWcvbG9jYXRpb25TZXJ2aWNlQWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLruIzrnpzrk5zrqZTsnbhcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l7KCV67O0XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66ek7J6l7IaM7IudXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVJbmZvL3N0b3JlTmV3cy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrsLHtmZTsoJDtlonsgqwoU2FtcGxlKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlRXZlbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l67Cp66y47ZuE6riwXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvdmlzaXRvcnNCb29rRGV0YWlsLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuppOuyhOyJvVwiLFxuXHRcdGRlcHRoMjogXCLsnbTsmqnslb3qtIBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLshJzruYTsiqQg7J207Jqp7JW96rSAICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9zZXJ2aWNlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuqwnOyduOygleuztCDsspjrpqzrsKnsuaggKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3BlcnNvbmFsSW5mb21hdGlvbi5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsnITsuZjquLDrsJjshJzruYTsiqQg7J207Jqp7JW96rSAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L2xvY2F0aW9uQmFzZWQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsnbTrsqTtirgm7ZaJ7IKsXCIsXG5cdFx0ZGVwdGgyOiBcIuynhO2WieykkeyduCDsnbTrsqTtirhcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDsnbzrsJhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7Zek652866mU7J207YGs7JeF7Ie8XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3SGVyYS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuLqOydvOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX3NpbmdsZVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuzteyImOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX211bHRpU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7JmE66OMKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxDb21wbGV0ZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyiheujjCDtm4Qg7ZmV7J24KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfZmluaXNoLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyYiOyVvSDsi5wgLSDqsJzsnbjsoJXrs7Qg7IiY7KeRIOuwjyDsnbTsmqnslYjrgrRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9yZXNlcnZhdGlvbi9hZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsv6Dtj7DrtoFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY291cG9uQm9vay9kZXRhaWwuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrt7Dti7Dsu6jthZDsuKBcIixcblx0XHRkZXB0aDI6IFwi66qp66GdXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L2NhcmRUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo64+Z7JiB7IOB7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvbW92aWVUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiOygleuztFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdEluZm8vdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdFJldmlldy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi6rOg6rCd7IS87YSwXCIsXG5cdFx0ZGVwdGgyOiBcIuqzteyngOyCrO2VrVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuqqeuhnSArIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL25vdGljZS9saXN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi64+E7JuA66eQXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuplOyduFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL2hlbHAvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTpcIuuniOydtO2OmOydtOyngFwiICxcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOuTseq4iVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9ncmFkZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuu4jOuenOuTnOuzhCDrp6TsnqXshKDtg51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2Uvc2VsZWN0U3RvcmUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg7L+g7Y+wXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2NvdXBvbi9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7AgLSDrsKnrrLjtm4TquLBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvdmlzaXRvcnNCb29rLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7AgLSDsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rSA7Ius7IOB7ZKIXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3Byb2R1Y3RPZkludGVyZXN0L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuq1rOunpO2YhO2ZqVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuumrOyKpO2KuChwb3B1cCDtj6ztlagpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3B1cmNoYXNlL3BlcmlvZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyXlOygpO2Goe2GoVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjIDtmZTtmZTrqbRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9lbmdlbFRhbGsvdGFsa19pbnF1aXJ5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fVxuXHRcdF1cblx0fVxuXG5dO1xuXG52YXIgbWVudUxpc3QgPSBtZW51RGF0YS5yZWR1Y2UoKHAsIGMpID0+IHtcblx0bGV0IHtkZXB0aDEsIGRlcHRoMiwgbGlua3N9ID0gYztcblx0cmV0dXJuIGAke3AgfHwgJyd9XG5cdCR7ZGVwdGgxID8gYDxoMj48c3Bhbj4ke2RlcHRoMX08L3NwYW4+PC9oMj5gIDogYGB9XG5cdCR7ZGVwdGgyID09ICcnID8gZGVwdGgyIDogYDxoMz48c3Bhbj4ke2RlcHRoMn08L3NwYW4+PC9oMz5gfVxuXHQ8dWw+JHtsaW5rcy5yZWR1Y2UoKGlwLCBpYykgPT4ge1xuXHRcdFx0bGV0IHt0aXRsZSwgaHJlZiwgY29tcGxldGV9ID0gaWM7XG5cdFx0XHRyZXR1cm4gYCR7aXAgfHwgXCJcIn1cblx0XHQ8bGkke2NvbXBsZXRlID8gJyBjbGFzcz1cImNwXCInIDogXCJcIn0+PGEgaHJlZj1cIiR7aHJlZn1cIj4ke3RpdGxlfTwvYT48L2xpPmB9LCAwKX1cblx0PC91bD5cblx0YFxufSwgMCk7XG5cbi8vIOuplOuJtCDrsoTtirwg7IK97J6FXG53aW5kb3cuZGV2ID0ge1xuXHRhcHBlbmRNZW51QnRuOiBmdW5jdGlvbigpe1xuXHRcdHZhciBtZW51VHJpZ2dlciA9IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1lbnUtdHJpZ2dlclwiPlxuXHQ8c3Bhbj50b2dnbGUgbWVudTwvc3Bhbj5cbjwvYnV0dG9uPmA7XG5cdFxuXHRcdFx0aWYgKCAkKCdidXR0b24ubWVudS10cmlnZ2VyJykubGVuZ3RoIDw9IDApIHtcblx0XHRcdFx0JCgnI21lbnUnKS5wcmVwZW5kKG1lbnVUcmlnZ2VyKTtcblx0XHRcdH1cblx0XG5cdFx0XHQkKCcubWVudS10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgbWVudUxpc3QgPSAkKCcjbWVudS1saXN0JyksXG5cdFx0XHRcdCAgICBjdHJsQ2xhc3MgPSAnaXMtYWN0aXZlJyxcblx0XHRcdFx0ICAgIGNvbmRpdGlvbiA9IG1lbnVMaXN0Lmhhc0NsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0aWYgKGNvbmRpdGlvbikge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5yZW1vdmVDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLmFkZENsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvLyDrqZTribQg66as7Iqk7Yq4IOyCveyehVxuXHQsYXBwZW5kTWVudUxpc3Q6IGZ1bmN0aW9uKCl7XG5cblx0XHRpZiAoICQoJyNtZW51JykubGVuZ3RoIDw9IDAgKSB7XG5cdFx0XHRtZW51TGlzdCA9ICQoJzxkaXYgaWQ9bWVudSAvPicpLmFwcGVuZCggJCgnPGRpdiBpZD1tZW51LWxpc3QgY2xhc3M9b3ZlcnRocm93IC8+JykuYXBwZW5kKCBtZW51TGlzdCApICk7XG5cdFx0XHQkKCcjd3JhcCcpLmxlbmd0aCA8PSAwID8gJCgnYm9keScpLnByZXBlbmQoIG1lbnVMaXN0ICkgOiAkKCcjd3JhcCcpLnByZXBlbmQoIG1lbnVMaXN0ICk7XG5cdFx0fVxuXHRcdCQoJyNtZW51LWxpc3QnKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFIUkVGID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cdFx0XHRpZiAoIGFIUkVGLmluZGV4T2YoJz9kZXYnKSA8PSAtMSApIHtcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdocmVmJywgYUhSRUYgKyAnP2RldicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdCxkaW1tOiBmdW5jdGlvbihtc2cpe1xuXHRcdG1zZyA9IG1zZyB8fCAn64K07Jqp7J20IOyXhuyKteuLiOuLpC4nO1xuXHRcdCQoJ2JvZHknKS5hcHBlbmQoXG5cdFx0XHQkKCc8ZGl2IGNsYXNzPVwiZGltbVwiIC8+JykuYXBwZW5kKFxuXHRcdFx0XHQkKGA8c3Bhbj4ke21zZ308c3Bhbi8+PGJ1dHRvbiBjbGFzcz1cImNsb3NlXCI+W+uLq+q4sF08L3NwYW4+PC9idXR0b24+YClcblx0XHRcdClcblx0XHQpO1xuXHRcdCQoJy5kaW1tJykub24oJ2NsaWNrJywgJy5jbG9zZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZGltbScpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9kZXYuanNcbiAqKi8iLCIvKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTYuMTFcbipcdG5ldHdvcmtTdGF0ZSB7IG51bWJlciB9XG4qIFx0MCA9IE5FVFdPUktfRU1QVFkgLSBhdWRpby92aWRlbyBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkXG4qXHQxID0gTkVUV09SS19JRExFIC0gYXVkaW8vdmlkZW8gaXMgYWN0aXZlIGFuZCBoYXMgc2VsZWN0ZWQgYSByZXNvdXJjZSwgYnV0IGlzIG5vdCB1c2luZyB0aGUgbmV0d29ya1xuKlx0MiA9IE5FVFdPUktfTE9BRElORyAtIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgZGF0YVxuKlx0MyA9IE5FVFdPUktfTk9fU09VUkNFIC0gbm8gYXVkaW8vdmlkZW8gc291cmNlIGZvdW5kXG4qXG4qXHRyZWFzeVN0YXRlIHsgbnVtdmVyIH1cbipcdDAgPSBIQVZFX05PVEhJTkcgLSBubyBpbmZvcm1hdGlvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcdFxuKlx0MSA9IEhBVkVfTUVUQURBVEEgLSBtZXRhZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG4qXHQyID0gSEFWRV9DVVJSRU5UX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpcyBhdmFpbGFibGUsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lL21pbGxpc2Vjb25kXG4qXHQzID0gSEFWRV9GVVRVUkVfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IGFuZCBhdCBsZWFzdCB0aGUgbmV4dCBmcmFtZSBpcyBhdmFpbGFibGVcbipcdDQgPSBIQVZFX0VOT1VHSF9EQVRBIC0gZW5vdWdoIGRhdGEgYXZhaWxhYmxlIHRvIHN0YXJ0IHBsYXlpbmdcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0Ly93cmFwcGVyLCBlbmRlZENhbGxiYWNrXG5cdGlmICggISh0aGlzIGluc3RhbmNlb2YgVmlkZW9QbGF5ZXIpICkgcmV0dXJuIG5ldyBWaWRlb1BsYXllcih3cmFwcGVyLCBlbmRlZENhbGxiYWNrKTtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy53cmFwcGVyKTtcblx0dGhpcy5sb2FkaW5nRWxlbWVudFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvLWxvYWRpbmctaW1hZ2UnKSxcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpWzBdO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJylbMV07XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IChmdW5jdGlvbigpe1xuXHRcdGlmICggb3B0aW9ucy5zdGFydFRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbiApIHJldHVybiAwO1xuXHRcdHZhciBzdGFydFRpbWUgPSBvcHRpb25zLnN0YXJ0VGltZSA/IE51bWJlcihvcHRpb25zLnN0YXJ0VGltZSkgOiAwO1xuXHRcdHJldHVybiBzdGFydFRpbWU7XG5cdH0pKCk7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMubW9iaWxlTmV0d29ya1x0PSBvcHRpb25zLm1vYmlsZU5ldHdvcms7XG5cdHRoaXMuYWxlcnRNb2JpbGVcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tb2JpbGUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2Ygb3B0aW9ucy5lbmRlZENhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblx0dGhpcy5wdXNoVGltZSA9IHR5cGVvZiBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50aW1ldXBkYXRlQ2FsbGJhY2sgOiBmdW5jdGlvbigpe307XG5cblx0dGhpcy5wb3N0ZXJMb2FkZWQoKTtcblx0dGhpcy5fdW5sb2FkKCk7XG5cdHRoaXMuX3NpemUoKTtcblx0dGhpcy5faW5pdCgpO1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdFt0aGF0LnBsYXlCdG4sIHRoYXQucGF1c2VCdG5dLmZvckVhY2goZnVuY3Rpb24oYnRuLCBpbmRleCl7XG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5hZGRLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oKXtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSk7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cblx0XHRpZiAoIHRoYXQubW9iaWxlTmV0d29yayApIHtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29yayA9IGZhbHNlO1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrQ2hlY2soKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhhdC5fcGxheSgpO1xuXHRcdH1cblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9zaXplID0gZnVuY3Rpb24oKSB7XG5cdHZhciB3ID0gTWF0aC5yb3VuZCggdGhpcy53cmFwcGVyLmNsaWVudFdpZHRoICksXG5cdFx0aCA9IDA7XG5cdGggPSAoOSAqIHcpIC8gMTY7XG5cdHRoaXMud3JhcHBlci5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fdW5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRkb2N1bWVudC5ib2R5Lm9udW5sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygncGFnZSBtb3ZlJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubW9iaWxlTmV0d29ya0NoZWNrID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YWxlcnQgPSB0aGF0LmFsZXJ0TW9iaWxlO1xuXHR0aGF0LmFkZEtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5vaycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IG51bGw7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0aWYgKCB0aGF0LnBsYXlGbGFnICkge1xuXHRcdHRoYXQucGxheUZsYWcgPSBmYWxzZTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cblx0XHR2ID0gdGhhdC52aWRlbztcblx0XHQvLyBpZiAoIHRoYXQuY3VyVGltZSApIHYuY3VycmVudFRpbWUgPSB0aGF0LmN1clRpbWU7IFxuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdFx0Ly8gaWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0XHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHQvLyBcdFx0Y29uc29sZS5sb2coJ2FhYWFhYScpO1xuXHRcdC8vIFx0fTtcblx0XHQvLyB9XG5cblx0XHR2Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnb25sb2Fkc3RhcnQnLiB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnbG9hZGVkZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRtZXRhZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnb25sb2FkZWRtZXRhZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXG5cdFx0JCgnYm9keScpLm9uKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uZW5kJyk7XG5cdFx0fSk7XG5cdFx0Ly8gdGhhdC52aWRlby5vbndlYmtpdHRyYW5zaXRpb25lbmQgPSBmdW5jdGlvbigpIHtcblxuXHRcdC8vIH07XG5cblx0XHR0aGF0LnZpZGVvLm9uYW5pbWF0aW9uZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnb253ZWJraXRhbmltYXRpb25lbmQnKTtcblx0XHR9O1xuXG5cdFx0ZG9jdW1lbnQub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICF2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICYmIHYuZW5kZWQgKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGNoYW5nZSA6IHpvb20gaW4nKTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHR0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdH07XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wb3N0ZXIsICdoaWRlJyApO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0XHRjb25zb2xlLmxvZygncGxheScpO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25jYW5wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5wYXVzZUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wbGF5QnRuLCAnaGlkZScgKTtcblx0XHRjb25zb2xlLmxvZygnb25jYW5wbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdFx0Y29uc29sZS5sb2coJ3BsYXlpbmcnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LnBhdXNlQnRuLCAnaGlkZScgKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LnBsYXlCdG4sICdoaWRlJyApO1xuXHRcdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5hZGRLbGFzcyh0aGF0LmJ0bkdyb3VwLCAnaGlkZScpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdFx0aWYgKCB2LmVuZGVkICkge1xuXHRcdFx0aWYgKCB2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICkge1xuXHRcdFx0XHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR2YXIgdiA9IHRoYXQudmlkZW87XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblxuXHRcdFx0XHRpZiAoIHYuZXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMSk7XG5cdFx0XHRcdFx0di5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDIpO1xuXHRcdFx0XHRcdHYud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygzKTtcblx0XHRcdFx0XHRkb2N1bWV0LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4gKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyg0KTtcblx0XHRcdFx0XHRkb2N1bWV0LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICggdi5lbmRlZCApIHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuXHRcdFx0XHRzID0gJycsXG5cdFx0XHRcdG0gPSAnJztcblx0XHRcdHMgPSAoZHVyYXRpb24gJSA2MCkudG9TdHJpbmcoKSxcblx0XHRcdG0gPSAoKGR1cmF0aW9uIC0gcykgLyA2MCkudG9TdHJpbmcoKTtcblx0XHRcdHMgPSBzLmxlbmd0aCA8IDIgPyAwICsgcyA6IHM7XG5cdFx0XHRtID0gbS5sZW5ndGggPCAyID8gMCArIG0gOiBtO1xuXHRcdFx0dGhhdC52aWRlb1RpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHR0aGF0LmVuZFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTsgXG5cdFx0XHQvLyB0aGF0LmFsbG9jYXRlU2l6ZSh2aWRlbyk7XG5cdFx0fVxuXHR9LCA1MDApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uKCBlcnJvclR5cGUgKSB7XG5cdC8vIGlmICggbmV0d29ya1N0YXRlID09ICApXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0cHYgPSAwO1xuXHR2Lm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB2LnBhdXNlZCApIHJldHVybjtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG5cdFx0Ly8gNey0iOuniOuLpCDsi5zqsITssrTtgaxcblx0XHRpZiAocHYgIT0gTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKSAmJiAgTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKSAlIDUgPT0gMCApIHtcblx0XHRcdC8vIO2YhOyerOyLnOqwhOydhCA166GcIOuCmOuIhOyWtCDrgpjrqLjsp4Drpbwg6rWs7ZWY6rOgIOq3uCDrgpjrqLjsp4DqsIAgNeuztOuLpCDsnpHsnLzrqbQg7Jis66a8LCDqsJnqsbDrgpgg7YGs66m0IOuyhOumvFxuXHRcdFx0dGhhdC5wdXNoVGltZSggTWF0aFsgKHYuY3VycmVudFRpbWUgJSA1KSA8IDUgPyAnY2VpbCcgOiAnZmxvb3InIF0odi5jdXJyZW50VGltZSnCoCk7XG5cdFx0XHRwdiA9IE1hdGgucm91bmQodi5jdXJyZW50VGltZSk7XG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC52aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmJ0bkdyb3VwLCAnaGlkZScgKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LnRpbWVsaW5lLCAnaGlkZScgKTtcblx0XHR0aGF0LmFkZEtsYXNzKCB0aGF0LmNvbnRyb2wsICdyZW1vdmUtdGltZScgKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmNvbnRyb2wsICdoaWRlJyApO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHRoYXQucGF1c2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0XHR0aGF0LnBsYXlQYXVzZSgpO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQucGxheUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5wYXVzZUJ0biwgJ2hpZGUnICk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcblx0dGhhdC5iZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdHRoYXQuYWRkS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblxuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHRcdD0gdGhpcyxcblx0XHRidG5Hcm91cCBcdD0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgXHRcdD0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyBcdD0gdGhpcy5oaWdoUmVzLFxuXHRcdHVhIFx0XHRcdD0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxuXHRcdHN0eWxlc1x0XHQ9IHtcblx0XHRcdHNob3c6IFt7ZGlzcGxheTogJ2Jsb2NrJywgb3BhY2l0eTogMX1dLFxuXHRcdFx0aGlkZTogW3tkaXNwbGF5OiAnbm9uZScsIG9wYWNpdHk6IDB9XVxuXHRcdH0sXG5cdFx0Y2hvaWNlID0gKCBlbCApID0+IHtcblx0XHRcdHZhciBzaG93RWwsIGhpZGVFbDtcblx0XHRcdGlmICggZWwgPT0gJ2xvdycgKVxuXHRcdFx0XHRzaG93RWwgPSBsb3dSZXMsIGhpZGVFbCA9IGhpZ2hSZXM7XG5cdFx0XHRlbHNlIGlmICggZWwgPT0gJ2hpZ2gnIClcblx0XHRcdFx0aGlkZUVsID0gbG93UmVzLCBzaG93RWwgPSBoaWdoUmVzO1xuXG5cdFx0XHRmb3IgKCB2YXIgdmkgaW4gbG93UmVzICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyh2aSk7XG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmRpcihsb3dSZXMpO1xuXG5cdFx0XHRzdHlsZXMuc2hvdy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cdFx0XHRcdHNob3dFbC5zdHlsZVtPYmplY3Qua2V5cyhjKVsxXV0gPSBjW09iamVjdC5rZXlzKGMpWzFdXTtcblx0XHRcdH0pO1xuXHRcdFx0c2hvd0VsLnNldEF0dHJpYnV0ZSgnZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHRcdHNob3dFbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNob3dFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuXG5cdFx0XHRzdHlsZXMuaGlkZS5mb3JFYWNoKChjLCBpKSA9PiB7XG5cdFx0XHRcdGhpZGVFbC5zdHlsZVtPYmplY3Qua2V5cyhjKV0gPSBjW09iamVjdC5rZXlzKGMpXTtcblx0XHRcdH0pO1xuXHRcdFx0aGlkZUVsLnNldEF0dHJpYnV0ZSgnZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0XHRcblx0XHRcdHRoYXQudmlkZW8gPSBzaG93RWw7XG5cdFx0fSxcblx0XHRjb25kaXRpb24gPSBidG5Hcm91cC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aXZlJykuY2xhc3NOYW1lLmluZGV4T2YoJ2xvdycpID4gLTEgPyAnbG93JyA6ICdoaWdoJztcbmNvbnNvbGUubG9nKGNvbmRpdGlvbik7XG5cdGNob2ljZSggY29uZGl0aW9uICk7XG5cblx0IC8vIGlmICggdWEuaW5kZXhPZignYW5kcm9pZCA0LjInKSA+IC0xIHx8IHVhLmluZGV4T2YoJ2FuZHJvaWQgNC4zJykgPiAtMSApIHtcblx0IC8vIFx0JCh0aGF0LnZpZGVvKS5hcHBlbmQoJzxzb3VyY2Ugc3JjPVwiXCI+PC9zb3VyY2U+Jyk7XG5cdCAvLyBcdCQodGhhdC52aWRlbykuZmluZCgnc291cmNlJykuYXR0cignc3JjJywgJCh0aGF0LnZpZGVvKS5kYXRhKCdzcmMnKSk7XG5cdCAvLyB9XG5cblx0dGhhdC52aWRlby5sb2FkKCk7XG5cdC8vIHRoYXQudmVyaWZ5aW5nKCB0aGF0LnZpZGVvICk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUudmVyaWZ5aW5nID0gZnVuY3Rpb24gKCB2ICkge1xuXHRjb25zb2xlLmxvZyh2Lm5ldHdvcmtTdGF0ZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0bSwgcztcblxuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jdXJUaW1lID0gdi5jdXJyZW50VGltZTtcblx0bSA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lIC8gNjApICkudG9TdHJpbmcoKTtcblx0cyA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lICUgNjApICkudG9TdHJpbmcoKTtcblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gKG0ubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtKSAgKyAnOicgKyAocy5sZW5ndGggPCAyID8gJzAnICsgcyA6IHMpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHR2aWRlbyA9IHRoYXQudmlkZW87XG5cdHZhciBzLCBtLCBjdCA9IE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUpLCBkdXIgPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKTtcblx0aWYgKCBjdCA8IDYwICkge1xuXHRcdG0gPSAnMDAnO1xuXHRcdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHBhcnNlSW50KCBjdCAlIDYwICksXG5cdFx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdFx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdFx0bSA9IG0udG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG07XG5cdH1cblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdGlmICggc2VlayA9PSAnc2VlaycgKSB7XG5cdFx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHRcdFx0dmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0XHR9KTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xWaXNpYmxpbmcgPSBmdW5jdGlvbihjdHJsKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0dGhhdC5hZGRLbGFzcyggdGhhdC5jb250cm9sLCAnaGlkZScgKTtcblx0fSwgMjAwMCk7XG4gIH0gZWxzZSB7XG5cdGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG5cdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQuY29udHJvbCwgJ2hpZGUnICk7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0aWYodGhhdC5jdXJUaW1lKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1iZycpO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdFx0aW1nVyAtPSAoaW1nVyowLjAyNSk7XG5cdFx0XHRcdFx0aW1nSCAtPSAoaW1nSCowLjAyNSk7XG5cdFx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgMTAwMC82MClcblx0XHR9LCAzMDApO1xuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==