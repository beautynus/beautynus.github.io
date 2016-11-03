
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

