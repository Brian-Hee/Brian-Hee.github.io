// 鼠标移动星星飘落特效
(function() {
  var stars = [];
  var colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#FF69B4'
  ];
  var shapes = ['★', '✦', '✧', '❋', '✿', '❀', '♥', '♡'];

  function createStar(x, y) {
    var star = document.createElement('div');
    star.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    star.style.cssText = [
      'position: fixed',
      'left: ' + x + 'px',
      'top: ' + y + 'px',
      'color: ' + colors[Math.floor(Math.random() * colors.length)],
      'font-size: ' + (Math.random() * 12 + 8) + 'px',
      'pointer-events: none',
      'z-index: 99999',
      'user-select: none',
      'transition: none'
    ].join(';');
    document.body.appendChild(star);

    stars.push({
      el: star,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      alpha: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      scale: 1
    });
  }

  function animate() {
    for (var i = stars.length - 1; i >= 0; i--) {
      var s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.05; // 重力
      s.alpha -= 0.015;
      s.rotation += s.rotationSpeed;
      s.scale = Math.max(0, s.scale - 0.005);

      if (s.alpha <= 0) {
        document.body.removeChild(s.el);
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
        'transition: none'
      ].join(';');
    }
    requestAnimationFrame(animate);
  }

  var lastMove = 0;
  var throttle = 30; // 节流，避免生成过多星星

  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastMove < throttle) return;
    lastMove = now;

    // 每次移动生成1-2个星星
    var count = Math.random() > 0.5 ? 2 : 1;
    for (var i = 0; i < count; i++) {
      createStar(
        e.clientX + (Math.random() - 0.5) * 20,
        e.clientY + (Math.random() - 0.5) * 20
      );
    }

    // 限制星星数量，避免过多
    if (stars.length > 80) {
      var excess = stars.length - 80;
      for (var j = 0; j < excess; j++) {
        document.body.removeChild(stars[j].el);
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
