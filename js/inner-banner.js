// 内页横幅按分类每天零点换：文章页→风景，工具页→科技，收藏类页→星空/插画；首页不动
(function () {
  // 页面路径 → 壁纸分类（数组表示合并池）
  function categoryOf(path) {
    if (/^\/\d{4}\/\d{2}\//.test(path)) return ['风景'];          // 文章页
    if (path === '/tools') return ['科技'];                        // 工具页
    if (['/favorites', '/wallpaper', '/videos', '/music', '/sentences', '/changshi', '/fengshui'].indexOf(path) !== -1)
      return ['星空', '插画'];                                      // 收藏类页
    return null;                                                   // 其余内页保持原 top_img，不覆盖
  }

  // 按一年第几天取模，实现每天一张（同一天稳定，不随机跳动）
  function pick(pool) {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var day = Math.floor((now - start) / 86400000);
    return pool[day % pool.length];
  }

  function apply() {
    var header = document.getElementById('page-header');
    if (!header || header.classList.contains('full_page')) return; // 首页跳过，由 banner-rotate 管
    if (!window.WALLPAPERS) return;

    var path = location.pathname.replace(/\/+$/, '') || '/';
    var cats = categoryOf(path);
    if (!cats) return;

    var pool = window.WALLPAPERS.filter(function (w) { return cats.indexOf(w.category) !== -1; });
    if (!pool.length) return;

    var img = pick(pool);
    var pre = new Image();
    pre.onload = function () {
      header.style.backgroundImage = "url('" + img.url + "')";
    };
    pre.src = img.url;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
