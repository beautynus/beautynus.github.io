import $ from 'jquery';
import Swiper from './swiper.jquery.umd.min.js';

//style
import '../css/swiper.scss';
import '../css/ui.beautynus.scss';

//ui 관련 공통 스크립트
window.ui = window.ui || {
  commonNothing: function(){}
};


$(function(){

  //a태그 href에 더미 함수 삽입
  $('a').each(function(i, el){
    target = $(this),
    tagetHref = target.attr('href');
    if ( tagetHref == '#' )
      target.attr('href', 'javascript:ui.commonNothing();');
  });

});

(function(){
  var beautynus = beautynus || {};

  cardNews = {
    _scope: '',
    defaultOptions: {
      direction: 'horizontal',
      loop: true,
      pagination: '.swiper-pagination',
      paginationType: 'fraction'
    },

    init: function(scope, options){
      this._scope = scope;
      if ( Object )
      options = (typeof options == 'undefined') ? Object.assign({}, defaultOptions, options) : options;
      this.swiper(options);
    },

    swiper: function(options){
      $(this._scope).data('manager', new Swiper(this._scope, options));
    },

    manager: function(){
      return $(this._scope).data('manager');
    }
  };
  beautynus.cardNews = cardNews;


  window.beautynus = beautynus;

})();
