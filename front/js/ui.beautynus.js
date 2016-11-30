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
			console.log(11);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGY4MWQ3YjI4ZmViZDMxZDFhMDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJib2R5Iiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJmaW5kIiwib24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJlYWNoIiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbmZpcm0iLCJtYWtlRG9tIiwidGl0bGUiLCJjbG9zZUJ1dHRvblRleHQiLCJva0J1dHRvblRleHQiLCJva0J1dHRvbkNsaWNrRnVuYyIsImRvbSIsImNvbmZpcm1MYXllciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImV2ZW50RXhlY3V0ZSIsImJ1dHRvbnMiLCJtYXAiLCJjIiwiaW5kZXgiLCJhcnJheSIsInJlbW92ZUNoaWxkIiwiYWxlcnQiLCJqb2luIiwibG9jYXRpb24iLCJkZXYiLCJhcHBlbmRNZW51TGlzdCIsImFwcGVuZE1lbnVCdG4iLCJpbWFnZXMiLCJzcmMiLCJxc2EiLCJxcyIsInMiLCJkb21BbGwiLCJhdHRyIiwia2V5cyIsInB1dFRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJjaGlsZE5vZGVzIiwiYXBwZW5kIiwibWVudURhdGEiLCJkZXB0aDEiLCJkZXB0aDIiLCJsaW5rcyIsImNvbXBsZXRlIiwibWVudUxpc3QiLCJyZWR1Y2UiLCJwIiwiaXAiLCJpYyIsIm1lbnVUcmlnZ2VyIiwiY3RybENsYXNzIiwiY29uZGl0aW9uIiwiYWRkIiwiYUhSRUYiLCJkaW1tIiwiVmlkZW9QbGF5ZXIiLCJ3cmFwcGVyIiwiZW5kZWRDYWxsYmFjayIsImxvYWRpbmdFbGVtZW50IiwidmlkZW8iLCJsb3dSZXMiLCJoaWdoUmVzIiwicGxheUZsYWciLCJjdXJUaW1lIiwic3RhcnRUaW1lIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwibW9iaWxlTmV0d29yayIsImFsZXJ0TW9iaWxlIiwicGxheVBhdXNlRmxhZyIsIndhcm4iLCJwdXNoVGltZSIsInRpbWV1cGRhdGVDYWxsYmFjayIsInBvc3RlckxvYWRlZCIsIl91bmxvYWQiLCJfc2l6ZSIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJidG4iLCJyZW1vdmVLbGFzcyIsIm1vYmlsZU5ldHdvcmtDaGVjayIsIl9wbGF5IiwidyIsIk1hdGgiLCJyb3VuZCIsImgiLCJzdHlsZSIsImhlaWdodCIsIm9udW5sb2FkIiwiZGlzcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbmN1ZWNoYW5nZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwicHYiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwibG9hZCIsInZlcmlmeWluZyIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJkYXRhc2V0IiwiY2FudmFzVGFnIiwiaWQiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiSW1hZ2UiLCJpbWdXIiwiaW1nSCIsInRpbWVvdXQiLCJpbnRlcnZhbCIsImFhIiwiZ2xvYmFsQWxwaGEiLCJ3aWR0aCIsIm5hdHVyYWxIZWlnaHQi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cyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhmODFkN2IyOGZlYmQzMWQxYTA5XG4gKiovIiwiaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuaW1wb3J0ICcuL2Rldic7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5pbXBvcnQgJy4vdmlkZW8tcGxheWVyJztcblxuXG52YXIgJCA9IHdpbmRvdy4kO1xudmFyIHdpbiA9IHdpbmRvdyxcbiAgICBkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG4gICAgLy/snKDti7gg66mU7ISc65OcXG4gICAgdXRpbDoge1xuICAgICAgICAvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG4gICAgICAgIGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCkge31cblxuICAgICAgICAvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuICAgICAgICAsXG4gICAgICAgIHRyaW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3V0c3RyOiBmdW5jdGlvbiBjdXRTdHIoc3RyLCBsaW1pdCl7ICAgIFxuICAgICAgICAgICAgdmFyIHN0ckxlbmd0aCA9IDAsXG4gICAgICAgICAgICAgICAgc3RyVGl0bGUgPSBcIlwiLFxuICAgICAgICAgICAgICAgIHN0clBpZWNlID0gXCJcIixcbiAgICAgICAgICAgICAgICBjb2RlLCBjaDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpLFxuICAgICAgICAgICAgICAgIGNoID0gc3RyLnN1YnN0cihpLDEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgc3RyUGllY2UgPSBzdHIuc3Vic3RyKGksMSlcbiAgICAgICAgICAgICAgICBjb2RlID0gcGFyc2VJbnQoY29kZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChjaCA8IFwiMFwiIHx8IGNoID4gXCI5XCIpICYmIChjaCA8IFwiQVwiIHx8IGNoID4gXCJaXCIpICYmICgoY29kZSA+IDI1NSkgfHwgKGNvZGUgPCAwKSkpXG4gICAgICAgICAgICAgICAgICAgIHN0ckxlbmd0aCA9IHN0ckxlbmd0aCArIDM7IC8vVVRGLTggM2J5dGUg66GcIOqzhOyCsFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihzdHJMZW5ndGg+bGltaXQpIC8v7KCc7ZWcIOq4uOydtCDtmZXsnbhcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZWxzZSBzdHJUaXRsZSA9IHN0clRpdGxlK3N0clBpZWNlOyAvL+ygnO2VnOq4uOydtCDrs7Tri6Qg7J6R7Jy866m0IOyekOuluCDrrLjsnpDrpbwg67aZ7Jes7KSA64ukLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0clRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBpc0RldmljZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL+uqqOuwlOydvCBVQVxuICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5naW5nZXJicmVhZCkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW9zKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcykgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlU2l6ZTogJ2RldmljZS1zaXplLScgKyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIH1cblxuICAgIC8vIOqzte2GtSDrqZTshJzrk5xcbiAgICAsXG4gICAgY29tbW9uOiB7XG5cbiAgICAgICAgLy8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG4gICAgICAgIGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcbiAgICAgICAgICAgIHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSxcbiAgICAgICAgICAgICAgICBhVGFnID0gbnVsbCxcbiAgICAgICAgICAgICAgICBocmVmID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVRhZyA9IGFsbEFbaV07XG4gICAgICAgICAgICAgICAgaHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgaWYgKHVpLnV0aWwudHJpbShocmVmKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcbiAgICAgICAgLFxuICAgICAgICB0YWJsZUZhZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9zY29wZSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgICAgICAgIGlmIChfc2NvcGUubGVuZ3RoIDw9IDApIHJldHVybjtcbiAgICAgICAgICAgIF9zY29wZS5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpKXtcbiAgICAgICAgICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKCcuanMtZmFkZWluLXNjcm9sbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCBldmVudCApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGV2ZW50LnRhcmdldCB8fCB3aW5kb3cuZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2ZmJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgvb258XFxzb24vLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gKCBlbC5jbGFzc05hbWUubGVuZ3RoIDwgMSApID8gJ29uJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggZWwuY2xhc3NOYW1lLmluZGV4T2YoJ29uJykgPD0gLTEgKSA/IGVsLmNsYXNzTmFtZSArICcgb24nIDogZWwuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAvLyAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9hZGluZyBtYXNrXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2MuYm9keSkuc3RvcCgpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBkb2MucXVlcnlTZWxlY3RvcihgJHtncm91cH0gJHtlbGVtZW50fWApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihlbGVtZW50KSk7XG4gICAgICAgICAgICAvLyAgICAgJCgnJylcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKS5jbGFzc05hbWUucmVwbGFjZSggL2FjdGlldmV8XFxzYWN0aXZlLywgXCJcIiApO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgIC8vIH0sIGZhbHNlKTsgXG4gICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMYXllciBwb3B1cFxuICAgICAgICAsXG4gICAgICAgIHBvcHVwQ2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwb3B1cCA9ICQoJy5wb3B1cCcpO1xuICAgICAgICAgICAgaWYgKCBwb3B1cC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGk9MCwgbGVuZ3RoPXBvcHVwLmxlbmd0aDsgaTxsZW5ndGg7IGkrPTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLmVxKGopLmZpbmQoJy5idG4tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnBvcHVwJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZha2VTZWxlY3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LXdyYXAuZmFrZScpLmVhY2goZnVuY3Rpb24oaXRlbSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICQodGhpcykuZmluZCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhhdC5vcHRpb25zW3RoYXQuc2VsZWN0ZWRJbmRleF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwudGV4dCggdGV4dCApO1xuICAgICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gICAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICAgIHZhciBjYXJkTmV3cyA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcblxuICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICAgIHZhciBhY2NvcmRpYW4gPSB7XG4gICAgICAgIF9zY29wZTogJycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKF9zY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChpdGVtLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gICAgLy8gZG9tIGNvbmZpcm0gbGF5ZXJcbiAgICB2YXIgY29uZmlybSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgdGhpcy5tYWtlRG9tICggb3B0aW9ucyApO1xuICAgICAgICB9LFxuICAgICAgICBtYWtlRG9tOiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jXG4gICAgICAgICAgICAgICAgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgZG9tID0gYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb25maXJtXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImRlc2NcIj5cbiAgICAgICAgICAgICAgICAke21zZyA/IGAke21zZ31gIDogYGB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gY2xvc2VcIj4ke2Nsb3NlQnV0dG9uVGV4dCA/IGNsb3NlQnV0dG9uVGV4dCA6IFwi64ur6riwXCJ9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gb2tcIj4ke29rQnV0dG9uVGV4dCA/IG9rQnV0dG9uVGV4dCA6IFwi7ZmV7J24XCJ9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibGluZFwiPuuLq+q4sDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1MYXllciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbmZpcm0tbGF5ZXInKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5pbm5lckhUTUwgPSBkb207XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCAgY29uZmlybUxheWVyICk7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbGF5ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlKCBva0J1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYyApe1xuICAgICAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5zY29wZSxcbiAgICAgICAgICAgICAgICBidXR0b25zID0gWydvaycsICdjbG9zZScsICdidG4tY2xvc2UnXS5tYXAoIChjKSA9PiBzY29wZS5xdWVyeVNlbGVjdG9yKGAuJHtjfWApICk7XG4gICAgICAgICAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ29rJykgPiAtMSAmJiB0eXBlb2Ygb2tCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBiZWF1dHludXMuY29uZmlybSA9IGNvbmZpcm07XG5cbiAgICB2YXIgYWxlcnQgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHRoaXMubWFrZURvbSggb3B0aW9ucyApO1xuICAgICAgICB9LFxuICAgICAgICBtYWtlRG9tOiBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHZhciB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmNcbiAgICAgICAgICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciBkb20gPSBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29uZmlybVwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgICAgIDxwIGNsYXNzPVwiZGVzY1wiPlxuICAgICAgICAgICAgJHttc2cgPyBgJHttc2d9YCA6IGBgfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIG9rXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiPiR7b2tCdXR0b25UZXh0ID8gb2tCdXR0b25UZXh0IDogXCLtmZXsnbhcIn08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsaW5kXCI+64ur6riwPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PmA7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvYy5xdWVyeVNlbGVjdG9yKCdib2R5JyksXG4gICAgICAgICAgICAgICAgY29uZmlybUxheWVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uZmlybUxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWxlcnQtbGF5ZXInKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5pbm5lckhUTUwgPSBkb207XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCBjb25maXJtTGF5ZXIgKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtbGF5ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFeGVjdXRlKCBva0J1dHRvbkNsaWNrRnVuYyApO1xuICAgICAgICB9LFxuICAgICAgICBldmVudEV4ZWN1dGU6IGZ1bmN0aW9uKCBva0J1dHRvbkNsaWNrRnVuYyApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpKTtcbiAgICAgICAgICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFsnb2snLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5jbGFzc05hbWUuaW5kZXhPZignb2snKSA+IC0xICYmIHR5cGVvZiBva0J1dHRvbkNsaWNrRnVuYyA9PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKCBzY29wZSApO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmVhdXR5bnVzLmFsZXJ0ID0gYWxlcnQ7XG5cbiAgICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgICBjb21tb24gPSB1aS5jb21tb24sXG4gICAgICAgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG4gICAgY29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcbiAgICBjb21tb24udGFibGVGYWRlKCk7XG5cbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoW2lzRGV2aWNlLmNoZWNrKCksIHV0aWwuZGV2aWNlU2l6ZV0uam9pbignICcpKTtcblxuICAgIGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG4gICAgY29tbW9uLmxvYWRpbmdDb21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jYWxsYmFja3NcbiAgICB9KTtcblxuICAgIC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6TtlolcbiAgICBpZiAobG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSkge1xuICAgICAgICBkZXYuYXBwZW5kTWVudUxpc3QoKTtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVCdG4oKTtcbiAgICB9XG59KTtcblxuLypcbiAqXHRJbWFnZSBwcmVsb2FkZXIgKGMpIHlpa2wxMDA0QGdtYWlsLmNvbSwgMjAxNi4xMVxuICovXG53aW5kb3cuaW1hZ2VQcmVsb2FkZXIgPSBmdW5jdGlvbihpbWcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlcy5zcmMgPSBpbWc7XG5cbiAgICBpbWFnZXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIiwiY29uc3QgW3dpbiwgZG9jLCBxc2EsIHFzXSA9IFt3aW5kb3csIGRvY3VtZW50LCAncXVlcnlTZWxlY3RvckFsbCcsICdxdWVyeVNlbGVjdG9yJ107XG5cbmNvbnN0XG5cdGRvbSBcdD0gcyA9PiBkb2N1bWVudFtxc10ocyksXG5cdGRvbUFsbCBcdD0gcyA9PiBkb2N1bWVudFtxc2FdKHMpLFxuXHRtYWtlRG9tID0gKHMsIGF0dHIpID0+IHtcblx0XHR2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChzKVxuXHRcdGlmICggdHlwZW9mIGF0dHIgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMoYXR0cikubGVuZ3RoID4gMCApXG5cdFx0XHRmb3IgKCBsZXQgaSBpbiBhdHRyIClcblx0XHRcdFx0ZG9tLnNldEF0dHJpYnV0ZShpLCBhdHRyW2ldKTtcblx0XHRyZXR1cm4gZG9tO1xuXHR9LFxuXHRwdXRUZXh0ID0gcyA9PiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKSxcblx0cHJlcGVuZCA9IChpdGVtLCB0YXJnZXQpID0+IHRhcmdldC5pbnNlcnRCZWZvcmUoaXRlbSwgdGFyZ2V0LmNoaWxkTm9kZXNbMF0pLFxuXHRhcHBlbmQgXHQ9IChpdGVtLCB0YXJnZXQpID0+IHRhcmdldC5hcHBlbmRDaGlsZChpdGVtKTtcblxuY29uc3QgbWVudURhdGEgPSBbXG5cdHtcblx0XHRkZXB0aDE6IFwi6rO17Ya1XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMk+q4gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgrTsmqnsnbQg7JeG7J2EIOuVjFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbW1vbi9uby1yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCJjb25maXJtLCBhbGVydFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NvbmZpZy9sb2NhdGlvblNlcnZpY2VBZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu4jOuenOuTnOuplOyduFwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXsoJXrs7RcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrp6TsnqXshozsi51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUluZm8vc3RvcmVOZXdzLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuwse2ZlOygkO2WieyCrChTYW1wbGUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVFdmVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLrp6TsnqXrsKnrrLjtm4TquLBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC92aXNpdG9yc0Jvb2tEZXRhaWwuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogZmFsc2Vcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi66mk67KE7Im9XCIsXG5cdFx0ZGVwdGgyOiBcIuydtOyaqeyVveq0gFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyEnOu5hOyKpCDsnbTsmqnslb3qtIAgKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3NlcnZpY2UuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rCc7J247KCV67O0IOyymOumrOuwqey5qCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuychOy5mOq4sOuwmOyEnOu5hOyKpCDsnbTsmqnslb3qtIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuydtOuypO2KuCbtlonsgqxcIixcblx0XHRkZXB0aDI6IFwi7KeE7ZaJ7KSR7J24IOydtOuypO2KuFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIOydvOuwmFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDtl6TrnbzrqZTsnbTtgazsl4Xsh7xcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdIZXJhLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfc2luZ2xlU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g67O17IiY7ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfbXVsdGlTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsmYTro4wpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbENvbXBsZXRlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JiI7JW9IOyLnCAtIOqwnOyduOygleuztCDsiJjsp5Eg67CPIOydtOyaqeyViOuCtFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L3Jlc2VydmF0aW9uL2FncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuy/oO2PsOu2gVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb3Vwb25Cb29rL2RldGFpbC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu3sO2LsOy7qO2FkOy4oFwiLFxuXHRcdGRlcHRoMjogXCLrqqnroZ1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo7Lm065Oc64m07Iqk7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvY2FyZFR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjrj5nsmIHsg4HtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9tb3ZpZVR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKI7KCV67O0XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0SW5mby92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0UmV2aWV3L3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLqs6DqsJ3shLzthLBcIixcblx0XHRkZXB0aDI6IFwi6rO17KeA7IKs7ZWtXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66qp66GdICsg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3Mvbm90aWNlL2xpc3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrj4Tsm4Drp5BcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66mU7J24XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3MvaGVscC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOlwi66eI7J207Y6Y7J207KeAXCIgLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg65Ox6riJXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2dyYWRlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67iM656c65Oc67OEIOunpOyepeyEoO2DnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9zZWxlY3RTdG9yZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDsv6Dtj7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOuwqeusuO2bhOq4sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy92aXNpdG9yc0Jvb2suaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqtIDsi6zsg4HtkohcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHJvZHVjdE9mSW50ZXJlc3QvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi6rWs66ek7ZiE7ZmpXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66as7Iqk7Yq4KHBvcHVwIO2PrO2VqClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHVyY2hhc2UvcGVyaW9kLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7JeU7KCk7Yah7YahXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMgO2ZlO2ZlOuptFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2VuZ2VsVGFsay90YWxrX2lucXVpcnkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9XG5cdFx0XVxuXHR9XG5cbl07XG5cbnZhciBtZW51TGlzdCA9IG1lbnVEYXRhLnJlZHVjZSgocCwgYykgPT4ge1xuXHRsZXQge2RlcHRoMSwgZGVwdGgyLCBsaW5rc30gPSBjO1xuXHRyZXR1cm4gYCR7cCB8fCAnJ31cblx0JHtkZXB0aDEgPyBgPGgyPjxzcGFuPiR7ZGVwdGgxfTwvc3Bhbj48L2gyPmAgOiBgYH1cblx0JHtkZXB0aDIgPT0gJycgPyBkZXB0aDIgOiBgPGgzPjxzcGFuPiR7ZGVwdGgyfTwvc3Bhbj48L2gzPmB9XG5cdDx1bD4ke2xpbmtzLnJlZHVjZSgoaXAsIGljKSA9PiB7XG5cdFx0XHRsZXQge3RpdGxlLCBocmVmLCBjb21wbGV0ZX0gPSBpYztcblx0XHRcdHJldHVybiBgJHtpcCB8fCBcIlwifVxuXHRcdDxsaSR7Y29tcGxldGUgPyAnIGNsYXNzPVwiY3BcIicgOiBcIlwifT48YSBocmVmPVwiJHtocmVmfVwiPiR7dGl0bGV9PC9hPjwvbGk+YH0sIDApfVxuXHQ8L3VsPlxuXHRgXG59LCAwKTtcblxuLy8g66mU64m0IOuyhO2KvCDsgr3snoVcbndpbmRvdy5kZXYgPSB7XG5cdGFwcGVuZE1lbnVCdG46IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1lbnVUcmlnZ2VyID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdDxzcGFuPnRvZ2dsZSBtZW51PC9zcGFuPlxuPC9idXR0b24+YDtcblx0XG5cdFx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCkge1xuXHRcdFx0XHQkKCcjbWVudScpLnByZXBlbmQobWVudVRyaWdnZXIpO1xuXHRcdFx0fVxuXHRcblx0XHRcdCQoJy5tZW51LXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBtZW51TGlzdCA9ICQoJyNtZW51LWxpc3QnKSxcblx0XHRcdFx0ICAgIGN0cmxDbGFzcyA9ICdpcy1hY3RpdmUnLFxuXHRcdFx0XHQgICAgY29uZGl0aW9uID0gbWVudUxpc3QuaGFzQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHRpZiAoY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLnJlbW92ZUNsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8vIOuplOuJtCDrpqzsiqTtirgg7IK97J6FXG5cdCxhcHBlbmRNZW51TGlzdDogZnVuY3Rpb24oKXtcblxuXHRcdGlmICggJCgnI21lbnUnKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdG1lbnVMaXN0ID0gJCgnPGRpdiBpZD1tZW51IC8+JykuYXBwZW5kKCAkKCc8ZGl2IGlkPW1lbnUtbGlzdCBjbGFzcz1vdmVydGhyb3cgLz4nKS5hcHBlbmQoIG1lbnVMaXN0ICkgKTtcblx0XHRcdCQoJyN3cmFwJykubGVuZ3RoIDw9IDAgPyAkKCdib2R5JykucHJlcGVuZCggbWVudUxpc3QgKSA6ICQoJyN3cmFwJykucHJlcGVuZCggbWVudUxpc3QgKTtcblx0XHR9XG5cdFx0JCgnI21lbnUtbGlzdCcpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYUhSRUYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdGlmICggYUhSRUYuaW5kZXhPZignP2RldicpIDw9IC0xICkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBhSFJFRiArICc/ZGV2Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LGRpbW06IGZ1bmN0aW9uKG1zZyl7XG5cdFx0bXNnID0gbXNnIHx8ICfrgrTsmqnsnbQg7JeG7Iq164uI64ukLic7XG5cdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdCQoJzxkaXYgY2xhc3M9XCJkaW1tXCIgLz4nKS5hcHBlbmQoXG5cdFx0XHRcdCQoYDxzcGFuPiR7bXNnfTxzcGFuLz48YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj5b64ur6riwXTwvc3Bhbj48L2J1dHRvbj5gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdFx0JCgnLmRpbW0nKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5kaW1tJykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Rldi5qc1xuICoqLyIsIi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKlx0bmV0d29ya1N0YXRlIHsgbnVtYmVyIH1cbiogXHQwID0gTkVUV09SS19FTVBUWSAtIGF1ZGlvL3ZpZGVvIGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWRcbipcdDEgPSBORVRXT1JLX0lETEUgLSBhdWRpby92aWRlbyBpcyBhY3RpdmUgYW5kIGhhcyBzZWxlY3RlZCBhIHJlc291cmNlLCBidXQgaXMgbm90IHVzaW5nIHRoZSBuZXR3b3JrXG4qXHQyID0gTkVUV09SS19MT0FESU5HIC0gYnJvd3NlciBpcyBkb3dubG9hZGluZyBkYXRhXG4qXHQzID0gTkVUV09SS19OT19TT1VSQ0UgLSBubyBhdWRpby92aWRlbyBzb3VyY2UgZm91bmRcbipcbipcdHJlYXN5U3RhdGUgeyBudW12ZXIgfVxuKlx0MCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVx0XG4qXHQxID0gSEFWRV9NRVRBREFUQSAtIG1ldGFkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbipcdDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcbipcdDMgPSBIQVZFX0ZVVFVSRV9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgYW5kIGF0IGxlYXN0IHRoZSBuZXh0IGZyYW1lIGlzIGF2YWlsYWJsZVxuKlx0NCA9IEhBVkVfRU5PVUdIX0RBVEEgLSBlbm91Z2ggZGF0YSBhdmFpbGFibGUgdG8gc3RhcnQgcGxheWluZ1xuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHQvL3dyYXBwZXIsIGVuZGVkQ2FsbGJhY2tcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBWaWRlb1BsYXllcikgKSByZXR1cm4gbmV3IFZpZGVvUGxheWVyKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spO1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLndyYXBwZXIpO1xuXHR0aGlzLmxvYWRpbmdFbGVtZW50XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbG9hZGluZy1pbWFnZScpLFxuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gJCh0aGlzLndyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh0aGlzLndyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gKGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCBvcHRpb25zLnN0YXJ0VGltZSA+PSBvcHRpb25zLmR1cmF0aW9uICkgcmV0dXJuIDA7XG5cdFx0dmFyIHN0YXJ0VGltZSA9IG9wdGlvbnMuc3RhcnRUaW1lID8gTnVtYmVyKG9wdGlvbnMuc3RhcnRUaW1lKSA6IDA7XG5cdFx0cmV0dXJuIHN0YXJ0VGltZTtcblx0fSkoKTtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5tb2JpbGVOZXR3b3JrXHQ9IG9wdGlvbnMubW9iaWxlTmV0d29yaztcblx0dGhpcy5hbGVydE1vYmlsZVx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1vYmlsZScpO1xuXHR0aGlzLnBsYXlQYXVzZUZsYWcgXHQ9ICdwYXVzZSc7XG5cdHRoaXMuZW5kZWRDYWxsYmFjayA9IHR5cGVvZiBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXHR0aGlzLnB1c2hUaW1lID0gdHlwZW9mIG9wdGlvbnMudGltZXVwZGF0ZUNhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRpbWV1cGRhdGVDYWxsYmFjayA6IGZ1bmN0aW9uKCl7fTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLl91bmxvYWQoKTtcblx0dGhpcy5fc2l6ZSgpO1xuXHR0aGlzLl9pbml0KCk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0W3RoYXQucGxheUJ0biwgdGhhdC5wYXVzZUJ0bl0uZm9yRWFjaChmdW5jdGlvbihidG4sIGluZGV4KXtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0LmFkZEtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9KTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygxMSk7XG5cdFx0aWYgKCB0aGF0Lm1vYmlsZU5ldHdvcmsgKSB7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmsgPSBmYWxzZTtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29ya0NoZWNrKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoYXQuX3BsYXkoKTtcblx0XHR9XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdyA9IE1hdGgucm91bmQoIHRoaXMud3JhcHBlci5jbGllbnRXaWR0aCApLFxuXHRcdGggPSAwO1xuXHRoID0gKDkgKiB3KSAvIDE2O1xuXHR0aGlzLndyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3VubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnQuYm9keS5vbnVubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ3BhZ2UgbW92ZScpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1vYmlsZU5ldHdvcmtDaGVjayA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGFsZXJ0ID0gdGhhdC5hbGVydE1vYmlsZTtcblx0dGhhdC5hZGRLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR0aGF0LmNvbnRyb2wuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRhbGVydC5xdWVyeVNlbGVjdG9yKCdidXR0b24ub2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5fcGxheSgpO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSBudWxsO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdFx0Ly8gaWYgKCB0aGF0LmN1clRpbWUgKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lOyBcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdC8vIGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0di5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZCcsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2Fkc3RhcnQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ29ubG9hZHN0YXJ0Jy4gdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZGRhdGEgPSBmdW5jdGlvbigpe1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ2xvYWRlZGRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpe1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ29ubG9hZGVkbWV0YWRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblxuXHRcdCQoJ2JvZHknKS5vbigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygndHJhbnNpdGlvbmVuZCcpO1xuXHRcdH0pO1xuXHRcdC8vIHRoYXQudmlkZW8ub253ZWJraXR0cmFuc2l0aW9uZW5kID0gZnVuY3Rpb24oKSB7XG5cblx0XHQvLyB9O1xuXG5cdFx0dGhhdC52aWRlby5vbmFuaW1hdGlvbmVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29ud2Via2l0YW5pbWF0aW9uZW5kJyk7XG5cdFx0fTtcblxuXHRcdGRvY3VtZW50Lm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiAmJiB2LmVuZGVkICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBjaGFuZ2UgOiB6b29tIGluJyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgMTAwMDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXG5cdHRoYXQudmlkZW8ub25jdWVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdjdWVjaGFuZ2UnKTtcblx0fTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC52aWRlby5vbnBsYXkgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLmhpZGUoKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdFx0Y29uc29sZS5sb2coJ3BsYXknKTtcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0XHRjb25zb2xlLmxvZygncGxheWluZycpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblxuXHRcdCQodGhhdC5jb250cm9sKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0XHRpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdFx0aWYgKCB2LmVuZGVkICkge1xuXHRcdFx0Y29uc29sZS5sb2coJ+uBneuCqCcpO1xuXHRcdFx0aWYgKCB2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygn7KCE7LK07ZmU66m0Jyk7XG5cdFx0XHRcdHRoYXQudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ+yghOyytO2ZlOuptCDrgZ3rgqgnKTtcblx0XHRcdFx0XHR2YXIgdiA9IHRoYXQudmlkZW87XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ+yghOyytO2ZlOuptCDrgZ3rgqgnKTtcblx0XHRcdFx0XHR2YXIgdiA9IHRoYXQudmlkZW87XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0aWYgKCB2LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDEpO1xuXHRcdFx0XHRcdHYuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggdi53ZWJraXRFeGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygyKTtcblx0XHRcdFx0XHR2LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMyk7XG5cdFx0XHRcdFx0ZG9jdW1ldC5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LndlYmtpdEV4aXRGdWxsc2NyZWVuICl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coNCk7XG5cdFx0XHRcdFx0ZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIHYuZW5kZWQgKSB0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdH1cblxuXHRcdH1cblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRSYXRpbyA9IGZ1bmN0aW9uKHgsIHksIGwpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdGFyZ2V0ID0gMDtcblx0dGFyZ2V0ID0gTWF0aC5yb3VuZCgoeSAqIGwpIC8geCk7XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdmlkZW8gPSAkKHRoYXQud3JhcHBlcikuZmluZCgndmlkZW86dmlzaWJsZScpLmVxKDApLmdldCgwKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiggZXJyb3JUeXBlICkge1xuXHQvLyBpZiAoIHJlYWR5U3RhdGVGbGFnID09ICApXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0cHYgPSAwO1xuXHR2Lm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB2LnBhdXNlZCApIHJldHVybjtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG5cdFx0Ly8gNey0iOuniOuLpCDsi5zqsITssrTtgaxcblx0XHRpZiAocHYgIT0gTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKSAmJiAgTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lKSAlIDUgPT0gMCApIHtcblx0XHRcdC8vIO2YhOyerOyLnOqwhOydhCA166GcIOuCmOuIhOyWtCDrgpjrqLjsp4Drpbwg6rWs7ZWY6rOgIOq3uCDrgpjrqLjsp4DqsIAgNeuztOuLpCDsnpHsnLzrqbQg7Jis66a8LCDqsJnqsbDrgpgg7YGs66m0IOuyhOumvFxuXHRcdFx0dGhhdC5wdXNoVGltZSggTWF0aFsgKHYuY3VycmVudFRpbWUgJSA1KSA8IDUgPyAnY2VpbCcgOiAnZmxvb3InIF0odi5jdXJyZW50VGltZSnCoCk7XG5cdFx0XHRwdiA9IE1hdGgucm91bmQodi5jdXJyZW50VGltZSk7XG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9jbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnZpZGVvKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdCQodGhhdC50aW1lbGluZSkuc2hvdygpO1xuXHQkKHRoYXQuY29udHJvbCkuYWRkQ2xhc3MoJ3JlbW92ZS10aW1lJykuc2hvdygpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuY3VyVGltZSA9IHRoYXQudmlkZW8uY3VycmVudFRpbWU7XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdCQodGhpcykuaGlkZSgpO1xuXHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGF1c2UnO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5kaW1tQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuYmcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuXHQnbW91c2Rvd24gdG91Y2hzdGFydCc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG5cdH0sXG5cdCdtb3VzZXVwIHRvdWNoZW5kIHRvdWNoY2FuY2VsJzogZnVuY3Rpb24oKSB7XG5cdCAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1ha2VTZWVrYmFyID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblxuICAkKHRoYXQud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpKS5zbGlkZXIoe1xuXHRyYW5nZTogJ21pbicsXG5cdC8vIG1heDogZHVyYXRpb24sXG5cdHN0YXJ0OiBmdW5jdGlvbiAoIGV2ZW50LCB1aSApIHtcblx0XHR2LnBhdXNlKCk7XG5cdH0sXG5cdHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0fSxcblx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQoaGlnaFJlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JCh0aGF0Lmxvd1JlcykuYXR0cignc3JjJywgJCh0aGF0Lmxvd1JlcykuZGF0YSgnc3JjJykpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuXHR9IGVsc2Uge1xuXHRcdCQobG93UmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKGhpZ2hSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JCh0aGF0LmhpZ2hSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5oaWdoUmVzKS5kYXRhKCdzcmMnKSk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG5cdHRoYXQudmlkZW8ubG9hZCgpO1xuXHQvLyB0aGF0LnZlcmlmeWluZyggdGhhdC52aWRlbyApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnZlcmlmeWluZyA9IGZ1bmN0aW9uICggdiApIHtcblx0Y29uc29sZS5sb2codi5uZXR3b3JrU3RhdGUpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNoYW5nZUN1cnJlbnRUaW1lID0gZnVuY3Rpb24odWkpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvLFxuXHRcdG0sIHM7XG5cblx0di5jdXJyZW50VGltZSA9IHBhcnNlSW50KHYuZHVyYXRpb24gKiAodWkudmFsdWUgLyAxMDApLCAxMCk7XG5cdHRoYXQuY3VyVGltZSA9IHYuY3VycmVudFRpbWU7XG5cdG0gPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAvIDYwKSApLnRvU3RyaW5nKCk7XG5cdHMgPSAoIE1hdGgucm91bmQodi5jdXJyZW50VGltZSAlIDYwKSApLnRvU3RyaW5nKCk7XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IChtLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbSkgICsgJzonICsgKHMubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCBzZWVrICl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0dmlkZW8gPSB0aGF0LnZpZGVvO1xuXHR2YXIgcywgbSwgY3QgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKSwgZHVyID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbik7XG5cdGlmICggY3QgPCA2MCApIHtcblx0XHRtID0gJzAwJztcblx0XHRzID0gY3QudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgY3QudG9TdHJpbmcoKSA6IGN0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwYXJzZUludCggY3QgJSA2MCApLFxuXHRcdG0gPSBwYXJzZUludCggKGN0IC0gcykgLyA2MCApO1xuXHRcdHMgPSBzLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIHMgOiBzO1xuXHRcdG0gPSBtLnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtO1xuXHR9XG5cdHRoYXQuc3RhcnRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRpZiAoIHNlZWsgPT0gJ3NlZWsnICkge1xuXHRcdCQoJy5zZWVrYmFyJykuc2xpZGVyKHtcblx0XHRcdHZhbHVlOiBwYXJzZUludCggKDEwMCAvIGR1cikgKiBjdCApXG5cdFx0fSk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sVmlzaWJsaW5nID0gZnVuY3Rpb24oY3RybCl7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgY2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcbiAgaWYgKGN0cmwpIHtcblx0dGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQgICQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdH0sIDIwMDApO1xuICB9IGVsc2Uge1xuXHRjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuXHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0IFx0PSB0aGlzLFxuXHRcdHYgXHRcdD0gdGhhdC52aWRlbztcblxuXHRpZiAoIHYucGF1c2VkICkge1xuXHRcdGlmKHRoYXQuY3VyVGltZSkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTtcblx0XHR2LnBsYXkoKTtcblx0fSBlbHNlIHtcblx0XHR2LnBhdXNlKCk7XG5cdH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJnID0gXCJcIixcblx0XHRlbCA9IHRoYXQucG9zdGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWcnKSxcblx0XHRzcmMgPSAnJztcblx0YmcgPSBlbC5kYXRhc2V0LmJnO1xuXG5cdHZhciBjYW52YXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRjYW52YXNUYWcuaWQgPSBcInZpZGVvUG9zdGVyXCI7XG5cdHRoYXQucG9zdGVyLmFwcGVuZENoaWxkKCBjYW52YXNUYWcgKTtcblx0dGhhdC5nZXREdXJhdGlvbigpO1xuXHRpbWFnZVByZWxvYWRlcihiZywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggdGhhdC5sb2FkaW5nRWxlbWVudCApIHtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIgKTtcblx0XHRcdHRoYXQuY29udHJvbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR9XG5cdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb1Bvc3RlcicpLFxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCksXG5cdFx0XHRpbWdXID0gMCxcblx0XHRcdGltZ0ggPSAwLFxuXHRcdFx0dGltZW91dCxcblx0XHRcdGludGVydmFsO1xuXHRcdHZhciBhYSA9IDA7XG5cdFx0aW1nLnNyYyA9IGJnO1xuXHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwO1xuXG5cdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCI7XG5cdFx0XG5cdFx0aW1nVyA9IHRoYXQud3JhcHBlci5jbGllbnRXaWR0aCAqIDEuNTtcblx0XHRpbWdIID0gKCBNYXRoLnJvdW5kKGltZy5uYXR1cmFsSGVpZ2h0KSAqIDkgKSAvIDE2O1xuXHRcdGltZ0ggPSBNYXRoLnJvdW5kKCBpbWdIICkgKiAxLjU7XG5cdFx0Ly8gaW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYgKCAoY29udGV4dC5nbG9iYWxBbHBoYSkudG9GaXhlZCgxKSA8IDEgKSB7XG5cdFx0XHRcdFx0aW1nVyAtPSAoaW1nVyowLjAyNSk7XG5cdFx0XHRcdFx0aW1nSCAtPSAoaW1nSCowLjAyNSk7XG5cdFx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKGltZywgY2FudmFzLndpZHRoLzIgLSBpbWdXLzIsIGNhbnZhcy5oZWlnaHQvMiAtIGltZ0gvMiwgaW1nVywgaW1nSCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgMTAwMC82MClcblx0XHR9LCAzMDApO1xuXHRcdFxuXHR9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5hZGRLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0aWYgKCB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2Yoa2xhc3MpID4gLTEgKSByZXR1cm4gO1xuXHR0YXJnZXQuY2xhc3NOYW1lICs9ICcgJyArIGtsYXNzO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlbW92ZUtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChrbGFzcyk7XG5cdHRhcmdldC5jbGFzc05hbWUgPSB1aS51dGlsLnRyaW0oIHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSggcmVnZXhwLCBcIlwiICkgKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==