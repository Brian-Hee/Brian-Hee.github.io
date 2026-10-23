// 作者卡只在首页、关于、友链页显示；其余页面（文章/收藏/工具等）隐藏
(function () {
  var path = location.pathname.replace(/\/+$/, '') || '/';
  var allow = ['/', '/about', '/link'];
  var show = allow.indexOf(path) !== -1;

  function apply() {
    var card = document.querySelector('.card-info');
    if (card) card.style.display = show ? '' : 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
