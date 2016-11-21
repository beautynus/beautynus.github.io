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
			var startTime = options.startTime ? options.startTime / 1000 : 0;
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
		this._init();
	
		console.log(this);
	};
	
	VideoPlayer.prototype._init = function () {
		var that = this;
	
		that.addKlass(that.loadingElement, "active");
	
		that.playBtn.addEventListener('click', function () {
			if (that.mobileNetwork) {
				that.mobileNetwork = false;
				that.mobileNetworkCheck();
			} else {
				that._play();
			}
		}, false);
	};
	
	VideoPlayer.prototype._unload = function () {
		console.log('asdfsadasdas');
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
			if (that.video.onwebkitfullscreenchange) {
				that.video.onwebkitfullscreenchange = function () {
					console.log('aaaaaa');
				};
			}
	
			document.addEventListener('webkitbeginfullscreen', function () {
				console.log('fullscreen bigin');
			}, false);
	
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
		}
		that.playPause();
	
		// that.video.oncuechange = function(){
		// 	console.log('cuechange');
		// };
		// that.video.onchange = function () {
		// 	console.log('onchange');
		// };
		// if ( that.video.fullscreenchange )
		// 	that.video.fullscreenchange();
	
		// if ( that.video.onwebkitfullscreenchange ) {
		// 	that.video.onwebkitfullscreenchange = function(){
		// 		if ( this.ended ) {
		// 			setTimeout(function(){
		// 				if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?') ) {
		// 					alert('확인');
		// 				} else {
		// 					alert('취소');
		// 				}
		// 			}, 500);
		// 		}
		// 	}
		// } else if () {
		// 	that.video.onwebkitfullscreenchange = function(){
		// 		if ( this.ended ) {
		// 			setTimeout(function(){
		// 				if (confirm('고객님을 위한 깜짝 쿠폰이 발급되었습니다. $쿠폰명$ 쿠폰을 발급받으시겠습니까?') ) {
		// 					alert('확인');
		// 				} else {
		// 					alert('취소');
		// 				}
		// 			}, 500);
		// 		}
		// 	}
		// }
	
		// document.addEventListener('webkitfullscreenchange', function(){
		// 	endFull();
		// }, false);
		// document.addEventListener('fullscreenchange', function(){
		// 	endFull();
		// }, false);
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
				if (v.exitFullscreen) v.exitFullscreen();else if (v.webkitExitFullscreen) v.webkitExitFullscreen();
				if (this.ended) {
					if (v.webkitDisplayingFullscreen) {
						document.addEventListener('webkitendfullscreen', function () {
							setTimeout(function () {
								that.endedCallback();
							}, 500);
						}, false);
					} else {
						that.endedCallback();
					}
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
		// function ajax() {
		//  		var req = new XMLHttpRequest();
		// 	req.onreadystatechange = function () {
		// 		if ( req.readyState === req.DONE ) {
		// 			if ( req.status == 200 ) {
		// 				document.getElementById("myDiv").innerHTML = req.responseText;
		// 			}
		// 		}
		// 	};
		// }
	};
	
	VideoPlayer.prototype.changeCurrentTime = function (ui) {
		var that = this;
		var v = that.video;
		v.currentTime = parseInt(v.duration * (ui.value / 100), 10);
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
		if (ctrl) {
			that.controlTimer = setTimeout(function () {
				$(that.control).hide();
			}, 2000);
		} else {
			clearTimeout(that.controlTimer);
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
			    timer;
			img.src = bg;
			context.globalAlpha = 0;
	
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			// canvas.style.height = "100px";
	
			imgW = that.wrapper.clientWidth, imgH = that.getRatio(img.naturalWidth, img.naturalHeight, imgW);
			timer = setInterval(function () {
				if (context.globalAlpha.toFixed(1) < 1) {
					imgW += 1;
					imgH += 1;
					context.globalAlpha += 0.05;
					context.drawImage(img, canvas.width / 2 - imgW / 2, canvas.height / 2 - imgH / 2, imgW, imgH);
				} else {
					clearTimeout(timer);
				}
			}, 300 / 30);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2UxMTVmOWJjMmY5NjlkOGE2ODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWRlby1wbGF5ZXIuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIndpbiIsImRvYyIsImRvY3VtZW50IiwiY3Nsb2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwidWkiLCJ1dGlsIiwiY29tbW9uTm90aGluZyIsInRyaW0iLCJzdHIiLCJyZXBsYWNlIiwiaXNEZXZpY2UiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNoZWNrIiwiYW5kcm9pZCIsImdpbmdlcmJyZWFkIiwiaW9zIiwibWF0Y2giLCJkZXZpY2VTaXplIiwiaW5uZXJXaWR0aCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsb2FkaW5nQ29tcGxldGUiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbWFnZVByZWxvYWRlciIsImltZyIsImNsYXNzTmFtZSIsInN0b3AiLCJhbmltYXRlIiwib3BhY2l0eSIsInRvZ2dsZUdyb3VwIiwiZ3JvdXAiLCJlbGVtZW50IiwicG9wdXBDbG9zZSIsInBvcHVwIiwiaiIsImVxIiwicGFyZW50cyIsInJlbW92ZSIsImZha2VTZWxlY3QiLCJpdGVtIiwidmFsdWUiLCJzZWxlY3QiLCJsYWJlbCIsInRoYXQiLCJnZXQiLCJ0ZXh0Iiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJ0cmlnZ2VyIiwiYmVhdXR5bnVzIiwiY2FyZE5ld3MiLCJkZWZhdWx0T3B0aW9ucyIsImRpcmVjdGlvbiIsImxvb3AiLCJwYWdpbmF0aW9uIiwicGFnaW5hdGlvblR5cGUiLCJpbml0Iiwic2NvcGUiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaGFzQ2xhc3MiLCJzaWJsaW5ncyIsInNjcm9sbFRvcCIsInBvc2l0aW9uIiwidG9wIiwiam9pbiIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsImltYWdlcyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJxc2EiLCJxcyIsImRvbSIsInMiLCJkb21BbGwiLCJtYWtlRG9tIiwiYXR0ciIsImtleXMiLCJwdXRUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJwcmVwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGROb2RlcyIsImFwcGVuZCIsImFwcGVuZENoaWxkIiwibWVudURhdGEiLCJkZXB0aDEiLCJkZXB0aDIiLCJsaW5rcyIsInRpdGxlIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJjIiwiaXAiLCJpYyIsIm1lbnVUcmlnZ2VyIiwiY3RybENsYXNzIiwiY29uZGl0aW9uIiwiYWRkIiwiYUhSRUYiLCJkaW1tIiwiVmlkZW9QbGF5ZXIiLCJ3cmFwcGVyIiwiZW5kZWRDYWxsYmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJsb2FkaW5nRWxlbWVudCIsInZpZGVvIiwibG93UmVzIiwiaGlnaFJlcyIsInBsYXlGbGFnIiwiY3VyVGltZSIsInN0YXJ0VGltZSIsImR1cmF0aW9uIiwiY29udHJvbFRpbWVyIiwicG9zdGVyIiwiY29udHJvbCIsImJnIiwicGxheUJ0biIsInBhdXNlQnRuIiwidmlkZW9UaW1lIiwidGltZWxpbmUiLCJmdWxsQnRuIiwiZW5kVGltZSIsInNlZWtiYXIiLCJidG5Hcm91cCIsImFjdGl2ZUJ0biIsIm1vYmlsZU5ldHdvcmsiLCJhbGVydE1vYmlsZSIsInBsYXlQYXVzZUZsYWciLCJ3YXJuIiwicG9zdGVyTG9hZGVkIiwiX3VubG9hZCIsIl9pbml0IiwicHJvdG90eXBlIiwiYWRkS2xhc3MiLCJtb2JpbGVOZXR3b3JrQ2hlY2siLCJfcGxheSIsImJvZHkiLCJvbnVubG9hZCIsImFsZXJ0Iiwic3R5bGUiLCJkaXNwbGF5IiwicmVtb3ZlS2xhc3MiLCJ2IiwiaGlkZSIsInJlc29sdXRpb25DaG9pY2UiLCJfb25QbGF5IiwiX29uUGF1c2UiLCJfb25UaW1lVXBkYXRlIiwiX2NsaWNrIiwiX2Z1bGxzY3JyZW5Nb2RlIiwiX3BhdXNlIiwibWFrZVNlZWtiYXIiLCJjb250cm9sRXZlbnQiLCJkaW1tQ2xpY2siLCJvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UiLCJvbmxvYWQiLCJuZXR3b3JrU3RhdGUiLCJvbmxvYWRzdGFydCIsIm9ubG9hZGVkZGF0YSIsIm9ubG9hZGVkbWV0YWRhdGEiLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wbGF5aW5nIiwib25wYXVzZSIsImVuZGVkIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsIndlYmtpdERpc3BsYXlpbmdGdWxsc2NyZWVuIiwic2V0VGltZW91dCIsImdldFJhdGlvIiwieCIsInkiLCJsIiwiTWF0aCIsInJvdW5kIiwiZ2V0RHVyYXRpb24iLCJ0aW1lciIsInNldEludGVydmFsIiwicmVhZHlTdGF0ZSIsIm0iLCJ0b1N0cmluZyIsImlubmVyVGV4dCIsImNsZWFySW50ZXJ2YWwiLCJfZXJyb3IiLCJlcnJvclR5cGUiLCJhbGxvY2F0ZVNpemUiLCJoZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJvbnRpbWV1cGRhdGUiLCJwYXVzZWQiLCJnZXRDdXJyZW50VGltZSIsInNsaWRlciIsInJhbmdlIiwic3RhcnQiLCJldmVudCIsInBhdXNlIiwic2xpZGUiLCJjaGFuZ2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsInBsYXkiLCJ3ZWJraXRQbGF5c0lubGluZSIsInBsYXlzSW5saW5lIiwicGxheXNpbmxpbmUiLCJ3ZWJraXRQbGF5c2lubGluZSIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFbnRlckZ1bGxzY3JlZW4iLCJjc3MiLCJsb2FkIiwidmVyaWZ5aW5nIiwicGFyc2VJbnQiLCJzZWVrIiwiY3QiLCJkdXIiLCJjdHJsIiwiY2xlYXJUaW1lb3V0IiwiZWwiLCJkYXRhc2V0IiwiY2FudmFzVGFnIiwiaWQiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiSW1hZ2UiLCJpbWdXIiwiaW1nSCIsImdsb2JhbEFscGhhIiwid2lkdGgiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwidG9GaXhlZCIsImRyYXdJbWFnZSIsImtsYXNzIiwicmVnZXhwIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUY4QjtBQUs5QixLQUFJQSxJQUFJQyxPQUFPRCxDQUFmLEMsQ0FKZ0I7O0FBS2hCLEtBQUlFLE1BQU1ELE1BQVY7QUFBQSxLQUNJRSxNQUFNQyxRQURWOztBQUdBSCxRQUFPSSxLQUFQLEdBQWUsVUFBU0MsR0FBVCxFQUFjO0FB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YyxDQUFkLEdBQWtCeUMsT0FBSyxDQUF2RSxFQUEwRUQsSUFBMUUsRUFBZ0ZDLElBQWhGO0FBQ0EsS0FMRCxNQUtPO0FBQ05YLGtCQUFheEMsS0FBYjtBQUNBO0FBQ0QsSUFUTyxFQVNMLE1BQUksRUFUQyxDQUFSO0FBV0EsR0EvQkQ7QUFnQ0EsRUEzQ0Q7O0FBNkNBL0UsYUFBWWdDLFNBQVosQ0FBc0JDLFFBQXRCLEdBQWlDLFVBQVdySSxNQUFYLEVBQW1CNk8sS0FBbkIsRUFBMkI7QUFDM0QsTUFBSzdPLE9BQU9XLFNBQVAsQ0FBaUJpRCxPQUFqQixDQUF5QmlMLEtBQXpCLElBQWtDLENBQUMsQ0FBeEMsRUFBNEM7QUFDNUM3TyxTQUFPVyxTQUFQLElBQW9CLE1BQU1rTyxLQUExQjtBQUNBLEVBSEQ7O0FBS0F6SSxhQUFZZ0MsU0FBWixDQUFzQlMsV0FBdEIsR0FBb0MsVUFBVzdJLE1BQVgsRUFBbUI2TyxLQUFuQixFQUEyQjtBQUM5RCxNQUFJQyxTQUFTLElBQUlDLE1BQUosQ0FBV0YsS0FBWCxDQUFiO0FBQ0E3TyxTQUFPVyxTQUFQLEdBQW1CL0MsR0FBR0MsSUFBSCxDQUFRRSxJQUFSLENBQWNpQyxPQUFPVyxTQUFQLENBQWlCMUMsT0FBakIsQ0FBMEI2USxNQUExQixFQUFrQyxFQUFsQyxDQUFkLENBQW5CO0FBQ0EsRUFIRCxDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNlMTE1ZjliYzJmOTY5ZDhhNjg5XG4gKiovIiwiaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuaW1wb3J0ICcuL2Rldic7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5pbXBvcnQgJy4vdmlkZW8tcGxheWVyJztcblxuXG52YXIgJCA9IHdpbmRvdy4kO1xudmFyIHdpbiA9IHdpbmRvdyxcbiAgICBkb2MgPSBkb2N1bWVudDtcblxud2luZG93LmNzbG9nID0gZnVuY3Rpb24obXNnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG59O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG4gICAgLy/snKDti7gg66mU7ISc65OcXG4gICAgdXRpbDoge1xuICAgICAgICAvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG4gICAgICAgIGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCkge31cblxuICAgICAgICAvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuICAgICAgICAsXG4gICAgICAgIHRyaW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNEZXZpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy/rqqjrsJTsnbwgVUFcbiAgICAgICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2luZ2VyYnJlYWQpIHJldHVybiAnZ2luZ2VyYnJlYWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlvcykgcmV0dXJuICdpb3MnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MpIHJldHVybiAnbm8tbW9iaWxlJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlvczogdWEubWF0Y2goJ2lQaG9uZScpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZ2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRldmljZVNpemU6ICdkZXZpY2Utc2l6ZS0nICsgd2luZG93LmlubmVyV2lkdGhcbiAgICB9XG5cbiAgICAvLyDqs7XthrUg66mU7ISc65OcXG4gICAgLFxuICAgIGNvbW1vbjoge1xuXG4gICAgICAgIC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuICAgICAgICBlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG4gICAgICAgICAgICB2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksXG4gICAgICAgICAgICAgICAgYVRhZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgaHJlZiA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGFUYWcgPSBhbGxBW2ldO1xuICAgICAgICAgICAgICAgIGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICAgIGlmICh1aS51dGlsLnRyaW0oaHJlZikgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgYVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuICAgICAgICAsXG4gICAgICAgIHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG4gICAgICAgICxcbiAgICAgICAgdGFibGVGYWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgICAgICAgIGlmIChfc2NvcGUubGVuZ3RoIDw9IDApIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1mYWRlaW4td3JhcCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb2FkaW5nIG1hc2tcbiAgICAgICAgLFxuICAgICAgICBsb2FkaW5nQ29tcGxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGltYWdlUHJlbG9hZGVyKCcvZnJvbnQvaW1hZ2VzL2xvYWRpbmctY2lyY3VsYXIuZ2lmJywgZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc05hbWUgPSBcInZpZGVvLWxvYWRpbmctaW1hZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5Jykuc3RvcCgpLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgICAgICxcbiAgICAgICAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMYXllciBwb3B1cFxuICAgICAgICAsXG4gICAgICAgIHBvcHVwQ2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwb3B1cCA9ICQoJy5wb3B1cCcpO1xuICAgICAgICAgICAgaWYgKCBwb3B1cC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGk9MCwgbGVuZ3RoPXBvcHVwLmxlbmd0aDsgaTxsZW5ndGg7IGkrPTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLmVxKGopLmZpbmQoJy5idG4tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLnBvcHVwJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZha2VTZWxlY3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LXdyYXAuZmFrZScpLmVhY2goZnVuY3Rpb24oaXRlbSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICQodGhpcykuZmluZCgnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhhdC5vcHRpb25zW3RoYXQuc2VsZWN0ZWRJbmRleF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwudGV4dCggdGV4dCApO1xuICAgICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gICAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICAgIHZhciBjYXJkTmV3cyA9IHtcbiAgICAgICAgX3Njb3BlOiAnJyxcblxuICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICAgIHZhciBhY2NvcmRpYW4gPSB7XG4gICAgICAgIF9zY29wZTogJycsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKF9zY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChpdGVtLnBvc2l0aW9uKCkudG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gICAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gICAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpIHtcblxuICAgIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgICAgY29tbW9uID0gdWkuY29tbW9uLFxuICAgICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuICAgIGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG4gICAgY29tbW9uLnRhYmxlRmFkZSgpO1xuXG4gICAgJCgnYm9keScpLmFkZENsYXNzKFtpc0RldmljZS5jaGVjaygpLCB1dGlsLmRldmljZVNpemVdLmpvaW4oJyAnKSk7XG5cbiAgICBiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuICAgIGNvbW1vbi5sb2FkaW5nQ29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY2FsbGJhY2tzXG4gICAgfSk7XG5cbiAgICAvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG4gICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEpIHtcbiAgICAgICAgZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG4gICAgICAgIGRldi5hcHBlbmRNZW51QnRuKCk7XG4gICAgfVxufSk7XG5cbi8qXG4gKlx0SW1hZ2UgcHJlbG9hZGVyIChjKSB5aWtsMTAwNEBnbWFpbC5jb20sIDIwMTYuMTFcbiAqL1xud2luZG93LmltYWdlUHJlbG9hZGVyID0gZnVuY3Rpb24oaW1nLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZXMuc3JjID0gaW1nO1xuXG4gICAgaW1hZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhpbWFnZXMpO1xuICAgIH0sIGZhbHNlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImNvbnN0IFt3aW4sIGRvYywgcXNhLCBxc10gPSBbd2luZG93LCBkb2N1bWVudCwgJ3F1ZXJ5U2VsZWN0b3JBbGwnLCAncXVlcnlTZWxlY3RvciddO1xuXG5jb25zdFxuXHRkb20gXHQ9IHMgPT4gZG9jdW1lbnRbcXNdKHMpLFxuXHRkb21BbGwgXHQ9IHMgPT4gZG9jdW1lbnRbcXNhXShzKSxcblx0bWFrZURvbSA9IChzLCBhdHRyKSA9PiB7XG5cdFx0dmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocylcblx0XHRpZiAoIHR5cGVvZiBhdHRyID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGF0dHIpLmxlbmd0aCA+IDAgKVxuXHRcdFx0Zm9yICggbGV0IGkgaW4gYXR0ciApXG5cdFx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUoaSwgYXR0cltpXSk7XG5cdFx0cmV0dXJuIGRvbTtcblx0fSxcblx0cHV0VGV4dCA9IHMgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyksXG5cdHByZXBlbmQgPSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRhcmdldC5jaGlsZE5vZGVzWzBdKSxcblx0YXBwZW5kIFx0PSAoaXRlbSwgdGFyZ2V0KSA9PiB0YXJnZXQuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbmNvbnN0IG1lbnVEYXRhID0gW1xuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzte2GtVwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64K07Jqp7J20IOyXhuydhCDrlYxcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jb21tb24vbm8tcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLruIzrnpzrk5xcIixcblx0XHRkZXB0aDI6IFwi66ek7J6l7KCV67O0XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66ek7J6l7IaM7IudXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYnJhbmQvc3RvcmVJbmZvL3N0b3JlTmV3cy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrsLHtmZTsoJDtlonsgqwoU2FtcGxlKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JyYW5kL3N0b3JlRXZlbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCAo67ew7Yuw7Y+s7J247Yq4IOybuSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvc2VydmljZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLqsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoICjrt7Dti7Dtj6zsnbjtirgg7Ju5KVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9tYXRpb24uaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi7J2067Kk7Yq4Ju2WieyCrFwiLFxuXHRcdGRlcHRoMjogXCLsp4TtlonspJHsnbgg7J2067Kk7Yq4XCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4IC0g7J2867CYXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDri6jsnbzshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggKO2IrO2RnOyZhOujjClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsooXro4wg7ZuEIO2ZleyduClcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsX2ZpbmlzaC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsmIjslb0g7IucIC0g6rCc7J247KCV67O0IOyImOynkSDrsI8g7J207Jqp7JWI64K0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvcmVzZXJ2YXRpb24vYWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi67ew7Yuw7Luo7YWQ7LigXCIsXG5cdFx0ZGVwdGgyOiBcIuuqqeuhnVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCjsubTrk5zribTsiqTtmJUpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4HtkojsoJXrs7RcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKIIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RJbmZvL3ZpZXcuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDge2SiOumrOu3sFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuqzoOqwneyEvO2EsFwiLFxuXHRcdGRlcHRoMjogXCLqs7Xsp4Dsgqztla1cIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqqnroZ0gKyDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9ub3RpY2UvbGlzdC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuuPhOybgOunkFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrqZTsnbhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9oZWxwL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6XCLrp4jsnbTtjpjsnbTsp4BcIiAsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDrk7HquIlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvZ3JhZGUvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64KY7J2YIOy/oO2PsFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9jb3Vwb24vaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g67Cp66y47ZuE6riwXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L3Zpc2l0b3JzQm9vay5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg66as67ewIC0g7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL215UmV2aWV3L2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuq0gOyLrOyDge2SiFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wcm9kdWN0T2ZJbnRlcmVzdC9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIlwiLFxuXHRcdGRlcHRoMjogXCLqtazrp6TtmITtmalcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrpqzsiqTtirgocG9wdXAg7Y+s7ZWoKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9wdXJjaGFzZS9wZXJpb2QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yA7ZmU7ZmU66m0XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQke2RlcHRoMSA/IGA8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+YCA6IGBgfVxuXHQke2RlcHRoMiA9PSAnJyA/IGRlcHRoMiA6IGA8aDM+PHNwYW4+JHtkZXB0aDJ9PC9zcGFuPjwvaDM+YH1cblx0PHVsPiR7bGlua3MucmVkdWNlKChpcCwgaWMpID0+IHtcblx0XHRcdGxldCB7dGl0bGUsIGhyZWYsIGNvbXBsZXRlfSA9IGljO1xuXHRcdFx0cmV0dXJuIGAke2lwIHx8IFwiXCJ9XG5cdFx0PGxpJHtjb21wbGV0ZSA/ICcgY2xhc3M9XCJjcFwiJyA6IFwiXCJ9PjxhIGhyZWY9XCIke2hyZWZ9XCI+JHt0aXRsZX08L2E+PC9saT5gfSwgMCl9XG5cdDwvdWw+XG5cdGBcbn0sIDApO1xuXG4vLyDrqZTribQg67KE7Yq8IOyCveyehVxud2luZG93LmRldiA9IHtcblx0YXBwZW5kTWVudUJ0bjogZnVuY3Rpb24oKXtcblx0XHR2YXIgbWVudVRyaWdnZXIgPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZW51LXRyaWdnZXJcIj5cblx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG48L2J1dHRvbj5gO1xuXHRcblx0XHRcdGlmICggJCgnYnV0dG9uLm1lbnUtdHJpZ2dlcicpLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0XHR9XG5cdFxuXHRcdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG1lbnVMaXN0ID0gJCgnI21lbnUtbGlzdCcpLFxuXHRcdFx0XHQgICAgY3RybENsYXNzID0gJ2lzLWFjdGl2ZScsXG5cdFx0XHRcdCAgICBjb25kaXRpb24gPSBtZW51TGlzdC5oYXNDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdGlmIChjb25kaXRpb24pIHtcblx0XHRcdFx0XHRtZW51TGlzdC5hZGQoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoIGN0cmxDbGFzcyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1lbnVMaXN0LmFkZCgkKHRoaXMpKS5hZGRDbGFzcyggY3RybENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IGNsYXNzPW92ZXJ0aHJvdyAvPicpLmFwcGVuZCggbWVudUxpc3QgKSApO1xuXHRcdFx0JCgnI3dyYXAnKS5sZW5ndGggPD0gMCA/ICQoJ2JvZHknKS5wcmVwZW5kKCBtZW51TGlzdCApIDogJCgnI3dyYXAnKS5wcmVwZW5kKCBtZW51TGlzdCApO1xuXHRcdH1cblx0XHQkKCcjbWVudS1saXN0JykuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhSFJFRiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0aWYgKCBhSFJFRi5pbmRleE9mKCc/ZGV2JykgPD0gLTEgKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignaHJlZicsIGFIUkVGICsgJz9kZXYnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHQsZGltbTogZnVuY3Rpb24obXNnKXtcblx0XHRtc2cgPSBtc2cgfHwgJ+uCtOyaqeydtCDsl4bsirXri4jri6QuJztcblx0XHQkKCdib2R5JykuYXBwZW5kKFxuXHRcdFx0JCgnPGRpdiBjbGFzcz1cImRpbW1cIiAvPicpLmFwcGVuZChcblx0XHRcdFx0JChgPHNwYW4+JHttc2d9PHNwYW4vPjxidXR0b24gY2xhc3M9XCJjbG9zZVwiPlvri6vquLBdPC9zcGFuPjwvYnV0dG9uPmApXG5cdFx0XHQpXG5cdFx0KTtcblx0XHQkKCcuZGltbScpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbigpe1xuXHRcdFx0JCgnLmRpbW0nKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvZGV2LmpzXG4gKiovIiwiLypcbiogVmlkZW9QbGF5ZXIgKGMpIHlpa2wxMDBAZ21haWwuY29tLCAyMDE2LjExXG4qXHRuZXR3b3JrU3RhdGUgeyBudW1iZXIgfVxuKiBcdDAgPSBORVRXT1JLX0VNUFRZIC0gYXVkaW8vdmlkZW8gaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZFxuKlx0MSA9IE5FVFdPUktfSURMRSAtIGF1ZGlvL3ZpZGVvIGlzIGFjdGl2ZSBhbmQgaGFzIHNlbGVjdGVkIGEgcmVzb3VyY2UsIGJ1dCBpcyBub3QgdXNpbmcgdGhlIG5ldHdvcmtcbipcdDIgPSBORVRXT1JLX0xPQURJTkcgLSBicm93c2VyIGlzIGRvd25sb2FkaW5nIGRhdGFcbipcdDMgPSBORVRXT1JLX05PX1NPVVJDRSAtIG5vIGF1ZGlvL3ZpZGVvIHNvdXJjZSBmb3VuZFxuKlxuKlx0cmVhc3lTdGF0ZSB7IG51bXZlciB9XG4qXHQwID0gSEFWRV9OT1RISU5HIC0gbm8gaW5mb3JtYXRpb24gd2hldGhlciBvciBub3QgdGhlIGF1ZGlvL3ZpZGVvIGlzIHJlYWR5XHRcbipcdDEgPSBIQVZFX01FVEFEQVRBIC0gbWV0YWRhdGEgZm9yIHRoZSBhdWRpby92aWRlbyBpcyByZWFkeVxuKlx0MiA9IEhBVkVfQ1VSUkVOVF9EQVRBIC0gZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaXMgYXZhaWxhYmxlLCBidXQgbm90IGVub3VnaCBkYXRhIHRvIHBsYXkgbmV4dCBmcmFtZS9taWxsaXNlY29uZFxuKlx0MyA9IEhBVkVfRlVUVVJFX0RBVEEgLSBkYXRhIGZvciB0aGUgY3VycmVudCBhbmQgYXQgbGVhc3QgdGhlIG5leHQgZnJhbWUgaXMgYXZhaWxhYmxlXG4qXHQ0ID0gSEFWRV9FTk9VR0hfREFUQSAtIGVub3VnaCBkYXRhIGF2YWlsYWJsZSB0byBzdGFydCBwbGF5aW5nXG4qL1xud2luZG93LlZpZGVvUGxheWVyID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdC8vd3JhcHBlciwgZW5kZWRDYWxsYmFja1xuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIFZpZGVvUGxheWVyKSApIHJldHVybiBuZXcgVmlkZW9QbGF5ZXIod3JhcHBlciwgZW5kZWRDYWxsYmFjayk7XG5cdHRoaXMud3JhcHBlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMud3JhcHBlcik7XG5cdHRoaXMubG9hZGluZ0VsZW1lbnRcdD0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1sb2FkaW5nLWltYWdlJyksXG5cdHRoaXMudmlkZW8gXHRcdFx0PSBudWxsLFxuXHR0aGlzLmxvd1JlcyBcdFx0PSAkKHRoaXMud3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG5cdHRoaXMuaGlnaFJlcyBcdFx0PSAkKHRoaXMud3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWhpZ2hdJykuZ2V0KDApO1xuXHR0aGlzLnBsYXlGbGFnIFx0XHQ9IHRydWU7XG5cdHRoaXMuY3VyVGltZSBcdFx0PSAoZnVuY3Rpb24oKXtcblx0XHRpZiAoIG9wdGlvbnMuc3RhcnRUaW1lID49IG9wdGlvbnMuZHVyYXRpb24gKSByZXR1cm4gMDtcblx0XHR2YXIgc3RhcnRUaW1lID0gb3B0aW9ucy5zdGFydFRpbWUgPyAob3B0aW9ucy5zdGFydFRpbWUgLyAxMDAwKSA6IDA7XG5cdFx0cmV0dXJuIHN0YXJ0VGltZTtcblx0fSkoKTtcblx0dGhpcy5jb250cm9sVGltZXIgXHQ9IG51bGw7XG5cdHRoaXMucG9zdGVyIFx0XHQ9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG5cdHRoaXMuY29udHJvbCBcdFx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKTtcblx0dGhpcy5iZyBcdFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcblx0dGhpcy5wbGF5QnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheScpO1xuXHR0aGlzLnBhdXNlQnRuIFx0XHQ9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcblx0dGhpcy52aWRlb1RpbWUgXHRcdD0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcblx0dGhpcy50aW1lbGluZSBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG5cdHRoaXMuZnVsbEJ0biBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcblx0dGhpcy5zdGFydFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuXHR0aGlzLmVuZFRpbWUgXHRcdD0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuZW5kJyk7XG5cdHRoaXMuc2Vla2JhciBcdFx0PSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcblx0dGhpcy5idG5Hcm91cCBcdFx0PSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuXHR0aGlzLmFjdGl2ZUJ0biBcdFx0PSB0aGlzLmJ0bkdyb3VwLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcblx0dGhpcy5tb2JpbGVOZXR3b3JrXHQ9IG9wdGlvbnMubW9iaWxlTmV0d29yaztcblx0dGhpcy5hbGVydE1vYmlsZVx0PSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1vYmlsZScpO1xuXHR0aGlzLnBsYXlQYXVzZUZsYWcgXHQ9ICdwYXVzZSc7XG5cdHRoaXMuZW5kZWRDYWxsYmFjayA9IHR5cGVvZiBvcHRpb25zLmVuZGVkQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5kZWRDYWxsYmFjayA6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUud2FybignZW5kZWRDYWxsYmFjayB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuXHR9O1xuXG5cdHRoaXMucG9zdGVyTG9hZGVkKCk7XG5cdHRoaXMuX3VubG9hZCgpO1xuXHR0aGlzLl9pbml0KCk7XG5cblx0Y29uc29sZS5sb2codGhpcyk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0dGhhdC5hZGRLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIik7XG5cblx0dGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCB0aGF0Lm1vYmlsZU5ldHdvcmsgKSB7XG5cdFx0XHR0aGF0Lm1vYmlsZU5ldHdvcmsgPSBmYWxzZTtcblx0XHRcdHRoYXQubW9iaWxlTmV0d29ya0NoZWNrKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoYXQuX3BsYXkoKTtcblx0XHR9XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fdW5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRjb25zb2xlLmxvZygnYXNkZnNhZGFzZGFzJyk7XG5cdGRvY3VtZW50LmJvZHkub251bmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIG1vdmUnKTtcblx0fTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5tb2JpbGVOZXR3b3JrQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRhbGVydCA9IHRoYXQuYWxlcnRNb2JpbGU7XG5cdHRoYXQuYWRkS2xhc3MoYWxlcnQsICdhY3RpdmUnKTtcblx0dGhhdC5jb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0YWxlcnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm9rJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdHRoYXQuX3BsYXkoKTtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKGFsZXJ0LCAnYWN0aXZlJyk7XG5cdH0sIGZhbHNlKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHR2ID0gbnVsbDtcblxuXHR0aGF0LmFkZEtsYXNzKCB0aGF0LmxvYWRpbmdFbGVtZW50LCBcImFjdGl2ZVwiKTtcblxuXHRpZiAoIHRoYXQucGxheUZsYWcgKSB7XG5cdFx0dGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuXHRcdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHRcdC8vIGlmICggdGhhdC5jdXJUaW1lICkgdi5jdXJyZW50VGltZSA9IHRoYXQuY3VyVGltZTsgXG5cblx0XHR0aGF0Ll9vblBsYXkoKTtcblx0XHR0aGF0Ll9vblBhdXNlKCk7XG5cdFx0dGhhdC5fb25UaW1lVXBkYXRlKCk7XG5cdFx0dGhhdC5fY2xpY2soKTtcblx0XHR0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuXHRcdHRoYXQuX3BhdXNlKCk7XG5cdFx0dGhhdC5tYWtlU2Vla2JhcigpO1xuXHRcdHRoYXQuY29udHJvbEV2ZW50KCk7XG5cdFx0dGhhdC5kaW1tQ2xpY2soKTtcblx0XHRpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHRcdFx0dGhhdC52aWRlby5vbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygnYWFhYWFhJyk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGJlZ2luZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZygnZnVsbHNjcmVlbiBiaWdpbicpO1xuXHRcdH0sIGZhbHNlKTtcblxuXHRcdHYub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWQnLCB2Lm5ldHdvcmtTdGF0ZSk7XG5cdFx0fTtcblx0XHR2Lm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdvbmxvYWRzdGFydCcuIHYubmV0d29ya1N0YXRlKTtcblx0XHR9O1xuXHRcdHYub25sb2FkZWRkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdsb2FkZWRkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdFx0di5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKCdvbmxvYWRlZG1ldGFkYXRhJywgdi5uZXR3b3JrU3RhdGUpO1xuXHRcdH07XG5cdH1cblx0dGhhdC5wbGF5UGF1c2UoKTtcblxuXHQvLyB0aGF0LnZpZGVvLm9uY3VlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRjb25zb2xlLmxvZygnY3VlY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIHRoYXQudmlkZW8ub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ29uY2hhbmdlJyk7XG5cdC8vIH07XG5cdC8vIGlmICggdGhhdC52aWRlby5mdWxsc2NyZWVuY2hhbmdlIClcblx0Ly8gXHR0aGF0LnZpZGVvLmZ1bGxzY3JlZW5jaGFuZ2UoKTtcblxuXHQvLyBpZiAoIHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlICkge1xuXHQvLyBcdHRoYXQudmlkZW8ub253ZWJraXRmdWxsc2NyZWVuY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0Ly8gXHRcdGlmICggdGhpcy5lbmRlZCApIHtcblx0Ly8gXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0XHRcdGlmIChjb25maXJtKCfqs6DqsJ3ri5jsnYQg7JyE7ZWcIOq5nOynnSDsv6Dtj7DsnbQg67Cc6riJ65CY7JeI7Iq164uI64ukLiAk7L+g7Y+w66qFJCDsv6Dtj7DsnYQg67Cc6riJ67Cb7Jy87Iuc6rKg7Iq164uI6rmMPycpICkge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+2ZleyduCcpO1xuXHQvLyBcdFx0XHRcdH0gZWxzZSB7XG5cdC8vIFx0XHRcdFx0XHRhbGVydCgn7Leo7IaMJyk7XG5cdC8vIFx0XHRcdFx0fVxuXHQvLyBcdFx0XHR9LCA1MDApO1xuXHQvLyBcdFx0fVxuXHQvLyBcdH1cblx0Ly8gfSBlbHNlIGlmICgpIHtcblx0Ly8gXHR0aGF0LnZpZGVvLm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRpZiAoIHRoaXMuZW5kZWQgKSB7XG5cdC8vIFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0Ly8gXHRcdFx0XHRpZiAoY29uZmlybSgn6rOg6rCd64uY7J2EIOychO2VnCDquZzsp50g7L+g7Y+w7J20IOuwnOq4ieuQmOyXiOyKteuLiOuLpC4gJOy/oO2PsOuqhSQg7L+g7Y+w7J2EIOuwnOq4ieuwm+ycvOyLnOqyoOyKteuLiOq5jD8nKSApIHtcblx0Ly8gXHRcdFx0XHRcdGFsZXJ0KCftmZXsnbgnKTtcblx0Ly8gXHRcdFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRcdFx0YWxlcnQoJ+y3qOyGjCcpO1xuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSwgNTAwKTtcblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIH1cblxuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVuY3Rpb24oKXtcblx0Ly8gXHRlbmRGdWxsKCk7XG5cdC8vIH0sIGZhbHNlKTtcblx0Ly8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdC8vIFx0ZW5kRnVsbCgpO1xuXHQvLyB9LCBmYWxzZSk7XG5cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG5cdFx0aWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5wbGF5UGF1c2VGbGFnID0gJ3BsYXknO1xuXHR9O1xuXG5cdHRoYXQudmlkZW8ub25wbGF5aW5nID0gZnVuY3Rpb24oKXtcblx0XHR0aGF0LnJlbW92ZUtsYXNzKHRoYXQubG9hZGluZ0VsZW1lbnQsIFwiYWN0aXZlXCIpO1xuXHR9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcblx0XHQkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuXHRcdCQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuXHRcdCQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG5cdFx0aWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuXHRcdGlmICggdi5lbmRlZCApIHtcblx0XHRcdGlmICggdi5leGl0RnVsbHNjcmVlbiApIHYuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdGVsc2UgaWYgKCB2LndlYmtpdEV4aXRGdWxsc2NyZWVuICkgdi53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuXHRcdFx0aWYgKCB0aGlzLmVuZGVkICkge1xuXHRcdFx0XHRpZiAoIHYud2Via2l0RGlzcGxheWluZ0Z1bGxzY3JlZW4gKSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZW5kZnVsbHNjcmVlbicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdHRoYXQuZW5kZWRDYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhhdC5lbmRlZENhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHRhcmdldCA9IDA7XG5cdHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aGF0ID0gdGhpcztcblx0dmFyIHZpZGVvID0gJCh0aGF0LndyYXBwZXIpLmZpbmQoJ3ZpZGVvOnZpc2libGUnKS5lcSgwKS5nZXQoMCk7XG5cdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh2aWRlby5yZWFkeVN0YXRlID4gMCkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5yb3VuZCh2aWRlby5kdXJhdGlvbiksXG5cdFx0XHRcdHMgPSAnJyxcblx0XHRcdFx0bSA9ICcnO1xuXHRcdFx0cyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuXHRcdFx0bSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuXHRcdFx0cyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcblx0XHRcdG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG5cdFx0XHR0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpOyBcblx0XHRcdC8vIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcblx0XHR9XG5cdH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24oIGVycm9yVHlwZSApIHtcblx0Ly8gaWYgKCByZWFkeVN0YXRlRmxhZyA9PSAgKVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IGZ1bmN0aW9uKHYpe1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0d3JhcHBlciA9IHRoYXQud3JhcHBlcjtcblx0d3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHYudmlkZW9XaWR0aCwgdi52aWRlb0hlaWdodCwgdi5jbGllbnRXaWR0aCkgKyAncHgnO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblRpbWVVcGRhdGUgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXHR2Lm9udGltZXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYgKCB2LnBhdXNlZCApIHJldHVybjtcblx0XHR0aGF0LmdldEN1cnJlbnRUaW1lKCdzZWVrJyk7XG5cdH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2NsaWNrID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQudmlkZW8pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHR0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcblx0JCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG5cdCQodGhhdC5jb250cm9sKS5hZGRDbGFzcygncmVtb3ZlLXRpbWUnKS5zaG93KCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyh0cnVlKTtcbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgJCh0aGF0LnBhdXNlQnRuKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcblx0dGhhdC5wbGF5UGF1c2UoKTtcblx0JCh0aGF0LnBsYXlCdG4pLnNob3coKTtcblx0JCh0aGlzKS5oaWRlKCk7XG5cdHRoYXQucGxheVBhdXNlRmxhZyA9ICdwYXVzZSc7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdCQodGhhdC5jb250cm9sKS5oaWRlKCk7XG5cdHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5jb250cm9sKS5vbih7XG5cdCdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gdGhhdC5jb250cm9sVmlzaWJsaW5nKGZhbHNlKTtcblx0fSxcblx0J21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnOiBmdW5jdGlvbigpIHtcblx0ICAvLyB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdHYgPSB0aGF0LnZpZGVvO1xuXG4gICQodGhhdC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWVrYmFyJykpLnNsaWRlcih7XG5cdHJhbmdlOiAnbWluJyxcblx0Ly8gbWF4OiBkdXJhdGlvbixcblx0c3RhcnQ6IGZ1bmN0aW9uICggZXZlbnQsIHVpICkge1xuXHRcdHYucGF1c2UoKTtcblx0fSxcblx0c2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cdFx0dGhhdC5nZXRDdXJyZW50VGltZSgpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcblx0XHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG5cdFx0dGhhdC5jaGFuZ2VDdXJyZW50VGltZSh1aSk7XG5cdFx0aWYgKCB0aGF0LnBsYXlQYXVzZUZsYWcgPT0gJ3BsYXknICkge1xuXHRcdFx0di5wbGF5KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYucGF1c2UoKTtcblx0XHR9XG5cdH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuXHQgIHYgPSB0aGF0LnZpZGVvOyBcbiAgJCh0aGF0LmZ1bGxCdG4pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdGlmICggdWkudXRpbC5pc0RldmljZSgpLmlvcyApIHtcblx0ICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuXHRcdHYud2Via2l0UGxheXNJbmxpbmUgPSBmYWxzZTtcblx0ICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuXHRcdHYucGxheXNJbmxpbmUgPSB0cnVlO1xuXHQgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcblx0XHR2LndlYmtpdFBsYXlzSW5saW5lID0gdHJ1ZTtcblx0fVxuXHRpZiAodi5yZXF1ZXN0RnVsbHNjcmVlbilcblx0ICB2LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdGVsc2UgaWYgKHYud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pXG5cdCAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuXHRlbHNlIGlmICggdi53ZWJraXRFbnRlckZ1bGxzY3JlZW4gKVxuXHQgIHYud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnJlc29sdXRpb25DaG9pY2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdGJ0bkdyb3VwID0gdGhpcy5idG5Hcm91cCxcblx0XHRsb3dSZXMgPSB0aGlzLmxvd1Jlcyxcblx0XHRoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuXHRpZiAoYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpLmhhc0NsYXNzKCdsb3cnKSkge1xuXHRcdCQobG93UmVzKS5zaG93KCkuY3NzKHsgb3BhY2l0eTogMSB9KS5hdHRyKCdkYXRhLXBsYXknLCAndHJ1ZScpO1xuXHRcdCQoaGlnaFJlcykuY3NzKHsgb3BhY2l0eTogMCB9KS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG5cdFx0JCh0aGF0Lmxvd1JlcykuYXR0cignc3JjJywgJCh0aGF0Lmxvd1JlcykuZGF0YSgnc3JjJykpO1xuXHRcdHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuXHR9IGVsc2Uge1xuXHRcdCQobG93UmVzKS5jc3MoeyBvcGFjaXR5OiAwIH0pLmhpZGUoKS5hdHRyKCdkYXRhLXBsYXknLCAnZmFsc2UnKTtcblx0XHQkKGhpZ2hSZXMpLnNob3coKS5jc3MoeyBvcGFjaXR5OiAxIH0pLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG5cdFx0JCh0aGF0LmhpZ2hSZXMpLmF0dHIoJ3NyYycsICQodGhhdC5oaWdoUmVzKS5kYXRhKCdzcmMnKSk7XG5cdFx0dGhhdC52aWRlbyA9ICQoaGlnaFJlcykuZ2V0KDApO1xuXHR9XG5cdHRoYXQudmlkZW8ubG9hZCgpO1xuXHQvLyB0aGF0LnZlcmlmeWluZyggdGhhdC52aWRlbyApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnZlcmlmeWluZyA9IGZ1bmN0aW9uICggdiApIHtcblx0Ly8gZnVuY3Rpb24gYWpheCgpIHtcbiAvLyAgXHRcdHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0Ly8gXHRyZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHQvLyBcdFx0aWYgKCByZXEucmVhZHlTdGF0ZSA9PT0gcmVxLkRPTkUgKSB7XG5cdC8vIFx0XHRcdGlmICggcmVxLnN0YXR1cyA9PSAyMDAgKSB7XG5cdC8vIFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteURpdlwiKS5pbm5lckhUTUwgPSByZXEucmVzcG9uc2VUZXh0O1xuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9XG5cdC8vIFx0fTtcblx0Ly8gfVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNoYW5nZUN1cnJlbnRUaW1lID0gZnVuY3Rpb24odWkpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuXHR2YXIgdiA9IHRoYXQudmlkZW87XG5cdHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xuXHR0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcblx0dmFyIHRoYXQgPSB0aGlzLFxuXHR2aWRlbyA9IHRoYXQudmlkZW87XG5cdHZhciBzLCBtLCBjdCA9IE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUpLCBkdXIgPSBNYXRoLnJvdW5kKHZpZGVvLmR1cmF0aW9uKTtcblx0aWYgKCBjdCA8IDYwICkge1xuXHRcdG0gPSAnMDAnO1xuXHRcdHMgPSBjdC50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBjdC50b1N0cmluZygpIDogY3Q7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHBhcnNlSW50KCBjdCAlIDYwICksXG5cdFx0bSA9IHBhcnNlSW50KCAoY3QgLSBzKSAvIDYwICk7XG5cdFx0cyA9IHMudG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgcyA6IHM7XG5cdFx0bSA9IG0udG9TdHJpbmcoKS5sZW5ndGggPCAyID8gJzAnICsgbSA6IG07XG5cdH1cblx0dGhhdC5zdGFydFRpbWUuaW5uZXJUZXh0ID0gbSArICc6JyArIHM7XG5cdGlmICggc2VlayA9PSAnc2VlaycgKSB7XG5cdFx0JCgnLnNlZWtiYXInKS5zbGlkZXIoe1xuXHRcdFx0dmFsdWU6IHBhcnNlSW50KCAoMTAwIC8gZHVyKSAqIGN0IClcblx0XHR9KTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xWaXNpYmxpbmcgPSBmdW5jdGlvbihjdHJsKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoY3RybCkge1xuXHR0aGF0LmNvbnRyb2xUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcblx0fSwgMjAwMCk7XG4gIH0gZWxzZSB7XG5cdGNsZWFyVGltZW91dCh0aGF0LmNvbnRyb2xUaW1lcik7XG4gIH1cbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5wbGF5UGF1c2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRoYXQgXHQ9IHRoaXMsXG5cdFx0diBcdFx0PSB0aGF0LnZpZGVvO1xuXG5cdGlmICggdi5wYXVzZWQgKSB7XG5cdFx0aWYodGhhdC5jdXJUaW1lKSB2LmN1cnJlbnRUaW1lID0gdGhhdC5jdXJUaW1lO1xuXHRcdHYucGxheSgpO1xuXHR9IGVsc2Uge1xuXHRcdHYucGF1c2UoKTtcblx0fVxufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLnBvc3RlckxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YmcgPSBcIlwiLFxuXHRcdGVsID0gdGhhdC5wb3N0ZXIucXVlcnlTZWxlY3RvcignLmltZycpLFxuXHRcdHNyYyA9ICcnO1xuXHRiZyA9IGVsLmRhdGFzZXQuYmc7XG5cblx0dmFyIGNhbnZhc1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdGNhbnZhc1RhZy5pZCA9IFwidmlkZW9Qb3N0ZXJcIjtcblx0dGhhdC5wb3N0ZXIuYXBwZW5kQ2hpbGQoIGNhbnZhc1RhZyApO1xuXHR0aGF0LmdldER1cmF0aW9uKCk7XG5cdGltYWdlUHJlbG9hZGVyKGJnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCB0aGF0LmxvYWRpbmdFbGVtZW50ICkge1xuXHRcdFx0dGhhdC5yZW1vdmVLbGFzcyggdGhhdC5sb2FkaW5nRWxlbWVudCwgXCJhY3RpdmVcIiApO1xuXHRcdFx0dGhhdC5jb250cm9sLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdH1cblx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvUG9zdGVyJyksXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG5cdFx0XHRpbWcgPSBuZXcgSW1hZ2UoKSxcblx0XHRcdGltZ1cgPSAwLFxuXHRcdFx0aW1nSCA9IDAsXG5cdFx0XHR0aW1lcjtcblx0XHRpbWcuc3JjID0gYmc7XG5cdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDA7XG5cblx0XHRjYW52YXMuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0Ly8gY2FudmFzLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcblxuXHRcdGltZ1cgPSB0aGF0LndyYXBwZXIuY2xpZW50V2lkdGgsXG5cdFx0aW1nSCA9IHRoYXQuZ2V0UmF0aW8oaW1nLm5hdHVyYWxXaWR0aCwgaW1nLm5hdHVyYWxIZWlnaHQsIGltZ1cpO1xuXHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblx0XHRcdGlmICggKGNvbnRleHQuZ2xvYmFsQWxwaGEpLnRvRml4ZWQoMSkgPCAxICkge1xuXHRcdFx0XHRpbWdXICs9IDE7XG5cdFx0XHRcdGltZ0ggKz0gMTtcblx0XHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSArPSAwLjA1O1xuXHRcdFx0XHRjb250ZXh0LmRyYXdJbWFnZShpbWcsIGNhbnZhcy53aWR0aC8yIC0gaW1nVy8yLCBjYW52YXMuaGVpZ2h0LzIgLSBpbWdILzIsIGltZ1csIGltZ0gpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdH1cblx0XHR9LCAzMDAvMzApXG5cdFx0XG5cdH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFkZEtsYXNzID0gZnVuY3Rpb24gKCB0YXJnZXQsIGtsYXNzICkge1xuXHRpZiAoIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihrbGFzcykgPiAtMSApIHJldHVybiA7XG5cdHRhcmdldC5jbGFzc05hbWUgKz0gJyAnICsga2xhc3M7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucmVtb3ZlS2xhc3MgPSBmdW5jdGlvbiAoIHRhcmdldCwga2xhc3MgKSB7XG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKGtsYXNzKTtcblx0dGFyZ2V0LmNsYXNzTmFtZSA9IHVpLnV0aWwudHJpbSggdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKCByZWdleHAsIFwiXCIgKSApO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy92aWRlby1wbGF5ZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9