// 首页文章分类筛选
(function() {
  // 只在首页生效
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

  // 等待页面加载完成
  function init() {
    var posts = document.querySelectorAll('.recent-post-item');
    if (posts.length === 0) {
      setTimeout(init, 500);
      return;
    }

    // 收集所有分类
    var categories = new Set();
    posts.forEach(function(post) {
      var catEl = post.querySelector('.article-meta__categories');
      if (catEl) {
        categories.add(catEl.innerText.trim());
      }
    });

    // 创建筛选栏
    var filterBar = document.createElement('div');
    filterBar.className = 'home-filter-bar';
    filterBar.innerHTML = '<button class="home-filter-btn active" data-cat="all">全部</button>';

    categories.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.className = 'home-filter-btn';
      btn.setAttribute('data-cat', cat);
      btn.textContent = cat;
      filterBar.appendChild(btn);
    });

    // 插入到文章列表前面
    var postList = document.querySelector('.recent-post-item').parentElement;
    if (postList) {
      postList.parentElement.insertBefore(filterBar, postList);
    }

    // 筛选功能
    var buttons = filterBar.querySelectorAll('.home-filter-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var cat = btn.getAttribute('data-cat');
        posts.forEach(function(post) {
          var postCat = post.querySelector('.article-meta__categories');
          var postCatText = postCat ? postCat.innerText.trim() : '';
          if (cat === 'all' || postCatText === cat) {
            post.style.display = '';
          } else {
            post.style.display = 'none';
          }
        });
      });
    });
  }

  // 添加样式
  var style = document.createElement('style');
  style.textContent = `
    .home-filter-bar {
      display: flex;
      gap: 10px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    .home-filter-btn {
      padding: 8px 20px;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      background: #fff;
      color: #666;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
    }
    .home-filter-btn:hover {
      border-color: #49B1F5;
      color: #49B1F5;
    }
    .home-filter-btn.active {
      background: #49B1F5;
      color: #fff;
      border-color: #49B1F5;
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
