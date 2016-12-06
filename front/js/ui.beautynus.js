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
	            var okButtonText = options.okButtonText;
	            var okButtonClickFunc = options.okButtonClickFunc;
	
	            var dom = '<div class="wrapper">\n        <div class="confirm">\n            <h3 class="title"><span>' + title + '</span></h3>\n            <p class="desc">\n                ' + (msg ? '' + msg : '') + '\n            </p>\n            <div class="btn-group">\n                <button type="button" class="btn close">' + (closeButtonText ? closeButtonText : "닫기") + '</button>\n                <button type="button" class="btn ok">' + (okButtonText ? okButtonText : "확인") + '</button>\n            </div>\n            <button type="button" class="btn-close">\n                <span class="blind">닫기</span>\n            </button>\n        </div>\n    </div>';
	            var body = doc.querySelector('body'),
	                confirmLayer = doc.createElement('div');
	            confirmLayer.setAttribute('class', 'confirm-layer');
	            confirmLayer.innerHTML = dom;
	            body.appendChild(confirmLayer);
	            this.scope = document.querySelector('.confirm-layer');
	            this.eventExecute(okButtonClickFunc);
	        },
	        eventExecute: function eventExecute(okButtonClickFunc) {
	            var scope = this.scope,
	                buttons = ['ok', 'close', 'btn-close'].map(function (c) {
	                return scope.querySelector('.' + c);
	            });
	            buttons.forEach(function (element, index, array) {
	                element.addEventListener('click', function () {
	                    if (this.className.indexOf('ok') > -1 && typeof okButtonClickFunc == 'function') {
	                        okButtonClickFunc();
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
		that.control.style.display = "none";
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
			$(that.control).hide();
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
					}, 10000);
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
			$(that.poster).hide();
			$(that.pauseBtn).show();
			$(that.playBtn).hide();
			if (this.currentTime != 0) that.controlVisibling(true);
			that.playPauseFlag = 'play';
			console.log('play');
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
	
			$(that.control).show();
			$(that.pauseBtn).hide();
			$(that.playBtn).show();
			if (this.currentTime > 0) that.btnGroup.style.display = 'none';
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
		$(that.video).on('click', function () {
			that.btnGroup.style.display = 'none';
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
	
			console.dir(lowRes);
			console.log('low : ', highRes);
	
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
				that.control.style.display = 'none';
			}, 2000);
		} else {
			clearTimeout(that.controlTimer);
			that.control.style.display = 'table';
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
				that.control.style.opacity = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2VmZGY4Yjc2Y2RkZDAzYThkM2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJva0J1dHRvblRleHQiLCJva0J1dHRvbkNsaWNrRnVuYyIsImRvbSIsImNvbmZpcm1MYXllciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImV2ZW50RXhlY3V0ZSIsImJ1dHRvbnMiLCJtYXAiLCJjIiwiaW5kZXgiLCJhcnJheSIsInJlbW92ZUNoaWxkIiwiYWxlcnQiLCJqb2luIiwibG9jYXRpb24iLCJkZXYiLCJhcHBlbmRNZW51TGlzdCIsImFwcGVuZE1lbnVCdG4iLCJpbWFnZXMiLCJzcmMiLCJxc2EiLCJxcyIsInMiLCJkb21BbGwiLCJhdHRyIiwia2V5cyIsInB1dFRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJjaGlsZE5vZGVzIiwiYXBwZW5kIiwibWVudURhdGEiLCJkZXB0aDEiLCJkZXB0aDIiLCJsaW5rcyIsImNvbXBsZXRlIiwibWVudUxpc3QiLCJyZWR1Y2UiLCJwIiwiaXAiLCJpYyIsIm1lbnVUcmlnZ2VyIiwiY3RybENsYXNzIiwiY29uZGl0aW9uIiwiYWRkIiwiYUhSRUYiLCJkaW1tIiwiVmlkZW9QbGF5ZXIiLCJ3cmFwcGVyIiwiZW5kZWRDYWxsYmFjayIsImxvYWRpbmdFbGVtZW50IiwidmlkZW8iLCJsb3dSZXMiLCJoaWdoUmVzIiwicGxheUZsYWciLCJjdXJUaW1lIiwic3RhcnRUaW1lIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwibW9iaWxlTmV0d29yayIsImFsZXJ0TW9iaWxlIiwicGxheVBhdXNlRmxhZyIsIndhcm4iLCJwdXNoVGltZSIsInRpbWV1cGRhdGVDYWxsYmFjayIsInBvc3RlckxvYWRlZCIsIl91bmxvYWQiLCJfc2l6ZSIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJidG4iLCJyZW1vdmVLbGFzcyIsIm1vYmlsZU5ldHdvcmtDaGVjayIsIl9wbGF5IiwidyIsIk1hdGgiLCJyb3VuZCIsImgiLCJzdHlsZSIsImhlaWdodCIsIm9udW5sb2FkIiwiZGlzcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbmN1ZWNoYW5nZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwicHYiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwidG9Mb3dlckNhc2UiLCJzdHlsZXMiLCJjaG9pY2UiLCJzaG93RWwiLCJoaWRlRWwiLCJkaXIiLCJsb2FkIiwidmVyaWZ5aW5nIiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImNhbnZhc1RhZyIsImlkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJhYSIsImdsb2JhbEFscGhhIiwid2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwidG9GaXhlZCIsImRyYXdJbWFnZSIsImtsYXNzIiwicmVnZXhwIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUY4QjtBQUs5QixLQUFJQSxJQUFJQyxPQUFPRCxDQUFmLEMsQ0FKZ0I7O0FBS2hCLEtBQUlFLE1BQU1ELE1BQVY7QUFBQSxLQUNJRSxNQUFNQyxRQURWOztBQUdBSCxRQUFPSSxLQUFQLEdBQWUsVUFBU0MsR0FBVCxFQUFjO0FBQ3pCLFlBQU9DLFFBQVFDLEdBQVIsQ0FBWUYsR0FBWixDQUFQO0FBQ0gsRUFGRDs7QUFJQTtBQUNBSixLQUFJTyxFQUFKLEdBQVNSLE9BQU9RLEVBQVAsSUFBYTs7QUFFbEI7QUFDQUMsV0FBTTtBQUNGO0FBQ0FDLHdCQUFlLHlCQUFXLENBQUU7O0FBRTVCOztBQUpFLFdBTUZDLE1BQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2hCLGlCQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLG9CQUFPQSxJQUFJQyxPQUFKLENBQVksWUFBWixFQUEwQixFQUExQixDQUFQO0FBQ0gsVUFUQztBQVVGQyxpQkFBUSxTQUFTQyxNQUFULENBQWdCSCxHQUFoQixFQUFxQkksS0FBckIsRUFBMkI7QUFDL0IsaUJBQUlDLFlBQVksQ0FBaEI7QUFBQSxpQkFDSUMsV0FBVyxFQURmO0FBQUEsaUJBRUlDLFdBQVcsRUFGZjtBQUFBLGlCQUdJQyxJQUhKO0FBQUEsaUJBR1VDLEVBSFY7O0FBS0Esa0JBQUtDLElBQUksQ0FB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WixDQUFzQkcsV0FBdEIsR0FBb0MsVUFBVzFKLE1BQVgsRUFBbUJ3USxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0F4USxTQUFPSSxTQUFQLEdBQW1CcEQsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWM2QyxPQUFPSSxTQUFQLENBQWlCL0MsT0FBakIsQ0FBMEJvVCxNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDdlZmRmOGI3NmNkZGQwM2E4ZDNjXG4gKiovIiwiaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuaW1wb3J0ICcuL2Rldic7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5pbXBvcnQgJy4vdmlkZW8tcGxheWVyJztcblxuXG52YXIgJCA9IHdpbmRvdy4kO1xudmFyIHdpbiA9IHdpbmRvdyxcbiAgICBkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG4gICAgLy/snKDti7gg66mU7ISc65OcXG4gICAgdXRpbDoge1xuICAgICAgICAvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG4gICAgICAgIGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCkge31cblxuICAgICAgICAvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuICAgICAgICAsXG4gICAgICAgIHRyaW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3V0c3RyOiBmdW5jdGlvbiBjdXRTdHIoc3RyLCBsaW1pdCl7ICAgIFxuICAgICAgICAgICAgdmFyIHN0ckxlbmd0aCA9IDAsXG4gICAgICAgICAgICAgICAgc3RyVGl0bGUgPSBcIlwiLFxuICAgICAgICAgICAgICAgIHN0clBpZWNlID0gXCJcIixcbiAgICAgICAgICAgICAgICBjb2RlLCBjaDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpLFxuICAgICAgICAgICAgICAgIGNoID0gc3RyLnN1YnN0cihpLDEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgc3RyUGllY2UgPSBzdHIuc3Vic3RyKGksMSlcbiAgICAgICAgICAgICAgICBjb2RlID0gcGFyc2VJbnQoY29kZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChjaCA8IFwiMFwiIHx8IGNoID4gXCI5XCIpICYmIChjaCA8IFwiQVwiIHx8IGNoID4gXCJaXCIpICYmICgoY29kZSA+IDI1NSkgfHwgKGNvZGUgPCAwKSkpXG4gICAgICAgICAgICAgICAgICAgIHN0ckxlbmd0aCA9IHN0ckxlbmd0aCArIDM7IC8vVVRGLTggM2J5dGUg66GcIOqzhOyCsFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihzdHJMZW5ndGg+bGltaXQpIC8v7KCc7ZWcIOq4uOydtCDtmZXsnbhcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZWxzZSBzdHJUaXRsZSA9IHN0clRpdGxlK3N0clBpZWNlOyAvL+ygnO2VnOq4uOydtCDrs7Tri6Qg7J6R7Jy866m0IOyekOuluCDrrLjsnpDrpbwg67aZ7Jes7KSA64ukLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0clRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBpc0RldmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL+uqqOuwlOydvCBVQVxuICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5naW5nZXJicmVhZCkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW9zKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcykgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIH1cblxuICAgIC8vIOqzte2GtSDrqZTshJzrk5xcbiAgICAsXG4gICAgY29tbW9uOiB7XG5cbiAgICAgICAgLy8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG4gICAgICAgIGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcbiAgICAgICAgICAgIHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSxcbiAgICAgICAgICAgICAgICBhVGFnID0gbnVsbCxcbiAgICAgICAgICAgICAgICBocmVmID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVRhZyA9IGFsbEFbaV07XG4gICAgICAgICAgICAgICAgaHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgaWYgKHVpLnV0aWwudHJpbShocmVmKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcbiAgICAgICAgLFxuICAgICAgICB0YWJsZUZhZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9zY29wZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgICAgICAgIGlmIChfc2NvcGUubGVuZ3RoIDw9IDApIHJldHVybjtcbiAgICAgICAgICAgIF9zY29wZS5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpKXtcbiAgICAgICAgICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKCcuanMtZmFkZWluLXNjcm9sbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGV2ZW50LnRhcmdldCB8fCB3aW5kb3cuZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2ZmJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgvb258XFxzb24vLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gKCBlbC5jbGFzc05hbWUubGVuZ3RoIDwgMSApID8gJ29uJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggZWwuY2xhc3NOYW1lLmluZGV4T2YoJ29uJykgPD0gLTEgKSA/IGVsLmNsYXNzTmFtZSArICcgb24nIDogZWwuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAvLyAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9hZGluZyBtYXNrXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2MuYm9keSkuc3RvcCgpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBkb2MucXVlcnlTZWxlY3RvcihgJHtncm91cH0gJHtlbGVtZW50fWApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihlbGVtZW50KSk7XG4gICAgICAgICAgICAvLyAgICAgJCgnJylcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUucmVwbGFjZSggL2FjdGlldmV8XFxzYWN0aXZlLywgXCJcIiApO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgIC8vIH0sIGZhbHNlKTsgXG4gICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMYXllciBwb3B1cFxuICAgICAgICAsXG4gICAgICAgIHBvcHVwQ2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwb3B1cCA9ICQoJy5wb3B1cCcpO1xuICAgICAgICAgICAgaWYgKCBwb3B1cC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGk9MCwgbGVuZ3RoPXBvcHVwLmxlbmd0aDsgaTxsZW5ndGg7IGkrPTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLmVxKGopLmZpbmQoJy5idG4tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnBvcHVwJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZha2VTZWxlY3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LXdyYXAuZmFrZScpLmVhY2goZnVuY3Rpb24oaXRlbSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICQodGhpcykuZmluZCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhhdC5vcHRpb25zW3RoYXQuc2VsZWN0ZWRJbmRleF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwudGV4dCggdGV4dCApO1xuICAgICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gICAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICAgIHZhciBjYXJkTmV3cyA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcblxuICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICAgIHZhciBhY2NvcmRpYW4gPSB7XG4gICAgICAgIF9zY29wZTogJycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKF9zY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChpdGVtLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gICAgLy8gZG9tIGNvbmZpcm0gbGF5ZXJcbiAgICB2YXIgY29uZmlybSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRG9tICggb3B0aW9ucyApO1xuICAgICAgICB9LFxuICAgICAgICBtYWtlRG9tOiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jXG4gICAgICAgICAgICAgICAgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgZG9tID0gYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImRlc2NcIj5cbiAgICAgICAgICAgICAgICAke21zZyA/IGAke21zZ31gIDogYGB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gY2xvc2VcIj4ke2Nsb3NlQnV0dG9uVGV4dCA/IGNsb3NlQnV0dG9uVGV4dCA6IFwi64ur6riwXCJ9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIj4ke29rQnV0dG9uVGV4dCA/IG9rQnV0dG9uVGV4dCA6IFwi7ZmV7J24XCJ9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibGluZFwiPuuLq+q4sDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1MYXllciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbmZpcm0tbGF5ZXInKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5pbm5lckhUTUwgPSBkb207XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCAgY29uZmlybUxheWVyICk7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbGF5ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlKCBva0J1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYyApe1xuICAgICAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZSxcbiAgICAgICAgICAgICAgICBidXR0b25zID0gWydvaycsICdjbG9zZScsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApICk7XG4gICAgICAgICAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ29rJykgPiAtMSAmJiB0eXBlb2Ygb2tCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBiZWF1dHludXMuY29uZmlybSA9IGNvbmZpcm07XG5cbiAgICB2YXIgYWxlcnQgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHRoaXMubWFrZURvbSggb3B0aW9ucyApO1xuICAgICAgICB9LFxuICAgICAgICBtYWtlRG9tOiBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHZhciB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmNcbiAgICAgICAgICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29uZmlybVwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgICAgIDxwIGNsYXNzPVwiZGVzY1wiPlxuICAgICAgICAgICAgJHttc2cgPyBgJHttc2d9YCA6IGBgfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIG9rXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsaW5kXCI+64ur6riwPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PmA7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG4gICAgICAgICAgICAgICAgY29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWxlcnQtbGF5ZXInKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5pbm5lckhUTUwgPSBkb207XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCBjb25maXJtTGF5ZXIgKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtbGF5ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlKCBva0J1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYyApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpKTtcbiAgICAgICAgICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFsnb2snLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignb2snKSA+IC0xICYmIHR5cGVvZiBva0J1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKCBzY29wZSApO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmVhdXR5bnVzLmFsZXJ0ID0gYWxlcnQ7XG5cbiAgICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb24sXG4gICAgICAgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG4gICAgY29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcbiAgICBjb21tb24udGFibGVGYWRlKCk7XG5cbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpKTtcblxuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG4gICAgY29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jYWxsYmFja3NcbiAgICB9KTtcblxuICAgIC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6TtlolcbiAgICBpZiAobG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSkge1xuICAgICAgICBkZXYuYXBwZW5kTWVudUxpc3QoKTtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVCdG4oKTtcbiAgICB9XG59KTtcblxuLypcbiAqXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuICovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlcy5zcmMgPSBpbWc7XG5cbiAgICBpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiY29uc3QgW3dpbiwgZG9jLCBxc2EsIHFzXSA9IFt3aW5kb3csIGRvY3VtZW50LCAncXVlcnlTZWxlY3RvckFsbCcsICdxdWVyeVNlbGVjdG9yJ107XG5cbmNvbnN0XG5cdGRvbSBcdD0gcyA9PiBkb2N1bWVudFtxc10ocyksXG5cdGRvbUFsbCBcdD0gcyA9PiBkb2N1bWVudFtxc2FdKHMpLFxuXHRtYWtlRG9tID0gKHMsIGF0dHIpID0+IHtcblx0XHR2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChzKVxuXHRcdGlmICggdHlwZW9mIGF0dHIgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMoYXR0cikubGVuZ3RoID4gMCApXG5cdFx0XHRmb3IgKCBsZXQgaSBpbiBhdHRyIClcblx0XHRcdFx0ZG9tLnNldEF0dHJpYnV0ZShpLCBhdHRyW2ldKTtcblx0XHRyZXR1cm4gZG9tO1xuXHR9LFxuXHRwdXRUZXh0ID0gcyA9PiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKSxcblx0cHJlcGVuZCA9IChpdGVtLCB0YXJnZXQpID0+IHRhcmdldC5pbnNlcnRCZWZvcmUoaXRlbSwgdGFyZ2V0LmNoaWxkTm9kZXNbMF0pLFxuXHRhcHBlbmQgXHQ9IChpdGVtLCB0YXJnZXQpID0+IHRhcmdldC5hcHBlbmRDaGlsZChpdGVtKTtcblxuY29uc3QgbWVudURhdGEgPSBbXG5cdHtcblx0XHRkZXB0aDE6IFwi6rO17Ya1XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMk+q4gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgrTsmqnsnbQg7JeG7J2EIOuVjFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9uby1yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJjb25maXJtLCBhbGVydFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbmZpZy9sb2NhdGlvblNlcnZpY2VBZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu4jOuenOuTnOuplOyduFwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXsoJXrs7RcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrp6TsnqXshozsi51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUluZm8vc3RvcmVOZXdzLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuwse2ZlOygkO2WieyCrChTYW1wbGUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVFdmVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXrsKnrrLjtm4TquLBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC92aXNpdG9yc0Jvb2tEZXRhaWwuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogZmFsc2Vcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi66mk67KE7Im9XCIsXG5cdFx0ZGVwdGgyOiBcIuydtOyaqeyVveq0gFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyEnOu5hOyKpCDsnbTsmqnslb3qtIAgKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3NlcnZpY2UuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rCc7J247KCV67O0IOyymOumrOuwqey5qCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuychOy5mOq4sOuwmOyEnOu5hOyKpCDsnbTsmqnslb3qtIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuydtOuypO2KuCbtlonsgqxcIixcblx0XHRkZXB0aDI6IFwi7KeE7ZaJ7KSR7J24IOydtOuypO2KuFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIOydvOuwmFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDtl6TrnbzrqZTsnbTtgazsl4Xsh7xcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdIZXJhLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfc2luZ2xlU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g67O17IiY7ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfbXVsdGlTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsmYTro4wpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbENvbXBsZXRlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JiI7JW9IOyLnCAtIOqwnOyduOygleuztCDsiJjsp5Eg67CPIOydtOyaqeyViOuCtFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L3Jlc2VydmF0aW9uL2FncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuy/oO2PsOu2gVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb3Vwb25Cb29rL2RldGFpbC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu3sO2LsOy7qO2FkOy4oFwiLFxuXHRcdGRlcHRoMjogXCLrqqnroZ1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo7Lm065Oc64m07Iqk7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvY2FyZFR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjrj5nsmIHsg4HtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9tb3ZpZVR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKI7KCV67O0XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0SW5mby92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0UmV2aWV3L3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLqs6DqsJ3shLzthLBcIixcblx0XHRkZXB0aDI6IFwi6rO17KeA7IKs7ZWtXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66qp66GdICsg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3Mvbm90aWNlL2xpc3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrj4Tsm4Drp5BcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66mU7J24XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3MvaGVscC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOlwi66eI7J207Y6Y7J207KeAXCIgLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg65Ox6riJXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2dyYWRlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67iM656c65Oc67OEIOunpOyepeyEoO2DnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9zZWxlY3RTdG9yZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDsv6Dtj7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOuwqeusuO2bhOq4sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy92aXNpdG9yc0Jvb2suaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqtIDsi6zsg4HtkohcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHJvZHVjdE9mSW50ZXJlc3QvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi6rWs66ek7ZiE7ZmpXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66as7Iqk7Yq4KHBvcHVwIO2PrO2VqClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHVyY2hhc2UvcGVyaW9kLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7JeU7KCk7Yah7YahXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMgO2ZlO2ZlOuptFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2VuZ2VsVGFsay90YWxrX2lucXVpcnkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9XG5cdFx0XVxuXHR9XG5cbl07XG5cbnZhciBtZW51TGlzdCA9IG1lbnVEYXRhLnJlZHVjZSgocCwgYykgPT4ge1xuXHRsZXQge2RlcHRoMSwgZGVwdGgyLCBsaW5rc30gPSBjO1xuXHRyZXR1cm4gYCR7cCB8fCAnJ31cblx0JHtkZXB0aDEgPyBgPGgyPjxzcGFuPiR7ZGVwdGgxfTwvc3Bhbj48L2gyPmAgOiBgYH1cblx0JHtkZXB0aDIgPT0gJycgPyBkZXB0aDIgOiBgPGgzPjxzcGFuPiR7ZGVwdGgyfTwvc3Bhbj48L2gzPmB9XG5cdDx1bD4ke2xpbmtzLnJlZHVjZSgoaXAsIGljKSA9PiB7XG5cdFx0XHRsZXQge3RpdGxlLCBocmVmLCBjb21wbGV0ZX0gPSBpYztcblx0XHRcdHJldHVybiBgJHtpcCB8fCBcIlwifVxuXHRcdDxsaSR7Y29tcGxldGUgPyAnIGNsYXNzPVwiY3BcIicgOiBcIlwifT48YSBocmVmPVwiJHtocmVmfVwiPiR7dGl0bGV9PC9hPjwvbGk+YH0sIDApfVxuXHQ8L3VsPlxuXHRgXG59LCAwKTtcblxuLy8g66mU64m0IOuyhO2KvCDsgr3snoVcbndpbmRvdy5kZXYgPSB7XG5cdGFwcGVuZE1lbnVCdG46IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1lbnVUcmlnZ2VyID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdDxzcGFuPnRvZ2dsZSBtZW51PC9zcGFuPlxuPC9idXR0b24+YDtcblx0XG5cdFx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCkge1xuXHRcdFx0XHQkKCcjbWVudScpLnByZXBlbmQobWVudVRyaWdnZXIpO1xuXHRcdFx0fVxuXHRcblx0XHRcdCQoJy5tZW51LXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBtZW51TGlzdCA9ICQoJyNtZW51LWxpc3QnKSxcblx0XHRcdFx0ICAgIGN0cmxDbGFzcyA9ICdpcy1hY3RpdmUnLFxuXHRcdFx0XHQgICAgY29uZGl0aW9uID0gbWVudUxpc3QuaGFzQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHRpZiAoY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLnJlbW92ZUNsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8vIOuplOuJtCDrpqzsiqTtirgg7IK97J6FXG5cdCxhcHBlbmRNZW51TGlzdDogZnVuY3Rpb24oKXtcblxuXHRcdGlmICggJCgnI21lbnUnKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdG1lbnVMaXN0ID0gJCgnPGRpdiBpZD1tZW51IC8+JykuYXBwZW5kKCAkKCc8ZGl2IGlkPW1lbnUtbGlzdCBjbGFzcz1vdmVydGhyb3cgLz4nKS5hcHBlbmQoIG1lbnVMaXN0ICkgKTtcblx0XHRcdCQoJyN3cmFwJykubGVuZ3RoIDw9IDAgPyAkKCdib2R5JykucHJlcGVuZCggbWVudUxpc3QgKSA6ICQoJyN3cmFwJykucHJlcGVuZCggbWVudUxpc3QgKTtcblx0XHR9XG5cdFx0JCgnI21lbnUtbGlzdCcpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYUhSRUYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdGlmICggYUhSRUYuaW5kZXhPZignP2RldicpIDw9IC0xICkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBhSFJFRiArICc/ZGV2Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LGRpbW06IGZ1bmN0aW9uKG1zZyl7XG5cdFx0bXNnID0gbXNnIHx8ICfrgrTsmqnsnbQg7JeG7Iq164uI64ukLic7XG5cdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdCQoJzxkaXYgY2xhc3M9XCJkaW1tXCIgLz4nKS5hcHBlbmQoXG5cdFx0XHRcdCQoYDxzcGFuPiR7bXNnfTxzcGFuLz48YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj5b64ur6riwXTwvc3Bhbj48L2J1dHRvbj5gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdFx0JCgnLmRpbW0nKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5kaW1tJykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Rldi5qc1xuICoqLyIsIi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKlx0bmV0d29ya1N0YXRlIHsgbnVtYmVyIH1cbiogXHQwID0gTkVUV09SS19FTVBUWSAtIGF1ZGlvL3ZpZGVvIGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWRcbipcdDEgPSBORVRXT1JLX0lETEUgLSBhdWRpby92aWRlbyBpcyBhY3RpdmUgYW5kIGhhcyBzZWxlY3RlZCBhIHJlc291cmNlLCBidXQgaXMgbm90IHVzaW5nIHRoZSBuZXR3b3JrXG4qXHQyID0gTkVUV09SS19MT0FESU5HIC0gYnJvd3NlciBpcyBkb3dubG9hZGluZyBkYXRhXG4qXHQzID0gTkVUV09SS19OT19TT1VSQ0UgLSBubyBhdWRpby92aWRlbyBzb3VyY2UgZm91bmRcbipcbipcdHJlYXN5U3RhdGUgeyBudW12ZXIgfVxuKlx0MCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVx0XG4qXHQxID0gSEFWRV9NRVRBREFUQSAtIG1ldGFkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbipcdDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcbipcdDMgPSBIQVZFX0ZVVFVSRV9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgYW5kIGF0IGxlYXN0IHRoZSBuZXh0IGZyYW1lIGlzIGF2YWlsYWJsZVxuKlx0NCA9IEhBVkVfRU5PVUdIX0RBVEEgLSBlbm91Z2ggZGF0YSBhdmFpbGFibGUgdG8gc3RhcnQgcGxheWluZ1xuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHQvL3dyYXBwZXIsIGVuZGVkQ2FsbGJhY2tcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBWaWRlb1BsYXllcikgKSByZXR1cm4gbmV3IFZpZGVvUGxheWVyKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spO1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLndyYXBwZXIpO1xuXHR0aGlzLmxvYWRpbmdFbGVtZW50XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbG9hZGluZy1pbWFnZScpLFxuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJylbMF07XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVsxXTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gKGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCBvcHRpb25zLnN0YXJ0VGltZSA+PSBvcHRpb25zLmR1cmF0aW9uICkgcmV0dXJuIDA7XG5cdFx0dmFyIHN0YXJ0VGltZSA9IG9wdGlvbnMuc3RhcnRUaW1lID8gTnVtYmVyKG9wdGlvbnMuc3RhcnRUaW1lKSA6IDA7XG5cdFx0cmV0dXJuIHN0YXJ0VGltZTtcblx0fSkoKTtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5tb2JpbGVOZXR3b3JrXHQ9IG9wdGlvbnMubW9iaWxlTmV0d29yaztcblx0dGhpcy5hbGVydE1vYmlsZVx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1vYmlsZScpO1xuXHR0aGlzLnBsYXlQYXVzZUZsYWcgXHQ9ICdwYXVzZSc7XG5cdHRoaXMuZW5kZWRDYWxsYmFjayA9IHR5cGVvZiBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXHR0aGlzLnB1c2hUaW1lID0gdHlwZW9mIG9wdGlvbnMudGltZXVwZGF0ZUNhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA6IGZ1bmN0aW9uKCl7fTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLl91bmxvYWQoKTtcblx0dGhpcy5fc2l6ZSgpO1xuXHR0aGlzLl9pbml0KCk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0W3RoYXQucGxheUJ0biwgdGhhdC5wYXVzZUJ0bl0uZm9yRWFjaChmdW5jdGlvbihidG4sIGluZGV4KXtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0LmFkZEtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9KTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuXHRcdGlmICggdGhhdC5tb2JpbGVOZXR3b3JrICkge1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrID0gZmFsc2U7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmtDaGVjaygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3NpemUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHcgPSBNYXRoLnJvdW5kKCB0aGlzLndyYXBwZXIuY2xpZW50V2lkdGggKSxcblx0XHRoID0gMDtcblx0aCA9ICg5ICogdykgLyAxNjtcblx0dGhpcy53cmFwcGVyLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl91bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmJvZHkub251bmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIG1vdmUnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tb2JpbGVOZXR3b3JrQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRhbGVydCA9IHRoYXQuYWxlcnRNb2JpbGU7XG5cdHRoYXQuYWRkS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0dGhhdC5jb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0YWxlcnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm9rJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gbnVsbDtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHRcdC8vIGlmICggdGhhdC5jdXJUaW1lICkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTsgXG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0XHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHRcdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZygnYWFhYWFhJyk7XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cblx0XHQkKCdib2R5Jykub24oJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ3RyYW5zaXRpb25lbmQnKTtcblx0XHR9KTtcblx0XHQvLyB0aGF0LnZpZGVvLm9ud2Via2l0dHJhbnNpdGlvbmVuZCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8gfTtcblxuXHRcdHRoYXQudmlkZW8ub25hbmltYXRpb25lbmQgPSBmdW5jdGlvbigpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbndlYmtpdGFuaW1hdGlvbmVuZCcpO1xuXHRcdH07XG5cblx0XHRkb2N1bWVudC5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gJiYgdi5lbmRlZCApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gY2hhbmdlIDogem9vbSBpbicpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIDEwMDAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHR0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdH07XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdwbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdFx0Y29uc29sZS5sb2coJ3BsYXlpbmcnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHRpZiAoIHYuZW5kZWQgKSB7XG5cdFx0XHRpZiAoIHYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdHRoYXQudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXG5cdFx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygxKTtcblx0XHRcdFx0XHR2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMik7XG5cdFx0XHRcdFx0di53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDMpO1xuXHRcdFx0XHRcdGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbiApe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDQpO1xuXHRcdFx0XHRcdGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCB2LmVuZGVkICkgdGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpOyBcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24oIGVycm9yVHlwZSApIHtcblx0Ly8gaWYgKCBuZXR3b3JrU3RhdGUgPT0gIClcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hbGxvY2F0ZVNpemUgPSBmdW5jdGlvbih2KXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHdyYXBwZXIgPSB0aGF0LndyYXBwZXI7XG5cdHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhhdC5nZXRSYXRpbyh2LnZpZGVvV2lkdGgsIHYudmlkZW9IZWlnaHQsIHYuY2xpZW50V2lkdGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25UaW1lVXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbyxcblx0XHRwdiA9IDA7XG5cdHYub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0XHRpZiAoIHYucGF1c2VkICkgcmV0dXJuO1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcblx0XHQvLyA17LSI66eI64ukIOyLnOqwhOyytO2BrFxuXHRcdGlmIChwdiAhPSBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpICYmICBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUpICUgNSA9PSAwICkge1xuXHRcdFx0Ly8g7ZiE7J6s7Iuc6rCE7J2EIDXroZwg64KY64iE7Ja0IOuCmOuouOyngOulvCDqtaztlZjqs6Ag6re4IOuCmOuouOyngOqwgCA167O064ukIOyekeycvOuptCDsmKzrprwsIOqwmeqxsOuCmCDtgazrqbQg67KE66a8XG5cdFx0XHR0aGF0LnB1c2hUaW1lKCBNYXRoWyAodi5jdXJyZW50VGltZSAlIDUpIDwgNSA/ICdjZWlsJyA6ICdmbG9vcicgXSh2LmN1cnJlbnRUaW1lKcKgKTtcblx0XHRcdHB2ID0gTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKTtcblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblxuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHRcdD0gdGhpcyxcblx0XHRidG5Hcm91cCBcdD0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgXHRcdD0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyBcdD0gdGhpcy5oaWdoUmVzLFxuXHRcdHVhIFx0XHRcdD0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxuXHRcdHN0eWxlc1x0XHQ9IHtcblx0XHRcdHNob3c6IFt7ZGlzcGxheTogJ2Jsb2NrJywgb3BhY2l0eTogMX1dLFxuXHRcdFx0aGlkZTogW3tkaXNwbGF5OiAnbm9uZScsIG9wYWNpdHk6IDB9XVxuXHRcdH0sXG5cdFx0Y2hvaWNlID0gKCBlbCApID0+IHtcblx0XHRcdHZhciBzaG93RWwsIGhpZGVFbDtcblx0XHRcdGlmICggZWwgPT0gJ2xvdycgKVxuXHRcdFx0XHRzaG93RWwgPSBsb3dSZXMsIGhpZGVFbCA9IGhpZ2hSZXM7XG5cdFx0XHRlbHNlIGlmICggZWwgPT0gJ2hpZ2gnIClcblx0XHRcdFx0aGlkZUVsID0gbG93UmVzLCBzaG93RWwgPSBoaWdoUmVzO1xuXG5cdFx0XHRjb25zb2xlLmRpcihsb3dSZXMpO1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvdyA6ICcsIGhpZ2hSZXMpO1xuXG5cdFx0XHRzdHlsZXMuc2hvdy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cdFx0XHRcdHNob3dFbC5zdHlsZVtPYmplY3Qua2V5cyhjKVsxXV0gPSBjW09iamVjdC5rZXlzKGMpWzFdXTtcblx0XHRcdH0pO1xuXHRcdFx0c2hvd0VsLnNldEF0dHJpYnV0ZSgnZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHRcdHNob3dFbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNob3dFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuXG5cdFx0XHRzdHlsZXMuaGlkZS5mb3JFYWNoKChjLCBpKSA9PiB7XG5cdFx0XHRcdGhpZGVFbC5zdHlsZVtPYmplY3Qua2V5cyhjKV0gPSBjW09iamVjdC5rZXlzKGMpXTtcblx0XHRcdH0pO1xuXHRcdFx0aGlkZUVsLnNldEF0dHJpYnV0ZSgnZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0XHRcblx0XHRcdHRoYXQudmlkZW8gPSBzaG93RWw7XG5cdFx0fSxcblx0XHRjb25kaXRpb24gPSBidG5Hcm91cC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYWN0aXZlJykuY2xhc3NOYW1lLmluZGV4T2YoJ2xvdycpID4gLTEgPyAnbG93JyA6ICdoaWdoJztcbmNvbnNvbGUubG9nKGNvbmRpdGlvbik7XG5cdGNob2ljZSggY29uZGl0aW9uICk7XG5cblx0IC8vIGlmICggdWEuaW5kZXhPZignYW5kcm9pZCA0LjInKSA+IC0xIHx8IHVhLmluZGV4T2YoJ2FuZHJvaWQgNC4zJykgPiAtMSApIHtcblx0IC8vIFx0JCh0aGF0LnZpZGVvKS5hcHBlbmQoJzxzb3VyY2Ugc3JjPVwiXCI+PC9zb3VyY2U+Jyk7XG5cdCAvLyBcdCQodGhhdC52aWRlbykuZmluZCgnc291cmNlJykuYXR0cignc3JjJywgJCh0aGF0LnZpZGVvKS5kYXRhKCdzcmMnKSk7XG5cdCAvLyB9XG5cblx0dGhhdC52aWRlby5sb2FkKCk7XG5cdC8vIHRoYXQudmVyaWZ5aW5nKCB0aGF0LnZpZGVvICk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUudmVyaWZ5aW5nID0gZnVuY3Rpb24gKCB2ICkge1xuXHRjb25zb2xlLmxvZyh2Lm5ldHdvcmtTdGF0ZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0bSwgcztcblxuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jdXJUaW1lID0gdi5jdXJyZW50VGltZTtcblx0bSA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lIC8gNjApICkudG9TdHJpbmcoKTtcblx0cyA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lICUgNjApICkudG9TdHJpbmcoKTtcblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gKG0ubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtKSAgKyAnOicgKyAocy5sZW5ndGggPCAyID8gJzAnICsgcyA6IHMpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHR2aWRlbyA9IHRoYXQudmlkZW87XG5cdHZhciBzLCBtLCBjdCA9IE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUpLCBkdXIgPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKTtcblx0aWYgKCBjdCA8IDYwICkge1xuXHRcdG0gPSAnMDAnO1xuXHRcdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHBhcnNlSW50KCBjdCAlIDYwICksXG5cdFx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdFx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdFx0bSA9IG0udG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG07XG5cdH1cblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdGlmICggc2VlayA9PSAnc2VlaycgKSB7XG5cdFx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHRcdFx0dmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0XHR9KTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xWaXNpYmxpbmcgPSBmdW5jdGlvbihjdHJsKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgdGhhdC5jb250cm9sLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuXHR0aGF0LmNvbnRyb2wuc3R5bGUuZGlzcGxheSA9ICd0YWJsZSc7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0aWYodGhhdC5jdXJUaW1lKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1iZycpO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHRoYXQuY29udHJvbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdFx0aW1nVyAtPSAoaW1nVyowLjAyNSk7XG5cdFx0XHRcdFx0aW1nSCAtPSAoaW1nSCowLjAyNSk7XG5cdFx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgMTAwMC82MClcblx0XHR9LCAzMDApO1xuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==