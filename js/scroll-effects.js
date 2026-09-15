// 滚动动画特效 - 基于 AOS
document.addEventListener('DOMContentLoaded', function() {
  // 初始化 AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 100
    });
  }

  // 给页面元素添加滚动动画
  function addScrollAnimations() {
    // 文章卡片
    document.querySelectorAll('.recent-post-item, .article-sort-item, .post-card').forEach(function(el, i) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', (i % 3) * 100);
    });

    // 侧边栏卡片
    document.querySelectorAll('.card-widget').forEach(function(el, i) {
      el.setAttribute('data-aos', 'fade-right');
      el.setAttribute('data-aos-delay', i * 100);
    });

    // 文章内容段落
    document.querySelectorAll('#article-container h1, #article-container h2, #article-container h3, #article-container p, #article-container blockquote, #article-container ul, #article-container ol, #article-container table, #article-container pre').forEach(function(el, i) {
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', Math.min(i * 50, 300));
    });

    // 页面标题
    document.querySelectorAll('.page-title, #site-title, .post-title').forEach(function(el) {
      el.setAttribute('data-aos', 'fade-down');
    });

    // 图库图片
    document.querySelectorAll('.gallery-item, .gallery-grid a').forEach(function(el, i) {
      el.setAttribute('data-aos', 'zoom-in');
      el.setAttribute('data-aos-delay', (i % 6) * 80);
    });

    // 友链卡片
    document.querySelectorAll('.flink-item, .link-card').forEach(function(el, i) {
      el.setAttribute('data-aos', 'flip-left');
      el.setAttribute('data-aos-delay', (i % 4) * 100);
    });

    // 刷新 AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  // 延迟执行，确保页面元素加载完成
  setTimeout(addScrollAnimations, 300);

  // 页面切换后重新初始化（PJAX）
  if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', function() {
      setTimeout(addScrollAnimations, 300);
    });
  }
});
