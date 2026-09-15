// 滚动淡入动画 - 使用 IntersectionObserver，不依赖外部库
document.addEventListener('DOMContentLoaded', function() {
  // 给元素添加滚动动画属性
  function addScrollAnimations() {
    // 文章卡片
    document.querySelectorAll('.recent-post-item, .article-sort-item, .post-card').forEach(function(el, i) {
      el.setAttribute('data-scroll', 'fade-up');
      el.setAttribute('data-delay', (i % 3) * 100);
    });

    // 侧边栏卡片
    document.querySelectorAll('.card-widget').forEach(function(el, i) {
      el.setAttribute('data-scroll', 'fade-right');
      el.setAttribute('data-delay', i * 100);
    });

    // 文章内容
    document.querySelectorAll('#article-container h1, #article-container h2, #article-container h3, #article-container p, #article-container blockquote, #article-container ul, #article-container ol, #article-container table, #article-container pre').forEach(function(el, i) {
      el.setAttribute('data-scroll', 'fade-up');
      el.setAttribute('data-delay', Math.min(i * 50, 300));
    });

    // 页面标题
    document.querySelectorAll('.page-title, #site-title, .post-title').forEach(function(el) {
      el.setAttribute('data-scroll', 'fade-down');
    });

    // 图库图片
    document.querySelectorAll('.gallery-item, .gallery-grid a').forEach(function(el, i) {
      el.setAttribute('data-scroll', 'zoom-in');
      el.setAttribute('data-delay', (i % 6) * 80);
    });

    // 友链卡片
    document.querySelectorAll('.flink-item, .link-card').forEach(function(el, i) {
      el.setAttribute('data-scroll', 'fade-up');
      el.setAttribute('data-delay', (i % 4) * 100);
    });
  }

  // 初始化动画状态
  function initAnimationState() {
    document.querySelectorAll('[data-scroll]').forEach(function(el) {
      var delay = parseInt(el.getAttribute('data-delay')) || 0;
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      el.style.transitionDelay = delay + 'ms';
      el.style.opacity = '0';

      var type = el.getAttribute('data-scroll');
      if (type === 'fade-up') {
        el.style.transform = 'translateY(30px)';
      } else if (type === 'fade-down') {
        el.style.transform = 'translateY(-30px)';
      } else if (type === 'fade-right') {
        el.style.transform = 'translateX(-30px)';
      } else if (type === 'fade-left') {
        el.style.transform = 'translateX(30px)';
      } else if (type === 'zoom-in') {
        el.style.transform = 'scale(0.9)';
      }
    });
  }

  // 触发动画
  function triggerAnimation(el) {
    el.style.opacity = '1';
    el.style.transform = 'translate(0, 0) scale(1)';
  }

  // 使用 IntersectionObserver
  function initObserver() {
    if (!('IntersectionObserver' in window)) {
      // 不支持的浏览器直接显示所有元素
      document.querySelectorAll('[data-scroll]').forEach(triggerAnimation);
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          triggerAnimation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-scroll]').forEach(function(el) {
      observer.observe(el);
    });
  }

  // 执行
  addScrollAnimations();
  initAnimationState();
  initObserver();

  // PJAX 页面切换后重新初始化
  if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', function() {
      setTimeout(function() {
        addScrollAnimations();
        initAnimationState();
        initObserver();
      }, 100);
    });
  }
});
