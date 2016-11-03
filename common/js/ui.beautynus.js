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
	
	  console.log('sdfsdf');
	
	  //개발용 메서드 실행
	  if (location.href.indexOf('?dev') > -1) {
	    dev.appendMenuList();
	    dev.appendMenuBtn();
	    console.log(util.isDevice().gingerbread);
	    if (util.isDevice().gingerbread) {
	      alert('c8');
	    }
	  }
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjdkODllNmE4YjUwYTk0ZDljYWU/N2Y5OSoqIiwid2VicGFjazovLy8uL3NyYy9qcy91aS5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3MvY29uY2F0LnNjc3MiXSwibmFtZXMiOlsid2luIiwid2luZG93IiwiZG9jIiwiZG9jdW1lbnQiLCJ1aSIsInV0aWwiLCJjb21tb25Ob3RoaW5nIiwidHJpbSIsInN0ciIsInJlcGxhY2UiLCJpc0RldmljZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiY2hlY2siLCJhbmRyb2lkIiwiZ2luZ2VyYnJlYWQiLCJpb3MiLCJtYXRjaCIsImNvbW1vbiIsImVtcHR5TGlua0Z1bmMiLCJhbGxBIiwicXVlcnlTZWxlY3RvckFsbCIsImFUYWciLCJocmVmIiwiaSIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZWNsYXNzIiwidGFibGVGYWRlIiwiX3Njb3BlIiwiJCIsImVhY2giLCIkdGhpcyIsImZpbmQiLCJvbiIsImUiLCJfdGFyZ2V0IiwidGFyZ2V0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbExlZnQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidG9nZ2xlR3JvdXAiLCJncm91cCIsImVsZW1lbnQiLCJiZWF1dHludXMiLCJjYXJkTmV3cyIsImRlZmF1bHRPcHRpb25zIiwiZGlyZWN0aW9uIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uVHlwZSIsImluaXQiLCJzY29wZSIsIm9wdGlvbnMiLCJhc3NpZ24iLCJPYmplY3QiLCJleHRlbmQiLCJzd2lwZXIiLCJkYXRhIiwiU3dpcGVyIiwibWFuYWdlciIsImFjY29yZGlhbiIsImNsaWNrIiwiaXRlbSIsInBhcmVudHMiLCJoYXNDbGFzcyIsInNpYmxpbmdzIiwic2Nyb2xsVG9wIiwicG9zaXRpb24iLCJ0b3AiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJpbmRleE9mIiwiZGV2IiwiYXBwZW5kTWVudUxpc3QiLCJhcHBlbmRNZW51QnRuIiwiYWxlcnQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNyQ0E7O0FBQThCO0FBQzlCO0FBQ0E7OztBQUtBLEtBQUlBLE1BQU1DLE1BQVY7QUFBQSxLQUNJQyxNQUFNQyxRQURWOztBQUdBO0FBQ0FILEtBQUlJLEVBQUosR0FBU0gsT0FBT0csRUFBUCxJQUFhOztBQUVyQjtBQUNBQyxTQUFNO0FBQ0w7QUFDQUMsb0JBQWUseUJBQVUsQ0FBRTs7QUFFM0I7QUFKSyxPQUtKQyxNQUFNLGNBQVVDLEdBQVYsRUFBZ0I7QUFDdEIsV0FBSUEsT0FBTyxJQUFQLElBQWUsT0FBT0EsR0FBUCxJQUFjLFdBQWpDLEVBQThDLE9BQU8sRUFBUDtBQUM5QyxjQUFPQSxJQUFJQyxPQUFKLENBQVksWUFBWixFQUEwQixFQUExQixDQUFQO0FBQ0EsTUFSSTtBQVNGQyxlQUFVLG9CQUFVO0FBQ25CO0FBQ0EsV0FBSUMsS0FBS0MsVUFBVUMsU0FBbkI7QUFDQSxjQUFPO0FBQ0xDLGdCQUFPLGlCQUFXO0FBQ2hCLGVBQUssS0FBS0MsT0FBVixFQUFvQjtBQUNwQixpQkFBSyxLQUFLQyxXQUFWLEVBQXdCLE9BQU8sYUFBUCxDQUF4QixLQUNLLE9BQU8sU0FBUDtBQUNMO0FBQ0QsZUFBSyxLQUFLQyxHQUFWLEVBQWdCLE9BQU8sS0FBUDtBQUNoQixlQUFLLENBQUMsS0FBS0YsT0FBTixJQUFpQixDQUFDLEtBQUtFLEdBQTVCLEVBQWtDLE9BQU8sV0FBUDtBQUNsQyxVQVJJO0FBU0xBLGNBQUtOLEdBQUdPLEtBQUgsQ0FBUyxRQUFU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Q0RYLFdBQUUvQixNQUFGLEVBQVVzRSxTQUFWLENBQXFCSixLQUFLSyxRQUFMLEdBQWdCQyxHQUFyQztBQUNBLFFBUEM7QUFRQTtBQWxCYyxJQUFoQjtBQW9CQXpCLGFBQVVpQixTQUFWLEdBQXNCQSxTQUF0Qjs7QUFFQTs7QUFFQWhFLFVBQU8rQyxTQUFQLEdBQW1CQSxTQUFuQjtBQUVELEVBL0RELEVBK0RHaEIsQ0EvREg7O0FBa0VBO0FBQ0FBLEdBQUUsWUFBVTs7QUFFVixPQUFJM0IsT0FBT0QsR0FBR0MsSUFBZDtBQUFBLE9BQ0ljLFNBQVNmLEdBQUdlLE1BRGhCO0FBQUEsT0FFSVQsV0FBV0wsS0FBS0ssUUFBTCxFQUZmOztBQUlEUyxVQUFPQyxhQUFQO0FBQ0FELFVBQU9XLFNBQVA7QUFDQUUsS0FBRSxNQUFGLEVBQVVZLFFBQVYsQ0FBb0JsQyxTQUFTSSxLQUFULEVBQXBCOztBQUVBa0MsYUFBVWlCLFNBQVYsQ0FBb0JWLElBQXBCLENBQXlCLFlBQXpCOztBQUVDbUIsV0FBUUMsR0FBUixDQUFZLFFBQVo7O0FBRUQ7QUFDQSxPQUFLQyxTQUFTcEQsSUFBVCxDQUFjcUQsT0FBZCxDQUFzQixNQUF0QixJQUFnQyxDQUFDLENBQXRDLEVBQTBDO0FBQ3pDQyxTQUFJQyxjQUFKO0FBQ0FELFNBQUlFLGFBQUo7QUFDRU4sYUFBUUMsR0FBUixDQUFZdEUsS0FBS0ssUUFBTCxHQUFnQk0sV0FBNUI7QUFDQSxTQUFLWCxLQUFLSyxRQUFMLEdBQWdCTSxXQUFyQixFQUFtQztBQUNqQ2lFLGFBQU0sSUFBTjtBQUNEO0FBQ0g7QUFDRCxFQXZCRCxFOzs7Ozs7O0FDbktBLDBDIiwiZmlsZSI6InVpLmJlYXV0eW51cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY3ZDg5ZTZhOGI1MGE5NGQ5Y2FlXG4gKiovIiwiXG5pbXBvcnQgJy4uL3Njc3MvY29uY2F0LnNjc3MnOyAvL3N0eWxlXG4vLyBpbXBvcnQgU3dpcGVyIGZyb20gJy4vc3dpcGVyLmpxdWVyeS51bWQubWluLmpzJzsgLy9zd2lwZXIganF1ZXJ5IHBsdWdpblxuLy8gaW1wb3J0IGRldiwgeyBtZW51TGlzdCB9IGZyb20gJy4vZGV2LmpzJzsgLy/qsJzrsJzsmqkg7Iqk7YGs66a97Yq4IO2UhOuhnOuNleyFmOyLnCDsgq3soJxcblxuXG5cblxudmFyIHdpbiA9IHdpbmRvdyxcbiAgICBkb2MgPSBkb2N1bWVudDtcblxuLy91aSDqtIDroKgg6rO17Ya1IOyKpO2BrOumve2KuFxud2luLnVpID0gd2luZG93LnVpIHx8IHtcblxuXHQvL+ycoO2LuCDrqZTshJzrk5xcblx0dXRpbDoge1xuXHRcdC8vIOu5iCDtlajsiJgg7YG066at7IucIOyYpOulmCDrsKnsp4Bcblx0XHRjb21tb25Ob3RoaW5nOiBmdW5jdGlvbigpe31cblxuXHRcdC8vIOyWkeyqvSDsl6zrsLEg7KCc6rGwXG5cdFx0LHRyaW06IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRpZiAoc3RyID09IG51bGwgfHwgdHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJykgcmV0dXJuIFwiXCI7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHRcdH1cbiAgICAsaXNEZXZpY2U6IGZ1bmN0aW9uKCl7XG4gICAgICAvL+uqqOuwlOydvCBVQVxuICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoZWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIHRoaXMuYW5kcm9pZCApIHtcbiAgICAgICAgXHRcdGlmICggdGhpcy5naW5nZXJicmVhZCApIHJldHVybiAnZ2luZ2VyYnJlYWQnO1xuICAgICAgICBcdFx0ZWxzZSByZXR1cm4gJ2FuZHJvaWQnO1xuICAgICAgICBcdH1cbiAgICAgICAgXHRpZiAoIHRoaXMuaW9zICkgcmV0dXJuICdpb3MnO1xuICAgICAgICBcdGlmICggIXRoaXMuYW5kcm9pZCAmJiAhdGhpcy5pb3MgKSByZXR1cm4gJ25vLW1vYmlsZSc7XG4gICAgICAgIH0sXG4gICAgICAgIGlvczogdWEubWF0Y2goJ2lQaG9uZScpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICBhbmRyb2lkOiB1YS5tYXRjaCgnQW5kcm9pZCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICBnaW5nZXJicmVhZDogdWEubWF0Y2goJ0FuZHJvaWQgMi4zJykgPyB0cnVlIDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cdH1cblxuXHQvLyDqs7XthrUg66mU7ISc65OcXG5cdCxjb21tb246IHtcblxuXHRcdC8vIGHtg5zqt7jsnZggaHJlZiDqsJLsnbQgIyDsnbzqsr3smrAgY29tbW9uTm90aGluZygp7Jy866GcIOuMgOyytFxuXHQgIFx0ZW1wdHlMaW5rRnVuYzogZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2Htg5zqt7ggaHJlZuyXkCDrjZTrr7gg7ZWo7IiYIOyCveyehVxuXHRcdFx0dmFyIGFsbEEgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnYScpLCBhVGFnID0gbnVsbCwgaHJlZiA9IG51bGw7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYWxsQS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGFUYWcgPSBhbGxBW2ldO1xuXHRcdFx0XHRocmVmID0gYVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKCB1aS51dGlsLnRyaW0oIGhyZWYgKSA9PSAnIycgfHwgaHJlZiA9PSBudWxsIClcblx0XHRcdFx0XHRhVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsICdqYXZhc2NyaXB0OnVpLnV0aWwuY29tbW9uTm90aGluZygpOycpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHRvZ2dsZUNsYXNzIGN1c3RvbVxuXHRcdCx0b2dnbGVjbGFzczogZnVuY3Rpb24oKXtcblxuXHRcdH1cblxuXHRcdC8vIO2FjOydtOu4lCDsiqTtgazroaQg7IucIOyWkeyqvSDslrTripDsqr3snbTrk6Ag7ZWc7Kq9IOuBneyXkCDrj4Tri6wg7ZWgIOqyveyasCBiZ+yDneyEsVxuXHRcdCx0YWJsZUZhZGU6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgX3Njb3BlID0gJCgnLmpzLWZhZGVpbi13cmFwJyk7XG4gICAgICBpZiAoIF9zY29wZS5sZW5ndGggPD0gMCApIHJldHVybjtcblx0XHRcdCQoJy5qcy1mYWRlaW4td3JhcCcpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0JHRoaXMuZmluZCgnLmpzLWZhZGVpbi1zY3JvbGwnKS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR2YXIgX3RhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdGlmKCAoIF90YXJnZXQuc2Nyb2xsV2lkdGggLSBfdGFyZ2V0LmNsaWVudFdpZHRoKSA8PSAoX3RhcmdldC5zY3JvbGxMZWZ0ICsgMjApICl7XG5cdFx0XHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcygnb24nKTtcblx0XHRcdFx0XHR9ICBlbHNlIHtcblx0XHRcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXHRcdH1cblxuICAgIC8vIOq3uOujuSDthqDquIBcbiAgICAsdG9nZ2xlR3JvdXAgOiBmdW5jdGlvbihncm91cCwgZWxlbWVudCl7XG4gICAgICAkKGdyb3VwKS5maW5kKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgIH1cblx0fVxufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBiZWF1dHludXMgbWV0aG9kIGdyb3VwXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbihmdW5jdGlvbigkKXtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgY29tbW9uID0gdWkuY29tbW9uO1xuXG4gIHZhciBiZWF1dHludXMgPSBiZWF1dHludXMgfHwge31cblxuICAvLyDrt7Dti7Dsu6jthZDsuKAg7Lm065Oc64m07Iqk7ZiVXG4gIHZhciBjYXJkTmV3cyA9IHtcbiAgICBfc2NvcGU6ICcnXG5cbiAgICAsZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgcGFnaW5hdGlvblR5cGU6ICdmcmFjdGlvbidcbiAgICB9XG5cbiAgICAsaW5pdDogZnVuY3Rpb24oc2NvcGUsIG9wdGlvbnMpe1xuICAgICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICAgIHZhciBhc3NpZ24gPSAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT0gJ3VuZGVmaW5lZCcpID8gJC5leHRlbmQgOiBPYmplY3QuYXNzaWduOyAvL2Fzc2lnbiDtlajsiJgg7KG07J6sIOyXrOu2gCDssrTtgawsIOyXhuycvOuptCAkLmV4dGVuZOuhnCDrjIDssrRcbiAgICAgIG9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5kZWZhdWx0T3B0aW9ucyA6IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7IC8vb3B0aW9ucyDrp6TqsJzrs4DsiJjqsIAgdW5kZWZpbmVkIOydvCDqsr3smrDrpbwg7LK07YGs7ZWY7JesIOyYpOulmCDrsKnsp4BcbiAgICAgIHRoaXMuc3dpcGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgICxzd2lwZXI6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgJCh0aGlzLl9zY29wZSkuZGF0YSgnbWFuYWdlcicsIG5ldyBTd2lwZXIodGhpcy5fc2NvcGUsIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAsbWFuYWdlcjogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJyk7XG4gICAgfVxuXG4gIH07XG4gIGJlYXV0eW51cy5jYXJkTmV3cyA9IGNhcmROZXdzO1xuXG4gIHZhciBhY2NvcmRpYW4gPSB7XG4gIFx0X3Njb3BlOiAnJ1xuICBcdCxpbml0OiBmdW5jdGlvbiAoIF9zY29wZSApe1xuICBcdFx0aWYgKCB0eXBlb2YgX3Njb3BlID09ICd1bmRlZmluZWQnIClcbiAgXHRcdFx0dGhpcy5fc2NvcGUgPSAnLmFjY29yZGlhbic7XG4gIFx0XHRlbHNlIFxuICBcdFx0XHR0aGlzLl9zY29wZSA9IF9zY29wZTtcbiAgXHRcdHRoaXMuY2xpY2soKTtcbiAgXHR9XG4gIFx0LGNsaWNrOiBmdW5jdGlvbiAoICApIHtcbiAgXHRcdCQodGhpcy5fc2NvcGUpLm9uKCdjbGljaycsICcudGl0bGUgYScsIGZ1bmN0aW9uKCl7XG4gIFx0XHRcdHZhciBpdGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuaXRlbScpO1xuXHRcdFx0aWYgKCBpdGVtLmhhc0NsYXNzKCdhY3RpdmUnKSApXG5cdFx0XHRcdGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLml0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKCBpdGVtLnBvc2l0aW9uKCkudG9wICk7XG5cdFx0fSk7XG4gIFx0fVxuICB9O1xuICBiZWF1dHludXMuYWNjb3JkaWFuID0gYWNjb3JkaWFuO1xuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDrj5nsg4Hsg4HtmJVcblxuICB3aW5kb3cuYmVhdXR5bnVzID0gYmVhdXR5bnVzO1xuXG59KSgkKTtcblxuXG4vL0RPTSDroZzrk5ztm4Qg7Iuk7ZaJXG4kKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIHV0aWwgPSB1aS51dGlsLFxuICAgICAgY29tbW9uID0gdWkuY29tbW9uLFxuICAgICAgaXNEZXZpY2UgPSB1dGlsLmlzRGV2aWNlKCk7XG5cblx0Y29tbW9uLmVtcHR5TGlua0Z1bmMoKTtcblx0Y29tbW9uLnRhYmxlRmFkZSgpO1xuXHQkKCdib2R5JykuYWRkQ2xhc3MoIGlzRGV2aWNlLmNoZWNrKCkgKTtcblxuXHRiZWF1dHludXMuYWNjb3JkaWFuLmluaXQoJy5hY2NvcmRpYW4nKTtcblxuICBjb25zb2xlLmxvZygnc2Rmc2RmJyk7XG5cblx0Ly/qsJzrsJzsmqkg66mU7ISc65OcIOyLpO2WiVxuXHRpZiAoIGxvY2F0aW9uLmhyZWYuaW5kZXhPZignP2RldicpID4gLTEgKSB7XG5cdFx0ZGV2LmFwcGVuZE1lbnVMaXN0KCk7XG5cdFx0ZGV2LmFwcGVuZE1lbnVCdG4oKTtcbiAgICBjb25zb2xlLmxvZyh1dGlsLmlzRGV2aWNlKCkuZ2luZ2VyYnJlYWQpO1xuICAgIGlmICggdXRpbC5pc0RldmljZSgpLmdpbmdlcmJyZWFkICkge1xuICAgICAgYWxlcnQoJ2M4Jyk7XG4gICAgfVxuXHR9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3VpLmNvbW1vbi5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zY3NzL2NvbmNhdC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==