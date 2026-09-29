// 鼠标移动星星飘落特效 - 单种形状随机，密集拖尾版
(function() {
  var stars = [];
  var colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#FF69B4',
    '#FF4757', '#2ED573', '#1E90FF', '#FF6348'
  ];
  var shapes = ['★', '✦', '✧', '❋', '✿', '❀', '♥', '♡'];

  // 页面加载时随机选择一种形状
  var selectedShape = shapes[Math.floor(Math.random() * shapes.length)];

  function createStar(x, y) {
    var star = document.createElement('div');
    star.textContent = selectedShape;
    var size = Math.random() * 8 + 8; // 8-16px，大小有变化
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
      vx: (Math.random() - 0.5) * 0.6, // 很小的水平初速度
      vy: Math.random() * 0.4 + 0.2, // 很慢的初始下落速度
      gravity: 0.006, // 很小的重力
      swayAmplitude: Math.random() * 1 + 0.3, // 左右摇摆幅度
      swayFrequency: Math.random() * 0.025 + 0.015, // 摇摆频率
      swayOffset: Math.random() * Math.PI * 2,
      alpha: 1,
      alphaDecay: Math.random() * 0.005 + 0.004, // 缓慢消失
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2, // 缓慢旋转
      scale: 1,
      scaleDecay: 0.003,
      time: 0
    });
  }

  function animate() {
    for (var i = stars.length - 1; i >= 0; i--) {
      var s = stars[i];
      s.time++;

      // 缓慢下落
      s.vy += s.gravity;
      s.y += s.vy;

      // 左右摇摆
      var sway = Math.sin(s.time * s.swayFrequency + s.swayOffset) * s.swayAmplitude;
      s.x += s.vx + sway * 0.08;

      // 缓慢消失
      s.alpha -= s.alphaDecay;
      s.rotation += s.rotationSpeed;
      s.scale = Math.max(0.2, s.scale - s.scaleDecay);

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
  var throttle = 20; // 更密集，20ms生成一次

  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastMove < throttle) return;
    lastMove = now;

    // 每次移动生成2-3个星星，形成拖尾
    var count = Math.random() > 0.4 ? 3 : 2;
    for (var i = 0; i < count; i++) {
      createStar(
        e.clientX + (Math.random() - 0.5) * 20,
        e.clientY + (Math.random() - 0.5) * 20
      );
    }

    // 限制星星数量，避免过多
    if (stars.length > 120) {
      var excess = stars.length - 120;
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
    for (var i = 0; i < 2; i++) {
      createStar(
        touch.clientX + (Math.random() - 0.5) * 15,
        touch.clientY + (Math.random() - 0.5) * 15
      );
    }
  }, { passive: true });

  animate();
})();
