// 导航栏滚动隐藏/显示
(function() {
  let lastScroll = 0;
  const header = document.getElementById('page-header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // 在最顶部时显示
    if (currentScroll < 50) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
      return;
    }
    
    // 往下滚隐藏
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease';
    } 
    // 往上滚显示
    else if (currentScroll < lastScroll) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
    
    lastScroll = currentScroll;
  });

  // 鼠标移到顶部时显示
  document.addEventListener('mousemove', function(e) {
    if (e.clientY < 30) {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
  });
})();
