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
	
	var menuData = [{
		depth1: "공통",
		depth2: "",
		links: [{
			title: "댓글",
			href: "/html/event/ongoing/reply.html",
			complete: true
		}, {
			title: "댓글이 없는 경우",
			href: "/html/event/ongoing/reply.html",
			complete: true
		}]
	}, {
		depth1: "멤버쉽",
		depth2: "이용약관",
		links: [{
			title: "서비스 이용약관",
			href: "/html/membership/serviceAgreement/service.html",
			complete: true
		}, {
			title: "개인정보 처리방침",
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
		depth1: "설정",
		depth2: "설정항목",
		links: [{
			title: "마케팅 수신동의 상세",
			href: "/html/cs/config/marketingAgreement.html",
			complete: true
		}, {
			title: "서비스 이용약관 상세",
			href: "/html/cs/config/serviceAgreement.html",
			complete: true
		}, {
			title: "개인정보 취급방침 상세",
			href: "/html/cs/config/privacyStatement.html",
			complete: true
		}, {
			title: "위치기반 서비스 이용약관",
			href: "/html/cs/config/locationServiceAgreement.html",
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
		}]
	}, {
		depth1: "엔젤톡톡",
		depth2: "",
		links: [{
			title: "관심상품문의",
			href: "/html/engelTalk/talk_inquiry.html",
			complete: true
		}]
	}];
	
	var menuList = menuData.reduce(function (p, c) {
		var depth1 = c.depth1;
		var depth2 = c.depth2;
		var links = c.links;
	
		return (p || '') + "\n\t<h2><span>" + depth1 + "</span></h2>\n\t" + (depth2 == '' ? depth2 : "<h3><span>" + depth2 + "</span></h3>") + "\n\t<ul>" + links.reduce(function (ip, ic) {
			var title = ic.title;
			var href = ic.href;
			var complete = ic.complete;
	
			return (ip || "") + "\n\t\t<li" + (complete ? ' class="cp"' : "") + "><a href=\"" + href + "\">" + title + "</a></li>";
		}, 0) + "\n\t</ul>\n\t";
	}, 0);
	
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
				menuList = $('<div id=menu />').append($('<div id=menu-list />').append(menuList));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjQyNTQ5NWJjNzc4YWVjYWU1NWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Rldi5qcyJdLCJuYW1lcyI6WyJtZW51RGF0YSIsImRlcHRoMSIsImRlcHRoMiIsImxpbmtzIiwidGl0bGUiLCJocmVmIiwiY29tcGxldGUiLCJtZW51TGlzdCIsInJlZHVjZSIsInAiLCJjIiwiaXAiLCJpYyIsIndpbmRvdyIsImRldiIsImFwcGVuZE1lbnVCdG4iLCJtZW51VHJpZ2dlciIsIiQiLCJsZW5ndGgiLCJwcmVwZW5kIiwib2ZmIiwib24iLCJjb25kaXRpb24iLCJoYXNDbGFzcyIsImFkZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJhcHBlbmRNZW51TGlzdCIsImFwcGVuZCIsImZpbmQiLCJlYWNoIiwiYUhSRUYiLCJhdHRyIiwiaW5kZXhPZiIsImRpbW0iLCJtc2ciLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBSUEsV0FBVyxDQUNkO0FBQ0NDLFVBQVEsSUFEVDtBQUVDQyxVQUFRLEVBRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sSUFEUjtBQUVDQyxTQUFNLGdDQUZQO0FBR0NDLGFBQVU7QUFIWCxHQURNLEVBTU47QUFDQ0YsVUFBTyxXQURSO0FBRUNDLFNBQU0sZ0NBRlA7QUFHQ0MsYUFBVTtBQUhYLEdBTk07QUFIUixFQURjLEVBaUJkO0FBQ0NMLFVBQVEsS0FEVDtBQUVDQyxVQUFRLE1BRlQ7QUFHQ0MsU0FBTyxDQUNOO0FBQ0NDLFVBQU8sVUFEUjtBQUVDQyxTQUFNLGdEQUZQO0FBR0ND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QixLQUFFLE1BQUYsRUFBVVcsTUFBVixDQUNDWCxFQUFFLHNCQUFGLEVBQTBCVyxNQUExQixDQUNDWCxhQUFXa0IsR0FBWCx5REFERCxDQUREO0FBS0FsQixLQUFFLE9BQUYsRUFBV0ksRUFBWCxDQUFjLE9BQWQsRUFBdUIsUUFBdkIsRUFBaUMsWUFBVTtBQUMxQ0osTUFBRSxPQUFGLEVBQVdtQixNQUFYO0FBQ0EsSUFGRDtBQUdBO0FBNUNXLEVBQWIsQyIsImZpbGUiOiJkZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NDI1NDk1YmM3NzhhZWNhZTU1Y1xuICoqLyIsInZhciBtZW51RGF0YSA9IFtcblx0e1xuXHRcdGRlcHRoMTogXCLqs7XthrVcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi64yT6riAXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy9yZXBseS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrjJPquIDsnbQg7JeG64qUIOqyveyasFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvcmVwbHkuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrqaTrsoTsib1cIixcblx0XHRkZXB0aDI6IFwi7J207Jqp7JW96rSAXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL21lbWJlcnNoaXAvc2VydmljZUFncmVlbWVudC9zZXJ2aWNlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuqwnOyduOygleuztCDsspjrpqzrsKnsuahcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvcGVyc29uYWxJbmZvbWF0aW9uLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuychOy5mOq4sOuwmOyEnOu5hOyKpCDsnbTsmqnslb3qtIBcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9tZW1iZXJzaGlwL3NlcnZpY2VBZ3JlZW1lbnQvbG9jYXRpb25CYXNlZC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuydtOuypO2KuCbtlonsgqxcIixcblx0XHRkZXB0aDI6IFwi7KeE7ZaJ7KSR7J24IOydtOuypO2KuFwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAtIOydvOuwmFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLggLSDtl6TrnbzrqZTsnbTtgazsl4Xsh7xcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9ldmVudC9vbmdvaW5nL3ZpZXdIZXJhLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g64uo7J287ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfc2luZ2xlU2VsZWN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7ZWY6riwIC0g67O17IiY7ISg7YOdKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2V2ZW50L29uZ29pbmcvdmlld1BvbGxfbXVsdGlTZWxlY3QuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4ICjtiKztkZzsmYTro4wpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbENvbXBsZXRlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuyDgeyEuCAo7Yis7ZGc7KKF66OMIO2bhCDtmZXsnbgpXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZXZlbnQvb25nb2luZy92aWV3UG9sbF9maW5pc2guaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLrt7Dti7Dsu6jthZDsuKBcIixcblx0XHRkZXB0aDI6IFwi66qp66GdXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7IS4KOy5tOuTnOuJtOyKpO2YlSlcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9iZWF1dHlDb250ZW50L2NhcmRUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4HshLgo64+Z7JiB7IOB7ZiVKVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2JlYXV0eUNvbnRlbnQvbW92aWVUeXBlLmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiOygleuztFwiLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsg4Htkogg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdEluZm8vdmlldy5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOiBcIuyDge2SiCDsg4HshLhcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7IOB7ZKI66as67ewXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvcHJvZHVjdFJldmlldy92aWV3Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi6rOg6rCd7IS87YSwXCIsXG5cdFx0ZGVwdGgyOiBcIuqzteyngOyCrO2VrVwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuqqeuhnSArIOyDgeyEuFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL25vdGljZS9saXN0Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcblx0XHRcdH1cblx0XHRdXG5cdH0sXG5cdHtcblx0XHRkZXB0aDE6IFwi64+E7JuA66eQXCIsXG5cdFx0ZGVwdGgyOiBcIlwiLFxuXHRcdGxpbmtzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuplOyduFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL2hlbHAvaW5kZXguaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLshKTsoJVcIixcblx0XHRkZXB0aDI6IFwi7ISk7KCV7ZWt66qpXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi66eI7LyA7YyFIOyImOyLoOuPmeydmCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9jb25maWcvbWFya2V0aW5nQWdyZWVtZW50Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi7ISc67mE7IqkIOydtOyaqeyVveq0gCDsg4HshLhcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9jcy9jb25maWcvc2VydmljZUFncmVlbWVudC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuqwnOyduOygleuztCDst6jquInrsKnsuagg7IOB7IS4XCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvY3MvY29uZmlnL3ByaXZhY3lTdGF0ZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLsnITsuZjquLDrsJgg7ISc67mE7IqkIOydtOyaqeyVveq0gFwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL2NzL2NvbmZpZy9sb2NhdGlvblNlcnZpY2VBZ3JlZW1lbnQuaHRtbFwiLFxuXHRcdFx0XHRjb21wbGV0ZTogdHJ1ZVx0XG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0ZGVwdGgxOlwi66eI7J207Y6Y7J207KeAXCIgLFxuXHRcdGRlcHRoMjogXCJcIixcblx0XHRsaW5rczogW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogXCLrgpjsnZgg65Ox6riJXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvbXlQYWdlL2dyYWRlL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi67iM656c65Oc67OEIOunpOyepeyEoO2DnVwiLFxuXHRcdFx0XHRocmVmOiBcIi9odG1sL215UGFnZS9zZWxlY3RTdG9yZS9pbmRleC5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBcIuuCmOydmCDsv6Dtj7BcIixcblx0XHRcdFx0aHJlZjogXCIvaHRtbC9teVBhZ2UvY291cG9uL2luZGV4Lmh0bWxcIixcblx0XHRcdFx0Y29tcGxldGU6IHRydWVcdFxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGRlcHRoMTogXCLsl5TsoKTthqHthqFcIixcblx0XHRkZXB0aDI6IFwiXCIsXG5cdFx0bGlua3M6IFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IFwi6rSA7Ius7IOB7ZKI66y47J2YXCIsXG5cdFx0XHRcdGhyZWY6IFwiL2h0bWwvZW5nZWxUYWxrL3RhbGtfaW5xdWlyeS5odG1sXCIsXG5cdFx0XHRcdGNvbXBsZXRlOiB0cnVlXHRcblx0XHRcdH1cblx0XHRdXG5cdH1cblxuXTtcblxudmFyIG1lbnVMaXN0ID0gbWVudURhdGEucmVkdWNlKChwLCBjKSA9PiB7XG5cdGxldCB7ZGVwdGgxLCBkZXB0aDIsIGxpbmtzfSA9IGM7XG5cdHJldHVybiBgJHtwIHx8ICcnfVxuXHQ8aDI+PHNwYW4+JHtkZXB0aDF9PC9zcGFuPjwvaDI+XG5cdCR7ZGVwdGgyID09ICcnID8gZGVwdGgyIDogYDxoMz48c3Bhbj4ke2RlcHRoMn08L3NwYW4+PC9oMz5gfVxuXHQ8dWw+JHtsaW5rcy5yZWR1Y2UoKGlwLCBpYykgPT4ge1xuXHRcdFx0bGV0IHt0aXRsZSwgaHJlZiwgY29tcGxldGV9ID0gaWM7XG5cdFx0XHRyZXR1cm4gYCR7aXAgfHwgXCJcIn1cblx0XHQ8bGkke2NvbXBsZXRlID8gJyBjbGFzcz1cImNwXCInIDogXCJcIn0+PGEgaHJlZj1cIiR7aHJlZn1cIj4ke3RpdGxlfTwvYT48L2xpPmB9LCAwKX1cblx0PC91bD5cblx0YFxufSwgMCk7XG5cbi8vIOuplOuJtCDrsoTtirwg7IK97J6FXG53aW5kb3cuZGV2ID0ge1xuXHRhcHBlbmRNZW51QnRuOiBmdW5jdGlvbigpe1xuXHRcdHZhciBtZW51VHJpZ2dlciA9IGA8YnV0dG9uIGNsYXNzPVwibWVudS10cmlnZ2VyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4+dG9nZ2xlIG1lbnU8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPmA7XG5cblx0XHRpZiAoICQoJ2J1dHRvbi5tZW51LXRyaWdnZXInKS5sZW5ndGggPD0gMCApIHtcblx0XHRcdCQoJyNtZW51JykucHJlcGVuZChtZW51VHJpZ2dlcik7XG5cdFx0fVxuXG5cdFx0JCgnLm1lbnUtdHJpZ2dlcicpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGNvbmRpdGlvbiA9ICQoJyNtZW51LWxpc3QnKS5oYXNDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHRpZiAoIGNvbmRpdGlvbiApIHtcblx0XHRcdFx0JCgnI21lbnUtbGlzdCcpLmFkZCgkKHRoaXMpKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJyNtZW51LWxpc3QnKS5hZGQoJCh0aGlzKSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly8g66mU64m0IOumrOyKpO2KuCDsgr3snoVcblx0LGFwcGVuZE1lbnVMaXN0OiBmdW5jdGlvbigpe1xuXG5cdFx0aWYgKCAkKCcjbWVudScpLmxlbmd0aCA8PSAwICkge1xuXHRcdFx0bWVudUxpc3QgPSAkKCc8ZGl2IGlkPW1lbnUgLz4nKS5hcHBlbmQoICQoJzxkaXYgaWQ9bWVudS1saXN0IC8+JykuYXBwZW5kKCBtZW51TGlzdCApICk7XG5cdFx0XHQkKCcjd3JhcCcpLmxlbmd0aCA8PSAwID8gJCgnYm9keScpLnByZXBlbmQoIG1lbnVMaXN0ICkgOiAkKCcjd3JhcCcpLnByZXBlbmQoIG1lbnVMaXN0ICk7XG5cdFx0fVxuXHRcdCQoJyNtZW51LWxpc3QnKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFIUkVGID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cdFx0XHRpZiAoIGFIUkVGLmluZGV4T2YoJz9kZXYnKSA8PSAtMSApIHtcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdocmVmJywgYUhSRUYgKyAnP2RldicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdCxkaW1tOiBmdW5jdGlvbihtc2cpe1xuXHRcdG1zZyA9IG1zZyB8fCAn64K07Jqp7J20IOyXhuyKteuLiOuLpC4nO1xuXHRcdCQoJ2JvZHknKS5hcHBlbmQoXG5cdFx0XHQkKCc8ZGl2IGNsYXNzPVwiZGltbVwiIC8+JykuYXBwZW5kKFxuXHRcdFx0XHQkKGA8c3Bhbj4ke21zZ308c3Bhbi8+PGJ1dHRvbiBjbGFzcz1cImNsb3NlXCI+W+uLq+q4sF08L3NwYW4+PC9idXR0b24+YClcblx0XHRcdClcblx0XHQpO1xuXHRcdCQoJy5kaW1tJykub24oJ2NsaWNrJywgJy5jbG9zZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcuZGltbScpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9kZXYuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9