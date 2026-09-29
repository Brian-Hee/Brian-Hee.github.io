// 滚动淡入动画 - 安全版本，元素默认可见
(function() {
  // 动画配置
  var animations = {
    'fade-up': { opacity: '0', transform: 'translateY(30px)' },
    'fade-down': { opacity: '0', transform: 'translateY(-30px)' },
    'fade-right': { opacity: '0', transform: 'translateX(-30px)' },
    'fade-left': { opacity: '0', transform: 'translateX(30px)' },
    'zoom-in': { opacity: '0', transform: 'scale(0.9)' }
  };

  // 给元素添加滚动动画
  function setupAnimations() {
    var elements = [];

    // 文章卡片
    document.querySelectorAll('.recent-post-item, .article-sort-item, .post-card').forEach(function(el, i) {
      elements.push({ el: el, type: 'fade-up', delay: (i % 3) * 100 });
    });

    // 侧边栏卡片
    document.querySelectorAll('.card-widget').forEach(function(el, i) {
      elements.push({ el: el, type: 'fade-right', delay: i * 100 });
    });

    // 文章内容
    document.querySelectorAll('#article-container h1, #article-container h2, #article-container h3, #article-container p, #article-container blockquote, #article-container ul, #article-container ol, #article-container table, #article-container pre').forEach(function(el, i) {
      elements.push({ el: el, type: 'fade-up', delay: Math.min(i * 50, 300) });
    });

    // 页面标题
    document.querySelectorAll('.page-title, #site-title, .post-title').forEach(function(el) {
      elements.push({ el: el, type: 'fade-down', delay: 0 });
    });

    // 图库图片
    document.querySelectorAll('.gallery-item, .gallery-grid a').forEach(function(el, i) {
      elements.push({ el: el, type: 'zoom-in', delay: (i % 6) * 80 });
    });

    // 友链卡片
    document.querySelectorAll('.flink-item, .link-card').forEach(function(el, i) {
      elements.push({ el: el, type: 'fade-up', delay: (i % 4) * 100 });
    });

    return elements;
  }

  // 初始化动画
  function init() {
    var elements = setupAnimations();

    if (!('IntersectionObserver' in window)) {
      // 不支持的浏览器直接显示
      return;
    }

    // 设置初始状态
    elements.forEach(function(item) {
      var anim = animations[item.type];
      if (anim) {
        item.el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        item.el.style.transitionDelay = item.delay + 'ms';
        item.el.style.opacity = anim.opacity;
        item.el.style.transform = anim.transform;
      }
    });

    // 创建观察者
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // 触发动画：恢复到正常状态
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translate(0, 0) scale(1)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 0px 0px'
    });

    // 观察所有元素
    elements.forEach(function(item) {
      observer.observe(item.el);
    });

    // 立即检查视口内的元素（防止初始状态不触发）
    setTimeout(function() {
      elements.forEach(function(item) {
        var rect = item.el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          item.el.style.opacity = '1';
          item.el.style.transform = 'translate(0, 0) scale(1)';
          observer.unobserve(item.el);
        }
      });
    }, 100);
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // PJAX 页面切换后重新初始化
  if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', function() {
      setTimeout(init, 100);
    });
  }
})();
