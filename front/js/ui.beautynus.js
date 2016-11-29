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
		this.loadingElement = this.wrapper.querySelector('.video-loading-image'), this.video = null, this.lowRes = $(this.wrapper).find('[data-res=low]').get(0);
		this.highRes = $(this.wrapper).find('[data-res=high]').get(0);
		this.playFlag = true;
		this.curTime = function () {
			if (options.startTime >= options.duration) return 0;
			var startTime = options.startTime ? Number(options.startTime) : 0;
			console.log(startTime);
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
		this.btnGroup = $(this.control).find('.btn-group');
		this.activeBtn = this.btnGroup.find('button.active');
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
	
	VideoPlayer.prototype._init = function () {};
	
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
				console.log('transitionend');
			});
			// that.video.onwebkittransitionend = function() {
	
			// };
	
			that.video.onanimationend = function () {
				console.log('onwebkitanimationend');
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
			if (this.currentTime > 0) that.btnGroup.hide();
			that.controlVisibling(false);
			if (v.ended) {
				console.log('끝남');
				if (v.webkitDisplayingFullscreen) {
					console.log('전체화면');
					that.video.addEventListener('webkitendfullscreen', function () {
						console.log('전체화면 끝남');
						var v = that.video;
						that.endedCallback();
					}, false);
					document.addEventListener('webkitendfullscreen', function () {
						console.log('전체화면 끝남');
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
		console.dir(video);
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
		// if ( readyStateFlag ==  )
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
				$(that.control).hide();
			}, 2000);
		} else {
			clearTimeout(that.controlTimer);
			$(that.control).show();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmRhNGE1MDdjZTI1MzdjYTIwNjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJva0J1dHRvblRleHQiLCJva0J1dHRvbkNsaWNrRnVuYyIsImRvbSIsImNvbmZpcm1MYXllciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImV2ZW50RXhlY3V0ZSIsImJ1dHRvbnMiLCJtYXAiLCJjIiwiaW5kZXgiLCJhcnJheSIsInJlbW92ZUNoaWxkIiwiYWxlcnQiLCJqb2luIiwibG9jYXRpb24iLCJkZXYiLCJhcHBlbmRNZW51TGlzdCIsImFwcGVuZE1lbnVCdG4iLCJpbWFnZXMiLCJzcmMiLCJxc2EiLCJxcyIsInMiLCJkb21BbGwiLCJhdHRyIiwia2V5cyIsInB1dFRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJjaGlsZE5vZGVzIiwiYXBwZW5kIiwibWVudURhdGEiLCJkZXB0aDEiLCJkZXB0aDIiLCJsaW5rcyIsImNvbXBsZXRlIiwibWVudUxpc3QiLCJyZWR1Y2UiLCJwIiwiaXAiLCJpYyIsIm1lbnVUcmlnZ2VyIiwiY3RybENsYXNzIiwiY29uZGl0aW9uIiwiYWRkIiwiYUhSRUYiLCJkaW1tIiwiVmlkZW9QbGF5ZXIiLCJ3cmFwcGVyIiwiZW5kZWRDYWxsYmFjayIsImxvYWRpbmdFbGVtZW50IiwidmlkZW8iLCJsb3dSZXMiLCJoaWdoUmVzIiwicGxheUZsYWciLCJjdXJUaW1lIiwic3RhcnRUaW1lIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwibW9iaWxlTmV0d29yayIsImFsZXJ0TW9iaWxlIiwicGxheVBhdXNlRmxhZyIsIndhcm4iLCJwdXNoVGltZSIsInRpbWV1cGRhdGVDYWxsYmFjayIsInBvc3RlckxvYWRlZCIsIl91bmxvYWQiLCJfc2l6ZSIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJidG4iLCJyZW1vdmVLbGFzcyIsIm1vYmlsZU5ldHdvcmtDaGVjayIsIl9wbGF5IiwidyIsIk1hdGgiLCJyb3VuZCIsImgiLCJzdHlsZSIsImhlaWdodCIsIm9udW5sb2FkIiwiZGlzcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbmN1ZWNoYW5nZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwiZGlyIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwicHYiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwibG9hZCIsInZlcmlmeWluZyIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJkYXRhc2V0IiwiY2FudmFzVGFnIiwiaWQiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiSW1hZ2UiLCJpbWdXIiwiaW1nSCIsInRpbWVvdXQiLCJpbnRlcnZhbCIsImFhIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxI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QU9JLFNBQVAsQ0FBaUIvQyxPQUFqQixDQUEwQmlULE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMmRhNGE1MDdjZTI1MzdjYTIwNjNcbiAqKi8iLCJpbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG5pbXBvcnQgJy4vZGV2JzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcbmltcG9ydCAnLi92aWRlby1wbGF5ZXInO1xuXG5cbnZhciAkID0gd2luZG93LiQ7XG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgICByZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cbiAgICAvL+ycoO2LuCDrqZTshJzrk5xcbiAgICB1dGlsOiB7XG4gICAgICAgIC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4BcbiAgICAgICAgY29tbW9uTm90aGluZzogZnVuY3Rpb24oKSB7fVxuXG4gICAgICAgIC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG4gICAgICAgICxcbiAgICAgICAgdHJpbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgICBjdXRzdHI6IGZ1bmN0aW9uIGN1dFN0cihzdHIsIGxpbWl0KXsgICAgXG4gICAgICAgICAgICB2YXIgc3RyTGVuZ3RoID0gMCxcbiAgICAgICAgICAgICAgICBzdHJUaXRsZSA9IFwiXCIsXG4gICAgICAgICAgICAgICAgc3RyUGllY2UgPSBcIlwiLFxuICAgICAgICAgICAgICAgIGNvZGUsIGNoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSksXG4gICAgICAgICAgICAgICAgY2ggPSBzdHIuc3Vic3RyKGksMSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBzdHJQaWVjZSA9IHN0ci5zdWJzdHIoaSwxKVxuICAgICAgICAgICAgICAgIGNvZGUgPSBwYXJzZUludChjb2RlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoKGNoIDwgXCIwXCIgfHwgY2ggPiBcIjlcIikgJiYgKGNoIDwgXCJBXCIgfHwgY2ggPiBcIlpcIikgJiYgKChjb2RlID4gMjU1KSB8fCAoY29kZSA8IDApKSlcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMzsgLy9VVEYtOCAzYnl0ZSDroZwg6rOE7IKwXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdHJMZW5ndGggPSBzdHJMZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHN0ckxlbmd0aD5saW1pdCkgLy/soJztlZwg6ri47J20IO2ZleyduFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBlbHNlIHN0clRpdGxlID0gc3RyVGl0bGUrc3RyUGllY2U7IC8v7KCc7ZWc6ri47J20IOuztOuLpCDsnpHsnLzrqbQg7J6Q66W4IOusuOyekOulvCDrtpnsl6zspIDri6QuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyVGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRGV2aWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdpbmdlcmJyZWFkKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pb3MpIHJldHVybiAnaW9zJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zKSByZXR1cm4gJ25vLW1vYmlsZSc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgfVxuXG4gICAgLy8g6rO17Ya1IOuplOyEnOuTnFxuICAgICxcbiAgICBjb21tb246IHtcblxuICAgICAgICAvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcbiAgICAgICAgZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuICAgICAgICAgICAgdmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLFxuICAgICAgICAgICAgICAgIGFUYWcgPSBudWxsLFxuICAgICAgICAgICAgICAgIGhyZWYgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhVGFnID0gYWxsQVtpXTtcbiAgICAgICAgICAgICAgICBocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBpZiAodWkudXRpbC50cmltKGhyZWYpID09ICcjJyB8fCBocmVmID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2dnbGVDbGFzcyBjdXN0b21cbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVjbGFzczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuICAgICAgICAsXG4gICAgICAgIHRhYmxlRmFkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3Njb3BlID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mYWRlaW4td3JhcCcpO1xuICAgICAgICAgICAgaWYgKF9zY29wZS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgX3Njb3BlLmZvckVhY2goZnVuY3Rpb24oZWwsIGkpe1xuICAgICAgICAgICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1mYWRlaW4tc2Nyb2xsJykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oIGV2ZW50ICl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IHdpbmRvdy5ldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvZmYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9vbnxcXHNvbi8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgPSAoIGVsLmNsYXNzTmFtZS5sZW5ndGggPCAxICkgPyAnb24nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBlbC5jbGFzc05hbWUuaW5kZXhPZignb24nKSA8PSAtMSApID8gZWwuY2xhc3NOYW1lICsgJyBvbicgOiBlbC5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICQoJy5qcy1mYWRlaW4td3JhcCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIC8vICAgICAkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb2FkaW5nIG1hc2tcbiAgICAgICAgLFxuICAgICAgICBsb2FkaW5nQ29tcGxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2xvYWRpbmctY2lyY3VsYXIuZ2lmJywgZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc05hbWUgPSBcInZpZGVvLWxvYWRpbmctaW1hZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAkKGRvYy5ib2R5KS5zdG9wKCkuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMjAwLCBmdW5jdGlvbigpIHt9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOq3uOujuSDthqDquIBcbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVHcm91cDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGRvYy5xdWVyeVNlbGVjdG9yKGAke2dyb3VwfSAke2VsZW1lbnR9YCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpKTtcbiAgICAgICAgICAgIC8vICAgICAkKCcnKVxuICAgICAgICAgICAgLy8gICAgIHRoaXMucXVlcnlTZWxlY3RvciggZWxlbWVudCApLmNsYXNzTmFtZSA9IHRoaXMucXVlcnlTZWxlY3RvciggZWxlbWVudCApLmNsYXNzTmFtZS5yZXBsYWNlKCAvYWN0aWV2ZXxcXHNhY3RpdmUvLCBcIlwiICk7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgLy8gfSwgZmFsc2UpOyBcbiAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExheWVyIHBvcHVwXG4gICAgICAgICxcbiAgICAgICAgcG9wdXBDbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBvcHVwID0gJCgnLnBvcHVwJyk7XG4gICAgICAgICAgICBpZiAoIHBvcHVwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaT0wLCBsZW5ndGg9cG9wdXAubGVuZ3RoOyBpPGxlbmd0aDsgaSs9MSApIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGope1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuZXEoaikuZmluZCgnLmJ0bi1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcucG9wdXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KShpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmFrZVNlbGVjdDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5zZWxlY3Qtd3JhcC5mYWtlJykuZWFjaChmdW5jdGlvbihpdGVtLCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdCA9ICQodGhpcykuZmluZCgnc2VsZWN0JyksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gJCh0aGlzKS5maW5kKCdsYWJlbCcpO1xuICAgICAgICAgICAgICAgIHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmdldCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0aGF0Lm9wdGlvbnNbdGhhdC5zZWxlY3RlZEluZGV4XS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC50ZXh0KCB0ZXh0ICk7XG4gICAgICAgICAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0YmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gICAgdmFyIGNhcmROZXdzID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuXG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG4gICAgICAgICAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG4gICAgICAgICAgICB0aGlzLnN3aXBlcihvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzd2lwZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWFuYWdlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGJlYXV0eW51cy5jYXJkTmV3cyA9IGNhcmROZXdzO1xuXG4gICAgdmFyIGFjY29yZGlhbiA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oX3Njb3BlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29wZSA9IF9zY29wZTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKGl0ZW0ucG9zaXRpb24oKS50b3ApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgICAvLyBkb20gY29uZmlybSBsYXllclxuICAgIHZhciBjb25maXJtID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VEb20gKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ha2VEb206IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgICAgICB2YXIge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbXNnLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmNcbiAgICAgICAgICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbmZpcm1cIj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInRpdGxlXCI+PHNwYW4+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVzY1wiPlxuICAgICAgICAgICAgICAgICR7bXNnID8gYCR7bXNnfWAgOiBgYH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBjbG9zZVwiPiR7Y2xvc2VCdXR0b25UZXh0ID8gY2xvc2VCdXR0b25UZXh0IDogXCLri6vquLBcIn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBva1wiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsaW5kXCI+64ur6riwPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG4gICAgICAgICAgICAgICAgY29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1sYXllcicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoICBjb25maXJtTGF5ZXIgKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1sYXllcicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jICk7XG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50RXhlY3V0ZTogZnVuY3Rpb24oIG9rQnV0dG9uQ2xpY2tGdW5jICl7XG4gICAgICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLnNjb3BlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnMgPSBbJ29rJywgJ2Nsb3NlJywgJ2J0bi1jbG9zZSddLm1hcCggKGMpID0+IHNjb3BlLnF1ZXJ5U2VsZWN0b3IoYC4ke2N9YCkgKTtcbiAgICAgICAgICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignb2snKSA+IC0xICYmIHR5cGVvZiBva0J1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKCBzY29wZSApO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGJlYXV0eW51cy5jb25maXJtID0gY29uZmlybTtcblxuICAgIHZhciBhbGVydCA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRG9tKCBvcHRpb25zICk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ha2VEb206IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdmFyIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuY1xuICAgICAgICAgICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG4gICAgICAgIDxoMyBjbGFzcz1cInRpdGxlXCI+PHNwYW4+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgICAgPHAgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICAke21zZyA/IGAke21zZ31gIDogYGB9XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+JHtva0J1dHRvblRleHQgPyBva0J1dHRvblRleHQgOiBcIu2ZleyduFwifTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxpbmRcIj7ri6vquLA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+YDtcbiAgICAgICAgICAgIHZhciBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICBjb25maXJtTGF5ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbGVydC1sYXllcicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLmlubmVySFRNTCA9IGRvbTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbmZpcm1MYXllciApO1xuICAgICAgICAgICAgdGhpcy5zY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1sYXllcicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEV4ZWN1dGUoIG9rQnV0dG9uQ2xpY2tGdW5jICk7XG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50RXhlY3V0ZTogZnVuY3Rpb24oIG9rQnV0dG9uQ2xpY2tGdW5jICl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykpO1xuICAgICAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgWydvaycsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApIClcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdvaycpID4gLTEgJiYgdHlwZW9mIG9rQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiZWF1dHludXMuYWxlcnQgPSBhbGVydDtcblxuICAgIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgICAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cbiAgICBjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuICAgIGNvbW1vbi50YWJsZUZhZGUoKTtcblxuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykpO1xuXG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cbiAgICBjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NhbGxiYWNrc1xuICAgIH0pO1xuXG4gICAgLy/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuICAgIGlmIChsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xKSB7XG4gICAgICAgIGRldi5hcHBlbmRNZW51TGlzdCgpO1xuICAgICAgICBkZXYuYXBwZW5kTWVudUJ0bigpO1xuICAgIH1cbn0pO1xuXG4vKlxuICpcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4gKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VzLnNyYyA9IGltZztcblxuICAgIGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCJjb25zdCBbd2luLCBkb2MsIHFzYSwgcXNdID0gW3dpbmRvdywgZG9jdW1lbnQsICdxdWVyeVNlbGVjdG9yQWxsJywgJ3F1ZXJ5U2VsZWN0b3InXTtcblxuY29uc3Rcblx0ZG9tIFx0PSBzID0+IGRvY3VtZW50W3FzXShzKSxcblx0ZG9tQWxsIFx0PSBzID0+IGRvY3VtZW50W3FzYV0ocyksXG5cdG1ha2VEb20gPSAocywgYXR0cikgPT4ge1xuXHRcdHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHMpXG5cdFx0aWYgKCB0eXBlb2YgYXR0ciA9PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhhdHRyKS5sZW5ndGggPiAwIClcblx0XHRcdGZvciAoIGxldCBpIGluIGF0dHIgKVxuXHRcdFx0XHRkb20uc2V0QXR0cmlidXRlKGksIGF0dHJbaV0pO1xuXHRcdHJldHVybiBkb207XG5cdH0sXG5cdHB1dFRleHQgPSBzID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpLFxuXHRwcmVwZW5kID0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0Lmluc2VydEJlZm9yZShpdGVtLCB0YXJnZXQuY2hpbGROb2Rlc1swXSksXG5cdGFwcGVuZCBcdD0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0LmFwcGVuZENoaWxkKGl0ZW0pO1xuXG5jb25zdCBtZW51RGF0YSA9IFtcblx0e1xuXHRcdGRlcHRoMTogXCLqs7XthrVcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yT6riAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL3JlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCtOyaqeydtCDsl4bsnYQg65WMXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL25vLXJlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcImNvbmZpcm0sIGFsZXJ0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29uZmlnL2xvY2F0aW9uU2VydmljZUFncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67iM656c65Oc66mU7J24XCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeygleuztFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuunpOyepeyGjOyLnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlSW5mby9zdG9yZU5ld3MuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67Cx7ZmU7KCQ7ZaJ7IKsKFNhbXBsZSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUV2ZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeuwqeusuO2bhOq4sFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3Zpc2l0b3JzQm9va0RldGFpbC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiBmYWxzZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvc2VydmljZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9tYXRpb24uaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7J2067Kk7Yq4Ju2WieyCrFwiLFxuXHRcdGRlcHRoMjogXCLsp4TtlonspJHsnbgg7J2067Kk7Yq4XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7J2867CYXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDri6jsnbzshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyZhOujjClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsooXro4wg7ZuEIO2ZleyduClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX2ZpbmlzaC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsmIjslb0g7IucIC0g6rCc7J247KCV67O0IOyImOynkSDrsI8g7J207Jqp7JWI64K0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvcmVzZXJ2YXRpb24vYWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7L+g7Y+w67aBXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvdXBvbkJvb2svZGV0YWlsLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67ew7Yuw7Luo7YWQ7LigXCIsXG5cdFx0ZGVwdGgyOiBcIuuqqeuhnVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjsubTrk5zribTsiqTtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4HtkojsoJXrs7RcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RJbmZvL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzoOqwneyEvO2EsFwiLFxuXHRcdGRlcHRoMjogXCLqs7Xsp4Dsgqztla1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqqnroZ0gKyDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9ub3RpY2UvbGlzdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuPhOybgOunkFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqZTsnbhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9oZWxwL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6XCLrp4jsnbTtjpjsnbTsp4BcIiAsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrk7HquIlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvZ3JhZGUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOy/oO2PsFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9jb3Vwb24vaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g67Cp66y47ZuE6riwXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L3Zpc2l0b3JzQm9vay5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq0gOyLrOyDge2SiFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wcm9kdWN0T2ZJbnRlcmVzdC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLqtazrp6TtmITtmalcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrpqzsiqTtirgocG9wdXAg7Y+s7ZWoKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wdXJjaGFzZS9wZXJpb2QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yA7ZmU7ZmU66m0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQke2RlcHRoMSA/IGA8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+YCA6IGBgfVxuXHQke2RlcHRoMiA9PSAnJyA/IGRlcHRoMiA6IGA8aDM+PHNwYW4+JHtkZXB0aDJ9PC9zcGFuPjwvaDM+YH1cblx0PHVsPiR7bGlua3MucmVkdWNlKChpcCwgaWMpID0+IHtcblx0XHRcdGxldCB7dGl0bGUsIGhyZWYsIGNvbXBsZXRlfSA9IGljO1xuXHRcdFx0cmV0dXJuIGAke2lwIHx8IFwiXCJ9XG5cdFx0PGxpJHtjb21wbGV0ZSA/ICcgY2xhc3M9XCJjcFwiJyA6IFwiXCJ9PjxhIGhyZWY9XCIke2hyZWZ9XCI+JHt0aXRsZX08L2E+PC9saT5gfSwgMCl9XG5cdDwvdWw+XG5cdGBcbn0sIDApO1xuXG4vLyDrqZTribQg67KE7Yq8IOyCveyehVxud2luZG93LmRldiA9IHtcblx0YXBwZW5kTWVudUJ0bjogZnVuY3Rpb24oKXtcblx0XHR2YXIgbWVudVRyaWdnZXIgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZW51LXRyaWdnZXJcIj5cblx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG48L2J1dHRvbj5gO1xuXHRcblx0XHRcdGlmICggJCgnYnV0dG9uLm1lbnUtdHJpZ2dlcicpLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0XHR9XG5cdFxuXHRcdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG1lbnVMaXN0ID0gJCgnI21lbnUtbGlzdCcpLFxuXHRcdFx0XHQgICAgY3RybENsYXNzID0gJ2lzLWFjdGl2ZScsXG5cdFx0XHRcdCAgICBjb25kaXRpb24gPSBtZW51TGlzdC5oYXNDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdGlmIChjb25kaXRpb24pIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5hZGRDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IGNsYXNzPW92ZXJ0aHJvdyAvPicpLmFwcGVuZCggbWVudUxpc3QgKSApO1xuXHRcdFx0JCgnI3dyYXAnKS5sZW5ndGggPD0gMCA/ICQoJ2JvZHknKS5wcmVwZW5kKCBtZW51TGlzdCApIDogJCgnI3dyYXAnKS5wcmVwZW5kKCBtZW51TGlzdCApO1xuXHRcdH1cblx0XHQkKCcjbWVudS1saXN0JykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhSFJFRiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0aWYgKCBhSFJFRi5pbmRleE9mKCc/ZGV2JykgPD0gLTEgKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGFIUkVGICsgJz9kZXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHQsZGltbTogZnVuY3Rpb24obXNnKXtcblx0XHRtc2cgPSBtc2cgfHwgJ+uCtOyaqeydtCDsl4bsirXri4jri6QuJztcblx0XHQkKCdib2R5JykuYXBwZW5kKFxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImRpbW1cIiAvPicpLmFwcGVuZChcblx0XHRcdFx0JChgPHNwYW4+JHttc2d9PHNwYW4vPjxidXR0b24gY2xhc3M9XCJjbG9zZVwiPlvri6vquLBdPC9zcGFuPjwvYnV0dG9uPmApXG5cdFx0XHQpXG5cdFx0KTtcblx0XHQkKCcuZGltbScpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmRpbW0nKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZGV2LmpzXG4gKiovIiwiLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qXHRuZXR3b3JrU3RhdGUgeyBudW1iZXIgfVxuKiBcdDAgPSBORVRXT1JLX0VNUFRZIC0gYXVkaW8vdmlkZW8gaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZFxuKlx0MSA9IE5FVFdPUktfSURMRSAtIGF1ZGlvL3ZpZGVvIGlzIGFjdGl2ZSBhbmQgaGFzIHNlbGVjdGVkIGEgcmVzb3VyY2UsIGJ1dCBpcyBub3QgdXNpbmcgdGhlIG5ldHdvcmtcbipcdDIgPSBORVRXT1JLX0xPQURJTkcgLSBicm93c2VyIGlzIGRvd25sb2FkaW5nIGRhdGFcbipcdDMgPSBORVRXT1JLX05PX1NPVVJDRSAtIG5vIGF1ZGlvL3ZpZGVvIHNvdXJjZSBmb3VuZFxuKlxuKlx0cmVhc3lTdGF0ZSB7IG51bXZlciB9XG4qXHQwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XHRcbipcdDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuKlx0MiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuKlx0MyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4qXHQ0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdC8vd3JhcHBlciwgZW5kZWRDYWxsYmFja1xuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIFZpZGVvUGxheWVyKSApIHJldHVybiBuZXcgVmlkZW9QbGF5ZXIod3JhcHBlciwgZW5kZWRDYWxsYmFjayk7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMud3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHRoaXMud3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHRoaXMud3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWhpZ2hdJykuZ2V0KDApO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAoZnVuY3Rpb24oKXtcblx0XHRpZiAoIG9wdGlvbnMuc3RhcnRUaW1lID49IG9wdGlvbnMuZHVyYXRpb24gKSByZXR1cm4gMDtcblx0XHR2YXIgc3RhcnRUaW1lID0gb3B0aW9ucy5zdGFydFRpbWUgPyBOdW1iZXIob3B0aW9ucy5zdGFydFRpbWUpIDogMDtcblx0XHRjb25zb2xlLmxvZyhzdGFydFRpbWUpO1xuXHRcdHJldHVybiBzdGFydFRpbWU7XG5cdH0pKCk7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMubW9iaWxlTmV0d29ya1x0PSBvcHRpb25zLm1vYmlsZU5ldHdvcms7XG5cdHRoaXMuYWxlcnRNb2JpbGVcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tb2JpbGUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2Ygb3B0aW9ucy5lbmRlZENhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblx0dGhpcy5wdXNoVGltZSA9IHR5cGVvZiBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50aW1ldXBkYXRlQ2FsbGJhY2sgOiBmdW5jdGlvbigpe307XG5cblx0dGhpcy5wb3N0ZXJMb2FkZWQoKTtcblx0dGhpcy5fdW5sb2FkKCk7XG5cdHRoaXMuX3NpemUoKTtcblx0dGhpcy5faW5pdCgpO1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdFt0aGF0LnBsYXlCdG4sIHRoYXQucGF1c2VCdG5dLmZvckVhY2goZnVuY3Rpb24oYnRuLCBpbmRleCl7XG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5hZGRLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oKXtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSk7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCB0aGF0Lm1vYmlsZU5ldHdvcmsgKSB7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmsgPSBmYWxzZTtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29ya0NoZWNrKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoYXQuX3BsYXkoKTtcblx0XHR9XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3NpemUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHcgPSBNYXRoLnJvdW5kKCB0aGlzLndyYXBwZXIuY2xpZW50V2lkdGggKSxcblx0XHRoID0gMDtcblx0aCA9ICg5ICogdykgLyAxNjtcblx0dGhpcy53cmFwcGVyLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl91bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmJvZHkub251bmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIG1vdmUnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tb2JpbGVOZXR3b3JrQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRhbGVydCA9IHRoYXQuYWxlcnRNb2JpbGU7XG5cdHRoYXQuYWRkS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0dGhhdC5jb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0YWxlcnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm9rJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gbnVsbDtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHRcdC8vIGlmICggdGhhdC5jdXJUaW1lICkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTsgXG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0XHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHRcdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZygnYWFhYWFhJyk7XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cblx0XHQkKCdib2R5Jykub24oJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ3RyYW5zaXRpb25lbmQnKTtcblx0XHR9KTtcblx0XHQvLyB0aGF0LnZpZGVvLm9ud2Via2l0dHJhbnNpdGlvbmVuZCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8gfTtcblxuXHRcdHRoYXQudmlkZW8ub25hbmltYXRpb25lbmQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvbndlYmtpdGFuaW1hdGlvbmVuZCcpO1xuXHRcdH07XG5cblx0XHRkb2N1bWVudC5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gJiYgdi5lbmRlZCApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gY2hhbmdlIDogem9vbSBpbicpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIDEwMDAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHR0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdH07XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdwbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdFx0Y29uc29sZS5sb2coJ3BsYXlpbmcnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGNvbnNvbGUubG9nKCfrgZ3rgqgnKTtcblx0XHRcdGlmICggdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ+yghOyytO2ZlOuptCcpO1xuXHRcdFx0XHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQg64Gd64KoJyk7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQg64Gd64KoJyk7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygxKTtcblx0XHRcdFx0XHR2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMik7XG5cdFx0XHRcdFx0di53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDMpO1xuXHRcdFx0XHRcdGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbiApe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDQpO1xuXHRcdFx0XHRcdGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCB2LmVuZGVkICkgdGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdGNvbnNvbGUuZGlyKHZpZGVvKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiggZXJyb3JUeXBlICkge1xuXHQvLyBpZiAoIHJlYWR5U3RhdGVGbGFnID09ICApXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0cHYgPSAwO1xuXHR2Lm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB2LnBhdXNlZCApIHJldHVybjtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG5cdFx0Ly8gNey0iOuniOuLpCDsi5zqsITssrTtgaxcblx0XHRpZiAocHYgIT0gTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKSAmJiAgTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKSAlIDUgPT0gMCApIHtcblx0XHRcdC8vIO2YhOyerOyLnOqwhOydhCA166GcIOuCmOuIhOyWtCDrgpjrqLjsp4Drpbwg6rWs7ZWY6rOgIOq3uCDrgpjrqLjsp4DqsIAgNeuztOuLpCDsnpHsnLzrqbQg7Jis66a8LCDqsJnqsbDrgpgg7YGs66m0IOuyhOumvFxuXHRcdFx0dGhhdC5wdXNoVGltZSggTWF0aFsgKHYuY3VycmVudFRpbWUgJSA1KSA8IDUgPyAnY2VpbCcgOiAnZmxvb3InIF0odi5jdXJyZW50VGltZSnCoCk7XG5cdFx0XHRwdiA9IE1hdGgucm91bmQodi5jdXJyZW50VGltZSk7XG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblxuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQoaGlnaFJlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JCh0aGF0Lmxvd1JlcykuYXR0cignc3JjJywgJCh0aGF0Lmxvd1JlcykuZGF0YSgnc3JjJykpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuXHR9IGVsc2Uge1xuXHRcdCQobG93UmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKGhpZ2hSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JCh0aGF0LmhpZ2hSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5oaWdoUmVzKS5kYXRhKCdzcmMnKSk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG5cdHRoYXQudmlkZW8ubG9hZCgpO1xuXHQvLyB0aGF0LnZlcmlmeWluZyggdGhhdC52aWRlbyApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnZlcmlmeWluZyA9IGZ1bmN0aW9uICggdiApIHtcblx0Y29uc29sZS5sb2codi5uZXR3b3JrU3RhdGUpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNoYW5nZUN1cnJlbnRUaW1lID0gZnVuY3Rpb24odWkpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvLFxuXHRcdG0sIHM7XG5cblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY3VyVGltZSA9IHYuY3VycmVudFRpbWU7XG5cdG0gPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAvIDYwKSApLnRvU3RyaW5nKCk7XG5cdHMgPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAlIDYwKSApLnRvU3RyaW5nKCk7XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IChtLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbSkgICsgJzonICsgKHMubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgY2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuXHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdGlmKHRoYXQuY3VyVGltZSkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTtcblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5kYXRhc2V0LmJnO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHRoYXQuY29udHJvbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdFx0aW1nVyAtPSAoaW1nVyowLjAyNSk7XG5cdFx0XHRcdFx0aW1nSCAtPSAoaW1nSCowLjAyNSk7XG5cdFx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgMTAwMC82MClcblx0XHR9LCAzMDApO1xuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==