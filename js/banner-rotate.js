// 首页横幅图每天轮换：明日香 / 白猫少女 两张按天交替
(function() {
  var banners = [
    '/img/banner-asuka.jpg',                // 明日香
    '/img/gallery/white-cat-girl-sofa.jpg' // 白猫少女
  ];

  // 计算今天是一年中的第几天（1-365），按天取模实现每天一张
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  var todayBanner = banners[dayOfYear % banners.length];

  // 只在首页修改横幅（首页有 #page-header.full_page）
  function setBanner() {
    var header = document.getElementById('page-header');
    if (header && header.classList.contains('full_page')) {
      // 预加载图片，确保切换时不闪烁
      var img = new Image();
      img.onload = function() {
        header.style.backgroundImage = "url('" + todayBanner + "')";
      };
      img.src = todayBanner;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setBanner);
  } else {
    setBanner();
  }

  window.addEventListener('load', function() {
    setTimeout(setBanner, 100);
  });
})();
