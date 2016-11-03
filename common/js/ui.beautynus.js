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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzgyZTQ0ZmNjY2RhZDUyNjAwNDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VpLmNvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9jb25jYXQuc2NzcyJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsInVpIiwidXRpbCIsImNvbW1vbk5vdGhpbmciLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzRGV2aWNlIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJjaGVjayIsImFuZHJvaWQiLCJnaW5nZXJicmVhZCIsImlvcyIsIm1hdGNoIiwiY29tbW9uIiwiZW1wdHlMaW5rRnVuYyIsImFsbEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYVRhZyIsImhyZWYiLCJpIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9nZ2xlY2xhc3MiLCJ0YWJsZUZhZGUiLCJfc2NvcGUiLCIkIiwiZWFjaCIsIiR0aGlzIiwiZmluZCIsIm9uIiwiZSIsIl90YXJnZXQiLCJ0YXJnZXQiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwic2Nyb2xsTGVmdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVHcm91cCIsImdyb3VwIiwiZWxlbWVudCIsImJlYXV0eW51cyIsImNhcmROZXdzIiwiZGVmYXVsdE9wdGlvbnMiLCJkaXJlY3Rpb24iLCJsb29wIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25UeXBlIiwiaW5pdCIsInNjb3BlIiwib3B0aW9ucyIsImFzc2lnbiIsIk9iamVjdCIsImV4dGVuZCIsInN3aXBlciIsImRhdGEiLCJTd2lwZXIiLCJtYW5hZ2VyIiwiYWNjb3JkaWFuIiwiY2xpY2siLCJpdGVtIiwicGFyZW50cyIsImhhc0NsYXNzIiwic2libGluZ3MiLCJzY3JvbGxUb3AiLCJwb3NpdGlvbiIsInRvcCIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsImluZGV4T2YiLCJkZXYiLCJhcHBlbmRNZW51TGlzdCIsImFwcGVuZE1lbnVCdG4iLCJhbGVydCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3JDQTs7QUFBOEI7QUFDOUI7QUFDQTs7O0FBS0EsS0FBSUEsTUFBTUMsTUFBVjtBQUFBLEtBQ0lDLE1BQU1DLFFBRFY7O0FBR0E7QUFDQUgsS0FBSUksRUFBSixHQUFTSCxPQUFPRyxFQUFQLElBQWE7O0FBRXJCO0FBQ0FDLFNBQU07QUFDTDtBQUNBQyxvQkFBZSx5QkFBVSxDQUFFOztBQUUzQjtBQUpLLE9BS0pDLE1BQU0sY0FBVUMsR0FBVixFQUFnQjtBQUN0QixXQUFJQSxPQUFPLElBQVAsSUFBZSxPQUFPQSxHQUFQLElBQWMsV0FBakMsRUFBOEMsT0FBTyxFQUFQO0FBQzlDLGNBQU9BLElBQUlDLE9BQUosQ0FBWSxZQUFaLEVBQTBCLEVBQTFCLENBQVA7QUFDQSxNQVJJO0FBU0ZDLGVBQVUsb0JBQVU7QUFDbkI7QUFDQSxXQUFJQyxLQUFLQyxVQUFVQyxTQUFuQjtBQUNBLGNBQU87QUFDTEMsZ0JBQU8saUJBQVc7QUFDaEIsZUFBSyxLQUFLQyxPQUFWLEVBQW9CO0FBQ3BCLGlCQUFLLEtBQUtDLFdBQVYsRUFBd0IsT0FBTyxhQUFQLENBQXhCLEtBQ0ssT0FBTyxTQUFQO0FBQ0w7QUFDRCxlQUFLLEtBQUtDLEdBQVYsRUFBZ0IsT0FBTyxLQUFQO0FBQ2hCLGVBQUssQ0FBQyxLQUFLRixPQUFOLElBQWlCLENBQUMsS0FBS0UsR0FBNUIsRUFBa0MsT0FBTyxXQUFQO0FBQ2xDLFVBUkk7QUFTTEEsY0FBS04sR0FBR08sS0FBSCxDQUFTLFFBQVQsSUFBcUIs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RS9CLE1BQUYsRUFBVXNFLFNBQVYsQ0FBcUJKLEtBQUtLLFFBQUwsR0FBZ0JDLEdBQXJDO0FBQ0EsUUFQQztBQVFBO0FBbEJjLElBQWhCO0FBb0JBekIsYUFBVWlCLFNBQVYsR0FBc0JBLFNBQXRCOztBQUVBOztBQUVBaEUsVUFBTytDLFNBQVAsR0FBbUJBLFNBQW5CO0FBRUQsRUEvREQsRUErREdoQixDQS9ESDs7QUFrRUE7QUFDQUEsR0FBRSxZQUFVOztBQUVWLE9BQUkzQixPQUFPRCxHQUFHQyxJQUFkO0FBQUEsT0FDSWMsU0FBU2YsR0FBR2UsTUFEaEI7QUFBQSxPQUVJVCxXQUFXTCxLQUFLSyxRQUFMLEVBRmY7O0FBSURTLFVBQU9DLGFBQVA7QUFDQUQsVUFBT1csU0FBUDtBQUNBRSxLQUFFLE1BQUYsRUFBVVksUUFBVixDQUFvQmxDLFNBQVNJLEtBQVQsRUFBcEI7O0FBRUFrQyxhQUFVaUIsU0FBVixDQUFvQlYsSUFBcEIsQ0FBeUIsWUFBekI7O0FBRUNtQixXQUFRQyxHQUFSLENBQVksUUFBWjs7QUFFRDtBQUNBLE9BQUtDLFNBQVNwRCxJQUFULENBQWNxRCxPQUFkLENBQXNCLE1BQXRCLElBQWdDLENBQUMsQ0FBdEMsRUFBMEM7QUFDekNDLFNBQUlDLGNBQUo7QUFDQUQsU0FBSUUsYUFBSjtBQUNFTixhQUFRQyxHQUFSLENBQVl0RSxLQUFLSyxRQUFMLEdBQWdCTSxXQUE1QjtBQUNBLFNBQUtYLEtBQUtLLFFBQUwsR0FBZ0JNLFdBQXJCLEVBQW1DO0FBQ2pDaUUsYUFBTSxJQUFOO0FBQ0Q7QUFDSDtBQUNELEVBdkJELEU7Ozs7Ozs7QUNuS0EsMEMiLCJmaWxlIjoidWkuYmVhdXR5bnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzgyZTQ0ZmNjY2RhZDUyNjAwNDVcbiAqKi8iLCJcbmltcG9ydCAnLi4vc2Nzcy9jb25jYXQuc2Nzcyc7IC8vc3R5bGVcbi8vIGltcG9ydCBTd2lwZXIgZnJvbSAnLi9zd2lwZXIuanF1ZXJ5LnVtZC5taW4uanMnOyAvL3N3aXBlciBqcXVlcnkgcGx1Z2luXG4vLyBpbXBvcnQgZGV2LCB7IG1lbnVMaXN0IH0gZnJvbSAnLi9kZXYuanMnOyAvL+qwnOuwnOyaqSDsiqTtgazrpr3tirgg7ZSE66Gc642V7IWY7IucIOyCreygnFxuXG5cblxuXG52YXIgd2luID0gd2luZG93LFxuICAgIGRvYyA9IGRvY3VtZW50O1xuXG4vL3VpIOq0gOugqCDqs7XthrUg7Iqk7YGs66a97Yq4XG53aW4udWkgPSB3aW5kb3cudWkgfHwge1xuXG5cdC8v7Jyg7Yu4IOuplOyEnOuTnFxuXHR1dGlsOiB7XG5cdFx0Ly8g67mIIO2VqOyImCDtgbTrpq3si5wg7Jik66WYIOuwqeyngFxuXHRcdGNvbW1vbk5vdGhpbmc6IGZ1bmN0aW9uKCl7fVxuXG5cdFx0Ly8g7JaR7Kq9IOyXrOuwsSDsoJzqsbBcblx0XHQsdHJpbTogZnVuY3Rpb24oIHN0ciApIHtcblx0XHRcdGlmIChzdHIgPT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09ICd1bmRlZmluZWQnKSByZXR1cm4gXCJcIjtcblx0XHRcdHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdFx0fVxuICAgICxpc0RldmljZTogZnVuY3Rpb24oKXtcbiAgICAgIC8v66qo67CU7J28IFVBXG4gICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hlY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICggdGhpcy5hbmRyb2lkICkge1xuICAgICAgICBcdFx0aWYgKCB0aGlzLmdpbmdlcmJyZWFkICkgcmV0dXJuICdnaW5nZXJicmVhZCc7XG4gICAgICAgIFx0XHRlbHNlIHJldHVybiAnYW5kcm9pZCc7XG4gICAgICAgIFx0fVxuICAgICAgICBcdGlmICggdGhpcy5pb3MgKSByZXR1cm4gJ2lvcyc7XG4gICAgICAgIFx0aWYgKCAhdGhpcy5hbmRyb2lkICYmICF0aGlzLmlvcyApIHJldHVybiAnbm8tbW9iaWxlJztcbiAgICAgICAgfSxcbiAgICAgICAgaW9zOiB1YS5tYXRjaCgnaVBob25lJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGFuZHJvaWQ6IHVhLm1hdGNoKCdBbmRyb2lkJykgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGdpbmdlcmJyZWFkOiB1YS5tYXRjaCgnQW5kcm9pZCAyLjMnKSA/IHRydWUgOiBmYWxzZVxuICAgICAgfVxuICAgIH1cblx0fVxuXG5cdC8vIOqzte2GtSDrqZTshJzrk5xcblx0LGNvbW1vbjoge1xuXG5cdFx0Ly8gYe2DnOq3uOydmCBocmVmIOqwkuydtCAjIOydvOqyveyasCBjb21tb25Ob3RoaW5nKCnsnLzroZwg64yA7LK0XG5cdCAgXHRlbXB0eUxpbmtGdW5jOiBmdW5jdGlvbigpIHtcblx0XHRcdC8vYe2DnOq3uCBocmVm7JeQIOuNlOuvuCDtlajsiJgg7IK97J6FXG5cdFx0XHR2YXIgYWxsQSA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdhJyksIGFUYWcgPSBudWxsLCBocmVmID0gbnVsbDtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhbGxBLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKXtcblx0XHRcdFx0YVRhZyA9IGFsbEFbaV07XG5cdFx0XHRcdGhyZWYgPSBhVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoIHVpLnV0aWwudHJpbSggaHJlZiApID09ICcjJyB8fCBocmVmID09IG51bGwgKVxuXHRcdFx0XHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgJ2phdmFzY3JpcHQ6dWkudXRpbC5jb21tb25Ob3RoaW5nKCk7Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gdG9nZ2xlQ2xhc3MgY3VzdG9tXG5cdFx0LHRvZ2dsZWNsYXNzOiBmdW5jdGlvbigpe1xuXG5cdFx0fVxuXG5cdFx0Ly8g7YWM7J2067iUIOyKpO2BrOuhpCDsi5wg7JaR7Kq9IOyWtOuKkOyqveydtOuToCDtlZzsqr0g64Gd7JeQIOuPhOuLrCDtlaAg6rK97JqwIGJn7IOd7ISxXG5cdFx0LHRhYmxlRmFkZTogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBfc2NvcGUgPSAkKCcuanMtZmFkZWluLXdyYXAnKTtcbiAgICAgIGlmICggX3Njb3BlLmxlbmd0aCA8PSAwICkgcmV0dXJuO1xuXHRcdFx0JCgnLmpzLWZhZGVpbi13cmFwJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCcuanMtZmFkZWluLXNjcm9sbCcpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHZhciBfdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0aWYoICggX3RhcmdldC5zY3JvbGxXaWR0aCAtIF90YXJnZXQuY2xpZW50V2lkdGgpIDw9IChfdGFyZ2V0LnNjcm9sbExlZnQgKyAyMCkgKXtcblx0XHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCdvbicpO1xuXHRcdFx0XHRcdH0gIGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ29uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSk7XG5cdFx0fVxuXG4gICAgLy8g6re466O5IO2GoOq4gFxuICAgICx0b2dnbGVHcm91cCA6IGZ1bmN0aW9uKGdyb3VwLCBlbGVtZW50KXtcbiAgICAgICQoZ3JvdXApLmZpbmQoZWxlbWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJChncm91cCkuZmluZChlbGVtZW50KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuXHR9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGJlYXV0eW51cyBtZXRob2QgZ3JvdXBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uKCQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICBjb21tb24gPSB1aS5jb21tb247XG5cbiAgdmFyIGJlYXV0eW51cyA9IGJlYXV0eW51cyB8fCB7fVxuXG4gIC8vIOu3sO2LsOy7qO2FkOy4oCDsubTrk5zribTsiqTtmJVcbiAgdmFyIGNhcmROZXdzID0ge1xuICAgIF9zY29wZTogJydcblxuICAgICxkZWZhdWx0T3B0aW9uczoge1xuICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgcGFnaW5hdGlvbjogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICBwYWdpbmF0aW9uVHlwZTogJ2ZyYWN0aW9uJ1xuICAgIH1cblxuICAgICxpbml0OiBmdW5jdGlvbihzY29wZSwgb3B0aW9ucyl7XG4gICAgICB0aGlzLl9zY29wZSA9IHNjb3BlO1xuICAgICAgdmFyIGFzc2lnbiA9ICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PSAndW5kZWZpbmVkJykgPyAkLmV4dGVuZCA6IE9iamVjdC5hc3NpZ247IC8vYXNzaWduIO2VqOyImCDsobTsnqwg7Jes67aAIOyytO2BrCwg7JeG7Jy866m0ICQuZXh0ZW5k66GcIOuMgOyytFxuICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PSAndW5kZWZpbmVkJykgPyB0aGlzLmRlZmF1bHRPcHRpb25zIDogYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTsgLy9vcHRpb25zIOunpOqwnOuzgOyImOqwgCB1bmRlZmluZWQg7J28IOqyveyasOulvCDssrTtgaztlZjsl6wg7Jik66WYIOuwqeyngFxuICAgICAgdGhpcy5zd2lwZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLHN3aXBlcjogZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAkKHRoaXMuX3Njb3BlKS5kYXRhKCdtYW5hZ2VyJywgbmV3IFN3aXBlcih0aGlzLl9zY29wZSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgICxtYW5hZ2VyOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuICQodGhpcy5fc2NvcGUpLmRhdGEoJ21hbmFnZXInKTtcbiAgICB9XG5cbiAgfTtcbiAgYmVhdXR5bnVzLmNhcmROZXdzID0gY2FyZE5ld3M7XG5cbiAgdmFyIGFjY29yZGlhbiA9IHtcbiAgXHRfc2NvcGU6ICcnXG4gIFx0LGluaXQ6IGZ1bmN0aW9uICggX3Njb3BlICl7XG4gIFx0XHRpZiAoIHR5cGVvZiBfc2NvcGUgPT0gJ3VuZGVmaW5lZCcgKVxuICBcdFx0XHR0aGlzLl9zY29wZSA9ICcuYWNjb3JkaWFuJztcbiAgXHRcdGVsc2UgXG4gIFx0XHRcdHRoaXMuX3Njb3BlID0gX3Njb3BlO1xuICBcdFx0dGhpcy5jbGljaygpO1xuICBcdH1cbiAgXHQsY2xpY2s6IGZ1bmN0aW9uICggICkge1xuICBcdFx0JCh0aGlzLl9zY29wZSkub24oJ2NsaWNrJywgJy50aXRsZSBhJywgZnVuY3Rpb24oKXtcbiAgXHRcdFx0dmFyIGl0ZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5pdGVtJyk7XG5cdFx0XHRpZiAoIGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpIClcblx0XHRcdFx0aXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCcuaXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQod2luZG93KS5zY3JvbGxUb3AoIGl0ZW0ucG9zaXRpb24oKS50b3AgKTtcblx0XHR9KTtcbiAgXHR9XG4gIH07XG4gIGJlYXV0eW51cy5hY2NvcmRpYW4gPSBhY2NvcmRpYW47XG5cbiAgLy8g67ew7Yuw7Luo7YWQ7LigIOuPmeyDgeyDge2YlVxuXG4gIHdpbmRvdy5iZWF1dHludXMgPSBiZWF1dHludXM7XG5cbn0pKCQpO1xuXG5cbi8vRE9NIOuhnOuTnO2bhCDsi6TtlolcbiQoZnVuY3Rpb24oKXtcblxuICB2YXIgdXRpbCA9IHVpLnV0aWwsXG4gICAgICBjb21tb24gPSB1aS5jb21tb24sXG4gICAgICBpc0RldmljZSA9IHV0aWwuaXNEZXZpY2UoKTtcblxuXHRjb21tb24uZW1wdHlMaW5rRnVuYygpO1xuXHRjb21tb24udGFibGVGYWRlKCk7XG5cdCQoJ2JvZHknKS5hZGRDbGFzcyggaXNEZXZpY2UuY2hlY2soKSApO1xuXG5cdGJlYXV0eW51cy5hY2NvcmRpYW4uaW5pdCgnLmFjY29yZGlhbicpO1xuXG4gIGNvbnNvbGUubG9nKCdzZGZzZGYnKTtcblxuXHQvL+qwnOuwnOyaqSDrqZTshJzrk5wg7Iuk7ZaJXG5cdGlmICggbG9jYXRpb24uaHJlZi5pbmRleE9mKCc/ZGV2JykgPiAtMSApIHtcblx0XHRkZXYuYXBwZW5kTWVudUxpc3QoKTtcblx0XHRkZXYuYXBwZW5kTWVudUJ0bigpO1xuICAgIGNvbnNvbGUubG9nKHV0aWwuaXNEZXZpY2UoKS5naW5nZXJicmVhZCk7XG4gICAgaWYgKCB1dGlsLmlzRGV2aWNlKCkuZ2luZ2VyYnJlYWQgKSB7XG4gICAgICBhbGVydCgnYzgnKTtcbiAgICB9XG5cdH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdWkuY29tbW9uLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Njc3MvY29uY2F0LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9