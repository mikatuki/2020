$(function () {

  var topBtn = $('#pageTop');
  topBtn.hide();

  $(window).scroll(function(){
    if($(this).scrollTop()>80){
      //画面を80pxスクロールしたら、ボタンを表示
      topBtn.fadeIn();
    }else{
      //画面が80pxより上なら、ボタンを非表示
      topBtn.fadeOut();
    }
  });

  // クリックからの遷移
  $('.btn').click(function(){
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;

    $('body,html').animate({scrollTop:position}, speed, 'swing');
       return false;
  })

  var checkClick = 0;

    $('.hiddenBtn').click(function() {
      var idName = $(this).next('.hiddenShow').attr('id');
      var cssStatus = $('#'+idName).css('display');
      if (cssStatus == 'block') {
        $('#'+idName).css('display', 'none');
      }else {
        $('#'+idName).css('display', 'block');
      }
    })

  // スライドショー
  var o = {
    speed   : 300,
    interval: 3000
  };

  var $container  = $('.slider-container'),
      $contents   = $container.children(),
      $firstChild = $contents.filter(':first-child'),
      $lastChild  = $contents.filter('#last');

  // 幅の取得
  var size = {
    width : $container.width(),
    height: $container.height()
  };

  // 画像の枚数の取得
  var count = {
    min    : 0,
    max    : 4,
    current: 0
  };

  // fix $contaienr width
  $container.css({
    width      : size.width * (4 + 2),
    marginLeft : -size.width,
    paddingLeft: size.width
  });

  // autoslide
  var play, start;

  //流れる間隔とか
  play = function () {
           start = setInterval(function () {
                       slide.next();
                   }, o.interval);
         };

  //矢印による移動
  $('#slide-next').click(function (e) {
    fnc.pager('positive', e);
  });
  $('#slide-prev').click(function (e) {
    fnc.pager('negative', e);
  });

  $('#slide-next2').click(function (e) {
    fnc.pager('positive', e);
  });
  $('#slide-prev2').click(function (e) {
    fnc.pager('negative', e);
  });

  // slider
  var distance;
  var slide = {

  //次ボタン
    next: function (index) {
            fnc.range(index, 'positive');
            if(count.current < count.max - 1) {
              fnc.scroll(distance);
            } else {
              $firstChild.css('left', size.width * 4);
              $container.animate({left: -distance}, o.speed,
                          function () {
                            $firstChild.css('left', 0);
                            $container.css('left', 0);
                          }
                        );
              count.current = -1;
            }
            fnc.counter(index, 'increment');
          },

  // 戻るボタン
    prev: function (index) {
            fnc.range(index, 'negative');
            if(count.current > count.min) {
              fnc.scroll(distance);
            } else {
              $lastChild.css('left', -(size.width * 4));
              $container.animate({left: -distance}, o.speed,
                          function () {
                            $lastChild.css('left', '');
                            $container.css('left', -(size.width * (4 - 1)));
                          }
                        );
              count.current = count.max;
            }
            fnc.counter(index, 'decrement');
          }

  };

  var fnc = {

    range  : function (n, d) {
               if(n >= 0) {
                 distance = size.width * n;
               } else {
                 var addNum;
                 if(d === 'negative') addNum = -1;
                 if(d === 'positive') addNum = +1;
                 distance = size.width * (count.current + addNum);
               }
             },

    scroll : function (d) {
               $container.animate({left: -d}, o.speed);
             },

    counter: function (n, c) {
               if(n >= 0) {
                 count.current = n;
               } else {
                 if(c === 'increment') count.current++;
                 if(c === 'decrement') count.current--;
               }
             },

    pager  : function (d, e) {
                 if(!$container.is(':animated')) {
                   clearInterval(start);
                   if(d === 'positive') slide.next();
                   if(d === 'negative') slide.prev();
                   play();
                 }
                 e.preventDefault();
             }

  };

  // auto start
  play();

});
