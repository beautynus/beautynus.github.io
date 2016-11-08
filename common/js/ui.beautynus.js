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
	
	//style
	// import Swiper from './swiper.jquery.umd.min.js'; //swiper jquery plugin
	// import dev, { menuList } from './dev.js'; //개발용 스크립트 프로덕션시 삭제
	
	
	var win = window,
	    doc = document;
	
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
	    }
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
	
	    // 그룹 토글
	    , toggleGroup: function toggleGroup(group, element) {
	      $(group).find(element).on('click', function () {
	        $(group).find(element).removeClass('active');
	        $(this).addClass('active');
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
	  $('body').addClass(isDevice.check());
	
	  beautynus.accordian.init('.accordian');
	
	  //개발용 메서드 실행
	  if (location.href.indexOf('?dev') > -1) {
	    dev.appendMenuList();
	    dev.appendMenuBtn();
	  }
	});
	
	/*
	* VideoPlayer (c) yikl100@gmail.com, 2016
	*/
	window.VideoPlayer = function (wrapper) {
	  this.wrapper = document.querySelector(wrapper);
	  this.video = null, this.lowRes = $(wrapper).find('[data-res=low]').get(0);
	  this.highRes = $(wrapper).find('[data-res=high]').get(0);
	  this.playFlag = true;
	  this.curTime = 0;
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
	
	  this.getDuration();
	  this._init();
	};
	
	VideoPlayer.prototype._init = function () {
	  var that = this;
	  that.playBtn.addEventListener('click', function () {
	    that._play();
	  }, false);
	};
	
	VideoPlayer.prototype._play = function () {
	  var that = this;
	
	  if (that.playFlag) {
	    that.playFlag = false;
	    $(that.control).hide();
	    if (that.video == null) that.resolutionChoice();
	
	    that._onPlay();
	    that._onPause();
	    that._onTimeUpdate();
	    that._click();
	    that._fullscrrenMode();
	    that._pause();
	    that.makeSeekbar();
	    that.controlEvent();
	    that.dimmClick();
	  }
	  that.playPause();
	};
	
	VideoPlayer.prototype._onPlay = function () {
	  var that = this;
	  that.video.onplay = function () {
	    $(that.poster).hide();
	    $(that.pauseBtn).show();
	    $(that.playBtn).hide();
	    if (this.currentTime != 0) that.controlVisibling(true);
	  };
	};
	
	VideoPlayer.prototype._onPause = function () {
	  var that = this;
	  that.video.onpause = function () {
	    $(that.control).show();
	    $(that.pauseBtn).hide();
	    $(that.playBtn).show();
	    if (this.currentTime > 0) that.btnGroup.hide();
	    that.controlVisibling(false);
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
	      var duration = Math.round(video.duration),
	          s = '',
	          m = '';
	      s = (duration % 60).toString(), m = ((duration - s) / 60).toString();
	      s = s.length < 2 ? 0 + s : s;
	      m = m.length < 2 ? 0 + m : m;
	      that.videoTime.innerText = m + ':' + s;
	      that.endTime.innerText = m + ':' + s;
	      clearInterval(timer);
	    }
	    that.allocateSize(video);
	  }, 500);
	};
	
	VideoPlayer.prototype.allocateSize = function (v) {
	  var that = this,
	      wrapper = that.wrapper;
	  wrapper.style.height = that.getRatio(v.videoWidth, v.videoHeight, v.clientWidth) + 'px';
	};
	
	VideoPlayer.prototype._onTimeUpdate = function () {
	  var that = this;
	  that.video.ontimeupdate = function () {
	    if (that.video.paused) return;
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
	  var that = this;
	  console.log(that.video);
	  $(that.wrapper.querySelector('.seekbar')).slider({
	    range: 'min',
	    // max: duration,
	    slide: function slide(event, ui) {
	      that.video.pause();
	      that.getCurrentTime();
	      that.changeCurrentTime(ui);
	    },
	    change: function change(event, ui) {
	      that.video.play();
	    }
	  });
	};
	
	VideoPlayer.prototype._fullscrrenMode = function () {
	  var that = this,
	      v = that.video;
	  $(that.fullBtn).on('click', function () {
	    console.log(v);
	    if (ui.util.isDevice().ios) {
	      if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysInline == true) v.webkitPlaysInline = false;
	      if (typeof v.playsInline !== 'undefined' && v.playsinline == true) v.playsInline = true;else if (typeof v.webkitPlaysInline !== 'undefined' && v.webkitPlaysinline == true) v.webkitPlaysInline = true;
	    }
	    if (v.requestFullscreen) v.requestFullscreen();
	    // else if (v.mozRequestFullScreen)
	    //  v.mozRequestFullScreen();
	    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
	  });
	};
	
	VideoPlayer.prototype.resolutionChoice = function () {
	  var that = this,
	      btnGroup = this.btnGroup,
	      lowRes = this.lowRes,
	      highRes = this.highRes;
	  if (btnGroup.find('button.active').hasClass('low')) {
	    $(lowRes).show().attr('data-play', 'true');
	    $(highRes).hide().attr('data-play', 'false');
	    that.video = $(lowRes).get(0);
	  } else {
	    $(lowRes).hide().attr('data-play', 'false');
	    $(highRes).show().attr('data-play', 'true');
	    that.video = $(highRes).get(0);
	  }
	};
	
	VideoPlayer.prototype.changeCurrentTime = function (ui) {
	  var that = this;
	  var v = $('video:visible').get(0);
	  v.currentTime = parseInt(v.duration * (ui.value / 100), 10);
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
	  var v = this.video;
	  if (v.paused) v.play();else v.pause();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDE5MmNmMmQ5MjM4OTI4NjNmYmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiY29tbW9uIiwiZW1wdHlMaW5rRnVuYyIsImFsbEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYVRhZyIsImhyZWYiLCJpIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCIkIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwicGFyZW50cyIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJ2aWRlbyIsImxvd1JlcyIsImdldCIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwiZ2V0RHVyYXRpb24iLCJfaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJhZGRFdmVudExpc3RlbmVyIiwiX3BsYXkiLCJoaWRlIiwicmVzb2x1dGlvbkNob2ljZSIsIl9vblBsYXkiLCJfb25QYXVzZSIsIl9vblRpbWVVcGRhdGUiLCJfY2xpY2siLCJfZnVsbHNjcnJlbk1vZGUiLCJfcGF1c2UiLCJtYWtlU2Vla2JhciIsImNvbnRyb2xFdmVudCIsImRpbW1DbGljayIsInBsYXlQYXVzZSIsIm9ucGxheSIsInNob3ciLCJjdXJyZW50VGltZSIsImNvbnRyb2xWaXNpYmxpbmciLCJvbnBhdXNlIiwiZ2V0UmF0aW8iLCJ4IiwieSIsImwiLCJNYXRoIiwicm91bmQiLCJlcSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwiZHVyYXRpb24iLCJzIiwibSIsInRvU3RyaW5nIiwiaW5uZXJUZXh0IiwiY2xlYXJJbnRlcnZhbCIsImFsbG9jYXRlU2l6ZSIsInYiLCJzdHlsZSIsImhlaWdodCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsIm9udGltZXVwZGF0ZSIsInBhdXNlZCIsImdldEN1cnJlbnRUaW1lIiwiY29uc29sZSIsImxvZyIsInNsaWRlciIsInJhbmdlIiwic2xpZGUiLCJldmVudCIsInBhdXNlIiwiY2hhbmdlQ3VycmVudFRpbWUiLCJjaGFuZ2UiLCJwbGF5Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiYXR0ciIsInBhcnNlSW50IiwidmFsdWUiLCJzZWVrIiwiY3QiLCJkdXIiLCJjdHJsIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3JDQTs7QUFBOEI7QUFDOUI7QUFDQTs7O0FBS0EsS0FBSUEsTUFBTUMsTUFBVjtBQUFBLEtBQ0lDLE1BQU1DLFFBRFY7O0FBR0E7QUFDQUgsS0FBSUksRUFBSixHQUFTSCxPQUFPRyxFQUFQLElBQWE7O0FBRXJCO0FBQ0FDLFNBQU07QUFDTDtBQUNBQyxvQkFBZSx5QkFBVSxDQUFFOztBQUUzQjtBQUpLLE9BS0pDLE1BQU0sY0FBVUMsR0FBVixFQUFnQjtBQUN0QixXQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLGNBQU9BLElBQUlDLE9BQUosQ0FBWSxZQUFaLEVBQTBCLEVBQTFCLENBQVA7QUFDQSxNQVJJO0FBU0ZDLGVBQVUsb0JBQVU7QUFDbkI7QUFDQSxXQUFJQyxLQUFLQyxVQUFVQyxTQUFuQjtBQUNBLGNBQU87QUFDTEMsZ0JBQU8saUJBQVc7QUFDaEIsZUFBSyxLQUFLQyxPQUFWLEVBQW9CO0FBQ3BCLGlCQUFLLEtBQUtDLFdBQVYsRUFBd0IsT0FBTyxhQUFQLENBQXhCLEtBQ0ssT0FBTyxTQUFQO0FBQ0w7QUFDRCxl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O0FBQ04sRUFKRCxDOzs7Ozs7QUNwYkEsMEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDE5MmNmMmQ5MjM4OTI4NjNmYmJcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG5cdC8v7Jyg7Yu4IOuplOyEnOuTnFxuXHR1dGlsOiB7XG5cdFx0Ly8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuXHRcdGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCl7fVxuXG5cdFx0Ly8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcblx0XHQsdHJpbTogZnVuY3Rpb24oIHN0ciApIHtcblx0XHRcdGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0fVxuICAgICxpc0RldmljZTogZnVuY3Rpb24oKXtcbiAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICggdGhpcy5hbmRyb2lkICkge1xuICAgICAgICBcdFx0aWYgKCB0aGlzLmdpbmdlcmJyZWFkICkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgIFx0XHRlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgIFx0fVxuICAgICAgICBcdGlmICggdGhpcy5pb3MgKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgIFx0aWYgKCAhdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcyApIHJldHVybiAnbm8tbW9iaWxlJztcbiAgICAgICAgfSxcbiAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgfVxuICAgIH1cblx0fVxuXG5cdC8vIOqzte2GtSDrqZTshJzrk5xcblx0LGNvbW1vbjoge1xuXG5cdFx0Ly8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG5cdCAgXHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgIGlmICggX3Njb3BlLmxlbmd0aCA8PSAwICkgcmV0dXJuO1xuXHRcdFx0JCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0aWYoICggX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkgKXtcblx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH0gIGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSk7XG5cdFx0fVxuXG4gICAgLy8g6re466O5IO2GoOq4gFxuICAgICx0b2dnbGVHcm91cCA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KXtcbiAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuXHR9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgdmFyIGNhcmROZXdzID0ge1xuICAgIF9zY29wZTogJydcblxuICAgICxkZWZhdWx0T3B0aW9uczoge1xuICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgIH1cblxuICAgICxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG4gICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgICxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICB9XG5cbiAgfTtcbiAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgdmFyIGFjY29yZGlhbiA9IHtcbiAgXHRfc2NvcGU6ICcnXG4gIFx0LGluaXQ6IGZ1bmN0aW9uICggX3Njb3BlICl7XG4gIFx0XHRpZiAoIHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcgKVxuICBcdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcbiAgXHRcdGVsc2UgXG4gIFx0XHRcdHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICBcdFx0dGhpcy5jbGljaygpO1xuICBcdH1cbiAgXHQsY2xpY2s6IGZ1bmN0aW9uICggICkge1xuICBcdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcbiAgXHRcdFx0dmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG5cdFx0XHRpZiAoIGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpIClcblx0XHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQod2luZG93KS5zY3JvbGxUb3AoIGl0ZW0ucG9zaXRpb24oKS50b3AgKTtcblx0XHR9KTtcbiAgXHR9XG4gIH07XG4gIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKXtcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICBjb21tb24gPSB1aS5jb21tb24sXG4gICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuXHRjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuXHRjb21tb24udGFibGVGYWRlKCk7XG5cdCQoJ2JvZHknKS5hZGRDbGFzcyggaXNEZXZpY2UuY2hlY2soKSApO1xuXG5cdGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG5cdC8v6rCc67Cc7JqpIOuplOyEnOuTnCDsi6Ttlolcblx0aWYgKCBsb2NhdGlvbi5ocmVmLmluZGV4T2YoJz9kZXYnKSA+IC0xICkge1xuXHRcdGRldi5hcHBlbmRNZW51TGlzdCgpO1xuXHRcdGRldi5hcHBlbmRNZW51QnRuKCk7XG5cdH1cbn0pO1xuXG4vKlxuKiBWaWRlb1BsYXllciAoYykgeWlrbDEwMEBnbWFpbC5jb20sIDIwMTZcbiovXG53aW5kb3cuVmlkZW9QbGF5ZXIgPSBmdW5jdGlvbih3cmFwcGVyKSB7XG4gICAgdGhpcy53cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKTtcbiAgICB0aGlzLnZpZGVvID0gbnVsbCxcbiAgICB0aGlzLmxvd1JlcyA9ICQod3JhcHBlcikuZmluZCgnW2RhdGEtcmVzPWxvd10nKS5nZXQoMCk7XG4gICAgdGhpcy5oaWdoUmVzID0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9aGlnaF0nKS5nZXQoMCk7XG4gICAgdGhpcy5wbGF5RmxhZyA9IHRydWU7XG4gICAgdGhpcy5jdXJUaW1lID0gMDtcbiAgICB0aGlzLmNvbnRyb2xUaW1lciA9IG51bGw7XG4gICAgdGhpcy5wb3N0ZXIgPSB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLnBvc3RlcicpO1xuICAgIHRoaXMuY29udHJvbCA9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpO1xuICAgIHRoaXMuYmcgPSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmJnJyk7XG4gICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wbGF5Jyk7XG4gICAgdGhpcy5wYXVzZUJ0biA9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGF1c2UnKTtcbiAgICB0aGlzLnZpZGVvVGltZSA9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcucnVubmluZy10aW1lJyk7XG4gICAgdGhpcy50aW1lbGluZSA9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcbiAgICB0aGlzLmZ1bGxCdG4gPSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLmZ1bGwnKTtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKTtcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3IoJy5lbmQnKTtcbiAgICB0aGlzLnNlZWtiYXIgPSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKTtcbiAgICB0aGlzLmJ0bkdyb3VwID0gJCh0aGlzLmNvbnRyb2wpLmZpbmQoJy5idG4tZ3JvdXAnKTtcbiAgICB0aGlzLmFjdGl2ZUJ0biA9IHRoaXMuYnRuR3JvdXAuZmluZCgnYnV0dG9uLmFjdGl2ZScpO1xuXG4gICAgdGhpcy5nZXREdXJhdGlvbigpO1xuICAgIHRoaXMuX2luaXQoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHRoYXQuX3BsYXkoKTtcbiAgICB9LCBmYWxzZSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX3BsYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgaWYgKCB0aGF0LnBsYXlGbGFnICkge1xuICAgICAgdGhhdC5wbGF5RmxhZyA9IGZhbHNlO1xuICAgICAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcbiAgICAgIGlmICggdGhhdC52aWRlbyA9PSBudWxsICkgdGhhdC5yZXNvbHV0aW9uQ2hvaWNlKCk7XG5cbiAgICAgIHRoYXQuX29uUGxheSgpO1xuICAgICAgdGhhdC5fb25QYXVzZSgpO1xuICAgICAgdGhhdC5fb25UaW1lVXBkYXRlKCk7XG4gICAgICB0aGF0Ll9jbGljaygpO1xuICAgICAgdGhhdC5fZnVsbHNjcnJlbk1vZGUoKTtcbiAgICAgIHRoYXQuX3BhdXNlKCk7XG4gICAgICB0aGF0Lm1ha2VTZWVrYmFyKCk7XG4gICAgICB0aGF0LmNvbnRyb2xFdmVudCgpO1xuICAgICAgdGhhdC5kaW1tQ2xpY2soKTtcbiAgICB9XG4gICAgdGhhdC5wbGF5UGF1c2UoKTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fb25QbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9ucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICQodGhhdC5wb3N0ZXIpLmhpZGUoKTtcbiAgICAkKHRoYXQucGF1c2VCdG4pLnNob3coKTtcbiAgICAkKHRoYXQucGxheUJ0bikuaGlkZSgpO1xuICAgIGlmICggdGhpcy5jdXJyZW50VGltZSAhPSAwICkgdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBhdXNlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB0aGF0LnZpZGVvLm9ucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAkKHRoYXQuY29udHJvbCkuc2hvdygpO1xuICAgICQodGhhdC5wYXVzZUJ0bikuaGlkZSgpO1xuICAgICQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG4gICAgaWYgKHRoaXMuY3VycmVudFRpbWUgPiAwKSB0aGF0LmJ0bkdyb3VwLmhpZGUoKTtcbiAgICB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldFJhdGlvID0gZnVuY3Rpb24oeCwgeSwgbCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgdGFyZ2V0ID0gMDtcbiAgICB0YXJnZXQgPSBNYXRoLnJvdW5kKCh5ICogbCkgLyB4KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldER1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pLFxuICAgICAgICAgICAgICAgIHMgPSAnJyxcbiAgICAgICAgICAgICAgICBtID0gJyc7XG4gICAgICAgICAgICBzID0gKGR1cmF0aW9uICUgNjApLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgbSA9ICgoZHVyYXRpb24gLSBzKSAvIDYwKS50b1N0cmluZygpO1xuICAgICAgICAgICAgcyA9IHMubGVuZ3RoIDwgMiA/IDAgKyBzIDogcztcbiAgICAgICAgICAgIG0gPSBtLmxlbmd0aCA8IDIgPyAwICsgbSA6IG07XG4gICAgICAgICAgICB0aGF0LnZpZGVvVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgICAgICAgICAgIHRoYXQuZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuYWxsb2NhdGVTaXplKHZpZGVvKTtcbiAgICB9LCA1MDApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmFsbG9jYXRlU2l6ZSA9IGZ1bmN0aW9uKHYpe1xuICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICB3cmFwcGVyID0gdGhhdC53cmFwcGVyO1xuICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoYXQuZ2V0UmF0aW8odi52aWRlb1dpZHRoLCB2LnZpZGVvSGVpZ2h0LCB2LmNsaWVudFdpZHRoKSArICdweCc7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuICAgIHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcbiAgfTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC52aWRlbykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG4gICAgJCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG4gICAgJCh0aGF0LmNvbnRyb2wpLmFkZENsYXNzKCdyZW1vdmUtdGltZScpLnNob3coKTtcbiAgICB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcbiAgICB0aGF0LnBsYXlQYXVzZSgpO1xuICAgICQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG4gICAgJCh0aGlzKS5oaWRlKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcbiAgICB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuICAgICdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICAnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjb25zb2xlLmxvZyh0aGF0LnZpZGVvKTtcbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcbiAgICByYW5nZTogJ21pbicsXG4gICAgLy8gbWF4OiBkdXJhdGlvbixcbiAgICBzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcbiAgICAgIHRoYXQudmlkZW8ucGF1c2UoKTtcbiAgICAgIHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcbiAgICAgIHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgIHRoYXQudmlkZW8ucGxheSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZyh2KTtcbiAgICBpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG4gICAgICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuICAgICAgICB2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG4gICAgICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuICAgICAgICB2LnBsYXlzSW5saW5lID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcbiAgICAgICAgdi53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuICAgICAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIC8vIGVsc2UgaWYgKHYubW96UmVxdWVzdEZ1bGxTY3JlZW4pXG4gICAgLy8gIHYubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICBlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuICAgICAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG4gICAgICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICBidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG4gICAgICAgIGxvd1JlcyA9IHRoaXMubG93UmVzLFxuICAgICAgICBoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuICAgIGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG4gICAgICAgICQobG93UmVzKS5zaG93KCkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcbiAgICAgICAgJChoaWdoUmVzKS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG4gICAgICAgIHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQobG93UmVzKS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG4gICAgICAgICQoaGlnaFJlcykuc2hvdygpLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG4gICAgICAgIHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcbiAgICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHYgPSAkKCd2aWRlbzp2aXNpYmxlJykuZ2V0KDApO1xuICAgIHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuICAgIHZpZGVvID0gdGhhdC52aWRlbztcbiAgdmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuICBpZiAoIGN0IDwgNjAgKSB7XG4gICAgbSA9ICcwMCc7XG4gICAgcyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcbiAgfSBlbHNlIHtcbiAgICBzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcbiAgICBtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcbiAgICBzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcbiAgICBtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcbiAgfVxuICB0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgaWYgKCBzZWVrID09ICdzZWVrJyApIHtcbiAgICAkKCcuc2Vla2JhcicpLnNsaWRlcih7XG4gICAgICB2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuICAgIH0pO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG4gICAgdGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcbiAgICB9LCAyMDAwKTtcbiAgfSBlbHNlIHtcbiAgICBjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB2ID0gdGhpcy52aWRlbztcbiAgaWYgKCB2LnBhdXNlZCApIHYucGxheSgpO1xuICBlbHNlIHYucGF1c2UoKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=