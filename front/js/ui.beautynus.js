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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTU1NjU2OGYwNDY4NjBiZjM2MmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsb2FkaW5nQ29tcGxldGUiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbWFnZVByZWxvYWRlciIsImltZyIsImNsYXNzTmFtZSIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInRvZ2dsZUdyb3VwIiwiZ3JvdXAiLCJlbGVtZW50IiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJpdGVtIiwidmFsdWUiLCJzZWxlY3QiLCJsYWJlbCIsInRoYXQiLCJnZXQiLCJ0ZXh0Iiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJ0cmlnZ2VyIiwiYmVhdXR5bnVzIiwiY2FyZE5ld3MiLCJkZWZhdWx0T3B0aW9ucyIsImRpcmVjdGlvbiIsImxvb3AiLCJwYWdpbmF0aW9uIiwicGFnaW5hdGlvblR5cGUiLCJpbml0Iiwic2NvcGUiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaGFzQ2xhc3MiLCJzaWJsaW5ncyIsInNjcm9sbFRvcCIsInBvc2l0aW9uIiwidG9wIiwiam9pbiIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJxc2EiLCJxcyIsImRvbSIsInMiLCJkb21BbGwiLCJtYWtlRG9tIiwiYXR0ciIsImtleXMiLCJwdXRUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJwcmVwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFwcGVuZCIsImFwcGVuZENoaWxkIiwibWVudURhdGEiLCJkZXB0aDEiLCJkZXB0aDIiLCJsaW5rcyIsInRpdGxlIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJjIiwiaXAiLCJpYyIsIm1lbnVUcmlnZ2VyIiwiY3RybENsYXNzIiwiY29uZGl0aW9uIiwiYWRkIiwiYUhSRUYiLCJkaW1tIiwiVmlkZW9QbGF5ZXIiLCJ3cmFwcGVyIiwiZW5kZWRDYWxsYmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsInN0YXJ0VGltZSIsImR1cmF0aW9uIiwiTWF0aCIsInJvdW5kIiwiY29udHJvbFRpbWVyIiwicG9zdGVyIiwiY29udHJvbCIsImJnIiwicGxheUJ0biIsInBhdXNlQnRuIiwidmlkZW9UaW1lIiwidGltZWxpbmUiLCJmdWxsQnRuIiwiZW5kVGltZSIsInNlZWtiYXIiLCJidG5Hcm91cCIsImFjdGl2ZUJ0biIsIm1vYmlsZU5ldHdvcmsiLCJhbGVydE1vYmlsZSIsInBsYXlQYXVzZUZsYWciLCJ3YXJuIiwicG9zdGVyTG9hZGVkIiwiX3VubG9hZCIsIl9zaXplIiwiX2luaXQiLCJwcm90b3R5cGUiLCJhZGRLbGFzcyIsImZvckVhY2giLCJidG4iLCJpbmRleCIsInJlbW92ZUtsYXNzIiwibW9iaWxlTmV0d29ya0NoZWNrIiwiX3BsYXkiLCJ3IiwiaCIsInN0eWxlIiwiaGVpZ2h0IiwiYm9keSIsIm9udW5sb2FkIiwiYWxlcnQiLCJkaXNwbGF5IiwidiIsImhpZGUiLCJyZXNvbHV0aW9uQ2hvaWNlIiwiX29uUGxheSIsIl9vblBhdXNlIiwiX29uVGltZVVwZGF0ZSIsIl9jbGljayIsIl9mdWxsc2NycmVuTW9kZSIsIl9wYXVzZSIsIm1ha2VTZWVrYmFyIiwiY29udHJvbEV2ZW50IiwiZGltbUNsaWNrIiwib25sb2FkIiwibmV0d29ya1N0YXRlIiwib25sb2Fkc3RhcnQiLCJvbmxvYWRlZGRhdGEiLCJvbmxvYWRlZG1ldGFkYXRhIiwib25hbmltYXRpb25lbmQiLCJvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UiLCJ3ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiIsImVuZGVkIiwic2V0VGltZW91dCIsInBsYXlQYXVzZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBsYXlpbmciLCJvbnBhdXNlIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsImRvY3VtZXQiLCJnZXRSYXRpbyIsIngiLCJ5IiwibCIsImdldER1cmF0aW9uIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJtIiwidG9TdHJpbmciLCJpbm5lclRleHQiLCJjbGVhckludGVydmFsIiwiX2Vycm9yIiwiZXJyb3JUeXBlIiwiYWxsb2NhdGVTaXplIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwib250aW1ldXBkYXRlIiwicGF1c2VkIiwiZ2V0Q3VycmVudFRpbWUiLCJzbGlkZXIiLCJyYW5nZSIsInN0YXJ0IiwiZXZlbnQiLCJwYXVzZSIsInNsaWRlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiY3NzIiwibG9hZCIsInZlcmlmeWluZyIsInBhcnNlSW50Iiwic2VlayIsImN0IiwiZHVyIiwiY3RybCIsImNsZWFyVGltZW91dCIsImVsIiwiZGF0YXNldCIsImNhbnZhc1RhZyIsImlkIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIkltYWdlIiwiaW1nVyIsImltZ0giLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJhYSIsImdsb2JhbEFscGhhIiwid2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwidG9GaXhlZCIsImRyYXdJbWFnZSIsImtsYXNzIiwicmVnZXhwIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUY4QjtBQUs5QixLQUFJQSxJQUFJQyxPQUFPRCxDQUFmLEMsQ0FKZ0I7O0FBS2hCLEtBQUlFLE1BQU1ELE1BQVY7QUFBQSxLQUNJRSxNQUFNQyxRQURWOztBQUdBSCxRQUFPSSxLQUFQLEdBQWUsVUFBU0MsR0FBVCxFQUFjO0FBQ3pCLFlBQU9DLFFBQVFDLEdBQVIsQ0FBWUYsR0FBWixDQUFQO0FBQ0gsRUFGRDs7QUFJQTtBQUNBSixLQUFJTyxFQUFKLEdBQVNSLE9BQU9RLEVBQVAsSUFBYTs7QUFFbEI7QUFDQUMsV0FBTTtBQUNGO0FBQ0FDLHdCQUFlLHlCQUFXLENBQUU7O0FBRTVCOztBQUpFLFdBTUZDLE1BQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2hCLGlCQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLG9CQUFPQSxJQUFJQyxPQUFKLENBQVksWUFBWixFQUEwQixFQUExQixDQUFQO0FBQ0gsVUFUQztBQVVGQyxtQkFBVSxvQkFBVztBQUNqQjtBQUNBLGlCQUFJQyxLQUFLQyxVQUFVQyxTQUFuQjtBQUNBLG9CQUFPO0FBQ0hDLHdCQUFPLGlCQUFXO0FBQ2QseUJBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUNkLDZCQUFJLEtBQUtDLFdBQVQsRUFBc0IsT0FBTyxhQUFQLENBQXRCLEtBQ0ssT0FBTyxTQUFQO0FBQ1I7QUFDRCx5QkFBSSxLQUFLQyxHQUFULEVBQWMsT0FBTyxLQUFQO0FBQ2QseUJBQUksQ0FBQyxLQUFLRixPQUFOLElBQWlCLENBQUMsS0FBS0UsR0FBM0IsRUFBZ0MsT0FBTyxXQUFQO0FBQ25DLGtCQVJFO0FBU0hBLHNCQUFLTixHQUFHTyxLQUFILENBQVMsUUFBVCxJQUFxQixJQUFyQixHQUE0QixLQVQ5QjtBQVVISCwwQkFBU0osR0FBR08sS0FBSCxDQUFTLFNBQVQsSUFBc0IsSUFBdEIsR0FBNkIsS0FWbkM7QUFXSEYsOEJBQWFMLEdBQUdPLEtBQUgsQ0FBUyxhQUFULElBQTBCLElBQTFCLEdBQWlDO0FBWDNDLGNBQVA7QUFhSCxVQTFCQztBQTJCRkMscUJBQVksaUJBQWlCdkIsT0FBT3dCO0FBM0JsQzs7QUE4Qk47O0FBakNrQixPQW1DbEJDLFFBQVE7O0FBRUo7QUFDQUMsd0JBQWUseUJBQVc7QUFDdEI7QUFDQSxpQkFBSUMsT0FBT3pCLElBQUkwQixnQkFBSixDQUFxQixHQUFyQixDQUFYO0FBQUEsaUJBQ0lDLE9BQU8sSUFEWDtBQUFBLGlCQUVJQyxPQUFPLElBRlg7QUFHQSxrQkFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsU0FBU0wsS0FBS0ssTUFBOUIsRUFBc0NELElBQUlDLE1BQTFDLEVBQWtERCxHQUFsRCxFQUF1RDtBQUNuREYsd0JBQU9GLEtBQUtJLENBQUwsQ0FBUDtBQUNBRCx3QkFBT0QsS0FBS0ksWUFBTCxDQUFrQixNQUFsQixDQUFQO0FBQ0EscUJBQUl6QixHQUFHQyxJQUFILENBQVFFLElBQVIsQ0FBYW1CLElBQWIsS0FBc0IsR0FBdEIsSUFBNkJBLFFBQVEsSUFBekMsRUFDSUQsS0FBS0ssWUFBTCxDQUFrQixNQUFsQixFQUEwQixxQ0FBMUI7QUFDUDtBQUNKOztBQUVEOztBQWhCSSxXQWtCSkMsYUFBYSx1QkFBVyxDQUV2Qjs7QUFFRDs7QUF0QkksV0F3QkpDLFdBQVcscUJBQVc7QUFDbEIsaUJBQUlDLFNBQVN0QyxFQUFFLGlCQUFGLENBQWI7QUFDQSxpQkFBSXNDLE9BQU9MLE1BQVAsSUFBaUIsQ0FBckIsRUFBd0I7QUFDeEJqQyxlQUFFLGlCQUFGLEVBQXFCdUMsSUFBckIsQ0FBMEIsWUFBVztBQUNqQyxxQkFBSUMsUUFBUXhDLEVBQUUsSUFBRixDQUFaO0FBQ0F3Qyx1QkFBTUMsSUFBTixDQUFXLG1CQUFYLEVBQWdDQyxFQUFoQyxDQUFtQyxRQUFuQyxFQUE2QyxVQUFTQyxDQUFULEVBQVk7QUFDckQseUJBQUlDLFVBQVVELEVBQUVFLE1BQWhCO0FBQ0EseUJBQUtELFFBQVFFLFdBQVIsR0FBc0JGLFFBQVFHLFdBQS9CLElBQWdESCxRQUFRSSxVQUFSLEdBQXFCLEVBQXpFLEVBQThFO0FBQzFFUiwrQkFBTVMsV0FBTixDQUFrQixJQUFsQjtBQUNILHNCQUZELE1BRU87QUFDSFQsK0JBQU1VLFFBQU4sQ0FBZSxJQUFmO0FBQ0g7QUFDSixrQkFQRDtBQVFILGNBVkQ7QUFXSDs7QUFFRDs7QUF4Q0ksV0EwQ0pDLGlCQUFpQix5QkFBU0MsUUFBVCxFQUFtQjtBQUNoQ25ELG9CQUFPb0QsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBVztBQUN2Q0MsZ0NBQWUsb0NBQWYsRUFBcUQsVUFBU0MsR0FBVCxFQUFjO0FBQy9EQSx5QkFBSUMsU0FBSixHQUFnQixxQkFBaEI7QUFDQSx5QkFBSSxPQUFPSixRQUFQLElBQW1CLFVBQXZCLEVBQW1DQTtBQUNuQ3BELHVCQUFFLE1BQUYsRUFBVXlELElBQVYsR0FBaUJDLE9BQWpCLENBQXlCLEVBQUVDLFNBQVMsQ0FBWCxFQUF6QixFQUF5QyxHQUF6QyxFQUE4QyxZQUFXLENBQUUsQ0FBM0Q7QUFDSCxrQkFKRDtBQUtILGNBTkQsRUFNRyxLQU5IO0FBT0g7O0FBRUQ7O0FBcERJLFdBc0RKQyxhQUFhLHFCQUFTQyxLQUFULEVBQWdCQyxPQUFoQixFQUF5QjtBQUNsQzlELGVBQUU2RCxLQUFGLEVBQVNwQixJQUFULENBQWNxQixPQUFkLEVBQXVCcEIsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBVztBQUMxQzFDLG1CQUFFNkQsS0FBRixFQUFTcEIsSUFBVCxDQUFjcUIsT0FBZCxFQUF1QmIsV0FBdkIsQ0FBbUMsUUFBbkM7QUFDQWpELG1CQUFFLElBQUYsRUFBUWtELFFBQVIsQ0FBaUIsUUFBakI7QUFDSCxjQUhEO0FBSUg7O0FBRUQ7O0FBN0RJLFdBK0RKYSxZQUFZLHNCQUFZO0FBQ3BCLGlCQUFJQyxRQUFRaEUsRUFBRSxRQUFGLENBQVo7QUFDQSxpQkFBS2dFLE1BQU0vQixNQUFOLEdBQWUsQ0FBcEIsRUFBd0I7QUFDcEIsc0JBQUssSUFBSUQsSUFBRSxDQUFOLEVBQVNDLFNBQU8rQixNQUFNL0IsTUFBM0IsRUFBbUNELElBQUVDLE1BQXJDLEVBQTZDRCxLQUFHLENBQWhELEVBQW9EO0FBQ2hELHNCQUFDLFVBQVNpQyxDQUFULEVBQVc7QUFDUkQsK0JBQU1FLEVBQU4sQ0FBU0QsQ0FBVCxFQUFZeEIsSUFBWixDQUFpQixZQUFqQixFQUErQkMsRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBVTtBQUNqRDFDLCtCQUFFLElBQUYsRUFBUW1FLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEJDLE1BQTFCO0FBQ0gsMEJBRkQ7QUFHSCxzQkFKRCxFQUlHcEMsQ0FKSDtBQUtIO0FBQ0o7QUFDSixVQTFFRzs7QUE0RUpxQyxxQkFBWSxzQkFBVTtBQUNsQnJFLGVBQUUsbUJBQUYsRUFBdUJ1QyxJQUF2QixDQUE0QixVQUFTK0IsSUFBVCxFQUFlQyxLQUFmLEVBQXFCO0FBQzdDLHFCQUFJQyxTQUFTeEUsRUFBRSxJQUFGLEVBQVF5QyxJQUFSLENBQWEsUUFBYixDQUFiO0FBQUEscUJBQ0lnQyxRQUFRekUsRUFBRSxJQUFGLEVBQVF5QyxJQUFSLENBQWEsT0FBYixDQURaO0FBRUErQix3QkFBTzlCLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFlBQVU7QUFDMUIseUJBQUlnQyxPQUFPMUUsRUFBRSxJQUFGLEVBQVEyRSxHQUFSLENBQVksQ0FBWixDQUFYO0FBQUEseUJBQ0lDLE9BQU9GLEtBQUtHLE9BQUwsQ0FBYUgsS0FBS0ksYUFBbEIsRUFBaUNGLElBRDVDO0FBRUFILDJCQUFNRyxJQUFOLENBQVlBLElBQVo7QUFDSCxrQkFKRCxFQUlHRyxPQUpILENBSVcsUUFKWDtBQUtILGNBUkQ7QUFTSDs7QUF0Rkc7QUFuQ1UsRUFBdEI7O0FBaUlBOzs7QUFHQSxFQUFDLFVBQVMvRSxDQUFULEVBQVk7QUFDVDs7QUFFQSxTQUFJVSxPQUFPRCxHQUFHQyxJQUFkO0FBQUEsU0FDSWdCLFNBQVNqQixHQUFHaUIsTUFEaEI7O0FBR0EsU0FBSXNELFlBQVlBLGFBQWEsRUFBN0I7O0FBRUE7QUFDQSxTQUFJQyxXQUFXO0FBQ1gzQyxpQkFBUSxFQURHOztBQUdYNEMseUJBQWdCO0FBQ1pDLHdCQUFXLFlBREM7QUFFWkMsbUJBQU0sSUFGTTtBQUdaQyx5QkFBWSxvQkFIQTtBQUlaQyw2QkFBZ0I7QUFKSixVQUhMOztBQVVYQyxlQUFNLGNBQVNDLEtBQVQsRUFBZ0JYLE9BQWhCLEVBQXlCO0FBQzNCLGtCQUFLdkMsTUFBTCxHQUFja0QsS0FBZDtBQUNBLGlCQUFJQyxTQUFVLE9BQU9DLE9BQU9ELE1BQWQsSUFBd0IsV0FBekIsR0FBd0N6RixFQUFFMkYsTUFBMUMsR0FBbURELE9BQU9ELE1BQXZFLENBRjJCLENBRW9EO0FBQy9FWix1QkFBVyxPQUFPQSxPQUFQLElBQWtCLFdBQW5CLEdBQWtDLEtBQUtLLGNBQXZDLEdBQXdETyxPQUFPLEVBQVAsRUFBVyxLQUFLUCxjQUFoQixFQUFnQ0wsT0FBaEMsQ0FBbEUsQ0FIMkIsQ0FHaUY7QUFDNUcsa0JBQUtlLE1BQUwsQ0FBWWYsT0FBWjtBQUNILFVBZlU7O0FBaUJYZSxpQkFBUSxnQkFBU2YsT0FBVCxFQUFrQjtBQUN0QjdFLGVBQUUsS0FBS3NDLE1BQVAsRUFBZXVELElBQWYsQ0FBb0IsU0FBcEIsRUFBK0IsSUFBSUMsTUFBSixDQUFXLEtBQUt4RCxNQUFoQixFQUF3QnVDLE9BQXhCLENBQS9CO0FBQ0gsVUFuQlU7O0FBcUJYa0Isa0JBQVMsbUJBQVc7QUFDaEIsb0JBQU8vRixFQUFFLEtBQUtzQyxNQUFQLEVBQWV1RCxJQUFmLENBQW9CLFNBQXBCLENBQVA7QUFDSDs7QUF2QlUsTUFBZjtBQTBCQWIsZUFBVUMsUUFBVixHQUFxQkEsUUFBckI7O0FBRUEsU0FBSWUsWUFBWTtBQUNaMUQsaUJBQVEsRUFESTtBQUVaaUQsZUFBTSxjQUFTakQsTUFBVCxFQUFpQjtBQUNuQixpQkFBSSxPQUFPQSxNQUFQLElBQWlCLFdBQXJCLEVBQ0ksS0FBS0EsTUFBTCxHQUFjLFlBQWQsQ0FESixLQUdJLEtBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNKLGtCQUFLMkQsS0FBTDtBQUNILFVBUlc7QUFTWkEsZ0JBQU8saUJBQVc7QUFDZGpHLGVBQUUsS0FBS3NDLE1BQVAsRUFBZUksRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUEzQixFQUF1QyxZQUFXO0FBQzlDLHFCQUFJNEIsT0FBT3RFLEVBQUUsSUFBRixFQUFRbUUsT0FBUixDQUFnQixPQUFoQixDQUFYO0FBQ0EscUJBQUlHLEtBQUs0QixRQUFMLENBQWMsUUFBZCxDQUFKLEVBQ0k1QixLQUFLckIsV0FBTCxDQUFpQixRQUFqQixFQURKLEtBR0lxQixLQUFLcEIsUUFBTCxDQUFjLFFBQWQsRUFBd0JpRCxRQUF4QixDQUFpQyxPQUFqQyxFQUEwQ2xELFdBQTFDLENBQXNELFFBQXREO0FBQ0pqRCxtQkFBRUMsTUFBRixFQUFVbUcsU0FBVixDQUFvQjlCLEtBQUsrQixRQUFMLEdBQWdCQyxHQUFwQztBQUNILGNBUEQ7QUFRSDtBQWxCVyxNQUFoQjtBQW9CQXRCLGVBQVVnQixTQUFWLEdBQXNCQSxTQUF0Qjs7QUFFQTs7QUFFQS9GLFlBQU8rRSxTQUFQLEdBQW1CQSxTQUFuQjtBQUVILEVBL0RELEVBK0RHaEYsQ0EvREg7O0FBa0VBO0FBQ0FBLEdBQUUsWUFBVzs7QUFFVCxTQUFJVSxPQUFPRCxHQUFHQyxJQUFkO0FBQUEsU0FDSWdCLFNBQVNqQixHQUFHaUIsTUFEaEI7QUFBQSxTQUVJWCxXQUFXTCxLQUFLSyxRQUFMLEVBRmY7O0FBSUFXLFlBQU9DLGFBQVA7QUFDQUQsWUFBT1csU0FBUDs7QUFFQXJDLE9BQUUsTUFBRixFQUFVa0QsUUFBVixDQUFtQixDQUFDbkMsU0FBU0ksS0FBVCxFQUFELEVBQW1CVCxLQUFLYyxVQUF4QixFQUFvQytFLElBQXBDLENBQXlDLEdBQXpDLENBQW5COztBQUVBdkIsZUFBVWdCLFNBQVYsQ0FBb0JULElBQXBCLENBQXlCLFlBQXpCOztBQUVBN0QsWUFBT3lCLGVBQVAsQ0FBdUIsWUFBVztBQUM5QjtBQUNILE1BRkQ7O0FBSUE7QUFDQSxTQUFJcUQsU0FBU3pFLElBQVQsQ0FBYzBFLE9BQWQsQ0FBc0IsTUFBdEIsSUFBZ0MsQ0FBQyxDQUFyQyxFQUF3QztBQUNwQ0MsYUFBSUMsY0FBSjtBQUNBRCxhQUFJRSxhQUFKO0FBQ0g7QUFDSixFQXRCRDs7QUF3QkE7OztBQUdBM0csUUFBT3FELGNBQVAsR0FBd0IsVUFBU0MsR0FBVCxFQUFjSCxRQUFkLEVBQXdCO0FBQzVDLFNBQUl5RCxTQUFTekcsU0FBUzBHLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBRCxZQUFPRSxHQUFQLEdBQWF4RCxHQUFiOztBQUVBc0QsWUFBT3hELGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQVc7QUFDdkMsYUFBSSxPQUFPRCxRQUFQLElBQW1CLFVBQXZCLEVBQW1DQSxTQUFTeUQsTUFBVDtBQUN0QyxNQUZELEVBRUcsS0FGSDtBQUdILEVBUEQsQzs7Ozs7O0FDaFBBLDBDOzs7Ozs7Ozs7Ozs7O0tDQU8zRyxHLEdBQXNCRCxNO0tBQWpCRSxHLEdBQXlCQyxRO0tBQXBCNEcsRyxHQUE4QixrQjtLQUF6QkMsRSxHQUE2QyxlOzs7QUFFbkUsS0FDQ0MsTUFBTyxTQUFQQSxHQUFPO0FBQUEsU0FBSzlHLFNBQVM2RyxFQUFULEVBQWFFLENBQWIsQ0FBTDtBQUFBLEVBRFI7QUFBQSxLQUVDQyxTQUFVLFNBQVZBLE1BQVU7QUFBQSxTQUFLaEgsU0FBUzRHLEdBQVQsRUFBY0csQ0FBZCxDQUFMO0FBQUEsRUFGWDtBQUFBLEtBR0NFLFVBQVUsU0FBVkEsT0FBVSxDQUFDRixDQUFELEVBQUlHLElBQUosRUFBYTtBQUN0QixNQUFJSixNQUFNOUcsU0FBUzBHLGFBQVQsQ0FBdUJLLENBQXZCLENBQVY7QUFDQSxNQUFLLFFBQU9HLElBQVAseUNBQU9BLElBQVAsTUFBZSxRQUFmLElBQTJCNUIsT0FBTzZCLElBQVAsQ0FBWUQsSUFBWixFQUFrQnJGLE1BQWxCLEdBQTJCLENBQTNELEVBQ0MsS0FBTSxJQUFJRCxDQUFWLElBQWVzRixJQUFmO0FBQ0NKLE9BQUkvRSxZQUFKLENBQWlCSCxDQUFqQixFQUFvQnNGLEtBQUt0RixDQUFMLENBQXBCO0FBREQsR0FFRCxPQUFPa0YsR0FBUDtBQUNBLEVBVEY7QUFBQSxLQVVDTSxVQUFVLFNBQVZBLE9BQVU7QUFBQSxTQUFLcEgsU0FBU3FILGNBQVQsQ0FBd0JOLENBQXhCLENBQUw7QUFBQSxFQVZYO0FBQUEsS0FXQ08sVUFBVSxTQUFWQSxPQUFVLENBQUNwRCxJQUFELEVBQU96QixNQUFQO0FBQUEsU0FBa0JBLE9BQU84RSxZQUFQLENBQW9CckQsSUFBcEIsRUFBMEJ6QixPQUFPK0UsVUFBUCxDQUFrQixDQUFsQixDQUExQixDQUFsQjtBQUFBLEVBWFg7QUFBQSxLQVlDQyxTQUFVLFNBQVZBLE1BQVUsQ0FBQ3ZELElBQUQsRUFBT3pCLE1BQVA7QUFBQSxTQUFrQkEsT0FBT2lGLFdBQVAsQ0FBbUJ4RCxJQUFuQixDQUFsQjtBQUFBLEVBWlg7O0FBY0EsS0FBTXlELFdBQVcsQ0FDaEI7QUFDQ0MsVUFBUSxJQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxJQURSO0FBRUNwRyxTQUFNLHlCQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETSxFQU1OO0FBQ0NELFVBQU8sVUFEUjtBQUVDcEcsU0FBTSw0QkFGUDtBQUdDcUcsYUFBVTtBQUhYLEdBTk07QUFIUixFQURnQixFQWlCaEI7QUFDQ0osVUFBUSxLQURUO0FBRUNDLFVBQVEsTUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxNQURSO0FBRUNwRyxTQUFNLHNDQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETSxFQU1OO0FBQ0NELFVBQU8sZUFEUjtBQUVDcEcsU0FBTSw2QkFGUDtBQUdDcUcsYUFBVTtBQUhYLEdBTk07QUFIUixFQWpCZ0IsRUFpQ2hCO0FBQ0NKLFVBQVEsS0FEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sb0JBRFI7QUFFQ3BHLFNBQU0sZ0RBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0QsVUFBTyxxQkFEUjtBQUVDcEcsU0FBTSwyREFGUDtBQUdDcUcsYUFBVTtBQUhYLEdBTk0sRUFXTjtBQUNDRCxVQUFPLGNBRFI7QUFFQ3BHLFNBQU0sc0RBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQVhNO0FBSFIsRUFqQ2dCLEVBc0RoQjtBQUNDSixVQUFRLFFBRFQ7QUFFQ0MsVUFBUSxVQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLFNBRFI7QUFFQ3BHLFNBQU0sK0JBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0QsVUFBTyxjQURSO0FBRUNwRyxTQUFNLG1DQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FOTSxFQVdOO0FBQ0NELFVBQU8sa0JBRFI7QUFFQ3BHLFNBQU0sZ0RBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQVhNLEVBZ0JOO0FBQ0NELFVBQU8sa0JBRFI7QUFFQ3BHLFNBQU0sK0NBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQWhCTSxFQXFCTjtBQUNDRCxVQUFPLFdBRFI7QUFFQ3BHLFNBQU0sMkNBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQXJCTSxFQTBCTjtBQUNDRCxVQUFPLGdCQURSO0FBRUNwRyxTQUFNLDBDQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0ExQk0sRUErQk47QUFDQ0QsVUFBTyx1QkFEUjtBQUVDcEcsU0FBTSx3Q0FGUDtBQUdDcUcsYUFBVTtBQUhYLEdBL0JNO0FBSFIsRUF0RGdCLEVBK0ZoQjtBQUNDSixVQUFRLE9BRFQ7QUFFQ0MsVUFBUSxJQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLFdBRFI7QUFFQ3BHLFNBQU0sbUNBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0QsVUFBTyxVQURSO0FBRUNwRyxTQUFNLG9DQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FOTTtBQUhSLEVBL0ZnQixFQStHaEI7QUFDQ0osVUFBUSxNQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxPQURSO0FBRUNwRyxTQUFNLDZCQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETTtBQUhSLEVBL0dnQixFQTBIaEI7QUFDQ0osVUFBUSxPQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxNQURSO0FBRUNwRyxTQUFNLCtCQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETTtBQUhSLEVBMUhnQixFQXFJaEI7QUFDQ0osVUFBUSxNQURUO0FBRUNDLFVBQVEsTUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxTQURSO0FBRUNwRyxTQUFNLDJCQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETTtBQUhSLEVBcklnQixFQWdKaEI7QUFDQ0osVUFBUSxLQURUO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxJQURSO0FBRUNwRyxTQUFNLDBCQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETTtBQUhSLEVBaEpnQixFQTJKaEI7QUFDQ0osVUFBTyxPQURSO0FBRUNDLFVBQVEsRUFGVDtBQUdDQyxTQUFPLENBQ047QUFDQ0MsVUFBTyxPQURSO0FBRUNwRyxTQUFNLCtCQUZQO0FBR0NxRyxhQUFVO0FBSFgsR0FETSxFQU1OO0FBQ0NELFVBQU8sV0FEUjtBQUVDcEcsU0FBTSxxQ0FGUDtBQUdDcUcsYUFBVTtBQUhYLEdBTk0sRUFXTjtBQUNDRCxVQUFPLE9BRFI7QUFFQ3BHLFNBQU0sZ0NBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQVhNLEVBZ0JOO0FBQ0NELFVBQU8sY0FEUjtBQUVDcEcsU0FBTSx5Q0FGUDtBQUdDcUcsYUFBVTtBQUhYLEdBaEJNLEVBcUJOO0FBQ0NELFVBQU8sY0FEUjtBQUVDcEcsU0FBTSxrQ0FGUDtBQUdDcUcsYUFBVTtBQUhYLEdBckJNLEVBMEJOO0FBQ0NELFVBQU8sTUFEUjtBQUVDcEcsU0FBTSwyQ0FGUDtBQUdDcUcsYUFBVTtBQUhYLEdBMUJNO0FBSFIsRUEzSmdCLEVBK0xoQjtBQUNDSixVQUFRLEVBRFQ7QUFFQ0MsVUFBUSxNQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLGVBRFI7QUFFQ3BHLFNBQU0sbUNBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQURNO0FBSFIsRUEvTGdCLEVBME1oQjtBQUNDSixVQUFRLE1BRFQ7QUFFQ0MsVUFBUSxFQUZUO0FBR0NDLFNBQU8sQ0FDTjtBQUNDQyxVQUFPLE1BRFI7QUFFQ3BHLFNBQU0sbUNBRlA7QUFHQ3FHLGFBQVU7QUFIWCxHQURNO0FBSFIsRUExTWdCLENBQWpCOztBQXdOQSxLQUFJQyxXQUFXTixTQUFTTyxNQUFULENBQWdCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQUEsTUFDbkNSLE1BRG1DLEdBQ1ZRLENBRFUsQ0FDbkNSLE1BRG1DO0FBQUEsTUFDM0JDLE1BRDJCLEdBQ1ZPLENBRFUsQ0FDM0JQLE1BRDJCO0FBQUEsTUFDbkJDLEtBRG1CLEdBQ1ZNLENBRFUsQ0FDbkJOLEtBRG1COztBQUV4QyxVQUFVSyxLQUFLLEVBQWYsY0FDRVAsd0JBQXNCQSxNQUF0QixzQkFERixjQUVFQyxVQUFVLEVBQVYsR0FBZUEsTUFBZixrQkFBcUNBLE1BQXJDLGlCQUZGLGlCQUdNQyxNQUFNSSxNQUFOLENBQWEsVUFBQ0csRUFBRCxFQUFLQyxFQUFMLEVBQVk7QUFBQSxPQUN4QlAsS0FEd0IsR0FDQ08sRUFERCxDQUN4QlAsS0FEd0I7QUFBQSxPQUNqQnBHLElBRGlCLEdBQ0MyRyxFQURELENBQ2pCM0csSUFEaUI7QUFBQSxPQUNYcUcsUUFEVyxHQUNDTSxFQURELENBQ1hOLFFBRFc7O0FBRTdCLFdBQVVLLE1BQU0sRUFBaEIsbUJBQ0lMLFdBQVcsYUFBWCxHQUEyQixFQUQvQixtQkFDOENyRyxJQUQ5QyxVQUN1RG9HLEtBRHZEO0FBQ3dFLEdBSHBFLEVBR3NFLENBSHRFLENBSE47QUFTQSxFQVhjLEVBV1osQ0FYWSxDQUFmOztBQWFBO0FBQ0FsSSxRQUFPeUcsR0FBUCxHQUFhO0FBQ1pFLGlCQUFlLHlCQUFVO0FBQ3hCLE9BQUkrQixrR0FBSjs7QUFJQyxPQUFLM0ksRUFBRSxxQkFBRixFQUF5QmlDLE1BQXpCLElBQW1DLENBQXhDLEVBQTJDO0FBQzFDakMsTUFBRSxPQUFGLEVBQVcwSCxPQUFYLENBQW1CaUIsV0FBbkI7QUFDQTs7QUFFRDNJLEtBQUUsZUFBRixFQUFtQjBDLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQVk7QUFDMUMsUUFBSTJGLFdBQVdySSxFQUFFLFlBQUYsQ0FBZjtBQUFBLFFBQ0k0SSxZQUFZLFdBRGhCO0FBQUEsUUFFSUMsWUFBWVIsU0FBU25DLFFBQVQsQ0FBbUIwQyxTQUFuQixDQUZoQjtBQUdBLFFBQUlDLFNBQUosRUFBZTtBQUNkUixjQUFTUyxHQUFULENBQWE5SSxFQUFFLElBQUYsQ0FBYixFQUFzQmlELFdBQXRCLENBQW1DMkYsU0FBbkM7QUFDQSxLQUZELE1BRU87QUFDTlAsY0FBU1MsR0FBVCxDQUFhOUksRUFBRSxJQUFGLENBQWIsRUFBc0JrRCxRQUF0QixDQUFnQzBGLFNBQWhDO0FBQ0E7QUFDRCxJQVREO0FBVUQ7O0FBRUQ7QUF0QlksSUF1QlhqQyxnQkFBZ0IsMEJBQVU7O0FBRTFCLE9BQUszRyxFQUFFLE9BQUYsRUFBV2lDLE1BQVgsSUFBcUIsQ0FBMUIsRUFBOEI7QUFDN0JvRyxlQUFXckksRUFBRSxpQkFBRixFQUFxQjZILE1BQXJCLENBQTZCN0gsRUFBRSxzQ0FBRixFQUEwQzZILE1BQTFDLENBQWtEUSxRQUFsRCxDQUE3QixDQUFYO0FBQ0FySSxNQUFFLE9BQUYsRUFBV2lDLE1BQVgsSUFBcUIsQ0FBckIsR0FBeUJqQyxFQUFFLE1BQUYsRUFBVTBILE9BQVYsQ0FBbUJXLFFBQW5CLENBQXpCLEdBQXlEckksRUFBRSxPQUFGLEVBQVcwSCxPQUFYLENBQW9CVyxRQUFwQixDQUF6RDtBQUNBO0FBQ0RySSxLQUFFLFlBQUYsRUFBZ0J5QyxJQUFoQixDQUFxQixHQUFyQixFQUEwQkYsSUFBMUIsQ0FBK0IsWUFBVTtBQUN4QyxRQUFJd0csUUFBUS9JLEVBQUUsSUFBRixFQUFRc0gsSUFBUixDQUFhLE1BQWIsQ0FBWjtBQUNBLFFBQUt5QixNQUFNdEMsT0FBTixDQUFjLE1BQWQsS0FBeUIsQ0FBQyxDQUEvQixFQUFtQztBQUNsQ3pHLE9BQUUsSUFBRixFQUFRc0gsSUFBUixDQUFhLE1BQWIsRUFBcUJ5QixRQUFRLE1BQTdCO0FBQ0E7QUFDRCxJQUxEO0FBTUEsR0FuQ1c7QUFvQ1hDLFFBQU0sY0FBUzFJLEdBQVQsRUFBYTtBQUNuQkEsU0FBTUEsT0FBTyxXQUFiO0FBQ0FOLEtBQUUsTUFBRixFQUFVNkgsTUFBVixDQUNDN0gsRUFBRSxzQkFBRixFQUEwQjZILE1BQTFCLENBQ0M3SCxhQUFXTSxHQUFYLHVEQURELENBREQ7QUFLQU4sS0FBRSxPQUFGLEVBQVcwQyxFQUFYLENBQWMsT0FBZCxFQUF1QixRQUF2QixFQUFpQyxZQUFVO0FBQzFDMUMsTUFBRSxPQUFGLEVBQVdvRSxNQUFYO0FBQ0EsSUFGRDtBQUdBO0FBOUNXLEVBQWIsQzs7Ozs7Ozs7QUN0UEE7Ozs7Ozs7Ozs7Ozs7OztBQWVBbkUsUUFBT2dKLFdBQVAsR0FBcUIsVUFBVXBFLE9BQVYsRUFBb0I7QUFDeEM7QUFDQSxNQUFLLEVBQUUsZ0JBQWdCb0UsV0FBbEIsQ0FBTCxFQUFzQyxPQUFPLElBQUlBLFdBQUosQ0FBZ0JDLE9BQWhCLEVBQXlCQyxhQUF6QixDQUFQO0FBQ3RDLE9BQUtELE9BQUwsR0FBaUI5SSxTQUFTZ0osYUFBVCxDQUF1QnZFLFFBQVFxRSxPQUEvQixDQUFqQjtBQUNBLE9BQUtHLGNBQUwsR0FBc0IsS0FBS0gsT0FBTCxDQUFhRSxhQUFiLENBQTJCLHNCQUEzQixDQUF0QixFQUNBLEtBQUtFLEtBQUwsR0FBZ0IsSUFEaEIsRUFFQSxLQUFLQyxNQUFMLEdBQWdCdkosRUFBRSxLQUFLa0osT0FBUCxFQUFnQnpHLElBQWhCLENBQXFCLGdCQUFyQixFQUF1Q2tDLEdBQXZDLENBQTJDLENBQTNDLENBRmhCO0FBR0EsT0FBSzZFLE9BQUwsR0FBaUJ4SixFQUFFLEtBQUtrSixPQUFQLEVBQWdCekcsSUFBaEIsQ0FBcUIsaUJBQXJCLEVBQXdDa0MsR0FBeEMsQ0FBNEMsQ0FBNUMsQ0FBakI7QUFDQSxPQUFLOEUsUUFBTCxHQUFrQixJQUFsQjtBQUNBLE9BQUtDLE9BQUwsR0FBa0IsWUFBVTtBQUMzQixPQUFLN0UsUUFBUThFLFNBQVIsSUFBcUI5RSxRQUFRK0UsUUFBbEMsRUFBNkMsT0FBTyxDQUFQO0FBQzdDLE9BQUlELFlBQVk5RSxRQUFROEUsU0FBUixHQUFvQkUsS0FBS0MsS0FBTCxDQUFXakYsUUFBUThFLFNBQVIsR0FBb0IsSUFBL0IsQ0FBcEIsR0FBMkQsQ0FBM0U7QUFDQSxVQUFPQSxTQUFQO0FBQ0EsR0FKZ0IsRUFBakI7QUFLQSxPQUFLSSxZQUFMLEdBQXFCLElBQXJCO0FBQ0EsT0FBS0MsTUFBTCxHQUFnQixLQUFLZCxPQUFMLENBQWFFLGFBQWIsQ0FBMkIsU0FBM0IsQ0FBaEI7QUFDQSxPQUFLYSxPQUFMLEdBQWlCLEtBQUtmLE9BQUwsQ0FBYUUsYUFBYixDQUEyQixVQUEzQixDQUFqQjtBQUNBLE9BQUtjLEVBQUwsR0FBYSxLQUFLRCxPQUFMLENBQWFiLGFBQWIsQ0FBMkIsS0FBM0IsQ0FBYjtBQUNBLE9BQUtlLE9BQUwsR0FBaUIsS0FBS0YsT0FBTCxDQUFhYixhQUFiLENBQTJCLGFBQTNCLENBQWpCO0FBQ0EsT0FBS2dCLFFBQUwsR0FBa0IsS0FBS0gsT0FBTCxDQUFhYixhQUFiLENBQTJCLGNBQTNCLENBQWxCO0FBQ0EsT0FBS2lCLFNBQUwsR0FBbUIsS0FBS0osT0FBTCxDQUFhYixhQUFiLENBQTJCLGVBQTNCLENBQW5CO0FBQ0EsT0FBS2tCLFFBQUwsR0FBa0IsS0FBS0wsT0FBTCxDQUFhYixhQUFiLENBQTJCLFdBQTNCLENBQWxCO0FBQ0EsT0FBS21CLE9BQUwsR0FBaUIsS0FBS04sT0FBTCxDQUFhYixhQUFiLENBQTJCLE9BQTNCLENBQWpCO0FBQ0EsT0FBS08sU0FBTCxHQUFtQixLQUFLVyxRQUFMLENBQWNsQixhQUFkLENBQTRCLFVBQTVCLENBQW5CO0FBQ0EsT0FBS29CLE9BQUwsR0FBaUIsS0FBS0YsUUFBTCxDQUFjbEIsYUFBZCxDQUE0QixNQUE1QixDQUFqQjtBQUNBLE9BQUtxQixPQUFMLEdBQWlCLEtBQUtSLE9BQUwsQ0FBYWIsYUFBYixDQUEyQixVQUEzQixDQUFqQjtBQUNBLE9BQUtzQixRQUFMLEdBQWtCMUssRUFBRSxLQUFLaUssT0FBUCxFQUFnQnhILElBQWhCLENBQXFCLFlBQXJCLENBQWxCO0FBQ0EsT0FBS2tJLFNBQUwsR0FBbUIsS0FBS0QsUUFBTCxDQUFjakksSUFBZCxDQUFtQixlQUFuQixDQUFuQjtBQUNBLE9BQUttSSxhQUFMLEdBQXFCL0YsUUFBUStGLGFBQTdCO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixLQUFLM0IsT0FBTCxDQUFhRSxhQUFiLENBQTJCLGVBQTNCLENBQW5CO0FBQ0EsT0FBSzBCLGFBQUwsR0FBc0IsT0FBdEI7QUFDQSxPQUFLM0IsYUFBTCxHQUFxQixPQUFPdEUsUUFBUXNFLGFBQWYsSUFBZ0MsVUFBaEMsR0FBNkN0RSxRQUFRc0UsYUFBckQsR0FBcUUsWUFBVztBQUNwRzVJLFdBQVF3SyxJQUFSLENBQWEsdUNBQWI7QUFDQSxHQUZEOztBQUlBLE9BQUtDLFlBQUw7QUFDQSxPQUFLQyxPQUFMO0FBQ0EsT0FBS0MsS0FBTDtBQUNBLE9BQUtDLEtBQUw7QUFFQSxFQXhDRDs7QUEwQ0FsQyxhQUFZbUMsU0FBWixDQUFzQkQsS0FBdEIsR0FBOEIsWUFBVztBQUN4QyxNQUFJekcsT0FBTyxJQUFYOztBQUVBQSxPQUFLMkcsUUFBTCxDQUFlM0csS0FBSzJFLGNBQXBCLEVBQW9DLFFBQXBDOztBQUVBLEdBQUMzRSxLQUFLeUYsT0FBTixFQUFlekYsS0FBSzBGLFFBQXBCLEVBQThCa0IsT0FBOUIsQ0FBc0MsVUFBU0MsR0FBVCxFQUFjQyxLQUFkLEVBQW9CO0FBQ3pERCxPQUFJbEksZ0JBQUosQ0FBcUIsWUFBckIsRUFBbUMsWUFBVTtBQUM1Q3FCLFNBQUsyRyxRQUFMLENBQWMsSUFBZCxFQUFvQixXQUFwQjtBQUNBLElBRkQsRUFFRyxLQUZIOztBQUlBRSxPQUFJbEksZ0JBQUosQ0FBcUIsVUFBckIsRUFBaUMsWUFBVTtBQUMxQ3FCLFNBQUsrRyxXQUFMLENBQWlCLElBQWpCLEVBQXVCLFdBQXZCO0FBQ0EsSUFGRCxFQUVHLEtBRkg7QUFHQSxHQVJEOztBQVVBL0csT0FBS3lGLE9BQUwsQ0FBYTlHLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQVc7QUFDakQsT0FBS3FCLEtBQUtrRyxhQUFWLEVBQTBCO0FBQ3pCbEcsU0FBS2tHLGFBQUwsR0FBcUIsS0FBckI7QUFDQWxHLFNBQUtnSCxrQkFBTDtBQUNBLElBSEQsTUFHTztBQUNOaEgsU0FBS2lILEtBQUw7QUFDQTtBQUNELEdBUEQsRUFPRyxLQVBIO0FBUUEsRUF2QkQ7O0FBeUJBMUMsYUFBWW1DLFNBQVosQ0FBc0JGLEtBQXRCLEdBQThCLFlBQVc7QUFDeEMsTUFBSVUsSUFBSS9CLEtBQUtDLEtBQUwsQ0FBWSxLQUFLWixPQUFMLENBQWFuRyxXQUF6QixDQUFSO0FBQUEsTUFDQzhJLElBQUksQ0FETDtBQUVBQSxNQUFLLElBQUlELENBQUwsR0FBVSxFQUFkO0FBQ0EsT0FBSzFDLE9BQUwsQ0FBYTRDLEtBQWIsQ0FBbUJDLE1BQW5CLEdBQTRCbEMsS0FBS0MsS0FBTCxDQUFXK0IsQ0FBWCxJQUFnQixJQUE1QztBQUNBLEVBTEQ7O0FBT0E1QyxhQUFZbUMsU0FBWixDQUFzQkgsT0FBdEIsR0FBZ0MsWUFBWTtBQUMzQzdLLFdBQVM0TCxJQUFULENBQWNDLFFBQWQsR0FBeUIsWUFBVTtBQUNsQzFMLFdBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7O0FBTUF5SSxhQUFZbUMsU0FBWixDQUFzQk0sa0JBQXRCLEdBQTJDLFlBQVk7QUFDdEQsTUFBSWhILE9BQU8sSUFBWDtBQUFBLE1BQ0N3SCxRQUFReEgsS0FBS21HLFdBRGQ7QUFFQW5HLE9BQUsyRyxRQUFMLENBQWNhLEtBQWQsRUFBcUIsUUFBckI7QUFDQXhILE9BQUt1RixPQUFMLENBQWE2QixLQUFiLENBQW1CSyxPQUFuQixHQUE2QixNQUE3QjtBQUNBRCxRQUFNOUMsYUFBTixDQUFvQixXQUFwQixFQUFpQy9GLGdCQUFqQyxDQUFrRCxPQUFsRCxFQUEyRCxZQUFVO0FBQ3BFcUIsUUFBS2lILEtBQUw7QUFDQWpILFFBQUsrRyxXQUFMLENBQWlCUyxLQUFqQixFQUF3QixRQUF4QjtBQUNBLEdBSEQsRUFHRyxLQUhIO0FBSUEsRUFURDs7QUFXQWpELGFBQVltQyxTQUFaLENBQXNCTyxLQUF0QixHQUE4QixZQUFVO0FBQ3ZDLE1BQUlqSCxPQUFPLElBQVg7QUFBQSxNQUNDMEgsSUFBSSxJQURMOztBQUdBMUgsT0FBSzJHLFFBQUwsQ0FBZTNHLEtBQUsyRSxjQUFwQixFQUFvQyxRQUFwQzs7QUFFQSxNQUFLM0UsS0FBSytFLFFBQVYsRUFBcUI7QUFDcEIvRSxRQUFLK0UsUUFBTCxHQUFnQixLQUFoQjtBQUNBekosS0FBRTBFLEtBQUt1RixPQUFQLEVBQWdCb0MsSUFBaEI7QUFDQSxPQUFLM0gsS0FBSzRFLEtBQUwsSUFBYyxJQUFuQixFQUEwQjVFLEtBQUs0SCxnQkFBTDs7QUFFMUJGLE9BQUkxSCxLQUFLNEUsS0FBVDtBQUNBOztBQUVBNUUsUUFBSzZILE9BQUw7QUFDQTdILFFBQUs4SCxRQUFMO0FBQ0E5SCxRQUFLK0gsYUFBTDtBQUNBL0gsUUFBS2dJLE1BQUw7QUFDQWhJLFFBQUtpSSxlQUFMO0FBQ0FqSSxRQUFLa0ksTUFBTDtBQUNBbEksUUFBS21JLFdBQUw7QUFDQW5JLFFBQUtvSSxZQUFMO0FBQ0FwSSxRQUFLcUksU0FBTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFYLEtBQUVZLE1BQUYsR0FBVyxZQUFVO0FBQ3BCek0sWUFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0I0TCxFQUFFYSxZQUF4QjtBQUNBLElBRkQ7QUFHQWIsS0FBRWMsV0FBRixHQUFnQixZQUFVO0FBQ3pCO0FBQ0EsSUFGRDtBQUdBZCxLQUFFZSxZQUFGLEdBQWlCLFlBQVU7QUFDMUI1TSxZQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQjRMLEVBQUVhLFlBQTVCO0FBQ0EsSUFGRDtBQUdBYixLQUFFZ0IsZ0JBQUYsR0FBcUIsWUFBVTtBQUM5QjdNLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQzRMLEVBQUVhLFlBQWxDO0FBQ0EsSUFGRDs7QUFJQWpOLEtBQUUsTUFBRixFQUFVMEMsRUFBVixDQUFhLGVBQWIsRUFBOEIsWUFBVTtBQUN2Q25DLFlBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsSUFGRDtBQUdBOztBQUVBOztBQUVBa0UsUUFBSzRFLEtBQUwsQ0FBVytELGNBQVgsR0FBNEIsWUFBVztBQUN0QzlNLFlBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBLElBRkQ7O0FBSUFKLFlBQVNrTix3QkFBVCxHQUFvQyxZQUFXO0FBQzlDLFFBQUssQ0FBQ2xCLEVBQUVtQiwwQkFBSCxJQUFpQ25CLEVBQUVvQixLQUF4QyxFQUFnRDtBQUMvQ2pOLGFBQVFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBaU4sZ0JBQVcsWUFBVTtBQUNwQi9JLFdBQUt5RSxhQUFMO0FBQ0EsTUFGRCxFQUVHLEtBRkg7QUFHQTtBQUNELElBUEQ7QUFRQTtBQUNEekUsT0FBS2dKLFNBQUw7O0FBRUE7QUFDQTtBQUNBO0FBRUEsRUFwRUQ7O0FBc0VBekUsYUFBWW1DLFNBQVosQ0FBc0JtQixPQUF0QixHQUFnQyxZQUFVO0FBQ3pDLE1BQUk3SCxPQUFPLElBQVg7O0FBRUFBLE9BQUs0RSxLQUFMLENBQVdxRSxNQUFYLEdBQW9CLFlBQVc7QUFDOUIzTixLQUFFMEUsS0FBS3NGLE1BQVAsRUFBZXFDLElBQWY7QUFDQXJNLEtBQUUwRSxLQUFLMEYsUUFBUCxFQUFpQndELElBQWpCO0FBQ0E1TixLQUFFMEUsS0FBS3lGLE9BQVAsRUFBZ0JrQyxJQUFoQjtBQUNBLE9BQUssS0FBS3dCLFdBQUwsSUFBb0IsQ0FBekIsRUFBNkJuSixLQUFLb0osZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDN0JwSixRQUFLb0csYUFBTCxHQUFxQixNQUFyQjtBQUNBLEdBTkQ7O0FBUUFwRyxPQUFLNEUsS0FBTCxDQUFXeUUsU0FBWCxHQUF1QixZQUFVO0FBQ2hDckosUUFBSytHLFdBQUwsQ0FBaUIvRyxLQUFLMkUsY0FBdEIsRUFBc0MsUUFBdEM7QUFDQSxHQUZEO0FBR0EsRUFkRDs7QUFnQkFKLGFBQVltQyxTQUFaLENBQXNCb0IsUUFBdEIsR0FBaUMsWUFBVTtBQUMxQyxNQUFJOUgsT0FBTyxJQUFYO0FBQUEsTUFDQzBILElBQUkxSCxLQUFLNEUsS0FEVjtBQUVBNUUsT0FBSzRFLEtBQUwsQ0FBVzBFLE9BQVgsR0FBcUIsWUFBVzs7QUFFL0JoTyxLQUFFMEUsS0FBS3VGLE9BQVAsRUFBZ0IyRCxJQUFoQjtBQUNBNU4sS0FBRTBFLEtBQUswRixRQUFQLEVBQWlCaUMsSUFBakI7QUFDQXJNLEtBQUUwRSxLQUFLeUYsT0FBUCxFQUFnQnlELElBQWhCO0FBQ0EsT0FBSSxLQUFLQyxXQUFMLEdBQW1CLENBQXZCLEVBQTBCbkosS0FBS2dHLFFBQUwsQ0FBYzJCLElBQWQ7QUFDMUIzSCxRQUFLb0osZ0JBQUwsQ0FBc0IsS0FBdEI7QUFDQSxPQUFLMUIsRUFBRW9CLEtBQVAsRUFBZTtBQUNkak4sWUFBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxRQUFLNEwsRUFBRW1CLDBCQUFQLEVBQW9DO0FBQ25DaE4sYUFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQWtFLFVBQUs0RSxLQUFMLENBQVdqRyxnQkFBWCxDQUE0QixxQkFBNUIsRUFBbUQsWUFBVTtBQUM1RDlDLGNBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsVUFBSTRMLElBQUkxSCxLQUFLNEUsS0FBYjtBQUNBNUUsV0FBS3lFLGFBQUw7QUFDQSxNQUpELEVBSUcsS0FKSDtBQUtBL0ksY0FBU2lELGdCQUFULENBQTBCLHFCQUExQixFQUFpRCxZQUFVO0FBQzFEOUMsY0FBUUMsR0FBUixDQUFZLFNBQVo7QUFDQSxVQUFJNEwsSUFBSTFILEtBQUs0RSxLQUFiO0FBQ0E1RSxXQUFLeUUsYUFBTDtBQUNBLE1BSkQsRUFJRyxLQUpIO0FBS0EsU0FBS2lELEVBQUU2QixjQUFQLEVBQXdCO0FBQ3ZCMU4sY0FBUUMsR0FBUixDQUFZLENBQVo7QUFDQTRMLFFBQUU2QixjQUFGO0FBQ0EsTUFIRCxNQUdPLElBQUs3QixFQUFFOEIsb0JBQVAsRUFBOEI7QUFDcEMzTixjQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBNEwsUUFBRThCLG9CQUFGO0FBQ0EsTUFITSxNQUdBLElBQUtDLFFBQVFGLGNBQWIsRUFBOEI7QUFDcEMxTixjQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBMk4sY0FBUUYsY0FBUjtBQUNBLE1BSE0sTUFHQSxJQUFLRSxRQUFRRCxvQkFBYixFQUFtQztBQUN6QzNOLGNBQVFDLEdBQVIsQ0FBWSxDQUFaO0FBQ0EyTixjQUFRRCxvQkFBUjtBQUNBO0FBQ0QsS0F6QkQsTUF5Qk87QUFDTixTQUFLOUIsRUFBRW9CLEtBQVAsRUFBZTlJLEtBQUt5RSxhQUFMO0FBQ2Y7QUFFRDtBQUNELEdBdkNEO0FBd0NBLEVBM0NEOztBQTZDQUYsYUFBWW1DLFNBQVosQ0FBc0JnRCxRQUF0QixHQUFpQyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQjtBQUNsRCxNQUFJN0osT0FBTyxJQUFYO0FBQ0EsTUFBSTdCLFNBQVMsQ0FBYjtBQUNBQSxXQUFTZ0gsS0FBS0MsS0FBTCxDQUFZd0UsSUFBSUMsQ0FBTCxHQUFVRixDQUFyQixDQUFUO0FBQ0EsU0FBT3hMLE1BQVA7QUFDQSxFQUxEOztBQU9Bb0csYUFBWW1DLFNBQVosQ0FBc0JvRCxXQUF0QixHQUFvQyxZQUFXO0FBQzlDLE1BQUk5SixPQUFPLElBQVg7QUFDQSxNQUFJNEUsUUFBUXRKLEVBQUUwRSxLQUFLd0UsT0FBUCxFQUFnQnpHLElBQWhCLENBQXFCLGVBQXJCLEVBQXNDeUIsRUFBdEMsQ0FBeUMsQ0FBekMsRUFBNENTLEdBQTVDLENBQWdELENBQWhELENBQVo7QUFDQXBFLFVBQVFDLEdBQVIsQ0FBWThJLEtBQVo7QUFDQSxNQUFJbUYsUUFBUUMsWUFBWSxZQUFXO0FBQ2xDLE9BQUlwRixNQUFNcUYsVUFBTixHQUFtQixDQUF2QixFQUEwQjtBQUN6QmpLLFNBQUsrRyxXQUFMLENBQWtCL0csS0FBSzJFLGNBQXZCLEVBQXVDLFFBQXZDO0FBQ0EsUUFBSU8sV0FBV0MsS0FBS0MsS0FBTCxDQUFXUixNQUFNTSxRQUFqQixDQUFmO0FBQUEsUUFDQ3pDLElBQUksRUFETDtBQUFBLFFBRUN5SCxJQUFJLEVBRkw7QUFHQXpILFFBQUksQ0FBQ3lDLFdBQVcsRUFBWixFQUFnQmlGLFFBQWhCLEVBQUosRUFDQUQsSUFBSSxDQUFDLENBQUNoRixXQUFXekMsQ0FBWixJQUFpQixFQUFsQixFQUFzQjBILFFBQXRCLEVBREo7QUFFQTFILFFBQUlBLEVBQUVsRixNQUFGLEdBQVcsQ0FBWCxHQUFlLElBQUlrRixDQUFuQixHQUF1QkEsQ0FBM0I7QUFDQXlILFFBQUlBLEVBQUUzTSxNQUFGLEdBQVcsQ0FBWCxHQUFlLElBQUkyTSxDQUFuQixHQUF1QkEsQ0FBM0I7QUFDQWxLLFNBQUsyRixTQUFMLENBQWV5RSxTQUFmLEdBQTJCRixJQUFJLEdBQUosR0FBVXpILENBQXJDO0FBQ0F6QyxTQUFLOEYsT0FBTCxDQUFhc0UsU0FBYixHQUF5QkYsSUFBSSxHQUFKLEdBQVV6SCxDQUFuQztBQUNBNEgsa0JBQWNOLEtBQWQ7QUFDQTtBQUNBO0FBQ0QsR0FmVyxFQWVULEdBZlMsQ0FBWjtBQWdCQSxFQXBCRDs7QUFzQkF4RixhQUFZbUMsU0FBWixDQUFzQjRELE1BQXRCLEdBQStCLFVBQVVDLFNBQVYsRUFBc0I7QUFDcEQ7QUFDQSxFQUZEOztBQUlBaEcsYUFBWW1DLFNBQVosQ0FBc0I4RCxZQUF0QixHQUFxQyxVQUFTOUMsQ0FBVCxFQUFXO0FBQy9DLE1BQUkxSCxPQUFPLElBQVg7QUFBQSxNQUNDd0UsVUFBVXhFLEtBQUt3RSxPQURoQjtBQUVBQSxVQUFRNEMsS0FBUixDQUFjQyxNQUFkLEdBQXVCckgsS0FBSzBKLFFBQUwsQ0FBY2hDLEVBQUUrQyxVQUFoQixFQUE0Qi9DLEVBQUVnRCxXQUE5QixFQUEyQ2hELEVBQUVySixXQUE3QyxJQUE0RCxJQUFuRjtBQUNBLEVBSkQ7O0FBTUFrRyxhQUFZbUMsU0FBWixDQUFzQnFCLGFBQXRCLEdBQXNDLFlBQVc7QUFDaEQsTUFBSS9ILE9BQU8sSUFBWDtBQUFBLE1BQ0MwSCxJQUFJMUgsS0FBSzRFLEtBRFY7QUFFQThDLElBQUVpRCxZQUFGLEdBQWlCLFlBQVU7QUFDMUIsT0FBS2pELEVBQUVrRCxNQUFQLEVBQWdCO0FBQ2hCNUssUUFBSzZLLGNBQUwsQ0FBb0IsTUFBcEI7QUFDQSxHQUhEO0FBSUEsRUFQRDs7QUFTQXRHLGFBQVltQyxTQUFaLENBQXNCc0IsTUFBdEIsR0FBK0IsWUFBVTtBQUN2QyxNQUFJaEksT0FBTyxJQUFYO0FBQ0ExRSxJQUFFMEUsS0FBSzRFLEtBQVAsRUFBYzVHLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVztBQUN0Q2dDLFFBQUtnRyxRQUFMLENBQWMyQixJQUFkO0FBQ0FyTSxLQUFFMEUsS0FBSzRGLFFBQVAsRUFBaUJzRCxJQUFqQjtBQUNBNU4sS0FBRTBFLEtBQUt1RixPQUFQLEVBQWdCL0csUUFBaEIsQ0FBeUIsYUFBekIsRUFBd0MwSyxJQUF4QztBQUNBbEosUUFBS29KLGdCQUFMLENBQXNCLElBQXRCO0FBQ0UsR0FMRDtBQU1ELEVBUkQ7O0FBVUE3RSxhQUFZbUMsU0FBWixDQUFzQndCLE1BQXRCLEdBQStCLFlBQVc7QUFDeEMsTUFBSWxJLE9BQU8sSUFBWDtBQUNBMUUsSUFBRTBFLEtBQUswRixRQUFQLEVBQWlCMUgsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBVztBQUN6Q2dDLFFBQUtnRixPQUFMLEdBQWVoRixLQUFLNEUsS0FBTCxDQUFXdUUsV0FBMUI7QUFDQW5KLFFBQUtnSixTQUFMO0FBQ0ExTixLQUFFMEUsS0FBS3lGLE9BQVAsRUFBZ0J5RCxJQUFoQjtBQUNBNU4sS0FBRSxJQUFGLEVBQVFxTSxJQUFSO0FBQ0EzSCxRQUFLb0csYUFBTCxHQUFxQixPQUFyQjtBQUNFLEdBTkQ7QUFPRCxFQVREOztBQVdBN0IsYUFBWW1DLFNBQVosQ0FBc0IyQixTQUF0QixHQUFrQyxZQUFXO0FBQzNDLE1BQUlySSxPQUFPLElBQVg7QUFDQTFFLElBQUUwRSxLQUFLd0YsRUFBUCxFQUFXeEgsRUFBWCxDQUFjLE9BQWQsRUFBdUIsWUFBVztBQUNuQzFDLEtBQUUwRSxLQUFLdUYsT0FBUCxFQUFnQm9DLElBQWhCO0FBQ0EzSCxRQUFLb0osZ0JBQUwsQ0FBc0IsS0FBdEI7QUFDRSxHQUhEO0FBSUQsRUFORDs7QUFRQTdFLGFBQVltQyxTQUFaLENBQXNCMEIsWUFBdEIsR0FBcUMsWUFBVztBQUM5QyxNQUFJcEksT0FBTyxJQUFYO0FBQ0ExRSxJQUFFMEUsS0FBS3VGLE9BQVAsRUFBZ0J2SCxFQUFoQixDQUFtQjtBQUNwQiwwQkFBdUIsOEJBQVc7QUFDakM7QUFDQSxJQUhtQjtBQUlwQixtQ0FBZ0Msc0NBQVc7QUFDekM7QUFDRDtBQU5tQixHQUFuQjtBQVFELEVBVkQ7O0FBWUF1RyxhQUFZbUMsU0FBWixDQUFzQnlCLFdBQXRCLEdBQW9DLFlBQVc7QUFDOUMsTUFBSW5JLE9BQU8sSUFBWDtBQUFBLE1BQ0MwSCxJQUFJMUgsS0FBSzRFLEtBRFY7O0FBR0N0SixJQUFFMEUsS0FBS3dFLE9BQUwsQ0FBYUUsYUFBYixDQUEyQixVQUEzQixDQUFGLEVBQTBDb0csTUFBMUMsQ0FBaUQ7QUFDbERDLFVBQU8sS0FEMkM7QUFFbEQ7QUFDQUMsVUFBTyxlQUFXQyxLQUFYLEVBQWtCbFAsRUFBbEIsRUFBdUI7QUFDN0IyTCxNQUFFd0QsS0FBRjtBQUNBLElBTGlEO0FBTWxEQyxVQUFPLGVBQVVGLEtBQVYsRUFBaUJsUCxFQUFqQixFQUFzQjtBQUM1QmlFLFNBQUs2SyxjQUFMO0FBQ0E3SyxTQUFLb0wsaUJBQUwsQ0FBdUJyUCxFQUF2QjtBQUNBLElBVGlEO0FBVWxEc1AsV0FBUSxnQkFBU0osS0FBVCxFQUFnQmxQLEVBQWhCLEVBQW9CLENBQzNCLENBWGlEO0FBWWxEZ0QsU0FBTSxjQUFTa00sS0FBVCxFQUFnQmxQLEVBQWhCLEVBQW9CO0FBQ3pCaUUsU0FBS29KLGdCQUFMLENBQXNCLElBQXRCO0FBQ0FwSixTQUFLb0wsaUJBQUwsQ0FBdUJyUCxFQUF2Qjs7QUFFQSxRQUFLaUUsS0FBS29HLGFBQUwsSUFBc0IsTUFBM0IsRUFBb0M7QUFDbkNzQixPQUFFNEQsSUFBRjtBQUNBLEtBRkQsTUFFTztBQUNONUQsT0FBRXdELEtBQUY7QUFDQTtBQUNEO0FBckJpRCxHQUFqRDtBQXVCRCxFQTNCRDs7QUE2QkEzRyxhQUFZbUMsU0FBWixDQUFzQnVCLGVBQXRCLEdBQXdDLFlBQVU7QUFDaEQsTUFBSWpJLE9BQU8sSUFBWDtBQUFBLE1BQ0MwSCxJQUFJMUgsS0FBSzRFLEtBRFY7QUFFQXRKLElBQUUwRSxLQUFLNkYsT0FBUCxFQUFnQjdILEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVU7QUFDdkMsT0FBS2pDLEdBQUdDLElBQUgsQ0FBUUssUUFBUixHQUFtQk8sR0FBeEIsRUFBOEI7QUFDNUIsUUFBSyxPQUFPOEssRUFBRTZELGlCQUFULEtBQStCLFdBQS9CLElBQThDN0QsRUFBRTZELGlCQUFGLElBQXVCLElBQTFFLEVBQ0Q3RCxFQUFFNkQsaUJBQUYsR0FBc0IsS0FBdEI7QUFDQyxRQUFLLE9BQU83RCxFQUFFOEQsV0FBVCxLQUF5QixXQUF6QixJQUF3QzlELEVBQUUrRCxXQUFGLElBQWlCLElBQTlELEVBQ0QvRCxFQUFFOEQsV0FBRixHQUFnQixJQUFoQixDQURDLEtBRUssSUFBSyxPQUFPOUQsRUFBRTZELGlCQUFULEtBQStCLFdBQS9CLElBQThDN0QsRUFBRWdFLGlCQUFGLElBQXVCLElBQTFFLEVBQ05oRSxFQUFFNkQsaUJBQUYsR0FBc0IsSUFBdEI7QUFDQTtBQUNELE9BQUk3RCxFQUFFaUUsaUJBQU4sRUFDRWpFLEVBQUVpRSxpQkFBRixHQURGLEtBRUssSUFBSWpFLEVBQUVrRSx1QkFBTixFQUNIbEUsRUFBRWtFLHVCQUFGLEdBREcsS0FFQSxJQUFLbEUsRUFBRW1FLHFCQUFQLEVBQ0huRSxFQUFFbUUscUJBQUY7QUFDQSxHQWZEO0FBZ0JELEVBbkJEOztBQXFCQXRILGFBQVltQyxTQUFaLENBQXNCa0IsZ0JBQXRCLEdBQXlDLFlBQVc7QUFDbkQsTUFBSTVILE9BQU8sSUFBWDtBQUFBLE1BQ0NnRyxXQUFXLEtBQUtBLFFBRGpCO0FBQUEsTUFFQ25CLFNBQVMsS0FBS0EsTUFGZjtBQUFBLE1BR0NDLFVBQVUsS0FBS0EsT0FIaEI7QUFJQSxNQUFJa0IsU0FBU2pJLElBQVQsQ0FBYyxlQUFkLEVBQStCeUQsUUFBL0IsQ0FBd0MsS0FBeEMsQ0FBSixFQUFvRDtBQUNuRGxHLEtBQUV1SixNQUFGLEVBQVVxRSxJQUFWLEdBQWlCNEMsR0FBakIsQ0FBcUIsRUFBRTdNLFNBQVMsQ0FBWCxFQUFyQixFQUFxQzJELElBQXJDLENBQTBDLFdBQTFDLEVBQXVELE1BQXZEO0FBQ0F0SCxLQUFFd0osT0FBRixFQUFXZ0gsR0FBWCxDQUFlLEVBQUU3TSxTQUFTLENBQVgsRUFBZixFQUErQjBJLElBQS9CLEdBQXNDL0UsSUFBdEMsQ0FBMkMsV0FBM0MsRUFBd0QsT0FBeEQ7QUFDQXRILEtBQUUwRSxLQUFLNkUsTUFBUCxFQUFlakMsSUFBZixDQUFvQixLQUFwQixFQUEyQnRILEVBQUUwRSxLQUFLNkUsTUFBUCxFQUFlMUQsSUFBZixDQUFvQixLQUFwQixDQUEzQjtBQUNBbkIsUUFBSzRFLEtBQUwsR0FBYXRKLEVBQUV1SixNQUFGLEVBQVU1RSxHQUFWLENBQWMsQ0FBZCxDQUFiO0FBQ0EsR0FMRCxNQUtPO0FBQ04zRSxLQUFFdUosTUFBRixFQUFVaUgsR0FBVixDQUFjLEVBQUU3TSxTQUFTLENBQVgsRUFBZCxFQUE4QjBJLElBQTlCLEdBQXFDL0UsSUFBckMsQ0FBMEMsV0FBMUMsRUFBdUQsT0FBdkQ7QUFDQXRILEtBQUV3SixPQUFGLEVBQVdvRSxJQUFYLEdBQWtCNEMsR0FBbEIsQ0FBc0IsRUFBRTdNLFNBQVMsQ0FBWCxFQUF0QixFQUFzQzJELElBQXRDLENBQTJDLFdBQTNDLEVBQXdELE1BQXhEO0FBQ0F0SCxLQUFFMEUsS0FBSzhFLE9BQVAsRUFBZ0JsQyxJQUFoQixDQUFxQixLQUFyQixFQUE0QnRILEVBQUUwRSxLQUFLOEUsT0FBUCxFQUFnQjNELElBQWhCLENBQXFCLEtBQXJCLENBQTVCO0FBQ0FuQixRQUFLNEUsS0FBTCxHQUFhdEosRUFBRXdKLE9BQUYsRUFBVzdFLEdBQVgsQ0FBZSxDQUFmLENBQWI7QUFDQTtBQUNERCxPQUFLNEUsS0FBTCxDQUFXbUgsSUFBWDtBQUNBO0FBQ0EsRUFsQkQ7O0FBb0JBeEgsYUFBWW1DLFNBQVosQ0FBc0JzRixTQUF0QixHQUFrQyxVQUFXdEUsQ0FBWCxFQUFlO0FBQ2hEN0wsVUFBUUMsR0FBUixDQUFZNEwsRUFBRWEsWUFBZDtBQUNBLEVBRkQ7O0FBSUFoRSxhQUFZbUMsU0FBWixDQUFzQjBFLGlCQUF0QixHQUEwQyxVQUFTclAsRUFBVCxFQUFhO0FBQ3RELE1BQUlpRSxPQUFPLElBQVg7QUFBQSxNQUNDMEgsSUFBSTFILEtBQUs0RSxLQURWO0FBQUEsTUFFQ3NGLENBRkQ7QUFBQSxNQUVJekgsQ0FGSjs7QUFJQWlGLElBQUV5QixXQUFGLEdBQWdCOEMsU0FBU3ZFLEVBQUV4QyxRQUFGLElBQWNuSixHQUFHOEQsS0FBSCxHQUFXLEdBQXpCLENBQVQsRUFBd0MsRUFBeEMsQ0FBaEI7QUFDQUcsT0FBS2dGLE9BQUwsR0FBZTBDLEVBQUV5QixXQUFqQjtBQUNBZSxNQUFNL0UsS0FBS0MsS0FBTCxDQUFXc0MsRUFBRXlCLFdBQUYsR0FBZ0IsRUFBM0IsQ0FBRixDQUFtQ2dCLFFBQW5DLEVBQUo7QUFDQTFILE1BQU0wQyxLQUFLQyxLQUFMLENBQVdzQyxFQUFFeUIsV0FBRixHQUFnQixFQUEzQixDQUFGLENBQW1DZ0IsUUFBbkMsRUFBSjtBQUNBbkssT0FBS2lGLFNBQUwsQ0FBZW1GLFNBQWYsR0FBMkIsQ0FBQ0YsRUFBRTNNLE1BQUYsR0FBVyxDQUFYLEdBQWUsTUFBTTJNLENBQXJCLEdBQXlCQSxDQUExQixJQUFnQyxHQUFoQyxJQUF1Q3pILEVBQUVsRixNQUFGLEdBQVcsQ0FBWCxHQUFlLE1BQU1rRixDQUFyQixHQUF5QkEsQ0FBaEUsQ0FBM0I7QUFDQXpDLE9BQUtvSixnQkFBTCxDQUFzQixLQUF0QjtBQUNBLEVBWEQ7O0FBYUE3RSxhQUFZbUMsU0FBWixDQUFzQm1FLGNBQXRCLEdBQXVDLFVBQVVxQixJQUFWLEVBQWdCO0FBQ3RELE1BQUlsTSxPQUFPLElBQVg7QUFBQSxNQUNBNEUsUUFBUTVFLEtBQUs0RSxLQURiO0FBRUEsTUFBSW5DLENBQUo7QUFBQSxNQUFPeUgsQ0FBUDtBQUFBLE1BQVVpQyxLQUFLaEgsS0FBS0MsS0FBTCxDQUFXUixNQUFNdUUsV0FBakIsQ0FBZjtBQUFBLE1BQThDaUQsTUFBTWpILEtBQUtDLEtBQUwsQ0FBV1IsTUFBTU0sUUFBakIsQ0FBcEQ7QUFDQSxNQUFLaUgsS0FBSyxFQUFWLEVBQWU7QUFDZGpDLE9BQUksSUFBSjtBQUNBekgsT0FBSTBKLEdBQUdoQyxRQUFILEdBQWM1TSxNQUFkLEdBQXVCLENBQXZCLEdBQTJCLE1BQU00TyxHQUFHaEMsUUFBSCxFQUFqQyxHQUFpRGdDLEVBQXJEO0FBQ0EsR0FIRCxNQUdPO0FBQ04xSixPQUFJd0osU0FBVUUsS0FBSyxFQUFmLENBQUosRUFDQWpDLElBQUkrQixTQUFVLENBQUNFLEtBQUsxSixDQUFOLElBQVcsRUFBckIsQ0FESjtBQUVBQSxPQUFJQSxFQUFFMEgsUUFBRixHQUFhNU0sTUFBYixHQUFzQixDQUF0QixHQUEwQixNQUFNa0YsQ0FBaEMsR0FBb0NBLENBQXhDO0FBQ0F5SCxPQUFJQSxFQUFFQyxRQUFGLEdBQWE1TSxNQUFiLEdBQXNCLENBQXRCLEdBQTBCLE1BQU0yTSxDQUFoQyxHQUFvQ0EsQ0FBeEM7QUFDQTtBQUNEbEssT0FBS2lGLFNBQUwsQ0FBZW1GLFNBQWYsR0FBMkJGLElBQUksR0FBSixHQUFVekgsQ0FBckM7QUFDQSxNQUFLeUosUUFBUSxNQUFiLEVBQXNCO0FBQ3JCNVEsS0FBRSxVQUFGLEVBQWN3UCxNQUFkLENBQXFCO0FBQ3BCakwsV0FBT29NLFNBQVcsTUFBTUcsR0FBUCxHQUFjRCxFQUF4QjtBQURhLElBQXJCO0FBR0E7QUFDRCxFQW5CRDs7QUFxQkE1SCxhQUFZbUMsU0FBWixDQUFzQjBDLGdCQUF0QixHQUF5QyxVQUFTaUQsSUFBVCxFQUFjO0FBQ3JELE1BQUlyTSxPQUFPLElBQVg7QUFDQXNNLGVBQWF0TSxLQUFLcUYsWUFBbEI7QUFDQSxNQUFJZ0gsSUFBSixFQUFVO0FBQ1hyTSxRQUFLcUYsWUFBTCxHQUFvQjBELFdBQVcsWUFBVztBQUN4Q3pOLE1BQUUwRSxLQUFLdUYsT0FBUCxFQUFnQm9DLElBQWhCO0FBQ0QsSUFGbUIsRUFFakIsSUFGaUIsQ0FBcEI7QUFHRSxHQUpELE1BSU87QUFDUjJFLGdCQUFhdE0sS0FBS3FGLFlBQWxCO0FBQ0EvSixLQUFFMEUsS0FBS3VGLE9BQVAsRUFBZ0IyRCxJQUFoQjtBQUNFO0FBQ0YsRUFYRDs7QUFhQTNFLGFBQVltQyxTQUFaLENBQXNCc0MsU0FBdEIsR0FBa0MsWUFBVztBQUM1QyxNQUFJaEosT0FBUSxJQUFaO0FBQUEsTUFDQzBILElBQU0xSCxLQUFLNEUsS0FEWjs7QUFHQSxNQUFLOEMsRUFBRWtELE1BQVAsRUFBZ0I7QUFDZixPQUFHNUssS0FBS2dGLE9BQVIsRUFBaUIwQyxFQUFFeUIsV0FBRixHQUFnQm5KLEtBQUtnRixPQUFyQjtBQUNqQjBDLEtBQUU0RCxJQUFGO0FBQ0EsR0FIRCxNQUdPO0FBQ041RCxLQUFFd0QsS0FBRjtBQUNBO0FBQ0QsRUFWRDs7QUFZQTNHLGFBQVltQyxTQUFaLENBQXNCSixZQUF0QixHQUFxQyxZQUFXO0FBQy9DLE1BQUl0RyxPQUFPLElBQVg7QUFBQSxNQUNDd0YsS0FBSyxFQUROO0FBQUEsTUFFQytHLEtBQUt2TSxLQUFLc0YsTUFBTCxDQUFZWixhQUFaLENBQTBCLE1BQTFCLENBRk47QUFBQSxNQUdDckMsTUFBTSxFQUhQO0FBSUFtRCxPQUFLK0csR0FBR0MsT0FBSCxDQUFXaEgsRUFBaEI7O0FBRUEsTUFBSWlILFlBQVkvUSxTQUFTMEcsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBcUssWUFBVUMsRUFBVixHQUFlLGFBQWY7QUFDQTFNLE9BQUtzRixNQUFMLENBQVlsQyxXQUFaLENBQXlCcUosU0FBekI7QUFDQXpNLE9BQUs4SixXQUFMO0FBQ0FsTCxpQkFBZTRHLEVBQWYsRUFBbUIsWUFBWTtBQUM5QixPQUFLeEYsS0FBSzJFLGNBQVYsRUFBMkI7QUFDMUIzRSxTQUFLK0csV0FBTCxDQUFrQi9HLEtBQUsyRSxjQUF2QixFQUF1QyxRQUF2QztBQUNBM0UsU0FBS3VGLE9BQUwsQ0FBYTZCLEtBQWIsQ0FBbUJuSSxPQUFuQixHQUE2QixDQUE3QjtBQUNBO0FBQ0QsT0FBSTBOLFNBQVNqUixTQUFTa1IsY0FBVCxDQUF3QixhQUF4QixDQUFiO0FBQUEsT0FDQ0MsVUFBVUYsT0FBT0csVUFBUCxDQUFrQixJQUFsQixDQURYO0FBQUEsT0FFQ2pPLE1BQU0sSUFBSWtPLEtBQUosRUFGUDtBQUFBLE9BR0NDLE9BQU8sQ0FIUjtBQUFBLE9BSUNDLE9BQU8sQ0FKUjtBQUFBLE9BS0NDLE9BTEQ7QUFBQSxPQU1DQyxRQU5EO0FBT0EsT0FBSUMsS0FBSyxDQUFUO0FBQ0F2TyxPQUFJd0QsR0FBSixHQUFVbUQsRUFBVjtBQUNBcUgsV0FBUVEsV0FBUixHQUFzQixDQUF0Qjs7QUFFQVYsVUFBT3ZGLEtBQVAsQ0FBYWtHLEtBQWIsR0FBcUIsTUFBckI7QUFDQVgsVUFBT3ZGLEtBQVAsQ0FBYUMsTUFBYixHQUFzQixNQUF0QjtBQUNBOztBQUVBMkYsVUFBT2hOLEtBQUt3RSxPQUFMLENBQWFuRyxXQUFiLEdBQTJCLEdBQWxDO0FBQ0E0TyxVQUFTOUgsS0FBS0MsS0FBTCxDQUFXdkcsSUFBSTBPLGFBQWYsSUFBZ0MsQ0FBbEMsR0FBd0MsRUFBL0M7QUFDQU4sVUFBTzlILEtBQUtDLEtBQUwsQ0FBWTZILElBQVosSUFBcUIsR0FBNUI7QUFDQTs7QUFFQUMsYUFBVW5FLFdBQVcsWUFBVTtBQUM5Qm9FLGVBQVduRCxZQUFZLFlBQVU7QUFDaEMsU0FBTTZDLFFBQVFRLFdBQVQsQ0FBc0JHLE9BQXRCLENBQThCLENBQTlCLElBQW1DLENBQXhDLEVBQTRDO0FBQzNDUixjQUFTQSxPQUFLLEtBQWQ7QUFDQUMsY0FBU0EsT0FBSyxLQUFkO0FBQ0FKLGNBQVFRLFdBQVIsSUFBdUIsSUFBdkI7QUFDQVIsY0FBUVksU0FBUixDQUFrQjVPLEdBQWxCLEVBQXVCOE4sT0FBT1csS0FBUCxHQUFhLENBQWIsR0FBaUJOLE9BQUssQ0FBN0MsRUFBZ0RMLE9BQU90RixNQUFQLEdBQWMsQ0FBZCxHQUFrQjRGLE9BQUssQ0FBdkUsRUFBMEVELElBQTFFLEVBQWdGQyxJQUFoRjtBQUNBLE1BTEQsTUFLTztBQUNOWCxtQkFBYWEsUUFBYjtBQUNBO0FBQ0QsS0FUVSxFQVNSLE9BQUssRUFURyxDQUFYO0FBVUEsSUFYUyxFQVdQLEdBWE8sQ0FBVjtBQWFBLEdBdENEO0FBdUNBLEVBbEREOztBQW9EQTVJLGFBQVltQyxTQUFaLENBQXNCQyxRQUF0QixHQUFpQyxVQUFXeEksTUFBWCxFQUFtQnVQLEtBQW5CLEVBQTJCO0FBQzNELE1BQUt2UCxPQUFPVyxTQUFQLENBQWlCaUQsT0FBakIsQ0FBeUIyTCxLQUF6QixJQUFrQyxDQUFDLENBQXhDLEVBQTRDO0FBQzVDdlAsU0FBT1csU0FBUCxJQUFvQixNQUFNNE8sS0FBMUI7QUFDQSxFQUhEOztBQUtBbkosYUFBWW1DLFNBQVosQ0FBc0JLLFdBQXRCLEdBQW9DLFVBQVc1SSxNQUFYLEVBQW1CdVAsS0FBbkIsRUFBMkI7QUFDOUQsTUFBSUMsU0FBUyxJQUFJQyxNQUFKLENBQVdGLEtBQVgsQ0FBYjtBQUNBdlAsU0FBT1csU0FBUCxHQUFtQi9DLEdBQUdDLElBQUgsQ0FBUUUsSUFBUixDQUFjaUMsT0FBT1csU0FBUCxDQUFpQjFDLE9BQWpCLENBQTBCdVIsTUFBMUIsRUFBa0MsRUFBbEMsQ0FBZCxDQUFuQjtBQUNBLEVBSEQsQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxNTU2NTY4ZjA0Njg2MGJmMzYyYlxuICoqLyIsImltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbmltcG9ydCAnLi9kZXYnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuaW1wb3J0ICcuL3ZpZGVvLXBsYXllcic7XG5cblxudmFyICQgPSB3aW5kb3cuJDtcbnZhciB3aW4gPSB3aW5kb3csXG4gICAgZG9jID0gZG9jdW1lbnQ7XG5cbndpbmRvdy5jc2xvZyA9IGZ1bmN0aW9uKG1zZykge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xufTtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuICAgIC8v7Jyg7Yu4IOuplOyEnOuTnFxuICAgIHV0aWw6IHtcbiAgICAgICAgLy8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuICAgICAgICBjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpIHt9XG5cbiAgICAgICAgLy8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcbiAgICAgICAgLFxuICAgICAgICB0cmltOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRGV2aWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdpbmdlcmJyZWFkKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pb3MpIHJldHVybiAnaW9zJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zKSByZXR1cm4gJ25vLW1vYmlsZSc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXZpY2VTaXplOiAnZGV2aWNlLXNpemUtJyArIHdpbmRvdy5pbm5lcldpZHRoXG4gICAgfVxuXG4gICAgLy8g6rO17Ya1IOuplOyEnOuTnFxuICAgICxcbiAgICBjb21tb246IHtcblxuICAgICAgICAvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcbiAgICAgICAgZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuICAgICAgICAgICAgdmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLFxuICAgICAgICAgICAgICAgIGFUYWcgPSBudWxsLFxuICAgICAgICAgICAgICAgIGhyZWYgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhVGFnID0gYWxsQVtpXTtcbiAgICAgICAgICAgICAgICBocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBpZiAodWkudXRpbC50cmltKGhyZWYpID09ICcjJyB8fCBocmVmID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2dnbGVDbGFzcyBjdXN0b21cbiAgICAgICAgLFxuICAgICAgICB0b2dnbGVjbGFzczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuICAgICAgICAsXG4gICAgICAgIHRhYmxlRmFkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG4gICAgICAgICAgICBpZiAoX3Njb3BlLmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9hZGluZyBtYXNrXG4gICAgICAgICxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVByZWxvYWRlcignL2Zyb250L2ltYWdlcy9sb2FkaW5nLWNpcmN1bGFyLmdpZicsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gXCJ2aWRlby1sb2FkaW5nLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnN0b3AoKS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6re466O5IO2GoOq4gFxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZUdyb3VwOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGF5ZXIgcG9wdXBcbiAgICAgICAgLFxuICAgICAgICBwb3B1cENsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcG9wdXAgPSAkKCcucG9wdXAnKTtcbiAgICAgICAgICAgIGlmICggcG9wdXAubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTAsIGxlbmd0aD1wb3B1cC5sZW5ndGg7IGk8bGVuZ3RoOyBpKz0xICkge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oail7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5lcShqKS5maW5kKCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5wb3B1cCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmYWtlU2VsZWN0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLnNlbGVjdC13cmFwLmZha2UnKS5lYWNoKGZ1bmN0aW9uKGl0ZW0sIHZhbHVlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSAkKHRoaXMpLmZpbmQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZ2V0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRoYXQub3B0aW9uc1t0aGF0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnRleHQoIHRleHQgKTtcbiAgICAgICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHRiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICAgIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgICAgIF9zY29wZTogJycsXG5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcbiAgICAgICAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4BcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYW5hZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgICB2YXIgYWNjb3JkaWFuID0ge1xuICAgICAgICBfc2NvcGU6ICcnLFxuICAgICAgICBpbml0OiBmdW5jdGlvbihfc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICB9LFxuICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoaXRlbS5wb3NpdGlvbigpLnRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAgIC8vIOu3sO2LsOy7qO2FkOy4oCDrj5nsg4Hsg4HtmJVcblxuICAgIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgICAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cbiAgICBjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuICAgIGNvbW1vbi50YWJsZUZhZGUoKTtcblxuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhbaXNEZXZpY2UuY2hlY2soKSwgdXRpbC5kZXZpY2VTaXplXS5qb2luKCcgJykpO1xuXG4gICAgYmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cbiAgICBjb21tb24ubG9hZGluZ0NvbXBsZXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NhbGxiYWNrc1xuICAgIH0pO1xuXG4gICAgLy/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuICAgIGlmIChsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xKSB7XG4gICAgICAgIGRldi5hcHBlbmRNZW51TGlzdCgpO1xuICAgICAgICBkZXYuYXBwZW5kTWVudUJ0bigpO1xuICAgIH1cbn0pO1xuXG4vKlxuICpcdEltYWdlIHByZWxvYWRlciAoYykgeWlrbDEwMDRAZ21haWwuY29tLCAyMDE2LjExXG4gKi9cbndpbmRvdy5pbWFnZVByZWxvYWRlciA9IGZ1bmN0aW9uKGltZywgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2VzLnNyYyA9IGltZztcblxuICAgIGltYWdlcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJjb25zdCBbd2luLCBkb2MsIHFzYSwgcXNdID0gW3dpbmRvdywgZG9jdW1lbnQsICdxdWVyeVNlbGVjdG9yQWxsJywgJ3F1ZXJ5U2VsZWN0b3InXTtcblxuY29uc3Rcblx0ZG9tIFx0PSBzID0+IGRvY3VtZW50W3FzXShzKSxcblx0ZG9tQWxsIFx0PSBzID0+IGRvY3VtZW50W3FzYV0ocyksXG5cdG1ha2VEb20gPSAocywgYXR0cikgPT4ge1xuXHRcdHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHMpXG5cdFx0aWYgKCB0eXBlb2YgYXR0ciA9PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhhdHRyKS5sZW5ndGggPiAwIClcblx0XHRcdGZvciAoIGxldCBpIGluIGF0dHIgKVxuXHRcdFx0XHRkb20uc2V0QXR0cmlidXRlKGksIGF0dHJbaV0pO1xuXHRcdHJldHVybiBkb207XG5cdH0sXG5cdHB1dFRleHQgPSBzID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpLFxuXHRwcmVwZW5kID0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0Lmluc2VydEJlZm9yZShpdGVtLCB0YXJnZXQuY2hpbGROb2Rlc1swXSksXG5cdGFwcGVuZCBcdD0gKGl0ZW0sIHRhcmdldCkgPT4gdGFyZ2V0LmFwcGVuZENoaWxkKGl0ZW0pO1xuXG5jb25zdCBtZW51RGF0YSA9IFtcblx0e1xuXHRcdGRlcHRoMTogXCLqs7XthrVcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yT6riAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL3JlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCtOyaqeydtCDsl4bsnYQg65WMXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY29tbW9uL25vLXJlcGx5Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67iM656c65OcXCIsXG5cdFx0ZGVwdGgyOiBcIuunpOyepeygleuztFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuunpOyepeyGjOyLnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlSW5mby9zdG9yZU5ld3MuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67Cx7ZmU7KCQ7ZaJ7IKsKFNhbXBsZSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9icmFuZC9zdG9yZUV2ZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi66mk67KE7Im9XCIsXG5cdFx0ZGVwdGgyOiBcIuydtOyaqeyVveq0gFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyEnOu5hOyKpCDsnbTsmqnslb3qtIAgKOu3sO2LsO2PrOyduO2KuCDsm7kpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbWVtYmVyc2hpcC9zZXJ2aWNlQWdyZWVtZW50L3NlcnZpY2UuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rCc7J247KCV67O0IOyymOumrOuwqey5qCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuychOy5mOq4sOuwmOyEnOu5hOyKpCDsnbTsmqnslb3qtIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuydtOuypO2KuCbtlonsgqxcIixcblx0XHRkZXB0aDI6IFwi7KeE7ZaJ7KSR7J24IOydtOuypO2KuFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIOydvOuwmFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDtl6TrnbzrqZTsnbTtgazsl4Xsh7xcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdIZXJhLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfc2luZ2xlU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g67O17IiY7ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfbXVsdGlTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsmYTro4wpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbENvbXBsZXRlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JiI7JW9IOyLnCAtIOqwnOyduOygleuztCDsiJjsp5Eg67CPIOydtOyaqeyViOuCtFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L3Jlc2VydmF0aW9uL2FncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuu3sO2LsOy7qO2FkOy4oFwiLFxuXHRcdGRlcHRoMjogXCLrqqnroZ1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo7Lm065Oc64m07Iqk7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvY2FyZFR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjrj5nsmIHsg4HtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9tb3ZpZVR5cGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKI7KCV67O0XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0SW5mby92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkojrpqzrt7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9wcm9kdWN0UmV2aWV3L3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLqs6DqsJ3shLzthLBcIixcblx0XHRkZXB0aDI6IFwi6rO17KeA7IKs7ZWtXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66qp66GdICsg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3Mvbm90aWNlL2xpc3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrj4Tsm4Drp5BcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66mU7J24XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3MvaGVscC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOlwi66eI7J207Y6Y7J207KeAXCIgLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg65Ox6riJXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2dyYWRlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67iM656c65Oc67OEIOunpOyepeyEoO2DnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9zZWxlY3RTdG9yZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDsv6Dtj7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOuwqeusuO2bhOq4sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy92aXNpdG9yc0Jvb2suaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOumrOu3sCAtIOyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9teVJldmlldy9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqtIDsi6zsg4HtkohcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHJvZHVjdE9mSW50ZXJlc3QvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCJcIixcblx0XHRkZXB0aDI6IFwi6rWs66ek7ZiE7ZmpXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66as7Iqk7Yq4KHBvcHVwIO2PrO2VqClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvcHVyY2hhc2UvcGVyaW9kLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7JeU7KCk7Yah7YahXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuMgO2ZlO2ZlOuptFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2VuZ2VsVGFsay90YWxrX2lucXVpcnkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9XG5cdFx0XVxuXHR9XG5cbl07XG5cbnZhciBtZW51TGlzdCA9IG1lbnVEYXRhLnJlZHVjZSgocCwgYykgPT4ge1xuXHRsZXQge2RlcHRoMSwgZGVwdGgyLCBsaW5rc30gPSBjO1xuXHRyZXR1cm4gYCR7cCB8fCAnJ31cblx0JHtkZXB0aDEgPyBgPGgyPjxzcGFuPiR7ZGVwdGgxfTwvc3Bhbj48L2gyPmAgOiBgYH1cblx0JHtkZXB0aDIgPT0gJycgPyBkZXB0aDIgOiBgPGgzPjxzcGFuPiR7ZGVwdGgyfTwvc3Bhbj48L2gzPmB9XG5cdDx1bD4ke2xpbmtzLnJlZHVjZSgoaXAsIGljKSA9PiB7XG5cdFx0XHRsZXQge3RpdGxlLCBocmVmLCBjb21wbGV0ZX0gPSBpYztcblx0XHRcdHJldHVybiBgJHtpcCB8fCBcIlwifVxuXHRcdDxsaSR7Y29tcGxldGUgPyAnIGNsYXNzPVwiY3BcIicgOiBcIlwifT48YSBocmVmPVwiJHtocmVmfVwiPiR7dGl0bGV9PC9hPjwvbGk+YH0sIDApfVxuXHQ8L3VsPlxuXHRgXG59LCAwKTtcblxuLy8g66mU64m0IOuyhO2KvCDsgr3snoVcbndpbmRvdy5kZXYgPSB7XG5cdGFwcGVuZE1lbnVCdG46IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1lbnVUcmlnZ2VyID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdDxzcGFuPnRvZ2dsZSBtZW51PC9zcGFuPlxuPC9idXR0b24+YDtcblx0XG5cdFx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCkge1xuXHRcdFx0XHQkKCcjbWVudScpLnByZXBlbmQobWVudVRyaWdnZXIpO1xuXHRcdFx0fVxuXHRcblx0XHRcdCQoJy5tZW51LXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBtZW51TGlzdCA9ICQoJyNtZW51LWxpc3QnKSxcblx0XHRcdFx0ICAgIGN0cmxDbGFzcyA9ICdpcy1hY3RpdmUnLFxuXHRcdFx0XHQgICAgY29uZGl0aW9uID0gbWVudUxpc3QuaGFzQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHRpZiAoY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0bWVudUxpc3QuYWRkKCQodGhpcykpLnJlbW92ZUNsYXNzKCBjdHJsQ2xhc3MgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8vIOuplOuJtCDrpqzsiqTtirgg7IK97J6FXG5cdCxhcHBlbmRNZW51TGlzdDogZnVuY3Rpb24oKXtcblxuXHRcdGlmICggJCgnI21lbnUnKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdG1lbnVMaXN0ID0gJCgnPGRpdiBpZD1tZW51IC8+JykuYXBwZW5kKCAkKCc8ZGl2IGlkPW1lbnUtbGlzdCBjbGFzcz1vdmVydGhyb3cgLz4nKS5hcHBlbmQoIG1lbnVMaXN0ICkgKTtcblx0XHRcdCQoJyN3cmFwJykubGVuZ3RoIDw9IDAgPyAkKCdib2R5JykucHJlcGVuZCggbWVudUxpc3QgKSA6ICQoJyN3cmFwJykucHJlcGVuZCggbWVudUxpc3QgKTtcblx0XHR9XG5cdFx0JCgnI21lbnUtbGlzdCcpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYUhSRUYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdGlmICggYUhSRUYuaW5kZXhPZignP2RldicpIDw9IC0xICkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBhSFJFRiArICc/ZGV2Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LGRpbW06IGZ1bmN0aW9uKG1zZyl7XG5cdFx0bXNnID0gbXNnIHx8ICfrgrTsmqnsnbQg7JeG7Iq164uI64ukLic7XG5cdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdCQoJzxkaXYgY2xhc3M9XCJkaW1tXCIgLz4nKS5hcHBlbmQoXG5cdFx0XHRcdCQoYDxzcGFuPiR7bXNnfTxzcGFuLz48YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj5b64ur6riwXTwvc3Bhbj48L2J1dHRvbj5gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdFx0JCgnLmRpbW0nKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5kaW1tJykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Rldi5qc1xuICoqLyIsIi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNi4xMVxuKlx0bmV0d29ya1N0YXRlIHsgbnVtYmVyIH1cbiogXHQwID0gTkVUV09SS19FTVBUWSAtIGF1ZGlvL3ZpZGVvIGhhcyBub3QgeWV0IGJlZW4gaW5pdGlhbGl6ZWRcbipcdDEgPSBORVRXT1JLX0lETEUgLSBhdWRpby92aWRlbyBpcyBhY3RpdmUgYW5kIGhhcyBzZWxlY3RlZCBhIHJlc291cmNlLCBidXQgaXMgbm90IHVzaW5nIHRoZSBuZXR3b3JrXG4qXHQyID0gTkVUV09SS19MT0FESU5HIC0gYnJvd3NlciBpcyBkb3dubG9hZGluZyBkYXRhXG4qXHQzID0gTkVUV09SS19OT19TT1VSQ0UgLSBubyBhdWRpby92aWRlbyBzb3VyY2UgZm91bmRcbipcbipcdHJlYXN5U3RhdGUgeyBudW12ZXIgfVxuKlx0MCA9IEhBVkVfTk9USElORyAtIG5vIGluZm9ybWF0aW9uIHdoZXRoZXIgb3Igbm90IHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVx0XG4qXHQxID0gSEFWRV9NRVRBREFUQSAtIG1ldGFkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW8gaXMgcmVhZHlcbipcdDIgPSBIQVZFX0NVUlJFTlRfREFUQSAtIGRhdGEgZm9yIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGlzIGF2YWlsYWJsZSwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUvbWlsbGlzZWNvbmRcbipcdDMgPSBIQVZFX0ZVVFVSRV9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgYW5kIGF0IGxlYXN0IHRoZSBuZXh0IGZyYW1lIGlzIGF2YWlsYWJsZVxuKlx0NCA9IEhBVkVfRU5PVUdIX0RBVEEgLSBlbm91Z2ggZGF0YSBhdmFpbGFibGUgdG8gc3RhcnQgcGxheWluZ1xuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHQvL3dyYXBwZXIsIGVuZGVkQ2FsbGJhY2tcblx0aWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBWaWRlb1BsYXllcikgKSByZXR1cm4gbmV3IFZpZGVvUGxheWVyKHdyYXBwZXIsIGVuZGVkQ2FsbGJhY2spO1xuXHR0aGlzLndyYXBwZXIgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLndyYXBwZXIpO1xuXHR0aGlzLmxvYWRpbmdFbGVtZW50XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbG9hZGluZy1pbWFnZScpLFxuXHR0aGlzLnZpZGVvIFx0XHRcdD0gbnVsbCxcblx0dGhpcy5sb3dSZXMgXHRcdD0gJCh0aGlzLndyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1sb3ddJykuZ2V0KDApO1xuXHR0aGlzLmhpZ2hSZXMgXHRcdD0gJCh0aGlzLndyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcblx0dGhpcy5wbGF5RmxhZyBcdFx0PSB0cnVlO1xuXHR0aGlzLmN1clRpbWUgXHRcdD0gKGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCBvcHRpb25zLnN0YXJ0VGltZSA+PSBvcHRpb25zLmR1cmF0aW9uICkgcmV0dXJuIDA7XG5cdFx0dmFyIHN0YXJ0VGltZSA9IG9wdGlvbnMuc3RhcnRUaW1lID8gTWF0aC5yb3VuZChvcHRpb25zLnN0YXJ0VGltZSAvIDEwMDApIDogMDtcblx0XHRyZXR1cm4gc3RhcnRUaW1lO1xuXHR9KSgpO1xuXHR0aGlzLmNvbnRyb2xUaW1lciBcdD0gbnVsbDtcblx0dGhpcy5wb3N0ZXIgXHRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5wb3N0ZXInKTtcblx0dGhpcy5jb250cm9sIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpO1xuXHR0aGlzLmJnIFx0XHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5iZycpO1xuXHR0aGlzLnBsYXlCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wbGF5Jyk7XG5cdHRoaXMucGF1c2VCdG4gXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wYXVzZScpO1xuXHR0aGlzLnZpZGVvVGltZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnJ1bm5pbmctdGltZScpO1xuXHR0aGlzLnRpbWVsaW5lIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcblx0dGhpcy5mdWxsQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuZnVsbCcpO1xuXHR0aGlzLnN0YXJ0VGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50Jyk7XG5cdHRoaXMuZW5kVGltZSBcdFx0PSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5lbmQnKTtcblx0dGhpcy5zZWVrYmFyIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpO1xuXHR0aGlzLmJ0bkdyb3VwIFx0XHQ9ICQodGhpcy5jb250cm9sKS5maW5kKCcuYnRuLWdyb3VwJyk7XG5cdHRoaXMuYWN0aXZlQnRuIFx0XHQ9IHRoaXMuYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpO1xuXHR0aGlzLm1vYmlsZU5ldHdvcmtcdD0gb3B0aW9ucy5tb2JpbGVOZXR3b3JrO1xuXHR0aGlzLmFsZXJ0TW9iaWxlXHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtbW9iaWxlJyk7XG5cdHRoaXMucGxheVBhdXNlRmxhZyBcdD0gJ3BhdXNlJztcblx0dGhpcy5lbmRlZENhbGxiYWNrID0gdHlwZW9mIG9wdGlvbnMuZW5kZWRDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5lbmRlZENhbGxiYWNrIDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS53YXJuKCdlbmRlZENhbGxiYWNrIHR5cGUgaXMgbm90IGEgZnVuY3Rpb24uJyk7XG5cdH07XG5cblx0dGhpcy5wb3N0ZXJMb2FkZWQoKTtcblx0dGhpcy5fdW5sb2FkKCk7XG5cdHRoaXMuX3NpemUoKTtcblx0dGhpcy5faW5pdCgpO1xuXG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdFt0aGF0LnBsYXlCdG4sIHRoYXQucGF1c2VCdG5dLmZvckVhY2goZnVuY3Rpb24oYnRuLCBpbmRleCl7XG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbigpe1xuXHRcdFx0dGhhdC5hZGRLbGFzcyh0aGlzLCAnbW91c2Vkb3duJyk7XG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oKXtcblx0XHRcdHRoYXQucmVtb3ZlS2xhc3ModGhpcywgJ21vdXNlZG93bicpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSk7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCB0aGF0Lm1vYmlsZU5ldHdvcmsgKSB7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmsgPSBmYWxzZTtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29ya0NoZWNrKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoYXQuX3BsYXkoKTtcblx0XHR9XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdyA9IE1hdGgucm91bmQoIHRoaXMud3JhcHBlci5jbGllbnRXaWR0aCApLFxuXHRcdGggPSAwO1xuXHRoID0gKDkgKiB3KSAvIDE2O1xuXHR0aGlzLndyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3VubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnQuYm9keS5vbnVubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ3BhZ2UgbW92ZScpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLm1vYmlsZU5ldHdvcmtDaGVjayA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGFsZXJ0ID0gdGhhdC5hbGVydE1vYmlsZTtcblx0dGhhdC5hZGRLbGFzcyhhbGVydCwgJ2FjdGl2ZScpO1xuXHR0aGF0LmNvbnRyb2wuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRhbGVydC5xdWVyeVNlbGVjdG9yKCdidXR0b24ub2snKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0dGhhdC5fcGxheSgpO1xuXHRcdHRoYXQucmVtb3ZlS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0fSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSBudWxsO1xuXG5cdHRoYXQuYWRkS2xhc3MoIHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXG5cdGlmICggdGhhdC5wbGF5RmxhZyApIHtcblx0XHR0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG5cdFx0JCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0XHRpZiAoIHRoYXQudmlkZW8gPT0gbnVsbCApIHRoYXQucmVzb2x1dGlvbkNob2ljZSgpO1xuXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdFx0Ly8gaWYgKCB0aGF0LmN1clRpbWUgKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lOyBcblxuXHRcdHRoYXQuX29uUGxheSgpO1xuXHRcdHRoYXQuX29uUGF1c2UoKTtcblx0XHR0aGF0Ll9vblRpbWVVcGRhdGUoKTtcblx0XHR0aGF0Ll9jbGljaygpO1xuXHRcdHRoYXQuX2Z1bGxzY3JyZW5Nb2RlKCk7XG5cdFx0dGhhdC5fcGF1c2UoKTtcblx0XHR0aGF0Lm1ha2VTZWVrYmFyKCk7XG5cdFx0dGhhdC5jb250cm9sRXZlbnQoKTtcblx0XHR0aGF0LmRpbW1DbGljaygpO1xuXHRcdC8vIGlmICggdGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgKSB7XG5cdFx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdhYWFhYWEnKTtcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0di5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZCcsIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2Fkc3RhcnQgPSBmdW5jdGlvbigpe1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ29ubG9hZHN0YXJ0Jy4gdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZGRhdGEgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ2xvYWRlZGRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coJ29ubG9hZGVkbWV0YWRhdGEnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblxuXHRcdCQoJ2JvZHknKS5vbigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygndHJhbnNpdGlvbmVuZCcpO1xuXHRcdH0pO1xuXHRcdC8vIHRoYXQudmlkZW8ub253ZWJraXR0cmFuc2l0aW9uZW5kID0gZnVuY3Rpb24oKSB7XG5cblx0XHQvLyB9O1xuXG5cdFx0dGhhdC52aWRlby5vbmFuaW1hdGlvbmVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ29ud2Via2l0YW5pbWF0aW9uZW5kJyk7XG5cdFx0fTtcblxuXHRcdGRvY3VtZW50Lm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhdi53ZWJraXREaXNwbGF5aW5nRnVsbHNjcmVlbiAmJiB2LmVuZGVkICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBjaGFuZ2UgOiB6b29tIGluJyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgMTAwMDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR0aGF0LnBsYXlQYXVzZSgpO1xuXG5cdC8vIHRoYXQudmlkZW8ub25jdWVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQvLyBcdGNvbnNvbGUubG9nKCdjdWVjaGFuZ2UnKTtcblx0Ly8gfTtcblxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC52aWRlby5vbnBsYXkgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQucG9zdGVyKS5oaWRlKCk7XG5cdFx0JCh0aGF0LnBhdXNlQnRuKS5zaG93KCk7XG5cdFx0JCh0aGF0LnBsYXlCdG4pLmhpZGUoKTtcblx0XHRpZiAoIHRoaXMuY3VycmVudFRpbWUgIT0gMCApIHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcblx0XHR0aGF0LnBsYXlQYXVzZUZsYWcgPSAncGxheSc7XG5cdH07XG5cblx0dGhhdC52aWRlby5vbnBsYXlpbmcgPSBmdW5jdGlvbigpe1xuXHRcdHRoYXQucmVtb3ZlS2xhc3ModGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGF1c2UgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW87XG5cdHRoYXQudmlkZW8ub25wYXVzZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JCh0aGF0LmNvbnRyb2wpLnNob3coKTtcblx0XHQkKHRoYXQucGF1c2VCdG4pLmhpZGUoKTtcblx0XHQkKHRoYXQucGxheUJ0bikuc2hvdygpO1xuXHRcdGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMCkgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG5cdFx0dGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0XHRpZiAoIHYuZW5kZWQgKSB7XG5cdFx0XHRjb25zb2xlLmxvZygn64Gd64KoJyk7XG5cdFx0XHRpZiAoIHYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCfsoITssrTtmZTrqbQnKTtcblx0XHRcdFx0dGhhdC52aWRlby5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygn7KCE7LK07ZmU66m0IOuBneuCqCcpO1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygn7KCE7LK07ZmU66m0IOuBneuCqCcpO1xuXHRcdFx0XHRcdHZhciB2ID0gdGhhdC52aWRlbztcblx0XHRcdFx0XHR0aGF0LmVuZGVkQ2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHRpZiAoIHYuZXhpdEZ1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coMSk7XG5cdFx0XHRcdFx0di5leGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKDIpO1xuXHRcdFx0XHRcdHYud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZG9jdW1ldC5leGl0RnVsbHNjcmVlbiApIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygzKTtcblx0XHRcdFx0XHRkb2N1bWV0LmV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRvY3VtZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4gKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyg0KTtcblx0XHRcdFx0XHRkb2N1bWV0LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICggdi5lbmRlZCApIHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAwO1xuXHR0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cdHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuXHRjb25zb2xlLmxvZyh2aWRlbyk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpOyBcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24oIGVycm9yVHlwZSApIHtcblx0Ly8gaWYgKCByZWFkeVN0YXRlRmxhZyA9PSAgKVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IGZ1bmN0aW9uKHYpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0d3JhcHBlciA9IHRoYXQud3JhcHBlcjtcblx0d3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHYudmlkZW9XaWR0aCwgdi52aWRlb0hlaWdodCwgdi5jbGllbnRXaWR0aCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblRpbWVVcGRhdGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR2Lm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB2LnBhdXNlZCApIHJldHVybjtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG5cdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHRcdHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cblx0XHRpZiAoIHRoYXQucGxheVBhdXNlRmxhZyA9PSAncGxheScgKSB7XG5cdFx0XHR2LnBsYXkoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0di5wYXVzZSgpO1xuXHRcdH1cblx0fVxuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fZnVsbHNjcnJlbk1vZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG5cdCAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0aWYgKCB1aS51dGlsLmlzRGV2aWNlKCkuaW9zICkge1xuXHQgIGlmICggdHlwZW9mIHYud2Via2l0UGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYud2Via2l0UGxheXNJbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di53ZWJraXRQbGF5c0lubGluZSA9IGZhbHNlO1xuXHQgIGlmICggdHlwZW9mIHYucGxheXNJbmxpbmUgIT09ICd1bmRlZmluZWQnICYmIHYucGxheXNpbmxpbmUgPT0gdHJ1ZSApXG5cdFx0di5wbGF5c0lubGluZSA9IHRydWU7XG5cdCAgZWxzZSBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSB0cnVlO1xuXHR9XG5cdGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuXHQgIHYucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0ZWxzZSBpZiAodi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG5cdCAgdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVzb2x1dGlvbkNob2ljZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnRuR3JvdXAgPSB0aGlzLmJ0bkdyb3VwLFxuXHRcdGxvd1JlcyA9IHRoaXMubG93UmVzLFxuXHRcdGhpZ2hSZXMgPSB0aGlzLmhpZ2hSZXM7XG5cdGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG5cdFx0JChsb3dSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JChoaWdoUmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKHRoYXQubG93UmVzKS5hdHRyKCdzcmMnLCAkKHRoYXQubG93UmVzKS5kYXRhKCdzcmMnKSk7XG5cdFx0dGhhdC52aWRlbyA9ICQobG93UmVzKS5nZXQoMCk7XG5cdH0gZWxzZSB7XG5cdFx0JChsb3dSZXMpLmNzcyh7IG9wYWNpdHk6IDAgfSkuaGlkZSgpLmF0dHIoJ2RhdGEtcGxheScsICdmYWxzZScpO1xuXHRcdCQoaGlnaFJlcykuc2hvdygpLmNzcyh7IG9wYWNpdHk6IDEgfSkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcblx0XHQkKHRoYXQuaGlnaFJlcykuYXR0cignc3JjJywgJCh0aGF0LmhpZ2hSZXMpLmRhdGEoJ3NyYycpKTtcblx0XHR0aGF0LnZpZGVvID0gJChoaWdoUmVzKS5nZXQoMCk7XG5cdH1cblx0dGhhdC52aWRlby5sb2FkKCk7XG5cdC8vIHRoYXQudmVyaWZ5aW5nKCB0aGF0LnZpZGVvICk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUudmVyaWZ5aW5nID0gZnVuY3Rpb24gKCB2ICkge1xuXHRjb25zb2xlLmxvZyh2Lm5ldHdvcmtTdGF0ZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0diA9IHRoYXQudmlkZW8sXG5cdFx0bSwgcztcblxuXHR2LmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodi5kdXJhdGlvbiAqICh1aS52YWx1ZSAvIDEwMCksIDEwKTtcblx0dGhhdC5jdXJUaW1lID0gdi5jdXJyZW50VGltZTtcblx0bSA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lIC8gNjApICkudG9TdHJpbmcoKTtcblx0cyA9ICggTWF0aC5yb3VuZCh2LmN1cnJlbnRUaW1lICUgNjApICkudG9TdHJpbmcoKTtcblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gKG0ubGVuZ3RoIDwgMiA/ICcwJyArIG0gOiBtKSAgKyAnOicgKyAocy5sZW5ndGggPCAyID8gJzAnICsgcyA6IHMpO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHR2aWRlbyA9IHRoYXQudmlkZW87XG5cdHZhciBzLCBtLCBjdCA9IE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUpLCBkdXIgPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKTtcblx0aWYgKCBjdCA8IDYwICkge1xuXHRcdG0gPSAnMDAnO1xuXHRcdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHBhcnNlSW50KCBjdCAlIDYwICksXG5cdFx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdFx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdFx0bSA9IG0udG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG07XG5cdH1cblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdGlmICggc2VlayA9PSAnc2VlaycgKSB7XG5cdFx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHRcdFx0dmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0XHR9KTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xWaXNpYmxpbmcgPSBmdW5jdGlvbihjdHJsKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0fSwgMjAwMCk7XG4gIH0gZWxzZSB7XG5cdGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG5cdCQodGhhdC5jb250cm9sKS5zaG93KCk7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0aWYodGhhdC5jdXJUaW1lKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXHR0aGF0LmdldER1cmF0aW9uKCk7XG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG5cdFx0XHRpbWcgPSBuZXcgSW1hZ2UoKSxcblx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0aW1nSCA9IDAsXG5cdFx0XHR0aW1lb3V0LFxuXHRcdFx0aW50ZXJ2YWw7XG5cdFx0dmFyIGFhID0gMDtcblx0XHRpbWcuc3JjID0gYmc7XG5cdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDA7XG5cblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0Ly8gY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcblx0XHRcblx0XHRpbWdXID0gdGhhdC53cmFwcGVyLmNsaWVudFdpZHRoICogMS41O1xuXHRcdGltZ0ggPSAoIE1hdGgucm91bmQoaW1nLm5hdHVyYWxIZWlnaHQpICogOSApIC8gMTY7XG5cdFx0aW1nSCA9IE1hdGgucm91bmQoIGltZ0ggKSAqIDEuNTtcblx0XHQvLyBpbWdIID0gdGhhdC5nZXRSYXRpbyhpbWcubmF0dXJhbFdpZHRoLCBpbWcubmF0dXJhbEhlaWdodCwgaW1nVyk7XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoIChjb250ZXh0Lmdsb2JhbEFscGhhKS50b0ZpeGVkKDEpIDwgMSApIHtcblx0XHRcdFx0XHRpbWdXIC09IChpbWdXKjAuMDI1KTtcblx0XHRcdFx0XHRpbWdIIC09IChpbWdIKjAuMDI1KTtcblx0XHRcdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhICs9IDAuMDU7XG5cdFx0XHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoaW1nLCBjYW52YXMud2lkdGgvMiAtIGltZ1cvMiwgY2FudmFzLmhlaWdodC8yIC0gaW1nSC8yLCBpbWdXLCBpbWdIKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAxMDAwLzYwKVxuXHRcdH0sIDMwMCk7XG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy92aWRlby1wbGF5ZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9