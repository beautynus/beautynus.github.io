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
/***/ function(module, exports) {

	"use strict";
	
	var menu_data = {
		"멤버쉽": {
			"이용약관": {
				"개인정보 처리방침": "/html/membership/serviceAgreement/personalInformation.html",
				"위치기반서비스 이용약관": "/html/membership/serviceAgreement/locationBased.html"
			}
		},
		"뷰티컨텐츠": {
			"목록": {
				"상세(카드뉴스형)": "/html/beautyContent/cardType.html",
				"상세(동영상형)": "/html/beautyContent/movieType.html"
			}
		},
		"고객센터": {
			"공지사항": {
				"목록": "/html/cs/notice/list.html",
				"상세": "/html/cs/notice/view.html"
			},
			"도움말": {
				"메인": "/html/cs/help/index.html",
				"서비스가이드": "/html/cs/help/tutorial.html"
			}
		},
		"설정": {
			"설정항목": {
				"마케팅 수신동의 상세": "/html/cs/config/marketingAgreement.html",
				"서비스 이용약관 상세": "/html/cs/config/serviceAgreement.html",
				"개인정보 취급방침 상세": "/html/cs/config/privacyStatement.html",
				"위치기반 서비스 이용약관": "/html/cs/config/locationServiceAgreement.html"
			}
		},
		"마이페이지": {
			"브랜드별 매장선택": "/html/mypage/grade/",
			"나의 등급": "/html/mypage/selectStore/"
		}
	};
	
	// var makeMenu = function(data) {
	// 	var html = `<div id="menu"><div id="menu-list">`;
	// 	for ( var i in data ) {
	// 		html += `
	// <h2><span>${i}</span></h2>\n`;
	// 		if ( typeof data[i] == 'object' && !Array.isArray(data[i]) ) {
	// 			for ( var j1 in data[i] ) {
	// 				html += `
	// <h3><span>${j1}</span></h3>\n`;
	// console.log(data[i][j1], '===============');
	// 				if ( typeof data[i][j1] == 'object' && !Array.isArray(data[i][j1])) {
	// 					//3depth 까지 이므로...
	// 				} else {
	// 					for ( var k in data[i][j1] ) {
	// 						console.log(data[i][j1], '=========');
	// 						if ( k == 0 ) html += `
	// <ul>\n`;
	// 						html += `
	// 	<li>
	// 		<a href="${data[i][j1][k][Object.keys(data[i][j1][k])]} ">
	// 			${data[i][j1][k]}
	// 		</a>
	// 	</li>`;
	// 						if ( k == data[i][j1].length -1 ) html += `
	// </ul>\n`;
	// 					}
	// 				}
	//     		}
	// 		} else {
	// 			for ( var j2=0; j2<data[i].length; j2++ ) {
	// 				if ( j2 == 0 ) html += `
	// <ul>\n`;
	// 				html += `
	// 	<li>
	// 		<a href="${data[i][j2][Object.keys(data[i][j2])]}">
	// 			${Object.keys(data[i][j2])}
	// 		</a>
	// 	</li>`;
	// 				if ( j2 == data[i].length - 1 ) html += `
	// </ul>\n`;
	// 			}
	// 		}
	// 	}
	// 	html += `</div></div>`;
	// 	return html;
	// };
	// var menuList = null;
	// export default menuList = makeMenu(menu_data);
	
	
	//보류된 내용
	// <h3><span>오픈이벤트</span></h3>
	// 		<ul>
	// 			<li><a href="/html/event/open/view.html">상세</a></li>
	// 		</ul>
	
	var menuList = "\n<div id=\"menu\">\n\t<div id=\"menu-list\">\n\t\t<h2><span>공통</span></h2>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/reply.html\">댓글</a></li>\n\t\t</ul>\n\n\t\t<h2><span>멤버쉽</span></h2>\n\t\t<h3><span>이용약관</span></h3>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/membership/serviceAgreement/service.html\">서비스 이용약관</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/membership/serviceAgreement/personalInfomation.html\">개인정보 처리방침</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/membership/serviceAgreement/locationBased.html\">위치기반서비스 이용약관</a></li>\n\t\t</ul>\n\n\t\t<h2><span>이벤트&행사</span></h2>\n\t\t<h3><span>진행중인 이벤트</span></h3>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/view.html\">상세 - 일반</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/viewHera.html\">상세 - 헤라메이크업쇼</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/viewPoll_singleSelect.html\">상세 (투표하기 - 단일선택)</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/viewPoll_multiSelect.html\">상세 (투표하기 - 복수선택)</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/viewPollComplete.html\">상세 (투표완료)</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/event/ongoing/viewPoll_finish.html\">상세 (투표종료 후 확인)</a></li>\n\t\t</ul>\n\n\t\t<h2><span>뷰티컨텐츠</span></h2>\n\t\t<h3><span>목록</span></h3>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/beautyContent/cardType.html\">상세(카드뉴스형)</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/beautyContent/movieType.html\">상세(동영상형)</a></li>\n\t\t</ul>\n\n\t\t<h2><span>상품정보</span></h2>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/productInfo/view.html\">상품 상세</a></li>\n\t\t</ul>\n\n\t\t<h2><span>상품 상세</span></h2>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/productReview/view.html\">상품리뷰</a></li>\n\t\t</ul>\n\n\t\t<h2><span>고객센터</span></h2>\n\t\t<h3><span>공지사항</span></h3>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/cs/notice/list.html\">목록 + 상세</a></li>\n\t\t</ul>\n\n\t\t<h3><span>도움말</span></h3>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/cs/help/index.html\">메인</a></li>\n\t\t</ul>\n\n\n\t\t<h2><span>설정</span></h2>\n\t\t<h3><span>설정항목</span></h3>\n\t\t<ul>\n\t\t\t<li><a href=\"/html/cs/config/marketingAgreement.html\">마케팅 수신동의 상세</a></li>\n\t\t\t<li><a href=\"/html/cs/config/serviceAgreement.html\">서비스 이용약관 상세</a></li>\n\t\t\t<li><a href=\"/html/cs/config/privacyStatement.html\">개인정보 취급방침 상세</a></li>\n\t\t\t<li><a href=\"/html/cs/config/locationServiceAgreement.html\">위치기반 서비스 이용약관</a></li>\n\t\t</ul>\n\n\t\t<h2><span>마이페이지</span></h2>\n\t\t<ul>\n\t\t\t<li class=\"cp\"><a href=\"/html/myPage/grade/index.html\">나의 등급</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/myPage/selectStore/index.html\">브랜드별 매장선택</a></li>\n\t\t\t<li class=\"cp\"><a href=\"/html/myPage/coupon/index.html\">나의 쿠폰</a></li>\n\t\t</ul>\n\n\t\t<h2><span>엔젤톡톡</span></h2>\n\t\t<ul>\n\t\t\t<li class=\"\"><a href=\"/html/engelTalk/talk_inquiry.html\">관심상품문의</a></li>\n\t\t\t<li class=\"\"><a href=\"/html/engelTalk/talk_\">엔젤부재중</a></li>\n\t\t\t<li class=\"\"><a href=\"/html/engelTalk/talk_\">예시</a></li>\n\t\t\t<li class=\"\"><a href=\"/html/engelTalk/talk_\">고객용</a></li>\n\t\t</ul>\n\t</div>\n</div>";
	
	// 메뉴 버튼 삽입
	window.dev = {
		appendMenuBtn: function appendMenuBtn() {
			var menuTrigger = "<button class=\"menu-trigger\">\n\t\t\t\t\t\t\t\t<span>toggle menu</span>\n\t\t\t\t\t\t\t</button>";
	
			if ($('button.menu-trigger').length <= 0) {
				$('#menu').prepend(menuTrigger);
			}
	
			$('.menu-trigger').off('click').on('click', function () {
				var condition = $('#menu-list').hasClass('is-active');
				if (condition) {
					$('#menu-list').add($(this)).removeClass('is-active');
				} else {
					$('#menu-list').add($(this)).addClass('is-active');
				}
			});
		}
	
		// 메뉴 리스트 삽입
		, appendMenuList: function appendMenuList() {
	
			if ($('#menu').length <= 0) {
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
			$('body').append($('<div class="dimm" />').append($("<span>" + msg + "<span/><button class=\"close\">[닫기]</span></button>")));
			$('.dimm').on('click', '.close', function () {
				$('.dimm').remove();
			});
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjdkODllNmE4YjUwYTk0ZDljYWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Rldi5qcyJdLCJuYW1lcyI6WyJtZW51X2RhdGEiLCJtZW51TGlzdCIsIndpbmRvdyIsImRldiIsImFwcGVuZE1lbnVCdG4iLCJtZW51VHJpZ2dlciIsIiQiLCJsZW5ndGgiLCJwcmVwZW5kIiwib2ZmIiwib24iLCJjb25kaXRpb24iLCJoYXNDbGFzcyIsImFkZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJhcHBlbmRNZW51TGlzdCIsImZpbmQiLCJlYWNoIiwiYUhSRUYiLCJhdHRyIiwiaW5kZXhPZiIsImRpbW0iLCJtc2ciLCJhcHBlbmQiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBSUEsWUFBWTtBQUNmLFNBQU87QUFDTixXQUFRO0FBQ1AsaUJBQWEsNERBRE47QUFFUCxvQkFBZ0I7QUFGVDtBQURGLEdBRFE7QUFPZixXQUFTO0FBQ1IsU0FBTTtBQUNMLGlCQUFhLG1DQURSO0FBRUwsZ0JBQVk7QUFGUDtBQURFLEdBUE07QUFhZixVQUFRO0FBQ1AsV0FBUTtBQUNQLFVBQU0sMkJBREM7QUFFUCxVQUFNO0FBRkMsSUFERDtBQUtQLFVBQU87QUFDTixVQUFNLDBCQURBO0FBRU4sY0FBVTtBQUZKO0FBTEEsR0FiTztBQXVCZixRQUFNO0FBQ0wsV0FBUTtBQUNQLG1CQUFlLHlDQURSO0FBRVAsbUJBQWUsdUNBRlI7QUFHUCxvQkFBZ0IsdUNBSFQ7QUFJUCxxQkFBaUI7QUFKVjtBQURILEdBdkJTO0FBK0JmLFdBQVM7QUFDUixnQkFBYSxxQkFETDtBQUVSLFlBQVM7QUFGRDtBQS9CTSxFQUFoQjs7QUFxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUlDLDRvR0FBSjs7QUFrRkE7QUFDQUMsUUFBT0MsR0FBUCxHQUFhO0FBQ1pDLGlCQUFlLHlCQUFVO0FBQ3hCLE9BQUlDLGtIQUFKOztBQUlBLE9BQUtDLEVBQUUscUJBQUYsRUFBeUJDLE1BQXpCLElBQW1DLENBQXhDLEVBQTRDO0FBQzNDRCxNQUFFLE9BQUYsRUFBV0UsT0FBWCxDQUFtQkgsV0FBbkI7QUFDQTs7QUFFREMsS0FBRSxlQUFGLEVBQW1CRyxHQUFuQixDQUF1QixPQUF2QixFQUFnQ0MsRUFBaEMsQ0FBbUMsT0FBbkMsRUFBNEMsWUFBVTtBQUNyRCxRQUFJQyxZQUFZTCxFQUFFLFlBQUYsRUFBZ0JNLFFBQWhCLENBQXlCLFdBQXpCLENBQWhCO0FBQ0EsUUFBS0QsU0FBTCxFQUFpQjtBQUNoQkwsT0FBRSxZQUFGLEVBQWdCTyxHQUFoQixDQUFvQlAsRUFBRSxJQUFGLENBQXBCLEVBQTZCUSxXQUE3QixDQUF5QyxXQUF6QztBQUNBLEtBRkQsTUFFTztBQUNOUixPQUFFLFlBQUYsRUFBZ0JPLEdBQWhCLENBQW9CUCxFQUFFLElBQUYsQ0FBcEIsRUFBNkJTLFFBQTdCLENBQXNDLFdBQXRDO0FBQ0E7QUFDRCxJQVBEO0FBUUE7O0FBRUQ7QUFwQlksSUFxQlhDLGdCQUFnQiwwQkFBVTs7QUFFMUIsT0FBS1YsRUFBRSxPQUFGLEVBQVdDLE1BQVgsSUFBcUIsQ0FBMUIsRUFBOEI7QUFDN0JELE1BQUUsT0FBRixFQUFXQyxNQUFYLElBQXFCLENBQXJCLEdBQXlCRCxFQUFFLE1BQUYsRUFBVUUsT0FBVixDQUFtQlAsUUFBbkIsQ0FBekIsR0FBeURLLEVBQUUsT0FBRixFQUFXRSxPQUFYLENBQW9CUCxRQUFwQixDQUF6RDtBQUNBO0FBQ0RLLEtBQUUsWUFBRixFQUFnQlcsSUFBaEIsQ0FBcUIsR0FBckIsRUFBMEJDLElBQTFCLENBQStCLFlBQVU7QUFDeEMsUUFBSUMsUUFBUWIsRUFBRSxJQUFGLEVBQVFjLElBQVIsQ0FBYSxNQUFiLENBQVo7QUFDQSxRQUFLRCxNQUFNRSxPQUFOLENBQWMsTUFBZCxLQUF5QixDQUFDLENBQS9CLEVBQW1DO0FBQ2xDZixPQUFFLElBQUYsRUFBUWMsSUFBUixDQUFhLE1BQWIsRUFBcUJELFFBQVEsTUFBN0I7QUFDQTtBQUNELElBTEQ7QUFNQSxHQWhDVztBQWlDWEcsUUFBTSxjQUFTQyxHQUFULEVBQWE7QUFDbkJBLFNBQU1BLE9BQU8sV0FBYjtBQUNBakIsS0FBRSxNQUFGLEVBQVVrQixNQUFWLENBQ0NsQixFQUFFLHNCQUFGLEVBQTBCa0IsTUFBMUIsQ0FDQ2xCLGFBQVdpQixHQUFYLHlEQURELENBREQ7QUFLQWpCLEtBQUUsT0FBRixFQUFXSSxFQUFYLENBQWMsT0FBZCxFQUF1QixRQUF2QixFQUFpQyxZQUFVO0FBQzFDSixNQUFFLE9BQUYsRUFBV21CLE1BQVg7QUFDQSxJQUZEO0FBR0E7QUEzQ1csRUFBYixDIiwiZmlsZSI6ImRldi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY3ZDg5ZTZhOGI1MGE5NGQ5Y2FlXG4gKiovIiwidmFyIG1lbnVfZGF0YSA9IHtcblx0XCLrqaTrsoTsib1cIjoge1xuXHRcdFwi7J207Jqp7JW96rSAXCI6IHtcblx0XHRcdFwi6rCc7J247KCV67O0IOyymOumrOuwqey5qFwiOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9wZXJzb25hbEluZm9ybWF0aW9uLmh0bWxcIixcblx0XHRcdFwi7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gFwiOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9sb2NhdGlvbkJhc2VkLmh0bWxcIlxuXHRcdH1cblx0fSxcblx0XCLrt7Dti7Dsu6jthZDsuKBcIjoge1xuXHRcdFwi66qp66GdXCI6IHtcblx0XHRcdFwi7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSlcIjogXCIvaHRtbC9iZWF1dHlDb250ZW50L2NhcmRUeXBlLmh0bWxcIixcblx0XHRcdFwi7IOB7IS4KOuPmeyYgeyDge2YlSlcIjogXCIvaHRtbC9iZWF1dHlDb250ZW50L21vdmllVHlwZS5odG1sXCJcblx0XHR9XG5cdH0sXG5cdFwi6rOg6rCd7IS87YSwXCI6IHtcblx0XHRcIuqzteyngOyCrO2VrVwiOiB7XG5cdFx0XHRcIuuqqeuhnVwiOiBcIi9odG1sL2NzL25vdGljZS9saXN0Lmh0bWxcIixcblx0XHRcdFwi7IOB7IS4XCI6IFwiL2h0bWwvY3Mvbm90aWNlL3ZpZXcuaHRtbFwiXG5cdFx0fSxcblx0XHRcIuuPhOybgOunkFwiOiB7XG5cdFx0XHRcIuuplOyduFwiOiBcIi9odG1sL2NzL2hlbHAvaW5kZXguaHRtbFwiLFxuXHRcdFx0XCLshJzruYTsiqTqsIDsnbTrk5xcIjogXCIvaHRtbC9jcy9oZWxwL3R1dG9yaWFsLmh0bWxcIlxuXHRcdH1cblx0fSxcblx0XCLshKTsoJVcIjoge1xuXHRcdFwi7ISk7KCV7ZWt66qpXCI6IHtcblx0XHRcdFwi66eI7LyA7YyFIOyImOyLoOuPmeydmCDsg4HshLhcIjogXCIvaHRtbC9jcy9jb25maWcvbWFya2V0aW5nQWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCDsg4HshLhcIjogXCIvaHRtbC9jcy9jb25maWcvc2VydmljZUFncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcIuqwnOyduOygleuztCDst6jquInrsKnsuagg7IOB7IS4XCI6IFwiL2h0bWwvY3MvY29uZmlnL3ByaXZhY3lTdGF0ZW1lbnQuaHRtbFwiLFxuXHRcdFx0XCLsnITsuZjquLDrsJgg7ISc67mE7IqkIOydtOyaqeyVveq0gFwiOiBcIi9odG1sL2NzL2NvbmZpZy9sb2NhdGlvblNlcnZpY2VBZ3JlZW1lbnQuaHRtbFwiXG5cdFx0fVxuXHR9LFxuXHRcIuuniOydtO2OmOydtOyngFwiOiB7XG5cdFx0XCLruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdXCI6IFwiL2h0bWwvbXlwYWdlL2dyYWRlL1wiLFxuXHRcdFwi64KY7J2YIOuTseq4iVwiOiBcIi9odG1sL215cGFnZS9zZWxlY3RTdG9yZS9cIlxuXHR9XG59O1xuXG4vLyB2YXIgbWFrZU1lbnUgPSBmdW5jdGlvbihkYXRhKSB7XG4vLyBcdHZhciBodG1sID0gYDxkaXYgaWQ9XCJtZW51XCI+PGRpdiBpZD1cIm1lbnUtbGlzdFwiPmA7XG4vLyBcdGZvciAoIHZhciBpIGluIGRhdGEgKSB7XG4vLyBcdFx0aHRtbCArPSBgXG4vLyA8aDI+PHNwYW4+JHtpfTwvc3Bhbj48L2gyPlxcbmA7XG4vLyBcdFx0aWYgKCB0eXBlb2YgZGF0YVtpXSA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShkYXRhW2ldKSApIHtcbi8vIFx0XHRcdGZvciAoIHZhciBqMSBpbiBkYXRhW2ldICkge1xuLy8gXHRcdFx0XHRodG1sICs9IGBcbi8vIDxoMz48c3Bhbj4ke2oxfTwvc3Bhbj48L2gzPlxcbmA7XG4vLyBjb25zb2xlLmxvZyhkYXRhW2ldW2oxXSwgJz09PT09PT09PT09PT09PScpO1xuLy8gXHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhW2ldW2oxXSA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShkYXRhW2ldW2oxXSkpIHtcbi8vIFx0XHRcdFx0XHQvLzNkZXB0aCDquYzsp4Ag7J2066+A66GcLi4uXG4vLyBcdFx0XHRcdH0gZWxzZSB7XG4vLyBcdFx0XHRcdFx0Zm9yICggdmFyIGsgaW4gZGF0YVtpXVtqMV0gKSB7XG4vLyBcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhW2ldW2oxXSwgJz09PT09PT09PScpO1xuLy8gXHRcdFx0XHRcdFx0aWYgKCBrID09IDAgKSBodG1sICs9IGBcbi8vIDx1bD5cXG5gO1xuLy8gXHRcdFx0XHRcdFx0aHRtbCArPSBgXG4vLyBcdDxsaT5cbi8vIFx0XHQ8YSBocmVmPVwiJHtkYXRhW2ldW2oxXVtrXVtPYmplY3Qua2V5cyhkYXRhW2ldW2oxXVtrXSldfSBcIj5cbi8vIFx0XHRcdCR7ZGF0YVtpXVtqMV1ba119XG4vLyBcdFx0PC9hPlxuLy8gXHQ8L2xpPmA7XG4vLyBcdFx0XHRcdFx0XHRpZiAoIGsgPT0gZGF0YVtpXVtqMV0ubGVuZ3RoIC0xICkgaHRtbCArPSBgXG4vLyA8L3VsPlxcbmA7XG4vLyBcdFx0XHRcdFx0fVxuLy8gXHRcdFx0XHR9XG4vLyAgICAgXHRcdH1cbi8vIFx0XHR9IGVsc2Uge1xuLy8gXHRcdFx0Zm9yICggdmFyIGoyPTA7IGoyPGRhdGFbaV0ubGVuZ3RoOyBqMisrICkge1xuLy8gXHRcdFx0XHRpZiAoIGoyID09IDAgKSBodG1sICs9IGBcbi8vIDx1bD5cXG5gO1xuLy8gXHRcdFx0XHRodG1sICs9IGBcbi8vIFx0PGxpPlxuLy8gXHRcdDxhIGhyZWY9XCIke2RhdGFbaV1bajJdW09iamVjdC5rZXlzKGRhdGFbaV1bajJdKV19XCI+XG4vLyBcdFx0XHQke09iamVjdC5rZXlzKGRhdGFbaV1bajJdKX1cbi8vIFx0XHQ8L2E+XG4vLyBcdDwvbGk+YDtcbi8vIFx0XHRcdFx0aWYgKCBqMiA9PSBkYXRhW2ldLmxlbmd0aCAtIDEgKSBodG1sICs9IGBcbi8vIDwvdWw+XFxuYDtcbi8vIFx0XHRcdH1cbi8vIFx0XHR9XG4vLyBcdH1cbi8vIFx0aHRtbCArPSBgPC9kaXY+PC9kaXY+YDtcbi8vIFx0cmV0dXJuIGh0bWw7XG4vLyB9O1xuLy8gdmFyIG1lbnVMaXN0ID0gbnVsbDtcbi8vIGV4cG9ydCBkZWZhdWx0IG1lbnVMaXN0ID0gbWFrZU1lbnUobWVudV9kYXRhKTtcblxuXG5cbi8v67O066WY65CcIOuCtOyaqVxuLy8gPGgzPjxzcGFuPuyYpO2UiOydtOuypO2KuDwvc3Bhbj48L2gzPlxuLy8gXHRcdDx1bD5cbi8vIFx0XHRcdDxsaT48YSBocmVmPVwiL2h0bWwvZXZlbnQvb3Blbi92aWV3Lmh0bWxcIj7sg4HshLg8L2E+PC9saT5cbi8vIFx0XHQ8L3VsPlxuXG52YXIgbWVudUxpc3QgPSBgXG48ZGl2IGlkPVwibWVudVwiPlxuXHQ8ZGl2IGlkPVwibWVudS1saXN0XCI+XG5cdFx0PGgyPjxzcGFuPuqzte2GtTwvc3Bhbj48L2gyPlxuXHRcdDx1bD5cblx0XHRcdDxsaSBjbGFzcz1cImNwXCI+PGEgaHJlZj1cIi9odG1sL2V2ZW50L29uZ29pbmcvcmVwbHkuaHRtbFwiPuuMk+q4gDwvYT48L2xpPlxuXHRcdDwvdWw+XG5cblx0XHQ8aDI+PHNwYW4+66mk67KE7Im9PC9zcGFuPjwvaDI+XG5cdFx0PGgzPjxzcGFuPuydtOyaqeyVveq0gDwvc3Bhbj48L2gzPlxuXHRcdDx1bD5cblx0XHRcdDxsaSBjbGFzcz1cImNwXCI+PGEgaHJlZj1cIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9zZXJ2aWNlLmh0bWxcIj7shJzruYTsiqQg7J207Jqp7JW96rSAPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJjcFwiPjxhIGhyZWY9XCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIj7qsJzsnbjsoJXrs7Qg7LKY66as67Cp7LmoPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJjcFwiPjxhIGhyZWY9XCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCI+7JyE7LmY6riw67CY7ISc67mE7IqkIOydtOyaqeyVveq0gDwvYT48L2xpPlxuXHRcdDwvdWw+XG5cblx0XHQ8aDI+PHNwYW4+7J2067Kk7Yq4Ju2WieyCrDwvc3Bhbj48L2gyPlxuXHRcdDxoMz48c3Bhbj7sp4TtlonspJHsnbgg7J2067Kk7Yq4PC9zcGFuPjwvaDM+XG5cdFx0PHVsPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3Lmh0bWxcIj7sg4HshLggLSDsnbzrsJg8L2E+PC9saT5cblx0XHRcdDxsaSBjbGFzcz1cImNwXCI+PGEgaHJlZj1cIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld0hlcmEuaHRtbFwiPuyDgeyEuCAtIO2XpOudvOuplOydtO2BrOyXheyHvDwvYT48L2xpPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9zaW5nbGVTZWxlY3QuaHRtbFwiPuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKTwvYT48L2xpPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9tdWx0aVNlbGVjdC5odG1sXCI+7IOB7IS4ICjtiKztkZztlZjquLAgLSDrs7XsiJjshKDtg50pPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJjcFwiPjxhIGhyZWY9XCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdQb2xsQ29tcGxldGUuaHRtbFwiPuyDgeyEuCAo7Yis7ZGc7JmE66OMKTwvYT48L2xpPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiPuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpPC9hPjwvbGk+XG5cdFx0PC91bD5cblxuXHRcdDxoMj48c3Bhbj7rt7Dti7Dsu6jthZDsuKA8L3NwYW4+PC9oMj5cblx0XHQ8aDM+PHNwYW4+66qp66GdPC9zcGFuPjwvaDM+XG5cdFx0PHVsPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvYmVhdXR5Q29udGVudC9jYXJkVHlwZS5odG1sXCI+7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSk8L2E+PC9saT5cblx0XHRcdDxsaSBjbGFzcz1cImNwXCI+PGEgaHJlZj1cIi9odG1sL2JlYXV0eUNvbnRlbnQvbW92aWVUeXBlLmh0bWxcIj7sg4HshLgo64+Z7JiB7IOB7ZiVKTwvYT48L2xpPlxuXHRcdDwvdWw+XG5cblx0XHQ8aDI+PHNwYW4+7IOB7ZKI7KCV67O0PC9zcGFuPjwvaDI+XG5cdFx0PHVsPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvcHJvZHVjdEluZm8vdmlldy5odG1sXCI+7IOB7ZKIIOyDgeyEuDwvYT48L2xpPlxuXHRcdDwvdWw+XG5cblx0XHQ8aDI+PHNwYW4+7IOB7ZKIIOyDgeyEuDwvc3Bhbj48L2gyPlxuXHRcdDx1bD5cblx0XHRcdDxsaSBjbGFzcz1cImNwXCI+PGEgaHJlZj1cIi9odG1sL3Byb2R1Y3RSZXZpZXcvdmlldy5odG1sXCI+7IOB7ZKI66as67ewPC9hPjwvbGk+XG5cdFx0PC91bD5cblxuXHRcdDxoMj48c3Bhbj7qs6DqsJ3shLzthLA8L3NwYW4+PC9oMj5cblx0XHQ8aDM+PHNwYW4+6rO17KeA7IKs7ZWtPC9zcGFuPjwvaDM+XG5cdFx0PHVsPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvY3Mvbm90aWNlL2xpc3QuaHRtbFwiPuuqqeuhnSArIOyDgeyEuDwvYT48L2xpPlxuXHRcdDwvdWw+XG5cblx0XHQ8aDM+PHNwYW4+64+E7JuA66eQPC9zcGFuPjwvaDM+XG5cdFx0PHVsPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvY3MvaGVscC9pbmRleC5odG1sXCI+66mU7J24PC9hPjwvbGk+XG5cdFx0PC91bD5cblxuXG5cdFx0PGgyPjxzcGFuPuyEpOyglTwvc3Bhbj48L2gyPlxuXHRcdDxoMz48c3Bhbj7shKTsoJXtla3rqqk8L3NwYW4+PC9oMz5cblx0XHQ8dWw+XG5cdFx0XHQ8bGk+PGEgaHJlZj1cIi9odG1sL2NzL2NvbmZpZy9tYXJrZXRpbmdBZ3JlZW1lbnQuaHRtbFwiPuuniOy8gO2MhSDsiJjsi6Drj5nsnZgg7IOB7IS4PC9hPjwvbGk+XG5cdFx0XHQ8bGk+PGEgaHJlZj1cIi9odG1sL2NzL2NvbmZpZy9zZXJ2aWNlQWdyZWVtZW50Lmh0bWxcIj7shJzruYTsiqQg7J207Jqp7JW96rSAIOyDgeyEuDwvYT48L2xpPlxuXHRcdFx0PGxpPjxhIGhyZWY9XCIvaHRtbC9jcy9jb25maWcvcHJpdmFjeVN0YXRlbWVudC5odG1sXCI+6rCc7J247KCV67O0IOy3qOq4ieuwqey5qCDsg4HshLg8L2E+PC9saT5cblx0XHRcdDxsaT48YSBocmVmPVwiL2h0bWwvY3MvY29uZmlnL2xvY2F0aW9uU2VydmljZUFncmVlbWVudC5odG1sXCI+7JyE7LmY6riw67CYIOyEnOu5hOyKpCDsnbTsmqnslb3qtIA8L2E+PC9saT5cblx0XHQ8L3VsPlxuXG5cdFx0PGgyPjxzcGFuPuuniOydtO2OmOydtOyngDwvc3Bhbj48L2gyPlxuXHRcdDx1bD5cblx0XHRcdDxsaSBjbGFzcz1cImNwXCI+PGEgaHJlZj1cIi9odG1sL215UGFnZS9ncmFkZS9pbmRleC5odG1sXCI+64KY7J2YIOuTseq4iTwvYT48L2xpPlxuXHRcdFx0PGxpIGNsYXNzPVwiY3BcIj48YSBocmVmPVwiL2h0bWwvbXlQYWdlL3NlbGVjdFN0b3JlL2luZGV4Lmh0bWxcIj7ruIzrnpzrk5zrs4Qg66ek7J6l7ISg7YOdPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJjcFwiPjxhIGhyZWY9XCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIj7rgpjsnZgg7L+g7Y+wPC9hPjwvbGk+XG5cdFx0PC91bD5cblxuXHRcdDxoMj48c3Bhbj7sl5TsoKTthqHthqE8L3NwYW4+PC9oMj5cblx0XHQ8dWw+XG5cdFx0XHQ8bGkgY2xhc3M9XCJcIj48YSBocmVmPVwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCI+6rSA7Ius7IOB7ZKI66y47J2YPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJcIj48YSBocmVmPVwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfXCI+7JeU7KCk67aA7J6s7KSRPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJcIj48YSBocmVmPVwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfXCI+7JiI7IucPC9hPjwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9XCJcIj48YSBocmVmPVwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfXCI+6rOg6rCd7JqpPC9hPjwvbGk+XG5cdFx0PC91bD5cblx0PC9kaXY+XG48L2Rpdj5gO1xuXG4vLyDrqZTribQg67KE7Yq8IOyCveyehVxud2luZG93LmRldiA9IHtcblx0YXBwZW5kTWVudUJ0bjogZnVuY3Rpb24oKXtcblx0XHR2YXIgbWVudVRyaWdnZXIgPSBgPGJ1dHRvbiBjbGFzcz1cIm1lbnUtdHJpZ2dlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPnRvZ2dsZSBtZW51PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5gO1xuXG5cdFx0aWYgKCAkKCdidXR0b24ubWVudS10cmlnZ2VyJykubGVuZ3RoIDw9IDAgKSB7XG5cdFx0XHQkKCcjbWVudScpLnByZXBlbmQobWVudVRyaWdnZXIpO1xuXHRcdH1cblxuXHRcdCQoJy5tZW51LXRyaWdnZXInKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBjb25kaXRpb24gPSAkKCcjbWVudS1saXN0JykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0aWYgKCBjb25kaXRpb24gKSB7XG5cdFx0XHRcdCQoJyNtZW51LWxpc3QnKS5hZGQoJCh0aGlzKSkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcjbWVudS1saXN0JykuYWRkKCQodGhpcykpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIOuplOuJtCDrpqzsiqTtirgg7IK97J6FXG5cdCxhcHBlbmRNZW51TGlzdDogZnVuY3Rpb24oKXtcblxuXHRcdGlmICggJCgnI21lbnUnKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdCQoJyN3cmFwJykubGVuZ3RoIDw9IDAgPyAkKCdib2R5JykucHJlcGVuZCggbWVudUxpc3QgKSA6ICQoJyN3cmFwJykucHJlcGVuZCggbWVudUxpc3QgKTtcblx0XHR9XG5cdFx0JCgnI21lbnUtbGlzdCcpLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYUhSRUYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdGlmICggYUhSRUYuaW5kZXhPZignP2RldicpIDw9IC0xICkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2hyZWYnLCBhSFJFRiArICc/ZGV2Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LGRpbW06IGZ1bmN0aW9uKG1zZyl7XG5cdFx0bXNnID0gbXNnIHx8ICfrgrTsmqnsnbQg7JeG7Iq164uI64ukLic7XG5cdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdCQoJzxkaXYgY2xhc3M9XCJkaW1tXCIgLz4nKS5hcHBlbmQoXG5cdFx0XHRcdCQoYDxzcGFuPiR7bXNnfTxzcGFuLz48YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj5b64ur6riwXTwvc3Bhbj48L2J1dHRvbj5gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdFx0JCgnLmRpbW0nKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oKXtcblx0XHRcdCQoJy5kaW1tJykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Rldi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=