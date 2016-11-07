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
	  var timer = setInterval(function () {
	    var video = $(that.wrapper).find('video:visible').eq(0).get(0);
	    if (video.readyState > 0) {
	      var duration = Math.round(video.duration);
	      s = (duration % 60).toString(), m = ((duration - s) / 60).toString();
	      s = s.length < 2 ? 0 + s : s;
	      m = m.length < 2 ? 0 + m : m;
	      videoTime.innerText = m + ':' + s;
	      endTime.innerText = m + ':' + s;
	      clearInterval(timer);
	    }
	    movieContent.style.height = that.getRatio(video.videoWidth, video.videoHeight, video.clientWidth) + 'px';
	  }, 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGE4MzBhN2FmZjAyNGZlYzFhM2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiY29tbW9uIiwiZW1wdHlMaW5rRnVuYyIsImFsbEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYVRhZyIsImhyZWYiLCJpIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCIkIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwicGFyZW50cyIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImxvY2F0aW9uIiwiaW5kZXhPZiIsImRldiIsImFwcGVuZE1lbnVMaXN0IiwiYXBwZW5kTWVudUJ0biIsIlZpZGVvUGxheWVyIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJ2aWRlbyIsImxvd1JlcyIsImdldCIsImhpZ2hSZXMiLCJwbGF5RmxhZyIsImN1clRpbWUiLCJjb250cm9sVGltZXIiLCJwb3N0ZXIiLCJjb250cm9sIiwiYmciLCJwbGF5QnRuIiwicGF1c2VCdG4iLCJ2aWRlb1RpbWUiLCJ0aW1lbGluZSIsImZ1bGxCdG4iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic2Vla2JhciIsImJ0bkdyb3VwIiwiYWN0aXZlQnRuIiwiX2luaXQiLCJwcm90b3R5cGUiLCJ0aGF0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9wbGF5IiwiaGlkZSIsInJlc29sdXRpb25DaG9pY2UiLCJfb25QbGF5IiwiX29uUGF1c2UiLCJfb25UaW1lVXBkYXRlIiwiX2NsaWNrIiwiX2Z1bGxzY3JyZW5Nb2RlIiwiX3BhdXNlIiwibWFrZVNlZWtiYXIiLCJjb250cm9sRXZlbnQiLCJkaW1tQ2xpY2siLCJwbGF5UGF1c2UiLCJvbnBsYXkiLCJzaG93IiwiY3VycmVudFRpbWUiLCJjb250cm9sVmlzaWJsaW5nIiwib25wYXVzZSIsImdldFJhdGlvIiwieCIsInkiLCJsIiwiTWF0aCIsInJvdW5kIiwiZ2V0RHVyYXRpb24iLCJ0aW1lciIsInNldEludGVydmFsIiwiZXEiLCJyZWFkeVN0YXRlIiwiZHVyYXRpb24iLCJzIiwidG9TdHJpbmciLCJtIiwiaW5uZXJUZXh0IiwiY2xlYXJJbnRlcnZhbCIsIm1vdmllQ29udGVudCIsInN0eWxlIiwiaGVpZ2h0IiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0Iiwib250aW1ldXBkYXRlIiwicGF1c2VkIiwiZ2V0Q3VycmVudFRpbWUiLCJjb25zb2xlIiwibG9nIiwic2xpZGVyIiwicmFuZ2UiLCJzbGlkZSIsImV2ZW50IiwicGF1c2UiLCJjaGFuZ2VDdXJyZW50VGltZSIsImNoYW5nZSIsInBsYXkiLCJ2Iiwid2Via2l0UGxheXNJbmxpbmUiLCJwbGF5c0lubGluZSIsInBsYXlzaW5saW5lIiwid2Via2l0UGxheXNpbmxpbmUiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwiYXR0ciIsInBhcnNlSW50IiwidmFsdWUiLCJzZWVrIiwiY3QiLCJkdXIiLCJjdHJsIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3JDQTs7QUFBOEI7QUFDOUI7QUFDQTs7O0FBS0EsS0FBSUEsTUFBTUMsTUFBVjtBQUFBLEtBQ0lDLE1BQU1DLFFBRFY7O0FBR0E7QUFDQUgsS0FBSUksRUFBSixHQUFTSCxPQUFPRyxFQUFQLElBQWE7O0FBRXJCO0FBQ0FDLFNBQU07QUFDTDtBQUNBQyxvQkFBZSx5QkFBVSxDQUFFOztBQUUzQjtBQUpLLE9BS0pDLE1BQU0sY0FBVUMsR0FBVixFQUFnQjtBQUN0QixXQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLGNBQU9BLElBQUlDLE9BQUosQ0FBWSxZQUFaLEVBQTBCLEVBQTFCLENBQVA7QUFDQSxNQVJJO0FBU0ZDLGVBQVUsb0JBQVU7QUFDbkI7QUFDQSxXQUFJQyxLQUFLQyxVQUFVQyxTQUFuQjtBQUNBLGNBQU87QUFDTEMsZ0JBQU8saUJBQVc7QUFDaEIsZUFBSyxLQUFLQyxPQUFWLEVBQW9CO0FBQ3BCLGlCQUFLLEtBQUtDLFdBQVYsRUFBd0IsT0FBTyxhQUFQLENBQXhCLEtBQ0ssT0FBTyxTQUFQO0FBQ0w7QUFDRCxl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QixDQUF0QixHQUEwQixNQUFNZ0gsQ0FBaEMsR0FBb0NBLENBQXhDO0FBQ0Q7QUFDRGxDLFFBQUtQLFNBQUwsQ0FBZTBDLFNBQWYsR0FBMkJELElBQUksR0FBSixHQUFVRixDQUFyQztBQUNBLE9BQUtrQyxRQUFRLE1BQWIsRUFBc0I7QUFDcEIxSSxPQUFFLFVBQUYsRUFBY3VILE1BQWQsQ0FBcUI7QUFDbkJrQixjQUFPRCxTQUFXLE1BQU1JLEdBQVAsR0FBY0QsRUFBeEI7QUFEWSxNQUFyQjtBQUdEO0FBQ0YsRUFuQkQ7O0FBcUJBNUYsYUFBWXdCLFNBQVosQ0FBc0JtQixnQkFBdEIsR0FBeUMsVUFBU21ELElBQVQsRUFBYztBQUNyRCxPQUFJckUsT0FBTyxJQUFYO0FBQ0EsT0FBSXFFLElBQUosRUFBVTtBQUNSckUsVUFBS2hCLFlBQUwsR0FBb0JzRixXQUFXLFlBQVc7QUFDeEM5SSxTQUFFd0UsS0FBS2QsT0FBUCxFQUFnQmlCLElBQWhCO0FBQ0QsTUFGbUIsRUFFakIsSUFGaUIsQ0FBcEI7QUFHRCxJQUpELE1BSU87QUFDTG9FLGtCQUFhdkUsS0FBS2hCLFlBQWxCO0FBQ0Q7QUFDRixFQVREOztBQVdBVCxhQUFZd0IsU0FBWixDQUFzQmUsU0FBdEIsR0FBa0MsWUFBVztBQUMzQyxPQUFJeUMsSUFBSSxLQUFLN0UsS0FBYjtBQUNBLE9BQUs2RSxFQUFFWixNQUFQLEVBQWdCWSxFQUFFRCxJQUFGLEdBQWhCLEtBQ0tDLEVBQUVKLEtBQUY7QUFDTixFQUpELEM7Ozs7OztBQzFhQSwwQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkYTgzMGE3YWZmMDI0ZmVjMWEzZlxuICoqLyIsIlxuaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuLy8gaW1wb3J0IFN3aXBlciBmcm9tICcuL3N3aXBlci5qcXVlcnkudW1kLm1pbi5qcyc7IC8vc3dpcGVyIGpxdWVyeSBwbHVnaW5cbi8vIGltcG9ydCBkZXYsIHsgbWVudUxpc3QgfSBmcm9tICcuL2Rldi5qcyc7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5cblxuXG5cbnZhciB3aW4gPSB3aW5kb3csXG4gICAgZG9jID0gZG9jdW1lbnQ7XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cblx0Ly/snKDti7gg66mU7ISc65OcXG5cdHV0aWw6IHtcblx0XHQvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG5cdFx0Y29tbW9uTm90aGluZzogZnVuY3Rpb24oKXt9XG5cblx0XHQvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuXHRcdCx0cmltOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9XG4gICAgLGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuICAgICAgLy/rqqjrsJTsnbwgVUFcbiAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCB0aGlzLmFuZHJvaWQgKSB7XG4gICAgICAgIFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgXHRcdGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgXHR9XG4gICAgICAgIFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcbiAgICAgICAgXHRpZiAoICF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zICkgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICB9LFxuICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgZ2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0ICBcdGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcblx0XHRcdHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSwgYVRhZyA9IG51bGwsIGhyZWYgPSBudWxsO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRhVGFnID0gYWxsQVtpXTtcblx0XHRcdFx0aHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmICggdWkudXRpbC50cmltKCBocmVmICkgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbCApXG5cdFx0XHRcdFx0YVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyB0b2dnbGVDbGFzcyBjdXN0b21cblx0XHQsdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCl7XG5cblx0XHR9XG5cblx0XHQvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcblx0XHQsdGFibGVGYWRlOiBmdW5jdGlvbigpe1xuICAgICAgdmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuICAgICAgaWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblx0XHR9XG5cbiAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgLHRvZ2dsZUdyb3VwIDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpe1xuICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgYmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCl7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgX3Njb3BlOiAnJ1xuXG4gICAgLGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG4gICAgfVxuXG4gICAgLGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKXtcbiAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG4gICAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG4gICAgICB0aGlzLnN3aXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICAsc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLG1hbmFnZXI6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuICAgIH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuICBcdF9zY29wZTogJydcbiAgXHQsaW5pdDogZnVuY3Rpb24gKCBfc2NvcGUgKXtcbiAgXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG4gIFx0XHRcdHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICBcdFx0ZWxzZSBcbiAgXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gIFx0XHR0aGlzLmNsaWNrKCk7XG4gIFx0fVxuICBcdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG4gIFx0XHQkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpe1xuICBcdFx0XHR2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcblx0XHRcdGlmICggaXRlbS5oYXNDbGFzcygnYWN0aXZlJykgKVxuXHRcdFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0aXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCggaXRlbS5wb3NpdGlvbigpLnRvcCApO1xuXHRcdH0pO1xuICBcdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG5cdGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG5cdGNvbW1vbi50YWJsZUZhZGUoKTtcblx0JCgnYm9keScpLmFkZENsYXNzKCBpc0RldmljZS5jaGVjaygpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEgKSB7XG5cdFx0ZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG5cdFx0ZGV2LmFwcGVuZE1lbnVCdG4oKTtcblx0fVxufSk7XG5cbi8qXG4qIFZpZGVvUGxheWVyIChjKSB5aWtsMTAwQGdtYWlsLmNvbSwgMjAxNlxuKi9cbndpbmRvdy5WaWRlb1BsYXllciA9IGZ1bmN0aW9uKHdyYXBwZXIpIHtcbiAgICB0aGlzLndyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdyYXBwZXIpO1xuICAgIHRoaXMudmlkZW8gPSBudWxsLFxuICAgIHRoaXMubG93UmVzID0gJCh3cmFwcGVyKS5maW5kKCdbZGF0YS1yZXM9bG93XScpLmdldCgwKTtcbiAgICB0aGlzLmhpZ2hSZXMgPSAkKHdyYXBwZXIpLmZpbmQoJ1tkYXRhLXJlcz1oaWdoXScpLmdldCgwKTtcbiAgICB0aGlzLnBsYXlGbGFnID0gdHJ1ZTtcbiAgICB0aGlzLmN1clRpbWUgPSAwO1xuICAgIHRoaXMuY29udHJvbFRpbWVyID0gbnVsbDtcbiAgICB0aGlzLnBvc3RlciA9IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucG9zdGVyJyk7XG4gICAgdGhpcy5jb250cm9sID0gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyk7XG4gICAgdGhpcy5iZyA9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuYmcnKTtcbiAgICB0aGlzLnBsYXlCdG4gPSB0aGlzLmNvbnRyb2wucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXknKTtcbiAgICB0aGlzLnBhdXNlQnRuID0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wYXVzZScpO1xuICAgIHRoaXMudmlkZW9UaW1lID0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ydW5uaW5nLXRpbWUnKTtcbiAgICB0aGlzLnRpbWVsaW5lID0gdGhpcy5jb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuICAgIHRoaXMuZnVsbEJ0biA9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuZnVsbCcpO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy50aW1lbGluZS5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpO1xuICAgIHRoaXMuZW5kVGltZSA9IHRoaXMudGltZWxpbmUucXVlcnlTZWxlY3RvcignLmVuZCcpO1xuICAgIHRoaXMuc2Vla2JhciA9IHRoaXMuY29udHJvbC5xdWVyeVNlbGVjdG9yKCcuc2Vla2JhcicpO1xuICAgIHRoaXMuYnRuR3JvdXAgPSAkKHRoaXMuY29udHJvbCkuZmluZCgnLmJ0bi1ncm91cCcpO1xuICAgIHRoaXMuYWN0aXZlQnRuID0gdGhpcy5idG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJyk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGF0Ll9wbGF5KCk7XG4gICAgfSwgZmFsc2UpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoIHRoYXQucGxheUZsYWcgKSB7XG4gICAgICB0aGF0LnBsYXlGbGFnID0gZmFsc2U7XG4gICAgICAkKHRoYXQuY29udHJvbCkuaGlkZSgpO1xuICAgICAgaWYgKCB0aGF0LnZpZGVvID09IG51bGwgKSB0aGF0LnJlc29sdXRpb25DaG9pY2UoKTtcblxuICAgICAgdGhhdC5fb25QbGF5KCk7XG4gICAgICB0aGF0Ll9vblBhdXNlKCk7XG4gICAgICB0aGF0Ll9vblRpbWVVcGRhdGUoKTtcbiAgICAgIHRoYXQuX2NsaWNrKCk7XG4gICAgICB0aGF0Ll9mdWxsc2NycmVuTW9kZSgpO1xuICAgICAgdGhhdC5fcGF1c2UoKTtcbiAgICAgIHRoYXQubWFrZVNlZWtiYXIoKTtcbiAgICAgIHRoYXQuY29udHJvbEV2ZW50KCk7XG4gICAgICB0aGF0LmRpbW1DbGljaygpO1xuICAgIH1cbiAgICB0aGF0LnBsYXlQYXVzZSgpO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9vblBsYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub25wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgJCh0aGF0LnBvc3RlcikuaGlkZSgpO1xuICAgICQodGhhdC5wYXVzZUJ0bikuc2hvdygpO1xuICAgICQodGhhdC5wbGF5QnRuKS5oaWRlKCk7XG4gICAgaWYgKCB0aGlzLmN1cnJlbnRUaW1lICE9IDAgKSB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uUGF1c2UgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub25wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgICQodGhhdC5jb250cm9sKS5zaG93KCk7XG4gICAgJCh0aGF0LnBhdXNlQnRuKS5oaWRlKCk7XG4gICAgJCh0aGF0LnBsYXlCdG4pLnNob3coKTtcbiAgICBpZiAodGhpcy5jdXJyZW50VGltZSA+IDApIHRoYXQuYnRuR3JvdXAuaGlkZSgpO1xuICAgIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gIH07XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0UmF0aW8gPSBmdW5jdGlvbih4LCB5LCBsKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciB0YXJnZXQgPSAwO1xuICAgIHRhcmdldCA9IE1hdGgucm91bmQoKHkgKiBsKSAvIHgpO1xuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2aWRlbyA9ICQodGhhdC53cmFwcGVyKS5maW5kKCd2aWRlbzp2aXNpYmxlJykuZXEoMCkuZ2V0KDApO1xuICAgICAgICBpZiAodmlkZW8ucmVhZHlTdGF0ZSA+IDApIHtcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuICAgICAgICAgICAgcyA9IChkdXJhdGlvbiAlIDYwKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIG0gPSAoKGR1cmF0aW9uIC0gcykgLyA2MCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHMgPSBzLmxlbmd0aCA8IDIgPyAwICsgcyA6IHM7XG4gICAgICAgICAgICBtID0gbS5sZW5ndGggPCAyID8gMCArIG0gOiBtO1xuICAgICAgICAgICAgdmlkZW9UaW1lLmlubmVyVGV4dCA9IG0gKyAnOicgKyBzO1xuICAgICAgICAgICAgZW5kVGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIG1vdmllQ29udGVudC5zdHlsZS5oZWlnaHQgPSB0aGF0LmdldFJhdGlvKHZpZGVvLnZpZGVvV2lkdGgsIHZpZGVvLnZpZGVvSGVpZ2h0LCB2aWRlby5jbGllbnRXaWR0aCkgKyAncHgnO1xuICAgIH0sIDUwMCk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX29uVGltZVVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHRoYXQudmlkZW8ub250aW1ldXBkYXRlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAoIHRoYXQudmlkZW8ucGF1c2VkICkgcmV0dXJuO1xuICAgIHRoYXQuZ2V0Q3VycmVudFRpbWUoJ3NlZWsnKTtcbiAgfTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5fY2xpY2sgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC52aWRlbykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5idG5Hcm91cC5oaWRlKCk7XG4gICAgJCh0aGF0LnRpbWVsaW5lKS5zaG93KCk7XG4gICAgJCh0aGF0LmNvbnRyb2wpLmFkZENsYXNzKCdyZW1vdmUtdGltZScpLnNob3coKTtcbiAgICB0aGF0LmNvbnRyb2xWaXNpYmxpbmcodHJ1ZSk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLl9wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5wYXVzZUJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5jdXJUaW1lID0gdGhhdC52aWRlby5jdXJyZW50VGltZTtcbiAgICB0aGF0LnBsYXlQYXVzZSgpO1xuICAgICQodGhhdC5wbGF5QnRuKS5zaG93KCk7XG4gICAgJCh0aGlzKS5oaWRlKCk7XG4gIH0pO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmRpbW1DbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICQodGhhdC5iZykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcbiAgICB0aGF0LmNvbnRyb2xWaXNpYmxpbmcoZmFsc2UpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5jb250cm9sRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICAkKHRoYXQuY29udHJvbCkub24oe1xuICAgICdtb3VzZG93biB0b3VjaHN0YXJ0JzogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHRoYXQuY29udHJvbFZpc2libGluZyhmYWxzZSk7XG4gICAgfSxcbiAgICAnbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCc6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gdGhhdC5jb250cm9sVmlzaWJsaW5nKHRydWUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUubWFrZVNlZWtiYXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBjb25zb2xlLmxvZyh0aGF0LnZpZGVvKTtcbiAgJCh0aGF0LndyYXBwZXIucXVlcnlTZWxlY3RvcignLnNlZWtiYXInKSkuc2xpZGVyKHtcbiAgICByYW5nZTogJ21pbicsXG4gICAgLy8gbWF4OiBkdXJhdGlvbixcbiAgICBzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcbiAgICAgIHRoYXQudmlkZW8ucGF1c2UoKTtcbiAgICAgIHRoYXQuZ2V0Q3VycmVudFRpbWUoKTtcbiAgICAgIHRoYXQuY2hhbmdlQ3VycmVudFRpbWUodWkpO1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgIHRoYXQudmlkZW8ucGxheSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuX2Z1bGxzY3JyZW5Nb2RlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgdiA9IHRoYXQudmlkZW87IFxuICAkKHRoYXQuZnVsbEJ0bikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZyh2KTtcbiAgICBpZiAoIHVpLnV0aWwuaXNEZXZpY2UoKS5pb3MgKSB7XG4gICAgICBpZiAoIHR5cGVvZiB2LndlYmtpdFBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LndlYmtpdFBsYXlzSW5saW5lID09IHRydWUgKVxuICAgICAgICB2LndlYmtpdFBsYXlzSW5saW5lID0gZmFsc2U7XG4gICAgICBpZiAoIHR5cGVvZiB2LnBsYXlzSW5saW5lICE9PSAndW5kZWZpbmVkJyAmJiB2LnBsYXlzaW5saW5lID09IHRydWUgKVxuICAgICAgICB2LnBsYXlzSW5saW5lID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKCB0eXBlb2Ygdi53ZWJraXRQbGF5c0lubGluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdi53ZWJraXRQbGF5c2lubGluZSA9PSB0cnVlIClcbiAgICAgICAgdi53ZWJraXRQbGF5c0lubGluZSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh2LnJlcXVlc3RGdWxsc2NyZWVuKVxuICAgICAgdi5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIC8vIGVsc2UgaWYgKHYubW96UmVxdWVzdEZ1bGxTY3JlZW4pXG4gICAgLy8gIHYubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICBlbHNlIGlmICh2LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKVxuICAgICAgdi53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIGVsc2UgaWYgKCB2LndlYmtpdEVudGVyRnVsbHNjcmVlbiApXG4gICAgICB2LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xuICB9KTtcbn07XG5cblZpZGVvUGxheWVyLnByb3RvdHlwZS5yZXNvbHV0aW9uQ2hvaWNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICBidG5Hcm91cCA9IHRoaXMuYnRuR3JvdXAsXG4gICAgICAgIGxvd1JlcyA9IHRoaXMubG93UmVzLFxuICAgICAgICBoaWdoUmVzID0gdGhpcy5oaWdoUmVzO1xuICAgIGlmIChidG5Hcm91cC5maW5kKCdidXR0b24uYWN0aXZlJykuaGFzQ2xhc3MoJ2xvdycpKSB7XG4gICAgICAgICQobG93UmVzKS5zaG93KCkuYXR0cignZGF0YS1wbGF5JywgJ3RydWUnKTtcbiAgICAgICAgJChoaWdoUmVzKS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG4gICAgICAgIHRoYXQudmlkZW8gPSAkKGxvd1JlcykuZ2V0KDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQobG93UmVzKS5oaWRlKCkuYXR0cignZGF0YS1wbGF5JywgJ2ZhbHNlJyk7XG4gICAgICAgICQoaGlnaFJlcykuc2hvdygpLmF0dHIoJ2RhdGEtcGxheScsICd0cnVlJyk7XG4gICAgICAgIHRoYXQudmlkZW8gPSAkKGhpZ2hSZXMpLmdldCgwKTtcbiAgICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY2hhbmdlQ3VycmVudFRpbWUgPSBmdW5jdGlvbih1aSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHYgPSAkKCd2aWRlbzp2aXNpYmxlJykuZ2V0KDApO1xuICAgIHYuY3VycmVudFRpbWUgPSBwYXJzZUludCh2LmR1cmF0aW9uICogKHVpLnZhbHVlIC8gMTAwKSwgMTApO1xufTtcblxuVmlkZW9QbGF5ZXIucHJvdG90eXBlLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oIHNlZWsgKXtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuICAgIHZpZGVvID0gdGhhdC52aWRlbztcbiAgdmFyIHMsIG0sIGN0ID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSksIGR1ciA9IE1hdGgucm91bmQodmlkZW8uZHVyYXRpb24pO1xuICBpZiAoIGN0IDwgNjAgKSB7XG4gICAgbSA9ICcwMCc7XG4gICAgcyA9IGN0LnRvU3RyaW5nKCkubGVuZ3RoIDwgMiA/ICcwJyArIGN0LnRvU3RyaW5nKCkgOiBjdDtcbiAgfSBlbHNlIHtcbiAgICBzID0gcGFyc2VJbnQoIGN0ICUgNjAgKSxcbiAgICBtID0gcGFyc2VJbnQoIChjdCAtIHMpIC8gNjAgKTtcbiAgICBzID0gcy50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBzIDogcztcbiAgICBtID0gbS50b1N0cmluZygpLmxlbmd0aCA8IDIgPyAnMCcgKyBtIDogbTtcbiAgfVxuICB0aGF0LnN0YXJ0VGltZS5pbm5lclRleHQgPSBtICsgJzonICsgcztcbiAgaWYgKCBzZWVrID09ICdzZWVrJyApIHtcbiAgICAkKCcuc2Vla2JhcicpLnNsaWRlcih7XG4gICAgICB2YWx1ZTogcGFyc2VJbnQoICgxMDAgLyBkdXIpICogY3QgKVxuICAgIH0pO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUuY29udHJvbFZpc2libGluZyA9IGZ1bmN0aW9uKGN0cmwpe1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGlmIChjdHJsKSB7XG4gICAgdGhhdC5jb250cm9sVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGF0LmNvbnRyb2wpLmhpZGUoKTtcbiAgICB9LCAyMDAwKTtcbiAgfSBlbHNlIHtcbiAgICBjbGVhclRpbWVvdXQodGhhdC5jb250cm9sVGltZXIpO1xuICB9XG59O1xuXG5WaWRlb1BsYXllci5wcm90b3R5cGUucGxheVBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB2ID0gdGhpcy52aWRlbztcbiAgaWYgKCB2LnBhdXNlZCApIHYucGxheSgpO1xuICBlbHNlIHYucGF1c2UoKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=