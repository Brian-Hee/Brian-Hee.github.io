// 风车头像平滑旋转加速
(function() {
  var avatar = document.querySelector('.card-info .avatar-img img, .avatar-img img');
  if (!avatar) return;

  // 去掉CSS动画，改用JS控制
  avatar.style.animation = 'none';

  var angle = 0;
  var speed = 0;          // 当前角速度（度/帧）
  var normalSpeed = 0.3;  // 正常速度
  var fastSpeed = 3;      // 加速目标速度
  var accelerating = false;

  function animate() {
    // 平滑过渡速度
    if (accelerating) {
      speed += (fastSpeed - speed) * 0.05;
    } else {
      speed += (normalSpeed - speed) * 0.05;
    }
    angle += speed;
    avatar.style.transform = 'rotate(' + angle + 'deg)';
    requestAnimationFrame(animate);
  }

  avatar.addEventListener('mouseenter', function() {
    accelerating = true;
  });
  avatar.addEventListener('mouseleave', function() {
    accelerating = false;
  });

  animate();
})();
