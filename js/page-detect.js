// 句子锦集页面 - 去掉白色容器背景，让渐变卡片直接浮在背景上
if (location.pathname.indexOf('/sentences/') >= 0) {
  document.body.classList.add('page-sentences');
  // 等页面加载完后去掉白色容器
  window.addEventListener('load', function() {
    var post = document.getElementById('post');
    if (post) {
      post.style.background = 'transparent';
      post.style.boxShadow = 'none';
    }
    // 去掉评论区的白色背景
    var comment = document.getElementById('post-comment');
    if (comment) {
      comment.style.background = 'transparent';
      comment.style.boxShadow = 'none';
    }
  });
}
