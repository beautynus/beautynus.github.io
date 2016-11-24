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
			var startTime = options.startTime ? Math.round(options.startTime / 1000) : 0;
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
		    v = that.video;
		v.ontimeupdate = function () {
			if (v.paused) return;
			that.getCurrentTime('seek');
			console.log('timeupdate', '111111111');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODg0MTlkZTUyOTNjNDJiNmFjNDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiY3V0c3RyIiwiY3V0U3RyIiwibGltaXQiLCJzdHJMZW5ndGgiLCJzdHJUaXRsZSIsInN0clBpZWNlIiwiY29kZSIsImNoIiwiaSIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSW50IiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCJlYWNoIiwiJHRoaXMiLCJmaW5kIiwib24iLCJlIiwiX3RhcmdldCIsInRhcmdldCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxMZWZ0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRpbmdDb21wbGV0ZSIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlUHJlbG9hZGVyIiwiaW1nIiwiY2xhc3NOYW1lIiwic3RvcCIsImFuaW1hdGUiLCJvcGFjaXR5IiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJwb3B1cENsb3NlIiwicG9wdXAiLCJqIiwiZXEiLCJwYXJlbnRzIiwicmVtb3ZlIiwiZmFrZVNlbGVjdCIsIml0ZW0iLCJ2YWx1ZSIsInNlbGVjdCIsImxhYmVsIiwidGhhdCIsImdldCIsInRleHQiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInRyaWdnZXIiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJjb25maXJtIiwibWFrZURvbSIsInRpdGxlIiwiY2xvc2VCdXR0b25UZXh0Iiwib2tCdXR0b25UZXh0Iiwib2tCdXR0b25DbGlja0Z1bmMiLCJkb20iLCJib2R5IiwicXVlcnlTZWxlY3RvciIsImNvbmZpcm1MYXllciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImV2ZW50RXhlY3V0ZSIsImJ1dHRvbnMiLCJtYXAiLCJjIiwiZm9yRWFjaCIsImluZGV4IiwiYXJyYXkiLCJpbmRleE9mIiwicmVtb3ZlQ2hpbGQiLCJhbGVydCIsImpvaW4iLCJsb2NhdGlvbiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsInNyYyIsInFzYSIsInFzIiwicyIsImRvbUFsbCIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJpcCIsImljIiwibWVudVRyaWdnZXIiLCJjdHJsQ2xhc3MiLCJjb25kaXRpb24iLCJhZGQiLCJhSFJFRiIsImRpbW0iLCJWaWRlb1BsYXllciIsIndyYXBwZXIiLCJlbmRlZENhbGxiYWNrIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJtb2JpbGVOZXR3b3JrIiwiYWxlcnRNb2JpbGUiLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInBvc3RlckxvYWRlZCIsIl91bmxvYWQiLCJfc2l6ZSIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJidG4iLCJyZW1vdmVLbGFzcyIsIm1vYmlsZU5ldHdvcmtDaGVjayIsIl9wbGF5IiwidyIsImgiLCJzdHlsZSIsImhlaWdodCIsIm9udW5sb2FkIiwiZGlzcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbmN1ZWNoYW5nZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwiZGlyIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwib250aW1ldXBkYXRlIiwicGF1c2VkIiwiZ2V0Q3VycmVudFRpbWUiLCJzbGlkZXIiLCJyYW5nZSIsInN0YXJ0IiwiZXZlbnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwibG9hZCIsInZlcmlmeWluZyIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJlbCIsImRhdGFzZXQiLCJjYW52YXNUYWciLCJpZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwidGltZW91dCIsImludGVydmFsIiwiYWEiLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFz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bUIzRCxHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBYzZDLE9BQU9XLFNBQVAsQ0FBaUJ0RCxPQUFqQixDQUEwQitTLE1BQTFCLEVBQWtDLEVBQWxDLENBQWQsQ0FBbkI7QUFDQSxFQUhELEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODg0MTlkZTUyOTNjNDJiNmFjNDBcbiAqKi8iLCJpbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG5pbXBvcnQgJy4vZGV2JzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcbmltcG9ydCAnLi92aWRlby1wbGF5ZXInO1xuXG5cbnZhciAkID0gd2luZG93LiQ7XG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG53aW5kb3cuY3Nsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgICByZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbn07XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cbiAgICAvL+ycoO2LuCDrqZTshJzrk5xcbiAgICB1dGlsOiB7XG4gICAgICAgIC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4BcbiAgICAgICAgY29tbW9uTm90aGluZzogZnVuY3Rpb24oKSB7fVxuXG4gICAgICAgIC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG4gICAgICAgICxcbiAgICAgICAgdHJpbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgICBjdXRzdHI6IGZ1bmN0aW9uIGN1dFN0cihzdHIsIGxpbWl0KXsgICAgXG4gICAgICAgICAgICB2YXIgc3RyTGVuZ3RoID0gMCxcbiAgICAgICAgICAgICAgICBzdHJUaXRsZSA9IFwiXCIsXG4gICAgICAgICAgICAgICAgc3RyUGllY2UgPSBcIlwiLFxuICAgICAgICAgICAgICAgIGNvZGUsIGNoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSksXG4gICAgICAgICAgICAgICAgY2ggPSBzdHIuc3Vic3RyKGksMSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBzdHJQaWVjZSA9IHN0ci5zdWJzdHIoaSwxKVxuICAgICAgICAgICAgICAgIGNvZGUgPSBwYXJzZUludChjb2RlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoKGNoIDwgXCIwXCIgfHwgY2ggPiBcIjlcIikgJiYgKGNoIDwgXCJBXCIgfHwgY2ggPiBcIlpcIikgJiYgKChjb2RlID4gMjU1KSB8fCAoY29kZSA8IDApKSlcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gc3RyTGVuZ3RoICsgMzsgLy9VVEYtOCAzYnl0ZSDroZwg6rOE7IKwXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdHJMZW5ndGggPSBzdHJMZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHN0ckxlbmd0aD5saW1pdCkgLy/soJztlZwg6ri47J20IO2ZleyduFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBlbHNlIHN0clRpdGxlID0gc3RyVGl0bGUrc3RyUGllY2U7IC8v7KCc7ZWc6ri47J20IOuztOuLpCDsnpHsnLzrqbQg7J6Q66W4IOusuOyekOulvCDrtpnsl6zspIDri6QuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyVGl0bGU7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRGV2aWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdpbmdlcmJyZWFkKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pb3MpIHJldHVybiAnaW9zJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zKSByZXR1cm4gJ25vLW1vYmlsZSc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgfVxuXG4gICAgLy8g6rO17Ya1IOuplOyEnOuTnFxuICAgICxcbiAgICBjb21tb246IHtcblxuICAgICAgICAvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcbiAgICAgICAgZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuICAgICAgICAgICAgdmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLFxuICAgICAgICAgICAgICAgIGFUYWcgPSBudWxsLFxuICAgICAgICAgICAgICAgIGhyZWYgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhVGFnID0gYWxsQVtpXTtcbiAgICAgICAgICAgICAgICBocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBpZiAodWkudXRpbC50cmltKGhyZWYpID09ICcjJyB8fCBocmVmID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2dnbGVDbGFzcyBjdXN0b21cbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVjbGFzczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuICAgICAgICAsXG4gICAgICAgIHRhYmxlRmFkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG4gICAgICAgICAgICBpZiAoX3Njb3BlLmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9hZGluZyBtYXNrXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnN0b3AoKS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6re466O5IO2GoOq4gFxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZUdyb3VwOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGF5ZXIgcG9wdXBcbiAgICAgICAgLFxuICAgICAgICBwb3B1cENsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcG9wdXAgPSAkKCcucG9wdXAnKTtcbiAgICAgICAgICAgIGlmICggcG9wdXAubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTAsIGxlbmd0aD1wb3B1cC5sZW5ndGg7IGk8bGVuZ3RoOyBpKz0xICkge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oail7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5lcShqKS5maW5kKCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5wb3B1cCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmYWtlU2VsZWN0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLnNlbGVjdC13cmFwLmZha2UnKS5lYWNoKGZ1bmN0aW9uKGl0ZW0sIHZhbHVlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSAkKHRoaXMpLmZpbmQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZ2V0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRoYXQub3B0aW9uc1t0aGF0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnRleHQoIHRleHQgKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICAgIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgICAgIF9zY29wZTogJycsXG5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcbiAgICAgICAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4BcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgICB2YXIgYWNjb3JkaWFuID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuICAgICAgICBpbml0OiBmdW5jdGlvbihfc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICB9LFxuICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoaXRlbS5wb3NpdGlvbigpLnRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAgIC8vIGRvbSBjb25maXJtIGxheWVyXG4gICAgdmFyIGNvbmZpcm0gPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIHRoaXMubWFrZURvbSAoIG9wdGlvbnMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZURvbTogZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgICAgICAgICAgICAgIHZhciB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBtc2csXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0LFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvbkNsaWNrRnVuY1xuICAgICAgICAgICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlybVwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwidGl0bGVcIj48c3Bhbj4ke3RpdGxlfTwvc3Bhbj48L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICAgICAgJHttc2cgPyBgJHttc2d9YCA6IGBgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGNsb3NlXCI+JHtjbG9zZUJ1dHRvblRleHQgPyBjbG9zZUJ1dHRvblRleHQgOiBcIuuLq+q4sFwifTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIG9rXCI+JHtva0J1dHRvblRleHQgPyBva0J1dHRvblRleHQgOiBcIu2ZleyduFwifTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1jbG9zZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxpbmRcIj7ri6vquLA8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgICAgIHZhciBib2R5ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAgICAgICAgICAgICBjb25maXJtTGF5ZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb25maXJtLWxheWVyJyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuaW5uZXJIVE1MID0gZG9tO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCggIGNvbmZpcm1MYXllciApO1xuICAgICAgICAgICAgdGhpcy5zY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLWxheWVyJyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZSggb2tCdXR0b25DbGlja0Z1bmMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXZlbnRFeGVjdXRlOiBmdW5jdGlvbiggb2tCdXR0b25DbGlja0Z1bmMgKXtcbiAgICAgICAgICAgIHZhciBzY29wZSA9IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICAgICAgYnV0dG9ucyA9IFsnb2snLCAnY2xvc2UnLCAnYnRuLWNsb3NlJ10ubWFwKCAoYykgPT4gc2NvcGUucXVlcnlTZWxlY3RvcihgLiR7Y31gKSApO1xuICAgICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdvaycpID4gLTEgJiYgdHlwZW9mIG9rQnV0dG9uQ2xpY2tGdW5jID09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoIHNjb3BlICk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYmVhdXR5bnVzLmNvbmZpcm0gPSBjb25maXJtO1xuXG4gICAgdmFyIGFsZXJ0ID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VEb20oIG9wdGlvbnMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZURvbTogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICB2YXIge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbXNnLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uQ2xpY2tGdW5jXG4gICAgICAgICAgICAgICAgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgZG9tID0gYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbmZpcm1cIj5cbiAgICAgICAgPGgzIGNsYXNzPVwidGl0bGVcIj48c3Bhbj4ke3RpdGxlfTwvc3Bhbj48L2gzPlxuICAgICAgICA8cCBjbGFzcz1cImRlc2NcIj5cbiAgICAgICAgICAgICR7bXNnID8gYCR7bXNnfWAgOiBgYH1cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBva1wiIHN0eWxlPVwid2lkdGg6IDEwMCVcIj4ke29rQnV0dG9uVGV4dCA/IG9rQnV0dG9uVGV4dCA6IFwi7ZmV7J24XCJ9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1jbG9zZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibGluZFwiPuuLq+q4sDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG48L2Rpdj5gO1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MucXVlcnlTZWxlY3RvcignYm9keScpLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1MYXllciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbmZpcm1MYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FsZXJ0LWxheWVyJyk7XG4gICAgICAgICAgICBjb25maXJtTGF5ZXIuaW5uZXJIVE1MID0gZG9tO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCggY29uZmlybUxheWVyICk7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0LWxheWVyJyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RXhlY3V0ZSggb2tCdXR0b25DbGlja0Z1bmMgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXZlbnRFeGVjdXRlOiBmdW5jdGlvbiggb2tCdXR0b25DbGlja0Z1bmMgKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSk7XG4gICAgICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLnNjb3BlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbJ29rJywgJ2J0bi1jbG9zZSddLm1hcCggKGMpID0+IHNjb3BlLnF1ZXJ5U2VsZWN0b3IoYC4ke2N9YCkgKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoJ29rJykgPiAtMSAmJiB0eXBlb2Ygb2tCdXR0b25DbGlja0Z1bmMgPT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25DbGlja0Z1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCggc2NvcGUgKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJlYXV0eW51cy5hbGVydCA9IGFsZXJ0O1xuXG4gICAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpIHtcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uLFxuICAgICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuICAgIGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG4gICAgY29tbW9uLnRhYmxlRmFkZSgpO1xuXG4gICAgJCgnYm9keScpLmFkZENsYXNzKFtpc0RldmljZS5jaGVjaygpLCB1dGlsLmRldmljZVNpemVdLmpvaW4oJyAnKSk7XG5cbiAgICBiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuICAgIGNvbW1vbi5sb2FkaW5nQ29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY2FsbGJhY2tzXG4gICAgfSk7XG5cbiAgICAvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG4gICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEpIHtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG4gICAgICAgIGRldi5hcHBlbmRNZW51QnRuKCk7XG4gICAgfVxufSk7XG5cbi8qXG4gKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiAqL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oaW1nLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZXMuc3JjID0gaW1nO1xuXG4gICAgaW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhpbWFnZXMpO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IFt3aW4sIGRvYywgcXNhLCBxc10gPSBbd2luZG93LCBkb2N1bWVudCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnLCAncXVlcnlTZWxlY3RvciddO1xuXG5jb25zdFxuXHRkb20gXHQ9IHMgPT4gZG9jdW1lbnRbcXNdKHMpLFxuXHRkb21BbGwgXHQ9IHMgPT4gZG9jdW1lbnRbcXNhXShzKSxcblx0bWFrZURvbSA9IChzLCBhdHRyKSA9PiB7XG5cdFx0dmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocylcblx0XHRpZiAoIHR5cGVvZiBhdHRyID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA+IDAgKVxuXHRcdFx0Zm9yICggbGV0IGkgaW4gYXR0ciApXG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoaSwgYXR0cltpXSk7XG5cdFx0cmV0dXJuIGRvbTtcblx0fSxcblx0cHV0VGV4dCA9IHMgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyksXG5cdHByZXBlbmQgPSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRhcmdldC5jaGlsZE5vZGVzWzBdKSxcblx0YXBwZW5kIFx0PSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzte2GtVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64K07Jqp7J20IOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vbm8tcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwiY29uZmlybSwgYWxlcnRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb25maWcvbG9jYXRpb25TZXJ2aWNlQWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLruIzrnpzrk5zrqZTsnbhcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l7KCV67O0XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66ek7J6l7IaM7IudXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVJbmZvL3N0b3JlTmV3cy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrsLHtmZTsoJDtlonsgqwoU2FtcGxlKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlRXZlbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l67Cp66y47ZuE6riwXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvdmlzaXRvcnNCb29rRGV0YWlsLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuppOuyhOyJvVwiLFxuXHRcdGRlcHRoMjogXCLsnbTsmqnslb3qtIBcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLshJzruYTsiqQg7J207Jqp7JW96rSAICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9zZXJ2aWNlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuqwnOyduOygleuztCDsspjrpqzrsKnsuaggKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3BlcnNvbmFsSW5mb21hdGlvbi5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsnITsuZjquLDrsJjshJzruYTsiqQg7J207Jqp7JW96rSAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L2xvY2F0aW9uQmFzZWQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsnbTrsqTtirgm7ZaJ7IKsXCIsXG5cdFx0ZGVwdGgyOiBcIuynhO2WieykkeyduCDsnbTrsqTtirhcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDsnbzrsJhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7Zek652866mU7J207YGs7JeF7Ie8XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3SGVyYS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuLqOydvOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX3NpbmdsZVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnO2VmOq4sCAtIOuzteyImOyEoO2DnSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX211bHRpU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7JmE66OMKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxDb21wbGV0ZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyiheujjCDtm4Qg7ZmV7J24KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfZmluaXNoLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyYiOyVvSDsi5wgLSDqsJzsnbjsoJXrs7Qg7IiY7KeRIOuwjyDsnbTsmqnslYjrgrRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9yZXNlcnZhdGlvbi9hZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsv6Dtj7DrtoFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY291cG9uQm9vay9kZXRhaWwuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrt7Dti7Dsu6jthZDsuKBcIixcblx0XHRkZXB0aDI6IFwi66qp66GdXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L2NhcmRUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo64+Z7JiB7IOB7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvbW92aWVUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiOygleuztFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdEluZm8vdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdFJldmlldy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi6rOg6rCd7IS87YSwXCIsXG5cdFx0ZGVwdGgyOiBcIuqzteyngOyCrO2VrVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuqqeuhnSArIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL25vdGljZS9saXN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi64+E7JuA66eQXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuplOyduFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL2hlbHAvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTpcIuuniOydtO2OmOydtOyngFwiICxcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOuTseq4iVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9ncmFkZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuu4jOuenOuTnOuzhCDrp6TsnqXshKDtg51cIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2Uvc2VsZWN0U3RvcmUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg7L+g7Y+wXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2NvdXBvbi9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7AgLSDrsKnrrLjtm4TquLBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvdmlzaXRvcnNCb29rLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrpqzrt7AgLSDsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvbXlSZXZpZXcvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rSA7Ius7IOB7ZKIXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3Byb2R1Y3RPZkludGVyZXN0L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwiXCIsXG5cdFx0ZGVwdGgyOiBcIuq1rOunpO2YhO2ZqVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuumrOyKpO2KuChwb3B1cCDtj6ztlagpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3B1cmNoYXNlL3BlcmlvZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyXlOygpO2Goe2GoVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjIDtmZTtmZTrqbRcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9lbmdlbFRhbGsvdGFsa19pbnF1aXJ5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fVxuXHRcdF1cblx0fVxuXG5dO1xuXG52YXIgbWVudUxpc3QgPSBtZW51RGF0YS5yZWR1Y2UoKHAsIGMpID0+IHtcblx0bGV0IHtkZXB0aDEsIGRlcHRoMiwgbGlua3N9ID0gYztcblx0cmV0dXJuIGAke3AgfHwgJyd9XG5cdCR7ZGVwdGgxID8gYDxoMj48c3Bhbj4ke2RlcHRoMX08L3NwYW4+PC9oMj5gIDogYGB9XG5cdCR7ZGVwdGgyID09ICcnID8gZGVwdGgyIDogYDxoMz48c3Bhbj4ke2RlcHRoMn08L3NwYW4+PC9oMz5gfVxuXHQ8dWw+JHtsaW5rcy5yZWR1Y2UoKGlwLCBpYykgPT4ge1xuXHRcdFx0bGV0IHt0aXRsZSwgaHJlZiwgY29tcGxldGV9ID0gaWM7XG5cdFx0XHRyZXR1cm4gYCR7aXAgfHwgXCJcIn1cblx0XHQ8bGkke2NvbXBsZXRlID8gJyBjbGFzcz1cImNwXCInIDogXCJcIn0+PGEgaHJlZj1cIiR7aHJlZn1cIj4ke3RpdGxlfTwvYT48L2xpPmB9LCAwKX1cblx0PC91bD5cblx0YFxufSwgMCk7XG5cbi8vIOuplOuJtCDrsoTtirwg7IK97J6FXG53aW5kb3cuZGV2ID0ge1xuXHRhcHBlbmRNZW51QnRuOiBmdW5jdGlvbigpe1xuXHRcdHZhciBtZW51VHJpZ2dlciA9IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1lbnUtdHJpZ2dlclwiPlxuXHQ8c3Bhbj50b2dnbGUgbWVudTwvc3Bhbj5cbjwvYnV0dG9uPmA7XG5cdFxuXHRcdFx0aWYgKCAkKCdidXR0b24ubWVudS10cmlnZ2VyJykubGVuZ3RoIDw9IDApIHtcblx0XHRcdFx0JCgnI21lbnUnKS5wcmVwZW5kKG1lbnVUcmlnZ2VyKTtcblx0XHRcdH1cblx0XG5cdFx0XHQkKCcubWVudS10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgbWVudUxpc3QgPSAkKCcjbWVudS1saXN0JyksXG5cdFx0XHRcdCAgICBjdHJsQ2xhc3MgPSAnaXMtYWN0aXZlJyxcblx0XHRcdFx0ICAgIGNvbmRpdGlvbiA9IG1lbnVMaXN0Lmhhc0NsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0aWYgKGNvbmRpdGlvbikge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5yZW1vdmVDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLmFkZENsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvLyDrqZTribQg66as7Iqk7Yq4IOyCveyehVxuXHQsYXBwZW5kTWVudUxpc3Q6IGZ1bmN0aW9uKCl7XG5cblx0XHRpZiAoICQoJyNtZW51JykubGVuZ3RoIDw9IDAgKSB7XG5cdFx0XHRtZW51TGlzdCA9ICQoJzxkaXYgaWQ9bWVudSAvPicpLmFwcGVuZCggJCgnPGRpdiBpZD1tZW51LWxpc3QgY2xhc3M9b3ZlcnRocm93IC8+JykuYXBwZW5kKCBtZW51TGlzdCApICk7XG5cdFx0XHQkKCcjd3JhcCcpLmxlbmd0aCA8PSAwID8gJCgnYm9keScpLnByZXBlbmQoIG1lbnVMaXN0ICkgOiAkKCcjd3JhcCcpLnByZXBlbmQoIG1lbnVMaXN0ICk7XG5cdFx0fVxuXHRcdCQoJyNtZW51LWxpc3QnKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFIUkVGID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cdFx0XHRpZiAoIGFIUkVGLmluZGV4T2YoJz9kZXYnKSA8PSAtMSApIHtcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdocmVmJywgYUhSRUYgKyAnP2RldicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdCxkaW1tOiBmdW5jdGlvbihtc2cpe1xuXHRcdG1zZyA9IG1zZyB8fCAn64K07Jqp7J20IOyXhuyKteuLiOuLpC4nO1xuXHRcdCQoJ2JvZHknKS5hcHBlbmQoXG5cdFx0XHQkKCc8ZGl2IGNsYXNzPVwiZGltbVwiIC8+JykuYXBwZW5kKFxuXHRcdFx0XHQkKGA8c3Bhbj4ke21zZ308c3Bhbi8+PGJ1dHRvbiBjbGFzcz1cImNsb3NlXCI+W+uLq+q4sF08L3NwYW4+PC9idXR0b24+YClcblx0XHRcdClcblx0XHQpO1xuXHRcdCQoJy5kaW1tJykub24oJ2NsaWNrJywgJy5jbG9zZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZGltbScpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9kZXYuanNcbiAqKi8iLCIvKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTYuMTFcbipcdG5ldHdvcmtTdGF0ZSB7IG51bWJlciB9XG4qIFx0MCA9IE5FVFdPUktfRU1QVFkgLSBhdWRpby92aWRlbyBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkXG4qXHQxID0gTkVUV09SS19JRExFIC0gYXVkaW8vdmlkZW8gaXMgYWN0aXZlIGFuZCBoYXMgc2VsZWN0ZWQgYSByZXNvdXJjZSwgYnV0IGlzIG5vdCB1c2luZyB0aGUgbmV0d29ya1xuKlx0MiA9IE5FVFdPUktfTE9BRElORyAtIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgZGF0YVxuKlx0MyA9IE5FVFdPUktfTk9fU09VUkNFIC0gbm8gYXVkaW8vdmlkZW8gc291cmNlIGZvdW5kXG4qXG4qXHRyZWFzeVN0YXRlIHsgbnVtdmVyIH1cbipcdDAgPSBIQVZFX05PVEhJTkcgLSBubyBpbmZvcm1hdGlvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcdFxuKlx0MSA9IEhBVkVfTUVUQURBVEEgLSBtZXRhZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XG4qXHQyID0gSEFWRV9DVVJSRU5UX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBpcyBhdmFpbGFibGUsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lL21pbGxpc2Vjb25kXG4qXHQzID0gSEFWRV9GVVRVUkVfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IGFuZCBhdCBsZWFzdCB0aGUgbmV4dCBmcmFtZSBpcyBhdmFpbGFibGVcbipcdDQgPSBIQVZFX0VOT1VHSF9EQVRBIC0gZW5vdWdoIGRhdGEgYXZhaWxhYmxlIHRvIHN0YXJ0IHBsYXlpbmdcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0Ly93cmFwcGVyLCBlbmRlZENhbGxiYWNrXG5cdGlmICggISh0aGlzIGluc3RhbmNlb2YgVmlkZW9QbGF5ZXIpICkgcmV0dXJuIG5ldyBWaWRlb1BsYXllcih3cmFwcGVyLCBlbmRlZENhbGxiYWNrKTtcblx0dGhpcy53cmFwcGVyIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy53cmFwcGVyKTtcblx0dGhpcy5sb2FkaW5nRWxlbWVudFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvLWxvYWRpbmctaW1hZ2UnKSxcblx0dGhpcy52aWRlbyBcdFx0XHQ9IG51bGwsXG5cdHRoaXMubG93UmVzIFx0XHQ9ICQodGhpcy53cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9bG93XScpLmdldCgwKTtcblx0dGhpcy5oaWdoUmVzIFx0XHQ9ICQodGhpcy53cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG5cdHRoaXMucGxheUZsYWcgXHRcdD0gdHJ1ZTtcblx0dGhpcy5jdXJUaW1lIFx0XHQ9IChmdW5jdGlvbigpe1xuXHRcdGlmICggb3B0aW9ucy5zdGFydFRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbiApIHJldHVybiAwO1xuXHRcdHZhciBzdGFydFRpbWUgPSBvcHRpb25zLnN0YXJ0VGltZSA/IE1hdGgucm91bmQob3B0aW9ucy5zdGFydFRpbWUgLyAxMDAwKSA6IDA7XG5cdFx0cmV0dXJuIHN0YXJ0VGltZTtcblx0fSkoKTtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5tb2JpbGVOZXR3b3JrXHQ9IG9wdGlvbnMubW9iaWxlTmV0d29yaztcblx0dGhpcy5hbGVydE1vYmlsZVx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1vYmlsZScpO1xuXHR0aGlzLnBsYXlQYXVzZUZsYWcgXHQ9ICdwYXVzZSc7XG5cdHRoaXMuZW5kZWRDYWxsYmFjayA9IHR5cGVvZiBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX3VubG9hZCgpO1xuXHR0aGlzLl9zaXplKCk7XG5cdHRoaXMuX2luaXQoKTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRbdGhhdC5wbGF5QnRuLCB0aGF0LnBhdXNlQnRuXS5mb3JFYWNoKGZ1bmN0aW9uKGJ0biwgaW5kZXgpe1xuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKXtcblx0XHRcdHRoYXQuYWRkS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblxuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cdH0pO1xuXG5cdHRoYXQucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdGlmICggdGhhdC5tb2JpbGVOZXR3b3JrICkge1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrID0gZmFsc2U7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmtDaGVjaygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0fVxuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3NpemUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHcgPSBNYXRoLnJvdW5kKCB0aGlzLndyYXBwZXIuY2xpZW50V2lkdGggKSxcblx0XHRoID0gMDtcblx0aCA9ICg5ICogdykgLyAxNjtcblx0dGhpcy53cmFwcGVyLnN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQoaCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl91bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmJvZHkub251bmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIG1vdmUnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tb2JpbGVOZXR3b3JrQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRhbGVydCA9IHRoYXQuYWxlcnRNb2JpbGU7XG5cdHRoYXQuYWRkS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0dGhhdC5jb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0YWxlcnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm9rJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gbnVsbDtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHRcdC8vIGlmICggdGhhdC5jdXJUaW1lICkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTsgXG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0XHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHRcdC8vIFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZygnYWFhYWFhJyk7XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cblx0XHQkKCdib2R5Jykub24oJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ3RyYW5zaXRpb25lbmQnKTtcblx0XHR9KTtcblx0XHQvLyB0aGF0LnZpZGVvLm9ud2Via2l0dHJhbnNpdGlvbmVuZCA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8gfTtcblxuXHRcdHRoYXQudmlkZW8ub25hbmltYXRpb25lbmQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdvbndlYmtpdGFuaW1hdGlvbmVuZCcpO1xuXHRcdH07XG5cblx0XHRkb2N1bWVudC5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gJiYgdi5lbmRlZCApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2Z1bGxzY3JlZW4gY2hhbmdlIDogem9vbSBpbicpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIDEwMDAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHR0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdH07XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHRcdGNvbnNvbGUubG9nKCdwbGF5Jyk7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdFx0Y29uc29sZS5sb2coJ3BsYXlpbmcnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGNvbnNvbGUubG9nKCfrgZ3rgqgnKTtcblx0XHRcdGlmICggdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ+yghOyytO2ZlOuptCcpO1xuXHRcdFx0XHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQg64Gd64KoJyk7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQg64Gd64KoJyk7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygxKTtcblx0XHRcdFx0XHR2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMik7XG5cdFx0XHRcdFx0di53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDMpO1xuXHRcdFx0XHRcdGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbiApe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDQpO1xuXHRcdFx0XHRcdGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCB2LmVuZGVkICkgdGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdGNvbnNvbGUuZGlyKHZpZGVvKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiggZXJyb3JUeXBlICkge1xuXHQvLyBpZiAoIHJlYWR5U3RhdGVGbGFnID09ICApXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdHYub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0XHRpZiAoIHYucGF1c2VkICkgcmV0dXJuO1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcblx0XHRjb25zb2xlLmxvZygndGltZXVwZGF0ZScsICcxMTExMTExMTEnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC52aWRlbykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHQkKHRoYXQudGltZWxpbmUpLnNob3coKTtcblx0JCh0aGF0LmNvbnRyb2wpLmFkZENsYXNzKCdyZW1vdmUtdGltZScpLnNob3coKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQucGF1c2VCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmN1clRpbWUgPSB0aGF0LnZpZGVvLmN1cnJlbnRUaW1lO1xuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHQkKHRoaXMpLmhpZGUoKTtcblx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmJnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmNvbnRyb2wpLm9uKHtcblx0J21vdXNkb3duIHRvdWNoc3RhcnQnOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9LFxuXHQnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuXHQgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tYWtlU2Vla2JhciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzdGFydDogZnVuY3Rpb24gKCBldmVudCwgdWkgKSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9LFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblxuXHRcdGlmICggdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwbGF5JyApIHtcblx0XHRcdHYucGxheSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2LnBhdXNlKCk7XG5cdFx0fVxuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzID0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyA9IHRoaXMuaGlnaFJlcztcblx0aWYgKGJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKS5oYXNDbGFzcygnbG93JykpIHtcblx0XHQkKGxvd1Jlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQodGhhdC5sb3dSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5sb3dSZXMpLmRhdGEoJ3NyYycpKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQodGhhdC5oaWdoUmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQuaGlnaFJlcykuZGF0YSgnc3JjJykpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcblx0Ly8gdGhhdC52ZXJpZnlpbmcoIHRoYXQudmlkZW8gKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS52ZXJpZnlpbmcgPSBmdW5jdGlvbiAoIHYgKSB7XG5cdGNvbnNvbGUubG9nKHYubmV0d29ya1N0YXRlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbyxcblx0XHRtLCBzO1xuXG5cdHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xuXHR0aGF0LmN1clRpbWUgPSB2LmN1cnJlbnRUaW1lO1xuXHRtID0gKCBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUgLyA2MCkgKS50b1N0cmluZygpO1xuXHRzID0gKCBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUgJSA2MCkgKS50b1N0cmluZygpO1xuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSAobS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG0pICArICc6JyArIChzLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcyk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcblx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdD0gdGhpcyxcblx0XHR2IFx0XHQ9IHRoYXQudmlkZW87XG5cblx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHRpZih0aGF0LmN1clRpbWUpIHYuY3VycmVudFRpbWUgPSB0aGF0LmN1clRpbWU7XG5cdFx0di5wbGF5KCk7XG5cdH0gZWxzZSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdGJnID0gZWwuZGF0YXNldC5iZztcblxuXHR2YXIgY2FudmFzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzVGFnLmlkID0gXCJ2aWRlb1Bvc3RlclwiO1xuXHR0aGF0LnBvc3Rlci5hcHBlbmRDaGlsZCggY2FudmFzVGFnICk7XG5cdHRoYXQuZ2V0RHVyYXRpb24oKTtcblx0aW1hZ2VQcmVsb2FkZXIoYmcsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIHRoYXQubG9hZGluZ0VsZW1lbnQgKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR0aGF0LmNvbnRyb2wuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0fVxuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9Qb3N0ZXInKSxcblx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcblx0XHRcdGltZyA9IG5ldyBJbWFnZSgpLFxuXHRcdFx0aW1nVyA9IDAsXG5cdFx0XHRpbWdIID0gMCxcblx0XHRcdHRpbWVvdXQsXG5cdFx0XHRpbnRlcnZhbDtcblx0XHR2YXIgYWEgPSAwO1xuXHRcdGltZy5zcmMgPSBiZztcblx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMDtcblxuXHRcdGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHRcdGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHQvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuXHRcdFxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGggKiAxLjU7XG5cdFx0aW1nSCA9ICggTWF0aC5yb3VuZChpbWcubmF0dXJhbEhlaWdodCkgKiA5ICkgLyAxNjtcblx0XHRpbWdIID0gTWF0aC5yb3VuZCggaW1nSCApICogMS41O1xuXHRcdC8vIGltZ0ggPSB0aGF0LmdldFJhdGlvKGltZy5uYXR1cmFsV2lkdGgsIGltZy5uYXR1cmFsSGVpZ2h0LCBpbWdXKTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRcdGltZ1cgLT0gKGltZ1cqMC4wMjUpO1xuXHRcdFx0XHRcdGltZ0ggLT0gKGltZ0gqMC4wMjUpO1xuXHRcdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChpbnRlcnZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDEwMDAvNjApXG5cdFx0fSwgMzAwKTtcblx0XHRcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWRkS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdGlmICggdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoa2xhc3MpO1xuXHR0YXJnZXQuY2xhc3NOYW1lID0gdWkudXRpbC50cmltKCB0YXJnZXQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlZ2V4cCwgXCJcIiApICk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3ZpZGVvLXBsYXllci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=