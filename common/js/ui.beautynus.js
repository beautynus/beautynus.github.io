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
	
	__webpack_require__(2);
	
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

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDYzMzk0ZThiNjhmOWFkM2IwNmU/MzE1MSoqIiwid2VicGFjazovLy8uL3NyYy9qcy91aS5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3MvY29uY2F0LnNjc3MiXSwibmFtZXMiOlsid2luIiwid2luZG93IiwiZG9jIiwiZG9jdW1lbnQiLCJ1aSIsInV0aWwiLCJjb21tb25Ob3RoaW5nIiwidHJpbSIsInN0ciIsInJlcGxhY2UiLCJpc0RldmljZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiY2hlY2siLCJhbmRyb2lkIiwiZ2luZ2VyYnJlYWQiLCJpb3MiLCJtYXRjaCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiJCIsImVhY2giLCIkdGhpcyIsImZpbmQiLCJvbiIsImUiLCJfdGFyZ2V0IiwidGFyZ2V0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbExlZnQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJsb2NhdGlv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QUFWLENBQXFCSixLQUFLSyxRQUFMLEdBQWdCQyxHQUFyQztBQUNBLFFBUEM7QUFRQTtBQWxCYyxJQUFoQjtBQW9CQXpCLGFBQVVpQixTQUFWLEdBQXNCQSxTQUF0Qjs7QUFFQTs7QUFFQWhFLFVBQU8rQyxTQUFQLEdBQW1CQSxTQUFuQjtBQUVELEVBL0RELEVBK0RHaEIsQ0EvREg7O0FBa0VBO0FBQ0FBLEdBQUUsWUFBVTs7QUFFVixPQUFJM0IsT0FBT0QsR0FBR0MsSUFBZDtBQUFBLE9BQ0ljLFNBQVNmLEdBQUdlLE1BRGhCO0FBQUEsT0FFSVQsV0FBV0wsS0FBS0ssUUFBTCxFQUZmOztBQUlEUyxVQUFPQyxhQUFQO0FBQ0FELFVBQU9XLFNBQVA7QUFDQUUsS0FBRSxNQUFGLEVBQVVZLFFBQVYsQ0FBb0JsQyxTQUFTSSxLQUFULEVBQXBCOztBQUVBa0MsYUFBVWlCLFNBQVYsQ0FBb0JWLElBQXBCLENBQXlCLFlBQXpCOztBQUVBO0FBQ0EsT0FBS21CLFNBQVNsRCxJQUFULENBQWNtRCxPQUFkLENBQXNCLE1BQXRCLElBQWdDLENBQUMsQ0FBdEMsRUFBMEM7QUFDekNDLFNBQUlDLGNBQUo7QUFDQUQsU0FBSUUsYUFBSjtBQUNBO0FBQ0QsRUFqQkQsRTs7Ozs7OztBQ25LQSwwQyIsImZpbGUiOiJ1aS5iZWF1dHludXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkNjMzOTRlOGI2OGY5YWQzYjA2ZVxuICoqLyIsIlxuaW1wb3J0ICcuLi9zY3NzL2NvbmNhdC5zY3NzJzsgLy9zdHlsZVxuLy8gaW1wb3J0IFN3aXBlciBmcm9tICcuL3N3aXBlci5qcXVlcnkudW1kLm1pbi5qcyc7IC8vc3dpcGVyIGpxdWVyeSBwbHVnaW5cbi8vIGltcG9ydCBkZXYsIHsgbWVudUxpc3QgfSBmcm9tICcuL2Rldi5qcyc7IC8v6rCc67Cc7JqpIOyKpO2BrOumve2KuCDtlITroZzrjZXshZjsi5wg7IKt7KCcXG5cblxuXG5cbnZhciB3aW4gPSB3aW5kb3csXG4gICAgZG9jID0gZG9jdW1lbnQ7XG5cbi8vdWkg6rSA66CoIOqzte2GtSDsiqTtgazrpr3tirhcbndpbi51aSA9IHdpbmRvdy51aSB8fCB7XG5cblx0Ly/snKDti7gg66mU7ISc65OcXG5cdHV0aWw6IHtcblx0XHQvLyDruYgg7ZWo7IiYIO2BtOumreyLnCDsmKTrpZgg67Cp7KeAXG5cdFx0Y29tbW9uTm90aGluZzogZnVuY3Rpb24oKXt9XG5cblx0XHQvLyDslpHsqr0g7Jes67CxIOygnOqxsFxuXHRcdCx0cmltOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0aWYgKHN0ciA9PSBudWxsIHx8IHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBcIlwiO1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0XHR9XG4gICAgLGlzRGV2aWNlOiBmdW5jdGlvbigpe1xuICAgICAgLy/rqqjrsJTsnbwgVUFcbiAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGVjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCB0aGlzLmFuZHJvaWQgKSB7XG4gICAgICAgIFx0XHRpZiAoIHRoaXMuZ2luZ2VyYnJlYWQgKSByZXR1cm4gJ2dpbmdlcmJyZWFkJztcbiAgICAgICAgXHRcdGVsc2UgcmV0dXJuICdhbmRyb2lkJztcbiAgICAgICAgXHR9XG4gICAgICAgIFx0aWYgKCB0aGlzLmlvcyApIHJldHVybiAnaW9zJztcbiAgICAgICAgXHRpZiAoICF0aGlzLmFuZHJvaWQgJiYgIXRoaXMuaW9zICkgcmV0dXJuICduby1tb2JpbGUnO1xuICAgICAgICB9LFxuICAgICAgICBpb3M6IHVhLm1hdGNoKCdpUGhvbmUnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgYW5kcm9pZDogdWEubWF0Y2goJ0FuZHJvaWQnKSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgZ2luZ2VyYnJlYWQ6IHVhLm1hdGNoKCdBbmRyb2lkIDIuMycpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXHR9XG5cblx0Ly8g6rO17Ya1IOuplOyEnOuTnFxuXHQsY29tbW9uOiB7XG5cblx0XHQvLyBh7YOc6re47J2YIGhyZWYg6rCS7J20ICMg7J286rK97JqwIGNvbW1vbk5vdGhpbmcoKeycvOuhnCDrjIDssrRcblx0ICBcdGVtcHR5TGlua0Z1bmM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9h7YOc6re4IGhyZWbsl5Ag642U66+4IO2VqOyImCDsgr3snoVcblx0XHRcdHZhciBhbGxBID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSwgYVRhZyA9IG51bGwsIGhyZWYgPSBudWxsO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFsbEEubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRhVGFnID0gYWxsQVtpXTtcblx0XHRcdFx0aHJlZiA9IGFUYWcuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmICggdWkudXRpbC50cmltKCBocmVmICkgPT0gJyMnIHx8IGhyZWYgPT0gbnVsbCApXG5cdFx0XHRcdFx0YVRhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnamF2YXNjcmlwdDp1aS51dGlsLmNvbW1vbk5vdGhpbmcoKTsnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyB0b2dnbGVDbGFzcyBjdXN0b21cblx0XHQsdG9nZ2xlY2xhc3M6IGZ1bmN0aW9uKCl7XG5cblx0XHR9XG5cblx0XHQvLyDthYzsnbTruJQg7Iqk7YGs66GkIOyLnCDslpHsqr0g7Ja064qQ7Kq97J2065OgIO2VnOyqvSDrgZ3sl5Ag64+E64usIO2VoCDqsr3smrAgYmfsg53shLFcblx0XHQsdGFibGVGYWRlOiBmdW5jdGlvbigpe1xuICAgICAgdmFyIF9zY29wZSA9ICQoJy5qcy1mYWRlaW4td3JhcCcpO1xuICAgICAgaWYgKCBfc2NvcGUubGVuZ3RoIDw9IDAgKSByZXR1cm47XG5cdFx0XHQkKCcuanMtZmFkZWluLXdyYXAnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5qcy1mYWRlaW4tc2Nyb2xsJykub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIF90YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRpZiggKCBfdGFyZ2V0LnNjcm9sbFdpZHRoIC0gX3RhcmdldC5jbGllbnRXaWR0aCkgPD0gKF90YXJnZXQuc2Nyb2xsTGVmdCArIDIwKSApe1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fSAgZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblx0XHR9XG5cbiAgICAvLyDqt7jro7kg7Yag6riAXG4gICAgLHRvZ2dsZUdyb3VwIDogZnVuY3Rpb24oZ3JvdXAsIGVsZW1lbnQpe1xuICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG5cdH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgYmVhdXR5bnVzIG1ldGhvZCBncm91cFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24oJCl7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbjtcblxuICB2YXIgYmVhdXR5bnVzID0gYmVhdXR5bnVzIHx8IHt9XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOy5tOuTnOuJtOyKpO2YlVxuICB2YXIgY2FyZE5ld3MgPSB7XG4gICAgX3Njb3BlOiAnJ1xuXG4gICAgLGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgIHBhZ2luYXRpb25UeXBlOiAnZnJhY3Rpb24nXG4gICAgfVxuXG4gICAgLGluaXQ6IGZ1bmN0aW9uKHNjb3BlLCBvcHRpb25zKXtcbiAgICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgICB2YXIgYXNzaWduID0gKHR5cGVvZiBPYmplY3QuYXNzaWduID09ICd1bmRlZmluZWQnKSA/ICQuZXh0ZW5kIDogT2JqZWN0LmFzc2lnbjsgLy9hc3NpZ24g7ZWo7IiYIOyhtOyerCDsl6zrtoAg7LK07YGsLCDsl4bsnLzrqbQgJC5leHRlbmTroZwg64yA7LK0XG4gICAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09ICd1bmRlZmluZWQnKSA/IHRoaXMuZGVmYXVsdE9wdGlvbnMgOiBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOyAvL29wdGlvbnMg66ek6rCc67OA7IiY6rCAIHVuZGVmaW5lZCDsnbwg6rK97Jqw66W8IOyytO2BrO2VmOyXrCDsmKTrpZgg67Cp7KeAXG4gICAgICB0aGlzLnN3aXBlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICAsc3dpcGVyOiBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInLCBuZXcgU3dpcGVyKHRoaXMuX3Njb3BlLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLG1hbmFnZXI6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicpO1xuICAgIH1cblxuICB9O1xuICBiZWF1dHludXMuY2FyZE5ld3MgPSBjYXJkTmV3cztcblxuICB2YXIgYWNjb3JkaWFuID0ge1xuICBcdF9zY29wZTogJydcbiAgXHQsaW5pdDogZnVuY3Rpb24gKCBfc2NvcGUgKXtcbiAgXHRcdGlmICggdHlwZW9mIF9zY29wZSA9PSAndW5kZWZpbmVkJyApXG4gIFx0XHRcdHRoaXMuX3Njb3BlID0gJy5hY2NvcmRpYW4nO1xuICBcdFx0ZWxzZSBcbiAgXHRcdFx0dGhpcy5fc2NvcGUgPSBfc2NvcGU7XG4gIFx0XHR0aGlzLmNsaWNrKCk7XG4gIFx0fVxuICBcdCxjbGljazogZnVuY3Rpb24gKCAgKSB7XG4gIFx0XHQkKHRoaXMuX3Njb3BlKS5vbignY2xpY2snLCAnLnRpdGxlIGEnLCBmdW5jdGlvbigpe1xuICBcdFx0XHR2YXIgaXRlbSA9ICQodGhpcykucGFyZW50cygnLml0ZW0nKTtcblx0XHRcdGlmICggaXRlbS5oYXNDbGFzcygnYWN0aXZlJykgKVxuXHRcdFx0XHRpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0aXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJy5pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCggaXRlbS5wb3NpdGlvbigpLnRvcCApO1xuXHRcdH0pO1xuICBcdH1cbiAgfTtcbiAgYmVhdXR5bnVzLmFjY29yZGlhbiA9IGFjY29yZGlhbjtcblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg64+Z7IOB7IOB7ZiVXG5cbiAgd2luZG93LmJlYXV0eW51cyA9IGJlYXV0eW51cztcblxufSkoJCk7XG5cblxuLy9ET00g66Gc65Oc7ZuEIOyLpO2WiVxuJChmdW5jdGlvbigpe1xuXG4gIHZhciB1dGlsID0gdWkudXRpbCxcbiAgICAgIGNvbW1vbiA9IHVpLmNvbW1vbixcbiAgICAgIGlzRGV2aWNlID0gdXRpbC5pc0RldmljZSgpO1xuXG5cdGNvbW1vbi5lbXB0eUxpbmtGdW5jKCk7XG5cdGNvbW1vbi50YWJsZUZhZGUoKTtcblx0JCgnYm9keScpLmFkZENsYXNzKCBpc0RldmljZS5jaGVjaygpICk7XG5cblx0YmVhdXR5bnVzLmFjY29yZGlhbi5pbml0KCcuYWNjb3JkaWFuJyk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEgKSB7XG5cdFx0ZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG5cdFx0ZGV2LmFwcGVuZE1lbnVCdG4oKTtcblx0fVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91aS5jb21tb24uanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Nzcy9jb25jYXQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=