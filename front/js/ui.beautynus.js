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
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=android 2.3!./../../node_modules/sass-loader/index.js!./concat.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=android 2.3!./../../node_modules/sass-loader/index.js!./concat.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?browsers=android 2.3!./../../node_modules/sass-loader/index.js!./concat.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
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
		}]
	}, {
		depth1: "브랜드",
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
				console.log('loadeddata', v.networkState);
			};
			v.onloadedmetadata = function () {
				console.log('onloadedmetadata', v.networkState);
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
	
		// that.video.oncuechange = function(){
		// 	console.log('cuechange');
		// };
	};
	
	VideoPlayer.prototype._onPlay = function () {
		var that = this;
	
		that.video.onplay = function () {
			$(that.poster).hide();
			$(that.pauseBtn).show();
			$(that.playBtn).hide();
			if (this.currentTime != 0) that.controlVisibling(true);
			that.playPauseFlag = 'play';
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
		console.log(video);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDk4YTJiNjQ3MTVlNGVmOWJlN2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Rldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlkZW8tcGxheWVyLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJ3aW4iLCJkb2MiLCJkb2N1bWVudCIsImNzbG9nIiwibXNnIiwiY29uc29sZSIsImxvZyIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiZGV2aWNlU2l6ZSIsImlubmVyV2lkdGgiLCJjb21tb24iLCJlbXB0eUxpbmtGdW5jIiwiYWxsQSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhVGFnIiwiaHJlZiIsImkiLCJsZW5ndGgiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGVjbGFzcyIsInRhYmxlRmFkZSIsIl9zY29wZSIsImVhY2giLCIkdGhpcyIsImZpbmQiLCJvbiIsImUiLCJfdGFyZ2V0IiwidGFyZ2V0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbExlZnQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwibG9hZGluZ0NvbXBsZXRlIiwiY2FsbGJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwiaW1hZ2VQcmVsb2FkZXIiLCJpbWciLCJjbGFzc05hbWUiLCJzdG9wIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsInBvcHVwQ2xvc2UiLCJwb3B1cCIsImoiLCJlcSIsInBhcmVudHMiLCJyZW1vdmUiLCJmYWtlU2VsZWN0IiwiaXRlbSIsInZhbHVlIiwic2VsZWN0IiwibGFiZWwiLCJ0aGF0IiwiZ2V0IiwidGV4dCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidHJpZ2dlciIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwiYXNzaWduIiwiT2JqZWN0IiwiZXh0ZW5kIiwic3dpcGVyIiwiZGF0YSIsIlN3aXBlciIsIm1hbmFnZXIiLCJhY2NvcmRpYW4iLCJjbGljayIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImpvaW4iLCJsb2NhdGlvbiIsImluZGV4T2YiLCJkZXYiLCJhcHBlbmRNZW51TGlzdCIsImFwcGVuZE1lbnVCdG4iLCJpbWFnZXMiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicXNhIiwicXMiLCJkb20iLCJzIiwiZG9tQWxsIiwibWFrZURvbSIsImF0dHIiLCJrZXlzIiwicHV0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImNoaWxkTm9kZXMiLCJhcHBlbmQiLCJhcHBlbmRDaGlsZCIsIm1lbnVEYXRhIiwiZGVwdGgxIiwiZGVwdGgyIiwibGlua3MiLCJ0aXRsZSIsImNvbXBsZXRlIiwibWVudUxpc3QiLCJyZWR1Y2UiLCJwIiwiYyIsImlwIiwiaWMiLCJtZW51VHJpZ2dlciIsImN0cmxDbGFzcyIsImNvbmRpdGlvbiIsImFkZCIsImFIUkVGIiwiZGltbSIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsImVuZGVkQ2FsbGJhY2siLCJxdWVyeVNlbGVjdG9yIiwibG9hZGluZ0VsZW1lbnQiLCJ2aWRlbyIsImxvd1JlcyIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xUaW1lciIsInBvc3RlciIsImNvbnRyb2wiLCJiZyIsInBsYXlCdG4iLCJwYXVzZUJ0biIsInZpZGVvVGltZSIsInRpbWVsaW5lIiwiZnVsbEJ0biIsImVuZFRpbWUiLCJzZWVrYmFyIiwiYnRuR3JvdXAiLCJhY3RpdmVCdG4iLCJtb2JpbGVOZXR3b3JrIiwiYWxlcnRNb2JpbGUiLCJwbGF5UGF1c2VGbGFnIiwid2FybiIsInBvc3RlckxvYWRlZCIsIl91bmxvYWQiLCJfc2l6ZSIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJmb3JFYWNoIiwiYnRuIiwiaW5kZXgiLCJyZW1vdmVLbGFzcyIsIm1vYmlsZU5ldHdvcmtDaGVjayIsIl9wbGF5IiwidyIsImgiLCJzdHlsZSIsImhlaWdodCIsImJvZHkiLCJvbnVubG9hZCIsImFsZXJ0IiwiZGlzcGxheSIsInYiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsIm9ubG9hZCIsIm5ldHdvcmtTdGF0ZSIsIm9ubG9hZHN0YXJ0Iiwib25sb2FkZWRkYXRhIiwib25sb2FkZWRtZXRhZGF0YSIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwid2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4iLCJlbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wbGF5aW5nIiwib25wYXVzZSIsImV4aXRGdWxsc2NyZWVuIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJkb2N1bWV0IiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJnZXREdXJhdGlvbiIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwibSIsInRvU3RyaW5nIiwiaW5uZXJUZXh0IiwiY2xlYXJJbnRlcnZhbCIsIl9lcnJvciIsImVycm9yVHlwZSIsImFsbG9jYXRlU2l6ZSIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwic2xpZGVyIiwicmFuZ2UiLCJzdGFydCIsImV2ZW50IiwicGF1c2UiLCJzbGlkZSIsImNoYW5nZUN1cnJlbnRUaW1lIiwiY2hhbmdlIiwicGxheSIsIndlYmtpdFBsYXlzSW5saW5lIiwicGxheXNJbmxpbmUiLCJwbGF5c2lubGluZSIsIndlYmtpdFBsYXlzaW5saW5lIiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdEVudGVyRnVsbHNjcmVlbiIsImNzcyIsImxvYWQiLCJ2ZXJpZnlpbmciLCJwYXJzZUludCIsInNlZWsiLCJjdCIsImR1ciIsImN0cmwiLCJjbGVhclRpbWVvdXQiLCJlbCIsImRhdGFzZXQiLCJjYW52YXNUYWciLCJpZCIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJJbWFnZSIsImltZ1ciLCJpbWdIIiwidGltZW91dCIsImludGVydmFsIiwiYWEiLCJnbG9iYWxBbHBoYSIsIndpZHRoIiwibmF0dXJhbEhlaWdodCIsInRvRml4ZWQiLCJkcmF3SW1hZ2UiLCJrbGFzcyIsInJlZ2V4cCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFGOEI7QUFL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eEMsRUFBNEM7QUFDNUN2UCxTQUFPVyxTQUFQLElBQW9CLE1BQU00TyxLQUExQjtBQUNBLEVBSEQ7O0FBS0FuSixhQUFZbUMsU0FBWixDQUFzQkssV0FBdEIsR0FBb0MsVUFBVzVJLE1BQVgsRUFBbUJ1UCxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0F2UCxTQUFPVyxTQUFQLEdBQW1CL0MsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWNpQyxPQUFPVyxTQUFQLENBQWlCMUMsT0FBakIsQ0FBMEJ1UixNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ5OGEyYjY0NzE1ZTRlZjliZTdhXG4gKiovIiwiaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuaW1wb3J0ICcuL2Rldic7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5pbXBvcnQgJy4vdmlkZW8tcGxheWVyJztcblxuXG52YXIgJCA9IHdpbmRvdy4kO1xudmFyIHdpbiA9IHdpbmRvdyxcbiAgICBkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG4gICAgLy/snKDti7gg66mU7ISc65OcXG4gICAgdXRpbDoge1xuICAgICAgICAvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG4gICAgICAgIGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCkge31cblxuICAgICAgICAvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuICAgICAgICAsXG4gICAgICAgIHRyaW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNEZXZpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy/rqqjrsJTsnbwgVUFcbiAgICAgICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2luZ2VyYnJlYWQpIHJldHVybiAnZ2luZ2VyYnJlYWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlvcykgcmV0dXJuICdpb3MnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MpIHJldHVybiAnbm8tbW9iaWxlJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlvczogdWEubWF0Y2goJ2lQaG9uZScpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZ2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRldmljZVNpemU6ICdkZXZpY2Utc2l6ZS0nICsgd2luZG93LmlubmVyV2lkdGhcbiAgICB9XG5cbiAgICAvLyDqs7XthrUg66mU7ISc65OcXG4gICAgLFxuICAgIGNvbW1vbjoge1xuXG4gICAgICAgIC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuICAgICAgICBlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG4gICAgICAgICAgICB2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksXG4gICAgICAgICAgICAgICAgYVRhZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgaHJlZiA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGFUYWcgPSBhbGxBW2ldO1xuICAgICAgICAgICAgICAgIGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICAgIGlmICh1aS51dGlsLnRyaW0oaHJlZikgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgYVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG4gICAgICAgICxcbiAgICAgICAgdGFibGVGYWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgICAgICAgIGlmIChfc2NvcGUubGVuZ3RoIDw9IDApIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1mYWRlaW4td3JhcCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb2FkaW5nIG1hc2tcbiAgICAgICAgLFxuICAgICAgICBsb2FkaW5nQ29tcGxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2xvYWRpbmctY2lyY3VsYXIuZ2lmJywgZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc05hbWUgPSBcInZpZGVvLWxvYWRpbmctaW1hZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5Jykuc3RvcCgpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMYXllciBwb3B1cFxuICAgICAgICAsXG4gICAgICAgIHBvcHVwQ2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwb3B1cCA9ICQoJy5wb3B1cCcpO1xuICAgICAgICAgICAgaWYgKCBwb3B1cC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGk9MCwgbGVuZ3RoPXBvcHVwLmxlbmd0aDsgaTxsZW5ndGg7IGkrPTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLmVxKGopLmZpbmQoJy5idG4tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnBvcHVwJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZha2VTZWxlY3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LXdyYXAuZmFrZScpLmVhY2goZnVuY3Rpb24oaXRlbSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICQodGhpcykuZmluZCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhhdC5vcHRpb25zW3RoYXQuc2VsZWN0ZWRJbmRleF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwudGV4dCggdGV4dCApO1xuICAgICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gICAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICAgIHZhciBjYXJkTmV3cyA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcblxuICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICAgIHZhciBhY2NvcmRpYW4gPSB7XG4gICAgICAgIF9zY29wZTogJycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKF9zY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChpdGVtLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gICAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpIHtcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uLFxuICAgICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuICAgIGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG4gICAgY29tbW9uLnRhYmxlRmFkZSgpO1xuXG4gICAgJCgnYm9keScpLmFkZENsYXNzKFtpc0RldmljZS5jaGVjaygpLCB1dGlsLmRldmljZVNpemVdLmpvaW4oJyAnKSk7XG5cbiAgICBiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuICAgIGNvbW1vbi5sb2FkaW5nQ29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY2FsbGJhY2tzXG4gICAgfSk7XG5cbiAgICAvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG4gICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEpIHtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG4gICAgICAgIGRldi5hcHBlbmRNZW51QnRuKCk7XG4gICAgfVxufSk7XG5cbi8qXG4gKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiAqL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oaW1nLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZXMuc3JjID0gaW1nO1xuXG4gICAgaW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhpbWFnZXMpO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzP2Jyb3dzZXJzPWFuZHJvaWQgMi4zIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vY29uY2F0LnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanM/YnJvd3NlcnM9YW5kcm9pZCAyLjMhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9jb25jYXQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzP2Jyb3dzZXJzPWFuZHJvaWQgMi4zIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vY29uY2F0LnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IFt3aW4sIGRvYywgcXNhLCBxc10gPSBbd2luZG93LCBkb2N1bWVudCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnLCAncXVlcnlTZWxlY3RvciddO1xuXG5jb25zdFxuXHRkb20gXHQ9IHMgPT4gZG9jdW1lbnRbcXNdKHMpLFxuXHRkb21BbGwgXHQ9IHMgPT4gZG9jdW1lbnRbcXNhXShzKSxcblx0bWFrZURvbSA9IChzLCBhdHRyKSA9PiB7XG5cdFx0dmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocylcblx0XHRpZiAoIHR5cGVvZiBhdHRyID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA+IDAgKVxuXHRcdFx0Zm9yICggbGV0IGkgaW4gYXR0ciApXG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoaSwgYXR0cltpXSk7XG5cdFx0cmV0dXJuIGRvbTtcblx0fSxcblx0cHV0VGV4dCA9IHMgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyksXG5cdHByZXBlbmQgPSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRhcmdldC5jaGlsZE5vZGVzWzBdKSxcblx0YXBwZW5kIFx0PSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzte2GtVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64K07Jqp7J20IOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vbm8tcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLruIzrnpzrk5xcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l7KCV67O0XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66ek7J6l7IaM7IudXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVJbmZvL3N0b3JlTmV3cy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrsLHtmZTsoJDtlonsgqwoU2FtcGxlKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlRXZlbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvc2VydmljZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9tYXRpb24uaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7J2067Kk7Yq4Ju2WieyCrFwiLFxuXHRcdGRlcHRoMjogXCLsp4TtlonspJHsnbgg7J2067Kk7Yq4XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7J2867CYXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDri6jsnbzshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyZhOujjClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsooXro4wg7ZuEIO2ZleyduClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX2ZpbmlzaC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsmIjslb0g7IucIC0g6rCc7J247KCV67O0IOyImOynkSDrsI8g7J207Jqp7JWI64K0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvcmVzZXJ2YXRpb24vYWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67ew7Yuw7Luo7YWQ7LigXCIsXG5cdFx0ZGVwdGgyOiBcIuuqqeuhnVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjsubTrk5zribTsiqTtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4HtkojsoJXrs7RcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RJbmZvL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzoOqwneyEvO2EsFwiLFxuXHRcdGRlcHRoMjogXCLqs7Xsp4Dsgqztla1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqqnroZ0gKyDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9ub3RpY2UvbGlzdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuPhOybgOunkFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqZTsnbhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9oZWxwL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6XCLrp4jsnbTtjpjsnbTsp4BcIiAsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrk7HquIlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvZ3JhZGUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOy/oO2PsFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9jb3Vwb24vaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g67Cp66y47ZuE6riwXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L3Zpc2l0b3JzQm9vay5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq0gOyLrOyDge2SiFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wcm9kdWN0T2ZJbnRlcmVzdC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLqtazrp6TtmITtmalcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrpqzsiqTtirgocG9wdXAg7Y+s7ZWoKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wdXJjaGFzZS9wZXJpb2QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yA7ZmU7ZmU66m0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQke2RlcHRoMSA/IGA8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+YCA6IGBgfVxuXHQke2RlcHRoMiA9PSAnJyA/IGRlcHRoMiA6IGA8aDM+PHNwYW4+JHtkZXB0aDJ9PC9zcGFuPjwvaDM+YH1cblx0PHVsPiR7bGlua3MucmVkdWNlKChpcCwgaWMpID0+IHtcblx0XHRcdGxldCB7dGl0bGUsIGhyZWYsIGNvbXBsZXRlfSA9IGljO1xuXHRcdFx0cmV0dXJuIGAke2lwIHx8IFwiXCJ9XG5cdFx0PGxpJHtjb21wbGV0ZSA/ICcgY2xhc3M9XCJjcFwiJyA6IFwiXCJ9PjxhIGhyZWY9XCIke2hyZWZ9XCI+JHt0aXRsZX08L2E+PC9saT5gfSwgMCl9XG5cdDwvdWw+XG5cdGBcbn0sIDApO1xuXG4vLyDrqZTribQg67KE7Yq8IOyCveyehVxud2luZG93LmRldiA9IHtcblx0YXBwZW5kTWVudUJ0bjogZnVuY3Rpb24oKXtcblx0XHR2YXIgbWVudVRyaWdnZXIgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZW51LXRyaWdnZXJcIj5cblx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG48L2J1dHRvbj5gO1xuXHRcblx0XHRcdGlmICggJCgnYnV0dG9uLm1lbnUtdHJpZ2dlcicpLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0XHR9XG5cdFxuXHRcdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG1lbnVMaXN0ID0gJCgnI21lbnUtbGlzdCcpLFxuXHRcdFx0XHQgICAgY3RybENsYXNzID0gJ2lzLWFjdGl2ZScsXG5cdFx0XHRcdCAgICBjb25kaXRpb24gPSBtZW51TGlzdC5oYXNDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdGlmIChjb25kaXRpb24pIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5hZGRDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IGNsYXNzPW92ZXJ0aHJvdyAvPicpLmFwcGVuZCggbWVudUxpc3QgKSApO1xuXHRcdFx0JCgnI3dyYXAnKS5sZW5ndGggPD0gMCA/ICQoJ2JvZHknKS5wcmVwZW5kKCBtZW51TGlzdCApIDogJCgnI3dyYXAnKS5wcmVwZW5kKCBtZW51TGlzdCApO1xuXHRcdH1cblx0XHQkKCcjbWVudS1saXN0JykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhSFJFRiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0aWYgKCBhSFJFRi5pbmRleE9mKCc/ZGV2JykgPD0gLTEgKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGFIUkVGICsgJz9kZXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHQsZGltbTogZnVuY3Rpb24obXNnKXtcblx0XHRtc2cgPSBtc2cgfHwgJ+uCtOyaqeydtCDsl4bsirXri4jri6QuJztcblx0XHQkKCdib2R5JykuYXBwZW5kKFxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImRpbW1cIiAvPicpLmFwcGVuZChcblx0XHRcdFx0JChgPHNwYW4+JHttc2d9PHNwYW4vPjxidXR0b24gY2xhc3M9XCJjbG9zZVwiPlvri6vquLBdPC9zcGFuPjwvYnV0dG9uPmApXG5cdFx0XHQpXG5cdFx0KTtcblx0XHQkKCcuZGltbScpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmRpbW0nKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZGV2LmpzXG4gKiovIiwiLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qXHRuZXR3b3JrU3RhdGUgeyBudW1iZXIgfVxuKiBcdDAgPSBORVRXT1JLX0VNUFRZIC0gYXVkaW8vdmlkZW8gaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZFxuKlx0MSA9IE5FVFdPUktfSURMRSAtIGF1ZGlvL3ZpZGVvIGlzIGFjdGl2ZSBhbmQgaGFzIHNlbGVjdGVkIGEgcmVzb3VyY2UsIGJ1dCBpcyBub3QgdXNpbmcgdGhlIG5ldHdvcmtcbipcdDIgPSBORVRXT1JLX0xPQURJTkcgLSBicm93c2VyIGlzIGRvd25sb2FkaW5nIGRhdGFcbipcdDMgPSBORVRXT1JLX05PX1NPVVJDRSAtIG5vIGF1ZGlvL3ZpZGVvIHNvdXJjZSBmb3VuZFxuKlxuKlx0cmVhc3lTdGF0ZSB7IG51bXZlciB9XG4qXHQwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XHRcbipcdDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuKlx0MiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuKlx0MyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4qXHQ0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdC8vd3JhcHBlciwgZW5kZWRDYWxsYmFja1xuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIFZpZGVvUGxheWVyKSApIHJldHVybiBuZXcgVmlkZW9QbGF5ZXIod3JhcHBlciwgZW5kZWRDYWxsYmFjayk7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMud3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHRoaXMud3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHRoaXMud3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWhpZ2hdJykuZ2V0KDApO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAoZnVuY3Rpb24oKXtcblx0XHRpZiAoIG9wdGlvbnMuc3RhcnRUaW1lID49IG9wdGlvbnMuZHVyYXRpb24gKSByZXR1cm4gMDtcblx0XHR2YXIgc3RhcnRUaW1lID0gb3B0aW9ucy5zdGFydFRpbWUgPyBNYXRoLnJvdW5kKG9wdGlvbnMuc3RhcnRUaW1lIC8gMTAwMCkgOiAwO1xuXHRcdHJldHVybiBzdGFydFRpbWU7XG5cdH0pKCk7XG5cdHRoaXMuY29udHJvbFRpbWVyIFx0PSBudWxsO1xuXHR0aGlzLnBvc3RlciBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuXHR0aGlzLmNvbnRyb2wgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG5cdHRoaXMuYmcgXHRcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG5cdHRoaXMucGxheUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcblx0dGhpcy5wYXVzZUJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBhdXNlJyk7XG5cdHRoaXMudmlkZW9UaW1lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG5cdHRoaXMudGltZWxpbmUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuXHR0aGlzLmZ1bGxCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5mdWxsJyk7XG5cdHRoaXMuc3RhcnRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcblx0dGhpcy5lbmRUaW1lIFx0XHQ9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuXHR0aGlzLnNlZWtiYXIgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJyk7XG5cdHRoaXMuYnRuR3JvdXAgXHRcdD0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcblx0dGhpcy5hY3RpdmVCdG4gXHRcdD0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cdHRoaXMubW9iaWxlTmV0d29ya1x0PSBvcHRpb25zLm1vYmlsZU5ldHdvcms7XG5cdHRoaXMuYWxlcnRNb2JpbGVcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tb2JpbGUnKTtcblx0dGhpcy5wbGF5UGF1c2VGbGFnIFx0PSAncGF1c2UnO1xuXHR0aGlzLmVuZGVkQ2FsbGJhY2sgPSB0eXBlb2Ygb3B0aW9ucy5lbmRlZENhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLndhcm4oJ2VuZGVkQ2FsbGJhY2sgdHlwZSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcblx0fTtcblxuXHR0aGlzLnBvc3RlckxvYWRlZCgpO1xuXHR0aGlzLl91bmxvYWQoKTtcblx0dGhpcy5fc2l6ZSgpO1xuXHR0aGlzLl9pbml0KCk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0W3RoYXQucGxheUJ0biwgdGhhdC5wYXVzZUJ0bl0uZm9yRWFjaChmdW5jdGlvbihidG4sIGluZGV4KXtcblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGF0LmFkZEtsYXNzKHRoaXMsICdtb3VzZWRvd24nKTtcblx0XHR9LCBmYWxzZSk7XG5cblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXHR9KTtcblxuXHR0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRpZiAoIHRoYXQubW9iaWxlTmV0d29yayApIHtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29yayA9IGZhbHNlO1xuXHRcdFx0dGhhdC5tb2JpbGVOZXR3b3JrQ2hlY2soKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhhdC5fcGxheSgpO1xuXHRcdH1cblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9zaXplID0gZnVuY3Rpb24oKSB7XG5cdHZhciB3ID0gTWF0aC5yb3VuZCggdGhpcy53cmFwcGVyLmNsaWVudFdpZHRoICksXG5cdFx0aCA9IDA7XG5cdGggPSAoOSAqIHcpIC8gMTY7XG5cdHRoaXMud3JhcHBlci5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGgpICsgJ3B4Jztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fdW5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRkb2N1bWVudC5ib2R5Lm9udW5sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygncGFnZSBtb3ZlJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubW9iaWxlTmV0d29ya0NoZWNrID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YWxlcnQgPSB0aGF0LmFsZXJ0TW9iaWxlO1xuXHR0aGF0LmFkZEtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdHRoYXQuY29udHJvbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5vaycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHR0aGF0Ll9wbGF5KCk7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IG51bGw7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0aWYgKCB0aGF0LnBsYXlGbGFnICkge1xuXHRcdHRoYXQucGxheUZsYWcgPSBmYWxzZTtcblx0XHQkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHRcdGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cblx0XHR2ID0gdGhhdC52aWRlbztcblx0XHQvLyBpZiAoIHRoYXQuY3VyVGltZSApIHYuY3VycmVudFRpbWUgPSB0aGF0LmN1clRpbWU7IFxuXG5cdFx0dGhhdC5fb25QbGF5KCk7XG5cdFx0dGhhdC5fb25QYXVzZSgpO1xuXHRcdHRoYXQuX29uVGltZVVwZGF0ZSgpO1xuXHRcdHRoYXQuX2NsaWNrKCk7XG5cdFx0dGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcblx0XHR0aGF0Ll9wYXVzZSgpO1xuXHRcdHRoYXQubWFrZVNlZWtiYXIoKTtcblx0XHR0aGF0LmNvbnRyb2xFdmVudCgpO1xuXHRcdHRoYXQuZGltbUNsaWNrKCk7XG5cdFx0Ly8gaWYgKCB0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSApIHtcblx0XHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0XHQvLyBcdFx0Y29uc29sZS5sb2coJ2FhYWFhYScpO1xuXHRcdC8vIFx0fTtcblx0XHQvLyB9XG5cblx0XHR2Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnb25sb2Fkc3RhcnQnLiB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnbG9hZGVkZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRtZXRhZGF0YSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnb25sb2FkZWRtZXRhZGF0YScsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXG5cdFx0JCgnYm9keScpLm9uKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uZW5kJyk7XG5cdFx0fSk7XG5cdFx0Ly8gdGhhdC52aWRlby5vbndlYmtpdHRyYW5zaXRpb25lbmQgPSBmdW5jdGlvbigpIHtcblxuXHRcdC8vIH07XG5cblx0XHR0aGF0LnZpZGVvLm9uYW5pbWF0aW9uZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnb253ZWJraXRhbmltYXRpb25lbmQnKTtcblx0XHR9O1xuXG5cdFx0ZG9jdW1lbnQub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICF2LndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuICYmIHYuZW5kZWQgKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmdWxsc2NyZWVuIGNoYW5nZSA6IHpvb20gaW4nKTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCAxMDAwMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRoYXQucGxheVBhdXNlKCk7XG5cblx0Ly8gdGhhdC52aWRlby5vbmN1ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0Y29uc29sZS5sb2coJ2N1ZWNoYW5nZScpO1xuXHQvLyB9O1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcztcblxuXHR0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuXHRcdCQodGhhdC5wb3N0ZXIpLmhpZGUoKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLnNob3coKTtcblx0XHQkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuXHRcdGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuXHRcdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwbGF5Jztcblx0fTtcblxuXHR0aGF0LnZpZGVvLm9ucGxheWluZyA9IGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5yZW1vdmVLbGFzcyh0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QYXVzZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbztcblx0dGhhdC52aWRlby5vbnBhdXNlID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGNvbnNvbGUubG9nKCfrgZ3rgqgnKTtcblx0XHRcdGlmICggdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ+yghOyytO2ZlOuptCcpO1xuXHRcdFx0XHR0aGF0LnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQg64Gd64KoJyk7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQg64Gd64KoJyk7XG5cdFx0XHRcdFx0dmFyIHYgPSB0aGF0LnZpZGVvO1xuXHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygxKTtcblx0XHRcdFx0XHR2LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHYud2Via2l0RXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMik7XG5cdFx0XHRcdFx0di53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2N1bWV0LmV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDMpO1xuXHRcdFx0XHRcdGRvY3VtZXQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC53ZWJraXRFeGl0RnVsbHNjcmVlbiApe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDQpO1xuXHRcdFx0XHRcdGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCB2LmVuZGVkICkgdGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdGNvbnNvbGUubG9nKHZpZGVvKTtcblx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPiAwKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKSxcblx0XHRcdFx0cyA9ICcnLFxuXHRcdFx0XHRtID0gJyc7XG5cdFx0XHRzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG5cdFx0XHRtID0gKChkdXJhdGlvbiAtIHMpIC8gNjApLnRvU3RyaW5nKCk7XG5cdFx0XHRzID0gcy5sZW5ndGggPCAyID8gMCArIHMgOiBzO1xuXHRcdFx0bSA9IG0ubGVuZ3RoIDwgMiA/IDAgKyBtIDogbTtcblx0XHRcdHRoYXQudmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0dGhhdC5lbmRUaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7IFxuXHRcdFx0Ly8gdGhhdC5hbGxvY2F0ZVNpemUodmlkZW8pO1xuXHRcdH1cblx0fSwgNTAwKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiggZXJyb3JUeXBlICkge1xuXHQvLyBpZiAoIHJlYWR5U3RhdGVGbGFnID09ICApXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWxsb2NhdGVTaXplID0gZnVuY3Rpb24odil7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuXHR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdHYub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcblx0XHRpZiAoIHYucGF1c2VkICkgcmV0dXJuO1xuXHRcdHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC52aWRlbykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuXHQkKHRoYXQudGltZWxpbmUpLnNob3coKTtcblx0JCh0aGF0LmNvbnRyb2wpLmFkZENsYXNzKCdyZW1vdmUtdGltZScpLnNob3coKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQucGF1c2VCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmN1clRpbWUgPSB0aGF0LnZpZGVvLmN1cnJlbnRUaW1lO1xuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHQkKHRoaXMpLmhpZGUoKTtcblx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BhdXNlJztcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZGltbUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmJnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LmNvbnRyb2wpLm9uKHtcblx0J21vdXNkb3duIHRvdWNoc3RhcnQnOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHR9LFxuXHQnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuXHQgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tYWtlU2Vla2JhciA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcblx0cmFuZ2U6ICdtaW4nLFxuXHQvLyBtYXg6IGR1cmF0aW9uLFxuXHRzdGFydDogZnVuY3Rpb24gKCBldmVudCwgdWkgKSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9LFxuXHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LmNoYW5nZUN1cnJlbnRUaW1lKHVpKTtcblxuXHRcdGlmICggdGhhdC5wbGF5UGF1c2VGbGFnID09ICdwbGF5JyApIHtcblx0XHRcdHYucGxheSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2LnBhdXNlKCk7XG5cdFx0fVxuXHR9XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9mdWxsc2NycmVuTW9kZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpcyxcblx0ICB2ID0gdGhhdC52aWRlbzsgXG4gICQodGhhdC5mdWxsQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG5cdCAgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c0lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG5cdCAgaWYgKCB0eXBlb2Ygdi5wbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi5wbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LnBsYXlzSW5saW5lID0gdHJ1ZTtcblx0ICBlbHNlIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG5cdH1cblx0aWYgKHYucmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAoIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuIClcblx0ICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG5cdFx0bG93UmVzID0gdGhpcy5sb3dSZXMsXG5cdFx0aGlnaFJlcyA9IHRoaXMuaGlnaFJlcztcblx0aWYgKGJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKS5oYXNDbGFzcygnbG93JykpIHtcblx0XHQkKGxvd1Jlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKGhpZ2hSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQodGhhdC5sb3dSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5sb3dSZXMpLmRhdGEoJ3NyYycpKTtcblx0XHR0aGF0LnZpZGVvID0gJChsb3dSZXMpLmdldCgwKTtcblx0fSBlbHNlIHtcblx0XHQkKGxvd1JlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JChoaWdoUmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQodGhhdC5oaWdoUmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQuaGlnaFJlcykuZGF0YSgnc3JjJykpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcblx0fVxuXHR0aGF0LnZpZGVvLmxvYWQoKTtcblx0Ly8gdGhhdC52ZXJpZnlpbmcoIHRoYXQudmlkZW8gKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS52ZXJpZnlpbmcgPSBmdW5jdGlvbiAoIHYgKSB7XG5cdGNvbnNvbGUubG9nKHYubmV0d29ya1N0YXRlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jaGFuZ2VDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHVpKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gdGhhdC52aWRlbyxcblx0XHRtLCBzO1xuXG5cdHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xuXHR0aGF0LmN1clRpbWUgPSB2LmN1cnJlbnRUaW1lO1xuXHRtID0gKCBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUgLyA2MCkgKS50b1N0cmluZygpO1xuXHRzID0gKCBNYXRoLnJvdW5kKHYuY3VycmVudFRpbWUgJSA2MCkgKS50b1N0cmluZygpO1xuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSAobS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG0pICArICc6JyArIChzLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcyk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiggc2VlayApe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdHZpZGVvID0gdGhhdC52aWRlbztcblx0dmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuXHRpZiAoIGN0IDwgNjAgKSB7XG5cdFx0bSA9ICcwMCc7XG5cdFx0cyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcblx0fSBlbHNlIHtcblx0XHRzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcblx0XHRtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcblx0XHRzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcblx0XHRtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcblx0fVxuXHR0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0aWYgKCBzZWVrID09ICdzZWVrJyApIHtcblx0XHQkKCcuc2Vla2JhcicpLnNsaWRlcih7XG5cdFx0XHR2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuXHRcdH0pO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIGlmIChjdHJsKSB7XG5cdHRoYXQuY29udHJvbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuXHR9LCAyMDAwKTtcbiAgfSBlbHNlIHtcblx0Y2xlYXJUaW1lb3V0KHRoYXQuY29udHJvbFRpbWVyKTtcblx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcbiAgfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBsYXlQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCBcdD0gdGhpcyxcblx0XHR2IFx0XHQ9IHRoYXQudmlkZW87XG5cblx0aWYgKCB2LnBhdXNlZCApIHtcblx0XHRpZih0aGF0LmN1clRpbWUpIHYuY3VycmVudFRpbWUgPSB0aGF0LmN1clRpbWU7XG5cdFx0di5wbGF5KCk7XG5cdH0gZWxzZSB7XG5cdFx0di5wYXVzZSgpO1xuXHR9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucG9zdGVyTG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRiZyA9IFwiXCIsXG5cdFx0ZWwgPSB0aGF0LnBvc3Rlci5xdWVyeVNlbGVjdG9yKCcuaW1nJyksXG5cdFx0c3JjID0gJyc7XG5cdGJnID0gZWwuZGF0YXNldC5iZztcblxuXHR2YXIgY2FudmFzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0Y2FudmFzVGFnLmlkID0gXCJ2aWRlb1Bvc3RlclwiO1xuXHR0aGF0LnBvc3Rlci5hcHBlbmRDaGlsZCggY2FudmFzVGFnICk7XG5cdHRoYXQuZ2V0RHVyYXRpb24oKTtcblx0aW1hZ2VQcmVsb2FkZXIoYmcsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIHRoYXQubG9hZGluZ0VsZW1lbnQgKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiICk7XG5cdFx0XHR0aGF0LmNvbnRyb2wuc3R5bGUub3BhY2l0eSA9IDE7XG5cdFx0fVxuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW9Qb3N0ZXInKSxcblx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcblx0XHRcdGltZyA9IG5ldyBJbWFnZSgpLFxuXHRcdFx0aW1nVyA9IDAsXG5cdFx0XHRpbWdIID0gMCxcblx0XHRcdHRpbWVvdXQsXG5cdFx0XHRpbnRlcnZhbDtcblx0XHR2YXIgYWEgPSAwO1xuXHRcdGltZy5zcmMgPSBiZztcblx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMDtcblxuXHRcdGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHRcdGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHQvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuXHRcdFxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGggKiAxLjU7XG5cdFx0aW1nSCA9ICggTWF0aC5yb3VuZChpbWcubmF0dXJhbEhlaWdodCkgKiA5ICkgLyAxNjtcblx0XHRpbWdIID0gTWF0aC5yb3VuZCggaW1nSCApICogMS41O1xuXHRcdC8vIGltZ0ggPSB0aGF0LmdldFJhdGlvKGltZy5uYXR1cmFsV2lkdGgsIGltZy5uYXR1cmFsSGVpZ2h0LCBpbWdXKTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRcdGltZ1cgLT0gKGltZ1cqMC4wMjUpO1xuXHRcdFx0XHRcdGltZ0ggLT0gKGltZ0gqMC4wMjUpO1xuXHRcdFx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgKz0gMC4wNTtcblx0XHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChpbnRlcnZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDEwMDAvNjApXG5cdFx0fSwgMzAwKTtcblx0XHRcblx0fSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuYWRkS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdGlmICggdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKGtsYXNzKSA+IC0xICkgcmV0dXJuIDtcblx0dGFyZ2V0LmNsYXNzTmFtZSArPSAnICcgKyBrbGFzcztcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZW1vdmVLbGFzcyA9IGZ1bmN0aW9uICggdGFyZ2V0LCBrbGFzcyApIHtcblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoa2xhc3MpO1xuXHR0YXJnZXQuY2xhc3NOYW1lID0gdWkudXRpbC50cmltKCB0YXJnZXQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlZ2V4cCwgXCJcIiApICk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3ZpZGVvLXBsYXllci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=