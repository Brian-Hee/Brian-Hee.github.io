// 鼠标移动星星飘落特效 - 单种形状随机，缓慢飘逸版
(function() {
  var stars = [];
  var colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#FF69B4'
  ];
  var shapes = ['★', '✦', '✧', '❋', '✿', '❀', '♥', '♡'];

  // 页面加载时随机选择一种形状
  var selectedShape = shapes[Math.floor(Math.random() * shapes.length)];

  function createStar(x, y) {
    var star = document.createElement('div');
    star.textContent = selectedShape;
    var size = Math.random() * 10 + 10; // 10-20px
    star.style.cssText = [
      'position: fixed',
      'left: ' + x + 'px',
      'top: ' + y + 'px',
      'color: ' + colors[Math.floor(Math.random() * colors.length)],
      'font-size: ' + size + 'px',
      'pointer-events: none',
      'z-index: 99999',
      'user-select: none',
      'transition: none',
      'will-change: transform, opacity'
    ].join(';');
    document.body.appendChild(star);

    stars.push({
      el: star,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.8, // 很小的水平初速度
      vy: Math.random() * 0.5 + 0.3, // 很慢的初始下落速度 0.3-0.8
      gravity: 0.008, // 很小的重力，慢慢加速
      swayAmplitude: Math.random() * 1.5 + 0.5, // 左右摇摆幅度
      swayFrequency: Math.random() * 0.02 + 0.01, // 摇摆频率
      swayOffset: Math.random() * Math.PI * 2, // 摇摆相位偏移
      alpha: 1,
      alphaDecay: Math.random() * 0.004 + 0.003, // 很慢的透明度衰减，存在更久
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5, // 很慢的旋转
      scale: 1,
      scaleDecay: 0.002, // 很慢的缩小
      time: 0
    });
  }

  function animate() {
    for (var i = stars.length - 1; i >= 0; i--) {
      var s = stars[i];
      s.time++;

      // 缓慢下落，带重力加速
      s.vy += s.gravity;
      s.y += s.vy;

      // 左右摇摆，像飘落一样
      var sway = Math.sin(s.time * s.swayFrequency + s.swayOffset) * s.swayAmplitude;
      s.x += s.vx + sway * 0.1;

      // 缓慢消失
      s.alpha -= s.alphaDecay;
      s.rotation += s.rotationSpeed;
      s.scale = Math.max(0.3, s.scale - s.scaleDecay);

      // 超出屏幕或完全透明时移除
      if (s.alpha <= 0 || s.y > window.innerHeight + 50) {
        if (s.el.parentNode) {
          document.body.removeChild(s.el);
        }
        stars.splice(i, 1);
        continue;
      }

      s.el.style.cssText = [
        'position: fixed',
        'left: ' + s.x + 'px',
        'top: ' + s.y + 'px',
        'color: ' + s.el.style.color,
        'font-size: ' + s.el.style.fontSize,
        'pointer-events: none',
        'z-index: 99999',
        'user-select: none',
        'opacity: ' + s.alpha,
        'transform: rotate(' + s.rotation + 'deg) scale(' + s.scale + ')',
        'transition: none',
        'will-change: transform, opacity'
      ].join(';');
    }
    requestAnimationFrame(animate);
  }

  var lastMove = 0;
  var throttle = 50; // 稍微加大节流，避免星星太密集

  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastMove < throttle) return;
    lastMove = now;

    // 每次移动生成1个星星，更稀疏更优雅
    createStar(
      e.clientX + (Math.random() - 0.5) * 15,
      e.clientY + (Math.random() - 0.5) * 15
    );

    // 限制星星数量
    if (stars.length > 60) {
      var excess = stars.length - 60;
      for (var j = 0; j < excess; j++) {
        if (stars[j] && stars[j].el.parentNode) {
          document.body.removeChild(stars[j].el);
        }
      }
      stars.splice(0, excess);
    }
  });

  // 触摸设备支持
  document.addEventListener('touchmove', function(e) {
    var now = Date.now();
    if (now - lastMove < throttle) return;
    lastMove = now;

    var touch = e.touches[0];
    createStar(touch.clientX, touch.clientY);
  }, { passive: true });

  animate();
})();
