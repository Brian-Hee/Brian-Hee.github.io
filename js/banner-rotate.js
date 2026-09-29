// 首页横幅图每天自动轮换
(function() {
  // 横幅图列表，每天轮换一张
  var banners = [
    '/img/banner-city.jpg',      // 纽约夜景
    '/img/banner-asuka.jpg',     // 明日香
    '/img/banner-island.jpg',    // 动漫海岛
    '/img/banner-mist.jpg',      // 山间晨雾
    '/img/bg-mountain.jpg',      // 星空山脉
    '/img/banner-aurora.jpg'     // 极光雪山
  ];

  // 计算今天是一年中的第几天（1-365）
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 根据天数选择横幅图
  var bannerIndex = dayOfYear % banners.length;
  var todayBanner = banners[bannerIndex];

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

  // 页面加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setBanner);
  } else {
    setBanner();
  }

  // 也可以在 window load 后再执行一次，确保覆盖主题默认设置
  window.addEventListener('load', function() {
    setTimeout(setBanner, 100);
  });
})();
