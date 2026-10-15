// 导航栏滚动隐藏/显示
(function() {
  let lastScroll = 0;
  const header = document.getElementById('page-header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // 在最顶部时强制显示
    if (currentScroll < 50) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
      lastScroll = currentScroll;
      return;
    }
    
    // 往下滚：隐藏导航栏
    if (currentScroll > lastScroll && currentScroll > 80) {
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease';
    } 
    // 往上滚：显示导航栏（不管在页面哪个位置）
    else if (currentScroll < lastScroll) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
    
    lastScroll = currentScroll;
  });

  // 鼠标移到顶部80px范围内，强制显示导航栏
  document.addEventListener('mousemove', function(e) {
    if (e.clientY < 80) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
  });
})();
